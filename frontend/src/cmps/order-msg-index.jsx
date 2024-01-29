import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import { orderService } from '../services/order.service.local'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG } from "../services/socket.service"

import { utilService } from "../services/util.service"
import { showErrorMsg } from "../services/event-bus.service"

import imgSent from "../assets/img/icons/icon-sent.png"
import imgBack from "../assets/img/icons/icon-back.png"

import { ImgUploader } from "./img-uploader"

export function OrderMsg({ roomName, currOrder, closeCurrChat }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const [orderMsgs, setOrderMsgs] = useState(currOrder.msgs)
    const [msg, setMsg] = useState(orderService.getEmptyMsg())


    useEffect(() => {
        onLoadOrderMsgs()
        socketService.emit(SOCKET_EMIT_SET_TOPIC, roomName)
    }, [roomName])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    async function onLoadOrderMsgs() {
        try {
            const orderFromBack = await orderService.getById(currOrder._id)
            setOrderMsgs(prevOrderMsg => orderFromBack.msgs)
        } catch (err) {
            showErrorMsg('Cannot find msgs')
        }
    }

    function addMsg(savedMsg) {
        setOrderMsgs(prevMsgs => [...prevMsgs, savedMsg])
    }

    async function onAddOrderMsg(ev) {
        if (ev) ev.preventDefault()
        try {
            const upDatedMsg = await fixOrderSetting()
            const savedMsg = await orderService.addOrderMsg(currOrder._id, upDatedMsg)
            socketService.emit(SOCKET_EMIT_SEND_MSG, savedMsg)
            socketService.emit('new-notfication', savedMsg)
            restMsg()

        } catch (err) {
            showErrorMsg('Could not sent msg')
        }
    }

    function restMsg() {
        setMsg(prevMsg => orderService.getEmptyMsg())
    }

    async function fixOrderSetting() {
        return new Promise((resolve, reject) => {
            setMsg(prevMsg => {
                const upDatedMsg = { ...prevMsg, creatAt: Date.now() }
                upDatedMsg.from = user._id
                upDatedMsg.to = user._id === currOrder.hostId ? currOrder.byUser._id : currOrder.hostId
                resolve(upDatedMsg)
                return upDatedMsg
            })
        })
    }

    async function onUploaded(imgUrl) {
        let imgMsg = orderService.getEmptyMsg()
        imgMsg.imgUrl = imgUrl
        const toUser = msg.from === currOrder.hostId ? currOrder.byUser._id : currOrder.hostId
        imgMsg.to = toUser
        try {
            const savedMsg = await orderService.addOrderMsg(currOrder._id, imgMsg)
            socketService.emit(SOCKET_EMIT_SEND_MSG, savedMsg)
        } catch (err) {
            showErrorMsg('Could not upload image')
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setMsg({ ...msg, [field]: value })
    }

    return (
        <section className="msg-room flex column">
            <section className="msg-list">
                <img className="img-back" src={imgBack} alt="" onClick={closeCurrChat} title="Back" />
                <ul className="flex column g5 mis5 mt5">
                    {orderMsgs.map(msg => <li key={utilService.makeId()} className="msg-preview flex column">
                        <p>{msg.txt}</p>
                        {msg.imgUrl && <img style={{ width: '150px' }} src={msg.imgUrl} />}
                        <span>{utilService.getTimeAgo(msg.creatAt)}</span>
                    </li>)}

                </ul>
            </section>

            <div className="input-area ">
                <form onSubmit={onAddOrderMsg} className="flex align-center">
                    <input type="text" name="txt" title="txt" id="txt" value={msg.txt} placeholder="msg" onChange={handleChange} />

                    <div className="msg-util flex align-center g5">
                        <img onClick={onAddOrderMsg} src={imgSent} alt="" title="sent" />
                        <ImgUploader onUploaded={onUploaded} />
                    </div>
                </form>
            </div>
        </section>
    )
}