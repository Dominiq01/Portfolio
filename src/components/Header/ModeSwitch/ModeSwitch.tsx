import Switch from "react-switch";
import { useState } from "react";
import "./ModeSwitch.scss";
import { RxSun } from "react-icons/rx";
import { BsMoon } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.2,
      },
      opacity: {
        duration: 0.25,
        delay: 0.15,
      },
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.2,
      },
      opacity: {
        duration: 0.1,
      },
    },
  },
};

const containerVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.35,
      delay: 0.2,
    },
  },
};

const ModeSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const changeTheme = (e: any) => {
    setIsChecked(e);

    if (isChecked) {
      document.body.style.setProperty("--primary-color", "#f0fb3b");
      document.body.style.setProperty("--font-color", "#eeeeee");
      document.body.style.setProperty("--gray", "#3b3b3b");
      document.body.style.setProperty("--light-gray", "#868e96");
      document.body.style.setProperty("--background", "#000000");
      document.body.style.setProperty("--gradient-dark", "rgba(0,0,0,1)");
      document.body.style.setProperty("--gradient-light", "rgba(32,32,32,1)");
      document.body.style.setProperty("--pattern-opacity", "0.4");
      document.body.style.setProperty("--filter", "invert(1)");
    } else {
      document.body.style.setProperty("--primary-color", "#8F00FF");
      document.body.style.setProperty("--font-color", "black");
      document.body.style.setProperty("--gray", "#343a40");
      document.body.style.setProperty("--light-gray", "#868e96");
      document.body.style.setProperty("--background", "white");
      document.body.style.setProperty("--gradient-dark", "#f6f8fa");
      document.body.style.setProperty("--gradient-light", "#fefefe");
      document.body.style.setProperty("--pattern-opacity", "1");
      document.body.style.setProperty("--filter", "invert(0)");
    }
  };

  const showSwitch = () => {
    setIsVisible(!isVisible);
  };

  return (
    <motion.div onClick={showSwitch} className="switch-container">
      <motion.div variants={containerVariants} animate="show" initial="hidden">
        Switch theme
      </motion.div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            variants={variants}
            animate="open"
            initial="initial"
            exit="closed"
            className="switch-container__switch"
          >
            <Switch
              offColor="#fff"
              onColor="#000"
              offHandleColor="#000"
              onHandleColor="#fff"
              handleDiameter={20}
              uncheckedIcon={
                <RxSun style={{ fontSize: "1.8rem", color: "black" }} />
              }
              checkedIcon={
                <BsMoon style={{ fontSize: "1.8rem", color: "white" }} />
              }
              activeBoxShadow="0 0 2px 3px #000000"
              className="switch"
              onChange={changeTheme}
              checked={isChecked}
            ></Switch>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ModeSwitch;
