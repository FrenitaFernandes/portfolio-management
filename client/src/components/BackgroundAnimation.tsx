import { motion } from "framer-motion";

function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      <motion.div
        animate={{
          x: [0, 150, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-20
          -left-20
          w-[450px]
          h-[450px]
          rounded-full
          bg-violet-300/20
          blur-[160px]
        "
      />

      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-0
          right-0
          w-[400px]
          h-[400px]
          rounded-full
          bg-pink-300/20
          blur-[150px]
        "
      />

      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[300px]
          h-[300px]
          rounded-full
          bg-cyan-300/10
          blur-[130px]
        "
      />
    </div>
  );
}

export default BackgroundAnimation;