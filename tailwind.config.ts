// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    theme: {
        extend: {
            fontFamily: {
                'inter-tight': ['"Inter Tight"', 'sans-serif'],
            },
        },
    },
    content: ["./src/**/*.{tsx}"],
    plugins: [],
};
export default config;
