import nextVitals from 'eslint-config-next/core-web-vitals';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    ...nextVitals,

    {
        rules: {
            '@next/next/no-img-element': 'off',
        },
    },

    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
