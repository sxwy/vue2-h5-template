module.exports = (config) => {
  const viewportWidth = config.file.dirname.includes('vant') ? 375 : 750
  return {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth
      }
    }
  }
}
