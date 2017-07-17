// gulpプラグインの読みこみ
var gulp = require("gulp");
var sass = require("gulp-sass");
var imagemin = require("gulp-imagemin");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var frontnote = require("gulp-frontnote");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
});

// for sass
gulp.task("sass", function () {
    gulp.src("./sass/**/*.scss") //入力元
        .pipe(frontnote({
            css: '../css/style.css'
        }))
        .pipe(plumber())
        .pipe(sass({
            includePaths: ["bower_components/bootstrap-sass/assets/stylesheets"]
        }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css")) //出力先
        .pipe(browser.reload({stream:true}));
});

// for imagemin
// 「imageMinTask」という名前のタスクを登録
gulp.task("imagemin", function() {
    // imagesフォルダー以下のpng画像を取得
    gulp.src("images/*.png")
        .pipe(plumber())
        .pipe(imagemin()) // 画像の圧縮処理を実行
        .pipe(gulp.dest("min_images/")); // minified_imagesフォルダー以下に保存
});

// Watch
gulp.task("default",['server'], function() {
    gulp.watch("images/**", ["imagemin"]);
    gulp.watch("sass/**/*.scss",["sass"]);
});
