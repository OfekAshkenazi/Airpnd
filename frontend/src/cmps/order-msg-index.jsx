import { useState } from "react"
import { useEffect } from "react"
import { showErrorMsg } from "../services/event-bus.service";
import { orderService } from '../services/order.service.local';
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG } from "../services/socket.service";
import { utilService } from "../services/util.service";
import { updateOrder } from "../store/order.action";

export function OrderMsg({ roomName, currOrder }) {
    const [orderMsgs, setOrderMsgs] = useState(currOrder.msgs)
    const [msg, setMsg] = useState(orderService.getEmptyMsg())


    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setMsg({ ...msg, [field]: value })
    }

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, roomName)
    }, [roomName])

    function addMsg(savedMsg) {
        setOrderMsgs(prevMsgs => [...prevMsgs, savedMsg])
    }

    async function onAddOrderMsg(ev) {
        ev.preventDefault()
        try {
            const savedMsg = await orderService.addOrderMsg(currOrder._id, msg)
            setMsg(orderService.getEmptyMsg())
            socketService.emit(SOCKET_EMIT_SEND_MSG, savedMsg)
            // addMsg(savedMsg)

        } catch (err) {
            showErrorMsg('Could not sent msg')
        }
    }

    return (
        <section className="flex column">
            <section className="msg-list">
                <ul>
                    {currOrder && orderMsgs.map(msg => <li key={utilService.makeId()} className="msg-preview">
                        <h2>{msg.txt}</h2>

                    </li>)}

                </ul>
            </section>

            {currOrder && <div className="">
                <form onSubmit={onAddOrderMsg}>
                    <input type="text" name="txt" title="txt" id="txt" value={msg.txt} placeholder="msg" onChange={handleChange} />
                    <button>save</button>
                </form>
            </div>}
        </section>
    )
}