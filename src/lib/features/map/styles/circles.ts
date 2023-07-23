import { Circle, Fill, Style } from "ol/style";

export const yellowCircle = new Style({
    image: new Circle({
        fill: new Fill({
            color: 'yellow'
        }),
        radius: 20
    })
});