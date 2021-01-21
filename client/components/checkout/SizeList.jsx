import React from 'react';
import styles from '../../styles/checkout/Size.module.css'

import Size from './Size.jsx';

const SizeList = (props) => {

  let all_sizes = ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
  let available_sizes = props.sizes.filter(size => size.style_id === props.current_style.id).map(size => size.size);

  return (
    <div className={styles.size_container}>
      <span className={styles.size_text}>Size: {props.current_size}</span>
      <div className={styles.size_list}>
        {all_sizes.map(size => {
          if (available_sizes.indexOf(size) !== -1) {
            return (<Size size={size} available={true} clickSize={props.clickSize} current_size={props.current_size}/>)
          } else {
            return (<Size size={size} available={false} current_size={props.current_size}/>)
          }
        })}
      </div>
    </div>
  );
}

export default SizeList;