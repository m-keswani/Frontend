import React, { useEffect, useState } from 'react';
import { FaStar, FaUser, FaTrash, FaCaretDown } from 'react-icons/fa';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import ImageGallery from 'react-image-gallery';
import Modal from 'react-modal';

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};



function Rating() {

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  
  const initialValues = {
    email: '',
    stars: 0,
    experience: '',
    images: [],
  }
  const [userReview, setUserReview] = useState(initialValues);
  const [authUser, setAuthUser] = useState(false)
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([]);
  const stars = Array(5).fill(0);
  const [email,setEmail] = useState()
  const urlParams = new URLSearchParams(window.location.search);

  const [productId,setProductId] = useState(urlParams.get('id'))
  const [submitButton,setSubmitButton] = useState(false)
  const [review,setReview] = useState([])
  const [reviewFilled,setReviewFilled] = useState(false)
  const [username, setUsername] = useState('');

  useEffect(() => {
    checkAuth()
  }, []);

  useEffect(() => {
    if(userReview.experience !== '' && userReview.stars !== 0 ){
      setReviewFilled(true)
    }
    else{
      setReviewFilled(false)
    }
  }, [userReview,stars]);


  const checkAuth = async () => {
    const data = new FormData()
    data.append('token', localStorage.getItem('authToken'))
    const response = await fetch('https://mohitto25.pythonanywhere.com/api/verifyuser', { method: "POST", body: data })
    const responseData = await response.json()
    if (responseData.authuser === 'false') {
      setAuthUser(false)
    }
    else {
      const email = await responseData.userEmail;
      setEmail(email)

      setAuthUser(true)
    }
  }
  
  
  
 


  //for start selects 
  const handleClick = (value) => {
    setCurrentValue(value);
    setUserReview({ ...userReview, stars: value });

  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserReview({ ...userReview, [name]: value });
  };

  const handleSubmit = async () => {
    setSubmitButton(true)
   
    setReviews([...reviews, { ...userReview }]);
    setUserReview({ email: '', stars: 0, experience: '' ,images:[] });
  
    const reviewData = new FormData()
    reviewData.append('productId',productId)
    reviewData.append('email',email)
    reviewData.append('comments',userReview.experience)
    reviewData.append('rate',userReview.stars)


    const reviewResponse = await fetch('https://mohitto25.pythonanywhere.com/api/addreview',{method:"POST",body:reviewData})
    if(reviewResponse.ok){
      const review = await reviewResponse.json()
      const id = await review.reviewId
      if (userReview.images.length > 0) {
        userReview.images.map(async (val) => {
          const reviewImages = new FormData()
          reviewImages.append('reviewId', id)
          reviewImages.append('imageUrl', val)
          const responseimage = await fetch('https://mohitto25.pythonanywhere.com/api/addreviewimage', { method: "POST", body: reviewImages })
          if (responseimage.ok) {
            alert("review Added !")

          }
          else {
            alert('error while adding image !')
          }
        })
      }
    }
    else{
      alert('review not added')
    }
    setSubmitButton(false)

  };

  const handleDelete = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);
  };

  useEffect(() => {
    getReview()
    getReviewImage()
  }, [submitButton]);

  const getReview =async()=>{
    const data = new FormData()
    data.append('product_id',productId)
    const reviewData = await fetch('https://mohitto25.pythonanywhere.com/api/getreviews',{method:"POST",body:data})
    if(reviewData.ok){
      const reviews = await reviewData.json()
      setReview(reviews)
    }
  }

  const getReviewImage =async()=>{
    review.map((val)=>{

    })
    //console.log('All Review :',review)
  }



  const [displayAllReviews, setDisplayAllReviews] = useState(false);
  const onDrop = (acceptedFiles) => {
    setUserReview({ ...userReview, images: [...userReview.images, ...acceptedFiles] });
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  
  function UsernameFetcher({ email }) {
    const [username, setUsername] = useState('');
  
    useEffect(() => {
      const getUserName = async () => {
        const data = new FormData();
        data.append('email', email);
        const response = await fetch('https://mohitto25.pythonanywhere.com/api/username', {
          method: 'POST',
          body: data,
        });
        if (response.ok) {
          const data = await response.json();
          const name = data.name;
          setUsername(name);
        } else {
          setUsername('Error fetching name');
        }
      };
  
      getUserName();
    }, [email]);
  
    return (
      <span>{username}</span>
    );
  }
  
  function ReviewImage({ review_id }) {
    const [reviewImages, setReviewImages] = useState([]);
  
    useEffect(() => {
      const getUserName = async () => {
        const data = new FormData();
        data.append('review_id', review_id);
        const response = await fetch('https://mohitto25.pythonanywhere.com/api/reviewimages', {
          method: 'POST',
          body: data,
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Images Data :',data)

          setReviewImages(data);
        } else {
          setReviewImages('Error fetching images');
        }
      };
      
      getUserName();
    }, [review_id]);
  
    return (
      <>

      <span>{reviewImages.map((val)=>(
        <img
          key={val.id}
          src={'https://mohitto25.pythonanywhere.com'+val.imageUrl}
          style={{ maxWidth: '10%' }}
        />
        
      ))}</span>
        {reviewImages.length > 0 ?
          <ReviewImageGallery images={reviewImages.map((val) => ('https://mohitto25.pythonanywhere.com'+val.imageUrl))} />
          : null

        }
      </>


    );
  }

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

  return (
    <div className="container mt-4">
      <div className="row">
        {authUser?(
        <div className="col-md-12">
          <div className=" mb-4">
            <h2 className="mb-2">Add your Experience</h2>
            <h6 className="text-muted">Share your thoughts with the community</h6>
          </div>
          <div className="">
            {stars.map((_, index) => (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                style={{
                  marginRight: 10,
                  cursor: "pointer"
                }}
              />
            ))}
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
              <input {...getInputProps()} type="file" multiple accept="image/*" />
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
          <br/>
          <div className="">

              <button
                className={`btn btn-lg rounded-pill ${reviewFilled ? 'btn-dark' : 'btn-dark btn-lg'}`}
                style={{
                  paddingLeft: '3.5rem',
                  paddingRight: '3.5rem',
                  pointerEvents: reviewFilled ? 'auto' : 'none',
                  opacity: reviewFilled ? 1 : 0.8,
                }}
                onClick={reviewFilled ? handleSubmit : null}
              >
              
              Submit
            </button>
          </div>
            
        </div>):(<h6 className="text-muted ">Sign in to add your experience</h6>)}
        <div className='row'>
          <div className="col-md-12">
            <div className="mt-4">
              <h2 className="mb-2">User Reviews</h2>
              <h6 className=" mb-2  " onClick={() => setDisplayAllReviews(!displayAllReviews)}>Read what others have to say  
              {displayAllReviews ? < HiOutlineChevronDown size={20} className='' /> : <HiOutlineChevronUp size={20}/>}</h6>  
              </div>




            {displayAllReviews && review.length>0 && review ? (
              review.map((review, index) => (
                <div className="bg-white text-dark p-4 rounded mb-4" key={index}>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex ">
                      <FaUser size={20} className="mr-2" />
                      <span >  <UsernameFetcher email={review.email} /></span>


                    </div>
                    
                    <div className="d-flex">
                      {new Date(review.date).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata', // Delhi's time zone
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </div>

                    
                  </div>
                  <div className="d-flex  ">
                    <span className="mr-2"><strong>Rating:</strong></span>
                    <div>
                      {[...Array(review.rate)].map((_, i) => (
                        <FaStar key={i} size={20} color={colors.orange} />
                      ))}
                    </div>
                    <span>{review.stars} Star</span>
                  </div>
                  
                  


                  

                  <p>{review.comments}</p>
                  
                  <ReviewImage review_id={review.reviewId} />
                  
                </div>
              ))
            ) : displayAllReviews && review.length === 0 && review ? 'Be first to review':null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
