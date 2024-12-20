import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductGallery from './ProductDisplay/ProductGallery';
import ExpandProductDetail from './ExpandProduct/ExpandProductDetail';
//import MainHead from './Header/MainHead';
import Login from './Form/Login';
import Signup from './Form/Singup';
import ForgotPassword from './Form/ForgotPassword';
import NewPassword from './Form/NewPassword';
import ExpandProduct from './ProductDisplay/ExpandProduct';
import ShoppingCart from './Cart/cart';
import MainHead from './Header/MainHead';
import DiscountHead from './Discount-Header/MainHead';
import AddressForm from './Address/AddressForm';
import Rating from './Rating/Rating';
import AllProduct from './ProductDisplayNew/AllProduct';
import BillingForm from './Address/Address/Deliveryadd';
import AddressSelectionPage from './Address/Address/selectadd';
import Landing from './landing/landing';
import Order from './order/Order';
import Footer from './Footer/Footer'
import EditAddress from './Address/EditAddress';
import LandingPage from './landing/landing';
import PaymentComponent from './Payment/Paypal';
import PaymentSucess from './Payment/PaymentSucess';
import OrderPlaced from './order/OrderPlaced';

function App() {
  return (
   <div>

<>
    <Router>
      <MainHead/>
      <DiscountHead/>
      <Routes>  
        <Route path="/productgallery" element={<ProductGallery/>}/>

        <Route path="/expandproduct" element={<ExpandProduct/>}/>
        <Route path="/expandproductdetail" element={<ExpandProductDetail/>}/>
        <Route path="/allproduct" element={<AllProduct/>}/>
        <Route path="/landingpage" element={<LandingPage/>}/>

        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/newpassword" element={<NewPassword/>}/>
        <Route path="/cart" element={<ShoppingCart/>}/>
        <Route path="/head" element={<MainHead/>}/>
        <Route path="/" element={<Landing/>}/>
        <Route path="/addaddress" element={<AddressForm/>}/>
        <Route path="/rating" element={<Rating/>}/>
        <Route path="/addresselection" element={<AddressSelectionPage/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/editaddress" element={<EditAddress/>}/>
        <Route path="/payment" element={<PaymentComponent/>}/>
        <Route path="/success" element={<PaymentSucess/>}/>
        <Route path="/order-placed" element={<OrderPlaced/>}/>
        

        
      </Routes>
      <Footer/>
    </Router >
   
    </>

   </div>
  );
}

export default App;
