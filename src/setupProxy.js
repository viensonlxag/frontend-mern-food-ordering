const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('Proxy is being applied...'); // Log khi proxy được áp dụng
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.method, req.url); // Log mỗi request được proxy
      },
    })
  );
};
