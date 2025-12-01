'use client'

import { useState } from 'react'
import { MessageCircle, X, Github, Linkedin, Mail, ExternalLink, Palette, Brush, Wrench, BookOpen, BarChart3, Zap, Code2, Layers, Award, Video } from 'lucide-react'
import DigitalTwinChat from './digital-twin-chat'

export default function HeroLanding() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Jhon Danver
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <a href="#home" className="text-gray-300 hover:text-white transition">Home</a>
            <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
            <a href="#skills" className="text-gray-300 hover:text-white transition">Skills</a>
            <a href="#projects" className="text-gray-300 hover:text-white transition">Projects</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight whitespace-nowrap">
                  Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Jhon Danver</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Certified HTML and CSS Developer | Web Designer | Student
                </p>
              </div>

              <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                I am a passionate web designer and student who enjoys designing responsive websites and creative visual content. With expertise in HTML, CSS, and graphic design, I specialize in UI/UX design and building systems that streamline complex processes.
              </p>

              <div className="grid grid-cols-3 gap-4 py-6">
                <div>
                  <div className="text-3xl font-bold text-blue-400">2</div>
                  <p className="text-gray-400 text-sm">Years HTML/CSS</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">3</div>
                  <p className="text-gray-400 text-sm">Major Projects</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">2</div>
                  <p className="text-gray-400 text-sm">Certifications</p>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => setShowChat(true)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition transform hover:scale-105 flex items-center gap-2"
                >
                  <MessageCircle size={20} />
                  Ask My Digital Twin
                </button>
                <a
                  href="#contact"
                  className="px-8 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-white font-semibold rounded-lg transition"
                >
                  Get In Touch
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/jedeee-ei"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-gray-400 hover:text-white transition"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/jhon-danver-abogado-abb196396/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-gray-400 hover:text-white transition"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:jhonabogado@spup.edu.ph"
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-gray-400 hover:text-white transition"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>

            {/* Right Side - Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-96">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-2xl"></div>
                
                {/* Image Container */}
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-1 overflow-hidden">
                  <img
                    src="/profile.jpg"
                    alt="Jhon Danver"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40 rounded-3xl"></div>
                </div>

                {/* Badge */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
                  Web Developer & Designer
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition">
              <Palette className="w-8 h-8 mb-3 text-blue-400" />
              <h3 className="text-xl font-semibold text-white mb-2">Web Design Expert</h3>
              <p className="text-gray-400">Certified in HTML and CSS with 2 years of expertise in responsive web design and UI/UX</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition">
              <Brush className="w-8 h-8 mb-3 text-purple-400" />
              <h3 className="text-xl font-semibold text-white mb-2">Graphic Designer</h3>
              <p className="text-gray-400">Creative visual design specializing in poster design, branding, and visual communication</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition">
              <Wrench className="w-8 h-8 mb-3 text-green-400" />
              <h3 className="text-xl font-semibold text-white mb-2">System Builder</h3>
              <p className="text-gray-400">Designing and developing comprehensive management and analytics systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">📚 Education</h3>
              <p className="text-gray-400">Certified HTML and CSS Developer with continuous learning in web development and AI technologies. Always exploring new frameworks and best practices.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">🎯 Focus</h3>
              <p className="text-gray-400">Building user-centric applications with modern frameworks. Specialized in MCP server development, RAG systems, and AI-powered web experiences.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">🌟 Values</h3>
              <p className="text-gray-400">Clean code, continuous improvement, and creating meaningful digital experiences. Passionate about open-source and knowledge sharing.</p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">My Journey</h3>
            <div className="space-y-4 text-gray-400">
              <p>
                I am a student at Saint Paul University Philippines, pursuing a Bachelor of Science in Information Technology. As a Certified HTML and CSS Developer with 2 years of hands-on experience, I've developed a strong foundation in web design and responsive development.
              </p>
              <p>
                Beyond web development, I'm passionate about graphic design and visual communication. I work with tools like Figma, Adobe Photoshop, and Adobe Illustrator to create compelling visual content. I also have beginner-level experience in video editing with tools like Adobe Premiere Pro and DaVinci Resolve.
              </p>
              <p>
                My goal is to become a lead UI/UX designer or front-end specialist in a creative and innovative company. I'm focused on learning modern web layout techniques, design systems, accessibility, and continuously improving my visual design skills. I believe in creating user-centric solutions that solve real-world problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">Web Design</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Core Languages (Expert)</p>
                  <div className="flex flex-wrap gap-2">
                    {['HTML', 'CSS'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {['UI/UX Design', 'Responsive Design', 'Web Layout', 'Color Theory', 'Typography'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-purple-400 mb-6">Design & Creative</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Graphic Design (Advanced)</p>
                  <div className="flex flex-wrap gap-2">
                    {['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Graphic Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {['Poster Design', 'Branding', 'Visual Communication', 'Layout Design'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-green-400" />
                <h4 className="text-lg font-semibold text-green-400">Soft Skills</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Creativity', 'Attention to Detail', 'Visual Communication', 'Problem-solving', 'Collaborative Design'].map(tool => (
                  <span key={tool} className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-orange-400" />
                <h4 className="text-lg font-semibold text-orange-400">Certifications</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Certified HTML Developer', 'Certified CSS Developer'].map(tool => (
                  <span key={tool} className="px-2 py-1 text-xs bg-orange-500/20 text-orange-300 rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-6 h-6 text-pink-400" />
                <h4 className="text-lg font-semibold text-pink-400">Video Editing (Beginner)</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Adobe Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Color Grading'].map(practice => (
                  <span key={practice} className="px-2 py-1 text-xs bg-pink-500/20 text-pink-300 rounded">
                    {practice}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - St. Paul University */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Projects</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Contributed to critical institutional systems and student services at St. Paul University Philippines</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Instructor Login System */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition group shadow-lg hover:shadow-xl hover:shadow-blue-500/10">
              <div className="h-48 bg-gradient-to-br from-blue-900 to-gray-900 overflow-hidden relative">
                <img src="/spup-instructor-login.jpg" alt="Instructor Login System" className="w-full h-full object-cover group-hover:scale-110 transition duration-500 brightness-90 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Instructor Login System</h3>
                <p className="text-gray-400 mb-4 text-sm">Secure authentication portal for instructors and faculty members. Provides credentials-based access to institutional resources and grade management.</p>
                <div className="flex gap-2 flex-wrap">
                  {['Authentication', 'Security', 'Credentials'].map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Dashboard */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-green-500/50 transition group shadow-lg hover:shadow-xl hover:shadow-green-500/10">
              <div className="h-48 bg-gradient-to-br from-green-900 to-gray-900 overflow-hidden relative">
                <img src="/spup-student-dashboard.jpg" alt="Student Dashboard" className="w-full h-full object-cover group-hover:scale-110 transition duration-500 brightness-90 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Student Dashboard</h3>
                <p className="text-gray-400 mb-4 text-sm">Comprehensive student portal displaying academic status, scholarship tracking, and application forms. Centralized hub for student information and services.</p>
                <div className="flex gap-2 flex-wrap">
                  {['Dashboard', 'Scholarship', 'Forms'].map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Office of the Registrar */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition group shadow-lg hover:shadow-xl hover:shadow-purple-500/10">
              <div className="h-48 bg-gradient-to-br from-purple-900 to-gray-900 overflow-hidden relative">
                <img src="/spup-registrar-portal.jpg" alt="Office of the Registrar Portal" className="w-full h-full object-cover group-hover:scale-110 transition duration-500 brightness-90 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Office of the Registrar Portal</h3>
                <p className="text-gray-400 mb-4 text-sm">Official institutional portal showcasing student records management and registration services. Provides secure access to academic records and enrollment information.</p>
                <div className="flex gap-2 flex-wrap">
                  {['Portal', 'Records', 'Registration'].map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Let's Connect</h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                I'm always excited to discuss AI projects, robotics innovations, or potential collaborations. Whether you're looking for an AI developer, data analyst, or just want to chat about technology, feel free to reach out!
              </p>

              <div className="space-y-4">
                {/* Email */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm hover:border-purple-500/50 transition">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <a href="mailto:jhonabogado@spup.edu.ph" className="text-gray-300 hover:text-purple-400 transition">
                        jhonabogado@spup.edu.ph
                      </a>
                    </div>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm hover:border-purple-500/50 transition">
                  <div className="flex items-start gap-4">
                    <Linkedin className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">LinkedIn</h3>
                      <a href="https://www.linkedin.com/in/jhon-danver-abogado-abb196396/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition flex items-center gap-2">
                        www.linkedin.com/in/jhon-danver-abogado <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* GitHub */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm hover:border-purple-500/50 transition">
                  <div className="flex items-start gap-4">
                    <Github className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">GitHub</h3>
                      <a href="https://github.com/jedeee-ei" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition flex items-center gap-2">
                        github.com/jedeee-ei <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-xl p-8 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-110 z-30"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-end p-4">
          <div className="w-full max-w-md md:max-w-lg h-[600px] md:h-[650px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl shadow-2xl border border-slate-700/50 flex flex-col overflow-hidden hover:border-slate-600/50 transition">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-5 flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Virtual Jhon Danver</h3>
                  <p className="text-sm text-blue-100">Ask me anything about my background</p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition transform hover:scale-110"
                aria-label="Close chat"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-hidden bg-gradient-to-b from-slate-900/50 to-slate-950/50">
              <DigitalTwinChat />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
