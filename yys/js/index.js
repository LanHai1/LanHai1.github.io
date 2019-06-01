// 禁用shu向滚动条
// document.querySelector(".yys_lh_banner_main").parentNode.style.overflowY = "hidden";
// 导航效果
let yys_lh_dh = fJquery(".yys_lh_nav_con>ul>li");

for (let i = 0; i < yys_lh_dh.length; i++) {

    yys_lh_dh[i].onmouseover = function() {
        this.classList.add("active")
    }

    yys_lh_dh[i].onmouseout = function() {

        this.classList.remove("active")
        yys_lh_dh[0].classList.add("active");
    }
}

// 新闻资讯轮播
let newsUl = fJquery(".yys_lh_new_box>ul>li");
let newsUl_Box = fJquery(".yys_lh_new_box>ul")[0];

for (let i = 0; i < newsUl.length; i++) {
    newsUl[i].setAttribute("index", i + 1);
}


// 上一节下一节
let nextPage = fJquery(".n_next_btn")[0];
let lastPage = fJquery(".n_prev_btn")[0];

let zMarginL = 0;
let newsUl_Index = 0;
let timeIdNews;

function timeNews() {
    timeIdNews = setInterval(() => {
        ++newsUl_Index;
        zMarginL += 20;
        animation_s(newsUl_Box, {
            left: -(newsUl_Index * newsUl[0].offsetWidth + zMarginL)
        });
        if (newsUl_Box.offsetLeft < -2860) {
            newsUl_Index = zMarginL = 0;
        }
    }, 3000);
}
timeNews();

function celaerTime() {
    clearInterval(timeIdNews)
}

function startTime() {
    timeNews();
}
newsUl_Box.onmouseover = celaerTime;

newsUl_Box.onmouseout = startTime;

lastPage.onmouseover = celaerTime;

lastPage.onmouseout = startTime;

nextPage.onmouseover = celaerTime;

nextPage.onmouseout = startTime;


lastPage.onclick = function() {
    if (zMarginL == 0 || newsUl_Index == 0) {
        zMarginL = 0;
        newsUl_Index = 0;
    } else {
        zMarginL -= 20;
        newsUl_Index--;
    }
    animation_s(newsUl_Box, {
        left: -(newsUl_Index * newsUl[0].offsetWidth + zMarginL)
    })
}

nextPage.onclick = function() {
    if (newsUl_Index == 12) {
        zMarginL = zMarginL;
        newsUl_Index = newsUl_Index;
    } else {
        zMarginL += 20;
        newsUl_Index++;
    }

    animation_s(newsUl_Box, {
        left: -(newsUl_Index * newsUl[0].offsetWidth + zMarginL)
    })
}

// 平安世界切换
let left_world = fJquery(".yys_lh_jt")[0];
let right_world = fJquery(".yys_lh_jt")[1];
let worldUl = fJquery(".yys_lh_bigImg_item");

// 平安世界文字
let left_world_p = document.querySelector(".yys_lh_bigImg_btn_left p")
let right_world_p = document.querySelector(".yys_lh_bigImg_btn_right p")

let worldUl_index = 0;

right_world.onclick = function() {
    worldUl_index++;
    let worldUl_box_0 = worldUl[worldUl_index - 1].children[0].children[0].children[0];
    let worldUl_box_1 = worldUl[worldUl_index - 1].children[0].children[0].children[1];
    let thisDiv = worldUl_box_0.parentNode.parentNode.parentNode.nextElementSibling;
    if (worldUl_index == worldUl.length) {
        worldUl_index = 1;
        thisDiv = worldUl[1];
    }

    let lastDiv = thisDiv.previousElementSibling;
    let nextDiv = thisDiv.nextElementSibling;
    // p文字处理
    if (worldUl_index == worldUl.length - 1) {
        lastDiv = worldUl[worldUl.length - 1].previousElementSibling;
        nextDiv = worldUl[0].nextElementSibling;
        right_world_p.innerHTML = nextDiv.dataset.name;
        left_world_p.innerHTML = lastDiv.dataset.name;
    } else {
        right_world_p.innerHTML = nextDiv.dataset.name;
        left_world_p.innerHTML = lastDiv.dataset.name;
    }
    // 动画
    animation_s(worldUl_box_0, {
        right: -200,
        opacity: 0
    }, () => {
        worldUl[worldUl_index].children[0].children[0].children[0].style.right = "-200px";
        worldUl[worldUl_index].children[0].children[0].children[0].style.opacity = 0.2;

        animation_s(worldUl[worldUl_index].children[0].children[0].children[0], {
            right: 0,
            opacity: 1
        })
        for (let i = 0; i < worldUl.length; i++) {
            worldUl[i].dataset.index = i;
            worldUl[i].style.display = "none";
        }
        worldUl[worldUl_index].style.display = "block";
    })

    animation_s(worldUl_box_1, {
        left: -200,
        opacity: 0
    }, () => {
        worldUl[worldUl_index].children[0].children[0].children[1].style.left = "-200px";
        worldUl[worldUl_index].children[0].children[0].children[1].style.opacity = 0.2;

        animation_s(worldUl[worldUl_index].children[0].children[0].children[1], {
            left: 0,
            opacity: 1
        })
        for (let i = 0; i < worldUl.length; i++) {
            worldUl[i].dataset.index = i;
            worldUl[i].style.display = "none";
        }
        worldUl[worldUl_index].style.display = "block";
    })

}

left_world.onclick = function() {
    worldUl_index--;
    let worldUl_box_0 = worldUl[worldUl_index + 1].children[0].children[0].children[0];
    let worldUl_box_1 = worldUl[worldUl_index + 1].children[0].children[0].children[1];
    let thisDiv = worldUl_box_0.parentNode.parentNode.parentNode.nextElementSibling;
    if (worldUl_index == -1) {
        worldUl_index = 3;
    }

    let lastDiv = thisDiv.previousElementSibling;
    let nextDiv = thisDiv.nextElementSibling;
    if (worldUl_index == 2) {
        nextDiv = worldUl[3].previousElementSibling;
        right_world_p.innerHTML = lastDiv.dataset.name;
        left_world_p.innerHTML = nextDiv.dataset.name;
    } else {

        right_world_p.innerHTML = lastDiv.dataset.name;
        left_world_p.innerHTML = nextDiv.dataset.name;
    }
    // 动画
    animation_s(worldUl_box_0, {
        right: -200,
        opacity: 0
    }, () => {
        worldUl[worldUl_index].children[0].children[0].children[0].style.right = "-200px";
        worldUl[worldUl_index].children[0].children[0].children[0].style.opacity = 0.2;

        animation_s(worldUl[worldUl_index].children[0].children[0].children[0], {
            right: 0,
            opacity: 1
        })
        for (let i = 0; i < worldUl.length; i++) {
            worldUl[i].dataset.index = i;
            worldUl[i].style.display = "none";
        }
        worldUl[worldUl_index].style.display = "block";
    })

    animation_s(worldUl_box_1, {
        left: -200,
        opacity: 0
    }, () => {
        worldUl[worldUl_index].children[0].children[0].children[1].style.left = "-200px";
        worldUl[worldUl_index].children[0].children[0].children[1].style.opacity = 0.2;

        animation_s(worldUl[worldUl_index].children[0].children[0].children[1], {
            left: 0,
            opacity: 1
        })
        for (let i = 0; i < worldUl.length; i++) {
            worldUl[i].dataset.index = i;
            worldUl[i].style.display = "none";
        }
        worldUl[worldUl_index].style.display = "block";
    })

}

// 游戏攻略tab切换

let gemaTab_top = fJquery(".yys_lh_mx>li");
let gemaTab_con = fJquery(".yys_lh_game_bottom>.yys_lh_geme_sta_con")
for (let i = 0; i < gemaTab_top.length; i++) {
    gemaTab_top[i].setAttribute("index", i);
    gemaTab_con[i].setAttribute("index", i);
    gemaTab_top[i].onmouseover = function() {
        gemaTab(gemaTab_top[i].getAttribute("index"))
    }
}

function gemaTab(index) {
    for (let i = 0; i < gemaTab_top.length; i++) {
        gemaTab_top[i].classList.remove("on");
        gemaTab_con[i].style.display = "none";
    }
    gemaTab_top[index].classList.add("on");
    gemaTab_con[index].style.display = "block";
}

let gemaTab_timeId_Index = 0;
let gemaTab_timeId;

function timeGemeStr() {
    gemaTab_timeId = setInterval(() => {
        gemaTab_timeId_Index++;
        if (gemaTab_timeId_Index == 4) {
            gemaTab_timeId_Index = 0;
        }
        gemaTab(gemaTab_timeId_Index)
    }, 3000)
}
timeGemeStr();

for (let i = 0; i < gemaTab_top.length; i++) {
    gemaTab_top[i].addEventListener("mouseover", () => {
        clearInterval(gemaTab_timeId);
    })
    gemaTab_con[i].addEventListener("mouseover", () => {
        clearInterval(gemaTab_timeId);
    })
    gemaTab_top[i].onmouseout = function() {
        gemaTab_timeId_Index = this.getAttribute("index");
        timeGemeStr();
    }
    gemaTab_con[i].onmouseout = function() {
        gemaTab_timeId_Index = this.getAttribute("index");
        timeGemeStr();
    }
}

// 同人手账轮播
let tren_con_span = fJquery(".yys_lh_ban_num_con>span");
let tren_con_img = fJquery(".yys_lh_tr_ban_img>a");
let tren_con_Index = 0;
let timeId_toren;

for (let i = 0; i < tren_con_span.length; i++) {
    tren_con_span[i].setAttribute("index", i);
    tren_con_img[i].setAttribute("index", i);
    tren_con_span[i].onclick = function() {
        trenTab(this.getAttribute("index"))
        tren_con_Index = this.getAttribute("index");
    }
    tren_con_span[i].onmouseover = function() {
        clearInterval(timeId_toren)
    }
    tren_con_img[i].onmouseover = function() {
        clearInterval(timeId_toren)
    }

    tren_con_span[i].onmouseout = function() {
        timeId_toren = setInterval(() => {
            tren_con_Index++;
            if (tren_con_Index == 6) {
                tren_con_Index = 0
            }
            trenTab(tren_con_Index)
        }, 3000)
    }
    tren_con_img[i].onmouseout = function() {
        timeId_toren = setInterval(() => {
            tren_con_Index++;
            if (tren_con_Index == 6) {
                tren_con_Index = 0
            }
            trenTab(tren_con_Index)
        }, 3000)
    }
}

function trenTab(index) {
    for (let i = 0; i < tren_con_img.length; i++) {
        tren_con_span[i].classList.remove("on");
        tren_con_img[i].style.display = "none";
        animation_s(tren_con_img[i], {
            opacity: 0.4
        })
    }
    tren_con_span[index].classList.add("on");
    tren_con_img[index].style.display = "block";
    tren_con_img[index].style.opacity = 0;
    animation_s(tren_con_img[index], {
        opacity: 0.5
    }, () => {
        animation_s(tren_con_img[index], {
            opacity: 1
        })
    })
}

timeId_toren = setInterval(() => {
    tren_con_Index++;
    if (tren_con_Index == 6) {
        tren_con_Index = 0
    }
    trenTab(tren_con_Index)
}, 3000)

// 泛娱乐
let fyu_ul = fJquery(".yys_lh_fun_ul")[0];
let fyu_ul_li_w = fyu_ul.children[0].offsetWidth;
let fyu_a_left = fJquery(".yys_lh_fun_btn_left")[0];
let fyu_a_right = fJquery(".yys_lh_fun_btn_right")[0];
let fyu_index = 0;
let fyu_margin_r = 0; // +10
fyu_a_right.onclick = function() {
    ++fyu_index;
    fyu_margin_r += 10;
    if (fyu_index != 0) {
        fyu_a_left.style.display = "block";
    }
    if (fyu_index == 2) {
        fyu_a_right.style.display = "none";
    } else {
        fyu_a_right.style.display = "block";
    }
    animation_s(fyu_ul, {
        left: -(fyu_index * fyu_ul_li_w + fyu_margin_r)
    })
}

fyu_a_left.onclick = function() {
    --fyu_index;
    fyu_margin_r -= 10;
    if (fyu_index == 0) {
        fyu_a_left.style.display = "none";
    }
    if (fyu_index == 2) {
        fyu_a_right.style.display = "none";
    } else {
        fyu_a_right.style.display = "block";
    }
    animation_s(fyu_ul, {
        left: -(fyu_index * fyu_ul_li_w + fyu_margin_r)
    })
}

// 京都拖拉
let moveElem = document.querySelector('.yys_lh_jd_td_box'); //待拖拽元素 
let moveTdElem = document.querySelector(".yys_lh_jd_td");
let movdMax_l = moveTdElem.offsetWidth - moveElem.offsetWidth;
let bliMoveJd = document.querySelector(".yys_lh_jdSh_ul").offsetWidth / moveTdElem.offsetWidth;


let dragging; //是否激活拖拽状态
let tLeft; //鼠标按下时相对于选中元素的位移

//监听鼠标按下事件
document.addEventListener('mousedown', function(e) {
    if (e.target == moveElem) {
        dragging = true; //激活拖拽状态
        var moveElemRect = moveElem.getBoundingClientRect();
        tLeft = e.clientX - moveElemRect.left; //鼠标按下时和选中元素的坐标偏移:x坐标
    }
});

document.addEventListener('mouseup', function(e) {
    dragging = false;
});

document.addEventListener('mousemove', function(e) {
    if (dragging) {
        var moveX = e.clientX - tLeft - moveElem.offsetWidth - 95;
        if (moveX < 0) {
            moveX = 0;
        }
        if (moveX > movdMax_l) {
            moveX = movdMax_l;
        }
        document.querySelector(".yys_lh_jdSh_ul").style.left = -moveX * bliMoveJd + "px";
        moveElem.style.left = moveX + 'px';
    }
});

// 小人物移动
let renBox = $(".yys_lh_ewms");
renBox.mousemove(function(e) {
    let x = e.pageX;
    if (x > 130 && x < 605) {
        $(".yys_lh_role-wrap").css("background-position", "0px 0px");
    } else if (x > 605 && x < 690) {
        $(".yys_lh_role-wrap").css("background-position", "-203px 0px");
    } else if (x > 690 && x < 740) {
        $(".yys_lh_role-wrap").css("background-position", "-406px 0px");
    } else if (x > 740 && x < 795) {
        $(".yys_lh_role-wrap").css("background-position", "-609px 0px");
    } else if (x > 795 && x < 1309) {
        $(".yys_lh_role-wrap").css("background-position", "-812px 0px");

    }
});

let renWord_child = $(".yys_lh_word-wrap").children();
let renWord_child_rendom = renWord_child.length;

renBox.click(function() {
    let rendom = parseInt(Math.random() * renWord_child_rendom)
    renWord_child.eq(rendom).css("opacity", 1).siblings("div").css("opacity", 0);
    setTimeout(function() {
        renWord_child.eq(rendom).css("opacity", 0)
    }, 2000)
})