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
    <form>
      <div className="field">
        <div className="label is-size-4">タスクを入力してください</div>
        <input
          className="input is-size-4"
          type="text"
          placeholder="例）Udemyの講座を終わらせる"
          value={text}
          onChange={handleTextChange}
          required
        />
      </div>
      <div className="field">
        <div className="label is-size-4">期限を設定してください</div>
        <input
          className="input is-size-4"
          type="date"
          value={deadline}
          onChange={handleDeadlineChange}
          required
        />
      </div>
      <div className="field">
        <button
          type="button"
          className="button is-success is-size-4"
          onClick={handleTask}
        >
          タスクを追加する
        </button>
      </div>
    </form>
  );
};

export default Input;
