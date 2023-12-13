import AppNavbar from './components/AppNavbar';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import UserOrders from './pages/UserOrders';
import UserLists from './pages/UserLists';
import UserCart from './components/UserCart';

import './App.css';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';

function App() {
 const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }


  useEffect(() => {
    console.log(user);
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (typeof data._id !== "undefined") {

        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });

      } else {

        setUser({
            id: null,
            isAdmin: null
        })
      }
    })

    console.log(localStorage);
  }, [user])
  
//cour

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid className='p-0'>
            <AppNavbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/products/:productId" element={<ProductView/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/users-orders" element={<UserOrders />} />
                <Route path="/user-lists" element={<UserLists />} />
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="*" element={<Error/>}/>
                <Route path="/user-cart" element={<UserCart />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/Profile" element={<Profile/>}/>
            </Routes>
            <Routes>
            </Routes>
        </Container>
      </Router>
    </UserProvider>  
  );
}


export default App;
