import TodoItem from '@/components/TodoItem';
import { auth, db } from '@/lib/firebase';
import styles from '@/styles/todo.styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
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
  View,
} from 'react-native';

/* ---------- Gradient Text ---------- */
function GradientText({
  text,
  style,
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
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

/* ---------- Types ---------- */
type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type FilterType = 'all' | 'active' | 'completed';

/* ---------- Screen ---------- */
export default function HomeScreen() {
  const router = useRouter();

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  const image = {
    uri: 'https://img.freepik.com/free-photo/plain-smooth-green-wall-texture_53876-129746.jpg',
  };

  /* ---------- Load Todos (Realtime, Per User) ---------- */
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'todos'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Todo, 'id'>),
      }));
      setTasks(data);
    });

    return unsubscribe;
  }, []);

  /* ---------- Add Todo ---------- */
  const addTask = async () => {
    if (!task.trim()) return;
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, 'users', user.uid, 'todos'), {
      text: task,
      completed: false,
      createdAt: Date.now(),
    });

    setTask('');
  };

  /* ---------- Toggle Todo ---------- */
  const toggleTask = async (id: string, completed: boolean) => {
    const user = auth.currentUser;
    if (!user) return;

    await updateDoc(
      doc(db, 'users', user.uid, 'todos', id),
      { completed: !completed }
    );
  };

  /* ---------- Delete Todo ---------- */
  const deleteTask = async (id: string) => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(db, 'users', user.uid, 'todos', id));
  };

  /* ---------- Logout ---------- */
  const logout = async () => {
    await signOut(auth);
    router.replace('/(auth)/login');
  };

  /* ---------- Filters ---------- */
  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const totalCount = tasks.length;
  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  /* ---------- UI ---------- */
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/logo-listivo.png')}
            style={styles.appIcon}
          />
          <GradientText text="Listivo" style={styles.appTitle} />

          <TouchableOpacity onPress={logout}>
            <AntDesign style={styles.logout} name="logout" color="#000" size={24} />
          </TouchableOpacity>
        </View>

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter task"
            placeholderTextColor="#C0C0C0"
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addTask}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filterRow}>
          <TouchableOpacity onPress={() => setFilter('all')}>
            <Text style={[styles.filterText, filter === 'all' && styles.activeFilter]}>
              All ({totalCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFilter('active')}>
            <Text style={[styles.filterText, filter === 'active' && styles.activeFilter]}>
              Active ({activeCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFilter('completed')}>
            <Text style={[styles.filterText, filter === 'completed' && styles.activeFilter]}>
              Completed ({completedCount})
            </Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TodoItem
              text={item.text}
              completed={item.completed}
              onToggle={() => toggleTask(item.id, item.completed)}
              onDelete={() => deleteTask(item.id)}
            />
          )}
        />
      </ImageBackground>
    </View>
  );
}
