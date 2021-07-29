import { FC, useState } from 'react';
import 'bulma/css/bulma.css';

const Input: FC<{
  onAdd: (text: string, deadline: string) => void;
  closeModal: () => void;
}> = ({ onAdd, closeModal }) => {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDeadline(e.target.value);

  const handleTask = () => {
    onAdd(text, deadline);
    setText('');
    setDeadline('');
    closeModal();
  };

  return (
    <>
      <div className="field">
        <div className="label">タスクを入力してください</div>
        <input
          className="input"
          type="text"
          placeholder="例）Udemyの講座を終わらせる"
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <div className="field">
        <div className="label">期限を設定してください</div>
        <input
          className="input"
          type="date"
          value={deadline}
          onChange={handleDeadlineChange}
        />
      </div>
      <div className="field">
        <button
          type="button"
          className="button is-success"
          onClick={handleTask}
        >
          タスクを追加する
        </button>
      </div>
    </>
  );
};

export default Input;
