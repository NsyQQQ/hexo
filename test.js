const Hexo = require('hexo');
const path = require('path');

const hexo = new Hexo(path.resolve('.'), {
  config: '_config.yml'
});

hexo.init().then(() => {
  console.log('theme.config:', JSON.stringify(hexo.theme.config, null, 2));
  console.log('hexo.config.theme_config:', JSON.stringify(hexo.config.theme_config, null, 2));
});
