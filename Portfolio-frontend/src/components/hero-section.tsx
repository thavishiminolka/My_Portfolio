// "use client";
// import { ArrowRight } from "lucide-react";
// import { motion, type Variants } from "framer-motion";

// export default function HeroSection() {
//   // Define animation variants
//   const textVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: [0, 0, 0.2, 1],
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const buttonVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: [0, 0, 0.2, 1],
//         staggerChildren: 0.1,
//         delayChildren: 0.4,
//       },
//     },
//   };

//   const imageVariants: Variants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.8,
//         ease: [0, 0, 0.2, 1],
//         delay: 0.3,
//       },
//     },
//   };

//   const itemVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: [0, 0, 0.2, 1],
//       },
//     },
//   };

//   return (
//     <section
//       id="home"
//       className="relative w-full min-h-screen flex items-center py-12 sm:py-16 lg:py-20 bg-background text-foreground"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Desktop Layout - Side by side */}
//         <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
//           {/* Text Content - Desktop */}
//           <motion.div
//             className="space-y-8 text-left"
//             variants={textVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.div className="space-y-2" variants={textVariants}>
//               <motion.p
//                 className="text-primary text-lg font-medium tracking-wide"
//                 variants={textVariants}
//               >
//                 Hello, I'm
//               </motion.p>
//               <motion.h1
//                 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight"
//                 variants={textVariants}
//               >
//                 <span className="block">Thavishi Weerasinghe</span>
//                 <span className="block text-primary mt-2">
//                   Full Stack Developer
//                 </span>
//               </motion.h1>
//             </motion.div>
//             <motion.div
//               className="flex gap-6 pt-4"
//               variants={buttonVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.a
//                 href="#projects"
//                 className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//                 variants={itemVariants}
//               >
//                 View my work
//                 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
//               </motion.a>
//               <motion.a
//                 href="/Thavishi_Weerasinghe.pdf"
//                 download="Thavishi_Weerasinghe_CV.pdf"
//                 className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-muted-foreground/30 text-foreground hover:border-primary hover:text-primary px-8 py-4 bg-transparent hover:bg-primary/5"
//                 variants={itemVariants}
//               >
//                 DOWNLOAD CV
//               </motion.a>
//             </motion.div>
//           </motion.div>

//           {/* Image Section - Desktop */}
//           <motion.div
//             className="relative flex justify-end"
//             variants={imageVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <div className="relative group">
//               <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse transition duration-1000"></div>
//               <div className="relative w-[380px] h-[500px] xl:w-[420px] xl:h-[550px]">
//                 <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
//                   <img
//                     src="/profile.jpg"
//                     alt="Thavishi Weerasinghe - Full Stack Developer"
//                     className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
//                   />
//                 </div>
//               </div>
//               <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary/20 rounded-full animate-bounce"></div>
//               <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500/20 rounded-full animate-pulse"></div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Mobile Layout - Stacked with custom order */}
//         <div className="lg:hidden flex flex-col items-center text-center space-y-8">
//           {/* Text Content - Mobile */}
//           <motion.div
//             className="space-y-6"
//             variants={textVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.div className="space-y-2" variants={textVariants}>
//               <motion.p
//                 className="text-primary text-sm sm:text-base font-medium tracking-wide"
//                 variants={textVariants}
//               >
//                 Hello, I'm
//               </motion.p>
//               <motion.h1
//                 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight px-4"
//                 variants={textVariants}
//               >
//                 <span className="block">Thavishi Weerasinghe</span>
//                 <span className="block text-primary mt-1 sm:mt-2">
//                   Full Stack Developer
//                 </span>
//               </motion.h1>
//             </motion.div>
//           </motion.div>

//           {/* Image Section - Mobile (appears after text) */}
//           <motion.div
//             className="relative flex justify-center"
//             variants={imageVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <div className="relative group">
//               <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse transition duration-1000"></div>
//               <div className="relative w-[240px] h-[320px] sm:w-[280px] sm:h-[380px] md:w-[320px] md:h-[420px]">
//                 <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
//                   <img
//                     src="/profile.jpg"
//                     alt="Thavishi Weerasinghe - Full Stack Developer"
//                     className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
//                   />
//                 </div>
//               </div>
//               <div className="absolute -top-4 -right-4 w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full animate-bounce"></div>
//               <div className="absolute -bottom-3 -left-3 w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full animate-pulse"></div>
//             </div>
//           </motion.div>

//           {/* Buttons - Mobile (appears after image) */}
//           <motion.div
//             className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md px-4"
//             variants={buttonVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.a
//               href="#projects"
//               className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm sm:text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 sm:px-7 sm:py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//               variants={itemVariants}
//             >
//               View my work
//               <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
//             </motion.a>
//             <motion.a
//               href="/Thavishi_Weerasinghe.pdf"
//               download="Thavishi_Weerasinghe_CV.pdf"
//               className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm sm:text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-muted-foreground/30 text-foreground hover:border-primary hover:text-primary px-6 py-3 sm:px-7 sm:py-4 bg-transparent hover:bg-primary/5"
//               variants={itemVariants}
//             >
//               DOWNLOAD CV
//             </motion.a>
//           </motion.div>
//         </div>
//       </div>

//       {/* Background decoration */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
//       </div>
//     </section>
//   );
// }
"use client";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HeroSection() {
  const [cvUrl, setCvUrl] = useState<string>("/Thavishi_Weerasinghe.pdf");
  const [photoUrl, setPhotoUrl] = useState<string>("/profile.jpg");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch CV
        const cvResponse = await axios.get(
          "http://localhost:5052/api/profile/cv",
          {
            responseType: "blob",
          }
        );
        setCvUrl(URL.createObjectURL(cvResponse.data));

        // Fetch Photo
        const photoResponse = await axios.get(
          "http://localhost:5052/api/profile/photo",
          {
            responseType: "blob",
          }
        );
        setPhotoUrl(URL.createObjectURL(photoResponse.data));
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Failed to load profile data. Using fallback assets.");
      }
    };
    fetchProfile();
  }, []);

  // Define animation variants
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1],
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.2, 1],
        delay: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center py-12 sm:py-16 lg:py-20 bg-background text-foreground"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {/* Desktop Layout - Side by side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content - Desktop */}
          <motion.div
            className="space-y-8 text-left"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-2" variants={textVariants}>
              <motion.p
                className="text-primary text-lg font-medium tracking-wide"
                variants={textVariants}
              >
                Hello, I'm
              </motion.p>
              <motion.h1
                className="text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight"
                variants={textVariants}
              >
                <span className="block">Thavishi Weerasinghe</span>
                <span className="block text-primary mt-2">
                  Full Stack Developer
                </span>
              </motion.h1>
            </motion.div>
            <motion.div
              className="flex gap-6 pt-4"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.a
                href="#projects"
                className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                variants={itemVariants}
              >
                View my work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
              <motion.a
                href={cvUrl}
                download="Thavishi_Weerasinghe_CV.pdf"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-muted-foreground/30 text-foreground hover:border-primary hover:text-primary px-8 py-4 bg-transparent hover:bg-primary/5"
                variants={itemVariants}
              >
                DOWNLOAD CV
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image Section - Desktop */}
          <motion.div
            className="relative flex justify-end"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse transition duration-1000"></div>
              <div className="relative w-[380px] h-[500px] xl:w-[420px] xl:h-[550px]">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                  <img
                    src={photoUrl}
                    alt="Thavishi Weerasinghe - Full Stack Developer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={() =>
                      console.error("Failed to load profile photo")
                    }
                  />
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary/20 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500/20 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Layout - Stacked with custom order */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-8">
          {/* Text Content - Mobile */}
          <motion.div
            className="space-y-6"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-2" variants={textVariants}>
              <motion.p
                className="text-primary text-sm sm:text-base font-medium tracking-wide"
                variants={textVariants}
              >
                Hello, I'm
              </motion.p>
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight px-4"
                variants={textVariants}
              >
                <span className="block">Thavishi Weerasinghe</span>
                <span className="block text-primary mt-1 sm:mt-2">
                  Full Stack Developer
                </span>
              </motion.h1>
            </motion.div>
          </motion.div>

          {/* Image Section - Mobile (appears after text) */}
          <motion.div
            className="relative flex justify-center"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse transition duration-1000"></div>
              <div className="relative w-[240px] h-[320px] sm:w-[280px] sm:h-[380px] md:w-[320px] md:h-[420px]">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                  <img
                    src={photoUrl}
                    alt="Thavishi Weerasinghe - Full Stack Developer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={() =>
                      console.error("Failed to load profile photo")
                    }
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full animate-pulse"></div>
            </div>
          </motion.div>

          {/* Buttons - Mobile (appears after image) */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md px-4"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              href="#projects"
              className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm sm:text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 sm:px-7 sm:py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              variants={itemVariants}
            >
              View my work
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href={cvUrl}
              download="Thavishi_Weerasinghe_CV.pdf"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm sm:text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-muted-foreground/30 text-foreground hover:border-primary hover:text-primary px-6 py-3 sm:px-7 sm:py-4 bg-transparent hover:bg-primary/5"
              variants={itemVariants}
            >
              DOWNLOAD CV
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
