import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {
  const callbacks = {
    onAdd: () => {
      props.onAdd(props.item.code);
    },
    priceConverter(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }
  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <p className="Item-price">{callbacks.priceConverter(props.item.price)} руб</p>
      <div className='Item-actions'>
        <button onClick={()=>props.onAdd(props.item.code)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {
  },
}

export default React.memo(Item);
