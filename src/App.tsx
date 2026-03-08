/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ChevronRight, 
  Play, 
  FileText, 
  ArrowUpRight,
  Target,
  Zap,
  Activity,
  Award,
  TrendingUp,
  User
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const stats = [
    { label: 'Grad Year', value: '2025' },
    { label: 'B/T', value: 'L/L' },
    { label: 'Height', value: "6'3\"" },
    { label: 'Weight', value: '190 lbs' },
    { label: 'Commitment', value: 'South Carolina' },
    { label: 'FB Velo', value: '91-92 MPH' },
  ];

  const features = [
    {
      title: 'Command of the Zone',
      desc: 'Advanced ability to locate the fastball to both sides of the plate. Shows consistent strike-throwing capability with all three pitches, rarely falling behind in counts.',
      icon: <Target className="w-6 h-6 text-red-700" />
    },
    {
      title: 'Starter Efficiency',
      desc: 'Maintains a low pitch count by inducing early contact and attacking hitters. Possesses the stamina and repeatable mechanics to handle a heavy workload.',
      icon: <Activity className="w-6 h-6 text-red-700" />
    },
    {
      title: 'Pitchability',
      desc: 'More than just "stuff." Understands how to sequence pitches, change eye levels, and disrupt a hitter\'s timing. Poised under pressure with runners on base.',
      icon: <Zap className="w-6 h-6 text-red-700" />
    },
    {
      title: 'Physical Projection',
      desc: 'Classic "long and lean" LHP build. Broad shoulders and athletic frame suggest significant strength gains are coming, supporting future velocity jumps.',
      icon: <TrendingUp className="w-6 h-6 text-red-700" />
    },
    {
      title: 'Competitive Makeup',
      desc: 'A "bulldog" on the mound. Composed, disciplined, and coachable. Leads by example and thrives in high-stakes environments against elite competition.',
      icon: <Award className="w-6 h-6 text-red-700" />
    },
    {
      title: 'Marketability & Presence',
      desc: 'Carries himself with professional poise. Marketable personality with a strong work ethic that resonates with teammates, coaches, and scouts alike.',
      icon: <User className="w-6 h-6 text-red-700" />
    }
  ];

  const tools = [
    { name: 'Fastball', present: 50, future: 60, notes: 'Late life, commands both sides, 91-92 mph range.' },
    { name: 'Breaking Ball', present: 45, future: 55, notes: 'Sharp 1-7 shape, effective against both L/R hitters.' },
    { name: 'Changeup', present: 50, future: 60, notes: 'Plus fade and tumble, deceptive arm speed.' },
    { name: 'Command/Control', present: 55, future: 65, notes: 'Elite strike-throwing ability, advanced for age.' },
    { name: 'Future Projection', present: 0, future: 60, notes: 'High-upside starter profile with physical growth remaining.' }
  ];

  const metrics = [
    { label: 'Avg FB Velo', value: '91.4' },
    { label: 'Peak Velo', value: '92.8' },
    { label: 'Strike %', value: '68%' },
    { label: '1st Pitch Strike', value: '72%' },
    { label: 'Whiff Rate', value: '24%' },
    { label: 'K/BB Ratio', value: '3.2' },
    { label: 'Pitches / Inn', value: '14.2' },
    { label: 'Extension', value: "6.8'" },
    { label: 'Vert Break', value: '18.5"' },
    { label: 'FB Spin Rate', value: '2450' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-red-800 selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-800 z-[1100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-xl font-black tracking-tighter">SPENCER KRASNER</a>
          <div className="hidden md:flex gap-8 items-center">
            {['About', 'Scouting', 'Metrics', 'Video', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/baseball-pitcher/1920/1080?grayscale" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-red-700 font-bold uppercase tracking-[0.2em] mb-4 text-sm md:text-base">
              Projectable LHP | Command. Efficiency. Upside.
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
              SPENCER <br /> KRASNER
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
              A left-handed pitcher with advanced strike-throwing ability, starter traits, competitive makeup, and physical projection still remaining.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-red-800 hover:bg-red-900 text-white font-bold uppercase tracking-widest text-sm rounded transition-all flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" /> Watch Video
              </button>
              <button className="px-8 py-4 border-2 border-white hover:bg-white hover:text-slate-950 text-white font-bold uppercase tracking-widest text-sm rounded transition-all">
                View Scouting Profile
              </button>
            </div>
          </motion.div>
        </div>

        {/* Quick Facts Bar */}
        <div className="absolute bottom-0 w-full bg-slate-900/95 border-t border-white/10 py-8 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</span>
                  <span className="block text-lg font-black text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-2/3">
              <h2 className="text-4xl font-black tracking-tighter uppercase mb-8 flex items-center gap-4">
                Player Overview
                <div className="h-1 w-20 bg-red-800" />
              </h2>
              <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                <p>
                  Spencer Krasner represents the modern prototype of a projectable left-handed starter. While many evaluators focus solely on the radar gun, Spencer stands out for his ability to command the baseball, control the tempo of the game, and attack the zone with a polished three-pitch mix.
                </p>
                <p>
                  Currently committed to the University of South Carolina, Spencer has demonstrated the poise and maturity required to navigate high-level lineups. His delivery is repeatable and efficient, allowing him to maintain velocity deep into starts while showing a high "feel to pitch" that keeps hitters off-balance.
                </p>
                <p>
                  The most intriguing aspect of Spencer's profile is the physical upside. At 6'3" and 190 pounds, his frame is lean and athletic with significant room for strength gains. As he matures physically and adds approximately 20 pounds of functional weight, evaluators project a natural jump in velocity and overall power output.
                </p>
              </div>
            </div>
            <div className="lg:w-1/3 w-full">
              <div className="bg-slate-900 p-8 rounded-xl border border-white/5 shadow-2xl">
                <h3 className="text-xl font-bold uppercase tracking-tight mb-6 border-b border-red-800 pb-2">Bio Details</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Full Name', value: 'Spencer Krasner' },
                    { label: 'Position', value: 'LHP' },
                    { label: 'Throws/Bats', value: 'L/L' },
                    { label: 'Height', value: "6'3\"" },
                    { label: 'Weight', value: '190 lbs' },
                    { label: 'Hometown', value: 'Fort Lauderdale, FL' },
                    { label: 'High School', value: 'American Heritage' },
                    { label: 'College', value: 'South Carolina' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 text-sm">
                      <span className="text-slate-500 font-semibold">{item.label}</span>
                      <span className="text-white font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-16 text-center">
            Why Spencer Stands Out
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-slate-900 p-10 rounded-xl border-l-4 border-red-800 shadow-xl hover:bg-slate-800 transition-all"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold uppercase mb-4">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scouting Profile */}
      <section id="scouting" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-16 text-center">
            Scouting Profile
          </h2>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-slate-900 p-10 rounded-xl border border-white/5">
              <h3 className="text-2xl font-bold uppercase mb-6">Scouting Snapshot</h3>
              <p className="text-red-700 font-bold italic mb-6 text-lg">
                "A projectable left-handed starter whose command, efficiency, and feel to pitch currently stand out, with additional velocity upside expected as physical development continues."
              </p>
              <p className="text-slate-400 leading-relaxed">
                Spencer profiles as a future rotation piece at the next level. His ability to manipulate the baseball and navigate lineups with intelligence makes him a high-floor prospect, while the frame and arm action provide a ceiling that evaluators find highly attractive.
              </p>
            </div>
            <div className="space-y-8">
              {tools.map((tool) => (
                <div key={tool.name} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black uppercase tracking-widest">{tool.name}</span>
                    <span className="text-xs font-bold text-red-700">
                      {tool.present > 0 ? `PV: ${tool.present} | ` : ''}FV: {tool.future}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.future}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-red-800"
                    />
                  </div>
                  <p className="text-xs text-slate-500 italic">{tool.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section id="metrics" className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 text-center">
            Performance Metrics
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            Performance data should reinforce the profile: efficient innings, consistent strike throwing, and traits that support a future starter projection.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {metrics.map((metric) => (
              <div key={metric.label} className="bg-slate-950 p-8 rounded-xl border border-white/5 text-center hover:border-red-800/50 transition-colors">
                <span className="block text-3xl font-black text-white mb-1">{metric.value}</span>
                <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-16 text-center">
            Video Gallery
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Full Bullpen Session', desc: 'Complete look at mechanics and three-pitch mix from multiple angles.' },
              { title: 'Game Highlights', desc: 'In-game footage showing command and sequencing against elite competition.' },
              { title: 'Slow Motion Mechanics', desc: 'Detailed breakdown of delivery, arm action, and release point.' }
            ].map((video, idx) => (
              <div key={idx} className="bg-slate-900 rounded-xl overflow-hidden border border-white/5 group">
                <div className="aspect-video bg-black flex items-center justify-center relative cursor-pointer">
                  <Play className="w-12 h-12 text-white/50 group-hover:text-red-700 transition-colors" />
                  <div className="absolute inset-0 bg-red-800/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h4 className="font-bold uppercase mb-2">{video.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{video.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Section */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-6 text-center">
            Projection Still Remaining
          </h2>
          <p className="text-slate-400 text-center max-w-3xl mx-auto mb-16 text-lg">
            Spencer’s present performance already shows advanced command and game management, while his body still has room for significant strength gains. Evaluators project that an additional 15-20 pounds of functional weight could further elevate the fastball velocity and overall power output.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-950 p-10 rounded-xl border border-white/5">
              <h3 className="text-xl font-bold uppercase mb-8 flex items-center gap-3">
                <div className="w-2 h-2 bg-slate-500 rounded-full" />
                Current Profile
              </h3>
              <ul className="space-y-4 text-slate-400">
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Weight</span> <span className="text-white font-bold">190 lbs</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span>FB Velo</span> <span className="text-white font-bold">91-92 MPH</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Build</span> <span className="text-white font-bold">Lean, Athletic</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Role</span> <span className="text-white font-bold">Efficient Starter</span></li>
              </ul>
            </div>
            <div className="bg-slate-800 p-10 rounded-xl border border-red-800/50">
              <h3 className="text-xl font-bold uppercase mb-8 flex items-center gap-3">
                <div className="w-2 h-2 bg-red-700 rounded-full" />
                Projected Upside
              </h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex justify-between border-b border-white/10 pb-2"><span>Weight</span> <span className="text-white font-bold">210 lbs (Target)</span></li>
                <li className="flex justify-between border-b border-white/10 pb-2"><span>FB Velo</span> <span className="text-white font-bold">94-96 MPH Range</span></li>
                <li className="flex justify-between border-b border-white/10 pb-2"><span>Build</span> <span className="text-white font-bold">Physical Starter Frame</span></li>
                <li className="flex justify-between border-b border-white/10 pb-2"><span>Role</span> <span className="text-white font-bold">Front-line Potential</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-16 text-center">
            Evaluator Feedback
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "Spencer is one of the most intelligent pitchers I've coached. His ability to adjust mid-game and command the zone with three pitches is rare at this age.", author: "Head Coach", title: "Varsity Baseball" },
              { quote: "The arm action is clean and the delivery is effortless. As he adds strength, the velocity jump is inevitable. He's a true starter profile.", author: "Pitching Coordinator", title: "Player Development" },
              { quote: "Love the poise. He doesn't get rattled. He commands the game as much as he commands his pitches. A high-ceiling LHP.", author: "Area Scout", title: "MLB Organization" }
            ].map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-10 rounded-xl relative border border-white/5">
                <p className="text-slate-400 italic mb-8 relative z-10 leading-relaxed">"{t.quote}"</p>
                <div>
                  <span className="block font-bold uppercase text-sm">{t.author}</span>
                  <span className="block text-xs text-slate-500 uppercase tracking-widest">{t.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-16 text-center">
            Scout & Media Requests
          </h2>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="bg-slate-950 border border-white/10 p-4 rounded outline-none focus:border-red-800 transition-colors" />
                <input type="text" placeholder="Last Name" className="bg-slate-950 border border-white/10 p-4 rounded outline-none focus:border-red-800 transition-colors" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-slate-950 border border-white/10 p-4 rounded outline-none focus:border-red-800 transition-colors" />
              <input type="text" placeholder="Organization / Role" className="w-full bg-slate-950 border border-white/10 p-4 rounded outline-none focus:border-red-800 transition-colors" />
              <textarea rows={5} placeholder="Your Message / Request" className="w-full bg-slate-950 border border-white/10 p-4 rounded outline-none focus:border-red-800 transition-colors" />
              <button className="w-full py-4 bg-red-800 hover:bg-red-900 text-white font-bold uppercase tracking-widest rounded transition-all">
                Send Request
              </button>
            </div>
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold uppercase mb-6">Get In Touch</h3>
                <p className="text-slate-400 mb-8">
                  For serious inquiries regarding scouting reports, full video packages, or interview requests, please use the form or contact information below.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-300">
                    <Mail className="w-5 h-5 text-red-700" />
                    <span>michael@fusiontechdesign.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <Phone className="w-5 h-5 text-red-700" />
                    <span>(555) 123-4567</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 py-4 border border-white/10 hover:bg-white hover:text-slate-950 font-bold uppercase text-xs tracking-widest rounded transition-all flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" /> Download PDF
                </button>
                <button className="flex-1 py-4 border border-white/10 hover:bg-white hover:text-slate-950 font-bold uppercase text-xs tracking-widest rounded transition-all flex items-center justify-center gap-2">
                  <ArrowUpRight className="w-4 h-4" /> Video Package
                </button>
              </div>
              <div className="flex gap-6">
                <Twitter className="w-6 h-6 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-6 h-6 text-slate-500 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <span className="text-2xl font-black tracking-tighter mb-2 block">SPENCER KRASNER</span>
          <p className="text-xs text-slate-500 uppercase tracking-[0.3em] mb-8">LHP Prospect Profile | Class of 2025</p>
          <div className="w-12 h-1 bg-red-800 mx-auto mb-8" />
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">
            &copy; 2026 Spencer Krasner. All Rights Reserved. Designed for Professional Evaluation.
          </p>
        </div>
      </footer>
    </div>
  );
}
