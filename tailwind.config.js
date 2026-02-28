/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1440px',
			},
		},
		extend: {
			colors: {
				// Cyber-Noir Color Palette
				'void-black': '#050505',
				'panel-black': '#0A0A0A',
				'metallic-gold': '#D4AF37',
				'gold-dim': 'rgba(212, 175, 55, 0.3)',
				'gold-glow': 'rgba(212, 175, 55, 0.5)',
				'cyber-green': '#00FF94',
				'green-dim': 'rgba(0, 255, 148, 0.2)',
				'alert-red': '#FF4500',
				'text-main': '#EAEAEA',
				'text-muted': '#888888',
				
				// Keep some default shadcn colors for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: '#050505',
				foreground: '#EAEAEA',
				primary: {
					DEFAULT: '#D4AF37',
					foreground: '#050505',
				},
				secondary: {
					DEFAULT: '#00FF94',
					foreground: '#050505',
				},
				accent: {
					DEFAULT: '#00FF94',
					foreground: '#050505',
				},
				destructive: {
					DEFAULT: '#FF4500',
					foreground: '#EAEAEA',
				},
				muted: {
					DEFAULT: '#888888',
					foreground: '#EAEAEA',
				},
				popover: {
					DEFAULT: '#0A0A0A',
					foreground: '#EAEAEA',
				},
				card: {
					DEFAULT: '#0A0A0A',
					foreground: '#EAEAEA',
				},
			},
			fontFamily: {
				heading: ['Orbitron', 'Space Grotesk', 'sans-serif'],
				body: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			fontSize: {
				'hero': ['64px', { lineHeight: '1.1', fontWeight: '700' }],
				'h1': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
				'h2': ['32px', { lineHeight: '1.3', fontWeight: '500' }],
				'mono-lg': ['18px', { lineHeight: '1.4', fontFamily: 'JetBrains Mono' }],
				'mono-base': ['14px', { lineHeight: '1.5', fontFamily: 'JetBrains Mono' }],
				'ticker': ['12px', { lineHeight: '1.4', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em' }],
			},
			spacing: {
				'4': '4px',
				'8': '8px',
				'12': '12px',
				'16': '16px',
				'24': '24px',
				'32': '32px',
				'48': '48px',
				'64': '64px',
				'96': '96px',
				'128': '128px',
			},
			borderRadius: {
				'cut': 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
			},
			boxShadow: {
				'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
				'green-glow': '0 0 15px rgba(0, 255, 148, 0.4)',
			},
			backdropBlur: {
				'glass': '12px',
			},
			keyframes: {
				'glitch': {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' },
					'100%': { transform: 'translate(0)' },
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'ticker-scroll': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				'pulse-gold': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
			},
			animation: {
				'glitch': 'glitch 0.3s ease-in-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'ticker-scroll': 'ticker-scroll 30s linear infinite',
				'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
