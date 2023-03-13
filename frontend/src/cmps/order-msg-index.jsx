import { useState } from "react"
import { useEffect } from "react"


import { orderService } from '../services/order.service.local'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG } from "../services/socket.service"

import { utilService } from "../services/util.service"
import { showErrorMsg } from "../services/event-bus.service"

import imgSent from "../assets/img/icons/icon-sent.png"
import { ImgUploader } from "./img-uploader"



export function OrderMsg({ roomName, currOrder }) {
    const [orderMsgs, setOrderMsgs] = useState(currOrder.msgs)
    const [msg, setMsg] = useState(orderService.getEmptyMsg())

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setMsg({ ...msg, [field]: value })
    }

    useEffect(() => {
        onLoadOrderMsgs()
        socketService.emit(SOCKET_EMIT_SET_TOPIC, roomName)
    }, [roomName])

    async function onLoadOrderMsgs() {
        try {
            const orderFromBack = await orderService.getById(currOrder._id)
            setOrderMsgs(prevOrderMsg => orderFromBack.msgs)
        } catch (err) {
            showErrorMsg('Cannot find msgs')
        }
    }

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    function addMsg(savedMsg) {
        setOrderMsgs(prevMsgs => [...prevMsgs, savedMsg])
    }

    async function onAddOrderMsg() {
        msg.creatAt = Date.now()
        try {
            const savedMsg = await orderService.addOrderMsg(currOrder._id, msg)
            socketService.emit(SOCKET_EMIT_SEND_MSG, savedMsg)
            setMsg(orderService.getEmptyMsg())

        } catch (err) {
            showErrorMsg('Could not sent msg')
        }
    }

    async function onUploaded(imgUrl) {
        let imgMsg = {
            txt: '',
            msgRead: false,
            creatAt: Date.now(),
            imgUrl: imgUrl
        }

        try {
            const savedMsg = await orderService.addOrderMsg(currOrder._id, imgMsg)
            socketService.emit(SOCKET_EMIT_SEND_MSG, savedMsg)
            setMsg(orderService.getEmptyMsg())

        } catch (err) {
            showErrorMsg('Could not upload image')
        }
    }

    return (
        <section className="msg-room flex column">
            <section className="msg-list">
                <ul className="flex column g5 mis5 mt5">
                    {orderMsgs.map(msg => <li key={utilService.makeId()} className="msg-preview flex column">
                        <p>{msg.txt}</p>
                        <span>{utilService.getTimeAgo(msg.creatAt)}</span>
                        {msg.imgUrl && <img style={{ width: '150px' }} src={msg.imgUrl} />}
                    </li>)}

                </ul>
            </section>

            <div className="input-area flex align-center g5">
                {/* <form onSubmit={onAddOrderMsg} className="flex align-center"> */}
                <input type="text" name="txt" title="txt" id="txt" value={msg.txt} placeholder="msg" onChange={handleChange} />

                <div className="msg-util flex align-center g5">
                    <img onClick={onAddOrderMsg} src={imgSent} alt="" title="sent" />
                    <ImgUploader onUploaded={onUploaded} />
                </div>
                {/* </form> */}
            </div>
        </section>
    )
}