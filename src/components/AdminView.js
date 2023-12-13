import React, { useState, useEffect } from 'react';
import { Table, Image, Card, Button, Container } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import DeleteProduct from './DeleteProduct';
import { Link } from 'react-router-dom';

export default function AdminView({ productsData, fetchData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsArr = productsData.map(product => (
      <tr key={product._id}>
        <td>
          {product.imageLink && (
            <Image src={product.imageLink} alt={product.name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
          )}
        </td>
        <td>{product._id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td className={product.isActive ? "text-success" : "text-danger"}>
          {product.isActive ? "Available" : "Unavailable"}
        </td>
        <td><EditProduct product={product._id} fetchData={fetchData} /></td>
        <td>
          <ArchiveProduct productId={product._id} isActive={product.isActive} fetchData={fetchData} />
        </td>
        <td>
          <DeleteProduct productId={product._id} fetchData={fetchData} />
        </td>
      </tr>
    ));

    setProducts(productsArr);
  }, [productsData, fetchData]);

  return (
    <>
    <br/>
      <h1 className="text-center my-4"> Admin Dashboard</h1>
      <Container className="mt-4 text-center">
      <div className="d-none d-lg-flex justify-content-center" >
        <Card.Body className="d-inline-block" >
        <Button as={Link} to="/addProduct" variant="white" className="glow-on-hover" style={{ backgroundColor: 'white', whiteSpace: 'nowrap' }}>
          <Image
            src="https://i.ibb.co/DKJNd07/1.png"
            alt="Add Product"
            style={{ width: '100px', height: '100px',  }}
          />
          Add Product
        </Button>
        </Card.Body>


        <Card.Body className="d-inline-block">
        <Button as={Link} to="/users-orders" variant="white" className="glow-on-hover" style={{ backgroundColor: 'white', whiteSpace: 'nowrap' }}>
          <Image
            src="https://i.ibb.co/4YX7c4S/3.png"
            alt="Add Product"
            style={{ width: '100px', height: '100px', }}
          />
          User Orders
        </Button>
        </Card.Body>


        <Card.Body className="d-inline-block">
        <Button as={Link} to="/user-lists" variant="white" className="glow-on-hover" style={{ backgroundColor: 'white', whiteSpace: 'nowrap' }}>
          <Image
            src="https://i.ibb.co/wMkDTHv/2.png"
            alt="Add Product"
            style={{ width: '100px', height: '100px',  }}
          />
          Accounts
        </Button>
        </Card.Body>
      </div>

      <div className="d-sm-flex d-md-none justify-content-center">
        <Card.Body className="mb-3">
        <Button as={Link} to="/addProduct" variant="white" className="glow-on-hover" style={{ backgroundColor: 'white', whiteSpace: 'nowrap' }}>
          <Image
            src="https://i.ibb.co/DKJNd07/1.png"
            alt="Add Product"
            style={{ width: '50px', height: '50px',  }}
          />
          Add Product
        </Button>
        </Card.Body>

        <Card.Body className="mb-3">
        <Button as={Link} to="/users-orders" variant="white" className="glow-on-hover" style={{ backgroundColor: 'white', whiteSpace: 'nowrap' }}>
          <Image
            src="https://i.ibb.co/4YX7c4S/3.png"
            alt="Add Product"
            style={{ width: '50px', height: '50px',  }}
          />
          User Orders
        </Button>
        </Card.Body>

        <Card.Body>
        <Button as={Link} to="/user-lists" variant="white" className="glow-on-hover" style={{ backgroundColor: 'white', whiteSpace: 'nowrap' }}>
          <Image
            src="https://i.ibb.co/wMkDTHv/2.png"
            alt="Add Product"
            style={{ width: '50px', height: '50px',  }}
          />
          Accounts
        </Button>
        </Card.Body>
      </div>
    </Container>
        
      <br/>
      <br/>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th style={{ backgroundColor: '#8F8F8F' }}>Image</th> 
            <th style={{ backgroundColor: '#8F8F8F' }}>ID</th>
            <th style={{ backgroundColor: '#8F8F8F' }}>Name</th>
            <th style={{ backgroundColor: '#8F8F8F' }}>Description</th>
            <th style={{ backgroundColor: '#8F8F8F' }}>Price</th>
            <th style={{ backgroundColor: '#8F8F8F' }}>Availability</th>
            <th style={{ backgroundColor: '#8F8F8F' }} colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products}
        </tbody>
      </Table>
    </>
  );
}
