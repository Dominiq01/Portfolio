import "./About.scss";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { PiDownloadSimpleBold } from "react-icons/pi";
import SignIcon from "../SignIcon";
import SocialLink from "./SocialLink/SocialLink";
import { motion } from "framer-motion";
import { lineVariants } from "../../Header/Header";

const socialsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
      bounce: 0,
      staggerChildren: 0.4,
    },
  },
};

const textContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      ease: "easeIn",
      bounce: 0,
      staggerChildren: 0.3,
    },
  },
};

const textItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const cvLinkVariants = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  show: {
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay: 0.9
    },
  },
};

const About = () => {
  return (
    <motion.section variants={textContainer} animate="show" initial="hidden" className="about">
      <motion.h2 variants={textItem}>About Me</motion.h2>
      <motion.p variants={textItem}>
        I am a software developer with a focus on frontend development. I have
        experience with React, TypeSript, Redux, Scss and Figma.
      </motion.p>
      <motion.p variants={textItem}>
        I love working out, and the gym is my second home. I also train MMA and
        enjoy watching Formula 1.
      </motion.p>
      <div className="sign">
        <SignIcon />
        <motion.a
          href="https://drive.google.com/file/d/1uKmCSUEMtNzR0fU30MSSPeTojVS9scQ8/view"
          target="_blank"
          download="Dominik Wędzina CV"
          className="about__download-btn"
          variants={cvLinkVariants}
          initial="hidden"
          animate="show"
        >
          <span>Download CV</span>
          <PiDownloadSimpleBold />
        </motion.a>
      </div>
      <div className="about__social">
        <div className="about__social__title">
          <p>Socials</p>
          <motion.div
            className="line"
            variants={lineVariants}
            animate="show"
            initial="hidden"
          />
        </div>
        <motion.div
          className="about__social__links"
          variants={socialsContainer}
          animate="show"
          initial="hidden"
        >
          <SocialLink
            icon={<FaFacebook />}
            href="https://www.facebook.com/profile.php?id=100009444829479"
          />
          <SocialLink icon={<FaGithub />} href="https://github.com/Dominiq01" />
          <SocialLink
            icon={<FaLinkedin />}
            href="https://www.linkedin.com/in/dominik-wędzina"
          />
          <SocialLink
            icon={<IoMdMail />}
            href="mailto:dominik.wedzina@onet.pl"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
