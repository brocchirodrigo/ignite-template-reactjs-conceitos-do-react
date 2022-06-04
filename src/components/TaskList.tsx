import { useState } from 'react';

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [id, setIds] = useState<number[]>([]);

  function handleCreateNewTask() {

    const newId = tasks.length <= 0 ? 1 : id[id.length - 1] + 1;

    setIds([...id, newId]);

    if (newTaskTitle.trim() === '') return;
    const existsTaskName = tasks.some(task => task.title === newTaskTitle)
    if (existsTaskName) return;

    const newTask: Task = {
      id: newId,
      title: newTaskTitle,
      isComplete: false
    };

    const taskList: Task[] = [...tasks, newTask];

    setTasks(taskList);
  }


  function handleToggleTaskCompletion(id: number) {
    const filterTasks = tasks
      .filter(task => task.id === id)

    const updatedTask: Task = {
      id: filterTasks[0].id,
      title: filterTasks[0].title,
      isComplete: true,
    }

    const nonUpdatedTasks = tasks
      .filter(task => task.id !== id)

    const updateList = [...nonUpdatedTasks, updatedTask]

    updateList.sort(function (a, b) {
      return (a.id - b.id)
    })

    setTasks(updateList)
  }

  function handleRemoveTask(id: number) {
    const removedTaskFromList = tasks.filter(task => task.id !== id)

    setTasks(removedTaskFromList)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}