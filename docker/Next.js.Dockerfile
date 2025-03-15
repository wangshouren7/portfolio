FROM node:18-alpine AS base

ARG PACKAGE_NAME=@pfl-wsr/portfolio
ARG PACKAGE_DIR=apps/portfolio/frontend

# turbo
ARG TURBO_TEAM
ENV TURBO_TEAM=${TURBO_TEAM}
RUN echo "TURBO_TEAM: $TURBO_TEAM"

ARG TURBO_TOKEN
ENV TURBO_TOKEN=${TURBO_TOKEN}
RUN echo "TURBO_TOKEN: $TURBO_TOKEN"

ARG TURBO_CACHE
ENV TURBO_CACHE=${TURBO_CACHE}
RUN echo "TURBO_CACHE: $TURBO_CACHE"

RUN corepack enable

########################################################
# builder: use `turbo prune` to prune app files
########################################################
 
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
# Replace <your-major-version> with the major version installed in your repository. For example:
# RUN yarn global add turbo@^2
RUN yarn global add turbo@^2
COPY . .
 
# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN turbo prune @pfl-wsr/portfolio --docker

########################################################
# installer: install and build the app
########################################################

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build

########################################################
# runner: copy the build output and run the app
########################################################

FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/portfolio/frontend/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/portfolio/frontend/.next/static ./apps/portfolio/frontend/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/portfolio/frontend/public ./apps/portfolio/frontend/public
 
COPY --chown=nextjs:nodejs docker/Next.js.entrypoint.sh /app/apps/portfolio/frontend/Next.js.entrypoint.sh
RUN chmod +x /app/apps/portfolio/frontend/Next.js.entrypoint.sh
CMD ["/app/apps/portfolio/frontend/Next.js.entrypoint.sh"]