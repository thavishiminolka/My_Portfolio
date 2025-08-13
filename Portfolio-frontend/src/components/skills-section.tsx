// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// interface Skill {
//   id: number;
//   name: string | null;
//   logo: string | null; // Base64-encoded image
// }

// export default function SkillsSection() {
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch skills on mount
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const response = await axios.get("http://localhost:5052/api/skills");
//         console.log("Fetched skills:", response.data);
//         setSkills(response.data);
//         setLoading(false);
//       } catch (err: any) {
//         console.error("Fetch error:", err);
//         setError(
//           err.message || "Failed to fetch skills. Check backend server."
//         );
//         setLoading(false);
//       }
//     };
//     fetchSkills();
//   }, []);

//   return (
//     <section
//       id="skills"
//       className="w-full py-16 md:py-24 lg:py-32 bg-background text-foreground"
//     >
//       <div className="container mx-auto px-4 space-y-12">
//         <div className="text-center">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
//             Technical Skills
//           </h2>
//           <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
//             A showcase of the tools and technologies I’ve worked with,
//             reflecting my experience in both design and full-stack development.
//           </p>
//         </div>
//         {loading ? (
//           <div className="text-center">Loading skills...</div>
//         ) : error ? (
//           <div className="text-center text-red-500">{error}</div>
//         ) : skills.length === 0 ? (
//           <div className="text-center">No skills found.</div>
//         ) : (
//           <div className="w-full max-w-6xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
//             {skills.map((skill) => (
//               <div
//                 key={skill.id}
//                 className="relative bg-card text-foreground border border-border rounded-lg p-4 flex flex-col items-center justify-center text-center aspect-square overflow-hidden
//                            transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
//               >
//                 <img
//                   src={
//                     skill.logo
//                       ? `data:image/png;base64,${skill.logo}`
//                       : "/placeholder.svg?height=64&width=64"
//                   }
//                   alt={`${skill.name || "Skill"} logo`}
//                   width={64}
//                   height={64}
//                   className="h-16 w-16 object-contain mb-2"
//                 />
//                 <span className="text-sm font-medium text-foreground">
//                   {skill.name || "N/A"}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, type Variants } from "framer-motion"; // Import motion and Variants

interface Skill {
  id: number;
  name: string | null;
  logo: string | null; // Base64-encoded image
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
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
        staggerChildren: 0.1, // Stagger children animations
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0, 0, 0.2, 1],
      },
    },
  };

  // Fetch skills on mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:5052/api/skills");
        console.log("Fetched skills:", response.data);
        setSkills(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(
          err.message || "Failed to fetch skills. Check backend server."
        );
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section
      id="skills"
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
            Technical Skills
          </motion.h2>
          <motion.p
            className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            A showcase of the tools and technologies I’ve worked with,
            reflecting my experience in both design and full-stack development.
          </motion.p>
        </div>
        {loading ? (
          <div className="text-center">Loading skills...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : skills.length === 0 ? (
          <div className="text-center">No skills found.</div>
        ) : (
          <motion.div
            className="w-full max-w-6xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is visible
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.id}
                className="relative bg-card text-foreground border border-border rounded-lg p-4 flex flex-col items-center justify-center text-center aspect-square overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
                variants={itemVariants}
              >
                <img
                  src={
                    skill.logo
                      ? `data:image/png;base64,${skill.logo}`
                      : "/placeholder.svg?height=64&width=64"
                  }
                  alt={`${skill.name || "Skill"} logo`}
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain mb-2"
                  onError={() =>
                    console.error(
                      `Failed to load logo for skill: ${skill.name}`
                    )
                  }
                />
                <span className="text-sm font-medium text-foreground">
                  {skill.name || "N/A"}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
