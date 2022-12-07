import React from 'react';
import {YMaps, Map, Placemark} from "react-yandex-maps";
import {
    StyledCoords,
    StyledWatchOnTheMap
} from "@/app/components/pages/DetailedBench/DetailedBenchMap/DetailedBenchMap.styles";
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

const DetailedBenchMap = () => {
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
                        geometry={[55.025170, 82.929700]}
                        properties={getPointData(1)}
                        options={getPointOptions()}
                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    />
                </Map>
            </YMaps>
            <StyledCoords>55.025170, 82.929700</StyledCoords>
        </div>
    );
};

export default DetailedBenchMap;
