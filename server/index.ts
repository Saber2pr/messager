#!/usr/bin/env node

import Koa from "koa"
import KoaRouter from "koa-router"
import { getLocalIP } from "./utils"
import { promisify } from "util"
import { readFile } from "fs"
import { join } from "path"

type MessageQueue = Array<{
  message: string
  time: string
}>

interface ISend {
  message: string
}

// fs
const ReadFile = promisify(readFile)

// constant
const NETWORK_IP = getLocalIP()
const PORT = 3000
const PATH_ROOT = join(__dirname, '../../')
const PATH_API = "/api"
const PATH_STATIC = "/build"

// redis
const MessagePool: MessageQueue = []

// server
const app = new Koa()

// static
app.use(async (ctx, next) => {
  const url = ctx.url
  const req = ctx.req
  const res = ctx.res

  if (url === "/") {
    const target = join(PATH_ROOT, url, PATH_STATIC, "index.html")
    const data = await ReadFile(target)
    res.writeHead(200, {
      "content-type": `text/html;charset="utf-8"`
    })
    res.end(data)
  } else if (url.startsWith(PATH_STATIC)) {
    const target = join(PATH_ROOT, url)
    const data = await ReadFile(target)
    const accept = req.headers.accept
    res.writeHead(200, {
      "content-type": `${accept};charset="utf-8"`
    })
    res.end(data)
  } else {
    await next()
  }
})

// router
const router = new KoaRouter({ prefix: PATH_API })
// config
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT, () => console.log(`http://${NETWORK_IP}:${PORT}`))

// routes
router.get(`/send`, async ctx => {
  // @ts-ignore
  const { message, time } = ctx.query as ISend
  MessagePool.push({ message, time })
  ctx.body = message
})

router.get(`/get`, async ctx => {
  ctx.body = MessagePool
})
