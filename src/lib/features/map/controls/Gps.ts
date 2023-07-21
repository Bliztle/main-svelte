import { Circle, Fill, Stroke, Style } from 'ol/style';

import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import type Map from 'ol/Map';
import { Point } from 'ol/geom';
import type { Vector } from 'ol/layer';
import type VectorSource from 'ol/source/Vector';

export const setupGeolocation = (map: Map, layer: Vector<VectorSource>) => {
    const view = map.getView();
    const source = layer.getSource();

    if (!source)
        throw new Error('Geolocation layer must have a source.');

    const geolocation = new Geolocation({
        trackingOptions: {
            enableHighAccuracy: true
        },
        projection: view.getProjection()
    });

    const accuracyFeature = new Feature();
    const positionFeature = new Feature();
    source.addFeatures([accuracyFeature, positionFeature]);

    geolocation.on('change:accuracyGeometry', () => {
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry() ?? undefined); // There are typing inconsistencies between these methods' implementations
    });

    positionFeature.setStyle(
        new Style({
            image: new Circle({
                radius: 6,
                fill: new Fill({
                    color: '#3399CC'
                }),
                stroke: new Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        })
    );

    const updatePosition = () => {
        const coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates && new Point(coordinates));
    };

    geolocation.on('change:position', updatePosition);
    geolocation.setTracking(true);

    return geolocation;
};