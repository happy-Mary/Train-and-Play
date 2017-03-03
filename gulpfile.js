﻿var gulp = require('gulp'),
    sass = require('gulp-sass'),
    less = require('gulp-less'),
    path = require('path'),
    gcmq = require('gulp-group-css-media-queries'),
    concatCss = require('gulp-concat-css'),
    gulpif = require('gulp-if'), 
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    smartgrid = require('smart-grid'),
    wiredep = require('wiredep').stream;

gulp.task ('default', ['connect', 'watch'])

//build
gulp.task('html', function () {
    //var assets = useref.assets();
    return gulp.src ('app/*.html')
        .pipe(useref())
        //.pipe(assets)
        //.pipe(gulpif('*.js', uglify()))
        //.pipe(gulpif('*.css', cleanCSS()))
        //.pipe(assets.restore())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());

});

//css
gulp.task('css', function () {
  return gulp.src('app/css/*.css')
    .pipe(gcmq())
    .pipe(concatCss("bundle.css")) //как назвать файл
    .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'IE 10'],
            cascade: true
        }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('dist/css')) 
    .pipe(connect.reload()); 
});

//livereload
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//less
gulp.task('less', function () {
  return gulp.src('app/src/**/*.less') // где лежит лесс
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('app/css')) // куда складывать css
}); 

//bower
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory : "app/bower_components"
    }))
    .pipe(gulp.dest('./app'));
});

//watch
gulp.task('watch', function(){
    gulp.watch('app/src/**/*.less', ['less'])
    gulp.watch('app/css/*.css', ['css'])
    gulp.watch('app/*.html', ['html'])
    // gulp.watch('bower.json', ['bower'])
}); 



