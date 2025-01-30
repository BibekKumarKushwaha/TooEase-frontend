
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getSingleProduct, addToCartApi, getReviewsApi, addReviewApi, getUserProfileApi } from '../../apis/Api';
// import Footer from '../../components/Footer';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
// import { Button, Image } from 'antd';
// import Rating from 'react-rating-stars-component';
// import styled from 'styled-components';
// import './ViewProduct.css';

// const PriceTag = styled.p`
//   font-weight: bold;
//   color: #1890ff;
// `;

// const ViewProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState('');
//   const [rating, setRating] = useState(1);
//   const [averageRating, setAverageRating] = useState(0);
//   const [user, setUser] = useState({
//     fullName: '',
//     phoneNumber: '',
//     address: ''
//   });

//   useEffect(() => {
//     getSingleProduct(id)
//       .then((res) => {
//         setProduct(res.data.product);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     fetchReviews();
//     fetchUserProfile();
//   }, [id]);

//   const fetchReviews = async () => {
//     try {
//       const res = await getReviewsApi(id);
//       setReviews(res.data.reviews);
//       calculateAverageRating(res.data.reviews);
//     } catch (err) {
//       toast.error("Failed to fetch reviews");
//     }
//   };

//   const calculateAverageRating = (reviews) => {
//     if (reviews.length === 0) {
//       setAverageRating(0);
//       return;
//     }
//     const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//     setAverageRating(totalRating / reviews.length);
//   };

//   const fetchUserProfile = () => {
//     getUserProfileApi()
//       .then((res) => {
//         setUser({
//           ...user,
//           fullName: `${res.data.firstName} ${res.data.lastName}`,
//           phoneNumber: res.data.phone
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleAddToCart = async () => {
//     try {
//       const total = quantity * product.productPrice;
//       await addToCartApi({
//         productId: product._id,
//         quantity: quantity,
//         total: total
//       });
//       toast.success("Added to cart successfully!");
//     } catch (error) {
//       toast.error("Failed to add to cart.");
//       throw error;
//     }
//   };

//   const handleProceedToPayment = async () => {
//     try {
//       // Ensure item is added to cart before navigating
//       await handleAddToCart();
//       navigate('/my_cart');
//     } catch (error) {
//       console.error('Error proceeding to payment:', error);
//     }
//   };

//   const increaseQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const submitReview = async () => {
//     if (!rating || !newReview) {
//       toast.error("Please provide both rating and comment");
//       return;
//     }

//     try {
//       const res = await addReviewApi({ productId: id, rating, comment: newReview });
//       toast.success(res.data.message);
//       setRating(1); // Reset rating
//       setNewReview(""); // Reset comment
//       fetchReviews(); // Fetch reviews again after submission
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error("Failed to submit review");
//       }
//     }
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="background">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
//       <div className="container mt-5">
//         <div className="row">
//           <div className="col-md-6">
//             <Image
//               src={`https://localhost:5000/products/${product.productImage}`}
//               alt={product.productName}
//               className="img-fluid product-image"
//               preview={false}
//             />
//           </div>
//           <div className="col-md-6">
//             <div className="card p-3 product-details">
//               <h2>{product.productName}</h2>
//               <PriceTag>Rs {product.productPrice}</PriceTag>
//               <h5>Category: {product.productCategory}</h5>
//               <p><strong>Description: </strong>{product.productDescription}</p>
//               <p><strong>Date Added: </strong>{new Date(product.createdAt).toLocaleDateString()}</p>
//               <p><strong>Status: </strong>Available</p>
//               <p><strong>Views: </strong>{product.views}</p>
//               <div className="mt-3">
//                 <div className="quantity-selector">
//                   <Button onClick={decreaseQuantity} type="primary">-</Button>
//                   <span>{quantity}</span>
//                   <Button onClick={increaseQuantity} type="primary">+</Button>
//                 </div>
//                 <Button onClick={handleAddToCart} type="primary" className="me-2">Add to Cart</Button>
//                 <Button onClick={handleProceedToPayment} type="primary">Buy Now</Button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row mt-4">
//           <div className="col-md-12">
//             <div className="card p-3 review-section">
//               <h4>Add a Review</h4>
//               <textarea
//                 value={newReview}
//                 onChange={(e) => setNewReview(e.target.value)}
//                 placeholder="Write your review here..."
//                 rows="4"
//                 className="review-textarea"
//               />
//               <div className="rating-input">
//                 <label>Rating:</label>
//                 <select value={rating} onChange={(e) => setRating(parseInt(e.target.value, 10))}>
//                   {[1, 2, 3, 4, 5].map(num => (
//                     <option key={num} value={num}>{num} ★</option>
//                   ))}
//                 </select>
//               </div>
//               <Button className="btn btn-primary mt-2" onClick={submitReview}>Submit Review</Button>
//             </div>
//           </div>
//         </div>
//         <div className="row mt-4">
//           <div className="col-md-12">
//             <div className="card p-3 customer-reviews">
//               <h4>Customer Reviews</h4>
//               <Rating
//                 value={averageRating}
//                 edit={false}
//                 size={24}
//                 activeColor="#ffd700"
//               />
//               <div className="reviews-list">
//                 {reviews.length === 0 ? (
//                   <p>No reviews yet.</p>
//                 ) : (
//                   reviews.map((rev, index) => (
//                     <div key={index} className="review-item">
//                       <p><strong>{rev.userId.firstName} {rev.userId.lastName}</strong></p>
//                       <p><strong>Rating:</strong> {rev.rating} ★</p>
//                       <p>{rev.comment}</p>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row mt-4">
//           <div className="col-md-12">
//             <div className="card p-3 additional-info">
//               <h4>Additional Information</h4>
//               <p><strong>Warranty: </strong>1 year</p>
//               <p><strong>Delivery Options: </strong>Home Delivery, Store Pickup</p>
//               <p><strong>Return Policy: </strong>30-day return policy</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ViewProduct;


// ViewProduct.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleProduct, addToCartApi, getReviewsApi, addReviewApi, getUserProfileApi } from '../../apis/Api';
import Footer from '../../components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { Button, Image } from 'antd';
import Rating from 'react-rating-stars-component';
import styled from 'styled-components';
import './ViewProduct.css';
import DOMPurify from 'dompurify'; // Import DOMPurify

const PriceTag = styled.p`
  font-weight: bold;
  color: #1890ff;
`;

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(1);
  const [averageRating, setAverageRating] = useState(0);
  const [user, setUser] = useState({
    fullName: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    fetchSingleProduct();
    fetchReviews();
    fetchUserProfile();
  }, [id]);

  const fetchSingleProduct = () => {
    getSingleProduct(id)
      .then((res) => {
        // Sanitize product data received from backend before setting state
        const sanitizedProduct = {
          ...res.data.product,
          productName: DOMPurify.sanitize(res.data.product.productName),
          productCategory: DOMPurify.sanitize(res.data.product.productCategory),
          productDescription: DOMPurify.sanitize(res.data.product.productDescription),
          productImage: DOMPurify.sanitize(res.data.product.productImage),
          // Add other fields as necessary
        };
        setProduct(sanitizedProduct);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error fetching product data');
      });
  };

  const fetchReviews = async () => {
    try {
      const res = await getReviewsApi(id);
      // Sanitize each review received from backend
      const sanitizedReviews = res.data.reviews.map(review => ({
        ...review,
        comment: DOMPurify.sanitize(review.comment),
        userId: {
          ...review.userId,
          firstName: DOMPurify.sanitize(review.userId.firstName),
          lastName: DOMPurify.sanitize(review.userId.lastName),
          // Add other user fields if necessary
        },
      }));
      setReviews(sanitizedReviews);
      calculateAverageRating(sanitizedReviews);
    } catch (err) {
      toast.error("Failed to fetch reviews");
    }
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      setAverageRating(0);
      return;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    setAverageRating(totalRating / reviews.length);
  };

  const fetchUserProfile = () => {
    getUserProfileApi()
      .then((res) => {
        // Sanitize user profile data before setting state
        const sanitizedFullName = DOMPurify.sanitize(`${res.data.firstName} ${res.data.lastName}`);
        const sanitizedPhoneNumber = DOMPurify.sanitize(res.data.phone);
        setUser({
          ...user,
          fullName: sanitizedFullName,
          phoneNumber: sanitizedPhoneNumber,
          // Sanitize other fields if necessary
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error fetching user profile');
      });
  };

  const handleAddToCart = async () => {
    try {
      const total = quantity * product.productPrice;
      await addToCartApi({
        productId: product._id,
        quantity: quantity,
        total: total
      });
      toast.success("Added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add to cart.");
      throw error;
    }
  };

  const handleProceedToPayment = async () => {
    try {
      // Ensure item is added to cart before navigating
      await handleAddToCart();
      navigate('/my_cart');
    } catch (error) {
      console.error('Error proceeding to payment:', error);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Sanitize user input before setting state
    const sanitizedValue = DOMPurify.sanitize(value);
    setUser({ ...user, [name]: sanitizedValue });
  };

  const submitReview = async () => {
    if (!rating || !newReview) {
      toast.error("Please provide both rating and comment");
      return;
    }

    // Sanitize the newReview before sending to backend
    const sanitizedReview = DOMPurify.sanitize(newReview);

    try {
      const res = await addReviewApi({ productId: id, rating, comment: sanitizedReview });
      toast.success(res.data.message);
      setRating(1); // Reset rating
      setNewReview(""); // Reset comment
      fetchReviews(); // Fetch reviews again after submission
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to submit review");
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Image
              src={`https://localhost:5000/products/${product.productImage}`}
              alt={product.productName}
              className="img-fluid product-image"
              preview={false}
            />
          </div>
          <div className="col-md-6">
            <div className="card p-3 product-details">
              <h2>{product.productName}</h2>
              <PriceTag>Rs {product.productPrice}</PriceTag>
              <h5>Category: {product.productCategory}</h5>
              <p><strong>Description: </strong>{product.productDescription}</p>
              <p><strong>Date Added: </strong>{new Date(product.createdAt).toLocaleDateString()}</p>
              <p><strong>Status: </strong>Available</p>
              <p><strong>Views: </strong>{product.views}</p>
              <div className="mt-3">
                <div className="quantity-selector">
                  <Button onClick={decreaseQuantity} type="primary">-</Button>
                  <span>{quantity}</span>
                  <Button onClick={increaseQuantity} type="primary">+</Button>
                </div>
                <Button onClick={handleAddToCart} type="primary" className="me-2">Add to Cart</Button>
                <Button onClick={handleProceedToPayment} type="primary">Buy Now</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card p-3 review-section">
              <h4>Add a Review</h4>
              <textarea
                value={newReview}
                onChange={(e) => {
                  // Sanitize input on change
                  const sanitizedValue = DOMPurify.sanitize(e.target.value);
                  setNewReview(sanitizedValue);
                }}
                placeholder="Write your review here..."
                rows="4"
                className="review-textarea"
              />
              <div className="rating-input">
                <label>Rating:</label>
                <select value={rating} onChange={(e) => setRating(parseInt(e.target.value, 10))}>
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} ★</option>
                  ))}
                </select>
              </div>
              <Button className="btn btn-primary mt-2" onClick={submitReview}>Submit Review</Button>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card p-3 customer-reviews">
              <h4>Customer Reviews</h4>
              <Rating
                value={averageRating}
                edit={false}
                size={24}
                activeColor="#ffd700"
              />
              <div className="reviews-list">
                {reviews.length === 0 ? (
                  <p>No reviews yet.</p>
                ) : (
                  reviews.map((rev, index) => (
                    <div key={index} className="review-item">
                      <p><strong>{rev.userId.firstName} {rev.userId.lastName}</strong></p>
                      <p><strong>Rating:</strong> {rev.rating} ★</p>
                      <p>{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card p-3 additional-info">
              <h4>Additional Information</h4>
              <p><strong>Warranty: </strong>1 year</p>
              <p><strong>Delivery Options: </strong>Home Delivery, Store Pickup</p>
              <p><strong>Return Policy: </strong>30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewProduct;
