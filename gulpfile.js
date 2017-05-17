var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

// Functions ...

function compile(watch) {
    var bundle = browserify('./src/index.js', {debug: true});
    if (watch) {
        bundle = watchify(bundle);
        bundle.on('update', function () {
            console.log('---> Bundling...');
            rebundle();
        });
    }
    function rebundle() {
        bundle
            .transform(babel, { presets: ['es2015'], plugins: ['syntax-async-functions', 'transform-regenerator'] })
            .bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('index.js'))
            .pipe(rename('app.js'))
            .pipe(gulp.dest('public'));
    }
    rebundle();
}

// tasks ...

gulp.task('styles', function () {
    gulp.src('index.scss')
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('public'));
});

gulp.task('assets', function () {
    gulp.src('assets/*')
        .pipe(gulp.dest('public'));
});


gulp.task('build', function () {
    return compile();
});

gulp.task('watch', function () {
    return compile(true);
});

// Run ...

gulp.task('default', ['styles', 'assets', 'build']);
