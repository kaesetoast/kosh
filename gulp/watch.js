'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'styles'] ,function () {
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/modules/**/*.js', ['scripts']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});
