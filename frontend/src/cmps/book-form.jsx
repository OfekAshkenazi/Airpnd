import { React, useEffect, useState } from 'react'

import { BasicSelect } from '../cmps/select-dropdown.jsx'
import { ReserveBtn } from '../cmps/reserve-btn.jsx'

import '../../node_modules/react-date-range/dist/styles.css'
import '../../node_modules/react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import { differenceInCalendarDays } from 'date-fns'
import { ContactlessOutlined } from '@mui/icons-material'

export function BookingForm({ stay }) {
    const [isPickerOpen, setIsPickerOpen] = useState(false)
    const [numClicks, setNumClicks] = useState(0);

    const [order, setOrder] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            guests: { infants: 0, pets: 0, adults: 1, children: 0 },
            key: 'selection'
        }
    ])

    function handleGuestsChange(newGuests) {
        const { guests } = order
        setOrder({ ...order, guests: { ...guests, ...newGuests } })
    }

    function onChangeDate(range) {
        let { startDate, endDate } = range
        const numOfDays = differenceInCalendarDays(endDate, startDate)
        const newRange = { ...range, endDate: addDays(startDate, numOfDays) }
        setOrder([newRange])
        // console.log(newRange)
        // setOrder([{...order[0], ...newRange}])
        // console.log(order)
    }

    function numericDate(date) {
        const formattedDate = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        })
        return formattedDate
    }

    return <div className="book-form">
        <div className="header">
            <span className="price"> ${stay.price} <span className="night">night</span></span>
            <span className="reviews">{stay.reviews.length} reviews</span>
        </div>
        <div className="action-btn" >
            <div className="checkin-out" onClick={() => setIsPickerOpen(!isPickerOpen)}>
                <div className='checkin flex'>CHECK-IN <span>{numericDate(order[0].startDate)}</span></div>
                <div className='checkout flex'>CHECKOUT<span>{numericDate(order[0].endDate)}</span></div>
            </div>
            {isPickerOpen && <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                    setOrder([item.selection])
                    onChangeDate(item.selection)
                    setNumClicks(numClicks + 1)
                    if (numClicks % 2) setIsPickerOpen(false)
                }
                }
                ranges={order}
                months={2}
                direction={'horizontal'}
                className='date-range'
            />}
            <BasicSelect className="select-dropdown" handleGuestsChange={handleGuestsChange} />
        </div>
        <ReserveBtn className="reserve" order={order} numericDate={numericDate} stay={stay} />
        <p>You won't be charged yet</p>
        <div className="summary">
            <div className="prices">
                <span className="cash">$1,166 x 5 nights <span className="right">$8,066</span></span>
                <span className="cash">Service Fee<span className="right">$1,139</span></span>
                <span className="total">Total <span>$401.32</span></span>
            </div>
        </div>
    </div>
}

