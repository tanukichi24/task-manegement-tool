import { FC, useState } from 'react';
import 'bulma/css/bulma.css';
import TaskItem from '../components/taskItem';
import Input from '../components/input';

const getKey: () => string = () => Math.random().toString(32).substring(2);

const TaskList: FC = () => {
  const [items, setItems] = useState([
    {
      key: getKey(),
      text: 'Learn JavaScript',
      deadline: '7/22',
      progress: 40,
      done: false,
    },
    {
      key: getKey(),
      text: 'Learn React',
      deadline: '7/23',
      progress: 20,
      done: false,
    },
    {
      key: getKey(),
      text: 'Get some good sleep',
      deadline: '7/24',
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
      <div className="panel-heading">⚛️ Task Manager</div>
      <div>
        <div className="columns">
          <div className="label column is-one-third">タスクリスト</div>
          <div className="label column">期限</div>
          <div className="label column">進捗</div>
          <div className="label column">{}</div>
        </div>
        {items.map((item) => (
          <TaskItem key={item.key} item={item} onCheck={handleCheck} />
        ))}
      </div>
      <button type="button" onClick={handleModal}>
        add Task
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
