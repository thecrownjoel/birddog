/// https://codehangar.io/concatenate-and-minify-javascript-with-gulp/

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync').create();
      const concat = require('gulp-concat');
      const rename = require('gulp-rename');
      const uglify = require('gulp-uglify');

//compile scss into css
function style() {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}


function scripts() {
    const jsFiles = 'src/js/**/*.js',
    jsDest = 'dist/js';
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest));
}


// watcher
function watch() {
    browserSync.init({
        server: {
           baseDir: "./src",
           index: "/index.html"
        }
    });
    gulp.watch('src/scss/**/*.scss', style)
    gulp.watch('src/js/**/*.js', scripts)
    gulp.watch('src/*.html').on('change',browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
}


exports.style = style;
exports.watch = watch;
exports.scripts = scripts;