'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const debug = require('gulp-debug');
const del = require('del');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const minify = require('gulp-csso');
const multipipe = require('multipipe');
const rename = require('gulp-rename');
const gulpStylelint = require('@ronilaukkarinen/gulp-stylelint');
const compress_images = require('compress-images');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');

gulp.task('styles', function () {
  return multipipe(
    gulp.src('src/styles/*.scss'),
    sass().on('error', sass.logError),
    postcss([
      autoprefixer(),
      mqpacker({
        sort: true,
      }),
    ]),
    gulp.dest('build/styles'),
    minify(),
    rename('style-min.css'),
    debug({ title: 'min-css' }),
    gulp.dest('build/styles')
  ).on(
    'error',
    notify.onError(function (err) {
      return {
        title: 'Styles',
        message: err.message,
      };
    })
  );
});

// sass lint ftw(for better coding practices)
gulp.task('lint-css', function () {
  return gulp.src('src/styles/*.scss').pipe(
    gulpStylelint({
      reporters: [{ formatter: 'string', console: true }],
      debug: true,
      failAfterError: false,
    })
  );
});

gulp.task('min-js', function () {
  return multipipe(
    gulp.src('src/js/*.js'),
    babel({
      presets: ['@babel/env'],
    }),
    uglify(),
    gulp.dest('build/js')
  );
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/*').pipe(gulp.dest('build/fonts'));
});

gulp.task('img-compress', async function () {
  return await compress_images(
    'src/img/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif,webp,avif}',
    'build/img/',
    {
      compress_force: false,
      statistic: true,
      autoupdate: true,
    },
    false,
    {
      jpg: {
        engine: 'mozjpeg',
        command: ['-quality', '75'],
      },
    },
    { png: { engine: 'pngquant', command: ['--quality=65-80', '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    {
      gif: {
        engine: 'gifsicle',
        command: ['--colors', '64', '--use-col=web'],
      },
    },
    function (err, completed) {
      if (err !== null) {
        if (err.engine === 'jpegRecompress') {
          compress_images(
            err.input,
            err.output,
            {
              compress_force: false,
              statistic: true,
              autoupdate: true,
            },
            false,
            { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
            { png: { engine: false, command: false } },
            { svg: { engine: false, command: false } },
            { gif: { engine: false, command: false } }
          );
        }
      }
    }
  );
});

gulp.task('html', function () {
  return multipipe(
    gulp.src('src/html/**/*.html'),
    /*
    htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: false,
      minifyCSS: false,
    }),
    */
    debug({ title: 'html-debug' }),
    gulp.dest('build')
  ).on(
    'error',
    function (err) {
      console.error('HTML Error:', err.message);
      this.emit('end');
    }
  );
});

gulp.task('copy-images', function () {
  return gulp.src('src/img/**/*').pipe(gulp.dest('build/img'));
});

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel('html', 'lint-css', 'styles', 'min-js', 'copy-images'),
    'img-compress',
    'fonts'
  )
);

gulp.task('watch', function () {
  gulp.watch('src/html/**/*.html', gulp.series('html'));

  gulp.watch('src/js/*.js', gulp.series('min-js'));

  gulp.watch('src/styles/**/*.*', gulp.series('styles', 'lint-css'));

  gulp.watch('src/img/**/*.*', gulp.series('copy-images', 'img-compress'));
});


gulp.task('serve', function () {
  browserSync.init({
    server: 'build',
  });

  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));
