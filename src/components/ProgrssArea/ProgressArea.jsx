import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import "./ProgressArea.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { nextMusic, playMusic, stopyMusic } from "../../store/musicPlayerReducer";

function ProgressArea(props, ref) {

  const audio = useRef();
  const dispatch = useDispatch();
  const {playList,currentIndex, repeat } = useSelector(state=>({playList:state.playList, currentIndex:state.currentIndex, repeat:state.repeat}),shallowEqual);
  const progressBar = useRef();

  const [currentTime , setcurrentTime] = useState("00:00");
  const [duration, setduration] = useState("00:00");


  useImperativeHandle(ref, () => ({
    play: () => {
      audio.current.play()
    },
    pause:() => {
      audio.current.pause()
    },
    changeVolume:(volume) => {
      audio.current.volume = volume
    },
    resetDuration:() => {
      audio.current.currentTime= 0;
    }
  }))

  const onPlay = () => {
    dispatch(playMusic())
  }

  const onPause = () => {
    dispatch(stopyMusic())
  }

  const onEnded = useCallback(() => {
    if(repeat ==='ONE') {
      audio.current.currentTime = 0;
      audio.current.play();
    }else {
      dispatch(nextMusic())  
    }
  },[repeat])

  const getTime = (time) => {
    const minute = `0${parseInt(time/60,10)}`
    const seconds = `0${parseInt(time%60)}`
    return `${minute} : ${seconds.slice(-2)}`
  }

  const ontimeUpdate = (e) => {
    //0 이면 음악재생 준비 x 
    if(e.target.readState === 0) { return;}

    // 현재 시간
    const currentTime = e.target.currentTime;

    //전체 음악의 시간 초단위
    const duration = e.target.duration;

    //재생 시간
    const progressBarWidth = (currentTime/duration) * 100; 
    progressBar.current.style.width = `${progressBarWidth}%`
    setcurrentTime(getTime(currentTime));
    setduration(getTime(duration));
  }

  const onCLickProgress = (e) => {
    //bar 너비
    const progressBarWidth = e.currentTarget.clientWidth;
    //가로 좌표
    const offsetX = e.nativeEvent.offsetX;
    //전체 음악의 시간 초단위
    const duration = audio.current.duration;
    audio.current.currentTime = (offsetX/progressBarWidth) * duration
  }


  return (
    <div className="progress-area" onMouseDown={onCLickProgress}>
      <div className="progress-bar" ref={progressBar}>
        <audio
          autoPlay
          onEnded={onEnded}
          ref={audio}
          src={playList[currentIndex].src}
          onPlay ={onPlay}
          onPause={onPause}
          onTimeUpdate = {ontimeUpdate}
        ></audio>
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default forwardRef(ProgressArea);