var gulp = require("gulp");
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var runSequence = require("run-sequence");
var gulpMultiProcess = require('gulp-multi-process');
var nodemon = require('gulp-nodemon');

gulp.task("build-sass", function() {
    return gulp.src('./style/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./style'));
});

gulp.task("style-to-public-css", function() {
    var style = [
        "./style/**/*.css"
    ];
    return gulp.src(style)
        .pipe(gulp.dest("./public/css"));
});

gulp.task("update-css", gulp.series("build-sass", "style-to-public-css"));

gulp.task("watch-style", function(){
    return watch([
        'style/style.scss'
    ], () => {
        gulp.task('update-css')();
    });
});

gulp.task('start-server', function (done) {
    nodemon({
        script: 'index.js'
        , ext: 'ejs js html'
        , env: { 'NODE_ENV': 'development' }
        , done: done
    })
})

gulp.task("start", function(done) {
    return gulpMultiProcess(['watch-style', 'start-server'], done);
});


gulp.task("default", function() {
    gulp.task("start")();
});
