// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// interface Education {
//   id: number;
//   degree: string | null; // Maps to Degree from backend
//   institute: string | null;
//   year: string | null;
//   description: string | null;
//   results: string | null;
//   logo: string | null; // Base64-encoded image
// }

// export default function Education() {
//   const [educations, setEducations] = useState<Education[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch education data on mount
//   useEffect(() => {
//     const fetchEducation = async () => {
//       try {
//         const response = await axios.get("http://localhost:5052/api/education");
//         console.log("Fetched education:", response.data);
//         setEducations(response.data);
//         setLoading(false);
//       } catch (err: any) {
//         console.error("Fetch error:", err);
//         setError(
//           err.message || "Failed to fetch education data. Check backend server."
//         );
//         setLoading(false);
//       }
//     };
//     fetchEducation();
//   }, []);

//   return (
//     <section
//       id="education"
//       className="w-full min-h-screen py-16 md:py-24 lg:py-32 bg-background text-foreground"
//     >
//       <div className="container mx-auto px-4 max-w-6xl">
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 text-center">
//           Education
//         </h2>
//         <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
//           A brief overview of my academic journey, highlighting key milestones
//           that have shaped my skills and interests in technology and design.
//         </p>
//         <br />
//         {loading ? (
//           <div className="text-center">Loading education...</div>
//         ) : error ? (
//           <div className="text-center text-red-500">{error}</div>
//         ) : educations.length === 0 ? (
//           <div className="text-center">No education records found.</div>
//         ) : (
//           <div className="relative w-full max-w-4xl mx-auto">
//             {/* Central Vertical Line */}
//             <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 transform -translate-x-1/2 z-0"></div>
//             {/* Timeline dots */}
//             {educations.map((_, index) => (
//               <div
//                 key={`dot-${index}`}
//                 className={`absolute left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 z-10 animate-pulse ${
//                   index === 0
//                     ? "bg-blue-400 top-24"
//                     : index === 1
//                     ? "bg-purple-400 top-80"
//                     : "bg-pink-400 bottom-24"
//                 }`}
//                 style={{ animationDelay: `${index * 0.5}s` }}
//               ></div>
//             ))}

//             {/* Education Boxes */}
//             {educations.map((education, index) => (
//               <div
//                 key={education.id}
//                 className={`relative mb-16 flex ${
//                   index % 2 === 0 ? "justify-end pr-8" : "justify-start pl-8"
//                 } animate-fade-in`}
//                 style={{ animationDelay: `${0.2 + index * 0.6}s` }}
//               >
//                 <div className="w-full md:w-96 bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl hover-scale group">
//                   {/* Connecting line to center */}
//                   <div
//                     className={`absolute top-1/2 ${
//                       index % 2 === 0
//                         ? "right-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent transform translate-x-full"
//                         : "left-0 w-8 h-0.5 bg-gradient-to-l from-purple-400 to-transparent transform -translate-x-full"
//                     } -translate-y-1/2`}
//                   ></div>
//                   <img
//                     src={
//                       education.logo
//                         ? `data:image/png;base64,${education.logo}`
//                         : "/placeholder.svg?height=32&width=32"
//                     }
//                     alt={`${education.institute || "Education"} logo`}
//                     width={32}
//                     height={32}
//                     className="w-8 h-8 mb-4 transition-all duration-300 group-hover:scale-110"
//                     onError={() =>
//                       console.error(
//                         `Failed to load logo for education: ${education.institute}`
//                       )
//                     }
//                   />
//                   <h3 className="text-xl font-semibold mb-1 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
//                     {education.institute || "N/A"}
//                   </h3>
//                   <p className="text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-300 mb-1">
//                     {education.degree || "N/A"}
//                   </p>
//                   <p className="text-sm text-muted-foreground mb-2 group-hover:text-blue-200/80 transition-colors duration-300">
//                     {education.year || "N/A"}
//                   </p>
//                   <p className="text-sm text-foreground mb-4 group-hover:text-blue-100 transition-colors duration-300">
//                     {education.description || "No description available."}
//                   </p>
//                   {education.results && (
//                     <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-3 mt-4">
//                       <div className="flex items-center gap-2 mb-2">
//                         <span className="text-sm font-medium text-blue-400">
//                           Results
//                         </span>
//                       </div>
//                       <p className="text-xs text-blue-300/90">
//                         {education.results}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <style>{`
//         @keyframes draw {
//           to {
//             stroke-dashoffset: 0;
//           }
//         }
//         .hover-scale {
//           transition: transform 0.3s ease;
//         }
//         .hover-scale:hover {
//           transform: scale(1.02);
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.8s ease-out forwards;
//           opacity: 0;
//         }
//         @keyframes fadeIn {
//           to {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, type Variants } from "framer-motion"; // Import motion and Variants

interface Education {
  id: number;
  degree: string | null; // Maps to Degree from backend
  institute: string | null;
  year: string | null;
  description: string | null;
  results: string | null;
  logo: string | null; // Base64-encoded image
}

export default function Education() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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

  // Fetch education data on mount
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get("http://localhost:5052/api/education");
        console.log("Fetched education:", response.data);
        setEducations(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(
          err.message || "Failed to fetch education data. Check backend server."
        );
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  return (
    <section
      id="education"
      className="w-full min-h-screen py-16 md:py-24 lg:py-32 bg-background text-foreground"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
        >
          Education
        </motion.h2>
        <motion.p
          className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground text-center" // Added text-center for consistency
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
        >
          A brief overview of my academic journey, highlighting key milestones
          that have shaped my skills and interests in technology and design.
        </motion.p>
        <br />
        {loading ? (
          <div className="text-center">Loading education...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : educations.length === 0 ? (
          <div className="text-center">No education records found.</div>
        ) : (
          <motion.div
            className="relative w-full max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is visible
          >
            {/* Central Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 transform -translate-x-1/2 z-0"></div>
            {/* Timeline dots */}
            {educations.map((_, index) => (
              <motion.div
                key={`dot-${index}`}
                className={`absolute left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 z-10 animate-pulse ${
                  index === 0
                    ? "bg-blue-400 top-24"
                    : index === 1
                    ? "bg-purple-400 top-80"
                    : "bg-pink-400 bottom-24"
                }`}
                variants={itemVariants} // Apply item variants to dots as well
                style={{ animationDelay: `${index * 0.5}s` }} // Keep existing delay for pulse
              ></motion.div>
            ))}
            {/* Education Boxes */}
            {educations.map((education, index) => (
              <motion.div
                key={education.id}
                className={`relative mb-16 flex ${
                  index % 2 === 0 ? "justify-end pr-8" : "justify-start pl-8"
                }`}
                variants={itemVariants} // Apply item variants
              >
                <div className="w-full md:w-96 bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl hover-scale group">
                  {/* Connecting line to center */}
                  <div
                    className={`absolute top-1/2 ${
                      index % 2 === 0
                        ? "right-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent transform translate-x-full"
                        : "left-0 w-8 h-0.5 bg-gradient-to-l from-purple-400 to-transparent transform -translate-x-full"
                    } -translate-y-1/2`}
                  ></div>
                  <img
                    src={
                      education.logo
                        ? `data:image/png;base64,${education.logo}`
                        : "/placeholder.svg?height=32&width=32"
                    }
                    alt={`${education.institute || "Education"} logo`}
                    width={32}
                    height={32}
                    className="w-8 h-8 mb-4 transition-all duration-300 group-hover:scale-110"
                    onError={() =>
                      console.error(
                        `Failed to load logo for education: ${education.institute}`
                      )
                    }
                  />
                  <h3 className="text-xl font-semibold mb-1 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    {education.institute || "N/A"}
                  </h3>
                  <p className="text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-300 mb-1">
                    {education.degree || "N/A"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2 group-hover:text-blue-200/80 transition-colors duration-300">
                    {education.year || "N/A"}
                  </p>
                  <p className="text-sm text-foreground mb-4 group-hover:text-blue-100 transition-colors duration-300">
                    {education.description || "No description available."}
                  </p>
                  {education.results && (
                    <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-3 mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-blue-400">
                          Results
                        </span>
                      </div>
                      <p className="text-xs text-blue-300/90">
                        {education.results}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <style>{`
        .hover-scale {
          transition: transform 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
}
