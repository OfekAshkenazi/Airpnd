import { BookingForm } from '../book-form.jsx';
import { Amenities } from './amenities.jsx';

export function StayExpanded({ stay, getRating }) {
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
                <img className="img-host" src={stay.host.pictureUrl} />
            </div>

            <div className="host">
                <img className = "img-activity" style={{ width: '24px', height: '24px' }} src={require("../../assets/svg/stay-details/pet_friendly.png")} alt="" />
                <span className="txt">Furry friends welcome
                    <span className="head-span">Bring your pets along for the stay.</span></span></div>
            <div className="host">
                <img className = "img-activity" style={{ width: '24px', height: '24px' }} src={require("../../assets/svg/stay-details/great_communication.png")} alt="" />
                <span className="txt">Great Communication
                    <span className="head-span">95% of recent guests rated Emin 5-star in communication.</span></span></div>
            <div className="host">
                <img className = "img-activity" style={{ width: '24px', height: '24px' }} src={require("../../assets/svg/stay-details/superhost.png")} alt="" />
                <span className="txt">{firstName} is a Superhost
                    <span className="head-span">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span></span></div>

            <div className="air-cover">
                {/* <span className="head"><span className="air">Air</span>cover</span> */}
                <img className="air" src={require("../../assets/img/aircover.png")} />
                <span className="txt">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</span>
                <span className="more">Learn more</span>
            </div>
            <Amenities stay={stay} />
        </div>
        <BookingForm stay={stay} getRating={getRating} />
    </section>
}