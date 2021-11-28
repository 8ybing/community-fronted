const title = "ICE社区论坛系统"

export default function getPageTitle(pageTitle) {
    if(pageTitle){
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}