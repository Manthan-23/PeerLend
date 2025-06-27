import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { addEmailToStore } from '../../state/action-creators';
import { useDispatch } from 'react-redux';

const SignupB = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        console.log("Email:", email);
        console.log("Password:", password);
        const toggleValue = document.getElementById('toggle').checked;

        axios.post('http://localhost:3000/api/signup',
            {
                email: email,
                password: password,
                toggleValue: toggleValue // Send toggle value to the backend
            })
            .then(response => {
                console.log("Signup successful:", response.data);
                navigate('/login'); // Redirect to login page after successful signup
            })
            .catch(error => {
                console.error("Error during signup:", error);
            });

        // Reset the form after submission
        e.target.reset();
    }

    const handleToggle = () => {
        const toggle = document.getElementById('toggle');
        console.log("Toggle checked:", toggle.checked);
        if (toggle.checked) {
            console.log("Toggle is ON"); 
        } else {
            console.log("Toggle is OFF");
        }
    };

    return (
        <>

            <section class="">
                <div class="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        PeerLend
                    </a>
                    <div class="w-full bg-gray-100 rounded-lg md:mt-0 sm:max-w-md">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold tracking-tight md:text-2xl">
                                Create an account
                            </h1>

                            <form class="space-y-4 md:space-y-6" action="#" onSubmit={(e) => handleSubmit(e)}>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
                                    <input type="email" name="email" id="email" class=" bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium ">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <div>
                                    <label for="confirm-password" class="block mb-2 text-sm font-medium ">Confirm password</label>
                                    <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>

                                <label class="inline-flex items-center cursor-pointer">
                                    <input id="toggle" type="checkbox" value="" class="sr-only peer" onClick={() => handleToggle()}/>
                                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                        <span class="mx-2 text-sm font-medium">Want to be a Lenderer? Toggle this👈</span>
                                </label>

                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50" required="" />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="terms" class="font-light">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" class="w-full text-white block py-2 px-5 rounded-lg bg-[#192ecd] rounded-4xl hover:bg-[#1d4be1]">Create an account</button>
                                <p class="text-sm font-light">
                                    Already have an account?<Link to="/login"><a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a></Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default SignupB