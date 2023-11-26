import React from 'react';
// import data
import { testimonials } from './data';
// import components
import ClientSlider from './ClientSlider';
import { useState } from 'react';
import Review from '../Review';
import axios from 'axios';

const Testimonials = () => {
  // destructure testimonials
  const { title, clients } = testimonials;

  // state for popup
  const [showPopup, setShowPopup] = useState(false);

  // state for feedback
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    image: '',
    borderColor: '',
    message: '',
  });

  // handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeedback((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // handle form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // TODO: handle form submission
    console.log(feedback);
    // reset feedback state
    // close popup
    setShowPopup(false);
  };

  return (
    <section className='section' id='testimonial'>
      <div className='container mx-auto'>
        {/* title */}
        <h2
          className='title mb-10 lg:mb-20 text-center max-w-[920px] mx-auto'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          {title}
        </h2>

        {/* slider */}
        <div data-aos='fade-up' data-aos-delay='400'>
          <ClientSlider clients={clients} />
        </div>

        {/* write review button */}
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10'
          onClick={() => setShowPopup(true)}
        >
          Write Review
        </button>

        {/* popup */}
        {showPopup && (
          <Review/>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
