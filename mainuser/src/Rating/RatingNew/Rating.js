import React, { useState } from 'react';
import { FaStar, FaUser, FaTrash } from 'react-icons/fa';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import Modal from 'react-modal';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useDropzone } from 'react-dropzone';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function App() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [userReview, setUserReview] = useState({
    email: '',
    stars: 0,
    experience: '',
    images: [],
  });
  const [reviews, setReviews] = useState([]);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
    setUserReview({ ...userReview, stars: value });
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    if (type === "file") {
      const images = event.target.files;
      setUserReview({ ...userReview, [name]: [...userReview.images, ...images] });
    } else {
      setUserReview({ ...userReview, [name]: value });
    }
  };

  const handleSubmit = () => {
    setReviews([...reviews, { ...userReview }]);
    setUserReview({ email: '', stars: 0, experience: '', images: [] });
  };

  const handleDelete = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);
  };

  const [displayAllReviews, setDisplayAllReviews] = useState(false);

  function ReviewImageGallery(props) {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
    };

    const images = props.images.map((image) => ({
      original: image,
      thumbnail: image,
    }));

    return (
      <div className='pt-3'>
        <button className='btn btn-dark pt-2 pb-2 rounded-pill' onClick={openModal}>
          View All Images
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Image Gallery Modal"
          ariaHideApp={false}
        >
          <div className='p-3'>
            <button
              className='btn btn-dark btn-lg rounded-pill'
              onClick={closeModal}
            >
              Close
            </button>
          </div>
          <ImageGallery items={images} />
        </Modal>
      </div>
    );
  }

  const onDrop = (acceptedFiles) => {
    setUserReview({ ...userReview, images: [...userReview.images, ...acceptedFiles] });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="mb-4">
            <h2 className="mb-2">Write a Review</h2>
            <h6 className="text-muted">Share your thoughts with the community</h6>
          </div>
          <div>
            {stars.map((_, index) => (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
          <div className="form-group mt-4">
            <input
              type="email"
              name="email"
              value={userReview.email}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group mt-4">
            <div
              {...getRootProps()}
              className="card text-center p-4"
              style={{
                border: '2px dashed #ccc',
                cursor: 'pointer',
              }}
            >
              <input {...getInputProps()} type="file" multiple />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AiOutlinePlusSquare size={40} color='#ccc' />
                <p className="m-2">Drag & drop images here, or click to select images</p>
              </div>
            </div>
            {userReview.images.length > 0 && (
              <div className="mt-2">
                {userReview.images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded Image ${index}`}
                    style={{ maxWidth: "100px", marginRight: '10px' }}
                  />
                ))}
                
              </div>
            )}
          </div>
          <div className="form-group mt-4">
            <textarea
              name="experience"
              value={userReview.experience}
              onChange={handleInputChange}
              className="form-control"
              rows="4"
              placeholder="What's your experience?"
            />
          </div>
          <div>
            <button
              className="btn btn-dark btn-lg rounded-pill"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="col-md-12">
          <div className="mt-4">
            <h2 className="mb-2">User Reviews</h2>
            <h6 className="mb-2" onClick={() => setDisplayAllReviews(!displayAllReviews)}>
              Read what others have to say
              {displayAllReviews ? <HiOutlineChevronDown size={20} /> : <HiOutlineChevronUp size={20} />}
            </h6>
          </div>
          {displayAllReviews ? (
            reviews.map((review, index) => (
              <div className="bg-white text-dark p-4 rounded mb-4" key={index}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FaUser size={20} className="mr-2" />
                    <span className="mr-2"><strong>User:</strong></span>
                    <span>{review.email}</span>
                  </div>
                  <div>
                    <button onClick={() => handleDelete(index)} className="btn">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="d-flex">
                  <span className="mr-2"><strong>Rating:</strong></span>
                  <div>
                    {[...Array(review.stars)].map((_, i) => (
                      <FaStar key={i} size={20} color={colors.orange} />
                    ))}
                  </div>
                  <span>{review.stars} Star</span>
                </div>
                
                {review.images.length > 0 && (
                  <div className="mt-4">
                    {review.images.slice(0, 2).map((image, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(image)}
                        alt={`Review Image ${i}`}
                        style={{ maxWidth: '20%' }}
                      />
                    ))}
                  </div>
                )}

                <p>{review.experience}</p>

                {review.images.length > 0 && (
                  <ReviewImageGallery images={review.images.map(image => URL.createObjectURL(image))} />
                )}
              </div>
            ))
          ) : (
            reviews.length > 0 && (
              <div className="bg-white text-dark p-4 rounded mb-4">
                <div className="d-flex">
                  <FaUser size={20} className="mr-2" />
                  <span className="mr-2"><strong>User:</strong></span>
                  <span>{reviews[0].email}</span>
                </div>
                <div className="d-flex">
                  <span className="mr-2"><strong>Rating:</strong></span>
                  <div>
                    {[...Array(reviews[0].stars)].map((_, i) => (
                      <FaStar key={i} size={20} color={colors.orange} />
                    ))}
                  </div>
                  <span>{reviews[0].stars} Star</span>
                </div>
                {reviews[0].images.length > 0 && (
                  <div className="mt-4">
                    {reviews[0].images.slice(0, 2).map((image, i) => (

                      <img
                        key={i}
                        src={URL.createObjectURL(image)}
                        alt={`Review Image ${i}`}
                        style={{ maxWidth: '20%' }}
                      />
                    ))}
                  </div>
                )}
                
                {reviews[0].images.length > 0 && (
                  <ReviewImageGallery images={reviews[0].images.map(image => URL.createObjectURL(image))} />
                )}
                <p className='pt-3'>{reviews[0].experience}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
