import React from 'react';
import Banner from './Banner/Banner';
import AboutUs from './AboutUs';
import PopularInstructors from './PopularInstructors/PopularInstructors';
import PopularClasses from './PopularClasses/PopularClasses';

const Home = () => {
  return (
    <div className='py-6'>
      <Banner></Banner>
      <div className='py-20'><PopularInstructors /></div>
      <PopularClasses />
      <AboutUs></AboutUs>
    </div>
  );
};

export default Home;