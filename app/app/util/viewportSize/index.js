


export const VIEWPORT_SIZE = {
    XL: "XL",
    LG: "LG",
    MD: "MD",
    SM: "SM",
    XS: "XS"
}

export const getViewportSize = () => {
    const vpWidth = window.innerWidth
    if (vpWidth >= 1200) return VIEWPORT_SIZE.XL
    if (vpWidth >= 992) return VIEWPORT_SIZE.LG
    if (vpWidth >= 768) return VIEWPORT_SIZE.MD
    if (vpWidth >= 576) return VIEWPORT_SIZE.SM
    return VIEWPORT_SIZE.XS
}