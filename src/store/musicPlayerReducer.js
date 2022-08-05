import img1 from '../images/music-1.jpg';
import img2 from '../images/music-2.jpg';
import img3 from '../images/music-3.jpg';
import img4 from '../images/music-4.jpg';
import img5 from '../images/music-5.jpg';
import music1 from '../music/music-1.mp3';
import music2 from '../music/music-2.mp3';
import music3 from '../music/music-3.mp3';
import music4 from '../music/music-4.mp3';
import music5 from '../music/music-5.mp3';

 const playList = [
    {
      name: 'Relax And Sleep',
      artist: 'Anton Vlasov',
      img: img1,
      src: music1,
      id: 1,
    },
    {
      name: "Don't You Think Lose",
      artist: 'Anton Vlasov',
      img: img2,
      src: music2,
      id: 2,
    },
    {
      name: 'The Cradle of Your Soul',
      artist: 'lemonmusicstudio',
      img: img3,
      src: music3,
      id: 3,
    },
    {
      name: 'Spirit Blossom',
      artist: 'RomanBelov',
      img: img4,
      src: music4,
      id: 4,
    },
    {
      name: 'Everything Feels New',
      artist: 'EvgenyBardyuzha',
      img: img5,
      src: music5,
      id: 5,
    },
  ];

  const initialState = {
    playList, 
    currentMusicId : playList[0].id,  //현재곡 아이디
    currentIndex : 0,                  //현재곡 인덱스
    playing : false,                   //재생 여부
    repeat : "ALL" ,                   //곡 재생 타입 ex) 한곡만 반복, 랜덤반복
  }


  //action 정의
  const PLAY_MUSIC = "musicPlayer/PLAY_MUSIC";
  const STOP_MUSIC = "musicPlayer/STOP_MUSIC";

  //action 생성자
  export const playMusic = () => ({type: PLAY_MUSIC})
  export const stopyMusic = () => ({type: STOP_MUSIC})

  //reducer 생성
  export default function musicPlayerReducer(state = initialState, action) {
    switch(action.type) {
        case PLAY_MUSIC : 
        return {
            ...state,
            playing : true
        }
        case STOP_MUSIC : 
        return {
            ...state,
            playing : false
        }
        default : return state
    }
  }