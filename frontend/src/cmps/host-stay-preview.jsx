import IconBedKing from './svg-cmps/bed-icon.jsx';
import IconShower from './svg-cmps/shower-icon.jsx';

export function HostStayPreview({ stay }) {
    return (
        <div className='host-stay align-center'>
            <div className='img-desc-container flex'>
                <img src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436917/mqkfjmfpmyqpqmzmqgau.jpg" alt="" />
                <div className="desc flex column">
                    <h4>{stay.name}</h4>
                    <p>{stay.loc.address}</p>
                </div>
            </div>
            <div className="icons-container flex align-center">
                <div className="flex align-center">
                    {stay.bedrooms}
                    <IconBedKing />
                </div>
                <div className="flex align-center">
                    {stay.bathrooms}
                    <IconShower />
                </div>
            </div>
            <div>
                <span className='flex'>
                    <p>
                        $5,175
                    </p>
                    <p>/year</p>
                </span>
            </div>
        </div>
    )
}