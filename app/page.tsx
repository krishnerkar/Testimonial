"use client";

import localFont from "@next/font/local";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const calSans = localFont({
  src: "../fonts/CalSans-SemiBold.woff",
  display: "swap",
});

const matter = localFont({
  src: [
    {
      path: "../fonts/Matter-Light.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Matter-Regular.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Matter-Medium.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Matter-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [testimonial, setTestimonial] = useState("");

  const submit = () => {
    setLoading(true);
    if (!name || !testimonial) {
      toast.error("Please fill in the name and testimonial fields");
      setLoading(false);
      return;
    }
    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        testimonial,
      }),
    }).then((res) => {
      if (res.ok) {
        toast.success("You're the best, Thank you!");
        confetti();
        setName("");
        setTestimonial("");
      } else {
        toast.error(
          "Something went wrong, please message me the testimonial :("
        );
      }
      setLoading(false);
    });
  };

  const pageAnimationVariants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.main
        variants={pageAnimationVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
        className={styles.main}
        style={{
          width: "100%",
          maxWidth: "1500px",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "#fff",
          padding: "80px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "90px",
              width: "fit-content",
            }}
            className={calSans.className}
          >
            Submit A Testimonial
          </h1>

          <h2
            style={{
              marginTop: "20px",
              fontSize: "24px",
              fontWeight: "600",
              color: "#101010",
            }}
            className={matter.className}
          >
            {`if you’re seeing this, you’ve probably worked with me. 
          i’d absolutely love and appreciate it if you can drop 2-3 lines about me or working with me which
          i’d love to feature on my new website.`}
          </h2>
          <h3
            style={{
              marginTop: "20px",
              fontSize: "18px",
              fontWeight: "400",
              color: "#4A4A4A",
            }}
            className={matter.className}
          >
            disclaimer : this is ofc optional, if you don’t feel like, just put
            that here or skip it, no hard feelings :)
          </h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              marginTop: "40px",
              fontSize: "18px",
              fontWeight: "400",
              border: "3px solid #000",
              padding: "10px",
              background: "#fff",
              borderRadius: "8px",
              color: "#000",
              width: "100%",
            }}
            className={matter.className}
            placeholder="please tell me who is looking at this input box right now"
          />
          <textarea
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            rows={3}
            style={{
              marginTop: "20px",
              fontSize: "18px",
              fontWeight: "500",
              border: "3px solid #000",
              padding: "10px",
              background: "#fff",
              borderRadius: "8px",
              color: "#000",
              width: "100%",
              resize: "vertical",
            }}
            className={matter.className}
            placeholder="the testimonial goes here:))"
          />

          <button
            onClick={submit}
            disabled={loading}
            className={`${matter.className} ${styles.button}`}
          >
            <div
              style={{
                marginRight: "30px",
                display: loading ? "block" : "none",
              }}
              className={styles.spinner}
            />

            {loading ? "Submitting..." : "Submit with <3"}
          </button>
        </div>
      </motion.main>
      <Toaster
        toastOptions={{
          className: matter.className,
          style: {
            border: "1px solid #000",
            padding: "16px",
            fontSize: "14px",
            color: "#000",
          },
        }}
      />
    </div>
  );
}
