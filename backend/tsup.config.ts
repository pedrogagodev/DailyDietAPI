// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts', 'migrations/*.ts'],
  outDir: 'build',
  format: ['esm'],
  sourcemap: true,
  clean: true
});