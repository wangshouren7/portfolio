FROM node:18-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ARG PACKAGE_NAME_FRONTEND
RUN echo "PACKAGE_NAME_FRONTEND: $PACKAGE_NAME_FRONTEND"
ARG PACKAGE_NAME_CONTRACTS
RUN echo "PACKAGE_NAME_CONTRACTS: $PACKAGE_NAME_CONTRACTS"

RUN corepack enable

RUN pnpm install turbo@^2 -g

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .

################### contract ###################

FROM builder AS contract-builder

RUN turbo prune @pfl-wsr/dapp-token-exchange-contracts --docker

# 添加新的构建阶段，避免循环依赖
FROM base AS contract-runner
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=contract-builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
 
# Compile the contract
COPY --from=contract-builder /app/out/full/ .
RUN pnpm turbo compile


################### frontend ###################

FROM builder AS frontend-builder

RUN turbo prune @pfl-wsr/dapp-token-exchange-frontend --docker

FROM base AS frontend-runner
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=frontend-builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Build the frontend
COPY --from=frontend-builder /app/out/full/ .
RUN pnpm turbo build


################### merge ###################

# Copy the frontend built files to the contract runner
FROM contract-runner AS runner
COPY --from=frontend-runner /app/apps/dapp-token-exchange/frontend/.next/standalone/apps/dapp-token-exchange/frontend ./standalone
COPY --from=frontend-runner /app/apps/dapp-token-exchange/frontend/.next/static ./standalone/.next/static
COPY --from=frontend-runner /app/apps/dapp-token-exchange/frontend/public ./standalone/public



# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app
USER app
 
COPY --chown=app:nodejs docker/Contract.entrypoint.sh /app/Contract.entrypoint.sh
RUN chmod +x /app/Contract.entrypoint.sh
CMD ["/app/Contract.entrypoint.sh"]