import React, { useEffect, useState, useContext, useCallback } from 'react';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const fetchData = useCallback(() => {
    let url = `${process.env.REACT_APP_API_URL}/products/all`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    
    
    <div>
      {user.isAdmin === true && <AdminView productsData={products} fetchData={fetchData} />}
      {user.isAdmin !== true && <UserView productsData={products} />}
    </div>
  );
}
