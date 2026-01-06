import TodoItem from '@/components/TodoItem';
import styles from '@/styles/todo.styles';
import { useState } from 'react';
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
  const image = {uri: 'https://img.freepik.com/free-photo/plain-smooth-green-wall-texture_53876-129746.jpg?semt=ais_hybrid&w=740&q=80'};

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask('');
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
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
