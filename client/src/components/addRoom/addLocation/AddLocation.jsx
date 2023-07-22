import { Box } from '@mui/material';
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import { useValue } from '../../../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import Geocoder from './Geocoder';

const AddLocation = () => {
  const {
    state: {
      location: { lng, lat },
      currentUser,
    },
    dispatch,
  } = useValue();
  const mapRef = useRef();

  // locate the user city by  ip address
  useEffect(() => {
    // const storedLocation = JSON.parse(
    //   localStorage.getItem(currentUser.id)
    // )?.location;
    if (!lng && !lat ){
        // && !storedLocation?.lng && !storedLocation?.lat) {
      fetch('https://ipapi.co/json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            // mapRef.current.flyTo({
            //     center:[data.longitude,data.latitude],
            // })
            dispatch({
                type: 'UPDATE_LOCATION',
                payload: { lng: data.longitude, lat: data.latitude }
            });
        });
    }
  }, []);


//   useEffect(() => {
//     if ((lng || lat) && mapRef.current) {
//       mapRef.current.flyTo({
//         center: [lng, lat],
//       });
//     }
//   }, [lng, lat]);

  return (
    <Box
      sx={{
        height: 400,
        position: 'relative',
      }}
    >
      <ReactMapGL
        ref={mapRef}
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
        {/* navigation control used for easing zooming in and out of the map*/}
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) =>
            {
            dispatch({
              type: 'UPDATE_LOCATION',
              payload: { lng: e.coords.longitude, lat: e.coords.latitude },
            })
            }
          }
        />
         <Geocoder />
      </ReactMapGL>
    </Box>
  );
};

export default AddLocation;