import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function CartItem(props) {

  const callbacks = {
    onDelete: () => {
      props.onDelete(props.item.code);
    }
  }
  return (
    <div className='CartItem'>
      <div className='CartItem__code'>{props.item.code}</div>
      <div className='CartItem__title'>{props.item.title}</div>
      <p className="CartItem__price">{props.item.price} руб</p>
      <div className='CartItem__actions'>
        <p className="CartItem__count">{props.item.count} шт </p>
        <button className="CartItem__btn" onClick={()=>callbacks.onDelete(props.item.code)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
};

CartItem.defaultProps = {
  onDelete: () => {
  },
}

export default React.memo(CartItem);

