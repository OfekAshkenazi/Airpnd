import GoogleMapReact from 'google-map-react';
import { useState } from 'react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap({ lat, lng }) {

    const [coordinates, setCoordinates] = useState({ lat, lng })
    const zoom = 5

    return (
        <section>
            <div className="google-map" style={{ height: '480px', width: '100%' }}>
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