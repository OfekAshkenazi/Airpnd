import IconBedKing from '../svg-cmps/bed-icon.jsx';
import IconShower from '../svg-cmps/shower-icon.jsx';

export function HostStayPreview({ stay }) {
    return (
        <div className='host-stay align-center'>
            <img src={stay.imgUrls[0]} alt="" />
            <div className='img-desc-container flex'>
                <div className="desc flex column">
                    <h4>{stay.name}</h4>
                    <p>{stay.loc.address}</p>
                </div>
            </div>
            <div className="icons-container flex align-center">
                {stay.bedrooms}
                <IconBedKing />
                {stay.bathrooms}
                <IconShower />
            </div>
            <div>
                <span className='flex money'>
                    <p>
                        $5,175
                    </p>
                    <p className='unbold'>/year</p>
                </span>
            </div>
        </div>
    )
}