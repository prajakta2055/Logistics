import { useEffect, useState } from 'react';
import HomePageNav from './HomePageNav';
import '../css/Review.css'

function Review() {
  const [form, setForm] = useState({
    username: '',
    serviceProviderName: '', // New field for service provider name
    serviceProviderRating: '',
    feedback: '',
    orderID: '',
    dateOfService: '',
    recommendService: false,
  });
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  const handleForm = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
   // e.preventDefault();
    // Check if required fields have values
    
    if (form.username && form.serviceProviderRating && form.dateOfService && form.serviceProviderName) {
      const response = await fetch('http://localhost:8080/demo', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      alert('Review submitted successfully!');
      setForm({
        username: '',
        serviceProviderName: '', // New field for service provider name
        serviceProviderRating: '',
        feedback: '',
        orderID: '',
        dateOfService: '',
        recommendService: false,
      });
      
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const getReviews = async () => {
    const response = await fetch('http://localhost:8080/demo', {
      method: 'GET',
    });
    const data = await response.json();
    setReviews(data);
    // Set showReviews to true when reviews are fetched
    setShowReviews(true);
  };



  return (
    <div className="App">
    
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleForm}
          />
        </div>
        <div>
          <label htmlFor="serviceProviderName">Service Provider Name</label>
          <select
            name="serviceProviderName"
            onChange={handleForm}
          >
            <option value="">Select Service Provider</option>
            <option value="USPS">USPS</option>
            <option value="UPS">UPS</option>
            <option value="FedEx">FedEx</option>
            <option value="DHL">DHL</option>
            <option value="CDL">CDL</option>
          </select>
        </div>
        <div>
          <label htmlFor="serviceProviderRating">Service Provider Rating</label>
          <select
            name="serviceProviderRating"
            onChange={handleForm}
          >
            <option value="">Select Rating</option>
            <option value="1">1 (Poor)</option>
            <option value="2">2 (Fair)</option>
            <option value="3">3 (Average)</option>
            <option value="4">4 (Good)</option>
            <option value="5">5 (Excellent)</option>
          </select>
        </div>
        <div>
          <label htmlFor="feedback">Feedback/Comments</label>
          <textarea
            name="feedback"
            onChange={handleForm}
          ></textarea>
        </div>
        <div>
          <label htmlFor="orderID">Order/Transaction ID</label>
          <input
            type="text"
            name="orderID"
            onChange={handleForm}
          />
        </div>
        <div>
          <label htmlFor="dateOfService">Date of Service</label>
          <input
            type="date"
            name="dateOfService"
            onChange={handleForm}
          />
        </div>
        <div>
          <label htmlFor="recommendService">Recommend Service</label>
          <input
            type="checkbox"
            name="recommendService"
            onChange={handleForm}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      
    </div>
  );
}

export default Review;
