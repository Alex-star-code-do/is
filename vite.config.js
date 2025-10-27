import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgLoader from 'vite-svg-loader';
var files = fs.readdirSync('./src/components').filter(function (file) { return file.includes('Ui'); });
var components = files.reduce(function (obj, component) {
    obj[component.split('.')[0]] = "src/components/".concat(component, "/").concat(component, ".vue");
    return obj;
}, {});
export default defineConfig({
    build: {
        target: 'es2022',
        copyPublicDir: false,
        cssCodeSplit: true,
        lib: {
            name: 'is-components-new',
            entry: components,
            formats: ['es'],
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: { vue: 'Vue' },
                entryFileNames: "[name]/[name].js",
                assetFileNames: "[name]/[name].[ext]",
            },
        },
    },
    plugins: [
        vue(),
        svgLoader(),
        dts({
            cleanVueFileName: true,
            entryRoot: './src/components',
            exclude: ['**/*.stories.ts', '**/*.css'],
        }),
        {
            name: 'add-css-link',
            apply: 'build',
            writeBundle: function (option, bundle) {
                var cssFiles = Object.keys(bundle)
                    .filter(function (file) { return file.endsWith('.css') && !file.includes('-'); })
                    .map(function (file) { return file.replace('.css', ''); });
                for (var _i = 0, cssFiles_1 = cssFiles; _i < cssFiles_1.length; _i++) {
                    var file = cssFiles_1[_i];
                    var filePath = path.resolve('', 'dist', "".concat(file, ".js"));
                    var cssImport = "import \"./".concat(file.split('/')[0], ".css\";");
                    var data = fs.readFileSync(filePath, { encoding: 'utf8' });
                    fs.writeFileSync(filePath, "".concat(cssImport, "\n").concat(data));
                }
            },
        },
        viteStaticCopy({
            targets: [
                {
                    src: 'src/components/index.ts',
                    dest: '',
                    rename: 'index.js',
                    transform: function (contents) { return contents.toString().replace(/.(vue|ts)/g, '.js'); },
                },
                {
                    src: 'src/components/index.ts',
                    dest: '',
                    rename: 'index.d.ts',
                    transform: function (contents) { return contents.toString().replace(/.(vue|ts)/g, ''); },
                },
            ],
        }),
    ],
    optimizeDeps: {
        include: ['vue'],
    },
});
