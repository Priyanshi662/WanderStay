import React, { useEffect,useRef,useState} from 'react';
import { useValue } from '../../context/ContextProvider';
import { getRooms } from '../../actions/room';
import ReactMapGL from 'react-map-gl';
import Supercluster from 'supercluster';
import './cluster.css';
import { Avatar, Paper, Tooltip } from '@mui/material';

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const ClusterMap = () => {
  const {state:{rooms},dispatch,mapRef}=useValue();

  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  
  useEffect(() => {
    getRooms(dispatch);
  }, []);

  useEffect(()=>{
    const points=rooms.map(room=>({
      type:'feature',
      properties:{
        cluster:false,
        roomId:room._id,
        price:room.price,
        title:room.title,
        description:room.description,
        lng:room.lng,
        lat:room.lat,
        images:room.images,
        uPhoto:room.uPhoto,
        uName:room.uName
      },
      geometry:{
        type:'Point',
        coordinates:[parseFloat(room.lng),parseFloat(room.lat)]
      }
    }))
    setPoints(points)
  },[rooms])

useEffect(()=>{
  supercluster.load(points)
  // getCluster is a function present in supercluster that gives clusters based on bounds of the map and zoom
  setClusters(supercluster.getClusters(bounds,zoom));
},[points,zoom,bounds])

  useEffect(() => {
    if (mapRef.current) {
      // getbounds give two objects - lat and longitude , flat is used to convert them to the array
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);

  return (
    <>
    <ReactMapGL
      initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
      mapboxAccessToken={import.meta.env.VITE_APP_MAP_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      ref={mapRef}
      onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
      >
        {clusters.map((cluster) => {
          // cluster properties are present in the supercluster
        const { cluster: isCluster, point_count } = cluster.properties;

        const [longitude, latitude] = cluster.geometry.coordinates;

        if (isCluster) {
          return (
            // marker is present in react map-gl , supercluster gives id to every cluster
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
            >
              {/* this is the single cluster */}
              <div
                className="cluster-marker"
                style={{
                  width: `${10 + (point_count / points.length) * 20}px`,
                  height: `${10 + (point_count / points.length) * 20}px`,
                }}
                onClick={() => {
                  const zoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  mapRef.current.flyTo({
                    // fly to location of the cluster
                    center: [longitude, latitude],
                    zoom,
                    speed: 1,
                  });
                }}
              >
                {point_count}
              </div>
            </Marker>
          );
        }
        return (
          <Marker
            key={`room-${cluster.properties.roomId}`}
            longitude={longitude}
            latitude={latitude}
          >
            <Tooltip title={cluster.properties.uName}>
              <Avatar
                src={cluster.properties.uPhoto}
                component={Paper}
                elevation={2}
                onClick={() => setPopupInfo(cluster.properties)}
              />
            </Tooltip>
          </Marker>
        );
      })}
    </ReactMapGL>
    </>
  );
};

export default ClusterMap;