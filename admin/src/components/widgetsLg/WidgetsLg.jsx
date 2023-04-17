import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import './widgetsLg.css';
import {format} from "timeago.js"

const WidgetsLg = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  const Button = ({type}) =>{
    return <button className={'widgetLgButton '+type}>{type}</button>
  }
  return (
    <div className='widgetLg'>
      <span className="widgetLgTitle">Latest transactions</span>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order)=> (
        <tr className="widgetLgTr" key={order._id}>
          <td className="widgetLgUser">
             <span className="widgetLgName">{order.userId}</span>
          </td>
          <td className="widgetLgDate">{format(order.createdAt)}</td>
          <td className="widgetLgAmount">{order.amount} bgn</td>
          <td className="widgetLgStatus"><Button type={order.status}/></td>
        </tr>
        ))}
      </table>
    </div>
  )
}

export default WidgetsLg