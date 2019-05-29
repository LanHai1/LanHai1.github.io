// 入口函数
$(function() {
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

})