import Leaflet from "leaflet";
import { useMap } from "react-leaflet";

interface Props {
  center: Leaflet.LatLngExpression;
}

const SetMapCenter: React.FC<Props> = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

export default SetMapCenter;
