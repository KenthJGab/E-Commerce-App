import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function EditProduct({ product, fetchData }) {
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const editProduct = (e, productId) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                imageLink: imageLink 
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data === true) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Product Successfully Updated'
                });
                closeEdit();
                fetchData();
            } else {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Please try again'
                });
                closeEdit();
                fetchData();
            }
        });
    };

    const openEdit = (productId) => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProductId(data._id);
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setImageLink(data.imageLink);
            });

        setShowEdit(true);
    }

    const closeEdit = () => {
        setShowEdit(false);
        setName('');
        setDescription('');
        setPrice(0);
        setImageLink('');
    }

    return (
        <>
            <Button
                variant="light"
                onClick={() => openEdit(product)}
                style={{
                    backgroundImage: `url('https://i.ibb.co/k5zPB7q/1.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '40px', 
                    height: '40px', 
                    border: 'none', 
                }}
            >          
            </Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <img src={imageLink} alt="Product" style={{ maxWidth: '100%', height: 'auto' }} />
                        <Form.Group controlId="productImage">
                            <Form.Label>Image Link</Form.Label>
                            <Form.Control
                                type="text"
                                value={imageLink}
                                onChange={e => setImageLink(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
