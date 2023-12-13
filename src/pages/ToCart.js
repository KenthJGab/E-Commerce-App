import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function ToCart ({ productId, isLoggedIn, productName, productDescription, productPrice }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'info',
        title: 'Please log in to add items to the cart.',
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          productId: productId,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
            title: 'Product added to cart successfully!',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to add product to cart.',
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error adding product to cart',
          showConfirmButton: false,
          timer: 500,
          text: response.statusText,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error adding product to cart',
        text: error.message,
      });
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          className="form-control text-center mx-2"
          style={{ width: '70px' }}
        />
        <button
          className="btn btn-outline-secondary"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
      <br />
      <button
        onClick={addToCart}
        disabled={!isLoggedIn}
        className="btn btn-secondary mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
  }  
