import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./bootstrapSandStone.min.css"
import { useState,useEffect } from "react";
import { Container } from "react-bootstrap";
import Homescreen from "./Screens/Homescreen";
import Productscreen from "./Screens/Productscreen";
import Cartscreen from "./Screens/Cartscreen";
import LoginScreen from "./Screens/Loginscreen";
import RegisterScreen from "./Screens/Registerscreen";
import ProfileScreen from "./Screens/Profilescreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
function App() {
  const [products,setproducts] = useState(null)
  const [users,setusers] = useState(null)
 
  
  useEffect(() => {
    fetch( "http://localhost:8000/products")
    .then(res =>{
      
      return res.json()
       
    })
    .then(res1 =>{
        
        setproducts(res1)
        
    })
    .catch(err=>{
      console.log(err)
    })
  
    
  }, [products])

  useEffect(() => {
    fetch( "http://localhost:8000/users")
    .then(res =>{
      
      return res.json()
       
    })
    .then(res1 =>{
        
        setusers(res1)
        
    })
    .catch(err=>{
      console.log(err)
    })
  
    
  }, [users])
  
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={products?<Homescreen products={products}/>:<h5>Loading..</h5>} exact />
            <Route path="/product/:id" element={products?<Productscreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/cart" element={products?<Cartscreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/login" element={products?<LoginScreen />:<h5>Loading..</h5>} />
            <Route path="/signup" element={products?<RegisterScreen props={products} users = {users} />:<h5>Loading..</h5>} />
            <Route path="/profile" element={products?<ProfileScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/productedit" element={products?<ProductEditScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/productlist" element={products?<ProductListScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/payment" element={products?<PaymentScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/shipping" element={products?<ShippingScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/placeorder" element={products?<PlaceOrderScreen props={products} />:<h5>Loading..</h5>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
