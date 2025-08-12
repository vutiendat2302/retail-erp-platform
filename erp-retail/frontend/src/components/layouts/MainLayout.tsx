import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';

const MainLayout = () => {

  return (
    <>
      <Navbar />
      <main className="p-4 mt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
