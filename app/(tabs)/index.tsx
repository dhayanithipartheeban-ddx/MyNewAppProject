import TodoItem from '@/components/TodoItem';
import styles from '@/styles/todo.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

function GradientText({
  text,
  style
}: {
  text: string;
  style?: any;
}) {
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: 'transparent' }]}>
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={['#2196F3', '#2ECC71']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {/* Invisible text to size the gradient */}
        <Text style={[style, { opacity: 0 }]}>
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}


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

  type FilterType = 'all' | 'active' | 'completed';

  const [filter, setFilter] = useState<FilterType>('all');

  const totalCount = tasks.length;
  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // all
  });


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

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
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
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo-listivo.png')}
            style={styles.appIcon}
          />
          <GradientText text="Listivo" style={styles.appTitle} />

        </View>

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

        <View style={styles.filterRow}>
          <TouchableOpacity onPress={() => setFilter('all')}>
            <Text style={[
              styles.filterText,
              filter === 'all' && styles.activeFilter
            ]}>
              All ({totalCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFilter('active')}>
            <Text style={[
              styles.filterText,
              filter === 'active' && styles.activeFilter
            ]}>
              Active ({activeCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFilter('completed')}>
            <Text style={[
              styles.filterText,
              filter === 'completed' && styles.activeFilter
            ]}>
              Completed ({completedCount})
            </Text>
          </TouchableOpacity>
        </View>



        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              text={item.text}
              completed={item.completed}
              onToggle={() => toggleTask(item.id)}
              onDelete={() => deleteTask(item.id)}
            />
          )}
        />
      </ImageBackground>
    </View>
  );
}
