import {FC} from 'react';
import {YMaps, Map, Placemark, Clusterer} from "react-yandex-maps";

import {IBenches} from "@/app/interfaces/benches.interfaces";
import {BenchType} from "@/app/types/benches.types";

const getPointData = (bench: BenchType) => {
    return {
        hintContent: "Лавочка <strong>#" + bench.id + "</strong>",
        balloonContentBody: `<div class="the-map__balloon-image"><img src=${bench.images[0]} alt="123"/></div>`,
        clusterCaption: "placemark <strong>" + bench + "</strong>"
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

const TheMap: FC<IBenches> = ({ benches }) => {
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
                        {
                            benches && benches.map((coordinates: any, idx: number) => {
                                return (
                                    <Placemark
                                        key={idx}
                                        geometry={[coordinates.lat, coordinates.lng]}
                                        properties={getPointData(coordinates)}
                                        options={getPointOptions()}
                                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                    />
                                )
                            })
                        }
                    </Clusterer>
                </Map>
            </YMaps>
        </div>
    );
};

export default TheMap;
