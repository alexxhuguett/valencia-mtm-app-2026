import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Music, Check, ExternalLink } from 'lucide-react';

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
            src={`/video-cover.png`}
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
          src={`https://www.youtube.com/embed/ItiWPmPzdi0?autoplay=0`} 
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

// 3. Music Card Component
const MusicCard = ({ title, artist, reason }) => {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-rsc-green/30 flex flex-col shadow-sm transition-all hover:shadow-md my-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-16 h-16 bg-rsc-green rounded-lg flex items-center justify-center text-white shrink-0 relative overflow-hidden">
          <Music className={`w-8 h-8 ${showEmbed ? 'animate-pulse' : ''}`} />
        </div>
        <div className="flex-1 w-full text-center md:text-left">
          <h3 className="font-bold text-rsc-blue text-lg">{title}</h3>
          <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">{artist}</p>
          <div className="mt-3 text-sm text-rsc-text italic border-l-2 border-rsc-green pl-3 text-left bg-rsc-green/5 p-2 rounded-r-lg text-justify">
            "{reason}"
          </div>
        </div>
        <button 
          onClick={() => setShowEmbed(!showEmbed)}
          className="p-3 rounded-full bg-rsc-blue text-white hover:bg-rsc-green transition-colors shrink-0 flex items-center gap-2 px-4"
        >
           {showEmbed ? 'Close' : 'Listen'} <Play className="w-4 h-4 ml-1" fill="currentColor" />
        </button>
      </div>
      
      {/* YouTube Embed Area */}
      <AnimatePresence>
        {showEmbed && (
          <motion.div 
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 20 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden w-full"
          >
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              {/* LF SYSTEM - Afraid To Feel Official Video ID */}
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/VHSmO_72Uro?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 4. Reveal List Component (For Ranking)
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

// 5. Question Container
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
        <header className="mb-32 text-center relative">
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
            <p className="text-xl text-gray-500">19/02 - 22/02 • Jury Team Applicant</p>
            
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
          <QuestionCard index={0} question="Please give us an idea of who you are and how this session fits into your path through the EYP.">
            <p className="text-sm text-gray-500 mb-2 italic">Watch video response below:</p>
            {/* REPLACE "YOUR_YOUTUBE_VIDEO_ID" below with the ID of your video.
               Example: if your link is youtube.com/watch?v=dQw4w9WgXcQ, the ID is dQw4w9WgXcQ
            */}
            <VideoPlayer videoId="YOUR_YOUTUBE_VIDEO_ID" />
          </QuestionCard>

          {/* Question B: Bringing & Learning */}
          <QuestionCard index={1} question="What are you bringing to the Jury Team of Valencia RSC? And what do you think you can learn from the session?">
             <div className="flex flex-col gap-8">
               <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-rsc-blue relative overflow-hidden">
                 <div className="absolute -right-6 -top-6 opacity-5">
                    <Dragonfly className="w-32 h-32" />
                 </div>
                 <h3 className="font-bold text-xl mb-4 text-rsc-blue uppercase tracking-wide">What I Bring</h3>
                 <p className="text-gray-700 leading-relaxed text-justify">
                   Groundedness is extremely important for me, not elevating beyond what an officer is. A volunteer, a human. I keep myself extremely connected to reality and keep my feet on the ground. I consider myself a very fair person. I like to think I am able to provide equal opportunities for everyone when given the chance. Being able to provide professional comments about delegates but remain connected to them in a human way is vital and this is something I can bring to the table. I am aware difficult decisions will arise and although I am very empathetic, I am also realistic, allowing me to navigate these complex decisions with ease. This condenses in my pragmatic approach to life.
                 </p>
                 <p className="text-gray-700 leading-relaxed mt-4 text-justify">
                   Last and not least, I like laughing a lot. I don’t think I can only see the bad out of a complicated situation. I always look for different perspectives and milder ways to work out problems. Partly, I do this through humor, keeping a cautious but relaxed approach.
                 </p>
               </div>

               <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-rsc-green relative overflow-hidden">
                 <div className="absolute -right-6 -top-6 opacity-5">
                    <OrganicBubble className="w-32 h-32" />
                 </div>
                 <h3 className="font-bold text-xl mb-4 text-rsc-green uppercase tracking-wide">What I'll Learn</h3>
                 <p className="text-gray-700 leading-relaxed text-justify">
                   I imagine there is an uncountable number of things I could learn from the session as this is my first contact with jurying. Although it is true that the few things I know come from watching and discussing with other juries, this blank slate allows me to absorb and learn as much as possible from an experienced jury like you. This makes me extremely excited as I get the chance to have essentially a whole new world I can thrive in and explore. I hope to learn how to read and assess delegates, how to portray speeches and interactions from delegates into measurable traits, and how to navigate uncertainty when evaluating and selecting many participants. Finally, learning about indispensable skills like new approaches for making tough decisions.
                 </p>
               </div>
             </div>
          </QuestionCard>

          {/* Question C: Purpose of Jury */}
          <QuestionCard index={2} question="What is the main purpose of the Jury Team to you? Why does it exist and what goal does it serve?">
            <div className="prose prose-lg text-rsc-text leading-relaxed space-y-4 bg-white/50 p-6 rounded-xl border border-rsc-blue/10 w-full max-w-none">
                <p className="text-justify">
                  To start, I believe each of the five official’s roles have extremely different perspectives about delegates. While organisers, ESPs and MTMs might not have much interaction with participants, chairs and juries connect with the core of events, the people experiencing this beautiful experience for the first time. Juries specifically have the chance to delve into the committee dynamics and have a unique external view on their interactions. The Jury Team can essentially take a close and unbiased look into exchanges and analyse each individual delegate. This allows us to guarantee fairness, quality and integrity in the evaluations. I believe it is not only selecting candidates, it is upholding trust, and safeguarding the core values EYP stands for. Ensuring the decisions made are transparent, consistent and unbiased. For the delegates, we need to make them feel their efforts are recognised fairly. The officials need to rely on the Jury Team, who works with structure and accountability. This is exactly the way we protect that trust.
                </p>
                <p className="text-justify">
                  Furthermore, I believe the Jury Team is essential for the development and continuation of EYP as an organisation. From my point of view it doesn’t only identify performance, it looks for potential. It provides the delegates with meaningful, constructive feedback that allows them to grow and develop their professional and personal skills. By keeping clear criteria for them, aligning with the EYP’s goals, we upkeep and maintain the quality of sessions.
                </p>
            </div>
          </QuestionCard>

          {/* Question D: Two Criteria */}
          <QuestionCard index={3} question="If you could only assess the delegates’ performance based on two criteria throughout the whole session, what would they be and why?">
             <div className="space-y-6">
               <motion.div 
                 whileHover={{ scale: 1.01 }}
                 className="bg-rsc-blue/10 p-8 rounded-xl border border-rsc-blue/20"
               >
                 <div className="flex items-center gap-3 mb-3">
                    <div className="h-px flex-1 bg-rsc-blue/30"></div>
                    <h3 className="text-2xl font-bold text-rsc-blue">Collaboration</h3>
                    <div className="h-px flex-1 bg-rsc-blue/30"></div>
                 </div>
                 <p className="text-gray-700 text-justify">
                   To work effectively in a team (or committee specifically), collaboration is essential. A delegate’s ability to listen actively, encouraging quiet voices and mediating disagreements directly determines the quality of the output of a committee, as well as the dynamics and wellbeing of the other delegates within it. Collaboration reveals directly the maturity, empathy and leadership potential of a delegate. It would also reward behaviour aligned with EYP’s values and disregard delegates that opt for more dominant or loud approaches.
                 </p>
               </motion.div>

               <motion.div 
                 whileHover={{ scale: 1.01 }}
                 className="bg-rsc-green/10 p-8 rounded-xl border border-rsc-green/20"
               >
                 <div className="flex items-center gap-3 mb-3">
                    <div className="h-px flex-1 bg-rsc-green/30"></div>
                    <h3 className="text-2xl font-bold text-rsc-green">Constructive Participation</h3>
                    <div className="h-px flex-1 bg-rsc-green/30"></div>
                 </div>
                 <p className="text-gray-700 text-justify">
                   This criteria would assess how meaningfully a delegate interacts with the committee’s topic. We are not assessing their studying skills, rather than focusing on the actual current knowledge of the topic, this metric targets curiosity, willingness to learn and critical thinking skills. Here, we are looking for delegates that build on ideas that are not from themselves, challenge new ideas but with an open mind and bring a thoughtful approach to discussions. Also, this is meant to also measure a delegate’s growth over the session, noting positively those who improve as topic discussions deepen.
                 </p>
               </motion.div>

               <p className="text-center text-xl font-medium text-rsc-blue italic pt-4">
                 "We can assess how delegates work and how they think."
               </p>
             </div>
          </QuestionCard>

          {/* Question E: Song */}
          <QuestionCard index={4} question="[Optional] Please share a song that you feel represents your personality, or conveys with your vibe, and briefly tell us why.">
            <MusicCard 
              title="Afraid To Feel" 
              artist="LF SYSTEM" 
              reason="House, constant rhythm represents life doesn’t stop and we continuously look forward as it is full of surprises :))" 
            />
          </QuestionCard>

          {/* Question F: Ranking */}
          <QuestionCard index={5} question="If you are applying to more than one Spanish RSC this year, please rank them from most to least preferred.">
            <RevealList items={[
              "Valencia",
              "VALENCIA",
              "VALENCIA!!!"
            ]} />
          </QuestionCard>

          {/* Extra: Gallery Section */}
          <div className="pt-10 pb-10 border-t border-b border-rsc-green/20">
             <h3 className="text-3xl font-bold text-rsc-green text-center mb-2">Moments & Memories</h3>
             <p className="text-center text-gray-500">A glimpse into my EYP journey</p>
             <SwipeGallery images={[
              "/photo5.jpg",
              "/photo1.JPG", 
              "/photo2.JPG", 
              "/photo3.JPG",
              "/photo6.jpg"
            ]} />
          </div>

          {/* Question G: Contact */}
           <QuestionCard index={6} question="Please share your email address and phone number.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-rsc-blue/20 flex flex-col items-center justify-center hover:bg-rsc-blue/5 transition-colors">
                <span className="text-xs font-bold text-rsc-blue uppercase tracking-wider mb-2">Email</span>
                <p className="text-xs md:text-sm font-mono text-gray-700 break-all">alejandrohuguetlorente@gmail.com</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-rsc-blue/20 flex flex-col items-center justify-center hover:bg-rsc-blue/5 transition-colors">
                <span className="text-xs font-bold text-rsc-blue uppercase tracking-wider mb-2">Phone</span>
                <p className="text-xs md:text-sm font-mono text-gray-700">+34 644 724 228</p>
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