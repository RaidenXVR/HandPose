import React, { useState, useEffect } from "react";
import "./index.css"

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
        }, 800); // Adjust the interval as needed

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hidden-return" hidden="true">

        </div>)
}

function checkDoPose(data) {

    var output = data["output"]
    console.log(output)

    if (output !== undefined) {
        try {
            switch (output) {
                case "okay":
                    break;
                case "yes":
                    break;
                case "no":
                    break;
                case 1:
                    var item = document.getElementsByClassName("item")
                    item[0].click()
                    break;
                case 2:
                    var item = document.getElementsByClassName("item")
                    item[1].click()
                    break;
                case 3:
                    var item = document.getElementsByClassName("item")
                    item[2].click()
                    break;
                case 4:
                    var item = document.getElementsByClassName("item")
                    item[3].click()
                    break;
                case 5:
                    var item = document.getElementsByClassName("item")
                    item[4].click()
                    break;
                case "next":
                    break;
                case "back":
                    break;
            }
        } catch (err) {
            console.error(err.message)
        }

    }

}

export default CheckPose