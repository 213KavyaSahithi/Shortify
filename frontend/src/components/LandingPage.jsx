import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";

let desc =
  "Generate short, memorable links with ease using Shortify's intuitive interface. Share URLs effortlessly across platforms. Optimize your sharing strategy with Shortify. Track clicks and manage your links seamlessly to enhance your online presence. Generate short, memorable links with ease using Shortify's intuitive interface. Share URLs effortlessly across platforms.";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  console.log("TOKEN FROM LANDING PAGE: " + token);

  const dashBoardNavigateHandler = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="min-h-[calc(100vh-64px)]  lg:px-14 sm:px-8 px-4">
      <div className="lg:flex-row flex-col    lg:py-5   pt-16   lg:gap-10 gap-8 flex justify-between items-center">
        <div className=" flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -80 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-bold font-roboto text-slate-800 md:text-5xl sm:text-4xl text-3xl   md:leading-[55px] sm:leading-[45px] leading-10 lg:w-full md:w-[70%] w-full"
          >
            Shortify Makes Sharing Simple
          </motion.h1>
          <p className="text-slate-700 text-sm my-5">
            Shortify takes the hassle out of long links by turning them into short, neat URLs you can share instantly. With its clean, intuitive design, you'll create compact links in just a few clicks. Share smarter, faster, and more efficiently with Shortify today.
          </p>
          <div className="flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={dashBoardNavigateHandler}
              className="bg-primary hover:bg-secondary w-40 text-white rounded-md  py-2"
            >
              Manage Links
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={dashBoardNavigateHandler}
              className="border-primary border w-40 text-primary rounded-md py-2 hover:bg-secondary hover:text-white transition-colors"
            >
              Create Short Link
            </motion.button>
          </div>
        </div>
        <div className="   flex-1 flex   justify-center w-full">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:w-[480px] w-[400px] object-cover rounded-md"
            src="/images/img2.png"
            alt=""
          />
        </div>
      </div>
      <div className="sm:pt-12 pt-7">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-slate-800 font-roboto font-bold lg:w-[60%]  md:w-[70%] sm:w-[80%] mx-auto text-3xl text-center"
        >
          Helping individuals and groups share smarter at companies everywhere.{" "}
        </motion.p>
        <div className="pt-4 pb-7 grid lg:gap-7 gap-4 xl:grid-cols-4  lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4">
          <Card
            title="🔗 Effortless Link Shortening"
            desc="Turn long, clunky URLs into sleek, shareable links in seconds. Our streamlined interface makes it simple to create memorable links without any technical hassle."
          />
          <Card
            title="📊 Actionable Insights"
            desc="Understand how your links perform with a powerful analytics dashboard. Track clicks, audience location, and referral sources to refine your campaigns and maximize impact."
          />
          <Card
            title="🔒 Advanced Protection"
            desc="Your data deserves the highest level of security. Every shortened link is safeguarded with encryption and monitoring, ensuring safe sharing across platforms."
          />
          <Card
            title="⚡ Speed & Reliability"
            desc="Experience instant redirects backed by a robust infrastructure. With high uptime and fast response times, your links stay live and dependable around the clock."
          />
          <Card
            title="🌍 Custom Branding"
            desc="Make your links truly yours. Add branded domains or custom slugs to reinforce your identity and build trust with your audience."
          />
          <Card
            title="🔁 Smart Link Management"
            desc="Organize, edit, and update your shortened URLs anytime. Whether you're running a campaign or sharing resources, you stay in full control."
          />
          <Card
            title="📱 Mobile-Friendly Experience"
            desc="Manage and track your links on the go with a responsive design that works seamlessly across devices."
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;