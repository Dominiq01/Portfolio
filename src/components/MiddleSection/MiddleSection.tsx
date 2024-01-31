import ContactForm from "./ContactForm/ContactForm";
import Skills from "./Skills/Skills";
import "./MiddleSection.scss";

const MiddleSection = () => {
  return (
    <div className="container">
      <section className="middle-section center">
        <Skills/>
        <ContactForm/>
      </section>
    </div>
  );
};

export default MiddleSection;
