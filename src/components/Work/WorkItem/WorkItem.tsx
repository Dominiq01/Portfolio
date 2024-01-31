import "./WorkItem.scss";
import { MouseEvent, useRef, useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { motion, useInView } from "framer-motion";

type WorkItemProps = {
  title: string;
  content: string;
  link: string;
};

const variants = {
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "linear" },
  },
  hidden: {
    y: -30,
    opacity: 0,
  },
};

const WorkItem: React.FC<WorkItemProps> = ({ title, content, link = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  const changeItemStylesHandler = ({
    clientX,
    clientY,
    currentTarget,
  }: MouseEvent) => {
    if (currentTarget) {
      let { left, top } = currentTarget.getBoundingClientRect();

      const x = clientX - left;
      const y = clientY - top;

      setPosition({ x, y });
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      animate={isInView ? "show" : "hidden"}
      initial="hidden"
      className="work-item"
      onMouseMove={changeItemStylesHandler}
      style={{
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, var(--gradient-light) 17%, var(--gradient-dark) 77%)`,
      }}
    >
      <h3 className="work-item__title">{title}</h3>
      <p className="work-item__description">{content}</p>
      {link !== "" && (
        <a className="work-item__link" href={link} target="_blank">
          <span>Discover More</span>
          <MdKeyboardDoubleArrowRight />
        </a>
      )}
    </motion.div>
  );
};

export default WorkItem;
