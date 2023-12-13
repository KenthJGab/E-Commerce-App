import React from 'react';
import Swal from 'sweetalert2';

export default function ArchiveProduct({ productId, isActive, fetchData }) {

  const archiveToggle = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchData();

          Swal.fire({
            title: 'Product Archived',
            icon: 'success',
            text: `Product ${productId} has been archived successfully.`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Archive Failed',
            text: 'An error occurred while archiving the product. Please try again later.',
          });
        }
      });
  };

  const activateToggle = () => {
    
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchData();

          Swal.fire({
            title: 'Product Activated',
            icon: 'success',
            text: `Product ${productId} has been activated successfully.`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Activation Failed',
            text: 'An error occurred while activating the product. Please try again later.',
          });
        }
      });
  };

  return (
    <div >
      {isActive ? (
        <button
                    
                    onClick={archiveToggle}
                    variant="light"
                    style={{
                    backgroundImage: `url('https://i.ibb.co/FqwdbTV/3.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '40px', 
                    height: '40px', 
                    border: 'none', 
                    }}
                >
                </button>
            ) : (
                <button
                    
                    onClick={activateToggle}
                    variant="light"
                    style={{
                    backgroundImage: `url('https://i.ibb.co/X7s3HXs/4.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '40px', 
                    height: '40px', 
                    border: 'none', 
                    }}
                >
                </button>
      )}
    </div>
  );
}
