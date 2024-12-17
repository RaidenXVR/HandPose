import React, { useState, useEffect } from 'react';
import "./index.css";
import { getAmount, subscribe, uiState, setUiState, setCategory, currentCategory } from './global';
import ReactDOM from 'react-dom/client'
import OrdersLayer from './Orders';
// import DynaCont from './DynaContent';


function StaticCont() {
  const [amount, setAmount] = useState(getAmount());
  const categories = ['paket', 'burger', 'ayam', 'cemilan', 'dessert', 'minuman']

  useEffect(() => {
    const unsubscribe = subscribe((orders) => {
      setAmount(getAmount());
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);


  return (
    <div className="container">
      <div id="orders-cont" className='blur-screen hidden'></div>

      <div className="topbar"></div>
      <div className="sidebar">
        <div className="finger-icon up-icon">
          <img src="/hand_images/gun-finger.png" alt="up-finger"></img>
        </div>

        {categories.map((cat) => (
          <div className={`menu-category ${cat === currentCategory ? 'focus' : ''}`} id={cat} onClick={() => setSideCategory(cat)}><img src={`/categories/${cat}.png`} alt="C1"></img></div>
        ))}

        <div className="finger-icon down-icon">
          <img src="/hand_images/gun-finger.png" alt="down-finger"></img>
        </div>
      </div>

      <div id='main'></div>

      <footer className="footer">
        <button className="cancel-button" id='menu-back'>Cancel Order
          <div className="finger-icon cancel-icon">
            <img src="/hand_images/thumb_down.png" alt="yes"></img>
          </div>
        </button>
        <button className="view-order-button" onClick={() => openOrders()}>View Order
          <div className="finger-icon fist-icon">
            <img src="/hand_images/thumb_up.png" alt="orders"></img>
          </div>

          <div className="order-badge" hidden={amount === 0}>
            <p id='orders-num'>{amount}</p>
          </div>
        </button>
      </footer>


    </div>
  );
}


function setSideCategory(category) {
  setCategory(category);
  const items = [...document.getElementsByClassName('menu-category')]
  items.forEach((ele) => {
    ele.classList.remove('focus')
  })
  document.getElementById(category).classList.add('focus');

}


function openOrders() {
  const ordersCont = document.getElementById('orders-cont');
  ordersCont.classList.remove('hidden');
  const order = ReactDOM.createRoot(ordersCont);
  order.render(<OrdersLayer />);
  setUiState('orders');
  if (document.getElementById(0)) {
    document.getElementById(0).classList.add('focus')
  }


}



export default StaticCont;
