import { motion } from "framer-motion";
import "./Header.scss";
import Clock from "./Clock/Clock";
import CurrentMusic from "./CurrentMusic/CurrentMusic";
import ModeSwitch from "./ModeSwitch/ModeSwitch";

type HeaderProps = {
  title: string;
};

const letter = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

const container = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const lineVariants = {
  hidden: {
    width: "0%",
  },
  show: {
    width: "100%",
    transition: {
      duration: 1,
      delay: 1,
    },
  },
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <div className="container">
        <div className="grid center">
          <div className="col-1"></div>
          <div className="col-2">
            <ModeSwitch />
          </div>
          <div className="col-3"></div>
        </div>
      </div>
      <div className="container">
        <header className="header center">
          <motion.h1 variants={container} animate="show" initial="hidden">
            {title.split("").map((el) => (
              <motion.span key={el} variants={letter}>
                {el}
              </motion.span>
            ))}
          </motion.h1>
          <div className="header__clock">
            <Clock />
          </div>
          <div className="header__music">
            <div className="header__music__title">
              <h2>spotify</h2>
              <motion.div
                className="line"
                variants={lineVariants}
                animate="show"
                initial="hidden"
              />
            </div>
            <CurrentMusic />
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
