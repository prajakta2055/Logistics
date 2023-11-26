import React, { useState, useEffect } from "react";

const Form = () => {
  const [formFields, setFormFields] = useState({
    fullName: "",
    email: "",
    number: "",
    address: "",
    message: "",
  });

  const [emptyState, setEmptyState] = useState(true);
  const [delivery, setDelivery] = useState(null);

  const handleChange = (e) => {
    setFormFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const checkEmptyState = Object.keys(formFields).find(
      (field) => formFields[field] === ""
    );

    if (checkEmptyState === true) {
      setEmptyState(true);
    } else {
      setEmptyState(false);
    }
  }, [formFields]);

  const updateDelivery = (deliveryType) => {
    setDelivery(deliveryType);
  };

  return (
    <section className="text-gray-600 body-font section">
      <div className="container px-5 pt-24  mx-auto">
        <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2
            className="title mb-5 lg:mb-10 text-center max-w-[920px] mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Why don't you give us a try
          </h2>
          <p
            className="leading-relaxed text-center mb-3 text-[30px] font-medium"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            We're <em>READY</em> to <em>RUN</em> for <em>YOU!</em>
          </p>
          <div className="container">
            <section id="service-providers justify-center">
              <h2>Service Providers</h2>
              <div className="flex flex-row p-10 gap-30  justify-center">
                <div><img src="usps_r.svg" /></div>
                <div><img src="ups_r.svg" /></div>
                <div><img src="fedex.svg" /></div>
                <div><img src="dhl_r.svg" /></div>
                <div><img src="cdl.svg" /></div>
              </div>
            </section>

            <section id="services-highlights" className="flex gap-30 justify-center">
              <button className={`${delivery === 'Express' ? 'bg-yellow-500 text-white' : 'text-black'} rounded-lg p-4`} onClick={() => updateDelivery('Express')}>
                <div className="service-card">
                  <h2>Express Shipping</h2>
                  <p>Fast and reliable delivery solutions.</p>
                </div>
              </button>
              <button className={`${delivery === 'International' ? 'bg-yellow-500 text-white' : 'text-black'} rounded-lg p-4`} onClick={() => updateDelivery('International')}>
                <div className="service-card">
                  <h2>International Logistics</h2>
                  <p>Efficient global shipping services.</p>
                </div>
              </button>
            </section>
             
            {delivery &&
              <section className="search-and-book flex flex-col justify-center">
                <div className="search-box flex flex-row justify-center p-10">
                  <div>
                    <div className="flex p-5">
                      <label style={{ width: "130px" }}>From:</label>
                      <input type="text" placeholder="From" className="w-full rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="flex p-5">
                      <label style={{width:"-webkit-fill-available"}}>Package Type:</label>
                      <input type="text" placeholder="Package Type" className="w-full rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                  </div>
                  <div>
                    <div className="flex p-5">
                      <label style={{ width: "130px" }}>To:</label>
                      <input type="text" placeholder="To" className="w-full rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="flex p-5">
                      <label style={{width:"-webkit-fill-available"}}>Service Type:</label>
                      <input type="text" placeholder="Service Type" className="w-full rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                  </div>
                  <button className="search-button bg-yellow-500 text-white rounded-md p-2">Search</button>
                </div>
              </section>
            }

          </div>
          {/* <div
            className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 mx-auto"
            style={{maxWidth:"500px"}}
            data-aos="fade-up"
            data-aos-delay="200"
          >
          <h2 className="text-gray-900 text-lg text-[30px] font-medium title-font mb-5">
            Book Now
          </h2>
          <form
            action="https://getform.io/f/7602fbcb-ef2f-46c9-9486-08de1e68b08d"
            method="POST"
            id="formlink"
            required
          >
            <div className="relative mb-4">
              <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">
                Full Name
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                id="full-name"
                name="fullName"
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="number" className="leading-7 text-sm text-gray-600">
                Phone Number
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type="number"
                id="number"
                name="number"
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                Address
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                id="address"
                name="address"
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                Message
              </label>
              <textarea
                onChange={(e) => handleChange(e)}
                cols="30"
                row="20"
                name="message"
                type="text"
                className="w-full h-[128px] bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              disabled={emptyState}
              className="btn btn-sm bg-accent hover:bg-accentHover w-[102px] text-white"
            >
              Submit
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3">Literally Always Ready.</p>
        </div> */}
        </div>
        
      </div>
    </section>
  );
};

export default Form;
