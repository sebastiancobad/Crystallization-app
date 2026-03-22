import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 16 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -16 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export const stagger: Variants = {
  animate: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.04,
    },
  },
};

// Hover/tap props for interactive elements (not Variants — use directly as motion props)
export const cardLift = {
  whileHover: { y: -3, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};

export const scalePress = {
  whileTap: { scale: 0.97 },
};
