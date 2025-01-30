
// import React, { useState } from "react";
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
//   const [notification, setNotification] = useState(""); // Notification for user feedback
//   const [remainingAttempts, setRemainingAttempts] = useState(null); // Track remaining attempts
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
//       setNotification("Captcha validation is required!");
//       isValid = false;
//     } else {
//       setNotification(""); // Clear previous notifications
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
//         setNotification(""); // Clear lockout notification
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

//       if (!res.data.success) {
//         // Handle account lockout
//         if (res.status === 403) {
//           if (res.data.remainingTime) {
//             setLockTime(res.data.remainingTime);
//             startCountdown(res.data.remainingTime);
//             setNotification("Account is locked. Please try again later.");
//           }
//         } else if (res.data.message === "Password not matched!") {
//           // Handle incorrect password and remaining attempts
//           const attemptsLeft = res.data.remainingAttempts;

//           if (attemptsLeft !== undefined && attemptsLeft <= 3 && attemptsLeft > 0) {
//             setNotification(`Password not matched! ${attemptsLeft} attempt(s) left.`);
//           } else {
//             setNotification("Password not matched!");
//           }
//           setRemainingAttempts(attemptsLeft);
//         } else {
//           setNotification(res.data.message);
//         }
//       } else {
//         // Successful login
//         setNotification("");
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
//         setNotification(error.response.data.message || "User does not exist!");
//       } else if (error.response && error.response.status === 403) {
//         setNotification(error.response.data.message || "Account is locked!");
//       } else {
//         setNotification("An unexpected error occurred. Please try again later.");
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
//             address and password.
//           </p>

//           {/* Notification Message */}
//           {notification && <div className="notification">{notification}</div>}

//           {/* Display lockout timer */}
//           {lockTime && (
//             <div className="lock-message">
//               <p>
//                 Your account is locked. Try again in{" "}
//                 <span className="lock-timer">{timer}s</span>.
//               </p>
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
import { loginUserApi } from "../../apis/Api"; // Must have validateStatus: () => true
import NavbarSwitch from "../../components/NavbarSwitch";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [captchaToken, setCaptchaToken] = useState(null);
  const [notification, setNotification] = useState("");

  // For showing attempts left:
  const [remainingAttempts, setRemainingAttempts] = useState(null);

  // Lockout time in seconds:
  const [lockTime, setLockTime] = useState(null);

  // Timer countdown:
  const [timer, setTimer] = useState(null);

  const navigate = useNavigate();

  const validation = () => {
    let isValid = true;
    if (!email.trim() || !email.includes("@")) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is empty");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!captchaToken) {
      setNotification("Captcha validation is required!");
      isValid = false;
    } else {
      setNotification("");
    }

    return isValid;
  };

  // Start countdown for lockTime
  const startCountdown = (lockDuration) => {
    let remainingTime = lockDuration;
    setTimer(remainingTime);

    const interval = setInterval(() => {
      remainingTime -= 1;
      setTimer(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimer(null);
        setLockTime(null);
        // Optionally clear or update notification
        setNotification("");
      }
    }, 1000);
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validation()) return;

    const data = {
      email,
      password,
      captchaToken,
    };

    try {
      // This will not throw on 400/403 because of validateStatus
      const res = await loginUserApi(data);

      // Check status explicitly
      if (res.status === 200) {
        // Usually success => res.data.success === true
        if (res.data.success) {
          // Clear everything
          setNotification("");
          setRemainingAttempts(null);
          setLockTime(null);
          setTimer(null);

          // Save token/user
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.userData));

          // Redirect
          if (res.data.userData.isAdmin) {
            window.location.href = "/admin/dashboard";
          } else {
            window.location.href = "/dashboard";
          }
        } else {
          // Edge case: status=200 but success=false 
          setNotification(res.data.message || "Something went wrong!");
        }

      } else if (res.status === 400) {
        // Typically "Password not matched!" or "User does not exist!"
        // read res.data
        if (res.data.message === "Password not matched!") {
          const attemptsLeft = res.data.remainingAttempts;
          setRemainingAttempts(attemptsLeft);

          if (attemptsLeft > 0) {
            setNotification(`Password not matched! ${attemptsLeft} attempt(s) left.`);
          } else {
            setNotification("Password not matched!");
          }
        } else {
          // Could be 'User does not exist!'
          setNotification(res.data.message || "Login failed!");
        }

      } else if (res.status === 403) {
        // This is typically "Account locked due to multiple failed login attempts."
        // with a "remainingTime"
        if (res.data.remainingTime) {
          const lockDuration = res.data.remainingTime; // in seconds
          setLockTime(lockDuration);
          startCountdown(lockDuration);

          setNotification("Account is locked. Please try again later.");
        } else {
          setNotification(res.data.message || "Account is locked!");
        }

      } else {
        // Any other error status (500, etc.)
        setNotification(res.data.message || "An unexpected error occurred.");
      }
    } catch (error) {
      // This catch only triggers on network errors or unexpected code issues
      console.error(error);
      setNotification("A network error occurred. Please try again later.");
    }
  };

  // reCAPTCHA
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  // Create account
  const handleCreateAccount = () => {
    navigate("/register");
  };

  // Forgot password
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
            To keep connected with us please login with your personal information 
            by email address and password.
          </p>

          {notification && <div className="notification">{notification}</div>}

          {/* Show attempts left if not locked */}
          {remainingAttempts !== null && remainingAttempts > 0 && !lockTime && (
            <div className="attempts-left">
              You have {remainingAttempts} attempt(s) left before the account locks.
            </div>
          )}

          {/* If locked, show lock message & countdown */}
          {lockTime && timer && (
            <div className="lock-message">
              Your account is locked. Try again in 
              <span className="lock-timer"> {timer} </span> seconds.
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
                sitekey="6LcZbb8qAAAAAK1Ik3xs59Lny8erLjrEzgeBttrd"
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
