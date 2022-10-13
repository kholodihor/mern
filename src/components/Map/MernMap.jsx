import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './MernMap.module.scss';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MernMap = () => {
  return (
    <div className={styles.Map}>
      <ReactMapGL
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        initialViewState={{
          longitude: 21.04058,
          latitude: 52.37645,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
      >
        <Marker
          latitude={52.37645}
          longitude={21.04058}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <button
            style={{ width: '30px', height: '30px', fontSize: '30px' }}
            type="button"
          >
            <FaMapMarkerAlt className={styles.icon} />
          </button>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default MernMap;
