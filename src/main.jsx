import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './components/Theme.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
);

