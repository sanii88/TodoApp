import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, Switch, StyleSheet } from 'react-native';

export default function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  // Function to add a task
  const addTask = () => {
    if (taskTitle.trim()) {
      const newTask = { id: Date.now().toString(), title: taskTitle, status: 'due' };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
    }
  };

  // Function to toggle task status between 'due' and 'done'
  const toggleStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: task.status === 'due' ? 'done' : 'due' } : task
    ));
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Todo App by Sunny</Text>
      
      {/* Task title input field */}
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      
      {/* Add Task button */}
      <Button
        title="Add Task"
        onPress={addTask}
        disabled={!taskTitle.trim()}  // Disable the button if the input is empty
      />

      {/* Task list */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text>{item.title}</Text>
            <Text>Status: {item.status}</Text>
            
            {/* Toggle status between 'due' and 'done' */}
            <Switch
              value={item.status === 'done'}
              onValueChange={() => toggleStatus(item.id)}
            />
            
            {/* Delete task button */}
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  taskCard: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  delete: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
  },
});
