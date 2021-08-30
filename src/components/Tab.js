import {MdDateRange} from 'react-icons/md';
import {BiCalendarCheck} from 'react-icons/bi';
import {FaRegListAlt} from 'react-icons/fa';
import { useState } from 'react';
import classes from './Tab.module.css';

const Tab = (props) => {
  const [clickedTab, setClickedTab] = useState({
    todo: true,
    done: false,
    all: false,
  });
  const todoTaskHandler = () => {
    props.onTab({
      title: '未完成',
    });
    setClickedTab({
      todo: true,
      done: false,
      all: false,
    });
  };
  const doneTaskHandler = () => {
    props.onTab({
      title: '已完成',
    });
    setClickedTab({
      todo: false,
      done: true,
      all: false,
    });
  };
  const allTaskHandler = () => {
    props.onTab({
      title: '全部',
    });
    setClickedTab({
      todo: false,
      done: false,
      all: true,
    });
  };
  const todoClasses = `${classes['tab-item']} ${clickedTab.todo ? classes.active : ''}`
  const doneClasses = `${classes['tab-item']} ${clickedTab.done ? classes.active : ''}`
  const allClasses = `${classes['tab-item']} ${clickedTab.all ? classes.active : ''}`
  
  const todoNum = props.tasks.filter(item=>!item.state).length;
  const doneNum = props.tasks.filter(item=>item.state).length;
  const allNum = props.tasks.length;

  return (
    <div className={classes.tab}>
      <h3 className={classes['small-text']}>代辦事項</h3>
      <ul>
        <li className={todoClasses} onClick={todoTaskHandler}>
          <span className={classes.icon}><MdDateRange/></span>
          <p>未完成</p>
          <p className={classes.total}>{todoNum}</p>
        </li>
        <li className={doneClasses} onClick={doneTaskHandler}>
          <span className={classes.icon}><BiCalendarCheck/></span>
          <p>已完成</p>
          <p className={classes.total}>{doneNum}</p>
        </li>
        <li className={allClasses} onClick={allTaskHandler}>
          <span className={classes.icon}><FaRegListAlt/></span>
          <p>全部</p>
          <p className={classes.total}>{allNum}</p>
        </li>
      </ul>
    </div>
  );
};

export default Tab;
