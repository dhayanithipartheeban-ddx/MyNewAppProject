import { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [texts, setTexts] = useState<string[]>([]);
  const addTask = () => {
    // Add task logic here
    if (!text) return;
    setTexts([...texts, text]);
    setText('');
    alert(text);
  };
  const deleteTask = (index: number) => {
  setTexts(texts.filter((_, i) => i !== index));
  };

  return (
    <View>
      <Text>Todo App</Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={setText}
        value={text}
      />
      <TouchableOpacity onPress={addTask}>
        <Text>Add Text</Text>
      </TouchableOpacity>

      <FlatList
        data={texts}
        //renderItem={({ item }) => <Text>{item}</Text>}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => deleteTask(index)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
