

// import React, { useState } from "react";
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import ReCAPTCHA from 'react-google-recaptcha';
// import { loginUserApi } from "../../apis/Api";
// import NavbarSwitch from '../../components/NavbarSwitch';
// import './Login.css'; 

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [captchaToken, setCaptchaToken] = useState(null); // Captcha token state
//     const navigate = useNavigate();

//     // Validation function
//     const validation = () => {
//         let isValid = true;
//         if (email.trim() === '' || !email.includes('@')) {
//             setEmailError("Email is empty or invalid");
//             isValid = false;
//         } else {
//             setEmailError('');
//         }
//         if (password.trim() === '') {
//             setPasswordError("Password is empty");
//             isValid = false;
//         } else {
//             setPasswordError('');
//         }
//         if (!captchaToken) {
//             toast.error("Captcha validation is required!");
//             isValid = false;
//         }
//         return isValid;
//     };

//     // Handle Login
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         if (!validation()) {
//             return;
//         }
//         const data = {
//             email,
//             password,
//             captchaToken, // Include captcha token in the request
//         };
//         try {
//             const res = await loginUserApi(data);
//             if (res.data.success === false) {
//                 toast.error(res.data.message);
//             } else {
//                 toast.success(res.data.message);
//                 localStorage.setItem('token', res.data.token);
//                 const convertedData = JSON.stringify(res.data.userData);
//                 localStorage.setItem('user', convertedData);
//                 if (res.data.userData.isAdmin) {
//                     window.location.href = '/admindashboard';
//                 } else {
//                     window.location.href = '/dashboard';
//                 }
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 toast.error(error.response.data.message || "User does not exist!");
//             } else {
//                 toast.error("An unexpected error occurred. Please try again later.");
//             }
//         }
//     };

//     // Handle Captcha Change
//     const handleCaptchaChange = (token) => {
//         setCaptchaToken(token);
//     };

//     // Handle Create Account
//     const handleCreateAccount = () => {
//         navigate('/register');
//     };

//     // Handle Forgot Password Link Click
//     const handleForgotPasswordClick = () => {
//         navigate('/forgot_password');
//     };

//     return (
//         <>
//             <NavbarSwitch />
//             <div className="login-container">
//                 <div className="login-form">
//                     <h1 className="login-heading">Welcome Back </h1>
//                     <p className="login-subheading">To keep connected with us please login with your personal information by email address and password</p>
//                     <form className="form">
//                         <label>Email Address</label>
//                         <input
//                             onChange={(e) => setEmail(e.target.value)}
//                             value={email}
//                             type="text"
//                             className="input-field"
//                             placeholder="Email Address"
//                         />
//                         {emailError && <p className="error-msg">{emailError}</p>}
                        
//                         <label>Password</label>
//                         <input
//                             onChange={(e) => setPassword(e.target.value)}
//                             value={password}
//                             type="password"
//                             className="input-field"
//                             placeholder="Password"
//                         />
//                         {passwordError && <p className="error-msg">{passwordError}</p>}

//                         <div className="captcha-container">
//                             <ReCAPTCHA
//                                 sitekey="6LcZbb8qAAAAAK1Ik3xs59Lny8erLjrEzgeBttrd" // Your site key
//                                 onChange={handleCaptchaChange}
//                             />
//                         </div>

//                         <div className="form-actions">
//                             <div className="remember-me">
//                                 <input type="checkbox" id="rememberMe" />
//                                 <label htmlFor="rememberMe">Remember Me</label>
//                             </div>
//                             <button
//                                 type="button"
//                                 className="forgot-password"
//                                 onClick={handleForgotPasswordClick}
//                             >
//                                 Forgot Password?
//                             </button>
//                         </div>
//                         <button onClick={handleLogin} className="login-btn">Login Now</button>
//                         <button type="button" onClick={handleCreateAccount} className="create-account-btn">Create Account</button>
//                     </form>
//                     <div className="social-login">
//                         <p>Or you can join with</p>
//                         <div className="social-icons">
//                             <button type="button" onClick={() => alert("Google login clicked")}><img src="../assets/images/google_logo.jpg" alt="Google" /></button>
//                             <button type="button" onClick={() => alert("Facebook login clicked")}><img src="../assets/images/fb_logo.png" alt="Facebook" /></button>
//                             <button type="button" onClick={() => alert("Twitter login clicked")}><img src="../assets/images/twitter_logo.png" alt="Twitter" /></button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="login-image">
//                     <img src="../assets/images/ecom.png" alt="Login" />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;

// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import ReCAPTCHA from "react-google-recaptcha";
// import { loginUserApi } from "../../apis/Api";
// import NavbarSwitch from "../../components/NavbarSwitch";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [captchaToken, setCaptchaToken] = useState(null);
//   const [remainingAttempts, setRemainingAttempts] = useState(null); // For tracking attempts
//   const [lockTime, setLockTime] = useState(null); // Lockout time in seconds
//   const [timer, setTimer] = useState(null); // Countdown timer
//   const navigate = useNavigate();

//   // Validation function
//   const validation = () => {
//     let isValid = true;
//     if (email.trim() === "" || !email.includes("@")) {
//       setEmailError("Email is empty or invalid");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }
//     if (password.trim() === "") {
//       setPasswordError("Password is empty");
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }
//     if (!captchaToken) {
//       toast.error("Captcha validation is required!");
//       isValid = false;
//     }
//     return isValid;
//   };

//   // Start the countdown timer for lockout
//   const startCountdown = (lockDuration) => {
//     let remainingTime = lockDuration; // Duration in seconds
//     setTimer(remainingTime);
//     const interval = setInterval(() => {
//       remainingTime -= 1;
//       setTimer(remainingTime);
//       if (remainingTime <= 0) {
//         clearInterval(interval);
//         setTimer(null);
//         setLockTime(null);
//       }
//     }, 1000);
//   };

//   // Handle Login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validation()) {
//       return;
//     }
//     const data = {
//       email,
//       password,
//       captchaToken, // Include captcha token in the request
//     };
//     try {
//       const res = await loginUserApi(data);
//       if (res.data.success === false) {
//         if (res.status === 403) {
//           if (res.data.remainingTime) {
//             setLockTime(res.data.remainingTime);
//             startCountdown(res.data.remainingTime);
//           }
//           if (res.data.remainingAttempts !== undefined) {
//             setRemainingAttempts(res.data.remainingAttempts);
//           }
//           toast.error(res.data.message); // Display lockout message
//         } else {
//           toast.error(res.data.message);
//         }
//       } else {
//         toast.success(res.data.message);
//         localStorage.setItem("token", res.data.token);
//         const convertedData = JSON.stringify(res.data.userData);
//         localStorage.setItem("user", convertedData);
//         if (res.data.userData.isAdmin) {
//           window.location.href = "/admindashboard";
//         } else {
//           window.location.href = "/dashboard";
//         }
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         toast.error(error.response.data.message || "User does not exist!");
//       } else if (error.response && error.response.status === 403) {
//         toast.error(error.response.data.message || "Account is locked!");
//       } else {
//         toast.error("An unexpected error occurred. Please try again later.");
//       }
//     }
//   };

//   // Handle Captcha Change
//   const handleCaptchaChange = (token) => {
//     setCaptchaToken(token);
//   };

//   // Handle Create Account
//   const handleCreateAccount = () => {
//     navigate("/register");
//   };

//   // Handle Forgot Password Link Click
//   const handleForgotPasswordClick = () => {
//     navigate("/forgot_password");
//   };

//   return (
//     <>
//       <NavbarSwitch />
//       <div className="login-container">
//         <div className="login-form">
//           <h1 className="login-heading">Welcome Back</h1>
//           <p className="login-subheading">
//             To keep connected with us please login with your personal information by email
//             address and password
//           </p>
//           {/* Display lockout timer */}
//           {lockTime && (
//             <div className="lock-message">
//               <p>
//                 Your account is locked. Try again in{" "}
//                 <span className="lock-timer">{timer}s</span>.
//               </p>
//             </div>
//           )}
//           {/* Display remaining attempts */}
//           {remainingAttempts !== null && !lockTime && (
//             <div className="attempts-message">
//               <p>You have {remainingAttempts} login attempt(s) remaining.</p>
//             </div>
//           )}
//           <form className="form">
//             <label>Email Address</label>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               type="text"
//               className="input-field"
//               placeholder="Email Address"
//             />
//             {emailError && <p className="error-msg">{emailError}</p>}

//             <label>Password</label>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               type="password"
//               className="input-field"
//               placeholder="Password"
//             />
//             {passwordError && <p className="error-msg">{passwordError}</p>}

//             <div className="captcha-container">
//               <ReCAPTCHA
//                 sitekey="6LcZbb8qAAAAAK1Ik3xs59Lny8erLjrEzgeBttrd" // Your site key
//                 onChange={handleCaptchaChange}
//               />
//             </div>

//             <div className="form-actions">
//               <div className="remember-me">
//                 <input type="checkbox" id="rememberMe" />
//                 <label htmlFor="rememberMe">Remember Me</label>
//               </div>
//               <button
//                 type="button"
//                 className="forgot-password"
//                 onClick={handleForgotPasswordClick}
//               >
//                 Forgot Password?
//               </button>
//             </div>
//             <button onClick={handleLogin} className="login-btn" disabled={!!lockTime}>
//               Login Now
//             </button>
//             <button
//               type="button"
//               onClick={handleCreateAccount}
//               className="create-account-btn"
//             >
//               Create Account
//             </button>
//           </form>
//         </div>
//         <div className="login-image">
//           <img src="../assets/images/ecom.png" alt="Login" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { loginUserApi } from "../../apis/Api";
import NavbarSwitch from "../../components/NavbarSwitch";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [notification, setNotification] = useState(""); // Notification for user feedback
  const [lockTime, setLockTime] = useState(null); // Lockout time in seconds
  const [timer, setTimer] = useState(null); // Countdown timer
  const navigate = useNavigate();

  // Validation function
  const validation = () => {
    let isValid = true;
    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (password.trim() === "") {
      setPasswordError("Password is empty");
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (!captchaToken) {
      setNotification("Captcha validation is required!");
      isValid = false;
    } else {
      setNotification(""); // Clear any previous notifications
    }
    return isValid;
  };

  // Start the countdown timer for lockout
  const startCountdown = (lockDuration) => {
    let remainingTime = lockDuration; // Duration in seconds
    setTimer(remainingTime);
    const interval = setInterval(() => {
      remainingTime -= 1;
      setTimer(remainingTime);
      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimer(null);
        setLockTime(null);
        setNotification(""); // Clear lockout notification
      }
    }, 1000);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validation()) {
      return;
    }
    const data = {
      email,
      password,
      captchaToken, // Include captcha token in the request
    };
    try {
      const res = await loginUserApi(data);
      if (!res.data.success) {
        if (res.status === 403) {
          // Handle lockout
          if (res.data.remainingTime) {
            setLockTime(res.data.remainingTime);
            startCountdown(res.data.remainingTime);
            setNotification("Account is locked. Please try again later.");
          }
        } else if (res.data.message === "Password not matched!") {
          // Handle incorrect password and remaining attempts
          const remainingAttempts = res.data.remainingAttempts;

          // Display only for 3, 2, or 1 attempts left
          if (remainingAttempts === 3 || remainingAttempts === 2 || remainingAttempts === 1) {
            setNotification(`Password not matched! ${remainingAttempts} attempt(s) left.`);
          } else if (remainingAttempts !== undefined) {
            setNotification("Password not matched!");
          }
        } else {
          setNotification(res.data.message);
        }
      } else {
        // Successful login
        setNotification("");
        localStorage.setItem("token", res.data.token);
        const convertedData = JSON.stringify(res.data.userData);
        localStorage.setItem("user", convertedData);
        if (res.data.userData.isAdmin) {
          window.location.href = "/admindashboard";
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNotification(error.response.data.message || "User does not exist!");
      } else if (error.response && error.response.status === 403) {
        setNotification(error.response.data.message || "Account is locked!");
      } else {
        setNotification("An unexpected error occurred. Please try again later.");
      }
    }
  };

  // Handle Captcha Change
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  // Handle Create Account
  const handleCreateAccount = () => {
    navigate("/register");
  };

  // Handle Forgot Password Link Click
  const handleForgotPasswordClick = () => {
    navigate("/forgot_password");
  };

  return (
    <>
      <NavbarSwitch />
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-heading">Welcome Back</h1>
          <p className="login-subheading">
            To keep connected with us please login with your personal information by email
            address and password
          </p>

          {/* Notification Message */}
          {notification && <div className="notification">{notification}</div>}

          {/* Display lockout timer */}
          {lockTime && (
            <div className="lock-message">
              <p>
                Your account is locked. Try again in{" "}
                <span className="lock-timer">{timer}s</span>.
              </p>
            </div>
          )}

          <form className="form">
            <label>Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              className="input-field"
              placeholder="Email Address"
            />
            {emailError && <p className="error-msg">{emailError}</p>}

            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="input-field"
              placeholder="Password"
            />
            {passwordError && <p className="error-msg">{passwordError}</p>}

            <div className="captcha-container">
              <ReCAPTCHA
                sitekey="6LcZbb8qAAAAAK1Ik3xs59Lny8erLjrEzgeBttrd" // Your site key
                onChange={handleCaptchaChange}
              />
            </div>

            <div className="form-actions">
              <div className="remember-me">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPasswordClick}
              >
                Forgot Password?
              </button>
            </div>
            <button onClick={handleLogin} className="login-btn" disabled={!!lockTime}>
              Login Now
            </button>
            <button
              type="button"
              onClick={handleCreateAccount}
              className="create-account-btn"
            >
              Create Account
            </button>
          </form>
        </div>
        <div className="login-image">
          <img src="../assets/images/ecom.png" alt="Login" />
        </div>
      </div>
    </>
  );
};

export default Login;
