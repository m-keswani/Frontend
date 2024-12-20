//import logo from './logo.svg';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import AddCategory from './ProductManager/AddCategory';
//import AddSubCategory from './ProductManager/AddSubCategory';
import AddProduct from './ProductManager/AddProduct';
import AddColor from './ProductManager/AddColor';
import AddSize from './ProductManager/AddSize';
import EditProduct from './ProductManager/EditProduct';
import ExpandProduct from './ProductManager/ExpandProduct';
import AddNewVariant from './ProductManager/AddNewVariant';
import CreateAdmin from './Admin/CreateAdmin';
import Login from './Login/Login';
import Head from './Main/Head';
import Sidebar from './Sidebar/Sidebar';
import Back from './Back/Back';
import AddCategory from './ProductManager/AddCategory';
import AddSubCategory from './ProductManager/AddSubCategory';
import Layout from './ProductManager/Layout';
import AvailableAdmin from './Admin/AvailableAdmin';
import ChangePassword from './Admin/ChangePassword';
import PlacedOrders from './CustomerOrder/PlacedOrders';
import PaymentDetail from './Payment/PaymentDetail';


function App() {

  return (
    <>
    <Router>
      {localStorage.getItem('validAdmin') === 'true' ?(
      
      
      <Routes>  
        
        <Route path="/" element={<Layout><PlacedOrders/></Layout>} />
        <Route path="/addcategory" element={<Layout><AddCategory /></Layout>} />
        <Route path="/addsubcategory" element={<Layout><AddSubCategory /></Layout>} />
        <Route path="/addsize" element={<Layout><AddSize /></Layout>} />
        <Route path="/addcolor" element={<Layout><AddColor /></Layout>} />
        <Route path="/showproduct" element={<Layout><EditProduct /></Layout>} />
        <Route path="/addproduct" element={<Layout><AddProduct /></Layout>} />
        <Route path="/addadmin" element={<Layout><CreateAdmin /></Layout>} />
        <Route path="/productvariant" element={<Layout><ExpandProduct /></Layout>} />
        <Route path="/addnewvariant" element={<Layout><AddNewVariant /></Layout>} />
        <Route path="/changepassword" element={<Layout><ChangePassword /></Layout>} />
        <Route path="/availableadmin" element={<Layout><AvailableAdmin /></Layout>} />
        <Route path="/payment-details" element={<Layout><PaymentDetail /></Layout>} />
        
      </Routes>)
:<Routes>
<Route path="/" element={<Login />} />
</Routes>}
    </Router >
   
    </>
    
  );
}


export default App;

/*

 <Route path="/" element={<Layout/>} />
        
        
        <Route path="/" element={<Layout/>} />
        <Route path="/addcategory" element={<Layout><AddCategory /></Layout>} />
        <Route path="/addsubcategory" element={<Layout><AddSubCategory /></Layout>} />
        <Route path="/addsize" element={<Layout><AddSize /></Layout>} />
        <Route path="/addcolor" element={<Layout><AddColor /></Layout>} />
        <Route path="/showproduct" element={<Layout><EditProduct /></Layout>} />
        <Route path="/addproduct" element={<Layout><AddProduct /></Layout>} />
        <Route path="/addadmin" element={<Layout><CreateAdmin /></Layout>} />
        <Route path="/productvariant" element={<Layout><ExpandProduct /></Layout>} />
        <Route path="/addnewvariant" element={<Layout><AddNewVariant /></Layout>} />

        <Route exact path="/addcategory" element={<AddCategory/>} />
        <Route exact path="/addsubcategory" element={<AddSubCategory/>} />
        <Route path="/addsize" element={<AddSize/>} />
        <Route path="/addcolor" element={<AddColor/>} />
        <Route path='/showproduct' element={<EditProduct/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/addadmin' element={<CreateAdmin/>}/>

<Routes>
            




    <Router>
    
        
      <Routes>
        
        <Route exact path="/" element={<Main/>} />
        
        <Route path="/addProduct" element={<Product/>} />
        <Route path="/EditProduct" element={<EditForm/>} />
        
      </Routes>
    </Router>


    <Router>
      <Sidebar/>
        
      <Routes>
        
        <Route exact path="/" element={<Main/>} />
        <Route path ='/adduser' element = {<User/>}/>
        <Route path ='/dashboard' element = {<Main/>}/>
        
        <Route path="/addProduct" element={<Product/>} />
        <Route path="/EditProduct" element={<EditForm/>} />
        
      </Routes>
    </Router>
*/