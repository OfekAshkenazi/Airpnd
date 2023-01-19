import { React, useEffect, useState } from 'react'

import CustomDateRangePickerDay from './MuiDateRangePicker.jsx'


export function BookingForm({ stay }) {
    const [isPickerOpen, setIsPickerOpen] = useState(false)


    const today = new Date()
    const date = today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    })


    return <form className="book-form">
        <div className="header">
            <span className="price"> ${stay.price} night</span>
            <span className="reviews">{stay.reviews.length} reviews</span>
        </div>
        <div className="action-btn" >
            <div className="checkin-out" onClick={() => setIsPickerOpen(!isPickerOpen)}>
                <input type="text" id="checkin" name="checkin"  readOnly defaultValue={'CHECK-IN'+date} />
                <input type="text" id="checkout" name="checkout" defaultValue={'CHECKOUT'}></input>
            </div>
            {isPickerOpen && <CustomDateRangePickerDay range='true'
                numberOfMonths={2} />}
            <input type="number" id="guests" name="guests" min="1"></input>
            <input type="submit" value="Reserve"></input>
        </div>
        <p>You Won't be charged yet</p>
        <div className="prices">
            <span className="nights"></span><span className="cash">₪1,166 x 5 nights</span>
            <span className="clean"></span><span className="cash">Service Fee</span>
        </div>
        <div className="total">
            <span>Total</span>
        </div>
    </form>
}

