import './index.css';
import ReactDOM from 'react-dom/client';
import StaticCont from './StaticContent';
import DynaCont from './DynaContent';
import AmbilResi from './AmbilResi';
import { setUiState } from './global';

function TakeOrHere() {

    return (
        <div className='checkout' onClick={() => { changeEle() }}>

            <div className='checkout-item'>
                <div className="finger-icon card-icon">
                    <img src="/hand_images/1.png" alt="card"></img>
                </div>
                <img src='dine-in.png'></img>
                <h2>Dine In</h2>

            </div>
            <div className='checkout-item' onClick={() => { changeEle() }}>
                <div className="finger-icon card-icon">
                    <img src="/hand_images/2.png" alt="card"></img>
                </div>
                <img src='take-away.png'></img>
                <h2>Take Away</h2>
            </div>
            <button className='back-button back-to-menu' onClick={() => { backToMenu() }} id='take-back'>Back to Menu
                <div className="finger-icon back-to-menu-button">
                    <img src="/hand_images/thumb_down.png" alt="no"></img>
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
    setUiState('menu')
}

const changeEle = () => {
    const staticCont = ReactDOM.createRoot(document.getElementById('root'));
    staticCont.render(<AmbilResi />);
    

}

export default TakeOrHere;