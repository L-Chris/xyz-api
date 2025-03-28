import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { request } from "../utils/http.ts";

export function registerTokenRoute(app: OpenAPIHono) {
    const route = createRoute({
        method: 'post' as const,
        path: '/token',
        operationId: 'refreshToken',
        summary: '刷新token',
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: z.object({
                            'x-jike-access-token': z.string(),
                            'x-jike-refresh-token': z.string()
                        })
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
                description: 'ok',
                content: {
                    'application/json': { schema: z.any() }
                }
            },
            500: {
                description: 'ok',
                content: {
                    'application/json': { schema: z.any() }
                }
            }
        }
    })

    app.openapi(route, async (c) => {
        const body = await c.req.json();
        
        if (!body['x-jike-access-token'] || !body['x-jike-refresh-token']) {
            return c.json({
                code: 400,
                msg: "参数错误",
                data: null
            }, 400);
        }

        try {
            const res = await request({
                url: '/app_auth_tokens.refresh',
                method: 'POST',
                headers: {
                    'x-jike-access-token': body['x-jike-access-token'],
                    'x-jike-refresh-token': body['x-jike-refresh-token'],
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }
            });

            const data = await res.json();

            return c.json({
                code: 200,
                msg: "success",
                data: data
            });
        } catch (error: unknown) {
            console.error("刷新token请求失败:", error);
            const errorMessage = error instanceof Error ? error.message : "未知错误";
            return c.json({
                code: 500,
                msg: "服务器错误",
                data: errorMessage
            }, 500);
        }
    })
}
