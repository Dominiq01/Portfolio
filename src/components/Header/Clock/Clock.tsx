import { useState, useEffect } from 'react';
import './Clock.scss';
import { motion } from 'framer-motion';

const clock = {
  initial: { rotate: 180, opacity: .5, scale: 0},
  show: {
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: .5,
      duration: .5,
      ease: 'easeInOut',
    },
  },
};


const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  });

  const tick = () => {
    setTime(new Date());
  };

  const secondHandAngle = time.getSeconds() * 6;
  const minuteHandAngle = time.getMinutes() * 6 + time.getSeconds() * 0.1;
  const hourHandAngle = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;

  return (
    <motion.div className="clock" variants={clock} animate="show" initial="initial">
      <div className="hour"  >
        <div className='hr' id='hr' style={{ transform: `rotate(${hourHandAngle}deg)` }}></div>
      </div>
      <div className="minute"  >
        <div className='mn' id='mn' style={{ transform: `rotate(${minuteHandAngle}deg)` }}></div>
      </div>
      <div className="second"  >
        <div className='sc' id='sc' style={{ transform: `rotate(${secondHandAngle}deg)` }}></div>
      </div>
    </motion.div>
  );
};

export default Clock;
