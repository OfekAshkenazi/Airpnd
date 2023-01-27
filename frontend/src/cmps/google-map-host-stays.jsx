import { borderRadius, height } from '@mui/system';
import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { PropagateLoader } from 'react-spinners';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMapHostStays() {

    const [coordinates, setCoordinates] = useState({ lat: 34, lng: 36 })
    const zoom = 7
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
                    lng={36}
                    text="icon placeHolder"
                />
            </GoogleMapReact>
        </div>
    )
}