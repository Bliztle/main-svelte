import { Circle, Fill, Stroke, Style } from "ol/style";

export const yellowCircle = new Style({
    image: new Circle({
        fill: new Fill({
            color: 'yellow'
        }),
        radius: 20
    })
});

export const positionCircle = new Style({
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
});