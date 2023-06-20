import { Box } from '@mui/material';
import ReactMapGL, {
  Marker,
  NavigationControl,
} from 'react-map-gl';
import { useValue } from '../../../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';

const AddLocation = () => {
  const {
    state: {
      location: { lng, lat },
    //   currentUser,
    },
    dispatch,
  } = useValue();
  return (
    <Box
      sx={{
        height: 400,
        position: 'relative',
      }}
    >
      <ReactMapGL
        // ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_APP_MAP_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 8,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e) =>
            dispatch({
              type: 'UPDATE_LOCATION',
              payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
            })
          }
        />
        <NavigationControl position="bottom-right" />
       
      </ReactMapGL>
    </Box>
  );
};

export default AddLocation;