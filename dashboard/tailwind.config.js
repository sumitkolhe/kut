module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'],
      },
      colors: {
        background: 'var(--geist-background)',
        foreground: 'var(--geist-foreground)',
        success: 'var(--success)',
        successLight: 'var(--success-light)',
        successDark: 'var(--success-dark)',
        error: 'var(--error)',
        errorLight: 'var(--error-light)',
        errorDark: 'var(--error-dark)',
        alert: 'var(--alert)',
        purple: 'var(--purple)',
        violet: 'var(--violet)',
        cyan: 'var(--cyan)',
        accent1: 'var(--accent1)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
        accent4: 'var(--accent4)',
        accent5: 'var(--accent5)',
        accent6: 'var(--accent6)',
        accent7: 'var(--accent7)',
        accent8: 'var(--accent8)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
