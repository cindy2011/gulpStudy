'use strict';
1
//载入gulp核心包
const   gulp   = require("gulp");
const concat   = require('gulp-concat');
const uglify   = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const connect  = require("gulp-connect");
const htmlmin  = require("gulp-htmlmin");
var browserSync = require('browser-sync');
var reload = browserSync.reload;

//gulp是用来帮我们执行一些重复操作
//如何定义一个任务
//第一个参数是任务名，第二个参数是任务的执行体
gulp.task('dest',function () {
	//文件copy
	gulp.src('src/**/*.*')//src下面所有目录文件
	    //让文件流走向下一个环节
	    .pipe(gulp.dest('dist/'))//dest指定文件输出地方

});
//让任务运行还是借助命令行
gulp.task('default',function(){		
	gulp.watch('src/*',['dest']);//第一个参数是任务发生的目录，第二个参数是任务的名字
});

// gulp.task('connect', function() {
// 	  connect.server({
// 	    root: 'src',
// 	    livereload: true
// 	  });
//       gulp.watch(['src/**/*.*'], ['reload']);   
// });

// gulp.task('reload', function () {
//   gulp.src('src/**/*.*')
//     .pipe(connect.reload());
// });

 //合并js
gulp.task("concat",function(){
 	gulp.src(['src/js/*.js'])
 	    .pipe(concat("all.js"))
 	    .pipe(gulp.dest('dist/js'));
})
  //压缩单个js文件
gulp.task('jsmin',function(){
 	gulp.src('dist/js/all.js')
 	    .pipe(uglify())
 	    .pipe(gulp.dest('dist/js'));
})
 // 压缩多个文件
gulp.task('jsmins',function(){
 	gulp.src(['src/js/*.js'])
 	    .pipe(uglify())
 	    .pipe(gulp.dest('dist/js'));
})
//压缩图片
gulp.task('imagemin', () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);
gulp.task("htmlmin",function(){
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});
// 起服务器监视文件改动并重新载入
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: 'src'
    }
  });

  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd:"src"},reload);//options.cwd：输出文件夹的cwd，默认为：process.cwd()。
});
