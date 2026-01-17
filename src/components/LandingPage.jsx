import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  Image as ImageIcon, 
  Volume1, 
  ShieldCheck,
  Heart,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-white font-nunito">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NeuroPal
            </h1>
          </motion.div>

          {/* CTA Button */}
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg transition-colors"
            >
              Launch App
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold"
                >
                  <Sparkles className="w-4 h-4" />
                  Trusted by thousands of families
                </motion.div>

                <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  A Patient Friend for{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Every Mind.
                  </span>
                </h1>

                <p className="text-2xl text-slate-600 leading-relaxed">
                  Safe, private, and endless conversations. Designed for learning, therapy, and companionship.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-xl rounded-full shadow-2xl transition-all flex items-center gap-3"
                  >
                    Get Started
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xl rounded-full shadow-lg border-2 border-slate-200 transition-all"
                >
                  Watch Demo
                </motion.button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-slate-800">10K+</div>
                  <div className="text-slate-600">Happy Users</div>
                </div>
                <div className="h-12 w-px bg-slate-300" />
                <div>
                  <div className="text-3xl font-bold text-slate-800">100%</div>
                  <div className="text-slate-600">Privacy First</div>
                </div>
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Blob Background */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] blur-2xl opacity-50"
              />

              {/* Avatar Placeholder */}
              <div className="relative z-10 aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-2xl flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-9xl"
                >
                  🤖
                </motion.div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute -top-4 -left-4 bg-yellow-400 rounded-2xl p-4 shadow-lg"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -bottom-4 -right-4 bg-pink-400 rounded-2xl p-4 shadow-lg"
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why It Works Section - Bento Box */}
      <section ref={featuresRef} className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold text-slate-800 mb-4">
              Why It Works
            </h2>
            <p className="text-xl text-slate-600">
              Built with care for minds that think differently
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Visual Learning */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-purple-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-purple-100"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                We use pictures
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Avatars show what they mean with real-time images, making conversations clearer and more engaging.
              </p>
            </motion.div>

            {/* Card 2 - Safe Voice */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-green-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-green-100"
            >
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                <Volume1 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                No scary noises
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Calm, consistent voices that never shout. Volume is always gentle and predictable.
              </p>
            </motion.div>

            {/* Card 3 - Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10 }}
              className="bg-orange-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-orange-100"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Your secrets are safe
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                We don't sell your data. Ever. Your conversations stay private and secure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Demo Teaser */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-extrabold text-slate-800 mb-4">
              Meet Buddy
            </h2>
            <p className="text-xl text-slate-600">
              See what conversations look like
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-slate-200"
          >
            {/* Mock Chat Interface */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
                  🤖
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Buddy</h3>
                  <p className="text-blue-100">Online • Ready to chat</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Avatar Message */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                  🤖
                </div>
                <div className="bg-blue-50 rounded-2xl rounded-tl-none p-6 max-w-md">
                  <p className="text-lg text-slate-800">
                    Hi! I'm Buddy. I like trains. Do you like trains? 🚂
                  </p>
                </div>
              </motion.div>

              {/* User Message */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 justify-end"
              >
                <div className="bg-purple-500 text-white rounded-2xl rounded-tr-none p-6 max-w-md">
                  <p className="text-lg">
                    Yes! Tell me about trains! 🎉
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                  👤
                </div>
              </motion.div>

              {/* Avatar Typing */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                  🤖
                </div>
                <div className="bg-blue-50 rounded-2xl rounded-tl-none p-6">
                  <div className="flex gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-3 h-3 bg-slate-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-3 h-3 bg-slate-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-3 h-3 bg-slate-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="border-t-2 border-slate-100 p-6 bg-slate-50">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-xl rounded-full shadow-lg transition-all"
                >
                  Start Chatting with Buddy →
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Tagline */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold">NeuroPal</h3>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">
                A patient friend for every mind. Safe, private, and designed with care.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    For Parents
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2026 NeuroPal. Made with ❤️ for every beautiful mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
