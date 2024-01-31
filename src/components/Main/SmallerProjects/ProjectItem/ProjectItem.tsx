import "./ProjectItem.scss";
import { motion } from "framer-motion";

type ProjectItemProps = {
  title: string;
  description: string;
  link: string;
  img: string;
};

const item = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  link = "#",
  img = "https://via.placeholder.com/185x195",
}) => {
  return (
    <motion.a href={link} target="_blank" className="project" variants={item}>
      <div className="project__header">
        <p className="project__header__title">{title}</p>
        <p className="project__header__description">{description}</p>
      </div>
      <div className="project__image">
        <img src={img} alt={`Project ${title}`} />
      </div>
    </motion.a>
  );
};

export default ProjectItem;
