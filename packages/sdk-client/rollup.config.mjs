import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup';

export default defineConfig([
  // JavaScript output (ESM + CJS)
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    external: ['tslib', 'axios', 'crypto-js'], // avoid bundling tslib
    plugins: [
      resolve(),
      commonjs(),
      json(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        declaration: true,
        declarationDir: 'dist/types',
        emitDeclarationOnly: false,
      }),
    ],
  },
  // Type declarations (.d.ts)
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]);
