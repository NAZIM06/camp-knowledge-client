import { Outlet } from 'react-router-dom';
// import Header from '../Pages/Shared/Header';
// import Footer from '../Pages/Shared/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Main = () => {
    return (
        <>
            {/* <Header></Header> */}
            <Outlet></Outlet>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* <Footer /> */}
        </>
    );
};

export default Main;