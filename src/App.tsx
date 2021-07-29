import { FC } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import TaskList from './pages/taskList';

const App: FC = () => (
  <div className="container is-fluid">
    <TaskList />
  </div>
);

export default App;
