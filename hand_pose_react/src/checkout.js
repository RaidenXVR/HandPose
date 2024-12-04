import './index.css';
import ReactDOM from 'react-dom/client';
import StaticCont from './StaticContent';
import DynaCont from './DynaContent';
import TakeOrHere from './TakeOrHere';
import { setUiState } from './global';

function Checkout() {

    return (
        <div className='checkout' >

            <div className='checkout-item' id='cash' onClick={() => { changeEle() }}>
                <div className="finger-icon card-icon">
                    <img src="hand_images/1.png" alt="card"></img>
                </div>
                <img src='cash.png'></img>
                <h2>Cash</h2>

            </div>
            <div className='checkout-item' id='card' onClick={() => { changeEle() }}>
                <div className="finger-icon card-icon">
                    <img src="hand_images/2.png" alt="card"></img>
                </div>
                <img src='card.png'></img>
                <h2>Card</h2>
            </div>
            <button className='back-button back-to-menu' onClick={() => { backToMenu() }} id='checkout-back'>Back to Menu
                <div className="finger-icon back-to-menu-button">
                    <img src="hand_images/thumb_down.png" alt="yes"></img>
                </div>
            </button>
        </div>)
}


const backToMenu = () => {
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
    setUiState('main')
}

const changeEle = () => {
    const staticCont = ReactDOM.createRoot(document.getElementById('root'));
    staticCont.render(<TakeOrHere />);
    console.log('changeEle called');
    setUiState('take-or-here')
}

export default Checkout;