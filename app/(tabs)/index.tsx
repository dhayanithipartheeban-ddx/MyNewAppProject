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
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('todos');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log('Error loading tasks', error);
    }
  };

  const image = { uri: 'https://img.freepik.com/free-photo/plain-smooth-green-wall-texture_53876-129746.jpg?semt=ais_hybrid&w=740&q=80' };

  const addTask = () => {
    if (!task.trim()) return;

    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTask('');
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const saveTasks = async (tasks: string[]) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(tasks));
    } catch (error) {
      console.log('Error saving tasks', error);
    }
  };

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
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TodoItem
              text={item}
              onDelete={() => deleteTask(index)}
            />
          )}
        />
      </ImageBackground>
    </View>
  );
}
