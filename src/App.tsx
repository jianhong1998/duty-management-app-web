import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import HomePage from './screens/Home.screen';
import LoginPage from './screens/Login.screen';
import Loading from './components/common/loading/Loading';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={<HomePage />}
                />
                <Route
                    path='/login'
                    element={<LoginPage />}
                />
            </Routes>
            <Loading />
            <ToastContainer />
        </>
    );
}

export default App;
