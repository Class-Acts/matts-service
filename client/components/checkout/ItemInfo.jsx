import React from 'react';
import styles from '../../styles/checkout/ItemInfo.module.css';

import Stars from './Stars.jsx';

const ItemInfo = (props) => {

  let avg_rating = 1
  //parseFloat(props.info.avg_rating.slice(0, 1) + '.' + props.info.avg_rating.slice(1, 2)).toFixed(1);

  let min_price = Math.min.apply(Math, props.styles.map((style) => style.price));
  min_price = min_price.toString();
  min_price = parseFloat(min_price.slice(0, min_price.length - 2) + '.' + min_price.slice(min_price.length - 2, min_price.length)).toFixed(2);

  let max_price = Math.max.apply(Math, props.styles.map((style) => style.price));
  max_price = max_price.toString();
  max_price = parseFloat(max_price.slice(0, max_price.length - 2) + '.' + max_price.slice(max_price.length - 2, max_price.length)).toFixed(2);

  let price_string;

  if (min_price === max_price) {
    price_string = '$' + min_price;
  } else {
    price_string = '$' + min_price + ' - $' + max_price;
  }

  return (
    <div>
      <span className={styles.brand}>{props.info.brand}</span>
      <div className={styles.name}>{props.info.name}</div>
      <div>
        <Stars avg_rating={avg_rating}/>
        <span className={styles.avg_rating}>{avg_rating}</span>
        <span className={styles.num_ratings}>({props.info.num_ratings})</span>
        <span className={styles.item_number}>Item #{props.info.id.toString().padStart(6, '0')}</span>
      </div>
      <div className={styles.price}>{price_string}</div>
    </div>
  );
}

export default ItemInfo;