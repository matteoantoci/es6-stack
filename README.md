## ES6 Stack

This is a boilerplate repo to make it easy to start an [ES6] ready project.
It supports Babel to transpile from ES6 to ES5 and Karma specs runner out of the box.

Inspired by [es6-babel-browserify-boilerplate](https://github.com/thoughtram/es6-6to5-browserify-boilerplate.git).


### Initial setup

```bash
# Clone the repo...
git clone https://github.com/matteoantoci/es6-stack.git
cd es6-stack

# Then, you need to install all the dependencies...
npm install

# If you wanna be able to use global commands `karma` and `gulp`...
npm install -g gulp
```

### Watch dev assets
```bash
gulp

# Build prod assets...
gulp build

# If you wanna Gulp to watch your unit tests...
gulp spec

# If you wanna Gulp to watch your end2end tests, make sure the server is running and...
gulp e2e
```


### What are all the pieces involved?

#### [Gulp]
Task runner to make defining and running the tasks simpler.

#### [BrowserSync]
Run a local server and sync file changes and interactions across multiple devices. Remote debugging out of the box!

#### [Babel]
Transpiles ES6 code into regular ES5 (today's JavaScript) so that it can be run in a today browser. 
Like traceur but doesn't need a runtime to work. Formerly known as 6to5.

#### [Webpack]
Webpack walks through all files and traces down all `require()`s to bundle all files together.

#### [ESLint]
Linting utility to write better ES6 code.

#### [Karma]
Really simple and powerful test suite runner.

[BrowserSync]: http://www.browsersync.io/
[ES6]: http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts
[Babel]: http://babeljs.io/
[CommonJS]: http://wiki.commonjs.org/wiki/CommonJS
[Webpack]: http://webpack.github.io/
[Gulp]: http://gulpjs.com/
[ESLint]: http://eslint.org/
[Karma]: http://karma-runner.github.io/
