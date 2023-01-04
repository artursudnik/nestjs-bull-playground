FROM node:18-alpine as base
WORKDIR /app

FROM base as dependencies-prod

COPY ["package.json", "yarn.lock", "./"]
ENV NODE_ENV=production
RUN \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn install --prod --frozen-lockfile

FROM base as builder

COPY ["package.json", "yarn.lock", "./"]

COPY --from=dependencies-prod /app/node_modules /app/node_modules

RUN \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM base as final

COPY --from=dependencies-prod /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000
ENV NODE_ENV=production

CMD ["node", "./dist/main.js"]
