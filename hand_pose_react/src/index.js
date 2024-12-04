import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StaticCont from './StaticContent';
import DynaCont from './DynaContent';
import CheckPose from './CheckPose';
import reportWebVitals from './reportWebVitals';


// Render Static Content
const staticCont = ReactDOM.createRoot(document.getElementById('root'));
staticCont.render(<StaticCont />);

// Wait until 'main' exists in the DOM
setTimeout(() => {
    const mainElement = document.getElementById('main');
    if (mainElement) {
        const dynaCont = ReactDOM.createRoot(mainElement);
        dynaCont.render(<DynaCont />);
    }
}, 0); // Delay allows React to ensure StaticCont is fully rendered

// Render Hidden Functions

const hidden = ReactDOM.createRoot(document.getElementById('hidden-func'));
hidden.render(<CheckPose />);

reportWebVitals();
