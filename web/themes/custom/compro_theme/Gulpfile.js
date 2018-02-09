var gulp = require('gulp');
  postcss = require('gulp-postcss');
  browserSync = require('browser-sync');
  cssNext = require('postcss-cssnext');
  cssNano = require('cssnano');
  watch = require('gulp-watch');
  sourcemaps = require('gulp-sourcemaps');
  sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('css', function() {
  var plugins = [
    cssNext(),
    cssNano()
  ];
  return gulp.src('./css/style.css')
    // .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css/dist/'));
});

gulp.task('browserSync', function () {
  browserSync.init({
    proxy: 'localhost:8000/web'
  });
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('watch', function () {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('css/*.css', ['css']);
  gulp.watch('css/dist/style.css', ['reload']);
});

gulp.task('default', ['browserSync', 'watch']);