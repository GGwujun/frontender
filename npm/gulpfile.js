var gulp = require('gulp')，
    minifycss = require('gulp-minify-css')，
    concat = require('gulp-concat')，
    uglify = require('gulp-uglify')，
    rename = require('gulp-rename')，
    jshint=require('gulp-jshint');
    //语法检查
    gulp.task('jshint'， function () {
        return gulp.src('js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });
    //压缩css
    gulp.task('minifycss'， function() {
        return gulp.src('css/*.css')    //需要操作的文件
            .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
            .pipe(minifycss())   //执行压缩
            .pipe(gulp.dest('Css'));   //输出文件夹
    });
    //压缩，合并 js
    gulp.task('minifyjs'， function() {
        return gulp.src('js/*.js')      //需要操作的文件
            .pipe(concat('main.js'))    //合并所有js到main.js
            .pipe(gulp.dest('js'))       //输出到文件夹
            .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
            .pipe(uglify())    //压缩
            .pipe(gulp.dest('Js'));  //输出
    });
　　//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
    gulp.task('default'，['jshint']，function() {
        gulp.start('minifycss'，'minifyjs'); 
　　});

//压缩html
  var htmlmin = require('gulp-htmlmin');
  gulp.task('html', function(){
     gulp.src('./*.html')
          .pipe(htmlmin({
            collapseWhitespace: true,
               removeComments: true
        }))
         .pipe(gulp.dest('dist'));
});

	//同步代码变化
 gulp.task('dist', function(){
    gulp.watch('./*.html', ['html']);
     gulp.watch(['./css/style.css','./css/piano.css'], ['style']);
     gulp.watch(['./js/common.js','./js/piano.js'], ['script']);
 });