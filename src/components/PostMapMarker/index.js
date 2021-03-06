import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'components/Image';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import propTypes from './prop-types';
import iconUrl from './images/marker-icon.png';
import iconRetinaUrl from './images/marker-icon-2x.png';
import shadowUrl from './images/marker-shadow.png';

const icon = new Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  shadowSize: [41, 41],
  shadowAnchor: [12, 20]
});

const PostMapMarker = ({ address, cover, title, url }) => {
  const { location = {} } = address;
  const { coordinates = [] } =  location;

  return (
    <Marker position={[coordinates[1], coordinates[0]]} icon={icon}>
      <Popup minWidth={200}>
        <Link to={url}>
          <Image
            src={cover.thumbnail}
            alt={title}
            height="100px"
            width="100%"
          />
          {title}
        </Link>
      </Popup>
    </Marker>
  );
};

PostMapMarker.propTypes = propTypes;

export default PostMapMarker;
