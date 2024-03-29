// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');

// //browser sync reload
// const browsersync = require('browser-sync');

// function browsersyncTask () {
//     browsersync.init({
//     proxy: 'iiotatlas.local'
//     });
// };
// function reloadTask () {
//     browsersync.reload();
// };

// File paths
const files = {
    scssPath: 'assets/scss/**/*.scss',
    jsPath: 'assets/vendor/js/*.js'
}

// Sass task: compiles the style.scss file into style.css
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
        // .pipe(concat('main.min.css'))
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('assets/css')) // put final CSS in dist folder
        // .pipe(browsersync.stream());
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
    return src([
        files.jsPath
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('assets/js'));
}

// Cachebust
// function cacheBustTask() {
//     var cbString = new Date().getTime();
//     return src(['index.html'])
//         .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
//         .pipe(dest('.'));
// }

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
    // watch([files.scssPath, files.jsPath], { interval: 1000, usePolling: true }, //Makes docker work
    watch([files.scssPath], { interval: 1000, usePolling: true }, //Makes docker work
        series(
            // parallel(scssTask, jsTask),
            parallel(scssTask),
            // reloadTask
            // cacheBustTask
        )
    );
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    // parallel(scssTask, jsTask),
    parallel(scssTask),
    // browsersyncTask,
    // cacheBustTask,
    watchTask
);

/* Live server 
    npm i -g browser-sync
    browser-sync start --proxy “iiotatlas.local” --files “*.html” “css/*.css” “js/*.js” --browser “chrome”

    view browser localhost:3000
 */