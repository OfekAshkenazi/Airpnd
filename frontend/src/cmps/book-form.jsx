import React from 'react';
import { Formik, Form, Field } from 'formik';

export function BookingForm({ stay}) {
    return <form className="book-form">
        <div className="header">
            <span className="price"> ${stay.price} night</span>
            <span className="reviews">{stay.reviews.length} reviews</span>
        </div>
        <label htmlFor="checkin">Check-In:</label>
        <input type="date" id="checkin" name="checkin"></input>
        <label htmlFor="checkout">Check-Out:</label>
        <input type="date" id="checkout" name="checkout"></input>
        <label htmlFor="guests">Number of Guests:</label>
        <input type="number" id="guests" name="guests" min="1"></input>
        <input type="submit" value="Reserve"></input>
        <p>You Won't be charged yet</p>
        <div className="prices">
            <span className="nights"></span><span className="cash">$395</span>
            <span className="clean"></span><span className="cash">$395</span>
            <span className="service"></span><span className="cash">$395</span>
        </div>
        <div className="total">
            <span>Total</span>
            <span>$100</span>
        </div>
    </form>
}

