import "./CurrentMusic.scss";
import { useState, useEffect, useRef } from "react";
import { HiOutlinePauseCircle } from "react-icons/hi2";
import { HiOutlineStatusOffline } from "react-icons/hi";
import { BiErrorCircle } from "react-icons/bi";
import { getNowPlaying } from "./currentMusicScripts";
import { motion } from "framer-motion";
// @ts-ignore
import soundBar from "../../../assets/soundbar.gif";
// @ts-ignore
import albumImage from "../../../assets/albumCover.png";

const pad = (n: number) => {
  return n < 10 ? "0" + n : n;
};

type NowPlaying = {
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
  timePlayed: number;
  timeTotal: number;
  artistUrl: string;
};

const variants = {
  hidden: { opacity: 0, y: -10 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
};

const titleVariants = {
  animate: (custom: any) => ({
    x: [-custom.maxScroll, 0],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: custom.duration,
        ease: "linear",
        repeatDelay: 2,
      },
    },
  }),
};

const CurrentMusic = () => {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>();
  const [error, setError] = useState("");
  const titleRef = useRef(null);
  const [titleWidth, setTitleWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  let maxScroll =
    titleWidth > containerWidth ? Math.max(0, titleWidth - containerWidth) : 0;

  let duration = (maxScroll + titleWidth) / 65;

  useEffect(() => {
    const updateWidths = () => {
      const container = document.querySelector(".current-music__details");
      const titleElement = titleRef.current;
      if (container && titleElement) {
        // @ts-ignore
        setContainerWidth(container?.offsetWidth);
        // @ts-ignore
        setTitleWidth(titleElement?.offsetWidth);
      }
    };

    window.addEventListener("resize", updateWidths);
    updateWidths();

    return () => window.removeEventListener("resize", updateWidths);
  }, [titleRef, nowPlaying]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const data = await getNowPlaying();
        if (typeof data === "string") throw new Error(data);
        setNowPlaying(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const i = setInterval(() => {
      fetchNowPlaying();
    }, 1000);

    return () => clearInterval(i);
  }, []);
  let playerState = nowPlaying?.isPlaying ? "PLAY" : "PAUSE";
  let secondsPlayed = 0,
    minutesPlayed = 0,
    secondsTotal = 0,
    minutesTotal = 0;
  let albumImageUrl = albumImage;
  let title = "";
  let artist = "";
  if (nowPlaying != null && nowPlaying.title) {
    secondsPlayed = Math.floor(nowPlaying.timePlayed / 1000);
    minutesPlayed = Math.floor(secondsPlayed / 60);
    secondsPlayed = secondsPlayed % 60;

    secondsTotal = Math.floor(nowPlaying.timeTotal / 1000);
    minutesTotal = Math.floor(secondsTotal / 60);
    secondsTotal = secondsTotal % 60;

    albumImageUrl = nowPlaying.albumImageUrl;
    title = nowPlaying.title;
    artist = nowPlaying.artist;
  } else if (error === "Currently Not Playing") {
    playerState = "OFFLINE";
    title = "Dominik is";
    artist = "currently Offline";
  } else {
    playerState = "ERROR";
    title = "Something went wrong";
    artist = "try again later";
  }

  const userPlayOrPause = playerState === "PLAY" || playerState === "PAUSE";
  return (
    <motion.div
      className="current-music"
      variants={variants}
      initial={"hidden"}
      animate="show"
    >
      <div className="current-music__image">
        {userPlayOrPause ? (
          <a href={nowPlaying?.songUrl} target="_blank">
            <img src={albumImageUrl} alt="Album" />
          </a>
        ) : (
          <img src={albumImageUrl} alt="Album" />
        )}
      </div>
      <div className="current-music__details">
        <motion.div
          className={`current-music__title ${
            title.length > 15 ? "marquee-content" : " "
          }`}
          /* @ts-ignore */
          variants={titleVariants}
          animate={playerState !== "OFFLINE" ? "animate" : "initial"}
          custom={{ maxScroll, duration }}
        >
          {userPlayOrPause ? (
            <motion.a ref={titleRef} href={nowPlaying?.songUrl} target="_blank">
              {title}
            </motion.a>
          ) : (
            title
          )}
        </motion.div>
        <div className="current-music__artist">
          {userPlayOrPause ? (
            <a href={nowPlaying?.artistUrl} target="_blank">
              {artist}
            </a>
          ) : (
            artist
          )}
        </div>
        <div className="current-music__time">
          {pad(minutesPlayed)}:{pad(secondsPlayed)} / {pad(minutesTotal)}:
          {pad(secondsTotal)}
        </div>
      </div>
      <div className="current-music__state">
        {playerState === "PLAY" ? (
          <img alt="soundbar" src={soundBar} title="Now Listening" />
        ) : playerState === "PAUSE" ? (
          <HiOutlinePauseCircle size={44} />
        ) : playerState === "OFFLINE" ? (
          <HiOutlineStatusOffline size={40} />
        ) : (
          <BiErrorCircle size={40} />
        )}
      </div>
    </motion.div>
  );
};

export default CurrentMusic;
