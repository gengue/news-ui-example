var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var cache = require('gulp-cached');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');
var angularFilesort = require('gulp-angular-filesort');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); // $ npm i -D imagemin-pngquant
var babel = require("gulp-babel");
var connect = require('gulp-connect');

var bowerConf = {
  paths: './',
  includeDev: true
};

var htmlminOpts = {
  removeComments: true,
  collapseWhitespace: true,
  removeEmptyAttributes: false,
  collapseBooleanAttributes: true,
  removeRedundantAttributes: true
};

var paths = {
  sass: ['./src/**/**/*.scss'],
  js: ['./src/**/**/*.js'],
  templates: ['./src/**/*.html'],
  vendor: ['./vendor/**/**/*.js'],
  img : ['./src/assets/img/*']
};

gulp.task('default', ['sass', 'js', 'vendor', 'templates', 'images', 'fonts']);

  /*
    | --- SASS -----------------------------------------------
    */

gulp.task('sass', function(done) {
  gulp.src('./src/scss/main.scss')
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sass())
  .pipe(minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(sourcemaps.write('../maps'))
  .pipe(gulp.dest('./public/css/'))
  .pipe(connect.reload())
  .on('end', done);
});

/*
  | --- JS -------------------------------------------------
  */

gulp.task('vendor', function(done) {

  var vendorFiles = require('./vendor.json');

  gulp.src(vendorFiles)
  //.pipe(cache('vendor'))
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(sourcemaps.write('../maps'))
  .pipe(gulp.dest('./public/js/'))
  .pipe(connect.reload())
  .on('end', done);
});

gulp.task('js', function(done) {
  gulp.src(['./src/**/*.js'])
  .pipe(babel())
  .pipe(angularFilesort())
  .pipe(concat('bundle.js'))
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(sourcemaps.write('../maps'))
  .pipe(gulp.dest('./public/js/'))
  .pipe(connect.reload())
  .on('end', done);
});

/*
  | --- Templates ------------------------------------------
  */

gulp.task('templates', function(done) {
  gulp.src(['./src/**/*.html'])
  .pipe(minifyHtml({
    empty: true,
    spare: true,
    juotes: true
  }))
  .pipe(ngHtml2Js({
    moduleName: 'templates'
  }))
  .pipe(concat('templates.js'))
  .pipe(ngAnnotate())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(uglify())
  .pipe(gulp.dest('./public/js/'))
  .pipe(connect.reload())
  .on('end', done);
});

/*
  | --- Fonts ------------------------------------------
  */

gulp.task('fonts', function() {
  return gulp.src([
    './src/assets/**/*.wff2',  
    './src/assets/**/*.woff', 
    './src/assets/**/*.woff2', 
    './src/assets/**/*.ttf', 
    './src/assets/**/*.svg', 
    './src/assets/**/*.eot'
  ])
  .pipe(gulp.dest('./public/assets'));
});

gulp.task('images', function() {
  return gulp.src(paths.img)
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('./public/assets/img'));
});

//gulp.task('watch', function() {
  //gulp.watch(paths.sass, ['sass']);
  //gulp.watch(paths.js, ['js']);
  //gulp.watch(paths.vendor, ['vendor']);
  //gulp.watch(paths.templates, ['templates']);
  //gulp.watch(paths.img, ['images']);
//});

gulp.task('serve', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.vendor, ['vendor']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.img, ['images']);

  connect.server({
    root: 'public',
    port: 3000,
    host: '0.0.0.0',
    livereload: true,
    fallback: 'public/index.html'
  });
});


