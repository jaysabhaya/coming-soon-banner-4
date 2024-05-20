import React, { useState, useEffect } from 'react';
import './App.css';
import SocialButton from './socialButton/SocialButton';
import Loading from './loader/Loading';
import { motion } from "framer-motion";
import { useMediaQuery } from 'react-responsive';

function App() {
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const hoursRemaining = 24 - now.getHours() - 1;
      const minutesRemaining = 59 - now.getMinutes();
      const secondsRemaining = 59 - now.getSeconds();

      setHours(hoursRemaining);
      setMinutes(minutesRemaining);
      setSeconds(secondsRemaining);
    };

    calculateTimeRemaining();

    let interval;

    if (timerActive) {
      interval = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
          setTimerActive(false);
        } else if (minutes === 0 && seconds === 0) {
          setHours((prevHours) => prevHours - 1);
          setMinutes(59);
          setSeconds(59);
        } else if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [hours, minutes, seconds, timerActive]);

  const handleStart = () => {
    setTimerActive(true);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const handleClick = (platform) => {
    switch (platform) {
      case 'instagram':
        window.open('https://www.instagram.com/', '_blank');
        break;
      case 'facebook':
        window.open('https://www.facebook.com/', '_blank');
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/', '_blank');
        break;
      case 'twitter':
        window.open('https://www.twitter.com/', '_blank');
        break;
      default:
        break;
    }
  };

  const Mobile = useMediaQuery({ query: '(max-width: 430px)' });
  const isTablateOrMobile = useMediaQuery({ query: '(max-width: 900px)' });

  useEffect(() => {
    handleStart();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <motion.section
          className="container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        > <div className="half-image" >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {Mobile ? <h1 style={{ color: 'white' }}>We are<br />Launching soon!</h1> : <h1 style={{ color: 'white' }}>We are Launching soon!</h1>}
              <div class="timer-container">
                <div class="countdown-container">
                  <div class="countdown">
                    <p>{`${formatTime(days)}`}</p>
                  </div>
                </div>
                <div class="countdown-container">
                  <div class="countdown">
                    <p>{`${formatTime(hours)}`}</p>
                  </div>
                </div>
                <div class="countdown-container">
                  <div class="countdown">
                    <p>{`${formatTime(minutes)}`}</p>
                  </div>
                </div>
                <div class="countdown-container">
                  <div class="countdown">
                    <p>{`${formatTime(seconds)}`}</p>
                  </div>
                </div>
              </div>
              <div class="timer-container">
                <div class='timer-text' style={{ color: 'white' }}>
                  <p>{` Days `}</p>
                </div>
                <div class='timer-text' style={{ color: 'white' }}>
                  <p>{` Hours `}</p>
                </div> <div class='timer-text' style={{ color: 'white' }}>
                  <p>{` Minutes`}</p>
                </div> <div class='timer-text' style={{ color: 'white' }}>
                  <p>{` Seconds`}</p>
                </div>
              </div>

              {/* {!isTablateOrMobile ? <h3 style={{ color: '#FFFFFF' }}>We’re coming soon! Awesome template to present your future product<br />
              or service. We’re working hard to give you the best experience!</h3> : Mobile ? <h3 style={{ color: '#FFFFFF' }}>We’re coming soon! Awesome template to present your future product or service. We’re working hard to give you the best experience!</h3> : <h3 style={{ color: '#FFFFFF' }}>We’re coming soon! Awesome template to present your future<br />product or service.We’re working hard to give you the best experience!</h3>}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '17px', marginBottom: Mobile ? '220px' : '110px' }}>
              <input type='text' className="email-input" placeholder="Email Address" />
              <button className="button">Notify Me</button>
            </div> */}
            </motion.div>
          </ div>
          {isTablateOrMobile ? <h3 style={{ color: '#3F3F3F' }}>Our website is currently undergoing scheduled <br />maintenence. we should be back shortly.</h3> : <h3 style={{ color: '#3F3F3F' }}>Our website is currently undergoing scheduled<br />maintenence. we should be back shortly.</h3>}
          <div className='group-email-button'>
            <input type='text' className="email-input" placeholder="Enter Email Address" />
            <button className="button">Notify Me</button>
          </div>

          <motion.div
            className='social-decoration'
            initial={{
              opacity: 0,
              x: -50
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1
              }
            }}
            viewport={{ once: true }}
          >
            <SocialButton platform="facebook" onClick={handleClick} />
            <SocialButton platform="instagram" onClick={handleClick} />
            <SocialButton platform="twitter" onClick={handleClick} />
            <SocialButton platform="linkedin" onClick={handleClick} />
          </motion.div>
        </motion.section>
      )
      }
    </div >
  );
}

export default App;
