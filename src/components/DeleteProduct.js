import { Button} from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function DeleteProduct({ productId, fetchData, openEdit, closeEdit }) {
  const deleteProduct = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'Product Successfully Deleted',
          });
          fetchData(); // Refresh the product list
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Please try again',
          });
        }
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: 'An error occurred while deleting the product.',
        });
      });
  };

  return (
    <>
<Button 
            onClick={() => deleteProduct(productId)}
            variant="light"
            style={{
                backgroundImage: `url('https://i.ibb.co/wJYfS3g/2.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '40px', 
                height: '40px', 
                border: 'none', 
            }}
        >
        </Button>
    </>
  );
}
