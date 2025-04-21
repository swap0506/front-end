import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				primary: {
					50: 'hsl(var(--primary-50))',
					100: 'hsl(var(--primary-100))',
					200: 'hsl(var(--primary-200))',
					300: 'hsl(var(--primary-300))',
					400: 'hsl(var(--primary-400))',
					500: 'hsl(var(--primary-500))',
					600: 'hsl(var(--primary-600))',
					700: 'hsl(var(--primary-700))',
					800: 'hsl(var(--primary-800))',
					900: 'hsl(var(--primary-900))',
					950: 'hsl(var(--primary-950))',
					DEFAULT: 'hsl(var(--primary-500))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				
				secondary: {
					50: 'hsl(var(--secondary-50))',
					100: 'hsl(var(--secondary-100))',
					200: 'hsl(var(--secondary-200))',
					300: 'hsl(var(--secondary-300))',
					400: 'hsl(var(--secondary-400))',
					500: 'hsl(var(--secondary-500))',
					600: 'hsl(var(--secondary-600))',
					700: 'hsl(var(--secondary-700))',
					800: 'hsl(var(--secondary-800))',
					900: 'hsl(var(--secondary-900))',
					950: 'hsl(var(--secondary-950))',
					DEFAULT: 'hsl(var(--secondary-500))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				
				tertiary: {
					50: 'hsl(var(--tertiary-50))',
					100: 'hsl(var(--tertiary-100))',
					200: 'hsl(var(--tertiary-200))',
					300: 'hsl(var(--tertiary-300))',
					400: 'hsl(var(--tertiary-400))',
					500: 'hsl(var(--tertiary-500))',
					600: 'hsl(var(--tertiary-600))',
					700: 'hsl(var(--tertiary-700))',
					800: 'hsl(var(--tertiary-800))',
					900: 'hsl(var(--tertiary-900))',
					950: 'hsl(var(--tertiary-950))',
					DEFAULT: 'hsl(var(--tertiary-500))',
					foreground: 'hsl(var(--tertiary-foreground))'
				},
				
				neutral: {
					50: 'hsl(var(--neutral-50))',
					100: 'hsl(var(--neutral-100))',
					200: 'hsl(var(--neutral-200))',
					300: 'hsl(var(--neutral-300))',
					400: 'hsl(var(--neutral-400))',
					500: 'hsl(var(--neutral-500))',
					600: 'hsl(var(--neutral-600))',
					700: 'hsl(var(--neutral-700))',
					800: 'hsl(var(--neutral-800))',
					900: 'hsl(var(--neutral-900))',
					950: 'hsl(var(--neutral-950))',
					DEFAULT: 'hsl(var(--neutral-500))'
				},
				
				success: {
					50: 'hsl(var(--success-50))',
					100: 'hsl(var(--success-100))',
					200: 'hsl(var(--success-200))',
					300: 'hsl(var(--success-300))',
					400: 'hsl(var(--success-400))',
					500: 'hsl(var(--success-500))',
					600: 'hsl(var(--success-600))',
					700: 'hsl(var(--success-700))',
					800: 'hsl(var(--success-800))',
					900: 'hsl(var(--success-900))',
					950: 'hsl(var(--success-950))',
					DEFAULT: 'hsl(var(--success-500))',
					foreground: 'hsl(var(--success-foreground))'
				},
				
				info: {
					50: 'hsl(var(--info-50))',
					100: 'hsl(var(--info-100))',
					200: 'hsl(var(--info-200))',
					300: 'hsl(var(--info-300))',
					400: 'hsl(var(--info-400))',
					500: 'hsl(var(--info-500))',
					600: 'hsl(var(--info-600))',
					700: 'hsl(var(--info-700))',
					800: 'hsl(var(--info-800))',
					900: 'hsl(var(--info-900))',
					950: 'hsl(var(--info-950))',
					DEFAULT: 'hsl(var(--info-500))',
					foreground: 'hsl(var(--info-foreground))'
				},
				
				warning: {
					50: 'hsl(var(--warning-50))',
					100: 'hsl(var(--warning-100))',
					200: 'hsl(var(--warning-200))',
					300: 'hsl(var(--warning-300))',
					400: 'hsl(var(--warning-400))',
					500: 'hsl(var(--warning-500))',
					600: 'hsl(var(--warning-600))',
					700: 'hsl(var(--warning-700))',
					800: 'hsl(var(--warning-800))',
					900: 'hsl(var(--warning-900))',
					950: 'hsl(var(--warning-950))',
					DEFAULT: 'hsl(var(--warning-500))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				
				error: {
					50: 'hsl(var(--error-50))',
					100: 'hsl(var(--error-100))',
					200: 'hsl(var(--error-200))',
					300: 'hsl(var(--error-300))',
					400: 'hsl(var(--error-400))',
					500: 'hsl(var(--error-500))',
					600: 'hsl(var(--error-600))',
					700: 'hsl(var(--error-700))',
					800: 'hsl(var(--error-800))',
					900: 'hsl(var(--error-900))',
					950: 'hsl(var(--error-950))',
					DEFAULT: 'hsl(var(--error-500))',
					foreground: 'hsl(var(--error-foreground))'
				},
				
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'progress-indeterminate': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(5px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					from: { opacity: '1', transform: 'translateY(0)' },
					to: { opacity: '0', transform: 'translateY(5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'progress-indeterminate': 'progress-indeterminate 1.5s infinite cubic-bezier(0.65, 0.815, 0.735, 0.395)',
				'fade-in': 'fade-in 0.2s ease-out',
				'fade-out': 'fade-out 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
