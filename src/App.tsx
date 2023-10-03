import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import HomePage from './screens/Home.screen';
import LoginPage from './screens/Login.screen';
import Loading from './components/common/loading/Loading';
import { ToastContainer } from 'react-toastify';
import DashboardTemplate from './components/dashboard/DashboardTemplate';
import NotFoundPage from './screens/NotFound.screen';
import EmployeePage from './screens/Employee.screen';
import AddEmployeePage from './screens/AddEmployee.screen';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={<DashboardTemplate />}
                >
                    <Route
                        index
                        element={<HomePage />}
                    />
                    <Route
                        path='/employee'
                        element={<EmployeePage />}
                    />
                    <Route
                        path='/add-employee'
                        element={<AddEmployeePage />}
                    />
                    <Route
                        path='*'
                        element={<NotFoundPage />}
                    />
                </Route>
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
