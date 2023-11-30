import React from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";

function Controls({ onOpen, totalPrice, productsQty }) {
  return (
    <div className="Controls">
      <p className="Controls__title">В корзине:</p>
      {productsQty > 0 ? (
        <div className="Controls__info">
          {productsQty}{" "}
          {plural(productsQty, {
            one: "товар",
            few: "товара",
            many: "товаров",
          })}{" "}
           / {totalPrice} ₽
        </div>
      ) : (
        <p className="Controls__info">пусто</p>
      )}
      <button className="Controls__btn" onClick={() => onOpen()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
