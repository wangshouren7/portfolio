FROM node:18-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

RUN pnpm install turbo@^2 -g

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .

RUN turbo prune @pfl-wsr/dapp-token-exchange-contracts @pfl-wsr/dapp-token-exchange-frontend --docker

FROM base AS runner
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
 
# Copy full code to build
COPY --from=builder /app/out/full/ .
RUN pnpm turbo compile build

# Don't run production as root
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 runner
USER runner

# Copy the frontend built files (standalone)
COPY --chown=runner:app /app/apps/dapp-token-exchange/frontend/.next/standalone/apps/dapp-token-exchange/frontend ./standalone
COPY --chown=runner:app /app/apps/dapp-token-exchange/frontend/.next/static ./standalone/.next/static
COPY --chown=runner:app /app/apps/dapp-token-exchange/frontend/public ./standalone/public

# Remove frontend package (standalone)
RUN rm -rf /app/apps/dapp-token-exchange/frontend
 
COPY --chown=runner:app docker/Contract.entrypoint.sh /app/Contract.entrypoint.sh
RUN chmod +x /app/Contract.entrypoint.sh
CMD ["/app/Contract.entrypoint.sh"]