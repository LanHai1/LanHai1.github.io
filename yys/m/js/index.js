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
    $(".m_next_news").click(function() {
        console.log($(".m_swiper-slide").width())
    })
})