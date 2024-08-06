module.exports = {
  globDirectory: 'dist/apps/your-app/',
  globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
  swDest: 'dist/apps/your-app/sw.js',
  clientsClaim: true,
  skipWaiting: true,
};
