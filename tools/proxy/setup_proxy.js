import proxyRules from "../../../src/proxy_rules"

const setupProxy = (url) => {
    const _url = url.split("/")[1]
    const proxyRule = proxyRules.find(item => {
        if (item.rule.slice(1) === _url) {
            return true
        } else {
            return false
        }
    })

    if (proxyRule) {
        return url.replace(proxyRule.rule, proxyRule.target)
    } else {
        console.error(url, "未找到proxy规则");
        return
    }
}

export default setupProxy