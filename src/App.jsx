import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Play, Check, Camera, Aperture, Eye, PenTool, Palette, Mail, Phone } from 'lucide-react';

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

// 1. Video Player Component
const VideoPlayer = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // If no videoId is provided placeholder
  if (true == false) {
    return (
      <div className="relative w-full aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg flex items-center justify-center mb-6 border-2 border-dashed border-gray-400">
        <p className="text-gray-500 font-mono text-center px-4">
          Add your YouTube Video ID in the code
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg group cursor-pointer mb-6" onClick={() => setIsPlaying(true)}>
      {!isPlaying ? (
        <>
          {/* Cover Image */}
          <img 
            src={`/video-cover.png`} // Ensure you have an image here or remove/replace
            alt="Video Response Thumbnail"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-rsc-green/10 pointer-events-none" />
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
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/qNjEO-0bE1g?autoplay=0`} 
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
    <div className="relative w-full h-64 md:h-96 bg-gray-100 rounded-xl overflow-hidden my-6 cursor-grab active:cursor-grabbing shadow-lg group" onClick={nextImage}>
      <div className="absolute inset-0 bg-rsc-green/10 z-10 pointer-events-none mix-blend-multiply" />
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt="Portfolio Work"
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

// 3. Reveal List Component (For Ranking)
const RevealList = ({ items }) => {
  const [revealedIndex, setRevealedIndex] = useState(-1);

  const revealNext = () => {
    if (revealedIndex < items.length - 1) {
      setRevealedIndex(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-3 my-6">
      <div className="text-sm text-gray-400 mb-2 italic">Tap to reveal my preferences...</div>
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          onClick={revealNext}
          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between
            ${idx <= revealedIndex 
              ? 'bg-rsc-green text-black border-rsc-green shadow-md font-semibold' 
              : 'bg-white border-dashed border-gray-300 text-gray-400 hover:bg-gray-50'
            }`}
          initial={false}
          animate={{ 
            scale: idx === revealedIndex ? 1.02 : 1,
            y: idx > revealedIndex ? 0 : 0 
          }}
        >
          <div className="flex items-center gap-3">
            <span className={`font-bold text-lg ${idx <= revealedIndex ? 'text-black' : 'opacity-50'}`}>#{idx + 1}</span>
            <span className="text-lg">
              {idx <= revealedIndex ? item : "???"}
            </span>
          </div>
          {idx <= revealedIndex && <Check className="w-5 h-5 text-black" />}
        </motion.div>
      ))}
    </div>
  );
};

// 4. Question Container
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
            <h1 className="text-5xl md:text-8xl font-bold text-rsc-blue mb-4 tracking-tight">
              VALENCIA <br/>
              <span className="text-rsc-green">RSC 2026</span>
            </h1>
            <p className="text-xl text-gray-500">19/02 - 22/02 • Media Team Applicant</p>
            
            <motion.div 
              className="mt-12 flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-px h-24 bg-gradient-to-b from-rsc-blue to-transparent" />
            </motion.div>
          </motion.div>
        </header>

        {/* Questions Section */}
        <div className="space-y-24">
          
          {/* Question A: Intro (Video) */}
          <QuestionCard index={0} question="Who are you? No generic answers, I need you know in person, not in Media.">
            <div className="mb-4 text-sm text-gray-500 italic">Watch my introduction below:</div>
            {/* REPLACE "YOUR_YOUTUBE_VIDEO_ID" below */}
            <VideoPlayer videoId="YOUR_YOUTUBE_VIDEO_ID" />
          </QuestionCard>

          {/* Question B: Role & Giving/Receiving */}
          <QuestionCard index={1} question="What role do you see yourself playing within the Media Team? What can you give and what would you like to receive?">
             <div className="space-y-6">
               
               {/* 1. The Role */}
               <motion.div whileHover={{ scale: 1.01 }} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-rsc-blue relative">
                 <div className="absolute top-4 right-4 opacity-10 text-rsc-blue">
                    <Aperture className="w-12 h-12" />
                 </div>
                 <h3 className="font-bold text-lg text-rsc-blue mb-3">Intention & Awareness</h3>
                 <p className="text-gray-700 leading-relaxed text-justify">
                   Within the Media Team, I see myself as someone who brings a lot of intention, clarity, and emotional awareness to the space. I’m not the type of person who does things “just to do them.” If I’m creating something, it has to mean something, it has to reflect the atmosphere of the session, the energy of the people, and the small moments that define an experience. I bring structure and reliability, but also a lot of humanity, I notice details, I pay attention to moods, and I care about capturing the session in a way that feels honest and alive.
                 </p>
               </motion.div>

               {/* 2. Giving & Receiving */}
               <motion.div whileHover={{ scale: 1.01 }} className="bg-rsc-green/10 p-6 rounded-xl shadow-sm border-l-4 border-rsc-green relative">
                 <div className="absolute top-4 right-4 opacity-10 text-rsc-green">
                    <PenTool className="w-12 h-12" />
                 </div>
                 <h3 className="font-bold text-lg text-rsc-green mb-3">Commitment & Growth</h3>
                 <p className="text-gray-700 leading-relaxed text-justify">
                   What I can give is commitment, creativity grounded in purpose, and a very collaborative attitude. I love working with people who are passionate about what they’re doing, it motivates me even more. And what I’d like to receive is guidance, transparency, and space to learn. Feedback, real feedback, helps me grow faster. I want to understand the logic behind media decisions, the styling, the storytelling. If we can build that communication, I know I’ll thrive.
                 </p>
               </motion.div>

             </div>
          </QuestionCard>

          {/* Question C: Why Media? */}
          <QuestionCard index={2} question="Why did you choose Media?">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <Camera className="absolute -bottom-6 -right-6 text-gray-200 w-32 h-32 opacity-50 rotate-12" />
                
                <h3 className="font-serif text-2xl text-rsc-blue italic mb-6 text-center">"Media creates meaning."</h3>
                
                <div className="space-y-4 text-gray-700 text-justify relative z-10">
                    <p>
                    I chose Media because I care deeply about meaning, and media creates meaning. It captures the moments people forget, the emotions they may not even notice, and the atmosphere that defines a session long after it ends. For me, media is not “take a photo, post it, done.” It’s storytelling. It’s giving shape and memory to something that only lasts a few days but stays with people forever.
                    </p>
                    <p>
                    And honestly, it aligns with how I move through EYP: I observe, I pay attention, I connect with people, and I try to elevate the experience beyond the surface. Media gives me the chance to do that with intention, creativity, and purpose.
                    </p>
                </div>
            </div>
          </QuestionCard>

          {/* Question D: Portfolio */}
          <QuestionCard index={3} question="Share your portfolio here! It can be anything, if you don’t have one, share some of the media content you created previously.">
             <div className="bg-white p-4 rounded-xl border border-rsc-blue/20">
                <div className="flex items-center gap-2 mb-2 text-rsc-blue font-bold px-2">
                    <Palette className="w-5 h-5" /> My Work
                </div>
                <SwipeGallery images={[
                    "/photo1.JPG", 
                    "/photo2.JPG", 
                    "/photo3.JPG",
                    "/photo4.jpg",
                    "/photo5.jpg"
                ]} />
                <div className="bg-rsc-green/10 p-4 rounded-lg mt-4 border border-rsc-green/20 text-center">
                    <p className="text-rsc-text font-medium text-sm md:text-base">
                        This website and the video response, for instance, take them as part of my creative ability portfolio.
                    </p>
                </div>
             </div>
          </QuestionCard>

          {/* Question E: Ranking */}
           <QuestionCard index={4} question="If you are applying to more than one Spanish RSC this year, please rank them from most to least preferred.">
            <RevealList items={[
              "Valencia",
              "VALENCIA",
              "VALENCIA!!!"
            ]} />
          </QuestionCard>

          {/* Question F: Contact */}
          <QuestionCard index={5} question="Please share your email address and phone number.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-rsc-blue/20 flex flex-col items-center justify-center hover:bg-rsc-blue/5 transition-colors group">
                <Mail className="w-6 h-6 text-rsc-blue mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</span>
                <p className="text-sm md:text-base font-mono text-rsc-blue break-all">alejandrohuguetlorente@gmail.com</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-rsc-green/20 flex flex-col items-center justify-center hover:bg-rsc-green/5 transition-colors group">
                <Phone className="w-6 h-6 text-rsc-green mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</span>
                <p className="text-sm md:text-base font-mono text-rsc-green">+34 644 724 228</p>
              </div>
            </div>
          </QuestionCard>

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