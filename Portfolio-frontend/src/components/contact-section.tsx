// "use client";
// import React, { useState } from "react";
// import { Mail, Github, Facebook, Linkedin } from "lucide-react";
// import axios from "axios";

// export default function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//     setError(null);
//     setSuccess(null);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);
//     setSubmitting(true);

//     // Validate inputs
//     if (!formData.name || !formData.email || !formData.message) {
//       setError("Name, Email, and Message are required.");
//       setSubmitting(false);
//       return;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setError("Invalid email format.");
//       setSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5052/api/contact",
//         formData
//       );
//       setSuccess(response.data.Message || "Message sent successfully!");
//       setFormData({ name: "", email: "", message: "" });
//     } catch (err: any) {
//       const errorMessage =
//         err.response?.data?.Error ||
//         err.message ||
//         "Failed to send message. Check backend server.";
//       setError(errorMessage);
//       console.error("Submit error:", err.response?.data || err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <section
//       id="contact"
//       className="w-full py-16 md:py-24 lg:py-32 bg-background text-foreground"
//     >
//       <div className="container mx-auto px-4 space-y-12">
//         <div className="text-center">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
//             Get In Touch
//           </h2>
//           <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
//             I&apos;m always open to discussing new projects, creative ideas, or
//             opportunities to be part of your vision.
//           </p>
//         </div>
//         <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-6 bg-card p-8 rounded-lg border border-border"
//           >
//             {error && <p className="text-red-500">{error}</p>}
//             {success && <p className="text-green-500">{success}</p>}
//             <div className="space-y-2">
//               <label
//                 htmlFor="name"
//                 className="text-foreground text-sm font-medium"
//               >
//                 Name
//               </label>
//               <input
//                 id="name"
//                 placeholder="Your name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
//                 disabled={submitting}
//               />
//             </div>
//             <div className="space-y-2">
//               <label
//                 htmlFor="email"
//                 className="text-foreground text-sm font-medium"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="your.email@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
//                 disabled={submitting}
//               />
//             </div>
//             <div className="space-y-2">
//               <label
//                 htmlFor="message"
//                 className="text-foreground text-sm font-medium"
//               >
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 placeholder="Your message here..."
//                 rows={5}
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] text-foreground"
//                 disabled={submitting}
//               />
//             </div>
//             <button
//               type="submit"
//               className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
//               disabled={submitting}
//             >
//               {submitting ? "Sending..." : "Send Message"}
//             </button>
//           </form>
//           <div className="space-y-8 flex flex-col justify-between">
//             <div className="space-y-4 bg-card p-8 rounded-lg border border-border">
//               <h3 className="text-xl font-semibold text-foreground">
//                 Contact Info
//               </h3>
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <Mail className="h-5 w-5 text-primary" />
//                 <a
//                   href="mailto:thavishiminolka@gmail.com"
//                   className="hover:underline"
//                 >
//                   thavishiminolka@gmail.com
//                 </a>
//               </div>
//             </div>
//             <div className="space-y-4 bg-card p-8 rounded-lg border border-border">
//               <h3 className="text-xl font-semibold text-foreground">
//                 Find Me On
//               </h3>
//               <div className="flex gap-4">
//                 <a
//                   href="https://github.com/thavishiminolka"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-foreground hover:text-primary transition-colors"
//                   aria-label="GitHub"
//                 >
//                   <Github className="h-7 w-7" />
//                 </a>
//                 <a
//                   href="https://www.linkedin.com/in/thavishi-weerasinghe-205bbb264"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-foreground hover:text-primary transition-colors"
//                   aria-label="LinkedIn"
//                 >
//                   <Linkedin className="h-7 w-7" />
//                 </a>
//                 <a
//                   href="https://web.facebook.com/profile.php?id=100094039427295"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-foreground hover:text-primary transition-colors"
//                   aria-label="Facebook"
//                 >
//                   <Facebook className="h-7 w-7" />
//                 </a>
//               </div>
//             </div>
//             <div className="bg-card p-8 rounded-lg border border-border">
//               <blockquote className="text-lg italic text-muted-foreground">
//                 "In the ever-evolving world of tech, every challenge is an
//                 opportunity to learn, innovate, and create something impactful."
//               </blockquote>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import type React from "react";
import { useState } from "react";
import { Mail, Github, Facebook, Linkedin } from "lucide-react";
import axios from "axios";
import { motion, type Variants } from "framer-motion"; // Import motion and Variants

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Define animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1],
        staggerChildren: 0.2, // Stagger children animations
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0, 0, 0.2, 1],
      },
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    // Validate inputs
    if (!formData.name || !formData.email || !formData.message) {
      setError("Name, Email, and Message are required.");
      setSubmitting(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Invalid email format.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5052/api/contact",
        formData
      );
      setSuccess(response.data.Message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.Error ||
        err.message ||
        "Failed to send message. Check backend server.";
      setError(errorMessage);
      console.error("Submit error:", err.response?.data || err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 lg:py-32 bg-background text-foreground"
    >
      <div className="container mx-auto px-4 space-y-12">
        <div className="text-center">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </motion.p>
        </div>
        <motion.div
          className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is visible
        >
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-card p-8 rounded-lg border border-border"
            variants={itemVariants}
          >
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-foreground text-sm font-medium"
              >
                Name
              </label>
              <input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                disabled={submitting}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-foreground text-sm font-medium"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                disabled={submitting}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-foreground text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message here..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] text-foreground"
                disabled={submitting}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
          <motion.div
            className="space-y-8 flex flex-col justify-between"
            variants={itemVariants}
          >
            <div className="space-y-4 bg-card p-8 rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground">
                Contact Info
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:thavishiminolka@gmail.com"
                  className="hover:underline"
                >
                  thavishiminolka@gmail.com
                </a>
              </div>
            </div>
            <div className="space-y-4 bg-card p-8 rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground">
                Find Me On
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/thavishiminolka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-7 w-7" />
                </a>
                <a
                  href="https://www.linkedin.com/in/thavishi-weerasinghe-205bbb264"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-7 w-7" />
                </a>
                <a
                  href="https://web.facebook.com/profile.php?id=100094039427295"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-7 w-7" />
                </a>
              </div>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border">
              <blockquote className="text-lg italic text-muted-foreground">
                "In the ever-evolving world of tech, every challenge is an
                opportunity to learn, innovate, and create something impactful."
              </blockquote>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
