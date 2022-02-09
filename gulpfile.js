/* eslint-disable no-undef */
const gulp = require('gulp');
const del = require('del');
const terser = require('gulp-terser-js');
const cleanCSS = require('gulp-clean-css');
// const rename = require("gulp-rename");
const concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'));

const src = {
  js: 'src/js/**/*.js',
  fonts: 'src/fonts/**/*',
  img: 'src/img/**/*',
  // libs: 'src/libs/**/*',
  scss: 'src/styles/scss/**/*.scss',
  css: 'src/styles/css/**/*.css',
  html: 'src/**/*.html',
};
const dest = {
  js: 'dest/js',
  fonts: 'dest/fonts',
  img: 'dest/img',
  // libs: 'dest/libs',
  scss: 'src/styles/css/compiled',
  css: 'dest',
  html: 'dest',
};

function watch() {
  browserSync.init({
    server: ['./src', './dest'],
  });

  gulp.watch(src.scss, scss);
  gulp.watch(src.css, css);
  gulp.watch(src.fonts, fonts);
  gulp.watch(src.img, img);
  gulp.watch(src.js, js);
  // gulp.watch(src.libs, libs)
  gulp.watch(src.html, html);
}

function html() {
  return gulp
    .src(src.html)
    .pipe(gulp.dest(dest.html))
    .pipe(reload({ stream: true }));
}

function scss() {
  return gulp
    .src(src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dest.scss))
    .pipe(reload({ stream: true }));
}

function css() {
  return gulp
    .src(src.css)
    .pipe(autoprefixer(['last 15 versions', '>.1%']))
    .pipe(concatCss("bundle.min.css"))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest(dest.css))
    .pipe(reload({ stream: true }));
}

function fonts() {
  return gulp
    .src(src.fonts)
    .pipe(gulp.dest(dest.fonts))
    .pipe(reload({ stream: true }));
}

function img() {
  return gulp
    .src(src.img)
    .pipe(gulp.dest(dest.img))
    .pipe(reload({ stream: true }));
}

function js() {
  return gulp
    .src(src.js)
    .pipe(babel())
    .pipe(
      terser({
        mangle: {
          toplevel: true,
        },
        safari10: true,
      }),
    )
    // .pipe(rename({
    //   suffix: ".min"
    // }))
    .pipe(gulp.dest(dest.js))
    .pipe(reload({ stream: true }));
}

// function libs() {
//   return gulp
//     .src(src.libs)
//     .pipe(gulp.dest(dest.libs))
//     .pipe(reload({ stream: true }))
// }

function clean() {
  return del([`dest`]);
}

const build = gulp.series(
    gulp.parallel(clean, scss), 
    gulp.parallel(css, js, /*libs,*/img, fonts, html ));

gulp.task('serve', gulp.series(build, watch));
gulp.task('build', build);