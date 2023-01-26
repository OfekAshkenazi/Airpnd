import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { PropagateLoader } from 'react-spinners';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap({ lat, lng }) {

    const [coordinates, setCoordinates] = useState({ lat, lng })
    const zoom = 7          
    if(!coordinates) return <div className="loader"><PropagateLoader color="#ff395c" /></div>
    return (
        <section>
            <div className="google-map" style={{ height: '480px', width: '100%' }}>
                <h1>Where you'll be</h1>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDXaNvMCqlwqiat6a6gL7A0mN-z93Tojdk" }}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={zoom}
                >
                    <AnyReactComponent
                        lat={lat}
                        lng={lng}
                        text="icon placeHolder"
                    />
                </GoogleMapReact>
            </div>
        </section>
    )
}