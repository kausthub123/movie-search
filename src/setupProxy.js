const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy configuration for http://localhost:8000
  app.use(
    '/api/local',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );

  // Proxy configuration for https://movieapp-1-a9282068.deta.app
  app.use(
    '/api/movieapp',
    createProxyMiddleware({
      target: 'https://movieapp-1-a9282068.deta.app',
      changeOrigin: true,
    })
  );

  // Additional proxy configurations...
};

