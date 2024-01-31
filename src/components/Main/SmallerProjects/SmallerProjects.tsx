import { motion } from "framer-motion";
import ProjectItem from "./ProjectItem/ProjectItem";
import "./SmallerProjects.scss";
// @ts-ignore
import calcImg from "../../../assets/calc.png";
// @ts-ignore
import formImg from "../../../assets/form.png";
// @ts-ignore
import pokeImg from "../../../assets/poke.png";
// @ts-ignore
import caesarImg from "../../../assets/caesar.png";

const projects = [
  {
    title: "Calculator",
    description: "Simple calculator",
    link: "https://github.com/Dominiq01/react-calculator",
    img: calcImg,
  },
  {
    title: "Form",
    description: "Form validation",
    link: "https://github.com/Dominiq01/react-form-validation",
    img: formImg,
  },
  {
    title: "Poképedia",
    description: "Pokemons!",
    link: "https://github.com/Dominiq01/pokepedia",
    img: pokeImg,
  },
  {
    title: "Caesar cipher",
    description: "Simple cipher",
    link: "https://github.com/DominikWedzina/caesar-cipher",
    img: caesarImg,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      ease: "linear",
      staggerChildren: 0.4,
    },
  },
};

const SmallerProjects = () => {
  return (
    <div className="smaller-projects">
      <h2 className="smaller-projects__title">Smaller projects</h2>
      <motion.div
        className="smaller-projects__projects"
        variants={container}
        animate="show"
        initial="hidden"
      >
        {projects.map((project) => (
          <ProjectItem
            key={project.link}
            title={project.title}
            description={project.description}
            link={project.link}
            img={project.img}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SmallerProjects;
