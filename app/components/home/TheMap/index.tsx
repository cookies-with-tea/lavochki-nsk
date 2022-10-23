import React, {FC} from 'react';
import {YMaps, Map, ObjectManager, ObjectManagerFeatures, Placemark, Clusterer} from "react-yandex-maps";

const getPointData = (index: any) => {
    return {
        hintContent: "Лавочка <strong>#" + index.id + "</strong>",
        balloonContentBody: `<div class="the-map__balloon-image"><img src=${index.image} alt="123"/></div>`,
        clusterCaption: "placemark <strong>" + index + "</strong>"
    };
};

const getPointOptions = () => {
    return {
        preset: "islands#violetIcon"
    };
};

const mapState = {
    center: [55.00, 82.95],
    zoom: 9,
    behaviors: ["default", "scrollZoom"]
};

const benches = [
    {
        lat: 55.020115,
        lng: 82.939382,
        id: 0,
        image: '',
    },
    {
        lat: 55.019771,
        lng: 82.942968,
        id: 1,
        image: '',
    },
    {
        lat: 55.046036,
        lng: 82.930116,
        id: 1,
        image: '',
    },
]


const TheMap: FC<any> = () => {
    return (
        <div className="mb-52">
            <h2>Расположение лавочек</h2>
            <YMaps>
                <Map
                    defaultState={mapState}
                    width='100%'
                    height={500}
                >

                    <Clusterer
                        options={{
                            preset: "islands#invertedVioletClusterIcons",
                            groupByCoordinates: false,
                            clusterDisableClickZoom: true,
                            clusterHideIconOnBalloonOpen: false,
                            geoObjectHideIconOnBalloonOpen: false
                        }}
                    >
                        {benches?.map((coordinates: any, idx: number) => {
                            return (
                                <Placemark
                                    key={idx}
                                    geometry={[coordinates.lat, coordinates.lng]}
                                    properties={getPointData(coordinates)}
                                    options={getPointOptions()}
                                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                />
                                )
                        })}
                    </Clusterer>
                </Map>
            </YMaps>
        </div>
    );
};

export default TheMap;