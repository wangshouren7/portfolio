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

RUN turbo prune @pfl-wsr/dapp-token-exchange-contracts --docker

# 添加新的构建阶段，避免循环依赖
FROM base AS runner
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
 
# Compile the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo compile
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app
USER app
 
# 启动一个持久运行的hardhat节点并部署合约
COPY --chown=app:nodejs docker/Contract.entrypoint.sh /app/Contract.entrypoint.sh
RUN chmod +x /app/Contract.entrypoint.sh
CMD ["/app/Contract.entrypoint.sh"]