import { motion } from 'framer-motion';

const KrissCrossBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base Gradient Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 20%, #14061f, #09050e, #04030a)'
        }}
      />
      
      {/* Animated Diagonal Grid Lines */}
      <div className="fixed inset-0 z-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="kriss-cross-grid"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <motion.path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="url(#gradient-line-1)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.path
                d="M 0 60 L 60 60 60 0"
                fill="none"
                stroke="url(#gradient-line-2)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              />
              <linearGradient id="gradient-line-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7d3cff" stopOpacity="0" />
                <stop offset="50%" stopColor="#7d3cff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00c6ff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradient-line-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00c6ff" stopOpacity="0" />
                <stop offset="50%" stopColor="#00c6ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7d3cff" stopOpacity="0" />
              </linearGradient>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kriss-cross-grid)" />
        </svg>
      </div>

      {/* Animated Glowing Diagonal Lines */}
      <div className="fixed inset-0 z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px"
            style={{
              background: i % 2 === 0
                ? 'linear-gradient(90deg, transparent, rgba(125, 60, 255, 0.4), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(0, 198, 255, 0.4), transparent)',
              transform: `rotate(${i % 2 === 0 ? 45 : -45}deg)`,
              top: `${(i * 15) % 100}%`,
              left: i % 2 === 0 ? '0%' : '100%',
            }}
            animate={{
              x: i % 2 === 0 ? ['-100%', '200%'] : ['200%', '-100%'],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Blurred Grid Overlay */}
      <div 
        className="fixed inset-0 z-0 backdrop-blur-[1px]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(125, 60, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(125, 60, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'rotate(45deg)',
          transformOrigin: 'center',
        }}
      />

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(125, 60, 255, 0.3) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 198, 255, 0.3) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default KrissCrossBackground;

