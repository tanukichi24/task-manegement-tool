import { render, screen } from '@testing-library/react';
import React from 'react';
import TaskList from './pages/taskList';

beforeEach(() => {
  render(<TaskList />);
});

describe('画面表示', () => {
  it('ヘッダーにタスク管理ツールと表示される', () => {
    expect(screen.getByText('タスク管理ツール')).toBeInTheDocument();
  });
});
