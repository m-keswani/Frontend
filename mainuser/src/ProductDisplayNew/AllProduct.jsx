import React, { useEffect, useState } from 'react';
import './AllProduct.css';
import { BsCart3, BsFillHeartFill } from 'react-icons/bs';
import { MdZoomOutMap } from 'react-icons/md';
import Sidebar from "../FliterSidebar/Sidebar";
import { useNavigate } from 'react-router-dom';

const AllProduct = () => {
    const [fetchedProduct, setFetchedProduct] = useState([]);
    const [fetchedVariant, setFetchedVariant] = useState([]);
    const [fetchedImages, setFetchedImages] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const [currentPageFilter, setCurrentPageFilter] = useState()
    const [categoryAll, setCategoryAll] = useState()
    const categoryFilter = urlParams.get('category');
    const [filteredCategory, setFilteredCategory] = useState()

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        fetchVariants();
        fetchImages();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/adminsite/productdetails');
            const responseData = await response.json();
            setFetchedProduct(responseData);
        } catch (error) {
            // Handle error
        }
    };

    const fetchVariants = async () => {
        try {
            const response = await fetch('http://localhost:8000/getproductvariant/');
            const responseData = await response.json();
            setFetchedVariant(responseData);
        } catch (error) {
            // Handle error
        }
    };

    const fetchImages = async () => {
        try {
            const response = await fetch('http://localhost:8000/getimages/');
            const responseData = await response.json();
            setFetchedImages(responseData);
        } catch (error) {
            // Handle error
        }
    };

    const expandProduct = (productName, id) => {
        navigate(`/expandproductdetail?productName=${productName}&id=${id}`);
    };

    const addToCart = () => {
        // Implement your addToCart logic here
    };

    const catelaugFilter = (arg) => {
        //alert(arg)
        setCurrentPageFilter(arg)
        const cat = categoryAll.find(
            (v) => v.categoryName === arg);
        //console.log(cat)
        setFilteredCategory(cat)
    }

    console.log('**filtered cat ', filteredCategory)

    useEffect(() => {
        getAllCategory()
    }, []);

    const getAllCategory = async () => {
        const response = await fetch('http://localhost:8000/api/getallcategory')
        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            setCategoryAll(responseData)
            //alert()
        }
    }


    return (

        <section className="section-products">

            <div className="container align-items-center">
                <div className="row align-items-center">

                    <div className="col-md-12">
                    

                        <div style={{ display: 'flex' }}>
                            {categoryAll && categoryAll.map((item, index) => (
                                <div key={index} className='col-2 text-right pr-5'>
                                    <h3><p className='category-link' onClick={() => catelaugFilter(item.categoryName)}>
                                        {item.categoryName.charAt(0).toUpperCase() + item.categoryName.substring(1)}
                                       
                                    </p></h3> 
                                </div>
                            ))}
                        </div>



                        <div className="header pt-3">
                            <h2>Popular Products</h2>
                        </div>

                        <div className="row">
                            <Sidebar />
                            {fetchedProduct.map((item) => {

                                const variant = fetchedVariant.find(
                                    (v) => v.productId === item.id && (!categoryFilter || item.gender === categoryFilter) && (!filteredCategory || item.categoryId === filteredCategory.id)
                                );



                                if (variant) {
                                    const image = fetchedImages.find((img) => img.variantId === variant.id);
                                    return (
                                        <div className="col-lg-4 col-md-6 col-sm-12" key={item.id} onClick={() => expandProduct(item.name, item.id)}>
                                            <div id={`product-${item.id}`} className={`single-product`}>
                                                <div className="row p-4">
                                                    <div className="col-md-">
                                                        <div className="part-1">
                                                            <img
                                                                src={image ? 'http://localhost:8000' + image.imageUrl : 'default-image-url.jpg'}
                                                                alt={item.name}
                                                                className="img-fluid"
                                                            />
                                                            <ul className="product-icons">
                                                                <li>
                                                                    <a href="#"><BsCart3 /></a>
                                                                </li>
                                                                <li>
                                                                    <a href="#"><BsFillHeartFill /></a>
                                                                </li>
                                                                <li>
                                                                    <a href="#"><MdZoomOutMap /></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-">
                                                        <div className="product-info">
                                                            <h3 className="product-title">{item.name}</h3>
                                                            <p className="card-text">{item.gender}</p>
                                                            <p className="card-text">Price: ₹ {variant.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AllProduct;
