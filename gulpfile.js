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

gulp.task("update-css", function(done) {
    runSequence("build-sass", "style-to-public-css", done);
});

gulp.task("watch-style", function(){
    return watch([
        'style/style.sass',
        'style/**/*.css'
    ], function() {
        gulp.run(["update-css"]);
    });
});

gulp.task('start-server', function (done) {
    nodemon({
        script: 'index.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
        , done: done
    })
})

gulp.task("start", function(done) {
    return gulpMultiProcess(['watch-style', 'start-server'], done);
});


gulp.task("default", function() {
    gulp.run(["start"]);
});
