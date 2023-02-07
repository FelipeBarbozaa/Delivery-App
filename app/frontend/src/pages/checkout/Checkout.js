import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIo from 'socket.io-client';
import moment from 'moment';
import Header from '../../components/Header';
import postSaleApi from '../../api/postSale';
import getSellers from '../../api/getSellers';
import getIdByName from '../../api/getIdByName';
import postSaleProductApi from '../../api/postSaleProduct';
import removeProduct from '../../images/removeProduct.png';
import './style.css';

const socket = socketIo('http://localhost:3001/');

function Checkout() {
  const [price, setPrice] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [callback, setCallback] = useState(0);
  const [cartProducts, setCartProducts] = useState(null);
  const [data, setData] = useState({ seller: '', address: '', number: 0 });
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSellers = async () => {
      const result = await getSellers(token);
      return result;
    };
    fetchSellers().then((response) => setSellers(response));
  }, [token]);

  const option = (
    sellers.map((item, index) => (
      <option key={ index }>{ item.name }</option>
    ))
  );

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    setCartProducts(cart);
    const totalPrice = cart.reduce((sum, e) => {
      const value = e.quantity * e.price;
      return sum + value;
    }, 0);
    setPrice(totalPrice);
  }, [callback]);

  useEffect(() => {
    if (sellers.length > 0) {
      setData({ ...data, seller: sellers[0].name });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellers]);

  async function handleClickFinalizarPedido() {
    const productsInfo = JSON.parse(localStorage.getItem('cart'));
    const userId = localStorage.getItem('id');
    const { id: sellerId } = await getIdByName(token, data.seller);

    const sales = {
      userId,
      sellerId,
      totalPrice: price.toString(),
      deliveryAddress: data.address,
      deliveryNumber: data.number,
      saleDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      status: 'Pendente',
    };
    console.log(sales, '-------------');

    socket.emit('join_room_order', sales.sellerId);
    const { id: saleId } = await postSaleApi(token, sales);
    socket.emit('create_order', { ...sales, id: saleId });

    const createSaleProductsBody = productsInfo.map(({ id, quantity }) => (
      {
        saleId,
        productId: id,
        quantity,
      }
    ));
    await postSaleProductApi(token, createSaleProductsBody);
    navigate(`/customer/orders/${saleId}`, { replace: true });
  }

  function handleClickRemoverItem(index) {
    cartProducts.splice(index, 1);
    setCallback(callback + 1);
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }

  function handleChangeData({ target: { name: inputName, value } }) {
    setData({ ...data, [inputName]: value });
  }

  useEffect(() => {
    const { address, number } = data;
    if (address.length > 0 && number.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [data]);

  return (
    (cartProducts === null ? <h1> Opa temos um problema ai </h1>
      : (
        <div className="finalizar-pedido-container">
          <Header initialName="Felipe" />
          <br />
          <table>
            <thead>
              <tr className="cabecalho-table-container">
                <th>Item</th>
                <th width="50" id="limit">Desc.</th>
                <th>Quant.</th>
                <th>Price</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody className="table-principal">
              {cartProducts.map((item, index) => (
                <tr
                  id="letter"
                  key={ item.name }
                >
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    id="teste4"
                    data-testid={
                      `customer_checkout__element-order-table-name-${index}`
                    }
                  >
                    {item.name}
                  </td>
                  <td
                    className="quantitade-item"
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                  >
                    {item.quantity}
                  </td>
                  <td
                    id="teste5"
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    { `R$${item.price.replace('.', ',')}` }
                  </td>
                  <td
                    id="teste5"
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {
                      `R$${(item.quantity * item.price).toFixed(2)
                        .replace('.', ',')}`
                    }
                  </td>
                  <td>
                    <button
                      type="button"
                      className="button-remove-item"
                      onClick={ () => handleClickRemoverItem(index) }
                      data-testid={
                        `customer_checkout__element-order-table-remove-${index}`
                      }
                    >
                      <img
                        id="remove-product"
                        src={ removeProduct }
                        alt="remove product"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1
            className="preco-total"
          >
            Preço total:
            {' '}
            <span className="green">
              R$
              {' '}
              { price.toFixed(2).toString().replace('.', ',') }
            </span>
          </h1>
          <div className="entrega-pedido-container">
            <br />
            <div className="delivery-info">
              {sellers.length !== 0 ? (
                <select
                  onChange={ (e) => handleChangeData(e) }
                  name="seller"
                  id="entrega"
                  data-testid="customer_checkout__select-seller"
                  className="input-vendedor-checkout"
                >
                  {option}
                </select>
              ) : null }
              <br />
              <input
                onChange={ (e) => handleChangeData(e) }
                name="address"
                type="text"
                data-testid="customer_checkout__input-address"
                placeholder="Address"
                className="form__field space"
              />
              <br />
              <input
                name="number"
                onChange={ (e) => handleChangeData(e) }
                type="number"
                data-testid="customer_checkout__input-addressNumber"
                placeholder="Number"
                className="form__field space"
              />
              <br />
            </div>
            <button
              data-testid="customer_checkout__button-submit-order"
              type="button"
              onClick={ () => handleClickFinalizarPedido() }
              className="btn draw-border"
              disabled={ disabled }
            >
              Finish order
            </button>
          </div>
        </div>
      ))
  );
}
export default Checkout;
