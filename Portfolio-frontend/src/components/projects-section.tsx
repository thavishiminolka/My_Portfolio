// "use client";
// import { useState, useEffect } from "react";
// import { ArrowRight, ExternalLink, X, Github } from "lucide-react"; // Import Github icon
// import axios from "axios";

// interface Project {
//   id: number;
//   title: string | null;
//   description: string | null;
//   image: string | null; // Base64-encoded image
//   tags: string[];
//   type: string | null;
//   status: string | null;
//   link: string | null;
// }

// export default function ProjectsSection() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);

//   // Fetch projects on mount
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get("http://localhost:5052/api/projects");
//         console.log("Fetched projects:", response.data);
//         // Map backend data to frontend structure
//         const mappedProjects = response.data.map((proj: any) => ({
//           id: proj.id,
//           title: proj.name,
//           description: proj.description,
//           image: proj.image,
//           tags: proj.technologies || [],
//           type: proj.type,
//           status: proj.status,
//           link: proj.link,
//         }));
//         setProjects(mappedProjects);
//         setLoading(false);
//       } catch (err: any) {
//         console.error("Fetch error:", err);
//         setError(
//           err.response?.data?.Error ||
//             err.message ||
//             "Failed to fetch projects. Check backend server."
//         );
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   // Open modal with selected project
//   const openModal = (project: Project) => {
//     setSelectedProject(project);
//   };

//   // Close modal
//   const closeModal = () => {
//     setSelectedProject(null);
//   };

//   // Truncate description to 100 characters
//   const truncateDescription = (desc: string | null) => {
//     if (!desc) return "No description available.";
//     return desc.length > 100 ? desc.slice(0, 100) + "..." : desc;
//   };

//   return (
//     <section
//       id="projects"
//       className="w-full py-16 md:py-24 lg:py-32 bg-background text-foreground"
//     >
//       <div className="container mx-auto px-4 space-y-12">
//         <div className="text-center">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
//             Projects
//           </h2>
//           <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
//             A selection of my projects highlighting both design creativity and
//             development skills across various technologies.
//           </p>
//         </div>
//         {loading ? (
//           <div className="text-center">Loading projects...</div>
//         ) : error ? (
//           <div className="text-center text-red-500">{error}</div>
//         ) : projects.length === 0 ? (
//           <div className="text-center">No projects found.</div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {projects.map((project) => (
//               <div
//                 key={project.id}
//                 className="bg-card text-foreground border border-border rounded-lg flex flex-col"
//               >
//                 <div className="p-0 relative">
//                   <img
//                     src={
//                       project.image
//                         ? `data:image/png;base64,${project.image}`
//                         : "/placeholder.svg?height=200&width=300"
//                     }
//                     alt={project.title || "Project"}
//                     width={400}
//                     height={250}
//                     className="rounded-t-lg object-cover w-full h-48"
//                     onError={() =>
//                       console.error(
//                         `Failed to load image for project: ${project.title}`
//                       )
//                     }
//                   />
//                   {project.status && (
//                     <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-0.5 rounded-full">
//                       {project.status}
//                     </span>
//                   )}
//                 </div>
//                 <div className="p-6 flex-grow">
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="text-xl font-semibold text-foreground">
//                       {project.title || "N/A"}
//                     </h3>
//                     {project.type && (
//                       <span className="text-sm bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
//                         {project.type}
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-muted-foreground text-sm mb-4">
//                     {truncateDescription(project.description)}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {project.tags.length > 0 ? (
//                       <>
//                         {project.tags.slice(0, 3).map((tag, index) => (
//                           <span
//                             key={index}
//                             className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-muted text-muted-foreground"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                         {project.tags.length > 3 && (
//                           <span className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
//                             +{project.tags.length - 3} more
//                           </span>
//                         )}
//                       </>
//                     ) : (
//                       <span className="text-muted-foreground text-xs">
//                         No technologies specified
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="p-6 pt-0 flex justify-between items-center">
//                   {" "}
//                   {/* Modified for alignment */}
//                   <button
//                     onClick={() => openModal(project)}
//                     className="inline-flex items-center text-primary "
//                   >
//                     View details <ArrowRight className="ml-1 h-4 w-4" />
//                   </button>
//                   {project.link && (
//                     <a
//                       href={project.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center text-primary "
//                       aria-label={`Visit project ${project.title || "project"}`}
//                     >
//                       {project.link.includes("github.com") ? (
//                         <Github className="h-4 w-4 mr-1" />
//                       ) : (
//                         <ExternalLink className="h-4 w-4 mr-1" />
//                       )}{" "}
//                       Visit Project
//                     </a>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       {/* Modal for full project details */}
//       {selectedProject && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-card text-foreground rounded-lg max-w-2xl w-full mx-4 p-6 relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-foreground hover:text-primary"
//             >
//               <X className="h-6 w-6" />
//             </button>
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-2xl font-semibold text-foreground">
//                 {selectedProject.title || "N/A"}
//               </h3>
//               {selectedProject.type && (
//                 <span className="text-sm bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
//                   {selectedProject.type}
//                 </span>
//               )}
//             </div>
//             <div className="relative mb-4">
//               <img
//                 src={
//                   selectedProject.image
//                     ? `data:image/png;base64,${selectedProject.image}`
//                     : "/placeholder.svg?height=200&width=300"
//                 }
//                 alt={selectedProject.title || "Project"}
//                 width={400}
//                 height={250}
//                 className="rounded-lg object-cover w-full h-48"
//                 onError={() =>
//                   console.error(
//                     `Failed to load image for project: ${selectedProject.title}`
//                   )
//                 }
//               />
//               {selectedProject.status && (
//                 <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-0.5 rounded-full">
//                   {selectedProject.status}
//                 </span>
//               )}
//             </div>
//             <p className="text-foreground text-base mb-4">
//               {selectedProject.description || "No description available."}
//             </p>
//             {selectedProject.link && (
//               <p className="text-foreground text-base mb-4">
//                 <strong>Link:</strong>{" "}
//                 <a
//                   href={selectedProject.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-primary  inline-flex items-center"
//                   aria-label={`Visit project ${
//                     selectedProject.title || "project"
//                   }`}
//                 >
//                   {selectedProject.link.includes("github.com") ? (
//                     <Github className="h-4 w-4 mr-1" />
//                   ) : (
//                     <ExternalLink className="h-4 w-4 mr-1" />
//                   )}{" "}
//                   Visit Project
//                 </a>
//               </p>
//             )}
//             <div className="flex flex-wrap gap-2 mb-4">
//               {selectedProject.tags.length > 0 ? (
//                 selectedProject.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-muted text-muted-foreground"
//                   >
//                     {tag}
//                   </span>
//                 ))
//               ) : (
//                 <span className="text-muted-foreground text-xs">
//                   No technologies specified
//                 </span>
//               )}
//             </div>
//             <button
//               onClick={closeModal}
//               className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, X, Github } from "lucide-react";
import axios from "axios";
import { motion, type Variants } from "framer-motion"; // Import motion and Variants

interface Project {
  id: number;
  title: string | null;
  description: string | null;
  image: string | null; // Base64-encoded image
  tags: string[];
  type: string | null;
  status: string | null;
  link: string | null;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5052/api/projects");
        console.log("Fetched projects:", response.data);
        // Map backend data to frontend structure
        const mappedProjects = response.data.map((proj: any) => ({
          id: proj.id,
          title: proj.name,
          description: proj.description,
          image: proj.image,
          tags: proj.technologies || [],
          type: proj.type,
          status: proj.status,
          link: proj.link,
        }));
        setProjects(mappedProjects);
        setLoading(false);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(
          err.response?.data?.Error ||
            err.message ||
            "Failed to fetch projects. Check backend server."
        );
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Open modal with selected project
  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  // Close modal
  const closeModal = () => {
    setSelectedProject(null);
  };

  // Truncate description to 100 characters
  const truncateDescription = (desc: string | null) => {
    if (!desc) return "No description available.";
    return desc.length > 100 ? desc.slice(0, 100) + "..." : desc;
  };

  return (
    <section
      id="projects"
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
            Projects
          </motion.h2>
          <motion.p
            className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            A selection of my projects highlighting both design creativity and
            development skills across various technologies.
          </motion.p>
        </div>
        {loading ? (
          <div className="text-center">Loading projects...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : projects.length === 0 ? (
          <div className="text-center">No projects found.</div>
        ) : (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is visible
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-card text-foreground border border-border rounded-lg flex flex-col"
                variants={itemVariants}
              >
                <div className="p-0 relative">
                  <img
                    src={
                      project.image
                        ? `data:image/png;base64,${project.image}`
                        : "/placeholder.svg?height=200&width=300"
                    }
                    alt={project.title || "Project"}
                    width={400}
                    height={250}
                    className="rounded-t-lg object-cover w-full h-48"
                    onError={() =>
                      console.error(
                        `Failed to load image for project: ${project.title}`
                      )
                    }
                  />
                  {project.status && (
                    <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {project.status}
                    </span>
                  )}
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {project.title || "N/A"}
                    </h3>
                    {project.type && (
                      <span className="text-sm bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                        {project.type}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {truncateDescription(project.description)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.length > 0 ? (
                      <>
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-muted-foreground text-xs">
                        No technologies specified
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6 pt-0 flex justify-between items-center">
                  <button
                    onClick={() => openModal(project)}
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    View details <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                      aria-label={`Visit project ${project.title || "project"}`}
                    >
                      {project.link.includes("github.com") ? (
                        <Github className="h-4 w-4 mr-1" />
                      ) : (
                        <ExternalLink className="h-4 w-4 mr-1" />
                      )}{" "}
                      Visit Project
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {/* Modal for full project details */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card text-foreground rounded-lg max-w-2xl w-full mx-4 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-foreground hover:text-primary"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-foreground">
                {selectedProject.title || "N/A"}
              </h3>
              {selectedProject.type && (
                <span className="text-sm bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                  {selectedProject.type}
                </span>
              )}
            </div>
            <div className="relative mb-4">
              <img
                src={
                  selectedProject.image
                    ? `data:image/png;base64,${selectedProject.image}`
                    : "/placeholder.svg?height=200&width=300"
                }
                alt={selectedProject.title || "Project"}
                width={400}
                height={250}
                className="rounded-lg object-cover w-full h-48"
                onError={() =>
                  console.error(
                    `Failed to load image for project: ${selectedProject.title}`
                  )
                }
              />
              {selectedProject.status && (
                <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {selectedProject.status}
                </span>
              )}
            </div>
            <p className="text-foreground text-base mb-4">
              {selectedProject.description || "No description available."}
            </p>
            {selectedProject.link && (
              <p className="text-foreground text-base mb-4">
                <strong>Link:</strong>{" "}
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary inline-flex items-center hover:underline"
                  aria-label={`Visit project ${
                    selectedProject.title || "project"
                  }`}
                >
                  {selectedProject.link.includes("github.com") ? (
                    <Github className="h-4 w-4 mr-1" />
                  ) : (
                    <ExternalLink className="h-4 w-4 mr-1" />
                  )}{" "}
                  Visit Project
                </a>
              </p>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tags.length > 0 ? (
                selectedProject.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground text-xs">
                  No technologies specified
                </span>
              )}
            </div>
            <button
              onClick={closeModal}
              className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
