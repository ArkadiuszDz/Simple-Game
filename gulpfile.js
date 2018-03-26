var gulp = require('gulp');
var sass = require('gulp-sass');
var mapazrodla = require('gulp-sourcemaps');


gulp.task('sass',function(){
  return gulp.src('scss/main.scss',{style: 'expanded', sourcemap: true})
  .pipe(mapazrodla.init())
  .pipe(sass({errLogToConsole: true}))
  .pipe(mapazrodla.write())
  .pipe(gulp.dest('css'));
});

gulp.task('watch',function(){
  gulp.watch('scss/*.scss',['sass']);
});