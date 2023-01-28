import { borderRadius, height } from '@mui/system';
import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import IconHouseHeartFill from './svg-cmps/house-icon';
import IconHouseFill from './svg-cmps/house-icon';

const AnyReactComponent = ({ text }) => <div className="flex column" style={{ width: '50px', alignItems: 'center', fontWeight: 'bold' }}> <p stlye={{ width: '45px' }}>Your stay</p> <p>{text}</p></div>;

export function GoogleMapHostStays() {

    const [coordinates, setCoordinates] = useState({ lat: 40.730610, lng: -73.935242 })
    const zoom = 8
    if (!coordinates) return <div className="loader"><PropagateLoader color="#ff395c" /></div>
    return (
        <div className="google-map-host" >
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDXaNvMCqlwqiat6a6gL7A0mN-z93Tojdk" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    lat={34}
                    lng={-440}
                    text={<IconHouseHeartFill />}
                />
            </GoogleMapReact>
        </div>
    )
}