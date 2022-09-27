import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components'
import {YMaps, Map, ObjectManager, ObjectManagerFeatures, Placemark, Clusterer} from "react-yandex-maps";

const StyledMap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;

  .the-map {
    &__title {
      margin-bottom: 24px;
      text-align: center;
    }
    
    &__balloon {
      &-image {
        width: 80px;
      }
    }
  }
`

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

const points = [
    [
        55.831903,
        37.411961
    ],
    [
        55.763338,
        37.565466
    ],
    [
        55.763338,
        37.565466
    ],
    [
        55.744522,
        37.616378
    ],
    [
        55.780898,
        37.642889
    ],
    [
        55.793559,
        37.435983
    ],
    [
        55.800584,
        37.675638
    ],
    [
        55.716733,
        37.589988
    ],
    [
        55.775724,
        37.560840
    ],
    [
        55.822144,
        37.433781
    ],
    [
        55.874170,
        37.669838
    ],
    [
        55.716770,
        37.482338
    ],
    [
        55.780850,
        37.750210
    ],
    [
        55.810906,
        37.654142
    ],
    [
        55.865386,
        37.713329
    ],
    [
        55.847121,
        37.525797
    ],
    [
        55.778655,
        37.710743
    ],
    [
        55.623415,
        37.717934
    ],
    [
        55.863193,
        37.737000
    ],
    [
        55.866770,
        37.760113
    ],
    [
        55.698261,
        37.730838
    ],
    [
        55.633800,
        37.564769
    ],
    [
        55.639996,
        37.539400
    ],
    [
        55.690230,
        37.405853
    ],
    [
        55.775970,
        37.512900
    ],
    [
        55.775777,
        37.442180
    ],
    [
        55.811814,
        37.440448
    ],
    [
        55.751841,
        37.404853
    ],
    [
        55.627303,
        37.728976
    ],
    [
        55.816515,
        37.597163
    ],
    [
        55.664352,
        37.689397
    ],
    [
        55.679195,
        37.600961
    ],
    [
        55.673873,
        37.658425
    ],
    [
        55.681006,
        37.605126
    ],
    [
        55.876327,
        37.431744
    ],
    [
        55.843363,
        37.778445
    ],
    [
        55.875445,
        37.549348
    ],
    [
        55.662903,
        37.702087
    ],
    [
        55.746099,
        37.434113
    ],
    [
        55.838660,
        37.712326
    ],
    [
        55.774838,
        37.415725
    ],
    [
        55.871539,
        37.630223
    ],
    [
        55.657037,
        37.571271
    ],
    [
        55.691046,
        37.711026
    ],
    [
        55.803972,
        37.659610
    ],
    [
        55.616448,
        37.452759
    ],
    [
        55.781329,
        37.442781
    ],
    [
        55.844708,
        37.748870
    ],
    [
        55.723123,
        37.406067
    ],
    [
        55.858585,
        37.484980
    ]
]

const mapState = {
    center: [55.00, 82.95],
    zoom: 9,
    behaviors: ["default", "scrollZoom"]
};

const TheMap: FC<any> = ({ benches }) => {
    return (
        <StyledMap>
            <div className="the-map__title text-title">Расположение лавочек</div>
            <YMaps>
                <Map
                    defaultState={mapState}
                    width={950}
                    height={500}
                >
                    <Placemark geometry={[55.00, 82.95]} />

                    <Clusterer
                        options={{
                            preset: "islands#invertedVioletClusterIcons",
                            groupByCoordinates: false,
                            clusterDisableClickZoom: true,
                            clusterHideIconOnBalloonOpen: false,
                            geoObjectHideIconOnBalloonOpen: false
                        }}
                    >
                        {benches?.map((coordinates: any, idx: number) => (
                            <Placemark
                                key={idx}
                                geometry={[coordinates.lat, coordinates.lng]}
                                properties={getPointData(coordinates)}
                                options={getPointOptions()}
                                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                            />
                        ))}
                    </Clusterer>
                </Map>
            </YMaps>
        </StyledMap>
    );
};

export default TheMap;
