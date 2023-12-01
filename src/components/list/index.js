import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import CartItem from "../cart-item";
import './style.css';

function List({list, onAddItem, onDeleteItem, isOpen}) {
  //console.log(`List ${JSON.stringify(list)}`)
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {
            isOpen? <CartItem item={item} onAdd={onAddItem} onDelete={onDeleteItem} isOpen={isOpen}/>:
            <Item item={item} onAdd={onAddItem} onDelete={onDeleteItem} isOpen={false}/>
          }
        </div>
      )}
    </div>
  )
}
List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {
  },
  onAddItem: () => {
  },
}

export default React.memo(List);
