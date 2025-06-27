import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Toast from '../Signup component/Toast';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const Dashboard = () => {

    // const dispatch = useDispatch();

    // const state = useSelector(state => state.user);
    const emailState = useSelector(state => state.user.email);
    const upiIdState = useSelector(state => state.user.upiId);

    const location = useLocation();
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (location.state?.showToast) {
            setShowToast(true);
        }
    }, [location.state]);

    // useEffect(() => {
    //     axios.get(`http://localhost:3000/api/user/${userEmail}`)
    //         .then((response) => {
    //             console.log('Form data fetched successfully:', response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching form data:', error);
    //         });
    // }, []);
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUPIModalOpen, setIsUPIModalOpen] = useState(false);
    const [isUPIUpdateModalOpen, setIsUPIUpdateModalOpen] = useState(false);
    const [profileModal, setProfileModal] = useState(false);

    const handleOTPSubmit = () => {
        axios.post('http://localhost:3000/api/sendOTP', {
            email: emailState
        })
            .then((response) => {
                // console.log('OTP sent successfully:', response.data);
                // Close the modal after sending OTP
                // Optionally, you can show a success message or redirect the user


            })
            .catch((error) => {
                console.error('Error sending OTP:', error);
            });
    }

    const handleOTPVerify = () => {
        const otpInput = document.getElementById('otp-input').value;

        axios.post('http://localhost:3000/api/verifyOTP', {
            email: emailState,
            otp: otpInput
        })
            .then((response) => {
                console.log('OTP verified successfully:', response.data);
                // Close the modal after verifying OTP
                setIsModalOpen(false);
                setIsUPIModalOpen(true); // Open UPI PIN setup modal
                // Optionally, you can show a success message or redirect the user
            })
            .catch((error) => {
                console.error('Error verifying OTP:', error);
                alert('Invalid OTP. Please try again.');
            });
    };





    const handleUPISubmit = () => {

        const upiPin = document.getElementById('upi-pin').value;


        if (upiPin) {

            axios.put('http://localhost:3000/api/user/pin', {
                upiId: upiIdState,
                upiPin: upiPin
            })
                .then((response) => {
                    console.log('UPI PIN set successfully:', response.data);
                    setIsUPIModalOpen(false); // Close the UPI PIN setup modal
                    alert('UPI PIN set successfully!');
                })
                .catch((error) => {
                    console.error('Error setting UPI PIN:', error);
                });
        } else {
            alert('Please enter a valid UPI PIN');
        }
    }


    const handleUPIUpdate = () => {
        const oldPin = document.getElementById('old-pin').value;
        const newUpiPin = document.getElementById('new-upi-pin').value;

        if (newUpiPin) {
            axios.put('http://localhost:3000/api/user/pin-update', {
                upiId: upiIdState,
                newUpiPin: newUpiPin,
                oldPin: oldPin
            })
                .then((response) => {
                    console.log('UPI PIN updated successfully:', response.data);
                    // Close the UPI PIN update modal
                    alert('UPI PIN updated successfully!');
                    setIsUPIUpdateModalOpen(false); // Close the UPI PIN update modal
                })
                .catch((error) => {
                    console.error('Error updating UPI PIN:', error);
                });
        } else {
            alert('Please enter a valid UPI PIN');
        }
    }

    const handleUpdateOpen = () => {
        setIsUPIUpdateModalOpen(!isUPIUpdateModalOpen);
        setIsUPIModalOpen(false); // Close the UPI PIN setup modal
    }

    const handleBasicDetails = () => {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const dob = date
            ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
            : null;
        console.log(dob);
        if (name && phone && dob) {
            axios.put('http://localhost:3000/api/user/basic-details-lend', {
                upiId: upiIdState,
                name: name,
                phoneNumber: phone,
                dateOfBirth: dob
            })
                .then((response) => {
                    console.log('Basic details updated successfully:', response.data);
                    alert('Basic details updated successfully!');
                     // Close the profile modal
                })
                .catch((error) => {
                    console.error('Error updating basic details:', error);
                });
        }
        else {
            alert('Please fill in all fields');
        }
    };



    return (
        <>

            <nav class="">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    <a class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap">InstaPay</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-s rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">

                            <li>
                                <a href="#" class="block py-2 px-3 rounded-sm">About</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 px-3 rounded-sm">Services</a>
                            </li>



                            <div className="relative inline-block text-left">
                                {/* SVG icon acting as trigger */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-10 hover:cursor-pointer text-gray-700"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 
          0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 
          9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>

                                {/* Dropdown menu */}
                                {isOpen && (
                                    <div className="absolute right-0 mt-2 max-w-80 bg-white divide-y divide-gray-100 rounded-lg shadow z-50 dark:bg-gray-700">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    {upiIdState}
                                                </a>
                                            </li>
                                            <hr class="my-2" />
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => setIsModalOpen(!isModalOpen) || handleOTPSubmit()}
                                                // onClick={() => setIsUPIModalOpen(!isModalOpen)}
                                                >
                                                    UPI Pin
                                                </a>
                                            </li>

                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => setProfileModal(!profileModal)}
                                                >
                                                    Profile
                                                </a>
                                            </li>

                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                // onClick={() => setProfileModal(!profileModal)}
                                                >
                                                    Bank Details
                                                </a>
                                            </li>

                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                // onClick={() => setProfileModal(!profileModal)}
                                                >
                                                    KYC Verification
                                                </a>
                                            </li>

                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Sign Out
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>



            <hr class="text-[#d1d5db]" />



            {showToast && (
                <Toast
                    message="Login successful! Please set your UPI ID in settings."
                    show={showToast}
                    onClose={() => setShowToast(false)}
                />
            )}

            {/* Modal for UPI PIN Setup */}
            {isModalOpen && (
                <div id='modal' class="flex justify-center items-center">
                    <div id="default-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-4 w-lg max-w-2xl max-h-full">
                            {/* <!-- Modal content --> */}
                            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                {/* <!-- Modal header --> */}
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Verify yourself🛑
                                    </h3>

                                </div>
                                {/* <!-- Modal body --> */}
                                <div id='test' class="p-4 md:p-5 space-y-4">

                                    <div class="space-y-2">
                                        <label for="upi-pin" class="block text-sm font-medium text-gray-900 dark:text-white">Enter the OTP sent on your email</label>
                                        <input id='otp-input' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                        {/* <button data-modal-hide="default-modal" type="button" class="text-sm font-bold text-white block py-2 px-5 bg-[#192ecd] rounded-4xl hover:bg-[#1d4be1]" ></button> */}
                                    </div>


                                </div>
                                {/* <!-- Modal footer --> */}
                                <div class="flex space-x-2 items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button data-modal-hide="default-modal" type="button" class="text-sm font-bold text-white block py-2 px-5 bg-[#192ecd] rounded-4xl hover:bg-[#1d4be1]" onClick={() => handleOTPVerify()}>Verify OTP</button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}

            {isUPIModalOpen && (
                <div id='modal' class="flex justify-center items-center">
                    <div id="default-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-4 w-lg max-w-2xl max-h-full">
                            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        UPI PIN Setup
                                    </h3>
                                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalOpen(false)}>
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only" >Close modal</span>
                                    </button>
                                </div>
                                <div id='test' class="p-4 md:p-5 space-y-4">

                                    <div class="space-y-2">
                                        <label for="upi-pin" class="block text-sm font-medium text-gray-900 dark:text-white">Set your UPI PIN</label>
                                        <input type="password" id="upi-pin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••" required />
                                    </div>


                                </div>
                                <div class="flex space-x-2 items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button data-modal-hide="default-modal" type="button" class="text-sm font-bold text-white block py-2 px-5 bg-[#192ecd] rounded-4xl hover:bg-[#1d4be1]" onClick={() => handleUPISubmit()}>Set PIN</button>

                                    <button data-modal-hide="default-modal" type="button" class="text-sm font-bold text-white block py-2 px-5 bg-[#192ecd] rounded-4xl hover:bg-[#1d4be1]" onClick={() => handleUpdateOpen()}>Change PIN</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}



            {isUPIUpdateModalOpen && (
                <div id='modal' class="flex justify-center items-center">
                    <div id="default-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-4 w-lg max-w-2xl max-h-full">
                            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Change UPI PIN
                                    </h3>

                                </div>
                                <div id='test' class="p-4 md:p-5 space-y-4">

                                    <div class="space-y-2">
                                        <label for="upi-pin" class="block text-sm font-medium text-gray-900 dark:text-white">Enter old UPI PIN</label>
                                        <input type="password" id="old-pin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••" required />

                                        <label for="upi-pin" class="block text-sm font-medium text-gray-900 dark:text-white">Enter new UPI PIN (Must not be same as the old pin)*</label>
                                        <input type="password" id="new-upi-pin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••" required />
                                    </div>


                                </div>
                                <div class="flex space-x-2 items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    {/* <button data-modal-hide="default-modal" type="button" class="text-sm font-bold text-white block py-2 px-5 bg-[#192ecd] rounded-4xl hover:bg-[#1d4be1]" onClick={() => handleUPISubmit()}>Set PIN</button> */}

                                    <button data-modal-hide="default-modal" type="button" class="text-sm font-bold text-white block py-2 px-5 bg-[#192ecd] rounded-4xl hover:bg-[#1d4be1]" onClick={() => handleUPIUpdate()}>Change PIN</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {profileModal && (



                <div id='modal' class="flex justify-center items-center">
                    <div id="default-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-4 w-xl max-w-2xl max-h-full">
                            {/* <!-- Modal content --> */}
                            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                {/* <!-- Modal header --> */}


                                <Accordion
                                    type="single"
                                    collapsible
                                    className="px-6"
                                    defaultValue="item-1"

                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="text-md">Basic Details</AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                            <div id='test' class="md:p-5 space-y-4">

                                                <div class="space-y-2">
                                                    <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Enter your full name</label>
                                                    <input id='name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                                </div>

                                                <div class="space-y-2">
                                                    <label for="phone" class="block text-sm font-medium text-gray-900 dark:text-white">Enter your phone number</label>
                                                    <input id='phone' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                                </div>

                                                <div class="space-y-2 flex flex-col">
                                                    <Label htmlFor="date" className="">
                                                        Date of birth
                                                    </Label>
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                id="date"
                                                                className="w-48 justify-between font-normal"
                                                            >
                                                                {date ? date.toLocaleDateString() : "Select date"}
                                                                {/* <ChevronDownIcon /> */}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={date}
                                                                captionLayout="dropdown"
                                                                onSelect={(date) => {
                                                                    setDate(date)
                                                                    setOpen(false)
                                                                }}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>

                                                    <Button type="submit" className="w-20 bg-[#192ecd] hover:bg-[#192edd] my-5" onClick={() => handleBasicDetails()}>Save</Button>
                                                </div>

                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger className="text-md">Professional & Financial Details</AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                            <div class="flex flex-col md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">


                                                <div id='test' class="space-y-4">

                                                    <div class="space-y-2">
                                                        <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Occupation/Profession</label>
                                                        <input id='name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                                    </div>

                                                    <div class="space-y-2">
                                                        <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Monthly/Annual Income (Range)</label>
                                                        <input id='name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                                    </div>

                                                    <div class="space-y-2">
                                                        <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Source of Income</label>
                                                        <input id='name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                                    </div>

                                                    <div class="space-y-2">
                                                        <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">PAN Card / Aadhaar</label>
                                                        <input id='name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                                    </div>
                                                </div>

                                                <Button className="w-20 bg-[#192ecd] hover:bg-[#192edd] my-5">Save</Button>

                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger className="text-md">Lending Preferences</AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                            <div class="flex flex-col md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">


                                                <div id='test' class="space-y-4">

                                                    <div class="space-y-2">
                                                        <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Preferred Lending Amount Range</label>
                                                        <input id='name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                                    </div>

                                                    <div class="space-y-2">
                                                        <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Interest Rate Expectation</label>
                                                        <input id='name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                                    </div>

                                                    <div class="space-y-2">
                                                        <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Preferred Loan Duration</label>
                                                        <input id='name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                                    </div>

                                                    <div class="space-y-2">
                                                        <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Risk Appetite</label>
                                                        <input id='name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                                                    </div>
                                                </div>

                                                <Button className="w-20 bg-[#192ecd] hover:bg-[#192edd] my-5">Save</Button>

                                            </div>

                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                                {/* <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Basic Details
                                    </h3>
                                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalOpen(false)}>
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span onClick={() => setProfileModal(false)}>Close</span>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}

                            </div>
                        </div>
                    </div>
                </div>



            )}









        </>
    )
}

export default Dashboard