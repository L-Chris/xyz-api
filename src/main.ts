import { OpenAPIHono } from '@hono/zod-openapi'
import { registerRoutes } from "./router.ts";

const app = new OpenAPIHono()

registerRoutes(app)

export default app