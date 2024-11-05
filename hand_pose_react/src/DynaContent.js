import React, { useState, useEffect } from 'react';
import items from "./items.json"
import "./index.css";

function DynaCont() {
    const [itemsData, setItems] = useState(items);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        // Fetch data from JSON file

    }, []);

    // Calculate the items to display on the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleItems = itemsData.slice(startIndex, endIndex);

    // Functions to navigate through pages
    const nextPage = () => {
        if (currentPage < Math.ceil(items.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="carousel-container">
            <button className="carousel-btn left-btn" onClick={prevPage} disabled={currentPage === 0}>
                &lt;
            </button>

            <div className="menu-items">
                {visibleItems.map(item => (
                    <div className="item" key={item.id} onClick={() => item_clicked(item)}>
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                    </div>
                ))}
            </div>

            <button className="carousel-btn right-btn" onClick={nextPage} disabled={currentPage === Math.ceil(items.length / itemsPerPage) - 1}>
                &gt;
            </button>
        </div>
    );
}

function item_clicked(item_meta) {

    const items = document.querySelectorAll(".item")

    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('scaled'));

            item.classList.toggle('scaled')
        });
    });

    const item_img = document.getElementsByClassName("item-image")[0]
    const item_name = document.getElementsByClassName("current-name")[0]
    const item_price = document.getElementsByClassName("current-price")[0]
    const item_desc = document.getElementsByClassName("current-desc")[0]

    item_img.setAttribute('src', item_meta["image"])
    item_name.textContent = item_meta["name"]
    item_price.textContent = item_meta["price"]
    item_desc.textContent = item_meta["description"]

}

export default DynaCont;

function CheckForPose() {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Fetch data initially
        fetchData();

        // Set up polling every 5 seconds
        const interval = setInterval(() => {
            fetchData();
        }, 1500); // Adjust the interval as needed

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);
}