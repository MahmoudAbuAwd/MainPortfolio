import { motion } from "framer-motion"

export function CreativeHero() {
  return (
    <motion.div
      className="w-full h-auto relative flex items-center justify-center overflow-hidden py-4 sm:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative z-10 w-full max-w-lg mx-auto px-4 sm:px-6">
        <motion.div
          className="relative bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-md border border-blue-400/30 rounded-xl p-4 sm:p-6 md:p-8 shadow-xl mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ 
            width: '100%', 
            maxWidth: '600px', // Increased from 500px to 600px
            minHeight: '300px',
            height: 'auto'
          }}
        >
          {/* Core Skills title */}
          <motion.h2 
            className="text-2xl sm:text-3xl font-extrabold text-center mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Core Skills
          </motion.h2>
          
          {/* Skills list - Stack on mobile, grid on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
            <motion.div
              className="w-full h-12 sm:h-14 md:h-16 bg-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-lg flex items-center justify-center"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <h3 className="text-blue-200 text-sm sm:text-base md:text-lg font-medium px-1 text-center">Machine Learning</h3>
            </motion.div>

            <motion.div
              className="w-full h-12 sm:h-14 md:h-16 bg-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-lg flex items-center justify-center"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <h3 className="text-blue-200 text-sm sm:text-base md:text-lg font-medium px-1 text-center">Computer Vision</h3>
            </motion.div>
            

            <motion.div
              className="w-full h-12 sm:h-14 md:h-16 bg-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-lg flex items-center justify-center"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <h3 className="text-blue-200 text-sm sm:text-base md:text-lg font-medium px-1 text-center">MLOPs</h3>
            </motion.div>

            <motion.div
              className="w-full h-12 sm:h-14 md:h-16 bg-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-lg flex items-center justify-center"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <h3 className="text-blue-200 text-sm sm:text-base md:text-lg font-medium px-1 text-center">Deep Learning</h3>
            </motion.div>
            
            <motion.div
              className="w-full h-12 sm:h-14 md:h-16 bg-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-lg flex items-center justify-center"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <h3 className="text-blue-200 text-sm sm:text-base md:text-lg font-medium px-1 text-center">AI Agents</h3>
            </motion.div>
            
            <motion.div
              className="w-full h-12 sm:h-14 md:h-16 bg-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-lg flex items-center justify-center"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              <h3 className="text-blue-200 text-sm sm:text-base md:text-lg font-medium px-1 text-center">LLMs</h3>
            </motion.div>
          </div>
          
          {/* Honors section at bottom */}
          <motion.div
            className="text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            
            <div className="inline-block px-3 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 bg-gradient-to-r from-blue-800/20 to-blue-700/20 backdrop-blur-sm border border-blue-400/20 rounded-lg">
              <p className="text-blue-200 text-sm sm:text-base md:text-lg font-medium">
                GPA: 3.40/4.0
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated background elements - Reduced on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="hidden sm:block absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-blue-600/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl"
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
          className="hidden sm:block absolute bottom-1/4 right-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-blue-700/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl"
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