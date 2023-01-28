import { eventBus, showSuccessMsg } from "../services/event-bus.service.js"
import { useState, useEffect, useRef } from 'react'
import { socketService, SOCKET_EVENT_ORDER_FOR_HOST } from "../services/socket.service.js"

export function UserMsg() {

  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 1500)
    })

    // socketService.on(SOCKET_EVENT_ORDER_FOR_HOST, (order) => {
    //   showSuccessMsg(`New order about me `)
    // })

    return () => {
      unsubscribe()
      // socketService.off(SOCKET_EVENT_ORDER_FOR_HOST)
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type}`}>
      {/* <button onClick={closeMsg}>x</button> */}
      {msg.txt}
    </section>
  )
}