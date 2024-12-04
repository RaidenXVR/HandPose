import './index.css';
import ReactDOM from 'react-dom/client';
import StaticCont from './StaticContent';
import DynaCont from './DynaContent';
import { clearItems, setUiState } from './global';

function AmbilResi() {
    setTimeout(() => {
        const staticCont = ReactDOM.createRoot(document.getElementById('root'));
        staticCont.render(<StaticCont />);

        // Wait until 'main' exists in the DOM
        setTimeout(() => {
            const mainElement = document.getElementById('main');
            if (mainElement) {
                const dynaCont = ReactDOM.createRoot(mainElement);
                dynaCont.render(<DynaCont />);
            }
        }, 0);
        clearItems();
        setUiState('main');

    }, 3000)
    return (
        <div className='checkout' >

            <div className='ambil-resi'>
                <h2>Silahkan Ambil Resi dan Dibawa ke Kasir</h2>
            </div>
        </div>)
}

export default AmbilResi;