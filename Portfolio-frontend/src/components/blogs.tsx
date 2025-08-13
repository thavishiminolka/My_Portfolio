// "use client";
// import React, { useState, useEffect } from "react";
// import { SunMediumIcon as Medium } from "lucide-react";
// import axios from "axios";

// interface BlogCardProps {
//   id: number;
//   imageSrc: string | null;
//   topic: string | null;
//   description: string | null;
//   link: string | null;
// }

// const BlogCard: React.FC<BlogCardProps> = ({
//   imageSrc,
//   topic,
//   description,
//   link,
// }) => {
//   return (
//     <div
//       className="bg-card text-foreground border border-border rounded-lg p-6 flex flex-col items-start gap-4
//                     transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
//     >
//       <img
//         src={
//           imageSrc
//             ? `data:image/png;base64,${imageSrc}`
//             : "/placeholder.svg?height=250&width=400"
//         }
//         alt={topic || "Blog post"}
//         width={400}
//         height={250}
//         className="rounded-md object-cover w-full h-48 mb-4"
//         onError={() => console.error(`Failed to load image for blog: ${topic}`)}
//       />
//       <h3 className="text-xl font-semibold text-foreground mb-2">
//         {topic || "N/A"}
//       </h3>
//       <p className="text-muted-foreground text-base flex-grow">
//         {description || "No description available."}
//       </p>
//       {link ? (
//         <a
//           href={link}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-flex items-center text-primary hover:underline mt-4"
//           aria-label={`Read more about ${topic || "blog post"}`}
//         >
//           <Medium className="h-6 w-6 mr-2" /> Read More On Medium
//         </a>
//       ) : (
//         <div className="inline-flex items-center text-gray-400 mt-4">
//           <Medium className="h-6 w-6 mr-2" /> No Link Available
//         </div>
//       )}
//     </div>
//   );
// };

// export default function BlogsSection() {
//   const [blogs, setBlogs] = useState<BlogCardProps[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch blogs on mount
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axios.get("http://localhost:5052/api/blogs");
//         console.log("Fetched blogs:", response.data);
//         // Log image data for debugging
//         response.data.forEach((blog: any, index: number) => {
//           console.log(
//             `Blog ${index + 1} image:`,
//             blog.image ? blog.image.slice(0, 50) + "..." : "null"
//           );
//           console.log(`Blog ${index + 1} link:`, blog.link || "null");
//         });
//         // Map backend data to frontend structure
//         const mappedBlogs = response.data.map((blog: any) => ({
//           id: blog.id,
//           imageSrc: blog.image,
//           topic: blog.topic,
//           description: blog.description,
//           link: blog.link, // Now using the actual link from database
//         }));
//         setBlogs(mappedBlogs);
//         setLoading(false);
//       } catch (err: any) {
//         console.error("Fetch error:", err);
//         setError(err.message || "Failed to fetch blogs. Check backend server.");
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   return (
//     <section
//       id="blogs"
//       className="w-full py-16 md:py-24 lg:py-32 bg-background text-foreground"
//     >
//       <div className="container mx-auto px-4 space-y-12">
//         <div className="text-center">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
//             My Blogs
//           </h2>
//           <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
//             Thoughts, insights, and tutorials on web development, design, and
//             technology.
//           </p>
//         </div>
//         {loading ? (
//           <div className="text-center">Loading blogs...</div>
//         ) : error ? (
//           <div className="text-center text-red-500">{error}</div>
//         ) : blogs.length === 0 ? (
//           <div className="text-center">No blog posts found.</div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
//             {blogs.map((post) => (
//               <BlogCard
//                 key={post.id}
//                 id={post.id}
//                 imageSrc={post.imageSrc}
//                 topic={post.topic}
//                 description={post.description}
//                 link={post.link}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { SunMediumIcon as Medium } from "lucide-react";
import axios from "axios";
import { motion, type Variants } from "framer-motion"; // Import motion and Variants

interface BlogCardProps {
  id: number;
  imageSrc: string | null;
  topic: string | null;
  description: string | null;
  link: string | null;
}

// Define animation variants for individual blog cards
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

const BlogCard: React.FC<BlogCardProps> = ({
  imageSrc,
  topic,
  description,
  link,
}) => {
  return (
    <motion.div // Use motion.div for animation
      className="bg-card text-foreground border border-border rounded-lg p-6 flex flex-col items-start gap-4 transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
      variants={itemVariants} // Apply item variants
    >
      <img
        src={
          imageSrc
            ? `data:image/png;base64,${imageSrc}`
            : "/placeholder.svg?height=250&width=400"
        }
        alt={topic || "Blog post"}
        width={400}
        height={250}
        className="rounded-md object-cover w-full h-48 mb-4"
        onError={() => console.error(`Failed to load image for blog: ${topic}`)}
      />
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {topic || "N/A"}
      </h3>
      <p className="text-muted-foreground text-base flex-grow">
        {description || "No description available."}
      </p>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:underline mt-4"
          aria-label={`Read more about ${topic || "blog post"}`}
        >
          <Medium className="h-6 w-6 mr-2" /> Read More On Medium
        </a>
      ) : (
        <div className="inline-flex items-center text-gray-400 mt-4">
          <Medium className="h-6 w-6 mr-2" /> No Link Available
        </div>
      )}
    </motion.div>
  );
};

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define animation variants for the container
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

  // Fetch blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5052/api/blogs");
        console.log("Fetched blogs:", response.data);
        // Log image data for debugging
        response.data.forEach((blog: any, index: number) => {
          console.log(
            `Blog ${index + 1} image:`,
            blog.image ? blog.image.slice(0, 50) + "..." : "null"
          );
          console.log(`Blog ${index + 1} link:`, blog.link || "null");
        });
        // Map backend data to frontend structure
        const mappedBlogs = response.data.map((blog: any) => ({
          id: blog.id,
          imageSrc: blog.image,
          topic: blog.topic,
          description: blog.description,
          link: blog.link, // Now using the actual link from database
        }));
        setBlogs(mappedBlogs);
        setLoading(false);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch blogs. Check backend server.");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section
      id="blogs"
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
            My Blogs
          </motion.h2>
          <motion.p
            className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            Thoughts, insights, and tutorials on web development, design, and
            technology.
          </motion.p>
        </div>
        {loading ? (
          <div className="text-center">Loading blogs...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center">No blog posts found.</div>
        ) : (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is visible
          >
            {blogs.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                imageSrc={post.imageSrc}
                topic={post.topic}
                description={post.description}
                link={post.link}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
