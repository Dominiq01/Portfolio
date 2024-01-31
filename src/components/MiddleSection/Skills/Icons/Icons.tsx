import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Icons.scss";
type IconsProps = {
  icons: IconProps[];
  isInView: boolean;
};

type IconProps = {
  element: JSX.Element;
  label: string;
  color: string;
};

const variants = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    y: -10,
    opacity: 0,
  },
};

const iconVariants = {
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hidden: {
    scale: 0,
    rotate: 180,
    opacity: 0,
  },
};

const Icons: React.FC<IconsProps> = ({ icons, isInView }) => {
  const [isHovered, setIsHovered] = useState("");

  return icons.map((icon) => (
    <motion.div
      key={icon.label}
      onHoverStart={() => setIsHovered(icon.label)}
      onHoverEnd={() => setIsHovered("")}
      whileHover={{ scale: 1.2 }}
      className="icons-container"
    >
      <motion.div
        variants={iconVariants}
        animate={isInView ? "show" : "hidden"}
        initial="hidden"
      >
        {React.cloneElement(icon.element, {
          style: { color: isHovered === icon.label ? icon.color : undefined },
        })}
      </motion.div>
      {isHovered === icon.label && (
        <motion.div
          animate="show"
          initial="hidden"
          variants={variants}
          className="icon-label"
        >
          {icon.label}
        </motion.div>
      )}
    </motion.div>
  ));
};

export default Icons;
