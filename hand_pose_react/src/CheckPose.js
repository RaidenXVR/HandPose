import React, { useState, useEffect } from "react";
import "./index.css"
import { getCategory, getUiState } from "./global";
import { getNext, getPrevious, indexFocused } from "./Orders";

function CheckPose() {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
            checkDoPose(result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Fetch data initially
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 1300); // Adjust the interval as needed

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hidden-return" hidden="true">

        </div>)
}

function checkDoPose(data) {

    var output = data["output"]
    // TODO: Map Detection and Test it, ffs.
    if (output !== undefined) {
        try {
            switch (output) {
                case "okay":
                    const confirm = document.getElementById('confirm');
                    if (confirm) confirm.click();
                    break;
                case "yes":
                    const yes = document.getElementById('order-checkout');
                    yes.click();

                    break;
                case "no":
                    if (getUiState() === 'menu') {
                        const item = document.getElementById('menu-back');
                        item.click();
                    }
                    else if (getUiState() === 'orders') {
                        const item = document.getElementById('orders-back');
                        item.click();
                    }
                    else if (getUiState() === 'checkout') {
                        const item = document.getElementById('checkout-back');
                        item.click();
                    }
                    else {
                        const item = document.getElementById('take-back');
                        item.click();
                    }
                    break;
                case 1:
                    if (getUiState() === 'menu') {
                        var item = document.getElementsByClassName("menu-item")
                        if (item) item[0].click();
                    } else {
                        var item = document.getElementById("checkout-item")
                        if (item) item[0].click();
                    }
                    break;
                case 2:
                    if (getUiState() === 'menu') {
                        var item = document.getElementsByClassName("menu-item")
                        if (item.length >= 2) item[1].click();
                    } else {
                        var item = document.getElementsByClassName("checkout-item")
                        if (item.length >= 2) item[1].click();
                    }
                    break;
                case 3:
                    var item = document.getElementsByClassName("menu-item")
                    if (item.length >= 3) item[2].click();
                    break;
                case 4:
                    var item = document.getElementsByClassName("menu-item")
                    if (item.length >= 4) item[3].click();
                    break;
                case 5:
                    var item = document.getElementsByClassName("menu-item")
                    if (item.length >= 5) item[4].click();
                    break;
                case "next":
                    if (getUiState() === "menu") {
                        var prev = document.getElementById("next");
                        if (prev) prev.click();
                    }
                    else {
                        var orderCont = document.getElementById("order-items");
                        const focused = orderCont.getElementById(indexFocused)
                        if (focused) {
                            const next = focused.nextElementSibling;
                            prev.click();
                        }
                    }
                    break;
                case "back":
                    if (getUiState() === "menu") {
                        var prev = document.getElementById("prev");
                        console.log(prev);
                        if (prev) prev.click();
                    }
                    else {
                        var orderCont = document.getElementById("order-items");
                        if (orderCont) {
                            const focused = orderCont.getElementById(indexFocused);
                            if (focused) {
                                const prev = focused.previousElementSibling;
                                if (prev) prev.click();
                            }
                        }
                    }
                    break;
                case "up":
                    if (getUiState() === "menu") {
                        const prevItem = document.getElementById(getCategory());
                        if (prevItem) prevItem.previousElementSibling.click();
                    }
                    else {
                        getPrevious();
                    }
                    break;
                case "down":
                    if (getUiState() === "menu") {
                        const nextItem = document.getElementById(getCategory());
                        if (nextItem) nextItem.nextElementSibling.click();
                    }
                    else {
                        getNext();
                    }
                    break;
                case "fist":
                    const viewOrder = document.getElementsByClassName("view-order-button");
                    if (viewOrder) viewOrder[0].click();
                    break;
            }
        } catch (err) {
            console.error(err.message)
        }

    }

}

export default CheckPose