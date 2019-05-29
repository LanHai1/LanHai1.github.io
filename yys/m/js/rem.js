(() => {
    let clis = () => {
        let dom = document.documentElement
        let domClientWidthValue = dom.clientWidth > 750 ? 750 : dom.clientWidth

        dom.style.fontSize = (domClientWidthValue < 200) ? "50px" : (50 * (domClientWidthValue / 375) +
            "px")
    }
    clis()
    window.addEventListener('resize', clis)
})()