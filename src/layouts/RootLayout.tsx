import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Navigation } from "../components/layout/Navigation";
import { getPageTransition } from "../lib/motion";

const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

export const RootLayout = () => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const variants = getPageTransition(shouldReduceMotion);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          className="flex-1 flex flex-col"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
        >
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </motion.main>
      </AnimatePresence>
    </div>
  );
};
