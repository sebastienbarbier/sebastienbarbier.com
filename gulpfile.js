var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    watch = require('gulp-watch');

gulp.task('less', function () {
  return gulp.src('./sebastienbarbier/static/css/styles.less')
    .pipe(less())
  	.pipe(minifyCSS())
    .pipe(gulp.dest('./sebastienbarbier/static/css/'));
});

gulp.task('serve', function () {
    watch('./sebastienbarbier/static/css/**/*.less', function () {
        gulp.start('less');
    });
});

gulp.task('default', ['serve']);