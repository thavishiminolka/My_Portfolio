"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-8 bg-card text-foreground border-t border-border">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2">
          <img
            src="/logo.png?height=40&width=120"
            alt="Your Company Logo"
            className="h-10 w-auto object-contain"
          />
        </a>
        <p className="text-sm text-muted-foreground">
          © 2025 • All rights reserved | Thavishi Weerasinghe
        </p>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 bg-background text-foreground border border-border hover:bg-muted"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </footer>
  );
}
