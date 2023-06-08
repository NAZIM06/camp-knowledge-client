import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const Banner = () => {
  return (
    <div className="carousel-container">
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={3000}
        transitionTime={500}
        style={{ height: "400px" }}
      >
        <div>
          <img src="https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="Slide 1" />
          <div className='absolute top-1/3 flex flex-col items-start left-20 w-4/6 md:left-1/4 md:w-1/2 text-white'>
            <p className='text-2xl md:text-6xl font-bold mb-3'>New language, new opportunities, new you</p>
            <p className='md:text-xl font-bold'>Learn a language right here with hundreds of free language-learning lessons, games and activities. Join us and have some fun. <br /> Fulfill your soul in this summer camp</p>
            <button className="btn bg-opacity-70 bg-black text-white hover:text-black font-bold mx-auto btn-sm md:btn-md lg:btn-lg mt-3 md:mt-5">Subscribe</button>
          </div>
        </div>
        <div>
          <img src="https://images.pexels.com/photos/14814060/pexels-photo-14814060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Slide 2" />
          {/* Add text content for slide 2 */}
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80" alt="Slide 3" />
          {/* Add text content for slide 3 */}
        </div>
        <div>
          <img src="https://cdn.pixabay.com/photo/2015/08/24/20/13/welcome-905562_1280.png" alt="Slide 4" />
          {/* Add text content for slide 4 */}
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;