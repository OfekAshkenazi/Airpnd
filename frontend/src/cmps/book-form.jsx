import { React, useEffect, useState } from 'react'

import { BasicSelect } from '../cmps/select-dropdown.jsx'
import { ReserveBtn } from '../cmps/reserve-btn.jsx'

import '../../node_modules/react-date-range/dist/styles.css'
import '../../node_modules/react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'


export function BookingForm({ stay }) {
    const [isPickerOpen, setIsPickerOpen] = useState(false)


    const today = new Date()
    const date = today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    })
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])

    return <div className="book-form">
        <div className="header">
            <span className="price"> ${stay.price} <span className="night">night</span></span>
            <span className="reviews">{stay.reviews.length} reviews</span>
        </div>
        <div className="action-btn" >
            <div className="checkin-out" onClick={() => setIsPickerOpen(!isPickerOpen)}>
                <input type="text" id="checkin" name="checkin" readOnly defaultValue={'CHECK-IN' + date} />
                <input type="text" id="checkout" name="checkout" defaultValue={'CHECKOUT'}></input>
            </div>
            {isPickerOpen && <div className="date-range"><DateRange
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                months={2}
                direction={'horizontal'}
            /></div>}
            <BasicSelect />
            <ReserveBtn className="reserve" />
        </div>
        <p>You Won't be charged yet</p>
        <div className="summary">
        <div className="prices">
            <span className="cash">$1,166 x 5 nights <span className="right">$8,066</span></span>
            <span className="cash">Service Fee<span className="right">$1,139</span></span>
            <span className="total">Total <span>$401.32</span></span>
        </div>
        </div>
    </div>
}

