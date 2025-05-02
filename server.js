import polka from 'polka';
import httpProxy from 'http-proxy';
import { handler } from './build/handler.js';

const targetURL = 'http://localhost:8080'; // 타겟 서버 URL

const proxy = httpProxy.createProxyServer({
  target: targetURL,
  changeOrigin: true
});

// CORS 헤더 추가
proxy.on('proxyRes', (proxyRes, req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

const server = polka();

server.use((req, res, next) => {
  console.log('🟡 요청 들어옴:', req.method, req.url);

  if (req.url.startsWith('/api/v1/')) {
    console.log(`➡️ 프록시 작동: ${req.method} ${req.url}`);

    proxy.web(req, res, (err) => {
      console.error('❌ 프록시 오류:', err);
    });

    res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end();
    return;
  }

  next();
});

// ✅ 나머지는 SvelteKit에게 넘김
server.use(handler);

// ✅ 서버 실행
server.listen(5173, () => {
  console.log('✅ Server running at http://localhost:5173');
});