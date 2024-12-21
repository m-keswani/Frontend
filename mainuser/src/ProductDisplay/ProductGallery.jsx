import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductGallery = () => {
    const [fetchedProduct, setFetchedProduct] = useState([]);
    const [fetchedVariant, setFetchedVariant] = useState([]);
    const [fetchedImages, setFetchedImages] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        fetchVariants();
        fetchImages();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://mohitto25.pythonanywhere.com/adminsite/productdetails');
            const responseData = await response.json();
            setFetchedProduct(responseData);
        } catch (error) {
            // Handle error
        }
    };

    const fetchVariants = async () => {
        try {
            const response = await fetch('https://mohitto25.pythonanywhere.com/getproductvariant/');
            const responseData = await response.json();
            setFetchedVariant(responseData);
        } catch (error) {
            // Handle error
        }
    };

    const fetchImages = async () => {
        try {
            const response = await fetch('https://mohitto25.pythonanywhere.com/getimages/');
            const responseData = await response.json();
            setFetchedImages(responseData);
        } catch (error) {
            // Handle error
        }
    };

    const expandProduct = (id) => {
        navigate(`/expandproduct?id=${id}`);
    };

    const addToCart = () => {
        // Implement your addToCart logic here
    };

    return (
        <div>
            <div className="container">
                
                <div className="row">
                    {fetchedProduct.map((item) => (
                        <div className="col-md-4" key={item.id}>
                            <div className="card mb-4" onClick={() => expandProduct(item.id)}>
                                <img
                                    src={getProductImage(item.id)} // Get the product image based on variant ID
                                    className="card-img-top"
                                    alt="..."
                                    style={{ maxWidth: '100%', height: '100%' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.gender}</p>
                                    <a href="#" className="btn btn-primary" onClick={() => addToCart()}>
                                        Add to Cart
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Function to get the product image URL based on variant ID
    function getProductImage(productId) {
        const variant = fetchedVariant.find((v) => v.productId === productId);
        if (variant) {
            const image = fetchedImages.find((img) => img.variantId === variant.id);
            if (image) {
                return 'https://mohitto25.pythonanywhere.com' + image.imageUrl;
            }
        }
        // Return a default image URL or handle the case when no image is found for the product
        return 'default-image-url.jpg';
    }
};

export default ProductGallery;
