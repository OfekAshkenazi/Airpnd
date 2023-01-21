import { height } from '@mui/system';
import { BookingForm } from '../cmps/book-form.jsx';

export function StayExpanded({ stay }) {
    const firstName = stay.host.fullname.split(" ")[0]

    return <section className="stay-expanded">
        <div className="expanded-left">
            <div className="capacity">
                <div className="owner">
                    <h2>{stay.type} hosted by {firstName}</h2>
                </div>
                <div className="guests">{stay.capacity} guests
                    <span className="seperator">·</span>
                    2 beds
                    <span className="seperator">·</span>
                    1 bath </div>

                <img src={stay.host.imgUrl} />
            </div>
            <div className="host">
                <span className="head"><img style={{ width: '20px', height:'20px'}} src={require("../assets/svg/stay-details/pet_friendly.png")} alt="" />Furry friends welcome</span>
                <span className="head-span">Bring your pets along for the stay.</span>
                <span className="head"><img style={{ width: '20px', height:'20px'}} src={require("../assets/svg/stay-details/great_communication.png")} alt="" />Great Communication</span>
                <span className="head-span">95% of recent guests rated Emin 5-star in communication.</span>
                <span className="head"><img style={{ width: '20px', height:'20px'}} src={require("../assets/svg/stay-details/superhost.png")} alt="" />{firstName} is a Superhost</span>
                <span className="head-span">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>
            </div>

            <div className="air-cover"><span className="air-cover head">Aircover</span>
                <span className="air-cover-txt">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</span>
                <span>Learn more</span>
            </div>
        </div>
        <BookingForm stay={stay} />

    </section>
}