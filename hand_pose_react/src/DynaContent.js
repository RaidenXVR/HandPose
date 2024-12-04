import React, { useState, useEffect } from 'react';
import items from "./items.json"
import "./index.css";
import { orders, addOrder, decOrder, getAmount, currentCategory, subscribeCat, getCategory } from "./global.js"

function DynaCont() {
    const [itemsData, setItems] = useState(items);
    const [currentPage, setCurrentPage] = useState(0);
    const [curCat, setCurCat] = useState(currentCategory);

    const itemsPerPage = 5;
    useEffect(() => {
        const unsubscribe = subscribeCat((categories) => {
            setCurCat(getCategory());
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    useEffect(() => {
        const filteredItems = items.filter((item) => item.category === curCat);
        setItems(filteredItems);
        setCurrentPage(0); // Reset pagination
        console.log(itemsData);
    }, [curCat]);

    // Calculate the items to display on the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleItems = itemsData.slice(startIndex, endIndex);

    // Functions to navigate through pages
    const nextPage = () => {
        if (currentPage < Math.ceil(itemsData.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='main-content'>
            <div className="details">
                <div className="detail-text">
                    <h1 className='current-name'></h1>
                    <p className="current-price"></p>
                    <p className="current-desc"></p>
                    <p id='item-id' hidden='true'></p>
                </div>
                <div className="confirmation" id='confirm' onClick={() => confirmItem(document.getElementById('item-id').textContent)}>
                    <h3>Konfirmasi</h3>
                    <img id='item-image' src="" alt=""></img>
                    <div className="finger-icon oke-icon"><img src="hand_images/oke.png" alt="Ok"></img></div>

                </div>
            </div>
            <div className="menu">
                <button className="nav-button" id="prev" onClick={() => prevPage()}>&lt;
                    <div className="finger-icon prev-icon">
                        <img src="hand_images/gun-finger.png" alt="next"></img>
                    </div>
                </button>


                <div className="menu-items">
                    {visibleItems.map((item, index) => (

                        <div className="menu-item" id={item.id} key={item.id} onClick={() => item_clicked(item)}>
                            <div className={`finger-icon icon-${(index % 5) + 1}`} hidden='false'>
                                <img src={`hand_images/${(index % 5) + 1}.png`} alt={(index % 5) + 1}></img>
                            </div>
                            <img src={item.image} alt={item.name}></img>
                            <h4>{item.name}</h4>
                            <h5>{`Rp. ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</h5>
                        </div>
                    ))}

                </div>
                <button className="nav-button" id="next" onClick={() => nextPage()}>&gt;
                    <div className="finger-icon next-icon">
                        <img src="hand_images/gun-finger.png" alt="next"></img>
                    </div>
                </button>
            </div>
        </div>

    );
}

function item_clicked(item_meta) {

    const items = document.querySelectorAll(".menu-item")

    items.forEach(item => {
        if (parseInt(item.id) === item_meta.id) {
            item.children[0].classList.toggle('invis');
            item.classList.toggle('scaled');
        }
        else {
            item.children[0].classList.remove('invis');
            item.classList.remove('scaled');
        }
    });

    const item_id = document.getElementById('item-id')
    const item_img = document.getElementById("item-image")
    const item_name = document.getElementsByClassName("current-name")[0]
    const item_price = document.getElementsByClassName("current-price")[0]
    const item_desc = document.getElementsByClassName("current-desc")[0]

    item_id.textContent = item_meta['id']
    item_img.setAttribute('src', item_meta["image"])
    item_name.textContent = item_meta["name"]
    item_price.textContent = `Rp. ${item_meta["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    item_desc.textContent = item_meta["description"]
}

function confirmItem(item_id) {
    if (item_id == "") return;
    addOrder(item_id);
    const to_clone = document.getElementById('item-image');
    const clone_rect = to_clone.getBoundingClientRect();
    const clone = to_clone.cloneNode(true);
    clone.classList.add('clone-bounce');

    clone.style.top = `${clone_rect.top}px`;
    clone.style.left = `${clone_rect.left}px`;
    clone.style.width = `${clone_rect.width}px`;
    clone.style.height = `${clone_rect.height}px`

    document.body.appendChild(clone);

    //remove after 1.5 seconds
    setTimeout(() => {
        document.body.removeChild(clone)
    }, 1500);


}


export default DynaCont;
