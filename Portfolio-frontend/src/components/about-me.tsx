// import { ArrowRight } from "lucide-react";

// export default function AboutMe() {
//   return (
//     <section
//       id="about"
//       className="w-full py-16 md:py-24 lg:py-32 bg-background text-foreground"
//     >
//       <div className="container mx-auto px-4 space-y-12">
//         <div className="text-center">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
//             About Me
//           </h2>
//           <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
//             I&apos;m a third-year undergraduate at the{" "}
//             <span className="font-semibold text-foreground">
//               Faculty of Information Technology, University of Moratuwa
//             </span>
//             , with a strong passion for full-stack development and UI design. My
//             academic journey has equipped me with a solid foundation in both
//             front-end and back-end technologies, and I continuously explore new
//             trends in web development to refine my skills.
//             <br />
//             <br />
//             Over the past few years, I’ve worked on a range of diverse projects,
//             from responsive web applications to dynamic dashboards. These
//             experiences have strengthened my ability to solve real-world
//             problems, collaborate in teams, and build user-friendly solutions
//             that blend functionality with clean, modern design.
//             <br />
//             <br />
//             I&apos;m especially enthusiastic about turning complex challenges
//             into simple, intuitive experiences. Whether it&apos;s designing
//             pixel-perfect interfaces or developing scalable backend systems, I
//             enjoy every step of the development process and am always eager to
//             take on new challenges that help me grow.
//           </p>
//         </div>
//         <div className="grid gap-8 md:grid-cols-3">
//           <div className="bg-card text-foreground border border-border rounded-lg p-6">
//             <h3 className="text-primary text-xl font-semibold mb-2">
//               Leadership & University Experience
//             </h3>
//             <p className="text-muted-foreground text-base">
//               As the Design and Publicity Director at IEEE WIE, University of
//               Moratuwa, I've had the opportunity to lead creative initiatives,
//               organize events, and manage design teams. This role has sharpened
//               my leadership, communication, and creative thinking skills: while
//               deepening my passion for design and teamwork.
//             </p>
//           </div>
//           <div className="bg-card text-foreground border border-border rounded-lg p-6">
//             <h3 className="text-primary text-xl font-semibold mb-2">
//               UI & Visual Design
//             </h3>
//             <p className="text-muted-foreground text-base">
//               I genuinely enjoy crafting clean, engaging, and user-friendly
//               interfaces. Designing with empathy and attention to detail is
//               something I take pride in whether it's building wireframes or
//               polishing high-fidelity mockups in Figma. UI design is more than
//               just visuals to me; it's about creating intuitive experiences.
//             </p>
//           </div>
//           <div className="bg-card text-foreground border border-border rounded-lg p-6">
//             <h3 className="text-primary text-xl font-semibold mb-2">
//               Full-Stack Development
//             </h3>
//             <p className="text-muted-foreground text-base">
//               My journey into full-stack development has allowed me to build
//               complete web solutions, from responsive front-ends to robust
//               back-end systems. I'm passionate about working across the stack to
//               bring ideas to life, and I enjoy solving complex problems with
//               clean, scalable code.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import { motion, type Variants } from "framer-motion"; // Import Variants type

export default function AboutMe() {
  // Define animation variants for fade-in and slide-up
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1], // Changed from "easeOut" to cubic bezier array
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
    }, // Changed from "easeOut" to cubic bezier array
  };

  return (
    <section
      id="about"
      className="w-full py-16 md:py-24 lg:py-32 bg-background text-foreground"
    >
      <div className="container mx-auto px-4 space-y-12">
        <div className="text-center">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }} // Changed from "easeOut" to cubic bezier array
          >
            About Me
          </motion.h2>
          <motion.p
            className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }} // Changed from "easeOut" to cubic bezier array
          >
            I&apos;m a third-year undergraduate at the{" "}
            <span className="font-semibold text-foreground">
              Faculty of Information Technology, University of Moratuwa
            </span>
            , with a strong passion for full-stack development and UI design. My
            academic journey has equipped me with a solid foundation in both
            front-end and back-end technologies, and I continuously explore new
            trends in web development to refine my skills.
            <br />
            <br />
            Over the past few years, I’ve worked on a range of diverse projects,
            from responsive web applications to dynamic dashboards. These
            experiences have strengthened my ability to solve real-world
            problems, collaborate in teams, and build user-friendly solutions
            that blend functionality with clean, modern design.
            <br />
            <br />
            I&apos;m especially enthusiastic about turning complex challenges
            into simple, intuitive experiences. Whether it&apos;s designing
            pixel-perfect interfaces or developing scalable backend systems, I
            enjoy every step of the development process and am always eager to
            take on new challenges that help me grow.
          </motion.p>
        </div>
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animate when in view
          viewport={{ once: true, amount: 0.3 }} // Trigger once when 30% of the element is visible
        >
          <motion.div
            className="bg-card text-foreground border border-border rounded-lg p-6"
            variants={itemVariants}
          >
            <h3 className="text-primary text-xl font-semibold mb-2">
              Leadership & University Experience
            </h3>
            <p className="text-muted-foreground text-base">
              As the Design and Publicity Director at IEEE WIE, University of
              Moratuwa, I've had the opportunity to lead creative initiatives,
              organize events, and manage design teams. This role has sharpened
              my leadership, communication, and creative thinking skills: while
              deepening my passion for design and teamwork.
            </p>
          </motion.div>
          <motion.div
            className="bg-card text-foreground border border-border rounded-lg p-6"
            variants={itemVariants}
          >
            <h3 className="text-primary text-xl font-semibold mb-2">
              UI & Visual Design
            </h3>
            <p className="text-muted-foreground text-base">
              I genuinely enjoy crafting clean, engaging, and user-friendly
              interfaces. Designing with empathy and attention to detail is
              something I take pride in whether it's building wireframes or
              polishing high-fidelity mockups in Figma. UI design is more than
              just visuals to me; it's about creating intuitive experiences.
            </p>
          </motion.div>
          <motion.div
            className="bg-card text-foreground border border-border rounded-lg p-6"
            variants={itemVariants}
          >
            <h3 className="text-primary text-xl font-semibold mb-2">
              Full-Stack Development
            </h3>
            <p className="text-muted-foreground text-base">
              My journey into full-stack development has allowed me to build
              complete web solutions, from responsive front-ends to robust
              back-end systems. I'm passionate about working across the stack to
              bring ideas to life, and I enjoy solving complex problems with
              clean, scalable code.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
