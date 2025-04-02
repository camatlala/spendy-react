import React from 'react';
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-50"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/src/assets/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center text-white h-full text-center px-6">
        <h1 className="text-5xl font-bold font-[Roboto] mb-6">
          Meet Spendy – Your New (Slightly Judgmental) Money Buddy!
        </h1>
        <h2 className="text-2xl font-medium font-[Roboto] mb-6">
          Tired of your bank account giving you the silent treatment? <br />
          Enter Spendy, a cheeky income and expense tracker built with React, Node.js, SQL, and a sprinkle of Tailwind CSS for good looks.
        </h2>
        <ul className="text-xl font-medium font-[Roboto] mb-10 space-y-2">
          <li>✅ Log transactions (so you finally see where all your money vanishes)</li>
          <li>✅ Gawk at colorful Chart.js graphs (because numbers are boring, but pie charts are delicious)</li>
          <li>✅ Face the cold, hard truth of your spending habits (RIP, impulse buys)</li>
        </ul>
        <div className="flex flex-col sm:flex-row gap-4">
        <Link to ='start'>
          <button 
          className="bg-white text-indigo-800 hover:bg-indigo-800 hover:text-white px-6 py-3 rounded-xl text-lg">
            Get Started Now!
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
