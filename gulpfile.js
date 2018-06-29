'use-strict';

const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');

gulp.task('clean', () => del('./docs/**/*'));

gulp.task('pug', () => gulp.src([
        'src/**/*.pug',
        '!src/views/preview.pug'
    ])
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('docs')));

gulp.task('scss', () => gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer ]))
    .pipe(concat('kiosk.css'))
    .pipe(gulp.dest('docs')));

gulp.task('babel', () => gulp.src(['src/**/*.js', '!src/**/*.spec.js'])
    .pipe(plumber())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('kiosk.js'))
    .pipe(gulp.dest('docs')));

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './docs'
        }
    });
});

gulp.task('build', cb => runSequence('clean', ['babel', 'pug', 'scss'], cb));

gulp.task('watch', () => {
    gulp.watch('**/*.pug', { cwd: './src' }, ['pug']);
    gulp.watch('**/*.scss', { cwd: './src' }, ['scss']);
    gulp.watch('**/*.js', { cwd: './src' }, ['babel']);
});

gulp.task('serve', (cb) => {
    runSequence('build', 'browser-sync', 'watch', cb);
});