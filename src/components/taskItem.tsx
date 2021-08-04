import { FC, useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';
import './taskItem.css';

type Props = {
  item: {
    key: string;
    text: string;
    deadline: string;
    progress: number;
    done: boolean;
  };
  onCheck: (checked: {
    key: string;
    text: string;
    deadline: string;
    progress: number;
    done: boolean;
  }) => void;
};

const TaskItem: FC<Props> = ({ item, onCheck }) => {
  const [taskItem, setTaskItem] = useState(item);

  const handleChange = () => {
    onCheck(taskItem);
    taskItem.progress = 100;
  };

  const [newProgress, setNewProgress] = useState(taskItem.progress);

  const [isModal, setIsModal] = useState(false);
  const handleModal = () => {
    setIsModal(!isModal);
  };
  const active = () => (isModal ? 'is-active' : '');

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProgress(Number(e.target.value));
  };

  const changeProgress = () => {
    if (newProgress === 100) {
      taskItem.done = !taskItem.done;
    }
    setTaskItem({ ...taskItem, progress: newProgress });
    handleModal();
  };

  /*
  const changeDeadline = () => {
    let newDeadline = taskItem.deadline;
    newDeadline = newDeadline.slice(5, 9);

    return newDeadline;
  };
  */

  return (
    <>
      <span
        className={classNames({
          'has-text-grey-light': taskItem.done,
        })}
      >
        <div className="task-item">
          <div className="task-text">{taskItem.text}</div>
          <div className="task-deadline">{taskItem.deadline}</div>
          <div className="task-progress">
            <div onClick={handleModal} role="presentation">
              {taskItem.progress}%
            </div>
          </div>
          <div className="task-progress-bar">
            <progress max="100" value={taskItem.progress}>
              {taskItem.progress}
            </progress>
          </div>
          <div className="task-checkbox">
            <input
              id="check1"
              type="checkbox"
              checked={taskItem.done}
              onChange={handleChange}
            />
            <label htmlFor="check1">{}</label>
          </div>
        </div>
      </span>

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
            <div className="field">
              <div className="label is-size-4">
                <p>進捗を入力してください</p>
                <p>(半角数字で入力してください)</p>
              </div>
              <input
                className="input is-size-4"
                type="number"
                value={newProgress}
                onChange={handleProgress}
              />
            </div>
            <button
              type="button"
              className="button is-success is-size-4"
              onClick={changeProgress}
            >
              進捗を更新
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
