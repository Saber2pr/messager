/*
 * @Author: saber2pr
 * @Date: 2020-06-21 12:33:16
 * @Last Modified by: saber2pr
 * @Last Modified time: 2023-08-19 15:08:31
 */
import React, { useRef, useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "normalize.css"
import "./app.less"
import axios from "axios"
import { useInterval } from "react-use"
import { rgb, scrollToBottom } from "./utils"
import ClipboardJS from "clipboard"
import Qrcode from 'qrcode.react'

const request = axios.create({
  baseURL: "/api"
})

const cache = {
  lastQueueLen: -1
}

const pendingMessage = { message: "等待连接中" }

const useRefreshMessagePool = (): [
  MessageQueue,
  React.MutableRefObject<HTMLDivElement>
] => {
  const ref = useRef<HTMLDivElement>()
  const [state, setState] = useState<MessageQueue>([pendingMessage])

  useInterval(() => {
    request
      .get("/get")
      .then(res => {
        const next = res.data || []
        if (next.length === cache.lastQueueLen) {
        } else {
          setState(next)
          cache.lastQueueLen = next.length
          scrollToBottom(ref.current)
        }
      })
      .catch(() => setState([...state, pendingMessage]))
  }, 500)

  return [state, ref]
}

const Line = React.memo(
  ({ children, id, time }: { children: string; id: number; time: string }) => {
    const ref = useRef<HTMLDivElement>()
    useEffect(() => {
      const cp = new ClipboardJS(ref.current)
      return () => cp.destroy()
    }, [])
    const clipId = "clipId-" + id
    return (
      <div className="line" style={{
        backgroundColor: 'rgb(231 231 231)'
      }}>
        <span className="line-time">{time}</span>
        <pre
        id={clipId}
        >
        {children}
        <i
          ref={ref}
          data-clipboard-target={"#" + clipId}
          className="iconfont icon-fuzhi clip"
          title="复制"
        />
      </pre>
      </div>
    )
  }
)

export const App = () => {
  const ref = useRef<HTMLDivElement>()
  const [showQrcode, setShowQrcode] = useState(false)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body: ISend = { message: ref.current.innerText, time: new Date().toLocaleString() }
    request.get("/send", {
      params: body
    })
  }

  const [mpl, containRef] = useRefreshMessagePool()
  return (
    <>
      <header onClick={() => setShowQrcode(!showQrcode)}>
        <u>Messager</u>
      </header>
      <main>
        {showQrcode && <Qrcode style={{margin: '1rem auto'}} value={location.href} />}
        <div ref={containRef} className="message-contain">
          {mpl.map(({ message, time }, i) => (
            <Line key={message + i} id={i} time={time}>
              {message}
            </Line>
          ))}
        </div>
        <form className="input-form" onSubmit={onSubmit}>
          <div ref={ref} className="text-input" contentEditable />
          <input className="submit" type="submit" value="发送" />
        </form>
      </main>
      <footer>by saber2pr</footer>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
