import React, {FC} from 'react';
import {YMaps, Map, Placemark} from "react-yandex-maps";
import {
    StyledCoords,
    StyledWatchOnTheMap
} from "@/app/components/pages/DetailedBench/DetailedBenchMap/DetailedBenchMap.styles";
import {IBench} from "@/app/interfaces/benches.interfaces";
const getPointData = (bench: IBench) => {
    return {
        hintContent: "Лавочка <strong>#" + bench.bench.id + "</strong>",
        balloonContentBody: `<div class="the-map__balloon-image"><img src=${bench.bench.images[0]} alt="123"/></div>`,
        clusterCaption: "placemark <strong>" + bench.bench + "</strong>"
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

const DetailedBenchMap: FC<IBench> = ({bench}) => {
    return (
        <div className={"mb-40"}>
            <StyledWatchOnTheMap>Смотреть на карте</StyledWatchOnTheMap>
            <YMaps>
                <Map
                    defaultState={mapState}
                    width='100%'
                    height={400}
                >
                    <Placemark
                        geometry={[bench.lat, bench.lng]}
                        properties={getPointData({bench})}
                        options={getPointOptions()}
                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    />
                </Map>
            </YMaps>
            <StyledCoords>{bench.lat}, {bench.lng}</StyledCoords>
        </div>
    );
};

export default DetailedBenchMap;
