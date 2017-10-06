var gulp        = require('gulp'),
  apidoc      = require('gulp-apidoc'),
  concat      = require('gulp-concat'),
  annotate    = require('gulp-ng-annotate'),
  minifyCss   = require('gulp-minify-css'),
  flatten     = require('gulp-flatten'),
  inject      = require('gulp-inject'),
  plumber     = require('gulp-plumber'),
  runSequence = require('run-sequence'),
  less        = require('gulp-less'),
  bower       = require('gulp-bower'),
  es          = require('event-stream');


gulp.task('apidoc', function (done) {
  apidoc({
    src: "./services/",
    dest: "doc/",
    includeFilters: ["apiconst.js", "router.js", "postLoader.js"]
  },done);
});

gulp.task('build_js', function (cb) {
  var build = gulp.src('./public/app/**/*.js')
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(annotate());
  build.pipe(gulp.dest('./build'))
    .on('end', cb);

});

// copy partials
gulp.task('build_html', function () {
  return gulp.src('**/*.html', {cwd: './public/app/'})
    .pipe(flatten({newPath: 'partials'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('build_deps', function(cb) {
  var i = 0;
  gulp.src([
    './public/resources/vendor/angular/angular.js',
    './public/resources/vendor/jquery/dist/jquery.min.js',
    './public/resources/vendor/angular-loading-bar/build/loading-bar.js',
    './public/resources/vendor/angular-animate/angular-animate.min.js',
    './public/resources/vendor/angular-bootstrap/ui-bootstrap.min.js',
    './public/resources/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
    './public/resources/vendor/angular-mocks/angular-mocks.js',
    './public/resources/vendor/bootstrap/dist/js/bootstrap.min.js',
    './public/resources/vendor/angular-ui-router/release/angular-ui-router.js',
    './public/resources/vendor/es5-shim/es5-shim.min.js',
    './public/resources/vendor/json3/lib/json3.min.js',
    './public/resources/vendor/moment/min/moment.min.js',
    './public/resources/vendor/chart.js/dist/Chart.min.js',
    './public/resources/vendor/angular-chart.js/dist/angular-chart.min.js',
    './public/resources/vendor/angular-ui-uploader/dist/uploader.min.js'

  ]).pipe(concat('dependencies.js'))
    .pipe(annotate())
    //.pipe(uglify())
    .pipe(gulp.dest('./build/resources/vendor'))
    .on('end', callback);

  gulp.src([
    './public/resources/vendor/bootstrap/dist/css/bootstrap-theme.min.css',
    './public/resources/vendor/angular-bootstrap/ui-bootstrap-csp.css',
    './public/resources/vendor/angular-loading-bar/src/loading-bar.css'
  ]).pipe(concat('dependencies.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./build/resources/vendor'))
    .on('end', callback);

  function callback() {
    if (i++ == 1) {
      return cb();
    }
  }
});

gulp.task('build_assets', function () {
  //copy font files
  gulp.src([
    './public/resources/vendor/bootstrap/fonts/*',
    './public/resources/vendor/font-awesome/fonts/*'
  ])
    .pipe(flatten())
    .pipe(gulp.dest('./build/resources/fonts'));
  //copy icons
  gulp.src('./public/resources/images/**/*')
    .pipe(flatten())
    .pipe(gulp.dest('./build/resources/images'));
});


// compile less + minify css
gulp.task('build_less', function () {
  gulp.src('./public/resources/less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./build/resources/css'))
});


gulp.task('inject_deps', function () {
  var sourcesVendor = gulp.src([
      './resources/vendor/dependencies.js',
      './resources/vendor/dependencies.css'],
    {read: false, cwd: __dirname + "/build"});
  var sourceApp     = gulp.src([
      './app.js'],
    {read: false, cwd: __dirname + "/build"});

  return gulp.src('./public/index.html')
    .pipe(inject(es.merge(sourcesVendor, sourceApp)))
    .pipe(gulp.dest('./build'))
});

gulp.task('bower', function () {
  return bower({cwd: './public'})
});

gulp.task('watch', ['build_js', 'build_html', 'build_less', 'build_assets'], function () {
  gulp.watch('./public/app/**/*.js', ['build_js']);
  gulp.watch('./public/less/**/*.less', ['build_less']);
  gulp.watch('./public/app/**/*.html', ['build_html']);
});

gulp.task('deploy', function () {
  return runSequence('bower', ['build_js', 'build_html', 'build_less', 'build_assets'], 'build_deps', 'inject_deps');
});