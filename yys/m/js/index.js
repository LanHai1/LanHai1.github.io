// 入口函数
$(function() {

    // pointer-events auto
    let pterEveAuto = {
        "pointer-events": "auto",
        opacity: 1
    };
    // pointer-events none
    let pterEveNone = {
        "pointer-events": "none",
        opacity: 0.4
    };

    // 固定搜索
    $("#m_searchBtn").click(function() {
        $(".m_searchInput").slideDown();
    });
    $(".m_cancel").click(function() {
        $(".m_searchInput").slideUp();
    })

    // 新闻资讯
    let swiperIndex = 0;
    $(".m_next_news").click(function() {
        swiperIndex++;
        if (swiperIndex != 0) {
            $(".m_prev_news").animate({
                opacity: 1
            }).css("pointer-events", "auto")
        }
        if (swiperIndex == 2) {
            $(".m_next_news").animate({
                opacity: 0
            }).css("pointer-events", "none")
        }
        let swiperW = $(".m_swiper-slide").width();
        $(".m_newswrap").animate({
            left: -(swiperIndex * swiperW)
        })
    })

    $(".m_prev_news").click(function() {
        swiperIndex--;
        if (swiperIndex >= 1) {
            $(".m_next_news").animate({
                opacity: 1
            }).css("pointer-events", "auto")
        }
        if (swiperIndex == 0) {
            $(".m_prev_news").animate({
                opacity: 0
            }).css("pointer-events", "none")
        }
        let swiperW = $(".m_swiper-slide").width();
        $(".m_newswrap").animate({
            left: -(swiperIndex * swiperW)
        })
    })

    // 游戏攻略
    let gameActiveLi = $(".m_yxgl_nav > a");
    gameActiveLi.click(function() {
        $(this).addClass("m_on").siblings("a").removeClass("m_on");
        let index = $(this).index();
        $(".m_glwrap").animate({
            left: -index * $(".m_glwrap>ul").width()
        })
    })

    // 热门活动
    let reSpan = $(".m_hot_box_span > span");
    let reFlag = false;
    reSpan.click(function() {
        if (reFlag) {
            return
        }
        reFlag = true;
        $(this).addClass("m_swiper-pagination-bullet-active").siblings("span").removeClass(
            "m_swiper-pagination-bullet-active");
        let reSIndex = $(this).index();
        $(".m_hot_hd_bd").animate({
            left: -$(".m_swiper_a").width() * reSIndex,
            opacity: 0.5
        }, function() {
            $(this).animate({
                opacity: 1
            })
            reFlag = false;
        })
    })

    // 热门作品
    let reZp_left = $(".m_prev_zp");
    let reZp_right = $(".m_next_zp");
    let reZp_li_w = $(".m_hot_zp_slide").width();
    let reZp_li_MarginLeft = parseFloat($(".m_hot_zp_slide").css("marginRight"));

    let reZp_index = 0;

    reZp_right.click(function() {
        reZp_index++;
        if (reZp_index == 1) {
            reZp_left.css(pterEveAuto);
        }
        $(".m_hot_zp_bd").animate({
            left: -reZp_index * (reZp_li_w * 3 + reZp_li_MarginLeft * 3)
        })
        if (reZp_index == 1) {
            $(this).css(pterEveNone);
            return;
        }
    })

    reZp_left.click(function() {
        if (reZp_index == 0) {
            return;
        }
        reZp_index--;
        if (reZp_index == 0) {
            reZp_right.css(pterEveAuto)
            $(this).css(pterEveNone);
        }
        $(".m_hot_zp_bd").animate({
            left: -reZp_index * (reZp_li_w * 3 + reZp_li_MarginLeft * 3)
        })

    })


    // 同人大触

    let tr_left = $('.m_prev_trdc');
    let tr_right = $('.m_next_trdc');
    let tr_m_bd = $('.m_trdc_bd');
    let tr_m_bd_left = tr_m_bd.find("li").width() + parseFloat(tr_m_bd.find("li").css("marginRight"));
    let tr_index_max = $('.m_trdc_bd').children("li").length / 2 - 3;
    let tr_index = 0;

    tr_right.click(function() {
        tr_index++;
        if (tr_index != 0) {
            tr_left.css(pterEveAuto);
        }
        if (tr_index == tr_index_max) {
            $(this).css(pterEveNone);
        }
        tr_m_bd.animate({
            left: -tr_index * tr_m_bd_left
        })
    })
    tr_left.click(function() {
        if (tr_index == 0) return false;
        if (tr_index == 1) {
            $(this).css(pterEveNone);
        }
        tr_index--;
        if (tr_index == tr_index_max - 1) {
            tr_right.css(pterEveAuto);
        }
        tr_m_bd.animate({
            left: -tr_index * tr_m_bd_left
        })
    })

    //泛娱乐
    let fyu_ul = $(".m_fyl_bd");
    let fyu_left = $(".m_prev_fyl");
    let fyu_right = $(".m_next_fyl");
    let fyu_one_left = fyu_ul.find("li").width() + parseFloat(fyu_ul.find("li").css("margin-right"));
    let fyu_index = 0;

    fyu_right.on("click", function() {
        fyu_index++;
        if (fyu_index >= 1) {
            fyu_left.css(pterEveAuto);
        }
        if (fyu_index == 3) {
            $(this).css(pterEveNone)
        }
        fyu_ul.animate({
            left: -(fyu_index * fyu_one_left)
        })
        return false;
    })
    fyu_left.on("click", function() {
        if (fyu_index == 0) return false;
        fyu_index--;

        fyu_ul.animate({
            left: -(fyu_index * fyu_one_left)
        })
        if (fyu_index == 2) {
            fyu_right.css(pterEveAuto)
        }
        if (fyu_index == 0) {
            $(this).css(pterEveNone)
            return false
        }
        return false;
    })

})