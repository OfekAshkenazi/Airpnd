<<<<<<< HEAD
// import { BookingForm } from '../cmps/book-form.jsx'
=======
import { BookingForm } from '../cmps/book-form.jsx'
>>>>>>> c7c6b14d001a22816d87353c2097888510c66eba

export function StayExpanded({ stay }) {
    const firstName = stay.host.fullname.split(" ")[0]

    return <section className="stay-expanded">
        <div className="expanded-left">
            <div className="capacity">
                <div className="owner">
                    <h2>{stay.type} hosted by {firstName}</h2></div>
                <div className="guests">{stay.capacity} guests
                    <span className="seperator">·</span>
                    2 beds
                    <span className="seperator">·</span>
                    1 bath </div>

                <img src={stay.host.imgUrl} />
            </div>
            <div className="host"><span className="host-name">{firstName} is a Superhost</span>
                <span className="super-host">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>
            </div>
            <div className="air-cover"><span className="air-cover head">Aircover</span>
                <span className="air-cover-txt">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</span>
                <span>Learn more</span>
            </div>
        </div>
<<<<<<< HEAD
        {/* <BookingForm stay={stay} /> */}
=======
        <BookingForm stay={stay} />
>>>>>>> c7c6b14d001a22816d87353c2097888510c66eba

    </section>
}