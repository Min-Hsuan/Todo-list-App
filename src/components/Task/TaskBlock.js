import classes from './TaskBlock.module.css';
import NewTask from './NewTask';
import TaskItem from './TaskItem';

const TaskBlock = (props) => {
  const {
    onAdd,
    onDelete,
    onToggle,
    onDeleteDone,
    tasks,
    isShown,
    onShowNew,
    onCloseNew,
  } = props;

  
  let filteredNum = 0;
  let tabTitleColor = classes.todo;
  let selectedTabTasks;
  if (props.title === '已完成') {
    selectedTabTasks = tasks.filter((task) => task.state === true);
    tabTitleColor = classes.done;
  }
  if (props.title === '未完成') {
    selectedTabTasks = tasks.filter((task) => !task.state);
    tabTitleColor = classes.todo;
  }

  if (props.title === '全部') {
    selectedTabTasks = tasks;
    tabTitleColor = classes.all;
  }
  filteredNum = selectedTabTasks.length;
  let taskList;
  if(filteredNum > 0 ){
    taskList = (
      <ul>
        {selectedTabTasks.map((task) => (
          <TaskItem
            id={task.id}
            key={task.id}
            state={task.state}
            value={task.value}
            onDelete={onDelete}
            onChangeState={onToggle}
          />
        ))}
      </ul>
    );
    
  }else{
    taskList = <p>沒有提醒事項</p>;
  }
  
  return (
    <div className={classes['tab-block']}>
      <div className={classes.backdrop} onClick={onCloseNew}></div>
      <div className={`${classes['tab-title']} ${tabTitleColor}`}>
        <h2>{props.title}</h2>
        <h2>{filteredNum}</h2>
      </div>
      {taskList}
      {isShown && <NewTask addTask={onAdd} onCloseNew={onCloseNew} />}
      <div className={classes.actions}>
        <button className={classes['clean-done']} onClick={onDeleteDone}>
          清除已完成項目
        </button>
        <button className={classes['button-add']} onClick={onShowNew}>
          +
        </button>
      </div>
    </div>
  );
};

export default TaskBlock;
