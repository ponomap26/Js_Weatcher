import React, {useEffect, useState} from "react";
import {YMaps, Map, Placemark} from "react-yandex-maps";


const Maps = () => {
    const [userCity, setUserCity] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const {latitude, longitude} = position.coords;
                    const response = await fetch(
                        `"https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=28201f9b-8803-480a-be36-87561f076c7f&geocode=${longitude},${latitude}`
                    );
                    const data = await response.json();
                    const city = data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
                    setUserCity(city);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <div style={{height: "60px", marginTop: "40px"}}>
            <YMaps>
                <Map defaultState={{center: [55.751574, 37.573856], zoom: 10}} width="80%">
                    {userCity && (
                        <Placemark
                            geometry={[55.751574, 37.573856]}
                            options={{draggable: true}}
                            properties={{iconContent: userCity}}
                        />
                    )}
                </Map>
            </YMaps>
        </div>
    );
};

export default Maps;