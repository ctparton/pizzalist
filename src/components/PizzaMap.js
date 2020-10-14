import React from "react";
import {Map as LeafletMap, TileLayer, Marker, Popup} from "react-leaflet";


const PizzaMap = ({pizza}) => {

    return (

            <LeafletMap center={[53.80136, -1.54214]} zoom={3}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {pizza.map(pizza =>
                    <Marker position={[pizza.coordinates[0].$numberDecimal, pizza.coordinates[1].$numberDecimal]}>
                        <Popup>
                            {pizza.place}
                        </Popup>
                    </Marker>
                )}

            </LeafletMap>
    )
}

export default PizzaMap