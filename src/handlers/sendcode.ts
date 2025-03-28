import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { request } from "../utils/http.ts";

export function registerSendCodeRoute(app: OpenAPIHono) {
    const route = createRoute({
        method: 'post' as const,
        path: '/sendCode',
        operationId: 'sendCode',
        summary: 'sendCode',
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: z.object({
                            mobilePhoneNumber: z.string(),
                            areaCode: z.string().optional().default("+86")
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
            }
        }
    })

    app.openapi(route, async (c) => {
        const body = await c.req.json();
        const res = await request({
            url: '/v1/auth/sendCode',
            method: 'POST',
            body: {
                mobilePhoneNumber: body.mobilePhoneNumber,
                areaCode: body.areaCode || '+86'
            }
        })
        return c.json(res);
    })
}