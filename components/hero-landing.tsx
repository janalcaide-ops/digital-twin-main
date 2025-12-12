"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  MessageCircle,
  X,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ChevronRight,
  Award,
  Briefcase,
  GraduationCap,
  Target,
  Palette,
  Code,
  Star,
  Send,
  Sparkles,
} from "lucide-react";
import DigitalTwinChat from "./digital-twin-chat";
import { sendContactMessage } from "@/app/actions/contact";

export default function UniquePortfolio() {
  const [showChat, setShowChat] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const sections = [
    { id: "hero", name: "Intro" },
    { id: "about", name: "Journey" },
    { id: "skills", name: "Expertise" },
    { id: "projects", name: "Portfolio" },
    { id: "contact", name: "Connect" },
  ];

  const handleDotClick = (index: number) => {
    setActiveSection(index);
    const sectionId = sections[index].id;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Update active section on scroll using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionIndex = sections.findIndex(
            (section) => section.id === entry.target.id
          );
          if (sectionIndex !== -1) {
            setActiveSection(sectionIndex);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      const result = await sendContactMessage(formData);

      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus("");
        }, 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => {
          setFormStatus("");
        }, 5000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus("error");
      setTimeout(() => {
        setFormStatus("");
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
      {/* Side Navigation */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col gap-4">
          {sections.map((section, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeSection === i
                  ? "bg-violet-600 scale-150"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              title={section.name}
            />
          ))}
        </div>
      </div>

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-30">
        <div className="max-w-screen-2xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-bold text-xl text-violet-700 drop-shadow-lg">
              JAN ALCAIDE
            </span>
          </div>
          <button
            onClick={() => setShowChat(true)}
            className="px-6 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition text-sm font-medium"
          >
            Talk to AI
          </button>
        </div>
      </div>

      {/* Hero - Full Screen */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-8 pt-20"
      >
        <div className="max-w-screen-xl w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text Content */}
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-semibold">
                👋 Welcome to my world
              </div>

              <h1 className="text-6xl lg:text-7xl font-black tracking-tighter leading-none">
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  HI I'M
                </span>
                <br />
                <span className="text-gray-900">JAN ALCAIDE</span>
              </h1>

              <p className="text-2xl text-gray-600 font-light">
                Certified MCF AI-900 | Artificial Intelligence Student | AI
                Developer
              </p>

              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-4xl font-bold text-violet-600">2+</div>
                  <div className="text-sm text-gray-500 mt-1">Years</div>
                </div>
                <div className="w-px bg-gray-300"></div>
                <div>
                  <div className="text-4xl font-bold text-blue-600">2</div>
                  <div className="text-sm text-gray-500 mt-1">Projects</div>
                </div>
                <div className="w-px bg-gray-300"></div>
                <div>
                  <div className="text-4xl font-bold text-purple-600">
                    AI-900
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Certified</div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/janalcaide-ops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-white hover:scale-110 transition"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/jan-cornelius-miguel-alcaide-619a07393/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white hover:scale-110 transition"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:janalcaide@spup.edu.ph"
                  className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center text-white hover:scale-110 transition"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>

            {/* Right - Profile Picture */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>

                {/* Main Image Container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full"></div>
                  <div className="absolute inset-2 bg-white rounded-full overflow-hidden">
                    <Image
                      src="/profile.png"
                      alt="Jan Alcaide"
                      width={400}
                      height={400}
                      priority
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 -right-4 px-6 py-3 bg-white rounded-2xl shadow-2xl border-4 border-violet-100">
                    <div className="text-sm font-semibold text-gray-600">
                      AI Developer
                    </div>
                    <div className="text-xs text-violet-600">
                      Available for work
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-16 animate-bounce">
            <ChevronRight className="w-8 h-8 text-gray-400 mx-auto rotate-90" />
          </div>
        </div>
      </section>

      {/* About - Different Layout */}
      <section id="about" className="py-32 px-8 bg-gray-900 text-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="text-violet-400 font-semibold mb-4 flex items-center gap-2">
                <div className="w-8 h-px bg-violet-400"></div>
                WHO I AM
              </div>
              <h2 className="text-5xl font-bold mb-8 leading-tight">
                Building Tomorrow's
                <br />
                <span className="text-violet-400">Intelligence</span>
              </h2>
              <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                <p>
                  Currently pursuing my Bachelor of Science in Artificial
                  Intelligence at Saint Paul University Philippines, where
                  theory meets practice.
                </p>
                <p>
                  I don't just code—I create experiences. From neural networks
                  that learn to game worlds that breathe, my work spans the
                  spectrum of intelligent systems.
                </p>
                <p>
                  My toolkit includes PyTorch, TensorFlow, Godot, Unity, and
                  Unreal Engine. But more importantly, I bring curiosity,
                  creativity, and a relentless drive to solve complex problems.
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              {[
                {
                  icon: GraduationCap,
                  title: "Education",
                  desc: "BS Artificial Intelligence",
                },
                { icon: Briefcase, title: "Focus", desc: "ML & Game Dev" },
                { icon: Target, title: "Goal", desc: "Full Stack Developer" },
                { icon: Award, title: "Certified", desc: "MCF AI-900" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl hover:bg-white/20 transition"
                >
                  <item.icon className="w-10 h-10 text-violet-400 mb-4" />
                  <div className="text-sm text-gray-400 mb-1">{item.title}</div>
                  <div className="font-semibold">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills - Card Grid */}
      <section id="skills" className="py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-violet-600 font-semibold mb-4">WHAT I DO</div>
            <h2 className="text-5xl font-bold text-gray-900">
              Technical Stack
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-8 rounded-3xl text-white">
              <Code className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">AI Development</h3>
              <div className="space-y-3 mb-6">
                <p className="text-violet-100">Python • SQL</p>
                <p className="text-violet-100">PyTorch • TensorFlow</p>
                <p className="text-violet-100">scikit-learn • Pandas</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["ML", "Deep Learning", "NLP", "Computer Vision"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-8 rounded-3xl text-white">
              <Palette className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Game Design</h3>
              <div className="space-y-3 mb-6">
                <p className="text-blue-100">Godot Engine</p>
                <p className="text-blue-100">Unreal Engine</p>
                <p className="text-blue-100">Unity • Blender</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["2D/3D", "Level Design", "Mechanics", "Narrative"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-8 rounded-3xl text-white">
              <Star className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Core Skills</h3>
              <div className="space-y-3 mb-6">
                <p className="text-pink-100">Problem Solving</p>
                <p className="text-pink-100">Creative Thinking</p>
                <p className="text-pink-100">Team Collaboration</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Prototyping", "Deployment", "Analytics", "Research"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects - Timeline Style */}
      <section
        id="projects"
        className="py-32 px-8 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-violet-600 font-semibold mb-4">MY WORK</div>
            <h2 className="text-5xl font-bold text-gray-900">
              Featured Projects
            </h2>
          </div>

          <div className="space-y-12">
            {[
              {
                title: "Language Learning AI Platform",
                desc: "Intelligent authentication system with AI-powered practice modules, personalized learning paths, and real-time progress tracking for students and instructors.",
                tech: ["AI", "Authentication", "Analytics"],
                color: "from-violet-500 to-purple-500",
              },
              {
                title: "Blood Sync Mobile App",
                desc: "Comprehensive blood bank management system featuring real-time inventory tracking, donor information management, and streamlined donation processes.",
                tech: ["Mobile", "Healthcare", "Real-time Database"],
                color: "from-red-500 to-pink-500",
              },
              {
                title: "Registrar Portal System",
                desc: "Secure institutional portal for student records management, enrollment processing, and academic information access with role-based authentication.",
                tech: ["Web Portal", "Security", "Records Management"],
                color: "from-blue-500 to-cyan-500",
              },
            ].map((project, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="flex-shrink-0 w-32 text-right">
                  <div className="text-4xl font-bold text-gray-300 group-hover:text-violet-600 transition">
                    0{i + 1}
                  </div>
                </div>
                <div className="flex-1 border-l-4 border-gray-200 group-hover:border-violet-600 pl-8 pb-8 transition">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - Split Screen */}
      <section id="contact" className="min-h-screen flex">
        <div className="w-full lg:w-1/2 bg-violet-600 text-white p-16 flex items-center">
          <div className="max-w-xl">
            <h2 className="text-6xl font-bold mb-8">
              Let's Create Something Amazing
            </h2>
            <p className="text-xl text-violet-100 mb-12 leading-relaxed">
              Whether it's AI development, game design, or system
              architecture—I'm ready to collaborate on your next big idea.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  text: "janalcaide@spup.edu.ph",
                  href: "mailto:janalcaide@spup.edu.ph",
                },
                {
                  icon: Linkedin,
                  text: "Connect on LinkedIn",
                  href: "https://www.linkedin.com/in/jan-cornelius-miguel-alcaide-619a07393/",
                },
                {
                  icon: Github,
                  text: "View GitHub Profile",
                  href: "https://github.com/janalcaide-ops",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-xl hover:translate-x-2 transition group"
                >
                  <item.icon className="w-6 h-6" />
                  <span className="group-hover:underline">{item.text}</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 bg-white p-16 items-center justify-center">
          <div className="w-full max-w-md">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Send a Message
            </h3>
            <div className="space-y-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="w-full px-0 py-4 border-b-2 border-gray-300 focus:border-violet-600 focus:outline-none text-lg transition placeholder-gray-500"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address"
                className="w-full px-0 py-4 border-b-2 border-gray-300 focus:border-violet-600 focus:outline-none text-lg transition placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                className="w-full px-0 py-4 border-b-2 border-gray-300 focus:border-violet-600 focus:outline-none text-lg transition placeholder-gray-500"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message"
                rows={4}
                className="w-full px-0 py-4 border-b-2 border-gray-300 focus:border-violet-600 focus:outline-none text-lg transition resize-none placeholder-gray-500"
                required
              />
              <button
                onClick={handleSubmit}
                disabled={formStatus === "sending"}
                className="w-full py-4 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition font-semibold text-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === "sending"
                  ? "Sending..."
                  : formStatus === "success"
                  ? "Message Sent! ✓"
                  : "Send Message"}
                {formStatus !== "sending" && formStatus !== "success" && (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                )}
              </button>
              {formStatus === "success" && (
                <p className="text-green-600 text-center font-semibold">
                  Thank you! I'll get back to you soon.
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-red-600 text-center font-semibold">
                  Error sending message. Please try again.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-violet-600 text-white rounded-full shadow-2xl hover:scale-110 transition z-40 flex items-center justify-center"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {showChat && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">
                  AI Digital Twin
                </h3>
                <p className="text-violet-200 text-sm"></p>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <DigitalTwinChat />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
