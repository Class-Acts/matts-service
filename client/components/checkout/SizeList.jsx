import React from 'react';
import styles from '../../styles/checkout/Size.module.css'

import Size from './Size.jsx';

const SizeList = (props) => {

  let all_sizes = ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
  let available_sizes = props.sizes.filter(size => size.style_id === props.current_style._id).map(size => size.size).flat();
  console.log('available', available_sizes)
  console.log('all', all_sizes)

  return (
    <div className={styles.size_container}>
      <div className={styles.size_list_header}>
        <a className={styles.size_text}>Size: {props.current_size}</a>
        <a className={styles.size_chart_link}>Size Chart</a>
      </div>
      <div className={styles.size_list}>
        {all_sizes.map(size => {
          if (available_sizes.indexOf(size) !== -1) {
            return (<Size size={size} available={true} clickSize={props.clickSize} current_size={props.current_size} key={size}/>)
          } else {
            return (<Size size={size} available={false} current_size={props.current_size} key={size}/>)
          }
        })}
      </div>
    </div>
  );
}

export default SizeList;