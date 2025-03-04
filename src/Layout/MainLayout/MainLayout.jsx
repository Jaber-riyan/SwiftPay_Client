import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LocomotiveScroll from 'locomotive-scroll';
import Loading from '../../Pages/Shared/Loading/Loading';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import Footer from '../../Pages/Shared/Footer/Footer';


const MainLayout = () => {
    const location = useLocation();
    const { loading } = useAuth();

    const locomotiveScroll = new LocomotiveScroll();

    // console.log(location);
    // const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register');

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <Helmet><title>Home | Traventure</title></Helmet>
            <header className='fixed w-full top-0 z-20 backdrop-blur-sm bg-black/40'>
                {/* {noHeaderFooter || <Navbar></Navbar>} */}
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
            <footer>
                {/* {noHeaderFooter || <Footer></Footer>} */}
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;