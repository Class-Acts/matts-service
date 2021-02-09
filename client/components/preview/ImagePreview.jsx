import React from 'react';

import styles from '../../styles/preview/ImagePreview.module.css';

import Zoom from './Zoom.jsx';
import Carousel from './Carousel.jsx';

const ImagePreview = (props) => {
  let current_photos = props.photos.filter(photo => photo.style_id === props.current_style._id);
  console.log(current_photos)
  return (
    <div className={styles.image_preview}>
      <Zoom photo={current_photos[props.c_i]} zoomIn={props.zoomIn} zoomOut={props.zoomOut}/>
      <Carousel photos={current_photos} c_i={props.c_i} clickCarouselImage={props.clickCarouselImage} carouselScrollLeft={props.carouselScrollLeft} carouselScrollRight={props.carouselScrollRight}/>
    </div>
  );
}

export default ImagePreview;