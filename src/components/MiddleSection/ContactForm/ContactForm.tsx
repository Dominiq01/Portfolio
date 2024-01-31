import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion, useInView } from "framer-motion";
import "./ContactForm.scss";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: -25, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
};

const ContactForm = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { amount: 0.5, once: true });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    emailjs
      .sendForm(
        "service_3k3si9j",
        "template_iy3i8qf",
        formRef.current,
        "9zhEL4MnA4iYhvwhU"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const changeBtnStylesHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.pageX - btnRef.current!.offsetLeft;
    const y = e.pageY - btnRef.current!.offsetTop;

    btnRef.current!.style.setProperty("--x", `${x}px`);
    btnRef.current!.style.setProperty("--y", `${y}px`);
  };

  return (
    <motion.form
      ref={formRef}
      className="contact-form"
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      <h1 className="contact-form__title">Got Ideas? Get in Touch!</h1>
      <div className="contact-form__inputs-container">
        <motion.div variants={itemVariants} className="contact-form__input-box">
          <input
            type="text"
            name="name"
            className="contact-form__input-box__input"
            required
          />
          <span className="contact-form__label">Name</span>
        </motion.div>

        <motion.div variants={itemVariants} className="contact-form__input-box">
          <input
            type="email"
            name="email"
            className="contact-form__input-box__input"
            required
          />
          <span className="contact-form__label">Email</span>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="contact-form__textarea-box">
        <textarea
          name="message"
          className="contact-form__textarea-box__textarea"
          required
        />
        <span className="contact-form__label">Message</span>
      </motion.div>

      <motion.button
        variants={itemVariants}
        ref={btnRef}
        onMouseMove={changeBtnStylesHandler}
        type="submit"
        className="contact-form__button"
      >
        <span>Send</span>
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
