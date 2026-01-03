import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [text, setText] = useState('');

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
    </View>
  );
}
