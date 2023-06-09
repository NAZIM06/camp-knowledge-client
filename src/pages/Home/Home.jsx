import React from 'react';
import Banner from './Banner/Banner';
import AboutUs from './AboutUs';

const Home = () => {
    return (
        <div className='py-6'>
          <Banner></Banner>
          <AboutUs></AboutUs>
        </div>
    );
};

export default Home;