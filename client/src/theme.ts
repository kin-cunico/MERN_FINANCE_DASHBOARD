export const tokens = {
	grey: {
		100: "#f0f0f3",
		200: "#e1e2e7",
		300: "#d1d3da",
		400: "#c2c5ce",
		500: "#b3b6c2",
		600: "#8f929b",
		700: "#6b6d74",
		800: "#48494e",
		900: "#242427",
	},
	primary: {
		//purple shader
		100: "#e7e6f7",
		200: "#cfceef",
		300: "#b8b5e8",
		400: "#a09de0",
		500: "#8884d8",
		600: "#6d6aad",
		700: "#524f82",
		800: "#363556",
		900: "#1b1a2b",
	},
	secondary: {
		// yellow
		100: "#fcf0dd",
		200: "#fae1bb",
		300: "#f7d299",
		400: "#f5c377",
		500: "#f2b455",
		600: "#c29044",
		700: "#916c33",
		800: "#614822",
		900: "#302411",
	},
	tertiary: {
		100: "#e0f4f8",
		200: "#c1e8f0",
		300: "#a1dde9",
		400: "#82d1e1",
		500: "#63c6da",
		600: "#4f9eae",
		700: "#3b7783",
		800: "#284f57",
		900: "#14282c",
	},

	red: {
		//red shader
		100: "#f6ccd2",
		200: "#ed99a5",
		300: "#e36679",
		400: "#da334c",
		500: "#d1001f",
		600: "#a70019",
		700: "#7d0013",
		800: "#54000c",
		900: "#2a0006",
	},
	background: {
		light: "#2d2d34",
		main: "#1f2026",
	},
};

// mui theme settings
export const themeSettings = {
	palette: {
		primary: {
			...tokens.primary,
			main: tokens.primary[500],
			light: tokens.primary[400],
		},
		secondary: {
			...tokens.secondary,
			main: tokens.secondary[500],
		},
		tertiary: {
			...tokens.tertiary,
		},
		red: {
			...tokens.red,
		},
		grey: {
			...tokens.grey,
			main: tokens.grey[500],
		},
		background: {
			default: tokens.background.main,
			light: tokens.background.light,
		},
	},
	typography: {
		fontFamily: ["Inter", "sans-serif"].join(","),
		fontSize: 12,
		h1: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 32,
		},
		h2: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 24,
		},
		h3: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 20,
			fontWeight: 800,
			color: tokens.grey[200],
		},
		h4: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 14,
			fontWeight: 600,
			color: tokens.grey[300],
		},
		h5: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 12,
			fontWeight: 400,
			color: tokens.grey[500],
		},
		h6: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 10,
			color: tokens.grey[700],
		},
	},
};
