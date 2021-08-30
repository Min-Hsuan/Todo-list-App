import {RiDeleteBinLine} from 'react-icons/ri';
import classes from './TaskItem.module.css';

const TaskItem = (props) => {

  const stateChangeHandler = (event) => {
    props.onChangeState({
      id: props.id,
      value: props.value,
      state: !props.state,
    });
  };
  const deleteTaskHandler = (event)=>{
    event.stopPropagation();
    props.onDelete(props.id);
  };
  const styleClasses = `${classes['task']} ${props.state? classes.checked : ''}`
  return (
    <li key={props.id} className={styleClasses} onClick={stateChangeHandler}>
      <span className={classes.checkbox} />
      <div className={classes.text}>{props.value}</div>
      <span onClick={deleteTaskHandler}><RiDeleteBinLine /></span>
    </li>
  );
};

export default TaskItem;
