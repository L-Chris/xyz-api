import { OpenAPIHono } from "@hono/zod-openapi";
import { registerSendCodeRoute } from "./handlers/sendcode.ts";
import { registerLoginRoute } from "./handlers/login.ts";
import { registerTokenRoute } from "./handlers/token.ts";
import { registerSearchRoute } from "./handlers/search.ts";


export const registerRoutes = (app: OpenAPIHono) => {
    registerSendCodeRoute(app)
    registerLoginRoute(app)
    registerTokenRoute(app)
    registerSearchRoute(app)
}