const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const fileInclude = require('gulp-file-include');
const concat = require('gulp-concat');

gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: 'dist',
    },
    open: false,
  });

  gulp.watch('src/index.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
  return gulp
    .src('src/scss/**/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.+(scss|sass|css)', gulp.parallel('styles'));
  gulp.watch('src/js/*.js').on('change', gulp.parallel('scripts'));
  gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
  return gulp
    .src('src/*.html')
    .pipe(fileInclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function () {
  return gulp
    .src('src/js/*.js')
    .pipe(concat('index.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('dist/js'))
});

gulp.task(
  'default',
  gulp.parallel(
    'server',
    'styles',
    'watch',
    'html',
    'scripts',
  )
);
