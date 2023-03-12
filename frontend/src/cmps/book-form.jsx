import '../../node_modules/react-date-range/dist/styles.css';
import '../../node_modules/react-date-range/dist/theme/default.css';

import { differenceInCalendarDays } from 'date-fns';
import { React, useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { useSelector } from 'react-redux';

import { GuestPicker } from '../cmps/guest-picker.jsx';
import { ReserveBtn } from './stay-details/reserve-btn.jsx';
import { updateOrder } from '../store/order.action.js';

export function BookingForm({ stay, getRating }) {
    
    const order = useSelector(storeState => storeState.orderModule.order)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false)
    const [numClicks, setNumClicks] = useState(0)

    //close dropdown & date picker if clicking anywhere on the page
    useEffect(() => {
        const handleClick = (event) => {
            const isButton = event.target.closest('.action-btn')
            if (!isButton) {
                setIsDatePickerOpen(false)
                setIsGuestPickerOpen(false)
            }
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [setIsDatePickerOpen, setIsGuestPickerOpen])

    order.stay = stay
    const stayPrice = priceCalc(stay.price)
    const serviceFee = 100
    const totalPrice = (parseFloat(stayPrice.replace(/,/g, '')) + serviceFee).toLocaleString()


    function handleDateChange(range) {
        const orderToSave = structuredClone(order)
        const { startDate, endDate } = range.range1
        orderToSave.startDate = startDate
        orderToSave.endDate = endDate
        updateOrder(orderToSave)
    }

    function numericDate(date) {
        const formattedDate = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        })
        return formattedDate
    }

    function daysNumCalc() {
        const numberOfDays = differenceInCalendarDays(order.endDate, order.startDate)
        return numberOfDays
    }

    function priceCalc(price) {
        const nights = daysNumCalc()
        const totalPrice = (price * nights)
        const formattedPrice = totalPrice.toLocaleString()
        return formattedPrice
    }

    return <div className="book-form">
        <div className="header">
            <div className="price"> ${stay.price} <span className="night">night</span></div>
            <div className="right-side">
                <div className="rating"><img className="img-star" src={require("../assets/img/icons/star.png")} />
                    <span className="rating-numger">{getRating()}</span>
                </div>
                <span className="seperator">·</span>
                <div className="reviews">{stay.reviews.length} reviews</div>
            </div>
        </div>
        <div className="action-btn" >
            <div className="checkin-out" onClick={() => {
                setIsDatePickerOpen(!isDatePickerOpen)
                setIsGuestPickerOpen(false)
            }}>
                <div className='checkin flex'>CHECK-IN <span className="check-date">{numericDate(order.startDate)}</span></div>
                <div className='checkout flex'>CHECKOUT<span className="check-date">{numericDate(order.endDate)}</span></div>
            </div>
            {isDatePickerOpen && <DateRange
                editableDateInputs={true}
                onChange={(range) => {
                    handleDateChange(range)
                    setNumClicks(numClicks + 1)
                    if (numClicks % 2) setIsDatePickerOpen(false)
                }
                }
                ranges={[{ startDate: order.startDate, endDate: order.endDate }]}
                months={2}
                direction={'horizontal'}
                className='date-range'
            />}
            <div className="guest-picker" onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)
            }>
                <div className="guest-side"><span className="bold">GUESTS</span>
                    <span className="second-row">{parseInt(order.guests.adults) + parseInt(order.guests.children) + parseInt(order.guests.infants) + parseInt(order.guests.pets)} guests
                    </span>
                </div>
                <div className="arrow-side"><img src={require(`../assets/img/icons/arrow-down.png`)} alt="" /></div>
            </div>
            {isGuestPickerOpen && <GuestPicker />}

        </div>
        <ReserveBtn className="reserve" order={order} numericDate={numericDate} stay={stay} totalPrice={totalPrice} />
        <p>You won't be charged yet</p>
        <div className="summary">
            <div className="prices">
                <div className="cash"><span className="left">${stay.price} x {daysNumCalc()} nights</span> <span className="right">${stayPrice}</span></div>
                <div className="cash"><span className="left">Service Fee</span><span className="right">${serviceFee}</span></div>
                <span className="total">Total <span>${totalPrice}</span></span>
            </div>
        </div>
    </div>

}

