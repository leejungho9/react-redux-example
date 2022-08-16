import React from 'react';
import QueueMusic from '@mui/icons-material/QueueMusic';
import Close from '@mui/icons-material/Close';
import PlayListItem from './PlayListItem';
import classNames from 'classnames';
import SortableList from '@jungho9/sortable'
import './PlayList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIndex, updatePlayList } from '../../store/musicPlayerReducer';



const PlayList = ({showPlayList, setshowPlayList }) => {
  const playList = useSelector(state=>state.playList)
  const dispatch = useDispatch();

  const onclickClosePlayList = () => {
    setshowPlayList(false)
  }

  const onClickItem = (index) => {
    dispatch(setCurrentIndex(index))
  }
  const onDropItem = (newPlayList) => {
    dispatch(updatePlayList(newPlayList))
  }
  const renderItem = (item, index) => <PlayListItem item={item} index={index}/>
  return (
    <div className={classNames('play-list', {'show': showPlayList})}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play list</span>
        </div>
        <Close
          sx={{ fontSize: 22, cursor: 'pointer' }}
          onClick={onclickClosePlayList}
        />
      </div>
      <SortableList
        data={playList}
        onDropItem={onDropItem}
        onClickItem={onClickItem}
        renderItem={renderItem}
      />
    </div>
  );
};

export default PlayList;