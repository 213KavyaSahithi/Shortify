import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine, FaGlobe, FaCog, FaMobile } from "react-icons/fa";
const AboutPage = () => {
  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-2">
      <div className="bg-white w-full sm:py-10 py-8  ">
        <h1 className="sm:text-4xl text-slate-800 text-3xl font-bold italic  mb-3">
          About Shortify
        </h1>
        <p className="text-gray-700 text-sm  mb-8 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full ">
          Shortify takes the hassle out of long links by turning them into short, neat URLs you can share instantly. With its clean, intuitive design, you'll create compact links in just a few clicks. Share smarter, faster, and more efficiently with Shortify today.
        </p>
        <div className="space-y-5 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full ">
          <div className="flex items-start">
            <FaLink className="text-blue-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                🔗 Effortless Link Shortening
              </h2>
              <p className="text-gray-600">
                Turn long, clunky URLs into sleek, shareable links in seconds. Our streamlined interface makes it simple to create memorable links without any technical hassle.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaShareAlt className="text-green-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                📊 Actionable Insights
              </h2>
              <p className="text-gray-600">
                Understand how your links perform with a powerful analytics dashboard. Track clicks, audience location, and referral sources to refine your campaigns and maximize impact.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaEdit className="text-purple-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                🔒 Advanced Protection
              </h2>
              <p className="text-gray-600">
                Your data deserves the highest level of security. Every shortened link is safeguarded with encryption and monitoring, ensuring safe sharing across platforms.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaChartLine className="text-red-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                ⚡ Speed & Reliability
              </h2>
              <p className="text-gray-600">
                Experience instant redirects backed by a robust infrastructure. With high uptime and fast response times, your links stay live and dependable around the clock.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaGlobe className="text-indigo-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                🌍 Custom Branding
              </h2>
              <p className="text-gray-600">
                Make your links truly yours. Add branded domains or custom slugs to reinforce your identity and build trust with your audience.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaCog className="text-orange-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                🔁 Smart Link Management
              </h2>
              <p className="text-gray-600">
                Organize, edit, and update your shortened URLs anytime. Whether you're running a campaign or sharing resources, you stay in full control.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaMobile className="text-teal-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                📱 Mobile-Friendly Experience
              </h2>
              <p className="text-gray-600">
                Manage and track your links on the go with a responsive design that works seamlessly across devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;