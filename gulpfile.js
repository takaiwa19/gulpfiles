//モジュールの読込
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var reload = browserSync.reload;
var $ = require('gulp-load-plugins')();


// 各種設定
var DIR = {
  PATH: '',
  SRC: 'src',
  DEST: 'dst',
  BUILD: 'build'
};

var pugConf = {
  src: [
    DIR.SRC + '/html/*.pug',
    '!' + DIR.SRC + '/html/_**/*.pug',
    '!' + DIR.SRC + '/html/_*.pug'
  ],
  dest: DIR.DEST,
  opts: {
    pretty: true
  }
};

var scriptsConf = {
  src: DIR.SRC + '/js/main.js',
  dest: DIR.DEST + '/js/'
};

var vendorScriptsConf = {
  src: [
    DIR.SRC + '/js/vendor/vue.js',
    DIR.SRC + '/js/vendor/perfect-scrollbar.js'
  ],
  concat: 'vendor.js',
  dest: DIR.DEST + '/js/'
};

var imageConf = {
  src: DIR.SRC + '/img/*.{jpg,jpeg,png,gif,svg}',
  dest: DIR.DEST + '/img/'
};

//タスクの定義
//
// sassコンパイルタスク
gulp.task('sass-compile', function(){
  return gulp.src('src/css/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dst/css'));
});

// pugコンパイルタスク
gulp.task('pug-compile', function() {
  return gulp.src(pugConf.src)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(pugConf.dest));
});

//Scriptsタスク
gulp.task('scripts', function() {
  return gulp.src(scriptsConf.src)
    .pipe($.uglify())
    .pipe(gulp.dest(scriptsConf.dest));
});

// vendorScriptsタスク
gulp.task('vendorScripts', function() {
  return gulp.src(vendorScriptsConf.src)
    .pipe($.concat(vendorScriptsConf.concat))
    .pipe(gulp.dest(vendorScriptsConf.dest));
});

// copyタスク
gulp.task('copy', function() {
  return gulp.src(imageConf.src)
  .pipe(gulp.dest(imageConf.dest));
});

gulp.task('browser-sync', function() {
  browserSync({
    notify: false,
    server: {
      baseDir: "dst",
      index: "index.html"
    }
  });
});

gulp.task('watch',['sass-compile'], function() {
  gulp.watch('./src/css/**/*.scss', ['sass-compile', reload]);
  gulp.watch('./src/**/*.pug', ['pug-compile', reload]);
  gulp.watch('./src/**/*.js', ['scripts', reload]);
  gulp.watch('./src/**/**/*.js', ['vendorScripts', reload]);
});

// gulpのデフォルトタスクの指定
gulp.task('default', ['browser-sync', 'watch', 'sass-compile', 'pug-compile', 'vendorScripts', 'scripts', 'copy'], function() {

});
