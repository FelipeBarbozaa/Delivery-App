import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import './style.css';
import getSalesBySellerId from '../../api/getSalesBySellerId';

function SellerOrders() {
  const EIGHT = 8;
  const TEN = 10;
  const [date, setdate] = useState([]);
  const [allSales, setAllSales] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem('id');

  useEffect(() => {
    const getSales = async () => {
      const token = localStorage.getItem('token');
      const sales = await getSalesBySellerId(token, id);
      const newDate = sales.map(({ saleDate }) => {
        const [date1, date2] = saleDate.split('-');
        const date3 = saleDate.slice(EIGHT, TEN);
        return `${date3}/${date2}/${date1}`;
      });
      setdate(newDate);
      return sales;
    };
    getSales().then((response) => setAllSales(response));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectToOrder = (orderId) => {
    navigate(`/seller/orders/${orderId}`);
  };

  return (
    <div className="meus-pedidos-container">
      <Header initialName="Felipe Barboza" />
      <table>
        <thead>
          <tr className="cabecalho-table-container">
            <th>ID</th>
            <th>Status</th>
            <th>Data</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody className="table-principal">
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
export default SellerOrders;
