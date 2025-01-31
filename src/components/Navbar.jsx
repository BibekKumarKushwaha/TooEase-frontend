// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   const navigate = useNavigate();
//   // const user = JSON.parse(localStorage.getItem('user'));
//   const user =JSON.parse(localStorage.getItem('user'));
//   const [welcomeMessage, setWelcomeMessage] = useState('');

//   useEffect(() => {
//     if (user) {
//       // Fetch additional data if needed
//       const fetchUserData = async () => {
//         try {
//           const response = await fetch(`https://localhost:3000/user/${user._id}`);
//           if (!response.ok) throw new Error('Network response was not ok');
//           const data = await response.json();
//           setWelcomeMessage(`Welcome back, ${data.firstName}!`);
//         } catch (error) {
//           console.log('Failed to fetch user data', error);
//         }
//       };
//       fetchUserData();
//     }
//   }, [user]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <div className="navbar-container">
//       <nav className="navbar">
//         <div className="navbar-left">
//           <Link className="navbar-logo-link" to="/">
//             <img src="../assets/images/logo.png" alt="Logo" className="navbar-logo" />
//             <span className="brand-name">
//               <span className="brand-highlight">Too</span> Ease
//             </span>
//           </Link>
//           <div className="navbar-links-left">
//             <Link className="nav-link" to="/">Home</Link>
//             <Link className="nav-link" to="/dashboard">Dashboard</Link>
//             {user && <Link className="nav-link" to="/profile">Profile</Link>}
//           </div>
//         </div>
//         <div className="navbar-links-right">
//           {user ? (
//             <div className="nav-item dropdown">
//               <button className="nav-link dropdown-toggle">
//                 <i className="fas fa-user mr-2"></i>
//                 {user.firstName}
//                 <div className="welcome-message">{welcomeMessage}</div>
//               </button>
//               <div className="dropdown-menu">
//                 <Link to='/my_cart' className="dropdown-item">
//                   <i className='fas fa-shopping-cart mr-2'></i> My Cart
//                 </Link>
//                 <Link to='/Favourites' className="dropdown-item">
//                   <i className='fas fa-shopping-cart mr-2'></i> Favourites
//                 </Link>
//                 <Link to='/orderlist' className="dropdown-item">
//                   <i className='fas fa-shopping-cart mr-2'></i> My orders
//                 </Link>
//                 <button onClick={handleLogout} className="dropdown-item">
//                   <i className="fas fa-sign-out-alt mr-2"></i> Logout
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <Link to="/login" className="nav-link">
//                 <i className="fas fa-sign-in-alt mr-2"></i> Login
//               </Link>
//               <Link to="/register" className="nav-link">
//                 <i className="fas fa-user-plus mr-2"></i> Register
//               </Link>
              
//             </>
//           )}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDetails, logoutUserApi } from '../apis/Api'; // Import logoutUserApi
import { toast } from 'react-toastify';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token'); // Get token from localStorage
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    if (user && user.id) { // Ensure user.id exists
      console.log("Fetching data for user ID:", user.id); // Log user ID
      const fetchUserData = async () => {
        try {
          const response = await getUserDetails(user.id);
          console.log("User details response:", response); // Log response
          if (response.status === 200 && response.data.success) {
            setWelcomeMessage(`Welcome back, ${response.data.user.firstName}!`);
          } else {
            throw new Error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Failed to fetch user data', error);
          setWelcomeMessage('');
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleLogout = async () => {
    if (!token) {
      // If no token is present, simply remove user and navigate to login
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }

    try {
      const response = await logoutUserApi();
      console.log("Logout response:", response); // Log logout response
      if (response.status === 200 && response.data.success) {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Remove token as well
        toast.success(response.data.message || 'Logged out successfully!');
        navigate('/login');
      } else {
        throw new Error(response.data.message || 'Logout failed');
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <Link className="navbar-logo-link" to="/">
            <img src="../assets/images/logo.png" alt="Logo" className="navbar-logo" />
            <span className="brand-name">
              <span className="brand-highlight">Too</span> Ease
            </span>
          </Link>
          <div className="navbar-links-left">
            {/* <Link className="nav-link" to="/">Home</Link> */}
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            {user && <Link className="nav-link" to="/profile">Profile</Link>}
          </div>
        </div>
        <div className="navbar-links-right"> 
          {user ? (
            <div className="nav-item dropdown">
              <button className="nav-link dropdown-toggle">
                <i className="fas fa-user mr-2"></i>
                {user.firstName}
                <div className="welcome-message">{welcomeMessage}</div>
              </button>
              <div className="dropdown-menu">
                <Link to='/my_cart' className="dropdown-item">
                  <i className='fas fa-shopping-cart mr-2'></i> My Cart
                </Link>
                <Link to='/Favourites' className="dropdown-item">
                  <i className='fas fa-shopping-cart mr-2'></i> Favourites
                </Link>
                <Link to='/orderlist' className="dropdown-item">
                  <i className='fas fa-shopping-cart mr-2'></i> My Orders
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                <i className="fas fa-sign-in-alt mr-2"></i> Login
              </Link>
              <Link to="/register" className="nav-link">
                <i className="fas fa-user-plus mr-2"></i> Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
