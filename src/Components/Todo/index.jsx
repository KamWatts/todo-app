import React, { useEffect, useState, createContext } from 'react';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import List from './List';
import Pagination from 'mantine/lib/Pagination/Pagination';

// Create context for managing application display settings
export const DisplayContext = createContext();

const Todo = () => {
  const [displaySettings, setDisplaySettings] = useState({
    maxItemsPerPage: 3,
    hideCompletedItems: true,
    sortDifficulty: 'easy',
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <DisplayContext.Provider value={{ displaySettings, setDisplaySettings }}>
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>
        <label>
          <span>To Do Item</span>
          <input
            onChange={handleChange}
            name="text"
            type="text"
            placeholder="Item Details"
          />
        </label>
        <label>
          <span>Assigned To</span>
          <input
            onChange={handleChange}
            name="assignee"
            type="text"
            placeholder="Assignee Name"
          />
        </label>
        <label>
          <span>Difficulty</span>
          <input
            onChange={handleChange}
            defaultValue={displaySettings.difficulty}
            type="range"
            min={1}
            max={5}
            name="difficulty"
          />
        </label>
        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>

      <List list={list} toggleComplete={toggleComplete} />

      <Pagination
        maxPages={Math.ceil(list.length / displaySettings.maxItemsPerPage)}
        onChange={() => {}}
      />
    </DisplayContext.Provider>
  );
};

export default Todo;
