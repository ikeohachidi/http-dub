const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
	lib: {
		entry: path.resolve(__dirname, 'src/main.ts'),
		name: 'HttpDub',
		fileName: (format) => `http-dub.${format}.js`
	},
  }
})