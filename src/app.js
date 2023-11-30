import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const list = store.getState().list;
  const { products, productsQty, totalPrice } = store.getState().cart;

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        console.log(code);
        store.deleteItem(code);
      },
      [store]
    ),
    onAddItem: useCallback(
      (code) => {
        console.log(`onAddItem ${JSON.stringify(code)}`);
        store.addToOrder(code);
      },
      [store]
    ),
    onOpenCard: useCallback(() => {
      setIsCartOpen(true);
    }, [store]),
    onCloseCard: useCallback(() => {
      setIsCartOpen(false);
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        list={list}
        onAdd={callbacks.onAddItem}
        onOpen={callbacks.onOpenCard}
        onClose={callbacks.onCloseCard}
        productsQty={productsQty}
        totalPrice={totalPrice}
      />
      <List
        list={list}
        onDeleteItem={callbacks.onDeleteItem}
        onAddItem={callbacks.onAddItem}
        isOpen={false}
      />
      {isCartOpen ? (
        <Cart
          products={products}
          totalPrice={totalPrice}
          onClose={callbacks.onCloseCard}
          onAddItem={callbacks.onAddItem}
          isOpen={isCartOpen}
          onDeleteItem={callbacks.onDeleteItem}
        ></Cart>
      ) : (
        ""
      )}
    </PageLayout>
  );
}

export default App;
