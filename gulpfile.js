var gulp    = require('gulp')
var jshint  = require('gulp-jshint')
var nodemon = require('nodemon')

var jsFiles = ['*.js']

gulp.task('lint', () => {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'), {
			verbose: true
		})
		.on('error', () => {
			console.log('Tests failed!')
			error = true
		})
})

gulp.task('watch', () => {
	return nodemon({
		script: 'app.js',
		watch: jsFiles,
		delaytime: 1,
		env: {
			'PORT': 3000
		}
	}).on('restart', () => {
		console.log('Restarting server...')
	})
})

gulp.task('default', ['lint'], () => {
	gulp.start('watch')
	gulp.watch(jsFiles, ['lint'])
})