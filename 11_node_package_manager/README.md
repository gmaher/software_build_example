## NPM The Node Package Manager

NPM is a package manager that makes it easier to manage and distribute javascript code. It was originally mainly intended for sharing code related to the javascript server engine, Node.js, but now is also used for sharing general javascript code.

## Installing packages locally vs. globally

If we install a package locally, NPM will place it in a `node_modules` folder in the directory we called `npm` from.

If we install globally, NPM will place the package in the global node_modules package, usually `/usr/local` or in the directory where NPM was installed. Global npm packages are usually used for command line tools provided via node that must be called via the command line for multiple projects.

## Using a node package
We can install an npm package locally using `npm install <package_nam>` or `npm install -g <package_name>`.

As most node packages are just javascript, we can include them using `<script></script>` tages in our webpage.

If we are using Node.js we can use the `require` command.

## What is in a node package

When we install a package using node, we get a folder containing files and directories related to the package we installed.

### Package.json

The package.json file is a json file that contains information about our app/package. It lists things like the author name, license, github url, and other npm dependencies that it depends on. A minimal package.json file looks like
```json
{
  "name": "my_package",
  "version": "1.0.0",
  "dependencies": {
    "my_dep": "^1.0.0"
  },
  "devDependencies" : {
    "my_test_framework": "^3.1.0"
  }
}
```
We can manually add packages to our package.json file, or we can have npm add them automatically using `npm install <package_name> --save`.

Once we have a package.json file, we can install all dependencies using `npm install`

We can use `npm update` to update packages and `npm outdated` to see which packages need updates.

`npm uninstall <package_name> --save` will uninstall the package and remove it from the package.json file

## Creating a node package/module
To create a module we need to create a `package.json` file with the name and version fields. We can also indicate the main javascript file of our package, using the `main` field of the package.json file.

Then in the main jacascript file we can export code for others to use, by adding them as a property of the exports object
```javascript
exports.printMsg = function(){
  console.log("Included some code");
}
```

To publish a npm package we need to create a user on the npm registry using `npm adduser`.

Then we can use `npm publish` to publish our package. All files will be included, but we can use a `.gitignore` or `.npmignor` file to ignore certain files.

We can update a npm package using `npm update <patc> or <minor> or <major>`, this will change the version number.

## How does NPM work?

Npm uses the following definitions for a package


* a) A folder containing a program described by a package.json file.
* b) A gzipped tarball containing (a).
* c) A url that resolves to (b).
* d) A <name>@<version> that is published on the registry with (c).
* e) A <name>@<tag> that points to (d).
* f) A <name> that has a latest tag satisfying (e).
* g) A git url that, when cloned, results in (a).

A module is defined as anything that can be loaded with the `require` command in Node.js
