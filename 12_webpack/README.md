## Webpack

see https://webpack.github.io/docs/usage.html

Webpack is a module bundler for websites. What this means is that Webpack can take our code and assest, analyze which files depend on others and use that to turn the separate code files into one big bundle file. We can then include this bundle file with our website without having to worry about include orders etc.

## How does webpack work

In our files we indicate a dependency using `require(<filename>)`, this is similar to how we use header files or packages in other programming languages.

We then compile all our code into a one file by running webpack and specifying the main file of our code as an entry point. For example
```javascript
//index.js
var names = require('./names.js')
console.log(names);
```
```javascript
//names.js
module.exports = ['bob','sam','alex'];
```
```bash
webpack index.js ./dist/bundle.js
```

## Using a configuration file
Webpack provides a lot of functionality that we need to use a configuration file to gain access to. Webpack configuration files are javascript files that use `module.exports` to export information such as the main entry point for our code

In the configuration file we can specify specific loaders that will be used to preprocess files with specific file extensions. We can additionally use plugins to postprocess the javascript file that webpack outputs.
```javascript
const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        path: './bin',
        filename: 'app.bundle.js',
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
}
```
