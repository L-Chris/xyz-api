import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { request } from "../utils/http.ts";

const searchLoadMoreKeySchema = z.object({
    loadMoreKey: z.number(),
    searchId: z.string()
});

const searchRequestBodySchema = z.object({
    pid: z.string().optional(),
    type: z.string(),
    keyword: z.string(),
    loadMoreKey: searchLoadMoreKeySchema.optional()
});

export function registerSearchRoute(app: OpenAPIHono) {
    // 搜索接口
    const searchRoute = createRoute({
        method: 'post' as const,
        path: '/search',
        operationId: 'search',
        summary: '搜索',
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: searchRequestBodySchema
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'ok',
                content: {
                    'application/json': { schema: z.any() }
                }
            },
            400: {
                description: '参数错误',
                content: {
                    'application/json': { schema: z.any() }
                }
            },
            500: {
                description: '服务器错误',
                content: {
                    'application/json': { schema: z.any() }
                }
            }
        }
    });

    // 搜索预设接口
    const searchPresetRoute = createRoute({
        method: 'get' as const,
        path: '/search/preset',
        operationId: 'searchPreset',
        summary: '可能想搜的内容',
        responses: {
            200: {
                description: 'ok',
                content: {
                    'application/json': { schema: z.any() }
                }
            },
            500: {
                description: '服务器错误',
                content: {
                    'application/json': { schema: z.any() }
                }
            }
        }
    });

    // 搜索处理函数
    app.openapi(searchRoute, async (c) => {
        const body = await c.req.json();
        
        if (!body.keyword || !body.type) {
            return c.json({
                code: 400,
                msg: "参数错误",
                data: null
            }, 400);
        }

        const params: Record<string, any> = {
            limit: "20",
            sourcePageName: "4",
            type: body.type,
            currentPageName: "4",
            keyword: body.keyword
        };

        if (body.loadMoreKey) {
            params.loadMoreKey = {
                loadMoreKey: body.loadMoreKey.loadMoreKey,
                searchId: body.loadMoreKey.searchId
            };
        }

        if (body.pid) {
            params.pid = body.pid;
        }

        try {
            const res = await request({
                url: '/v1/search/create',
                method: 'POST',
                headers: {
                    'x-jike-access-token': c.req.header('x-jike-access-token') || '',
                    'Content-Type': 'application/json'
                },
                body: params
            });

            const data = await res.json();

            return c.json({
                code: 200,
                msg: "success",
                data: data
            });
        } catch (error: unknown) {
            console.error("搜索请求失败:", error);
            const errorMessage = error instanceof Error ? error.message : "未知错误";
            return c.json({
                code: 500,
                msg: "服务器错误",
                data: errorMessage
            }, 500);
        }
    });

    // 搜索预设处理函数
    app.openapi(searchPresetRoute, async (c) => {
        try {
            const res = await request({
                url: '/v1/search/get-preset',
                method: 'GET',
                headers: {
                    'x-jike-access-token': c.req.header('x-jike-access-token') || ''
                }
            });

            const data = await res.json();

            return c.json({
                code: 200,
                msg: "success",
                data: data
            });
        } catch (error: unknown) {
            console.error("获取搜索预设失败:", error);
            const errorMessage = error instanceof Error ? error.message : "未知错误";
            return c.json({
                code: 500,
                msg: "服务器错误",
                data: errorMessage
            }, 500);
        }
    });
}
