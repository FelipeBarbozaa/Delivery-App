/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import getSaleById from '../../api/saleById';
import getSaleDetails from '../../api/saleDetails';
import updateOrderStatus from '../../api/updateOrderStatus';
import './teste.css';

function SellerOrderDetails() {
  const EIGHT = 8;
  const TEN = 10;
  const [date, setDate] = useState();
  const [sale, setSale] = useState([]);
  const [cart, setCart] = useState([]);
  const [callback, setCallback] = useState(0);
  const dataTest = 'customer_order_details__element-order-';
  const { id } = useParams();

  const token = localStorage.getItem('token');
  useEffect(() => {
    const getSale = async () => {
      const saleInfo = await getSaleById(token, id);
      return saleInfo;
    };
    getSale().then((response) => setSale(response));

    const formater = (data) => {
      const newData = {
        name: data.product.name,
        quantity: data.quantity,
        price: data.product.price,
      };
      return newData;
    };

    const saleDetails = async () => {
      const result = await getSaleDetails(token, id);
      const data = result.map((e) => formater(e));
      setCart(data);
    };
    saleDetails();
  }, [id, token, callback]);

  useEffect(() => {
    if (sale.length !== 0) {
      const [date1, date2] = sale.saleDate.split('-');
      const date3 = sale.saleDate.slice(EIGHT, TEN);
      setDate(`${date3}/${date2}/${date1}`);
    }
  }, [sale]);

  const updateOrder = async () => {
    const result = await updateOrderStatus(token, id);
    console.log(result);
    setCallback(callback + 1);
  };

  return (
    (sale.length === 0 ? <h1>Nenhum pedido encontrado</h1>
      : (
        <div className="details">
          <Header initialName="Felipe" />
          <div className="order-details">
            <div>
              <div>
                <h4
                  data-testid={ `${dataTest}details-label-order-id` }
                >
                  { `ID: ${id}` }
                </h4>
                <h4
                  data-testid={ `${dataTest}details-label-delivery-status` }
                  className="order-status"
                >
                  { `Status: ${sale.status}` }
                  {/* disabled ? Entregue : pendente */}
                </h4>
              </div>
              <h4>
                { `Vendedor: ${sale.seller.name}`}
              </h4>
              <h4>
                { `Data do pedido: ${date}`}
              </h4>
              <h1
                className="preco-total"
              >
                Preço total:
                {' '}
                <span className="green">
                  R$
                  {' '}
                  { sale.totalPrice }
                </span>
              </h1>
              <br />
            </div>
            <table className="details-content-table">
              <thead className="thead-order-details">
                <tr>
                  <th>Item</th>
                  <th>Desc.</th>
                  <th>Quant.</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr
                    key={ item.name }
                  >
                    <td
                      width="50"
                      data-testid={
                        `customer_order_details__element-order-table-item-number-${index}`
                      }
                    >
                      {index + 1}
                    </td>
                    <td
                      width="140"
                      data-testid={
                        `customer_order_details__element-order-table-name-${index}`
                      }
                    >
                      {item.name}
                    </td>
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-quantity-${index}`
                      }
                    >
                      {item.quantity}
                    </td>
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-unit-price-${index}`
                      }
                    >
                      { `R$${item.price}`}
                    </td>
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-sub-total-${index}`
                      }
                    >
                      { (item.quantity * item.price).toFixed(2) }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          { sale.status === 'Pendente' ? (
            <button
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              className="btn draw-border"
              onClick={ updateOrder }
            >
              Preparar pedido
            </button>
          ) : null }
          { sale.status === 'Preparando' ? (
            <button
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              className="btn draw-border"
              onClick={ updateOrder }
            >
              Saiu para entrega
            </button>
          ) : null }
          { sale.status === 'Entregue' ? (
            <p>O pedido foi entregue e confirmado pelo cliente!</p>
          ) : null }
        </div>))
  );
}
export default SellerOrderDetails;
