import DeckGL, { BitmapLayer, TileLayer } from "deck.gl";
import { div } from "motion/react-client";

const INITIAL_VIEW_STATE = {
  longitude: 135.6917,
  latitude: 35.6895,
  zoom: 6,
  pitch: 60,
  bearing: 0,
};

let layer = [
  new TileLayer({
    id: "TileMapLayer",
    data: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
    maxZoom: 18,
    minZoom: 0,
    renderSubLayers: (props) => {
      const { boundingBox } = props.tile;
      return new BitmapLayer(props, {
        data: undefined,
        image: props.data,
        bounds: [
          boundingBox[0][0],
          boundingBox[0][1],
          boundingBox[1][0],
          boundingBox[1][1],
        ],
      });
    },
  }),
];

export default function Map() {
  return (
    <div>
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller layers={layer} />
    </div>
  );
}
