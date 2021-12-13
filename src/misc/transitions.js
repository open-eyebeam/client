export const transitionWorldOut = el => {
    return new Promise((resolve, reject) => {
        let tl = gsap.timeline()
        tl.to(el, 0.5, {
            css: { opacity: 0 },
        })
        tl.play()
        tl.eventCallback("onComplete", () => {
            resolve()
        })
    })
}

export const transitionWorldIn = el => {
    return new Promise((resolve, reject) => {
        let tl = gsap.timeline()
        tl.to(el, 0.5, {
            css: { opacity: 0 },
        })
        tl.to(el, 0.5, {
            css: { opacity: 1 },
        })
        tl.play()
        tl.eventCallback("onComplete", () => {
            resolve()
        })
    })
}