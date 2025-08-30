FROM node:18.8-alpine
LABEL maintainer="VolgaCTF"

ARG BUILD_DATE
ARG BUILD_VERSION
ARG VCS_REF

LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.name="volgactf-final-frontend"
LABEL org.label-schema.description="VolgaCTF Final Frontend SPA"
LABEL org.label-schema.url="https://volgactf.ru/en"
LABEL org.label-schema.vcs-url="https://github.com/VolgaCTF/volgactf-final-frontend"
LABEL org.label-schema.vcs-ref=$VCS_REF
LABEL org.label-schema.version=$BUILD_VERSION

WORKDIR /app
COPY VERSION package*.json webpack.config.js .babelrc entrypoint.sh .
COPY src ./src
COPY public ./public
COPY branding-2025 ./branding-2025
ENV BRANDING_ROOT_PATH=/app/branding-2025
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm ci && npm run build && rm -rf ./node_modules ./src ./branding-*
RUN addgroup volgactf && adduser --disabled-password --gecos "" --ingroup volgactf --no-create-home volgactf && chown -R volgactf:volgactf .
USER volgactf
ENTRYPOINT ["/bin/sh", "entrypoint.sh"]
