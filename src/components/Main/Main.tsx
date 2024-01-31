import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import About from "./About/About";
import SmallerProjects from "./SmallerProjects/SmallerProjects";
import "./Main.scss";
// @ts-ignore
import img from "../../assets/profile.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const filters = [
  { filter: "none", id: 1, name: "None" },
  { filter: "blur(2px)", id: 2, name: "Blur" },
  { filter: "brightness(0.4)", id: 3, name: "Brightness" },
  { filter: "contrast(200%)", id: 4, name: "Contrast" },
  { filter: "grayscale(50%)", id: 5, name: "Grayscale" },
  { filter: "hue-rotate(90deg)", id: 6, name: "Hue Rotate" },
  { filter: "invert(75%)", id: 7, name: "Invert" },
  { filter: "saturate(30%)", id: 8, name: "Saturate" },
  { filter: "sepia(60%)", id: 9, name: "Sepia" },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const containerVariants = {
  hidden: {
    y: -50,
    opacity: 0
  },
  show: {
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.7,
      delay: 0.3
    }
  }
};

const Main = () => {
  const [filter, setFilter] = useState("");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onClickHandler = (filter: string) => {
    setFilter(filter);
  };

  return (
    <div className="container">
      <main className="main center">
        <About />
        <motion.div className="main__profile-cotainer" variants={containerVariants} animate="show" initial="hidden">
          <div
            className="main__profile-cotainer__profile"
            style={{ filter: filter }}
          ></div>
          <div className="main__profile-cotainer__carousel">
            <Carousel
              className="carousel"
              responsive={responsive}
              swipeable={false}
              draggable={true}
            >
              {filters.map((filter) => (
                <div
                  className="main__profile-cotainer__carousel__filter-container"
                  key={filter.id}
                  onClick={() => onClickHandler(filter.filter)}
                >
                  <div style={{ filter: filter.filter }} />
                  <p>{filter.name}</p>
                </div>
              ))}
            </Carousel>
          </div>
        </motion.div>
        {windowWidth >= 840 && <SmallerProjects />}
      </main>
      {windowWidth < 840 && <SmallerProjects />}
    </div>
  );
};

export default Main;
