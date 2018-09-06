FROM node:10 as build
WORKDIR /usr/src/app
COPY . .
RUN yarn install --production \
  && cp -R node_modules node_modules_prod \
  && yarn install \
  && yarn build

FROM node:10 as runtime
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/.nuxt ./.nuxt
COPY --from=build /usr/src/app/nuxt.config.js ./nuxt.config.js
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules_prod ./node_modules
CMD [ "node", "dist/main.js" ]
