import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '@assets': resolve(__dirname, 'src/assets'),
                '@image': resolve(__dirname, 'src/assets/image'),
                '@components': resolve(__dirname, 'src/components'),
                '@utils': resolve(__dirname, 'src/utils'),
                vue: 'vue/dist/vue.esm-bundler.js',
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/style/global.scss";',
                    charset: false,
                },
            },
        },
        build: {
            outDir: 'dist', //构建打包输出目录
        },
        server: {
            host: 'localhost',
            port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
            strictPort: false, // 是否强制使用指定端口号
            open: false, // 服务启动时是否自动打开浏览器
            https: false, // 是否开启 https
            cors: true, // 允许跨域
            hmr: true, // 热更新
            proxy: {
                '^/(api)': {
                    target: loadEnv(mode, process.cwd()).VITE_APP_BASE_API,
                    changeOrigin: true,
                },
            },
        },
    }
})
