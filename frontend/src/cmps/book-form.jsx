import { React, useEffect, useState } from 'react'

import { ReserveBtn } from '../cmps/reserve-btn.jsx'
import { GuestPicker } from '../cmps/guest-picker.jsx'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import { differenceInCalendarDays } from 'date-fns'

import '../../node_modules/react-date-range/dist/styles.css'
import '../../node_modules/react-date-range/dist/theme/default.css'

export function BookingForm({ stay }) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false)
    const [numClicks, setNumClicks] = useState(0)
    const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 })

    const [order, setOrder] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            guests: { infants: 0, pets: 0, adults: 1, children: 0 },
            key: 'selection'
        }
    ])

    const stayPrice = priceCalc(stay.price)
    const serviceFee = 100
    const totalPrice = (parseFloat(stayPrice.replace(/,/g, '')) + serviceFee).toLocaleString()

    function handleGuestChange(newGuests) {
        setOrder(prevOrder => {
            const updatedOrder = { ...prevOrder[0] }
            updatedOrder.guests = { ...updatedOrder.guests, ...newGuests }
            return [updatedOrder]
        })
    }

    function handleDateChange(range) {
        const { startDate, endDate } = range
        setOrder(prevOrder => [{ ...prevOrder[0], startDate, endDate }])
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
        const numberOfDays = differenceInCalendarDays(order[0].endDate, order[0].startDate)
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
            <span className="price"> ${stay.price} <span className="night">night</span></span>
            <span className="reviews">{stay.reviews.length} reviews</span>
        </div>
        <div className="action-btn" >
            <div className="checkin-out" onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
                <div className='checkin flex'>CHECK-IN <span>{numericDate(order[0].startDate)}</span></div>
                <div className='checkout flex'>CHECKOUT<span>{numericDate(order[0].endDate)}</span></div>
            </div>
            {isDatePickerOpen && <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                    setOrder([item.selection])
                    handleDateChange(item.selection)
                    setNumClicks(numClicks + 1)
                    if (numClicks % 2) setIsDatePickerOpen(false)
                }
                }
                ranges={order}
                months={2}
                direction={'horizontal'}
                className='date-range'
            />}
            {/* <BasicSelect className="select-dropdown" handleGuestsChange={handleGuestChange} /> */}
            <div className="guest-picker" onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}>
                <div className="guest-side"><span className="bold">GUESTS</span>
                    <span className="second-row">{guests.adults + guests.children + guests.infants + guests.pets} guests</span></div>
                <div className="arrow-side"><img src={require(`../assets/img/icons/arrow-down.png`)} alt="" /></div>
            </div>
            {isGuestPickerOpen && <GuestPicker guests={guests} setGuests={setGuests} handleGuestChange={handleGuestChange} />}

        </div>
        <ReserveBtn className="reserve" order={order} numericDate={numericDate} stay={stay} />
        <p>You won't be charged yet</p>
        <div className="summary">
            <div className="prices">
                <span className="cash">${stay.price} x {daysNumCalc()} nights <span className="right">${stayPrice}</span></span>
                <span className="cash">Service Fee<span className="right">${serviceFee}</span></span>
                <span className="total">Total <span>${totalPrice}</span></span>
            </div>
        </div>
    </div>
}

