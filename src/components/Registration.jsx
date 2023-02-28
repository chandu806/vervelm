import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './Registration.module.css'

export const Registration = () => {
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        mobile: "",
        password: "",
        cnfrmPassword: ""
    })
    const [errors, setErrors] = useState({
        username: "e",
        email: "e",
        mobile: "e",
        password: "e",
        cnfrmPassword: "e",
    })
    const navigate = useNavigate()

    //to handel all onChanges of signup page.
    const handleOnChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.className]: e.target.value,
        })
    }

    //to handel signup page.
    const handeleSignup = async (event) => {
        event.preventDefault();

        setErrors({
            ...errors,
            username: userDetails.username,
            email: userDetails.email,
            mobile: userDetails.mobile,
            password: userDetails.password,
            cnfrmPassword: userDetails.cnfrmPassword
        });

        if (userDetails.username.trim() == "" || userDetails.email.trim() == "" || userDetails.mobile.trim() == "" || userDetails.password.trim() == "" || userDetails.cnfrmPassword.trim() == "" || userDetails.password.trim() != userDetails.cnfrmPassword.trim()) {
        }
        else {
            // deleting the confirm password propety;
            delete userDetails.cnfrmPassword;

            // posting the userdetails to server via REST api
            let result = await fetch('https://loginfr.herokuapp.com/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails)
            })
            result = await result.json();

            if (result.status) { // if submitted successfully
                alert(result.message);
                navigate('/login')
            } else {
                alert('Something went wrong!');
            }
        }

    }

    return (
        <div className={styles.signupDiv}>
            <form className={styles.form}>
                <div className={styles.form__body}>
                    <div className={styles.form__title}>
                        <p>Signup Page</p>
                    </div>
                    <div className={styles.userDiv}>
                        <label className={styles.form__label} htmlFor="username">User Name </label>
                        <input type="text" className='username' onChange={handleOnChange} errorMessage />
                        <div className={styles.errorDiv} hidden={errors.username.trim() == "" ? false : true}>user name is mandatory!</div>
                    </div>
                    <div className={styles.emailDiv}>
                        <label className={styles.form__label} htmlFor="email">Email </label>
                        <input type="text" className='email' onChange={handleOnChange} />
                        <div className={styles.errorDiv} hidden={errors.email.trim() == "" ? false : true}>email is mandatory!</div>
                    </div>
                    <div className={styles.phoneDiv}>
                        <label className={styles.form__label} htmlFor="mobile">Mobile Number </label>
                        <input type="text" className='mobile' onChange={handleOnChange} />
                        <div className={styles.errorDiv} hidden={errors.mobile.trim() == "" ? false : true}>mobile number is mandatory!</div>
                    </div>
                    <div className={styles.pwdDiv}>
                        <label className={styles.form__label} htmlFor="password">Password </label>
                        <input type="text" className='password' onChange={handleOnChange} />
                        <div className={styles.errorDiv} hidden={errors.password.trim() == "" ? false : true}>password is mandatory!</div>
                    </div>
                    <div className={styles.cPwdDiv}>
                        <label className={styles.form__label} htmlFor="confirm password">Confirm Password </label>
                        <input type="text" className='cnfrmPassword' onChange={handleOnChange} />
                        <div className={styles.errorDiv} hidden={errors.cnfrmPassword.trim() == "" ? false : true}>confirm password is mandatory!</div>
                        <div className={styles.errorDiv} hidden={errors.cnfrmPassword.trim() == errors.password.trim() ? true : false}>password and confirm password should be same!</div>
                    </div>
                    <div className={styles.footer}>
                        <button type="submit" className={styles.btn} onClick={handeleSignup}>Register</button>
                    </div>
                    <p>Already a user? <span className={styles.navLogin} onClick={() => navigate("/login")}>Sign in now</span> </p>
                </div>
            </form>
        </div >
    )
}
