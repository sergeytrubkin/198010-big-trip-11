const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development', // Режим сборки
  entry: './src/main.js', // Точка входа приложения
  output: {// Настройка выходного файла
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  devtool: 'source-map', // Подключаем sourcemaps
  devServer: {
    contentBase: path.join(__dirname, 'public'), // Где искать сборку
    // Автоматическая  перезагрузка страницы
    // По умолчанию проиложение будет доступно по адресу http://localhost:8080
    // Лучше открывать в режиме инкогнито, чтобы браузер не кэшировал файлы сборки
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // To strip all locales except “en”
    new MomentLocalesPlugin(),

    // Or: To strip all locales except “en”, “es-us” and “ru”
    // (“en” is built into Moment and can’t be removed)
    new MomentLocalesPlugin({
      localesToKeep: ['es-us'],
    }),
  ],
};
