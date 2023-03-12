import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/**/*.{ts,tsx}', '!src/**/*.stories.{ts,tsx}'],
  format: ['esm', 'cjs'],
  sourcemap: true,
  dts: true,
});
