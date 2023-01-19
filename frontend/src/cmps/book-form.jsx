import React from 'react';
import { Formik, Form, Field } from 'formik';

export function BookingForm({ stay, get }) {
    return <form>
        <div className="header">
           <span> ${stay.price} night</span>
           <span>star</span>
           <span>star</span>
            </div>
        <label htmlFor="checkin">Check-In:</label>
        <input type="date" id="checkin" name="checkin"></input>
        <label htmlFor="checkout">Check-Out:</label>
        <input type="date" id="checkout" name="checkout"></input>
        <label htmlFor="guests">Number of Guests:</label>
        <input type="number" id="guests" name="guests" min="1"></input>
        <input type="submit" value="Reserve"></input>
    </form>
}

