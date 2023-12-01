import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, theme } from '@chakra-ui/react';
import { UserProvider } from './components/userContext';
import Profile from "./components/account/Profile";
import Billing from "./components/account/Billing";
import ReportWebVitals from "./components/ReportWebVitals";
import LoginSignUp from './components/LoginSignUp';
import Homepage from './components/Homepage';
import LabelAndPack from "./components/shipping/LabelAndPack";
import Packages from "./components/shipping/Packages";
import Rates from "./components/shipping/Rates";
import Tracking from "./components/shipping/Tracking";
import Carriers from "./components/shipping/Carriers";
import CompanyInfo from "./components/business/CompanyInfo";
import Stores from "./components/business/Stores";
import SenderAddresses from "./components/business/SenderAddresses";
import Plan from "./components/account/Plan";
import Orders from "./components/Orders";
import Shipments from "./components/Shipments";
import Signup from "./components/Signup";
import Review from "./components/Review";
import Chatgpt from "./components/Chatgpt";
import Form from "./components/home/Form";
import NewOrder from "./components/NewOrder"
import Confirmation from "./components/Confirmation";
import Manager from "./components/Manager";
import DataAnalytics from "./components/DataAnalystic";
import AddProvider from "./components/AddProvider";
import UpdateProvider from "./components/UpdateProvider";
import Report from "./components/Report";
import CRUD_user from "./components/CRUD_user";
import OrdersManager from "./components/OrdersManager";
import TrackingPage from  "./components/TrackingPage";
import ManagerHome from "./components/ManagerHome";
import OrderStatusLine from "./components/OrderStatusLine";
import CustomerOrder from "./components/CustomerOrder";
import UserProfile from "./components/UserProfile";
import Nearme from "./components/Nearme";import WriteReview from "./components/WriteReview";

export default function App() {
  return (
    <>
      <BrowserRouter>
      <UserProvider>
       <ChakraProvider theme={theme}> 
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="billing" element={<Billing />} />
          <Route path = "reports" element={<ReportWebVitals />} />
          <Route path="login" element={<LoginSignUp />} />
          <Route path="signup" element={<Signup />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="labels" element={<LabelAndPack />} />
          <Route path="packages" element={<Packages />} />
          <Route path="rates" element={<Rates />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="carriers" element={<Carriers />} />
          <Route path="company-info" element={<CompanyInfo />} />
          <Route path="stores" element={<Stores />} />
          <Route path="sender-addresses" element={<SenderAddresses />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders-manage" element={<OrdersManager />} />
          <Route path="reviews" element={<Review />} />
          <Route path="shipments" element={<Shipments />} />
          <Route path="chatgpt" element={<Chatgpt />} />
          <Route path="plan" element={<Plan />} />
          <Route path="Form" element={<Form />} />
          <Route path="Manager" element={<Manager />} />
          <Route path="NewOrder" element={<NewOrder />} />
          <Route path="Confirmation" element={<Confirmation />} />
          <Route path="DataAnalytics" element={<DataAnalytics />} />
          <Route path="AddProvider" element={<AddProvider />} />
          <Route path="UpdateProvider" element={<UpdateProvider />} />
          <Route path="Report" element={<Report />} />
          <Route path="CRUD_user" element={<CRUD_user />} />
          <Route path="trackingpage" element={<TrackingPage />} />
          <Route path="ManagerHome" element={<ManagerHome />} />
          <Route path="CustomerOrder" element={<CustomerOrder />} />
          <Route path="UserProfile" element={<UserProfile />} />
          <Route path="OrderStatusLine" element={<OrderStatusLine />} />
        </Routes>
        </ChakraProvider>
        </UserProvider> 
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);