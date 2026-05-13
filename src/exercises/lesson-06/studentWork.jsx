import { useState } from 'react';
import UserProfile from './components/UserProfile.jsx';
import TaskFilterButtons from './components/TaskFilterButtons.jsx';
import TaskItem from './components/TaskItem.jsx';
import useTasks from './hooks/useTasks.js';
import { filterTasks } from './utils/filterTasks.js';

export default function StudentWork() {
  const { tasks, loading } = useTasks();
  const [filter, setFilter] = useState('all');

  const visibleTasks = filterTasks(tasks, filter);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      <UserProfile name="Student" />

      <TaskFilterButtons filter={filter} onSetFilter={setFilter} />

      <ul>
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
