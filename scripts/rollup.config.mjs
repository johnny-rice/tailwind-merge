// @ts-check

import path from 'node:path'

import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import del from 'rollup-plugin-delete'
import { dts } from 'rollup-plugin-dts'

import pkg from '../package.json' assert { type: 'json' }

export default defineConfig([
    // Default entry point
    {
        input: pkg.source,
        output: [
            getOutputConfig({
                file: pkg.exports['.'].import,
                format: 'esm',
                targets: '> 0.5%, last 2 versions, Firefox ESR, not dead, maintained node versions',
            }),
            getOutputConfig({
                file: pkg.exports['.'].require,
                format: 'cjs',
                targets: '> 0.5%, last 2 versions, Firefox ESR, not dead, maintained node versions',
            }),
        ],
        external: /node_modules/,
        plugins: [del({ targets: 'dist/*' }), nodeResolve(), typescript()],
    },

    // es5 entry point
    {
        input: pkg.source,
        output: [
            getOutputConfig({
                file: pkg.exports['./es5'].import,
                format: 'esm',
                targets: 'supports es5',
            }),
            getOutputConfig({
                file: pkg.exports['./es5'].require,
                format: 'cjs',
                targets: 'supports es5',
            }),
        ],
        external: /node_modules/,
        plugins: [
            nodeResolve(),
            typescript({
                compilerOptions: {
                    // We don't want to emit declaration files more than once
                    declaration: false,
                    declarationMap: false,
                    outDir: path.dirname(pkg.exports['./es5'].import),
                },
            }),
        ],
    },

    // Type declarations of default and es5 entry points
    {
        input: 'dist/types/index.d.ts',
        output: {
            file: pkg.exports['.'].types,
            format: 'esm',
        },
        plugins: [
            dts(),
            del({
                targets: 'dist/types',
                hook: 'buildEnd',
                runOnce: true,
            }),
        ],
    },
])

/**
 *
 * @param {object} param0
 * @param {string} param0.file
 * @param {'esm' | 'cjs'} param0.format
 * @param {string} param0.targets
 * @returns
 */
function getOutputConfig({ file, format, targets }) {
    /** @satisfies {import('rollup').OutputOptions} */
    const config = {
        file,
        format,
        sourcemap: true,
        freeze: false,
        generatedCode: 'es2015',
        sourcemapPathTransform(relativeSourcePath) {
            // This is necessary because of the tsconfig.compilerOptions.outDir option resulting in a path one level deeper than the output directory.
            // But we also don't want to sync those output paths because that would make the setup for rollup-plugin-delete more complicated.
            return relativeSourcePath.replace('../', '')
        },
        plugins: [
            getBabelOutputPlugin({
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            loose: true,
                            bugfixes: true,
                            modules: false,
                            targets,
                        },
                    ],
                ],
                plugins: [
                    'babel-plugin-annotate-pure-calls',
                    ['babel-plugin-polyfill-regenerator', { method: 'usage-pure' }],
                ],
            }),
        ],
    }

    return config
}
