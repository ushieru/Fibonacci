const { spawn } = require('child_process')

let server;

require('esbuild').build({
    entryPoints: ['./index.ts'],
    watch: {
        onRebuild: () => {
            console.log('\n[Rebuilt 🚀]\n');
            if (server) server.kill('SIGINT')
            server = spawn('node', ['./dist'], { stdio: 'inherit' });
        }
    },
    bundle: true,
    minify: true,
    platform: 'node',
    target: 'node10.4',
    external: ['node_modules/*'],
    outfile: './dist/index.js',
})
    .then(() => {
        console.log("\n[Done 🚀]\n")
        server = spawn('node', ['./dist'], { stdio: 'inherit' });
    })
    .catch(() => process.exit(1))