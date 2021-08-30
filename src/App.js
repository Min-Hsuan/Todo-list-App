import { useState, useEffect } from 'react';
import './App.css';
import TaskBlock from './components/Task/TaskBlock';
import Tab from './components/Tab';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isShown, setIsShown] = useState(false);

  const [filteredTitle, setFilteredTitle] = useState('未完成');
  const captureTasksHandler = (obj) => {
    setFilteredTitle(obj.title);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('TASKS'));
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
  }, [tasks]);

  const addTaskHandler = (taskObj) => {
    setTasks((prevTasks) => [taskObj, ...prevTasks]);
    setIsShown(false);
  };
  const checkboxChangeHandler = (updateObj) => {
    const clickItemIndex = tasks.findIndex((task) => task.id === updateObj.id);
    const clickItem = tasks[clickItemIndex];

    const updatedTask = { ...clickItem, state: updateObj.state };
    let updatedTasks = [...tasks];
    updatedTasks[clickItemIndex] = updatedTask;
    setTasks(updatedTasks);
  };

  const deleteTaskHandler = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };
  const deleteDoneTaskHandler = () => {
    const updatedTasks = tasks.filter((task) => task.state === false);
    setTasks(updatedTasks);
  };
  const showNewTaskHandler = (event) => {
    event.stopPropagation();
    setIsShown(true);
  };
  const closeNewTaskHandler = (event) => {
    event.stopPropagation();
    setIsShown(false);
  };
  return (
    <div className="App">
      <Tab
        onTab={captureTasksHandler}
        tasks={tasks}
      />
      <TaskBlock
        title={filteredTitle}
        onAdd={addTaskHandler}
        onDelete={deleteTaskHandler}
        onToggle={checkboxChangeHandler}
        onDeleteDone={deleteDoneTaskHandler}
        tasks={tasks}
        onShowNew={showNewTaskHandler}
        onCloseNew={closeNewTaskHandler}
        isShown={isShown}
      />
    </div>
  );
}

export default App;
