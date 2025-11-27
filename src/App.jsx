import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Music, Check, ExternalLink, User, Anchor, Target, Zap, Heart } from 'lucide-react';

// --- SVG ASSETS (Dragonfly & Bubbles) ---
const Dragonfly = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 20 C52 15, 55 10, 65 5 C75 0, 85 10, 60 25 M50 20 C48 15, 45 10, 35 5 C25 0, 15 10, 40 25" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-50"/>
    <path d="M50 30 C55 35, 75 40, 90 30 C95 25, 90 15, 60 28 M50 30 C45 35, 25 40, 10 30 C5 25, 10 15, 40 28" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const OrganicBubble = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="currentColor">
    <path d="M45.7,-76.3C58.9,-69.3,69.1,-55.6,76.3,-41.2C83.5,-26.8,87.7,-11.7,85.8,2.6C83.9,16.9,75.9,30.4,66.3,42.5C56.7,54.6,45.5,65.3,32.6,71.1C19.7,76.9,5.1,77.8,-8.4,76.1C-21.9,74.4,-34.3,70.1,-46.4,63.1C-58.5,56.1,-70.3,46.4,-78.1,33.8C-85.9,21.2,-89.7,5.7,-86.3,-8.3C-82.9,-22.3,-72.3,-34.8,-61.2,-44.9C-50.1,-55,-38.5,-62.7,-26.7,-70.5C-14.9,-78.3,-2.9,-86.2,5.6,-87.5C14.1,-88.8,28.2,-83.5,45.7,-76.3Z" transform="translate(100 100)" />
  </svg>
);

// --- INTERACTIVE COMPONENTS ---

// 1. Video Player Component (YouTube Version)
const VideoPlayer = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // If no videoId is provided, we show a placeholder message
  if (true == false) {
    return (
      <div className="relative w-full aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg flex items-center justify-center mb-6 border-2 border-dashed border-gray-400">
        <p className="text-gray-500 font-mono text-center px-4">
          Add your YouTube Video ID in the code:<br/>
          <span className="text-sm bg-gray-300 px-2 py-1 rounded mt-2 inline-block">videoId="YOUR_ID_HERE"</span>
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg group cursor-pointer mb-6" onClick={() => setIsPlaying(true)}>
      {!isPlaying ? (
        <>
          {/* High-res Thumbnail from YouTube */}
          <img 
            src={`/video-cover.png`} // Ensure you have this image or use a youtube thumb url
            alt="Video Response Thumbnail"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          
          {/* Tint Overlay */}
          <div className="absolute inset-0 bg-rsc-green/10 pointer-events-none" />

          {/* Custom Play Button Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] group-hover:bg-black/10 transition-colors"
          >
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center pl-2 shadow-xl text-rsc-blue hover:scale-110 transition-transform">
              <Play fill="currentColor" className="w-10 h-10" />
            </div>
          </motion.div>
        </>
      ) : (
        /* YouTube Iframe */
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/jVoUNOVszY8?autoplay=0`} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        ></iframe>
      )}
    </div>
  );
};

// 2. Swipe Gallery Component
const SwipeGallery = ({ images }) => {
  const [index, setIndex] = useState(0);

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  
  return (
    <div className="relative w-full h-64 md:h-96 bg-gray-100 rounded-xl overflow-hidden my-10 cursor-grab active:cursor-grabbing shadow-lg group" onClick={nextImage}>
      {/* Color Tint Overlay - Subtle integration with theme */}
      <div className="absolute inset-0 bg-rsc-green/10 z-10 pointer-events-none mix-blend-multiply" />
      
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt="Memories"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>
      <div className="absolute bottom-4 right-4 z-20 bg-white/80 text-rsc-blue font-bold px-4 py-1 rounded-full text-sm backdrop-blur-md border border-rsc-blue/20">
        {index + 1} / {images.length} • Tap to swipe
      </div>
    </div>
  );
};

// 3. Question Container
const QuestionCard = ({ question, children, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-20 relative z-10"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-8 h-8 bg-rsc-blue text-white rounded-full flex items-center justify-center font-bold shrink-0 mt-1 shadow-md">
          {String.fromCharCode(97 + index)}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-rsc-blue leading-tight">{question}</h2>
      </div>
      <div className="pl-0 md:pl-12 w-full">
        {children}
      </div>
    </motion.div>
  );
};

// --- MAIN APP ---

const App = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-rsc-cream text-rsc-text overflow-x-hidden font-sans selection:bg-rsc-green/30">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Dragonfly className="absolute top-20 -right-10 w-64 h-64 text-rsc-green opacity-20 rotate-12" />
        <Dragonfly className="absolute bottom-40 -left-20 w-96 h-96 text-rsc-blue opacity-10 -rotate-12" />
        <OrganicBubble className="absolute top-1/3 left-1/4 w-[500px] h-[500px] text-rsc-green opacity-5 blur-3xl" />
        <OrganicBubble className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] text-rsc-blue opacity-5 blur-3xl" />
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-2 bg-rsc-green z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <main className="max-w-3xl mx-auto px-6 py-20 relative z-10">
        
        {/* Header */}
        <header className="mb-24 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-rsc-green/20 text-rsc-blue font-semibold text-sm mb-4 tracking-wider uppercase">
              Application
            </span>
            <h1 className="text-6xl md:text-8xl font-bold text-rsc-blue mb-4 tracking-tight">
              VALENCIA <br/>
              <span className="text-rsc-green">RSC 2026</span>
            </h1>
            <p className="text-xl text-gray-500">19/02 - 22/02 • Chair Applicant</p>
            
            <motion.div 
              className="mt-12 flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-px h-24 bg-gradient-to-b from-rsc-blue to-transparent" />
            </motion.div>
          </motion.div>
        </header>

        {/* Extra Presentation (Video) */}
        <div className="mb-24">
           <h3 className="text-2xl font-bold text-rsc-green mb-6 flex items-center gap-2">
             <Play className="w-6 h-6" /> Extra Presentation
           </h3>
           <VideoPlayer videoId="YOUR_YOUTUBE_VIDEO_ID" />
           <p className="text-sm text-gray-400 italic text-center mt-2">Optional video introduction</p>
        </div>

        {/* Questions Section */}
        <div className="space-y-24">
          
          {/* Question A: Intro */}
          <QuestionCard index={0} question="Please introduce yourself and what your motivation is to the selection panel with maximum 3 sentences.">
            <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-rsc-blue relative overflow-hidden">
                <div className="flex items-start gap-4">
                    <User className="w-8 h-8 text-rsc-blue shrink-0 opacity-50" />
                    <p className="text-gray-700 text-lg leading-relaxed text-justify italic">
                    "My name is Alex, I am a hardworking and passionate person. I am an enthusiastic EYP-er with a desire to spread our values and principles to the youth of Valencia. As this is my home, it fills me with emotion to guide and empower the next generation of my city to help them become active citizens and an engaged youth in making Europe better for everyone."
                    </p>
                </div>
            </div>
          </QuestionCard>

          {/* Question B: Skills */}
          <QuestionCard index={1} question="What skills are an essential part of chairing in your eyes? In which of these skills do you already feel confident and which ones would you like to develop further?">
             <div className="space-y-6">
               
               {/* 1. Essential Skills */}
               <motion.div whileHover={{ scale: 1.01 }} className="bg-white p-6 rounded-xl shadow-sm border border-rsc-blue/20">
                 <h3 className="font-bold text-lg text-rsc-blue mb-3 flex items-center gap-2">
                    <Anchor className="w-5 h-5" /> 1. Essential skills of chairing
                 </h3>
                 <p className="text-gray-700 leading-relaxed text-justify">
                   For me, chairing really comes down to structure, humanity, and intention. A Chair isn’t just there to keep people talking, they’re there to actually feel the room. You need to understand when the energy drops, when someone shuts down, when the group needs a bit of direction or simply a moment to breathe. Communication and active listening are the obvious ones, but the real skill is creating a space where people genuinely feel safe to speak and be themselves. A Chair protects the process, but more importantly, they protect the people in it and the meaning behind what they’re doing.
                 </p>
               </motion.div>

               {/* 2. Confident Skills */}
               <motion.div whileHover={{ scale: 1.01 }} className="bg-rsc-green/10 p-6 rounded-xl shadow-sm border border-rsc-green/20">
                 <h3 className="font-bold text-lg text-rsc-green mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5" /> 2. Skills I already feel confident in
                 </h3>
                 <p className="text-gray-700 leading-relaxed text-justify">
                   I’m naturally good at communication and organisation, probably because I’m always paying attention to everything and everyone around me. I like taking something complicated and breaking it into steps people can actually work with. And I’m very aware of dynamics, when someone gets quiet, when someone feels overshadowed, when the atmosphere shifts a bit. I put a lot of intention into making the space feel comfortable, open, and warm. That balance of “we know where we’re going” but also “you’re safe here” is something that fits very naturally with who I am.
                 </p>
               </motion.div>

               {/* 3. Skills to Develop */}
               <motion.div whileHover={{ scale: 1.01 }} className="bg-rsc-blue/5 p-6 rounded-xl shadow-sm border border-dashed border-rsc-blue/40">
                 <h3 className="font-bold text-lg text-rsc-blue mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" /> 3. Skills I want to develop further
                 </h3>
                 <p className="text-gray-700 leading-relaxed text-justify">
                   What I want to keep improving is handling the unpredictable moments, the silence, the tension, the emotional spikes that happen out of nowhere. I also want to get even better at adapting to each delegate individually, understanding their personality and pace. Chairing is continuous learning, and I want to grow in those subtle, intuitive parts that actually shape the experience.
                 </p>
               </motion.div>
             </div>
          </QuestionCard>

          {/* Question C: Goals & Support */}
          <QuestionCard index={2} question="What are your goals for the session? How can the academic board better support you towards achieving them?">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Goals */}
                <div className="bg-white p-6 rounded-xl border-t-4 border-rsc-blue shadow-sm">
                    <h3 className="font-bold text-xl text-rsc-blue mb-4 uppercase tracking-wide">My Goals</h3>
                    <p className="text-gray-700 text-sm leading-relaxed text-justify">
                    My main goal is to genuinely grow as a Chair, not just in the obvious, “technical” sense, but in the deeper, human parts of the role. I want to understand my committee inside out: what motivates them, what scares them, where their energy comes from, and how I can guide them without imposing myself. I want to create a space where they feel safe, supported, and excited to work together. I also want to challenge myself to handle the unexpected moments with more confidence. I want to enjoy it. To be present. To let the experience shape me.
                    </p>
                </div>

                {/* Support */}
                <div className="bg-white p-6 rounded-xl border-t-4 border-rsc-green shadow-sm">
                    <h3 className="font-bold text-xl text-rsc-green mb-4 uppercase tracking-wide">Board Support</h3>
                    <p className="text-gray-700 text-sm leading-relaxed text-justify">
                    What would help me the most is honest, grounded feedback. I want to know what I’m missing, what I’m not seeing, and what I can refine in real time. It helps me grow so much faster. I’d also love support in navigating the trickier committee moments, when to step back, when to step in, and how to keep the group aligned with the academic vision without losing their emotional rhythm. Clear expectations, open communication, and space to ask questions go a long way for me.
                    </p>
                </div>
            </div>
          </QuestionCard>

          {/* Question D: Obedience vs Ignore */}
          <QuestionCard index={3} question="Would you rather have your delegates ignore you or blindly obey everything you say to them?">
             <div className="bg-gradient-to-br from-white to-rsc-cream p-8 rounded-xl border border-rsc-blue/20 shadow-sm relative">
                <Zap className="absolute top-6 right-6 text-yellow-400 w-8 h-8 opacity-50" />
                
                <h3 className="font-serif text-xl text-rsc-blue italic mb-4">"I’d rather have my delegates ignore me..."</h3>
                
                <div className="space-y-4 text-gray-700 text-justify">
                    <p>
                    If I had to choose, I’d rather have my delegates ignore me than blindly obey everything I say. Blind obedience completely kills the purpose of EYP, it removes thinking, ownership, personality, everything that makes a committee feel alive. I don’t want a group that follows instructions just because I’m the Chair. That’s not leadership, that’s just control, and it doesn’t help anyone grow.
                    </p>
                    <p>
                    If they ignore me, at least they’re acting from their own thoughts and instincts. It means they’re questioning, exploring, trying to understand the process in their own way. And honestly, I’d much rather work with a group that challenges me or pushes back than one that stays silent and compliant. I’m there to guide, not to be the centre of their universe.
                    </p>
                    <div className="pt-4 border-t border-rsc-blue/10 font-medium text-rsc-blue">
                    EYP is built on curiosity and critical thinking. I’d rather deal with a bit of chaos than the emptiness of blind compliance.
                    </div>
                </div>
             </div>
          </QuestionCard>

          {/* Question E: Contact */}
           <QuestionCard index={4} question="Please provide the selection panel with an email address to send the outcome of this selection.">
            <div className="flex justify-start">
              <div className="p-6 bg-white w-full md:w-auto pr-12 rounded-xl shadow-sm border border-rsc-green/30 flex flex-col justify-center hover:bg-rsc-green/5 transition-colors">
                <span className="text-xs font-bold text-rsc-green uppercase tracking-wider mb-2">Email Address</span>
                <p className="text-lg font-mono text-rsc-blue break-all">alejandrohuguetlorente@gmail.com</p>
              </div>
            </div>
          </QuestionCard>

          {/* Extra: Gallery Section */}
          <div className="pt-10 pb-10 border-t border-b border-rsc-green/20">
             <h3 className="text-3xl font-bold text-rsc-green text-center mb-2 flex justify-center items-center gap-3">
                <Heart className="w-6 h-6 fill-rsc-green" /> Moments & Memories
             </h3>
             <p className="text-center text-gray-500">A glimpse into my EYP journey</p>
             <SwipeGallery images={[
              "/photo5.jpg",
              "/photo1.JPG", 
              "/photo2.JPG", 
              "/photo3.JPG",
              "/photo6.jpg"
            ]} />
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-32 text-center text-gray-400 pb-10">
          <p>Coded with ❤️ by Alex</p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rsc-green animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-rsc-blue animate-bounce delay-75" />
            <div className="w-2 h-2 rounded-full bg-rsc-green animate-bounce delay-150" />
          </div>
        </footer>

      </main>
    </div>
  );
};

export default App;