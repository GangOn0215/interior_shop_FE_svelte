import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path'; // 여기에 path 모듈 임포트 추가

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@stores': path.resolve(__dirname, './src/stores'),
			'@lib': path.resolve(__dirname, './src/lib'),
		},
	},
});
