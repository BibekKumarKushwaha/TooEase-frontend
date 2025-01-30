


// // Profile.js
// import React, { useState, useEffect } from 'react';
// import { getUserProfileApi, updateUserProfileApi } from '../apis/Api';
// import { toast } from 'react-toastify';
// import './Profile.css';

// const PASSWORD_POLICY = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// const Profile = () => {
//   const [user, setUser] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordStrength, setPasswordStrength] = useState({ percentage: 0, label: '' });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = () => {
//     getUserProfileApi()
//       .then((res) => {
//         setUser(res.data);
//         setFirstName(res.data.firstName);
//         setLastName(res.data.lastName);
//         setPhone(res.data.phone);
//       })
//       .catch(() => {
//         toast.error('Error fetching user data');
//       });
//   };

//   const evaluatePasswordStrength = (password) => {
//     let strength = { percentage: 0, label: 'Weak' };
//     if (password.length >= 8) strength.percentage += 25;
//     if (/[A-Z]/.test(password)) strength.percentage += 25; // Uppercase letter
//     if (/[a-z]/.test(password)) strength.percentage += 20; // Lowercase letter
//     if (/\d/.test(password)) strength.percentage += 15; // Number
//     if (/[@$!%*?&]/.test(password)) strength.percentage += 15; // Special character

//     if (strength.percentage <= 40) {
//       strength.label = 'Weak';
//     } else if (strength.percentage <= 75) {
//       strength.label = 'Strong';
//     } else if (strength.percentage === 100) {
//       strength.label = 'Very Strong';
//     }

//     setPasswordStrength(strength);
//   };

//   const validate = () => {
//     const validationErrors = {};
//     if (!PASSWORD_POLICY.test(password)) {
//       validationErrors.password =
//         'Password must be 8-20 characters long, include uppercase, lowercase, numbers, and special characters.';
//     }

//     setErrors(validationErrors);
//     return Object.keys(validationErrors).length === 0;
//   };

//   const handleUpdateProfile = (e) => {
//     e.preventDefault();
//     if (password && !validate()) {
//       return;
//     }

//     updateUserProfileApi({ firstName, lastName, phone, password })
//       .then((res) => {
//         toast.success('Profile updated successfully');
//         // Option 1: If API returns the updated user data
//         if (res.data && res.data.firstName) {
//           setUser(res.data);
//           setFirstName(res.data.firstName);
//           setLastName(res.data.lastName);
//           setPhone(res.data.phone);
//         } else {
//           // Option 2: If API does not return user data, fetch it again
//           fetchUserProfile();
//         }
//         setPassword(''); // Clear password field after successful update
//         setEditMode(false);
//       })
//       .catch((error) => {
//         const errorMessage =
//           error.response?.data?.message || 'Error updating profile';
//         toast.error(errorMessage);
//       });
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <div className="profile-header">
//           <img src="../assets/images/logo.png" alt="Company Logo" />
//           <h1>User Profile</h1>
//         </div>
//         {!editMode ? (
//           <div className="profile-info">
//             <div className="profile-row">
//               <label>First Name:</label>
//               <p>{user.firstName}</p>
//             </div>
//             <div className="profile-row">
//               <label>Last Name:</label>
//               <p>{user.lastName}</p>
//             </div>
//             <div className="profile-row">
//               <label>Email:</label>
//               <p>{user.email}</p>
//             </div>
//             <div className="profile-row">
//               <label>Phone:</label>
//               <p>{user.phone}</p>
//             </div>
//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-blue-500 text-white py-2 px-4 rounded"
//             >
//               Edit Profile
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={handleUpdateProfile} className="edit-profile-form">
//             <div className="form-group mb-4">
//               <label>First Name</label>
//               <input
//                 type="text"
//                 value={firstName}
//                 onChange={(e) => {
//                   setFirstName(e.target.value);
//                   if (errors.firstName) {
//                     setErrors((prevErrors) => ({ ...prevErrors, firstName: null }));
//                   }
//                 }}
//               />
//               {errors.firstName && <p className="error-msg">{errors.firstName}</p>}
//             </div>
//             <div className="form-group mb-4">
//               <label>Last Name</label>
//               <input
//                 type="text"
//                 value={lastName}
//                 onChange={(e) => {
//                   setLastName(e.target.value);
//                   if (errors.lastName) {
//                     setErrors((prevErrors) => ({ ...prevErrors, lastName: null }));
//                   }
//                 }}
//               />
//               {errors.lastName && <p className="error-msg">{errors.lastName}</p>}
//             </div>
//             <div className="form-group mb-4">
//               <label>Phone</label>
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={(e) => {
//                   setPhone(e.target.value);
//                   if (errors.phone) {
//                     setErrors((prevErrors) => ({ ...prevErrors, phone: null }));
//                   }
//                 }}
//               />
//               {errors.phone && <p className="error-msg">{errors.phone}</p>}
//             </div>
//             <div className="form-group mb-4">
//               <label>Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   evaluatePasswordStrength(e.target.value);
//                   if (errors.password) {
//                     setErrors((prevErrors) => ({ ...prevErrors, password: null }));
//                   }
//                 }}
//               />
//               {errors.password && <p className="error-msg">{errors.password}</p>}
//               <div className="password-strength-bar">
//                 <div
//                   className={`password-strength-fill ${passwordStrength.label.replace(' ', '-').toLowerCase()}`}
//                   style={{ width: `${passwordStrength.percentage}%` }}
//                 >
//                   <span>{passwordStrength.percentage}%</span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={() => setEditMode(false)}
//                 className="bg-gray-500 text-white py-2 px-4 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white py-2 px-4 rounded"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;



// Profile.js
import React, { useState, useEffect } from 'react';
import { getUserProfileApi, updateUserProfileApi } from '../apis/Api';
import { toast } from 'react-toastify';
import './Profile.css';
import DOMPurify from 'dompurify'; // Import DOMPurify

const PASSWORD_POLICY = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

const Profile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ percentage: 0, label: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = () => {
    getUserProfileApi()
      .then((res) => {
        // Sanitize data received from backend before setting state
        const sanitizedData = {
          firstName: DOMPurify.sanitize(res.data.firstName),
          lastName: DOMPurify.sanitize(res.data.lastName),
          phone: DOMPurify.sanitize(res.data.phone),
          email: DOMPurify.sanitize(res.data.email),
          // Include other fields as necessary
        };
        setUser(sanitizedData);
        setFirstName(sanitizedData.firstName);
        setLastName(sanitizedData.lastName);
        setPhone(sanitizedData.phone);
      })
      .catch(() => {
        toast.error('Error fetching user data');
      });
  };

  const evaluatePasswordStrength = (password) => {
    let strength = { percentage: 0, label: 'Weak' };
    if (password.length >= 8) strength.percentage += 25;
    if (/[A-Z]/.test(password)) strength.percentage += 25; // Uppercase letter
    if (/[a-z]/.test(password)) strength.percentage += 20; // Lowercase letter
    if (/\d/.test(password)) strength.percentage += 15; // Number
    if (/[@$!%*?&]/.test(password)) strength.percentage += 15; // Special character

    if (strength.percentage <= 40) {
      strength.label = 'Weak';
    } else if (strength.percentage <= 75) {
      strength.label = 'Strong';
    } else if (strength.percentage === 100) {
      strength.label = 'Very Strong';
    }

    setPasswordStrength(strength);
  };

  const validate = () => {
    const validationErrors = {};
    if (!PASSWORD_POLICY.test(password)) {
      validationErrors.password =
        'Password must be 8-20 characters long, include uppercase, lowercase, numbers, and special characters.';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password && !validate()) {
      return;
    }

    // Sanitize inputs before sending to backend
    const sanitizedFirstName = DOMPurify.sanitize(firstName);
    const sanitizedLastName = DOMPurify.sanitize(lastName);
    const sanitizedPhone = DOMPurify.sanitize(phone);
    const sanitizedPassword = DOMPurify.sanitize(password);

    updateUserProfileApi({ firstName: sanitizedFirstName, lastName: sanitizedLastName, phone: sanitizedPhone, password: sanitizedPassword })
      .then((res) => {
        toast.success('Profile updated successfully');
        // Option 1: If API returns the updated user data
        if (res.data && res.data.firstName) {
          const sanitizedData = {
            firstName: DOMPurify.sanitize(res.data.firstName),
            lastName: DOMPurify.sanitize(res.data.lastName),
            phone: DOMPurify.sanitize(res.data.phone),
            email: DOMPurify.sanitize(res.data.email),
            // Include other fields as necessary
          };
          setUser(sanitizedData);
          setFirstName(sanitizedData.firstName);
          setLastName(sanitizedData.lastName);
          setPhone(sanitizedData.phone);
        } else {
          // Option 2: If API does not return user data, fetch it again
          fetchUserProfile();
        }
        setPassword(''); // Clear password field after successful update
        setEditMode(false);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || 'Error updating profile';
        toast.error(errorMessage);
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src="../assets/images/logo.png" alt="Company Logo" />
          <h1>User Profile</h1>
        </div>
        {!editMode ? (
          <div className="profile-info">
            <div className="profile-row">
              <label>First Name:</label>
              <p>{user.firstName}</p>
            </div>
            <div className="profile-row">
              <label>Last Name:</label>
              <p>{user.lastName}</p>
            </div>
            <div className="profile-row">
              <label>Email:</label>
              <p>{user.email}</p>
            </div>
            <div className="profile-row">
              <label>Phone:</label>
              <p>{user.phone}</p>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} className="edit-profile-form">
            <div className="form-group mb-4">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  // Sanitize input on change
                  const sanitizedValue = DOMPurify.sanitize(e.target.value);
                  setFirstName(sanitizedValue);
                  if (errors.firstName) {
                    setErrors((prevErrors) => ({ ...prevErrors, firstName: null }));
                  }
                }}
              />
              {errors.firstName && <p className="error-msg">{errors.firstName}</p>}
            </div>
            <div className="form-group mb-4">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  // Sanitize input on change
                  const sanitizedValue = DOMPurify.sanitize(e.target.value);
                  setLastName(sanitizedValue);
                  if (errors.lastName) {
                    setErrors((prevErrors) => ({ ...prevErrors, lastName: null }));
                  }
                }}
              />
              {errors.lastName && <p className="error-msg">{errors.lastName}</p>}
            </div>
            <div className="form-group mb-4">
              <label>Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  // Sanitize input on change
                  const sanitizedValue = DOMPurify.sanitize(e.target.value);
                  setPhone(sanitizedValue);
                  if (errors.phone) {
                    setErrors((prevErrors) => ({ ...prevErrors, phone: null }));
                  }
                }}
              />
              {errors.phone && <p className="error-msg">{errors.phone}</p>}
            </div>
            <div className="form-group mb-4">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  // Sanitize input on change
                  const sanitizedValue = DOMPurify.sanitize(e.target.value);
                  setPassword(sanitizedValue);
                  evaluatePasswordStrength(sanitizedValue);
                  if (errors.password) {
                    setErrors((prevErrors) => ({ ...prevErrors, password: null }));
                  }
                }}
              />
              {errors.password && <p className="error-msg">{errors.password}</p>}
              <div className="password-strength-bar">
                <div
                  className={`password-strength-fill ${passwordStrength.label.replace(' ', '-').toLowerCase()}`}
                  style={{ width: `${passwordStrength.percentage}%` }}
                >
                  <span>{passwordStrength.percentage}%</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
