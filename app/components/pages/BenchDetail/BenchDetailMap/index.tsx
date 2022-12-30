import {FC} from 'react';
import {YMaps, Map, Placemark} from "react-yandex-maps";
import {
    StyledCoords,
    StyledWatchOnTheMap
} from "@/app/components/pages/BenchDetail/BenchDetailMap/DetailedBenchMap.styles";
import {IBench} from "@/app/interfaces/bench.interface";


const getPointData = (bench: IBench) => {
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

const BenchDetailMap: FC<{ bench: IBench }> = ({bench}) => {
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
                        properties={getPointData({...bench})}
                        options={getPointOptions()}
                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    />
                </Map>
            </YMaps>
            <StyledCoords>{bench.lat}, {bench.lng}</StyledCoords>
        </div>
    );
};

export default BenchDetailMap;
