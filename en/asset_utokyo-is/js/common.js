$(window).scroll(function () {
    //120px下にスクロールすると、#headerにclass="scroll"を付ける／戻ると外す
    //120px下にスクロールすると、.page_topにclass="on"を付ける／戻ると外す
    if ($(window).width() <= 1024) {
        if ($(this).scrollTop() > 120) {
            $("#header").addClass("scroll");
            $("#sp_menu").addClass("scroll");
            $("#main_area").addClass("scroll");
            $(".page_top").addClass("on");
        }
        if ($(this).scrollTop() < 121) {
            $("#header").removeClass("scroll");
            $("#sp_menu").removeClass("scroll");
            $("#main_area").removeClass("scroll");
            $(".page_top").removeClass("on");
        }
    }

    //#footerまでスクロールしたら、.page_topにclass="bottom"を付ける／戻ると外す
    scrollHeight = $(document).height();
    scrollPosition = $(window).height() + $(window).scrollTop();
    footHeight = $("#footer").innerHeight();
    if (scrollHeight - scrollPosition <= footHeight) {
        $(".page_top").addClass("bottom");
    } else {
        $(".page_top").removeClass("bottom");
    }
});

//.page_top a をクリックでスムーズにスクロール
$(".page_top a").click(function () {
    $("html,body").animate(
        {
            scrollTop: $($(this).attr("href")).offset().top,
        },
        500,
        "swing"
    );
    return false;
});

var disableScroll = function (event) {
    event.preventDefault();
};

//#sp_menu_btnをクリックで#sp_menuを開閉
$("#sp_menu_btn").click(function () {
    $("#sp_menu_btn").toggleClass("active");
    $("#sp_menu").toggleClass("sp_menu_open");
    $("body").toggleClass("sp_menu_open");

    if ($("body").hasClass("sp_menu_open")) {
        document.addEventListener("touchmove", disableScroll, {
            passive: false,
        });
        document.addEventListener("wheel", disableScroll, {
            passive: false,
        });
    } else {
        document.removeEventListener("touchmove", disableScroll, {
            passive: false,
        });
        document.removeEventListener("wheel", disableScroll, {
            passive: false,
        });
    }
});

//sp_menu プルダウンメニュー
$(".acc_menu").click(function () {
    $(this).toggleClass("open");
    $(this).children(".menu_panel").slideToggle();
});

$(window).on("load", function () {
    //telリンク <span class="tel-link">000-0000-0000</span>をSP･TB表示時のみ<a href="tel:00000000000">に置換。
    //画像や電話番号以外の文字列が入っていると使えない
    var ua = navigator.userAgent;
    if (
        (ua.indexOf("iPhone") > 0 && ua.indexOf("iPod") == -1) ||
        (ua.indexOf("Android") > 0 &&
            ua.indexOf("Mobile") > 0 &&
            ua.indexOf("SC-01C") == -1 &&
            ua.indexOf("A1_07") == -1)
    ) {
        $(".tel-link").each(function () {
            var str = $(this).text();
            $(this).html(
                $("<a>")
                    .attr("href", "tel:" + str.replace(/-/g, ""))
                    .append(str + "</a>")
            );
        });
    }

    $("#gnavi ul li a").each(function () {
        var href = $(this).attr("href");
        if (location.href.match(href)) {
            $(this).addClass("current");
        }
    });
});

//ページトップボタン
$(document).ready(function () {
    $("#pagetop").hide();
    // ↑ページトップボタンを非表示にする

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) {
            // ↑ スクロール位置が100よりも小さい場合に以下の処理をする
            $("#pagetop").fadeIn();
            //      $("#pagetop").slideDown("fast");
            // ↑ (100より小さい時は)ページトップボタンをスライドダウン
        } else {
            $("#pagetop").fadeOut();
            //      $("#pagetop").slideUp("fast");
            // ↑ それ以外の場合の場合はスライドアップする。
        }

        // フッター固定する

        scrollHeight = $(document).height();
        // ドキュメントの高さ
        scrollPosition = $(window).height() + $(window).scrollTop();
        //　ウィンドウの高さ+スクロールした高さ→　現在のトップからの位置
        footHeight = $("footer").innerHeight();
        // フッターの高さ

        if (scrollHeight - scrollPosition <= footHeight) {
            // 現在の下から位置が、フッターの高さの位置にはいったら
            //  "#pagetop"のpositionをabsoluteに変更し、フッターの高さの位置にする

            var w = $(window).width();
            var x = 320;
            if (w >= x) {
                $("#pagetop").css({
                    position: "absolute",
                    //bottom: footHeight
                    right: "0px",
                    bottom: "20px",
                    // top: "-30px"
                });
            }
        } else {
            // それ以外の場合は元のcssスタイルを指定
            $("#pagetop").css({
                position: "fixed",
                //        top: "0px",
                right: "0px",
                bottom: "20px",
            });
        }
    });

    // トップへスムーススクロール
    $("#pagetop a").click(function () {
        $("body,html").animate(
            {
                scrollTop: 0,
            },
            500
        );
        // ページのトップへ 500 のスピードでスクロールする
        return false;
    });

    // ヘッダーメニューのアクティブ化
    $("#gnavi").children();
});
