import React from "react";
import PropTypes from "prop-types";
import List from "../list";
import './style.css';

function Cart({onClose, onAddItem, onDeleteItem, products, isOpen,totalPrice}) {
  // console.log(`products amount ${JSON.stringify(products)}`)
  return (
    <div className='Cart'>
      <div className="Cart__container">
        <div className='Cart__header'>
        <h2 className="Cart__title">Корзина</h2>
        <button className="Cart__close-btn" onClick={() => onClose()}>Закрыть</button>
        </div>
        <List list={products}
            onAddItem={onAddItem} isOpen={isOpen} onDeleteItem={onDeleteItem}/>
        <div className="Cart__total-price"><p className="Cart__total">Итого</p>{totalPrice} ₽</div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Cart);