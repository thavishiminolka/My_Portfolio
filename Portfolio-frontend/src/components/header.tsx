// "use client";

// import { useState, useEffect } from "react"; // Import useRef

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState<string | null>(null); // New state for active section

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setMobileMenuOpen(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);

//     // Intersection Observer for active section highlighting
//     const sectionIds = [
//       "home",
//       "about",
//       "education",
//       "projects",
//       "skills",
//       "blogs",
//       "contact",
//     ];
//     const observerOptions = {
//       root: null,
//       rootMargin: "-50% 0px -50% 0px", // Trigger when section is in the middle of the viewport
//       threshold: 0,
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           setActiveSection(entry.target.id);
//         }
//       });
//     }, observerOptions);

//     sectionIds.forEach((id) => {
//       const section = document.getElementById(id);
//       if (section) {
//         observer.observe(section);
//       }
//     });

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       sectionIds.forEach((id) => {
//         const section = document.getElementById(id);
//         if (section) {
//           observer.unobserve(section);
//         }
//       });
//     };
//   }, []);

//   return (
//     <header className="fixed top-0 z-50 w-full bg-background/90 backdrop-blur-sm py-4 border-b border-border">
//       <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
//         <a href="#" className="flex items-center gap-2">
//           <img
//             src="/logo.png?height=40&width=120"
//             alt="Your Company Logo"
//             className="h-10 w-auto object-contain"
//           />
//         </a>
//         <button
//           className="md:hidden p-2 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           aria-expanded={mobileMenuOpen}
//           aria-controls="mobile-menu"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {mobileMenuOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             )}
//           </svg>
//           <span className="sr-only">Toggle mobile menu</span>
//         </button>
//         <nav
//           id="mobile-menu"
//           className={`${
//             mobileMenuOpen ? "flex" : "hidden"
//           } md:flex flex-col md:flex-row items-center gap-6 absolute md:static top-full left-0 w-full md:w-auto bg-background/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-4 md:py-0 border-t md:border-t-0 border-border md:border-none`}
//         >
//           <a
//             href="#home"
//             className={`hover:text-primary transition-colors py-2 md:py-0 ${
//               activeSection === "home" ? "text-primary" : "text-foreground"
//             }`}
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Home
//           </a>
//           <a
//             href="#about"
//             className={`hover:text-primary transition-colors py-2 md:py-0 ${
//               activeSection === "about" ? "text-primary" : "text-foreground"
//             }`}
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             About
//           </a>
//           <a
//             href="#education"
//             className={`hover:text-primary transition-colors py-2 md:py-0 ${
//               activeSection === "education" ? "text-primary" : "text-foreground"
//             }`}
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Education
//           </a>
//           <a
//             href="#projects"
//             className={`hover:text-primary transition-colors py-2 md:py-0 ${
//               activeSection === "projects" ? "text-primary" : "text-foreground"
//             }`}
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Projects
//           </a>
//           <a
//             href="#skills"
//             className={`hover:text-primary transition-colors py-2 md:py-0 ${
//               activeSection === "skills" ? "text-primary" : "text-foreground"
//             }`}
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Skills
//           </a>
//           <a
//             href="#blogs"
//             className={`hover:text-primary transition-colors py-2 md:py-0 ${
//               activeSection === "blogs" ? "text-primary" : "text-foreground"
//             }`}
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Blogs
//           </a>
//           <a
//             href="#contact"
//             className={`hover:text-primary transition-colors py-2 md:py-0 ${
//               activeSection === "contact" ? "text-primary" : "text-foreground"
//             }`}
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Contact
//           </a>
//         </nav>
//       </div>
//     </header>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    const sectionIds = [
      "home",
      "about",
      "education",
      "projects",
      "skills",
      "blogs",
      "contact",
    ];
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-background/90 backdrop-blur-sm py-4 border-b border-border">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <motion.img // Use motion.img for animation
            src="/logo.png?height=40&width=120"
            alt="Your Company Logo"
            className="h-10 w-auto object-contain"
            initial={{ y: 0 }} // Only initialize y
            animate={{
              y: [0, -5, 0], // Bounce animation
            }}
            transition={{
              y: {
                duration: 1,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }, // Continuous bounce
            }}
          />
        </a>
        <button
          className="md:hidden p-2 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
          <span className="sr-only">Toggle mobile menu</span>
        </button>
        <nav
          id="mobile-menu"
          className={`${
            mobileMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center gap-6 absolute md:static top-full left-0 w-full md:w-auto bg-background/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-4 md:py-0 border-t md:border-t-0 border-border md:border-none`}
        >
          <a
            href="#home"
            className={`hover:text-primary transition-colors py-2 md:py-0 ${
              activeSection === "home" ? "text-primary" : "text-foreground"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#about"
            className={`hover:text-primary transition-colors py-2 md:py-0 ${
              activeSection === "about" ? "text-primary" : "text-foreground"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#education"
            className={`hover:text-primary transition-colors py-2 md:py-0 ${
              activeSection === "education" ? "text-primary" : "text-foreground"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Education
          </a>
          <a
            href="#projects"
            className={`hover:text-primary transition-colors py-2 md:py-0 ${
              activeSection === "projects" ? "text-primary" : "text-foreground"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </a>
          <a
            href="#skills"
            className={`hover:text-primary transition-colors py-2 md:py-0 ${
              activeSection === "skills" ? "text-primary" : "text-foreground"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Skills
          </a>
          <a
            href="#blogs"
            className={`hover:text-primary transition-colors py-2 md:py-0 ${
              activeSection === "blogs" ? "text-primary" : "text-foreground"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Blogs
          </a>
          <a
            href="#contact"
            className={`hover:text-primary transition-colors py-2 md:py-0 ${
              activeSection === "contact" ? "text-primary" : "text-foreground"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
