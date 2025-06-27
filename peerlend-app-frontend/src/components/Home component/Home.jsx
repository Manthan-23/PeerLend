import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div class="justify-center items-center mx-30">

        <nav class="">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

            <a class="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap">PeerLend</span>
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
                <li>
                  <a href="#" class="text-white block py-2 px-5 bg-[#192ecd] rounded-4xl hover:bg-[#1d4be1]">Signin</a>
                </li>
                <li>
                  <Link to="/signup"><a href="#" class="text-white block py-2 px-5 rounded-4xl bg-[#192ecd] rounded-4xl hover:bg-[#1d4be1]">Signup</a></Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <hr class="text-[#d1d5db]" />

        <div class="flex flex-col items-start justify-center my-20">
          <h1 class="text-6xl font-bold text-center mt-10">Minimizing the gap</h1>
          <h1 class="text-6xl font-bold text-center mt-2">between<i> Borrowers</i></h1>
          <h1 class="text-6xl font-bold text-center mt-2">and<i> Lenderers!</i></h1>

          <p class="text-center mt-4 text-xl">A secure spot of hassel-free UPI Payments.</p>
          <p class="text-center mt-2 text-xl">Generate a temporary UPI ID of yours and go ahead!.</p>

          <div class="flex justify-center mt-6">
            <button class="bg-[#192ecd] text-white px-35 py-2 rounded-4xl hover:bg-[#1d4be1] cursor-default transition duration-300">Get Started</button>
          </div>
        </div>

      </div>

    </>
  )
}

export default Home