/* eslint-disable no-undef */
const { env } = require('process');

// eslint-disable-next-line no-nested-ternary
const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:13995';

const PROXY_CONFIG = [
  {
    context: [
      '/',
    ],
    target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive',
    },
  },
];

module.exports = PROXY_CONFIG;
