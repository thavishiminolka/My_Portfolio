import AboutMe from "./components/about-me";
import Header from "./components/header";
import HeroSection from "./components/hero-section";
import Education from "./components/education";
import ProjectsSection from "./components/projects-section";
import SkillsSection from "./components/skills-section";
import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import BlogsSection from "./components/blogs";

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        <AboutMe />
        <Education />
        <ProjectsSection />
        <SkillsSection />
        <BlogsSection />
        <ContactSection />
      </main>
      <Footer />
      {/* <main className="flex flex-col">
        <HeroSection />
        <AboutMe />
        <WorkExperience />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer /> */}
    </div>
  );
}

export default App;
