import Icons from "./Icons/Icons";
import { icons } from "./Icons/iconsArray";
import "./Skills.scss";
import { useRef } from "react";
import { useInView } from "framer-motion";

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: true});
  return (
    <div className="skills" ref={ref}>
      <h2>
        Technologies that
        <span>I've worked with</span>
      </h2>
      <div className="skills__list">
        <Icons icons={icons} isInView={isInView}/>
      </div>
    </div>
  );
};

export default Skills;
