import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path'; // 여기에 path 모듈 임포트 추가

export default defineConfig({
	plugins: [sveltekit()],
	presets: ['@babel/preset-env'],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@api': path.resolve(__dirname, './src/api'),
			'@stores': path.resolve(__dirname, './src/stores'),
			'@lib': path.resolve(__dirname, './src/lib'),
			'@scss': path.resolve(__dirname, './src/scss'),
		},
	},
	server: {
		proxy: {
			'/api/v1': {
				target: 'http://localhost:8080',
				changeOrigin: true
			}
		}
	},
	test: {
    environment: 'happy-dom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    globals: true,
    deps: {
      inline: ['msw']
    }
  }
});
