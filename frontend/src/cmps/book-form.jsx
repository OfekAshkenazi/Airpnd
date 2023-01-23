import { React, useEffect, useState } from 'react'

import { BasicSelect } from '../cmps/select-dropdown.jsx'
import { ReserveBtn } from '../cmps/reserve-btn.jsx'

import '../../node_modules/react-date-range/dist/styles.css'
import '../../node_modules/react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'

export function BookingForm({ stay }) {
    const [isPickerOpen, setIsPickerOpen] = useState(false)
    const [numClicks, setNumClicks] = useState(0);

    const today = new Date()
    const date = today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    })
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])
    function onChangeDate() {
        console.log(range)
    }
    return <div className="book-form">
        <div className="header">
            <span className="price"> ${stay.price} <span className="night">night</span></span>
            <span className="reviews">{stay.reviews.length} reviews</span>
        </div>
        <div className="action-btn" >
            <div className="checkin-out" onClick={() => setIsPickerOpen(!isPickerOpen)}>
                <div className='checkin flex'>CHECK-IN <span>{date}</span></div>
                <div className='checkout flex'>CHECKOUT<span>{date}</span></div>
            </div>
            {isPickerOpen && <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                    setRange([item.selection])
                    onChangeDate()
                    setNumClicks(numClicks + 1)
                    if (numClicks % 2) setIsPickerOpen(false)
                }
            }
                // moveRangeOnFirstSelection={false}
                ranges={range}
                months={2}
                direction={'horizontal'}
                className='date-range'
            />}
            <BasicSelect className="select-dropdown" />
        </div>
        <ReserveBtn className="reserve" />
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

