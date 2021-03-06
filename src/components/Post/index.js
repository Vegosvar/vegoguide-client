import React from 'react';
import Carousel from 'components/Carousel';
import propTypes from './prop-types';
import style from './style.module.scss';

const Post = ({
  address: { city, street, postcode },
  cover,
  images,
  title
}) => {
  const active = images.findIndex(image => image._id === cover._id);
  const carouselImages = images.map(image => ({
    alt: image.title,
    src: image.large
  }));

  return (
    <div className={style.post}>
      <div className={style.cover}>
        <Carousel active={active} images={carouselImages} height="350px" />
      </div>
      <div className={style.details}>
        <h1 className={style.title}>{title}</h1>
        <address className={style.address}>{(street, postcode, city)}</address>
      </div>
    </div>
  );
};

Post.propTypes = propTypes;

export default Post;

export { propTypes };
