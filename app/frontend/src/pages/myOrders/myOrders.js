import React, { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import './style.css';
import getSalesByUserId from '../../api/salesByUserId';

const socket = socketIo('http://localhost:3001/');

function MyOrders() {
  const EIGHT = 8;
  const TEN = 10;
  const [date, setdate] = useState([]);
  const [allSales, setAllSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('join_order_group');
    const getSales = async () => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      const sales = await getSalesByUserId(token, id);
      const newDate = sales.map(({ saleDate }) => {
        const [date1, date2] = saleDate.split('-');
        const date3 = saleDate.slice(EIGHT, TEN);
        return `${date3}/${date2}/${date1}`;
      });
      setdate(newDate);
      return sales;
    };
    getSales().then((response) => setAllSales(response));
  }, []);

  useEffect(() => {
    socket.on('order_updated', (orderId, newStatus) => {
      const newAllSales = allSales.map((order) => {
        if (order.id === parseInt(orderId, 10)) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      setAllSales(newAllSales);
    });
  }, [allSales]);

  const redirectToOrder = (id) => {
    navigate(`/customer/orders/${id}`);
  };

  return (
    <div className="meus-pedidos-container">
      <Header initialName="Felipe Barboza" />
      <br />
      <table>
        <thead>
          <tr className="cabecalho-table-container">
            <th>ID</th>
            <th>Status</th>
            <th>Data</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody id="teste" className="table-principal">
          { allSales.map((sale, index) => (
            <tr onClick={ () => redirectToOrder(sale.id) } key={ index }>
              <td id="space">{ sale.id }</td>
              <td>{ sale.status}</td>
              <td>{ date[index] }</td>
              <td>{ sale.totalPrice.replace('.', ',') }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default MyOrders;
