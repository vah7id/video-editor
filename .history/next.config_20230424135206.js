const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const classNames = require("classnames");

const FFMPEG_PATH = "ffmpeg";

/** @type {import('next').NextConfig} */
module.exports = (phase) => ({
  reactStrictMode: true,
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_FFMPEG_URL: `/${FFMPEG_PATH}`,
    NEXT_PUBLIC_HOST: "https://www.viddeo.app",
  },
  headers() {
    return [
      {
        source: "/(.*)",
        locale: false,
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self' blob:",
              "style-src 'unsafe-inline' 'self'",

              // the ffmpeg-wasm library requires "blob:" to work, even though that's not a good idea
              // on safari, it even requires 'unsafe-eval', so I begrudgingly added it as well
              `script-src 'self' 'unsafe-eval' https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js https://www.google-analytics.com 'unsafe-eval' 'unsafe-inline' https://*.googletagmanager.com/gtm.js/  https://tagmanager.google.com/http://www.googleadservices.com/pagead/conversion_async.js https://*.google.com`,
              // if matomo is configured, CSP needs to allow that as well
              // and safari, again, requires the ws: protocol for live reloading in dev mode
              `connect-src ${classNames(
                "'self' blob:",
                { "ws:": phase === PHASE_DEVELOPMENT_SERVER },
                process.env.NEXT_PUBLIC_MATOMO_URL
              )}`,

              "form-action 'none'",
              "frame-ancestors 'none'",
            ].join(";"),
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp", // required for SharedArrayBuffer of the ffmpeg library
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin", // required for SharedArrayBuffer of the ffmpeg library
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "deny",
          },
        ],
      },
    ];
  },
});
