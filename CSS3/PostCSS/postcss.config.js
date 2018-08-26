module.exports = {
  // parser: 'postcss-scss',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    },
    "postcss-simple-vars": {},
    "postcss-nested": {},
    /* "autoprefixer": {
      browsers: ['last 2 versions', '> 5%']
    }, */
    "postcss-sprites": {
      retina: true,
      verbose: true,
      spritePath: './src/sprites/',
      stylesheetPath: './src',
      basePath: './',

      //过滤一些不需要合并的图片
      filterBy: function (image) {
        // if (image.url.indexOf('images/sprites') === -1) {
        if (image.url.indexOf('images/temp') > -1) {
            return Promise.reject();
        }
        return Promise.resolve();
      },
      //雪碧图分组
      groupBy: function (image) {
        let icon = 'icon';
        let groups = /\/images\/sprites\/(.*?)\/.*/gi.exec(image.url);
        let groupName = groups ? groups[1] : icon;
        image.retina = true;
        image.ratio = 1;
        if (groupName) {
          let ratio = /@(\d+)x$/gi.exec(groupName);
          if (ratio) {
              ratio = ratio[1];
              while (ratio > 10) {
                  ratio = ratio / 10;
              }
              image.ratio = ratio;
          }
        }
        return Promise.resolve(groupName);
      },
    },
    /* "postcss-pxtorem": {
      rootValue: 75,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 12
    }, */
    // "cssnano": {}
  },
};