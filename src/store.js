/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {...initState};
    this.listeners = []; // Слушатели изменений состояния
  }
  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }
  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }
  // Добавление в корзину
  addToOrder(code) {
    const item = this.state.list.find((i) => i.code === code);
    const itemQty = this.state.cart.products.find((i) => i.code === code)?.count || 0;

    // Новый товар
    if (itemQty === 0) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          products: [...this.state.cart.products, {...item, count: itemQty + 1}],
          totalPrice: this.state.cart.totalPrice + item.price,
          productsQty: this.state.cart.productsQty + 1
        }
      });
    } else {
      // Такой товар уже в корзине
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          products: [
            ...this.state.cart.products.filter((item) => item.code !== code),
            {...item, count: itemQty + 1}
          ],
          totalPrice: this.state.cart.totalPrice + item.price
        }
      });
    }
  }

  /**
   * Удаление из корзины
   * @param code
   */
  deleteItem(code) {
    const newArr = this.state.cart.products.filter((item) => item.code !== code);

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        products: [...newArr],
        productsQty: newArr.length,
        totalPrice: newArr.reduce((sum, item) => sum + item.count * item.price, 0),
      }
    });
  }
}

export default Store;
