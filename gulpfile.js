// gulpプラグインの読みこみ
var gulp = require("gulp");
var sass = require("gulp-sass");
var imagemin = require("gulp-imagemin");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var frontnote = require("gulp-frontnote");
var autoprefixer = require("gulp-autoprefixer");
var ejs = require("gulp-ejs");

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "dest"
        }
    });
});

// for sass
gulp.task("sass", function () {
    gulp.src(["src/sass/**/*.scss"], { base: 'src/sass' }) //入力元
        .pipe(frontnote({
            css: 'dest/css/style.css'
        }))
        .pipe(plumber())
        .pipe(sass({
            includePaths: ["bower_components/bootstrap-sass/assets/stylesheets"]
        }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("dest/css")) //出力先
        .pipe(browser.reload({stream:true}));
});

// for js
gulp.task("js", function() {
    gulp.src(["src/js/*.js"], { base: 'src/js' })
        .pipe(gulp.dest("dest/js/"));
});

// for imagemin
// 「imageMinTask」という名前のタスクを登録
gulp.task("imagemin", function() {
    // imagesフォルダー以下のpng画像を取得
    gulp.src(["src/images/*.png"], { base: 'src/images' })
        .pipe(plumber())
        .pipe(imagemin()) // 画像の圧縮処理を実行
        .pipe(gulp.dest("dest/images/")); // minified_imagesフォルダー以下に保存
});

// for ejs
gulp.task("ejs", function() {
    gulp.src(["src/ejs/**/*.ejs",'!' + "src/ejs/**/_*.ejs"], { base: 'src/ejs' })
        .pipe(ejs({}, {}, {"ext": ".html"}))
        .pipe(gulp.dest("dest"));
});

// Watch
gulp.task("default",['server'], function() {
    gulp.watch("src/images/**", ["imagemin"]);
    gulp.watch("src/sass/**/*.scss",["sass"]);
    gulp.watch("src/js/*.js",["js"]);
    gulp.watch("src/ejs/**/*.ejs",["ejs"]);
});
