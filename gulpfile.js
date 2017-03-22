var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var del = require('del');

// set variable via $ gulp --type production
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js').getConfig(environment);

var port = $.util.env.port || 1337;
var app = 'app/';
var dist = 'dist/';
var scriptsLib = app + 'lib/';
var minifyHTML = require('gulp-minify-html');
var shell = require('gulp-shell');
// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [                 
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglifyjs() : $.util.noop())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

// copy html from app to dist
gulp.task('html', function() {
  return gulp.src(app + 'index.html')
      .pipe(gulp.dest(dist))
      .pipe($.size({ title : 'html' }))
      .pipe($.connect.reload());
});

// copy libs to dist
gulp.task('lib', function() {

    gulp.src(app + '/fonts/*')
        .pipe(gulp.dest(dist + '/fonts'))
        .pipe($.size({ title : 'Ionicons' }));


    return gulp.src(scriptsLib + '/*')
        .pipe(gulp.dest(dist + '/lib'))
        .pipe($.size({ title : 'Lib' }))
        .pipe($.connect.reload());
});

gulp.task('less', function() {
  return gulp.src(app + 'less/main_ext.less')
      .pipe($.less())
      .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
      .pipe(isProduction ? $.minifyCss() : $.util.noop())
      .pipe(gulp.dest(dist + 'css/'))
      .pipe($.size({ title : 'css' }));
});

gulp.task('styles',function(cb) {
  // convert stylus to css
  return gulp.src(app + 'stylus/main.styl')
    .pipe($.stylus({
      // only compress if we are in production
      compress: isProduction,
      // include 'normal' css into main.css
      'include css' : true
    }))
    .pipe($.autoprefixer({browsers: autoprefixerBrowsers})) 
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title : 'css' }))
    .pipe($.connect.reload());

});

// add livereload on the given port
gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35729
    }
  });
});

gulp.task('fontIcons', function() {
  return gulp.src(app + '/less/font-icons/**')
      .pipe(gulp.dest(dist + 'css/font-icons'));
});

// copy images
gulp.task('images', function(cb) {
  return gulp.src(app + 'images/**/*.{png,jpg,jpeg,gif}')
    .pipe($.size({ title : 'images' }))
    .pipe(gulp.dest(dist + 'images/'));
});

// watch styl, html and js file changes
gulp.task('watch', function() {
  gulp.watch(app + 'stylus/*.styl', ['styles']);
  gulp.watch(app + 'less/*.less', ['less']);
  gulp.watch(app + 'index.html', ['html']);
  gulp.watch(app + 'scripts/**/*.js', ['scripts']);
  gulp.watch(app + 'scripts/**/*.jsx', ['scripts']);
});

// remove bundels
gulp.task('clean', function(cb) {
  del([dist], cb);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function(){
  gulp.start(['images', 'html', 'lib', 'scripts','styles','fontIcons','less']);
});


var qn = require('gulp-qn');
// MD5戳
var rev = require('gulp-rev-qn');
var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');
var config = require('./webpack.config');
var scp = require('gulp-scp2');
var qiniu_options = {
	    accessKey: "rUXCgB-hbfgypxQleaTVvohWR0vLKCVjz2aYa9Dp",
	    secretKey: "zPPEdwYCsJfWFsTqDcxKFl_kPD6Oi8SLlGr7qFxD",
	    bucket: "fruitninja",
	    domain: "//o6rl71xns.bkt.clouddn.com"
}

gulp.task('publish-js', function () {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe($.uglifyjs())
    .pipe(rev())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload())
    .pipe(qn({
      qiniu: qiniu_options,
      prefix: 'gmap'
    }))
    .pipe(rev.manifest())
    .pipe(gulp.dest(dist + 'js/'));
});

gulp.task('publish-images', function(cb) {
  return gulp.src(app + 'images/**/*.{png,jpg,jpeg,gif}')
    .pipe(rev())
    .pipe(gulp.dest(dist + 'images/'))
    .pipe($.size({ title : 'images' }))
    .pipe(qn({
      qiniu: qiniu_options,
      prefix: 'gmap'
    }))
    .pipe(rev.manifest())
    .pipe(gulp.dest(dist + 'images/'));
});


gulp.task('publish-less', function() {
  return gulp.src(app + 'less/main_ext.less')
      .pipe($.less())
      .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
      .pipe($.minifyCss())
      .pipe(rev())
      .pipe(gulp.dest(dist + 'css/'))
      .pipe($.size({ title : 'css' }))
      .pipe(qn({
        qiniu: qiniu_options,
        prefix: 'gmap'
	  }))
      .pipe(rev.manifest())
      .pipe(gulp.dest(dist + 'css/'));
});

gulp.task('publish-lib-css', function() {
  return gulp.src([
      app + 'lib/framework7.ios.min.css', 
      app + 'lib/framework7.ios.colors.min.css',
      app + 'lib/slick.css'
    ])
      .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
      .pipe($.minifyCss())
      .pipe(rev())
      .pipe(gulp.dest(dist + 'lib_css/'))
      .pipe($.size({ title : 'css' }))
      .pipe(qn({
        qiniu: qiniu_options,
        prefix: 'gmap'
    }))
      .pipe(rev.manifest())
      .pipe(gulp.dest(dist + 'lib_css/'));
});

gulp.task('publish-lib-js', function () {
  return gulp.src([
      app + 'lib/framework7.min.js',
      app + 'lib/fetch.js'
    ])
    //.pipe($.uglifyjs())
    .pipe(rev())
    .pipe(gulp.dest(dist + 'lib_js/'))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload())
    .pipe(qn({
      qiniu: qiniu_options,
      prefix: 'gmap'
    }))
    .pipe(rev.manifest())
    .pipe(gulp.dest(dist + 'lib_js/'));
});

gulp.task('publish-html', function () {
  return gulp.src(['./dist/**/*.json', './dist/index.html'])
    .pipe(revCollector({
      dirReplacements: {
        'js/': '',
        'css/': '',
        'lib/': ''
      }
    }))
    .pipe(
      minifyHTML({
        empty:true,
        spare:true
      }) 
    )
    .pipe(gulp.dest('./dist'));
});

gulp.task('scp', function() {
  return gulp.src('./dist/index.html')
  .pipe(scp({
    host: 'client.techmars.net',
    username: 'ming',
    password: 'abg123',
    dest: '/fruitninja/fruitninja/static/'
  }))
  .on('error', function(err) {
    console.log(err);
  });
});


gulp.task('file_creator_dev', shell.task([
  'grunt file-creator:dev',
]))

gulp.task('file_creator_production', shell.task([
  'grunt file-creator:production',
]))

gulp.task('file_creator_debug', shell.task([
  'grunt file-creator:debug',
]))

gulp.task('debug', ['file_creator_debug', 'build', 'serve', 'watch']);


gulp.task('deploy', ['clean'], function(callback){
  runSequence('file_creator_production', ['html', 'publish-js', 'publish-less', 'publish-lib-css', 'publish-lib-js'], 'publish-html', 'scp', callback);
});

