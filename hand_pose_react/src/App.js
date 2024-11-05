import React, { useState, useEffect } from 'react';
import "./index.css";


function StaticCont() {
  // const [data, setData] = useState(null);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8000/data');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const result = await response.json();
  //     setData(result);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch data initially
  //   fetchData();

  //   // Set up polling every 5 seconds
  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 1500); // Adjust the interval as needed

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="StaticCont">
      <h1>Menu</h1>
      <div className="current-item">
        <div className="item-banner">
          <img src="banner.png" alt="banner" className="image-banner"></img>
          <img src="logo192.png" alt="item image" className="item-image"></img>

        </div>

        <div className="item-text">
          <h2 className="current-name">The Reynaldo Burger</h2>
          <h4 className="current-price">Rp. 25.000</h4>
          <p className='current-desc'>item desc dsdvsdvfv fvvdv dsv ashaskdhas asdasc fasdscdvsdcv vsdvscs cxv xcvxvcv</p>
        </div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search"></input>
      </div>
    </div>
  );
}



export default StaticCont;

