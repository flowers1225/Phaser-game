var gulp = require("gulp"),
    less = require("gulp-less"),
    gutil = require("gulp-util"),
    rename = require("gulp-rename"),
    cssmin = require("gulp-cssmin"),
    plumer = require("gulp-plumber"),
    webpack = require("webpack"),
    webpackConfig = require("./webpack.config.js"),
    browserSync = require("browser-sync").create(),
    path = require("path");

var reload  = browserSync.reload;

var lessSrc = './src/less/**/style.less',
    lessDict = 'src/less/**/*.less',
    imageSrc = 'src/img/**/*.*',
    media = 'src/media/**/*.*',
    jsSrc = 'src/js/**/*.*';

var distPath = './dist/';

//编译less
gulp.task('less', function () {
    return gulp.src(lessSrc)
        .pipe(plumer())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(distPath + 'css'));
});

//复制图片
gulp.task('images', function () {
    return gulp.src(imageSrc)
        .pipe(rename({dirname: '.'}))
        .pipe(gulp.dest(distPath + 'img/'));
});

//复制media
gulp.task('media', function () {
    return gulp.src(media)
        .pipe(rename({dirname: '.'}))
        .pipe(gulp.dest(distPath + 'media/'));
});

//webpack打包
gulp.task("webpack", function(callback) {

    var myConfig = Object.create(webpackConfig);

    myConfig.output.filename = distPath + 'js/main.js';

    //run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({

        }));
        callback();
    });
});

//browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ['./', distPath + 'js/main']
        },
        port: 3000,
        notify: false
    },null);
});

//压缩less
gulp.task('lessmin', function () {
    return gulp.src(lessSrc)
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(cssmin())
        .pipe(gulp.dest(distPath + 'css'));
});

//压缩js
gulp.task("webpack:build", function(callback) {
    var myConfig = Object.create(webpackConfig);

    myConfig.plugins = myConfig.plugins.concat(
        new webpack.optimize.UglifyJsPlugin()
    );

    myConfig.output.filename = distPath + 'js/main.js';

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({}));

        callback();
    });
});

//默认侦听
gulp.task('default', ['images', 'less', 'browser-sync', 'media', 'webpack'], function() {

    gulp.watch(imageSrc, ['images', reload]);
    
    gulp.watch(lessDict, ['less', reload]);
    
    gulp.watch(jsSrc, ['webpack', reload]);

    gulp.watch(media, ['media', reload]);

});

//压缩
gulp.task('zip', ['images', 'lessmin', 'webpack:build', 'media']);
