export default {
    root: './',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: 'index.html',
                ai_tool: 'ai-tool.html' // Add new page entry
            }
        }
    }
}
