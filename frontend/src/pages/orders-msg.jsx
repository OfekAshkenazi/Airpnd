import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { OrderMsg } from "../cmps/order-msg-index"
import { showErrorMsg } from "../services/event-bus.service"
import { loadOrders } from "../store/order.action"
import { saveOrder } from "../store/order.action"

export function OrdersMsg() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const user = useSelector(storeState => storeState.userModule.user)
    const [roomName, setRoomName] = useState(null)
    const [currOrder, setCurrOrder] = useState(null)
    

    useEffect(() => {
        onLoadOrders()
    }, [])

    async function onLoadOrders() {
        try {
            await loadOrders()
        } catch (err) {
            showErrorMsg('Cannot load orders')
        }
    }

    async function setInfoForMsgs(order) {

        const orderToSave = structuredClone(order)
        orderToSave.msgs.forEach(msg => {
            msg.msgRead = true
        })

        try {
            const savedOrder = await saveOrder(orderToSave)
            setCurrOrder(prevOrder => order)
            setRoomName(prevRoomName => order._id)
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot read msgs')
        }
    }

    function closeCurrChat(ev) {
        ev.stopPropagation()
        setCurrOrder(prevOrder => null)
        setRoomName(prevRoomName => null)
    }

    function setRightOrderName(order) {
        const OrderRightName = user.fullname === order.byUser.fullname ? 'Host' : order.byUser.fullname
        return OrderRightName
    }

    function setRightImgForOrder(order) {
        const OrderRightImg = user.fullname === order.byUser.fullname ? order.stay.imgUrls[0] : order.byUser.imgUrl
        return OrderRightImg
    }

    return (
        <section className="orders-msg flex">

            <section className="msg-container flex column" onClick={(ev) => closeCurrChat(ev)}>

                {orders.toReversed().map(order => <div
                    className="order-con flex"
                    key={order._id}
                    onClick={() => setInfoForMsgs(order)}
                >
                    <img src={setRightImgForOrder(order)} alt="" />
                    <p>{setRightOrderName(order)}</p>
                </div>)}


            </section>


            {currOrder && <OrderMsg roomName={roomName} currOrder={currOrder} closeCurrChat={(ev) => closeCurrChat(ev)} />}


        </section>
    )
}