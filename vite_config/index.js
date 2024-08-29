import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default {
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './core/tools/') // 设置路径别名
        }
    },
    build: {
        outDir: 'build', // 指定输出路径
        assetsDir: 'static', // 指定生成静态文件目录
        emptyOutDir: true // 构建时清空该目录
    },
    server: {
        host: '0.0.0.0',//ip地址
        port: 12580, // 设置服务启动端口号
        strictPort: true, // 若端口已被占用则会直接退出
        https: false, // 启用 TLS + HTTP/2
        open: true, // 设置服务启动时是否自动打开浏览器 
        // proxy: { // 配置自定义代理规则
        //   '/api': {
        //     target: 'https://leehaipei.com',
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/api/, '')
        //   }
        // },
        // cors: false, // 配置 CORS
    }
}
