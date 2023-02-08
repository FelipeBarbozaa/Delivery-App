/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socketIo from 'socket.io-client';
import Header from '../../components/Header';
import getSaleById from '../../api/saleById';
import getSaleDetails from '../../api/saleDetails';
import './teste.css';
import updateOrderStatus from '../../api/updateOrderStatus';

const socket = socketIo('http://localhost:3001/');

function OrderDetails() {
  const EIGHT = 8;
  const TEN = 10;
  const [disabled, setDisabled] = useState(false);
  const [date, setDate] = useState();
  const [sale, setSale] = useState([]);
  const [cart, setCart] = useState([]);
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
  }, [id, token]);

  useEffect(() => {
    socket.emit('join_room_order_details', id);
  }, [id, sale]);

  useEffect(() => {
    if (sale.status === 'Em Trânsito') {
      setDisabled(true);
    }
    socket.on('status_updated', (newStatus) => {
      setSale({ ...sale, status: newStatus });
    });
    if (sale.length !== 0) {
      const [date1, date2] = sale.saleDate.split('-');
      const date3 = sale.saleDate.slice(EIGHT, TEN);
      setDate(`${date3}/${date2}/${date1}`);
    }
  }, [sale]);

  const updateOrder = async () => {
    await updateOrderStatus(token, id);
    const statusNow = {
      Pendente: 'Preparando',
      Preparando: 'Em Trânsito',
      'Em Trânsito': 'Entregue',
    };

    socket.emit('update_status', id, statusNow[sale.status]);
    socket.emit('update_order', id, statusNow[sale.status]);
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
            </div>
            <br />
            <table className="details-content-table">
              <thead className="thead-order-details">
                <tr>
                  <th>ID</th>
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
                      width="25"
                      data-testid={
                        `customer_order_details__element-order-table-item-number-${index}`
                      }
                    >
                      {index + 1}
                    </td>
                    <td
                      width="150"
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
          { sale.status !== 'Entregue' ? (
            <button
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              onClick={ updateOrder }
              disabled={ !disabled }
              className="btn draw-border"
            >
              Marcar como entregue
            </button>
          ) : null}
        </div>))
  );
}
export default OrderDetails;
