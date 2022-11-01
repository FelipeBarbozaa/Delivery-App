import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Header from '../../components/Header';
import postSaleApi from '../../api/postSale';
import postSaleProductApi from '../../api/postSaleProduct';
import removeProduct from '../../images/removeProduct.png';
import './style.css';

function Checkout() {
  const [price, setPrice] = useState(0);
  const [callback, setCallback] = useState(0);
  const [cartProducts, setCartProducts] = useState(null);
  const [address, setAddress] = useState({ address: '', number: 0 });
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const dropdown = [
    'Freddie Mercury',
    'Seu Jorge',
    'Felipe Barboza',
    'Gabriel Machado',
  ];
  const option = (
    dropdown.map((item, index) => (
      <option key={ index }>{ item }</option>
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

  async function handleClickFinalizarPedido() {
    const productsInfo = JSON.parse(localStorage.getItem('cart'));
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');

    const sales = {
      userId,
      sellerId: 2,
      totalPrice: price.toString(),
      deliveryAddress: address.address,
      deliveryNumber: address.number,
      saleDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      status: 'Pendente',
    };

    const { id: saleId } = await postSaleApi(token, sales);

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

  function handleChangeAddress({ target: { name: inputName, value } }) {
    setAddress({ ...address, [inputName]: value });
  }

  useEffect(() => {
    const { address: addres, number } = address;
    if (addres.length > 0 && number.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [address]);

  return (
    (cartProducts === null ? <h1> Opa temos um problema ai </h1>
      : (
        <div className="finalizar-pedido-container">
          <Header initialName="Felipe" />
          <table>
            <thead>
              <tr className="cabecalho-table-container">
                <th>Item</th>
                <th>Descrição</th>
                <th>Quant.</th>
                <th>Valor</th>
                <th>Sub.total</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody className="table-principal">
              {cartProducts.map((item, index) => (
                <tr
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
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    { `R$${item.price.replace('.', ',')}` }
                  </td>
                  <td
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
              <select
                id="entrega"
                data-testid="customer_checkout__select-seller"
                className="input-vendedor-checkout"
              >
                {option}
              </select>
              <br />
              <input
                onChange={ (e) => handleChangeAddress(e) }
                name="address"
                type="text"
                data-testid="customer_checkout__input-address"
                placeholder="Address"
                className="form__field space"
              />
              <br />
              <input
                name="number"
                onChange={ (e) => handleChangeAddress(e) }
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
