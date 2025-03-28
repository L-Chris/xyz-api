import { OpenAPIHono } from "@hono/zod-openapi";
import { registerSendCodeRoute } from "./handlers/sendcode.ts";


export const registerRoutes = (app: OpenAPIHono) => {
    registerSendCodeRoute(app)
}