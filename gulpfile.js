var gulp        = require('gulp');
var less        = require('gulp-less');
var path        = require('path');
var plumber     = require('gulp-plumber');
var webserver   = require('gulp-webserver');
var opn         = require('opn');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');

var server = {
	host: 'localhost',
	port: '8001'
}

gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);

gulp.task('webserver', function() {
	gulp.src( '.' ).pipe(webserver({
		host:             server.host,
		port:             server.port,
		livereload:       true,
		directoryListing: false
	}));
});

gulp.task('build', ['less', 'compressjs']);

gulp.task('openbrowser', function() {
	opn( 'http://' + server.host + ':' + server.port );
});

gulp.task('compressjs', function() {
	return gulp.src(['./startup/common-files/js/*.js', './static/js/*.js'])
		.pipe(concat('concat.js'))
		.pipe(gulp.dest('./static/js/dist'))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./static/js/dist'));
});

gulp.task('less', function () {
	return gulp.src('./static/less/**/*.less').pipe(less({
		paths: [ path.join(__dirname, 'less', 'includes') ]
	})).pipe(gulp.dest('./static/css'));
});

gulp.task('watch', function () {
	gulp.watch('./static/less/**/*.less', ['less']);
	gulp.watch('./startup/ui-kit/**/*.less', ['less']);
	gulp.watch('./static/js/*.js', ['compressjs']);
});
