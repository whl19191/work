var gulp = require('gulp'),
	cache = require('gulp-cache'),
	cleanCss = require('gulp-clean-css'),
	notify = require('gulp-notify'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin')	,
	htmlmin = require('gulp-htmlmin'),
	// sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	watch = require('gulp-watch'),
	rest = require('connect-rest'),
	concat = require("gulp-concat"),
	// spriter = require('gulp-css-spriter'),
	autoprefixer = require('gulp-autoprefixer'),
	jade = require('gulp-jade'),
	base64 = require('gulp-base64'),
	minifyCSS = require('gulp-minify-css'),
	babel = require('gulp-babel'),


  config = {
    "imageFile" : {
      "src" : "src/img/**/*.{jpg,png,gif}",
      "dest" : "dist/img"
    },
    "styleFile" : {
      "src" : "src/css/*",
      "dest" : "dist/css"
    },
    "scriptFile" : {
      "src" : "src/js/**/*.js",
      "dest" : "dist/js"
    },
    "pageFile" : {
      "src" : "src/pages/*.jade",
      "dest" : "dist"
    }
  };

 gulp.task('styleTask', function()
    {
        return gulp.src(config.styleFile.src)
            //    .pipe(sass())
               .pipe(cache(cleanCss()))
            //    .pipe(spriter({
            //         'spriteSheet': 'dist/images/spritesheet.png',
            //         'pathToSpriteSheetFromCSS': '../images/spritesheet.png'
            //    }))
               .pipe(autoprefixer({
                    browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
                    cascade: true
               }))
			   .pipe(base64({
				  src: config.styleFile.src,
				  dest: config.styleFile.src,
				  options: {
				    baseDir: config.imageFile.src,
				    extensions: ['png'],
				    maxImageSize: 5 * 1024, // bytes
				    debug: false
				  }
			  	}))
			   .pipe(minifyCSS())
               .pipe(concat('index.css'))
               .pipe(gulp.dest(config.styleFile.dest))
               .pipe(notify({
                   message: 'Styles task complete'
               }))
               // .pipe(browserSync.reload({
               //     stream: true
               // }));
    });

  gulp.task('scriptTask', function()
    {
        return gulp.src(config.scriptFile.src)
               .pipe(cache(jshint()))
               .pipe(jshint())// 对代码进行报错提示
			//    .pipe(babel({presets:['babel-preset-es2015']}))
				.pipe(uglify())
				.pipe(concat('main.js'))//合并后的文件名
               .pipe(gulp.dest(config.scriptFile.dest))
               .pipe(notify({
                           message: 'Scripts task complete'
                       }))
               // .pipe(browserSync.reload({stream: true}));

    });

  	gulp.task('imageTask', function()
    {
        return gulp.src(config.imageFile.src)
        	// .pipe(cache(imagemin({
	        //     optimizationLevel: 5,// png图片优化水平，3是默认值，取值区间0-7
	        //     progressive: true,//是否无损压缩jpg图片
	        //     interlaced: true,//是否隔行扫描gif进行渲染
	        //     multipass: true
	        //     //多次优化svg直到完全优化
	    	// 	})))
        	.pipe(gulp.dest(config.imageFile.dest))
        	.pipe(notify({
	            message: 'Images task complete'
	        	}))
	        // .pipe(browserSync.reload({
	        //     stream: true
	        // 	}));
    });



  	gulp.task('pageTask', function()
    {
        return gulp.src(config.pageFile.src)
          	.pipe(jade({pretty: true}))
        	.pipe(htmlmin({
		            collapseWhitespace: false,// 压缩HTML
		            minifyJS: true,// 压缩页面JS
		            minifyCSS: true
		            // 压缩页面CSS
		      }))
  		    .pipe(gulp.dest(config.pageFile.dest))
  		    .pipe(notify({
  		            message: 'Pages task complete'
  		        }))
		    // .pipe(browserSync.reload({
		    //         stream: true
		    //     }));
    });



gulp.task('serve', ['styleTask', 'scriptTask', 'pageTask'], function()
// gulp.task('serve', ['styleTask', 'scriptTask', 'imageTask', 'pageTask'], function()
{
    connect.server({
      root: 'dist/',
      port: 8888,
      livereload: true
    });
});

gulp.task('watch', ['serve'], function()
{
    // 检测文件发送变化
    gulp.watch(config.pageFile.src, ["pageTask"]);
    gulp.watch(config.styleFile.src, ["styleTask"]);
    gulp.watch(config.scriptFile.src, ["scriptTask"]);
    // gulp.watch(config.imageFile.src, ["imageTask"]);

    gulp.watch("dist/**/*").on('change', function(file) {
      gulp.src('dist/')
        .pipe(connect.reload());
    });
});
// default 默认任务，依赖清空任务
gulp.task('default', ['watch']);
