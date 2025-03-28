import { BASE_URL } from "../constant.ts";

export const MsgFlag = {
	200: "OK",
	400: "错误请求",
	401: "身份认证信息失效，尝试重新登录或调用 /refresh_token 接口以获取有效认证信息",
	403: "拒绝访问",
	404: "请求的资源不存在",
	405: "请求方法不支持",
	500: "服务器内部错误",
	502: "网关错误",
	503: "服务不可用",
	504: "网关超时",
}

export const request = async (config: {
    url: string
    params?: Record<string,any>
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
    body?: Record<string,any>
    headers?: RequestInit['headers']
}) => {
    const url = new URL(BASE_URL + config.url)
    if (config.params) {
        for (const key in config.params) {
            url.searchParams.append(key, String(config.params[key]));
        }
    }

    const req = await fetch(url, {
        method: config.method || 'GET',
        headers: {
            ...config.headers,
            "Host":                        "api.xiaoyuzhoufm.com",
            "User-Agent":                  "Xiaoyuzhou/2.57.1 (build:1576; iOS 17.4.1)",
            "Market":                      "AppStore",
            "App-BuildNo":                 "1576",
            "OS":                          "ios",
            "x-jike-access-token":         "",
            "x-jike-refresh-token":        "",
            "Manufacturer":                "Apple",
            "BundleID":                    "app.podcast.cosmos",
            "Connection":                  "keep-alive",
            "Accept-Language":             "zh-Hant-HK;q=1.0, zh-Hans-CN;q=0.9",
            "Model":                       "iPhone14,2",
            "app-permissions":             "4",
            "Accept":                      "*/*",
            "Content-Type":                "application/json",
            "App-Version":                 "2.57.1",
            "WifiConnected":               "true",
            "OS-Version":                  "17.4.1",
            "x-custom-xiaoyuzhou-app-dev": "",
        },
        body: config.body ? JSON.stringify(config.body) : '',
    })

    return req.json()
}