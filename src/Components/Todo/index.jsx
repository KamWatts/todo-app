import React, { useState, createContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import List from "../List";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { randomId } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import DisplaySettingsContext from "../../Contex/Settings";
import axios from "axios";

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

  useEffect(() => {
    fetchItems();
  }, []);

  function fetchItems() {
    axios.get("'https://api-js401.herokuapp.com/signup'")
      .then(response => {
        setList(response.data);
        const incompleteItems = response.data.filter(item => !item.complete);
        setIncomplete(incompleteItems.length);
      })
      .catch(error => {
        console.error("Error fetching items:", error);
      });
  }

  function addItem(item) {
    axios.post("'https://api-js401.herokuapp.com/signup'", item)
      .then(response => {
        setList([...list, response.data]);
        setIncomplete(incomplete + 1);
      })
      .catch(error => {
        console.error("Error adding item:", error);
      });
  }

  function toggleComplete(id) {
    const item = list.find(item => item.id === id);
    const updatedItem = { ...item, complete: !item.complete };
  
    axios.put(`/api/items/${id}`, updatedItem)
      .then(response => {
        const updatedList = list.map(item => {
          if (item.id === id) {
            return response.data;
          }
          return item;
        });
  
        setList(updatedList);
  
        const incompleteItems = updatedList.filter(item => !item.complete);
        setIncomplete(incompleteItems.length);
      })
      .catch(error => {
        console.error("Error toggling item completeness:", error);
      });
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
