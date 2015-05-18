var gulp        = require('gulp');
var less        = require('gulp-less');
var path       = require('path');
var plumber     = require('gulp-plumber');
var webserver   = require('gulp-webserver');
var opn         = require('opn');

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

gulp.task('build', ['less']);

gulp.task('openbrowser', function() {
	opn( 'http://' + server.host + ':' + server.port );
});

gulp.task('less', function () {
	return gulp.src('./static/less/**/*.less').pipe(less({
		paths: [ path.join(__dirname, 'less', 'includes') ]
	})).pipe(gulp.dest('./static/css'));
});

gulp.task('watch', function () {
	gulp.watch('./static/less/**/*.less', ['less']);
	gulp.watch('./startup/ui-kit/**/*.less', ['less']);
});
