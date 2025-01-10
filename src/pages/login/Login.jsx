// import React, { useState } from "react";
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { loginUserApi } from "../../apis/Api";
// import NavbarSwitch from '../../components/NavbarSwitch';
// import './Login.css'; 
// import { useNavigate } from "react-router-dom";


// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const navigate = useNavigate();
//     const validation = () => {
//         let isValid = true;
//         if (email.trim() === '' || !email.includes('@')) {
//             setEmailError("Email is empty or invalid");
//             isValid = false;
//         }
//         if (password.trim() === '') {
//             setPasswordError("Password is empty");
//             isValid = false;
//         }
//         return isValid;
//     }
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         if (!validation()) {
//             return;
//         }
//         const data = {
//             "email": email,
//             "password": password
//         }
//         try {
//             const res = await loginUserApi(data);
//             if (res.data.success === false) {
//                 toast.error(res.data.message);
//             } else {
//                 toast.success(res.data.message);
//                 localStorage.setItem('token', res.data.token);
//                 const convertedData = JSON.stringify(res.data.userData);
//                 localStorage.setItem('user', convertedData);
//               if(res.data.userData.isAdmin){
//                 window.location.href = '/admindashboard';
//               }else{
//                 window.location.href = '/dashboard';
//               }
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 toast.error(error.response.data.message || "User does not exist!");
//             } else {
//                 toast.error("An unexpected error occurred. Please try again later.");
//             }
//         }
//     }

//     const handleCreateAccount = () => {
//         navigate('/register');
//     }

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
//                             type="text"
//                             className="input-field"
//                             placeholder="Email Address"
//                         />
//                         {emailError && <p className="error-msg">{emailError}</p>}
//                         <label>Password</label>
//                         <input
//                             onChange={(e) => setPassword(e.target.value)}
//                             type="password"
//                             className="input-field"
//                             placeholder="Password"
//                         />
//                         {passwordError && <p class="error-msg">{passwordError}</p>}
//                         <div className="form-actions">
//                             <div className="remember-me">
//                                 <input type="checkbox" id="rememberMe" />
//                                 <label htmlFor="rememberMe">Remember Me</label>
//                             </div>
//                             <button type="button" className="forgot-password" onClick={() => navigate('/forgot_password')}>Forgot Password?</button>
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
// }
// export default Login;


import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginUserApi } from "../../apis/Api";
import NavbarSwitch from '../../components/NavbarSwitch';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    // Validation function
    const validation = () => {
        let isValid = true;
        if (email.trim() === '' || !email.includes('@')) {
            setEmailError("Email is empty or invalid");
            isValid = false;
        }
        if (password.trim() === '') {
            setPasswordError("Password is empty");
            isValid = false;
        }
        return isValid;
    };

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validation()) {
            return;
        }
        const data = {
            "email": email,
            "password": password
        };
        try {
            const res = await loginUserApi(data);
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                localStorage.setItem('token', res.data.token);
                const convertedData = JSON.stringify(res.data.userData);
                localStorage.setItem('user', convertedData);
                if(res.data.userData.isAdmin){
                    window.location.href = '/admindashboard';
                } else {
                    window.location.href = '/dashboard';
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message || "User does not exist!");
            } else {
                toast.error("An unexpected error occurred. Please try again later.");
            }
        }
    };

    // Handle Create Account
    const handleCreateAccount = () => {
        navigate('/register');
    };

    // Handle Forgot Password Link Click
    const handleForgotPasswordClick = () => {
        navigate('/forgot-password'); // Navigate to forgot-password page
    };

    return (
        <>
            <NavbarSwitch />
            <div className="login-container">
                <div className="login-form">
                    <h1 className="login-heading">Welcome Back </h1>
                    <p className="login-subheading">To keep connected with us please login with your personal information by email address and password</p>
                    <form className="form">
                        <label>Email Address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="input-field"
                            placeholder="Email Address"
                        />
                        {emailError && <p className="error-msg">{emailError}</p>}
                        <label>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="input-field"
                            placeholder="Password"
                        />
                        {passwordError && <p className="error-msg">{passwordError}</p>}
                        <div className="form-actions">
                            <div className="remember-me">
                                <input type="checkbox" id="rememberMe" />
                                <label htmlFor="rememberMe">Remember Me</label>
                            </div>
                            {/* Forgot Password Link */}
                            <button
                                type="button"
                                className="forgot-password"
                                onClick={handleForgotPasswordClick} // Trigger navigation to Forgot Password page
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <button onClick={handleLogin} className="login-btn">Login Now</button>
                        <button type="button" onClick={handleCreateAccount} className="create-account-btn">Create Account</button>
                    </form>
                    <div className="social-login">
                        <p>Or you can join with</p>
                        <div className="social-icons">
                            <button type="button" onClick={() => alert("Google login clicked")}><img src="../assets/images/google_logo.jpg" alt="Google" /></button>
                            <button type="button" onClick={() => alert("Facebook login clicked")}><img src="../assets/images/fb_logo.png" alt="Facebook" /></button>
                            <button type="button" onClick={() => alert("Twitter login clicked")}><img src="../assets/images/twitter_logo.png" alt="Twitter" /></button>
                        </div>
                    </div>
                </div>
                <div className="login-image">
                    <img src="../assets/images/ecom.png" alt="Login" />
                </div>
            </div>
        </>
    );
};

export default Login;
