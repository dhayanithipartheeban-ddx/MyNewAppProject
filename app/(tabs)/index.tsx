import TodoItem from '@/components/TodoItem';
import styles from '@/styles/todo.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import {
  FlatList,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


export default function HomeScreen() {

  const saveTasks = async (tasks: Todo[]) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(tasks));
    } catch (error) {
      console.log('Error saving tasks', error);
    }
  };


  type Todo = {
    id: string;
    text: string;
    completed: boolean;
  };

  const [task, setTask] = useState('');

  const [tasks, setTasks] = useState<Todo[]>([]);



  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('todos');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks) as Todo[]);
      }
    } catch (error) {
      console.log('Error loading tasks', error);
    }
  };

  const image = { uri: 'https://img.freepik.com/free-photo/plain-smooth-green-wall-texture_53876-129746.jpg?semt=ais_hybrid&w=740&q=80' };

  const addTask = () => {
    if (!task.trim()) return;

    const newTask: Todo = {
      id: Date.now().toString(),
      text: task,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTask('');
  };


  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  useEffect(() => {
    const checkStorage = async () => {
      const value = await AsyncStorage.getItem('todos');
      console.log('Stored todos:', value);
    };

    checkStorage();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>📝 Todo List</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter task"
            placeholderTextColor="#C0C0C0"
            selectionColor={'#e5f45dff'}
            value={task}
            onChangeText={setTask}
          />

          <TouchableOpacity style={styles.addBtn} onPress={addTask}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              text={item.text}
              onDelete={() => deleteTask(item.id)}
            />
          )}
        />
      </ImageBackground>
    </View>
  );
}
