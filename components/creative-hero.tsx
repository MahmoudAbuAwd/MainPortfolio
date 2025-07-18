import { motion } from "framer-motion"

export function CreativeHero() {
  const positions = [
    "AI Engineer",
    "ML Engineer", 
    "DL Engineer",
    "Data Science",
    "AI Prompt Engineering",
    "AI Researcher"
  ]

  return (
    <motion.div
      className="w-full h-[350px] sm:h-[400px] md:h-[500px] relative flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          className="relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Main title */}
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-center mb-6 sm:mb-8 md:mb-12 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent leading-tight pb-2"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Expertise Areas
          </motion.h2>
          
          {/* Mobile: Compact grid, Desktop: Spacious grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto">
            {positions.map((position, index) => (
              <motion.div
                key={position}
                className="group relative"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.15, duration: 0.7 }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
              >
                <div className="relative w-full h-12 sm:h-14 md:h-16 lg:h-20 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md border border-purple-400/30 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-2">
                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <h3 className="text-xs sm:text-sm md:text-base font-medium text-center text-purple-200 group-hover:text-purple-100 transition-colors duration-300 leading-tight px-1">
                      {position}
                    </h3>
                  </div>
                  
                  {/* Floating particles effect - Hidden on mobile for performance */}
                  <motion.div
                    className="hidden sm:block absolute top-2 right-2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                  <motion.div
                    className="hidden sm:block absolute bottom-2 left-2 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, 10, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Bottom message with pulsing effect */}
          <motion.div
            className="text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-800/20 to-pink-800/20 backdrop-blur-sm border border-purple-400/20 rounded-full mx-4"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.1)",
                  "0 0 40px rgba(168, 85, 247, 0.2)",
                  "0 0 20px rgba(168, 85, 247, 0.1)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <p className="text-purple-200 text-xs sm:text-sm font-medium">
                🚀 Ready to innovate with next-generation AI solutions
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  )
}