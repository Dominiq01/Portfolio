import React from "react";
import {motion} from "framer-motion";
import "./SocialLink.scss";
const variants = {
  hidden: {
    opacity: 0,
    clipPath: "circle(100%)",
  },
  show: {
    clipPath: "circle(100%)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  }
};

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
};

const SocialLink: React.FC<SocialLinkProps> = ({href, icon}) => {
  return (
    <motion.a
      whileHover={{
        clipPath: "circle(30%)",
        transition: {
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20,
        },
      }}
      variants={variants}
      className="social-link"
      href={href}
      target="_blank"
    >
      {icon}
    </motion.a>
  );
};

export default SocialLink;
