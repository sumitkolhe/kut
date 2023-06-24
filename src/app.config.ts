export default defineAppConfig({
  ui: {
    primary: 'midnight',
    gray: 'neutral',

    container: {
      base: 'mx-auto w-full',
      padding: 'px-6',
      constrained: 'max-w-screen-5xl',
    },

    button: {
      base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0',
      font: 'font-normal',
      rounded: 'rounded',
      size: {
        '2xs': 'text-xs',
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-sm',
        xl: 'text-base',
      },
      gap: {
        '2xs': 'gap-x-1',
        xs: 'gap-x-1.5',
        sm: 'gap-x-1.5',
        md: 'gap-x-2',
        lg: 'gap-x-2.5',
        xl: 'gap-x-2.5',
      },
      padding: {
        '2xs': 'px-2 py-1',
        xs: 'px-2.5 py-1.5',
        sm: 'px-3 py-1.5',
        md: 'px-3 py-2',
        lg: 'px-3.5 py-2.5',
        xl: 'px-3.5 py-2.5',
      },
      square: {
        '2xs': 'p-1',
        xs: 'p-1.5',
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-2.5',
        xl: 'p-2.5',
      },
      variant: {
        solid:
          'border shadow-sm border-primary-900 bg-primary-900 text-primary-50 transition hover:border-primary-500 hover:bg-primary-700 hover:text-primary-50 disabled:cursor-not-allowed disabled:border-primary-200 disabled:bg-primary-100 disabled:text-primary-300 dark:border-primary-100 dark:bg-primary-50 dark:text-primary-900 dark:hover:border-primary-200 dark:hover:bg-primary-200 dark:hover:text-primary-800 disabled:dark:border-primary-700 disabled:dark:bg-primary-800 disabled:dark:text-primary-400',
        outline:
          'shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        soft: 'text-primary-500 dark:text-primary-400 bg-primary-50 hover:bg-primary-100 dark:bg-primary-950 dark:hover:bg-primary-900 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        ghost:
          'text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        link: 'text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
      },
      icon: {
        base: 'flex-shrink-0',
        size: {
          '2xs': 'h-4 w-4',
          xs: 'h-4 w-4',
          sm: 'h-5 w-5',
          md: 'h-5 w-5',
          lg: 'h-5 w-5',
          xl: 'h-6 w-6',
        },
      },
      default: {
        size: 'md',
        variant: 'solid',
        color: 'primary',
        loadingIcon: 'i-heroicons-arrow-path-20-solid',
      },
    },

    formGroup: {
      wrapper: '',
      label: {
        wrapper: 'flex content-center justify-between',
        base: 'block text-sm font-regular text-primary-700 dark:text-primary-500',
        required: "after:content-['*'] after:ml-0.5 after:text-red-500 dark:after:text-red-400",
      },
      description: 'text-sm text-primary-500 dark:text-primary-400',
      container: 'mt-1 relative',
      hint: 'text-sm text-primary-500 dark:text-primary-400',
      help: 'mt-2 text-sm text-primary-500 dark:text-primary-400',
      error: 'mt-2 text-sm text-red-500 dark:text-red-400',
    },

    input: {
      base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 font-normal',
      rounded: 'rounded',
      placeholder:
        'placeholder-primary-400 dark:placeholder-primary-500 placeholder-font-light text-sm',
      color: {
        white: {
          outline:
            'bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-primary-50 ring-1 ring-inset ring-primary-200 dark:ring-primary-700 focus:ring-1 focus:ring-primary-900 dark:focus:ring-primary-400',
        },
      },

      default: {
        loadingIcon: 'i-tabler-loader-2',
      },
    },

    slideover: {
      base: 'relative flex-1 flex flex-col w-full h-fit min-h-screen focus:outline-none',
      width: 'w-screen max-w-lg',
      wrapper: 'fixed inset-0 flex z-50 overflow-y-scroll',
    },

    toggle: {
      active: 'bg-primary-900 dark:bg-primary-300',
      inactive: 'bg-primary-200 dark:bg-primary-600',
    },
  },
})
