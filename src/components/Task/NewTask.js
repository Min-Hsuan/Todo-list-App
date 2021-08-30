import { useRef } from 'react';
import classes from './NewTask.module.css';

const NewTask = (props) => {
  const taskRef = useRef();
  const inputValueHandler = (event) => {

    event.preventDefault();
    if(taskRef.current.value.trim()===''){
      return;
    }
    props.addTask({
      id: Math.random(),
      value: taskRef.current.value,
      state: false
    })
    taskRef.current.value = '';
  };
  return (
    <form className={classes['new-task']} onSubmit={inputValueHandler}  >
      <input className={classes.text} type="text" ref={taskRef}  />
      <button type='submit' >+</button>
    </form>
  );
};

export default NewTask;
