import React, { useState, useEffect } from 'react';
import "./index.css";
import { addOrder, decOrder, getAmountByID, getItems, getTotalPrice, setUiState, subscribe } from './global';
import Checkout from './checkout';
import ReactDOM from 'react-dom/client';

export var indexFocused = 0;

function OrdersLayer() {
    const [items, setItems] = useState(getItems);
    const [totalPrice, setTotal] = useState(getTotalPrice);
    // const [itemAmount, setItemAmount] = useState(getAmountByID)


    useEffect(() => {
        const unsubscribe = subscribe((orders) => {
            setItems(getItems);
            setTotal(getTotalPrice);
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    const toPage2 = () => {
        const staticCont = ReactDOM.createRoot(document.getElementById('root'));
        staticCont.render(<Checkout />);
        setUiState('checkout');


    }

    return (<div className='orders' id='orders'>
        <div className="finger-icon up2-icon">
            <img src="/hand_images/gun-finger.png" alt="up"></img>
        </div>
        <div className='order-items' id='order-items'>
            {items.map((item, index) => (
                <div className={`order-item ${index === 0 ? 'focus' : ''}`} id={index} key={index} onClick={() => setFocus(index)} >
                    <img src={item.image} alt={item.name}></img>
                    <div>
                        <h4>{item.name}</h4>
                        <h5>{`Rp. ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</h5>
                    </div>
                    <div className='add-red-buttons'>
                        <div className="finger-icon less-icon">
                            <img src="/hand_images/gun-finger.png" alt="less"></img>
                        </div>
                        <button className='nav-button more-less-button' onClick={() => reduceAmount(item.id, index)} id='add-amount-button'>-</button>
                        <div className='order-amount'>
                            <p id={`item-amount-${item.id}`}>{item.amount}</p>
                        </div>
                        <button className='nav-button more-less-button' onClick={() => addAmount(item.id, index)}>+</button>
                        <div className="finger-icon more-icon">
                            <img src="/hand_images/gun-finger.png" alt="less"></img>
                        </div>

                    </div>

                </div>
            ))
            }
        </div>
        <div className="finger-icon down2-icon">
            <img src="/hand_images/gun-finger.png" alt="down"></img>
        </div>
        <div className='total'>
            <h3 id='total-price'>{`Total: Rp. ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</h3>
        </div>
        <div className='order-buttons'>
            <button className="back-button" onClick={() => closeOrders()} id='orders-back'>Back To Menu
                <div className="finger-icon cancel2-icon">
                    <img src="/hand_images/thumb_down.png" alt="back"></img>
                </div>
            </button>
            <button className="checkout-button" onClick={toPage2} id='order-checkout'>Checkout
                <div className="finger-icon checkout-icon">
                    <img src="/hand_images/thumb_up.png" alt="checkout"></img>
                </div>
            </button>
        </div>
    </div>)
}

function closeOrders() {
    const orders = document.getElementById('orders');

    const container = document.getElementById('orders-cont');
    container.removeChild(orders);
    container.classList.add('hidden');
    setUiState('menu');
    indexFocused = 0;
}

function addAmount(item_id, index) {

    addOrder(item_id);
    const itemAmount = document.getElementById(`item-amount-${item_id}`);
    const totalPriceEle = document.getElementById('total-price');
    setFocus(index)
    itemAmount.textContent = getAmountByID(item_id);
    totalPriceEle.textContent = `Total: Rp. ${getTotalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

}

function reduceAmount(item_id, index) {
    decOrder(item_id);

    const itemAmount = document.getElementById(`item-amount-${item_id}`);
    const totalPriceEle = document.getElementById('total-price');
    setFocus(index)
    const amount = getAmountByID(item_id);
    itemAmount.textContent = amount;
    if (amount === 0) {
        if (!getNext()) getPrevious();
    }
    totalPriceEle.textContent = `Total: Rp. ${getTotalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
}

function setFocus(index) {
    const orderItem = document.getElementById(index);
    [...orderItem.parentElement.children].forEach(((child) => { child.classList.remove('focus') }))
    orderItem.classList.add('focus');
    orderItem.scrollIntoView();
    indexFocused = index;
}

export function getNext() {
    const current = document.getElementById(indexFocused) || document.getElementById(0);
    if (!current) return;
    const nextSibling = current.nextElementSibling
    if (nextSibling) {
        nextSibling.classList.add('focus');
        indexFocused = parseInt(nextSibling.getAttribute('id'));
        return true;
    };
    return false;
}

export function getPrevious() {
    const current = document.getElementById(indexFocused) || document.getElementById(0);
    if (!current) return;
    const previousSibling = current.previousElementSibling
    if (previousSibling) {
        previousSibling.classList.add('focus');
        indexFocused = parseInt(previousSibling.getAttribute('id'));
        return true;
    };
    return false;
}

export default OrdersLayer;