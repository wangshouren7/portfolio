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

# 添加调试命令
RUN echo "==== 调试: 打印当前工作目录 ===="
RUN pwd
RUN echo "==== 调试: 检查 apps 目录结构 ===="
RUN ls -la ./apps || echo "apps 目录不存在!"
RUN echo "==== 调试: 检查前端目录路径 ===="
RUN ls -la ./apps/dapp-token-exchange || echo "dapp-token-exchange 目录不存在!"
RUN ls -la ./apps/dapp-token-exchange/frontend || echo "frontend 目录不存在!"
RUN echo "==== 调试: 检查 .next 目录是否生成 ===="
RUN ls -la ./apps/dapp-token-exchange/frontend/.next || echo ".next 目录不存在!"
RUN echo "==== 调试: 递归显示前端目录结构 ===="
RUN find ./apps/dapp-token-exchange/frontend -type d | sort || echo "无法查找前端目录!"


# Copy the frontend built files (standalone)
COPY --chown=runner:app /app/apps/dapp-token-exchange/frontend/.next/standalone/apps/dapp-token-exchange/frontend ./standalone
COPY --chown=runner:app /app/apps/dapp-token-exchange/frontend/.next/static ./standalone/.next/static
COPY --chown=runner:app /app/apps/dapp-token-exchange/frontend/public ./standalone/public

# Remove frontend package (standalone)
RUN rm -rf /app/apps/dapp-token-exchange/frontend
 
COPY --chown=runner:app docker/Contract.entrypoint.sh /app/Contract.entrypoint.sh
RUN chmod +x /app/Contract.entrypoint.sh
CMD ["/app/Contract.entrypoint.sh"]