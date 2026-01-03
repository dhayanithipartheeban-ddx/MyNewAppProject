import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const addTask = () => {
    // Add task logic here
    alert(text);
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
    </View>
  );
}
