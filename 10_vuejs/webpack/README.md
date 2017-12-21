## Using vue.js with webpack

While defining components in js files is possible, it is ugly because we have to define the component templates as a string.

We can create single file components using files with a `.vue` extension and using webpack to preprocess these files. The .vue files allow us to build our components in an encapsulated way, where we can define the template using regular html and let webpack put the component together for us.

we have to create a `webpack.config.js` file and tell it to look for `.vue` files and use the `vue-loader` to process them. We can then simply gain access to components using `require` or `import`

Since webpack requires one or more entry points, we also need to provide an entry point to our app (usually a javascript file).

Remember there are three main things to configure in the webpack javascript file:
1. The entry point (entry:)
2. The output {output filename, output path, public path}
3. Other modules to use like loaders
