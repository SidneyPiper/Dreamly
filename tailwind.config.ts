import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                'primary': '#3A7CA5',
                'primary-light': '#81C3D7',
                'cloud': '#e5e8db',
                'traffic': {
                    '500': '#a5d46a',
                    '400': '#ffff80',
                    '300': '#ffdf80',
                    '200': '#ffc080',
                    '100': '#ffa080'
                }
            },
            fontFamily: {
                'sans': ['Inter', ...defaultTheme.fontFamily.sans],
                'mono': ['Chivo Mono', ...defaultTheme.fontFamily.sans],
            },
            transitionTimingFunction: {
                'out-bounce': 'cubic-bezier(0.840, -0.060, 0.020, 1.415)',
            }
        },
    },
    safelist: [
        {
            pattern: /(bg|text|border|shadow)(-t|-r|-b|-l)?-traffic-(100|200|300|400|500)/
        }
    ],
    plugins: [
        require('@tailwindcss/forms')
    ],
}

// https://coolors.co/palette/2f6690-3a7ca5-d9dcd6-16425b-81c3d7