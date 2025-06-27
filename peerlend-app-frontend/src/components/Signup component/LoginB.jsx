import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Toast from './Toast.jsx';
import {useDispatch} from 'react-redux';
import { addEmailToStore, addUpiIdToStore } from '../../state/action-creators/index.js';

const LoginB = () => {

    const dispatch = useDispatch();



    const navigate = useNavigate();

    const [showToast, setShowToast] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        console.log("Email:", email);
        console.log("Password:", password);

        axios.post('http://localhost:3000/api/login',
            {
                email: email,
                password: password
            })
            .then(response => {
                console.log("Login successful:", response.data);
                dispatch(addUpiIdToStore(response.data.upiId)); // Dispatch action to add UPI ID to store
                dispatch(addEmailToStore(response.data.userEmail));
                localStorage.setItem('upiId', response.data.upiId); // Store email in local storage
                navigate('/dashboard', { state: { showToast: true } });
            
            })
            .catch(error => {
                console.error("Error during signup:", error);
            });

        // Reset the form after submission
        e.target.reset();
    }

    return (
        <>

            <section class="">
                <div class="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        PeerLend
                    </a>
                    <div class="w-full bg-gray-100 rounded-lg md:mt-0 sm:max-w-md">
                        <div class="p-6 space-y-1 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold tracking-tight md:text-2xl">
                                Login as a Borrower
                                <p class="mb-4 text-[16px] mt-2">Are you a Lenderer? <Link to="/login-len"><a class="hover:underline">Login here</a></Link></p>
                            </h1>
                            

                            <form class="space-y-4 md:space-y-6" action="#" onSubmit={(e) => handleLogin(e)}>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
                                    <input type="email" name="email" id="email" class=" bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium ">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                {/* <div>
                                    <label for="confirm-password" class="block mb-2 text-sm font-medium ">Confirm password</label>
                                    <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div> */}

                                <button type="submit" class="w-full text-white block py-2 px-5 rounded-lg bg-[#192ecd] rounded-4xl hover:bg-[#1d4be1]">Login</button>
                                <Toast
                                    message="Login successful!"
                                    show={showToast}
                                    onClose={() => setShowToast(false)}
                                />
                                <p class="text-sm font-light">
                                    New here? <Link to="/signup"> <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Create an Account</a></Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default LoginB