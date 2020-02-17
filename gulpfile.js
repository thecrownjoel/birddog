// const gulp = require('gulp'),
//     sass = require('gulp-sass'),
//     browserSync = require('browser-sync').create();

//  gulp.task('browserSync', function() {
//     browserSync.init({
//       server: {
//         baseDir: 'app'
//       },
//     })
//   });

//   gulp.task('sass', function() {
//     return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
//       .pipe(sass()) // converts sass to CSS with gulp-sass
//       .pipe(gulp.dest('app/css')) // sends converted files to destination folder
//       .pipe(browserSync.reload({ // reloads browser
//         stream: true
//       }))
//   });


//   gulp.task('watch', gulp.series('sass', 'browserSync'), function(){
//     gulp.watch('src/scss/**/*.scss', sass)
//     // Reloads the browser whenever HTML or JS files change
//     gulp.watch('./*.html').on('change',browserSync.reload);
//     gulp.watch('./js/**/*.js').on('change', browserSync.reload);
//   });



const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync').create();
//compile scss into css
function style() {
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}
function watch() {
    browserSync.init({
        server: {
           baseDir: "./app",
           index: "/index.html"
        }
    });
    gulp.watch('app/scss/**/*.scss', style)
    gulp.watch('app/*.html').on('change',browserSync.reload);
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watch;