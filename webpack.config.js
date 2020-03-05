const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  //target: "web",
  devtool: 'eval-source-map',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  // externals: {
  //   // Don't bundle react      
  //   react: {
  //     commonjs: "react",
  //     commonjs2: "react",
  //     amd: "React",
  //     root: "React"
  //   }
  // },
};
