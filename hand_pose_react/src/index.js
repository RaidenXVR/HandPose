import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StaticCont from './App';
import DynaCont from './DynaContent';
import CheckPose from './CheckPose';
import reportWebVitals from './reportWebVitals';

const staticCont = ReactDOM.createRoot(document.getElementById('static-content'));
staticCont.render(
  <StaticCont />

);

const dynaCont = ReactDOM.createRoot(document.getElementById('dynamic-content'))
dynaCont.render(
  <DynaCont />
)

const hidden = ReactDOM.createRoot(document.getElementById("hidden-func"))
hidden.render(
  <CheckPose />
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
