import React, { useState, createContext } from "react";
import { v4 as uuid } from "uuid";
import List from "../List";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { randomId } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import DisplaySettingsContext from "../../Contex/Settings";

export const DisplayContext = createContext(DisplaySettingsContext);

const Todo = () => {
  const [displaySettings, setDisplaySettings] = useState({
    maxItemsPerPage: 3,
    hideCompletedItems: true,
    sortDifficulty: "easy",
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  const form = useForm({
    initialValues: {
      AddItem: '',
      Assigned: '',
    },
  });

  return (
    <>
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>
      <Box maxWidth={320} mx="auto">
        <TextInput label="Add Item" placeholder="Type item here" {...form.getInputProps('AddItem')} />
        <TextInput mt="md" label="Assigned to" placeholder="Type your name here" {...form.getInputProps('Assigned')} />

        <Group position="center" mt="xl">
          <Button
            variant="outline"
            onClick={() =>
              form.setValues({
                AddItem: handleSubmit,
                Assigned: `${randomId()}@test.com`,
              })
            }
          >
            Add Item
          </Button>
        </Group>
      </Box>
      
        <List items={list} toggleComplete={toggleComplete} />
    
    </>
  );
};

export default Todo;
