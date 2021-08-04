import { FC, useState } from 'react';
import 'bulma/css/bulma.css';
import TaskItem from '../components/taskItem';
import Input from '../components/input';
import './taskList.css';

const getKey: () => string = () => Math.random().toString(32).substring(2);

const TaskList: FC = () => {
  const [items, setItems] = useState([
    {
      key: getKey(),
      text: 'Learn JavaScript',
      deadline: '2021-08-03',
      progress: 40,
      done: false,
    },
    {
      key: getKey(),
      text: 'Learn React',
      deadline: '2021-08-04',
      progress: 20,
      done: false,
    },
    {
      key: getKey(),
      text: 'Get some good sleep',
      deadline: '2021-08-05',
      progress: 80,
      done: false,
    },
  ]);

  const [isModal, setIsModal] = useState(false);

  const handleCheck = (checked: {
    key: string;
    text: string;
    deadline: string;
    progress: number;
    done: boolean;
  }) => {
    if (checked.done === false) {
      const newItems = items.map((item) => {
        const checkedItem = item;

        if (checkedItem.key === checked.key) {
          checkedItem.done = true;
        }

        return item;
      });
      setItems(newItems);
      const sortItems = items.slice();
      const index = sortItems.findIndex((v) => v.key === checked.key);
      sortItems.splice(index, 1);
      const i = items.findIndex((v) => v.key === checked.key);
      const j = sortItems.findIndex((v) => v.done === true);
      if (j === -1) {
        sortItems.push(items[i]);
      } else {
        sortItems.splice(j, 0, items[i]);
      }
      setItems(sortItems);
    }
  };

  const handleAdd = (text: string, deadline: string) => {
    setItems([
      { key: getKey(), text, deadline, progress: 0, done: false },
      ...items,
    ]);
  };

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const active = () => (isModal ? 'is-active' : '');

  return (
    <div className="panel">
      <div className="header">
        <div className="logo">
          <img
            src="./icon.png"
            alt="task-management-tool-icon"
            width="53"
            height="53"
          />
          <p>タスク管理ツール</p>
        </div>
      </div>
      <div>
        <div className="task-label">
          <div className="task-list-label">タスクリスト</div>
          <div className="deadline-label">期限</div>
          <div className="progress-label">進捗</div>
        </div>
        {items.map((item) => (
          <TaskItem key={item.key} item={item} onCheck={handleCheck} />
        ))}
      </div>
      <button className="add-task-button" type="button" onClick={handleModal}>
        <img
          src="./add_task.png"
          alt="add-task-button"
          width="68"
          height="68"
        />
        <p className="add-task-label">タスクを追加する</p>
      </button>
      <div className={`modal ${active()}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <button
              type="button"
              onClick={handleModal}
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            <Input onAdd={handleAdd} closeModal={handleModal} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
