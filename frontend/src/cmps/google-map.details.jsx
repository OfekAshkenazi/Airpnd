import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import IconHouseHeartFill from './svg-cmps/house-icon';
import IconHouseFill from './svg-cmps/house-icon';

const AnyReactComponent = ({ text }) => <div className="flex column" style={{width: '50px', alignItems: 'center', fontWeight: 'bold'}}> <p stlye={{width: '45px'}}>Your stay</p> <p>{text}</p></div>;

export function GoogleMap({ lat, lng }) {

    const [coordinates, setCoordinates] = useState({ lat, lng })
    const zoom = 7
    if (!coordinates) return <div className="loader"><PropagateLoader color="#ff395c" /></div>
    return (
        <section>
            <div className="google-map" style={{ height: '480px', width: '100%' }}>
                <h2>Where you'll be</h2>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDXaNvMCqlwqiat6a6gL7A0mN-z93Tojdk" }}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={zoom}
                >
                    <AnyReactComponent
                        lat={lat}
                        lng={lng}
                        text={<IconHouseHeartFill />}
                    />
                </GoogleMapReact>
            </div>
        </section>
    )
}