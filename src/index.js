import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom'
import SignIn from "./components/SignIn/SignIn.js";
import 'bootstrap/dist/css/bootstrap.css';
import LoadingScreen from './LoadingScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Index() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <React.StrictMode>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/app" element={<App />} />
            </Routes>
          </Router>
        </>
      )}
    </React.StrictMode>
  );
}

root.render(<Index />);

reportWebVitals();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

