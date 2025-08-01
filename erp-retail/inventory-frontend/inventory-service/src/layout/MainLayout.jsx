import React from 'react'
import Navbar from './Navbar'
import {Outlet} from 'react-router-dom'

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className='p-4 mt-16'>
                <Outlet  />
            </main>
        </>
    );
};

export default MainLayout;