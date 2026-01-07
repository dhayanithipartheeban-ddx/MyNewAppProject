import PropsStyle from '@/styles/TodoPrps.styles';
import { Text, TouchableOpacity, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

type TodoItemProps = {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};


export default function TodoItem({
  text,
  completed,
  onToggle,
  onDelete
}: TodoItemProps) {
  return (
    <View style={PropsStyle.item}>
      <TouchableOpacity onPress={onToggle}>
        <Text
          style={[
            PropsStyle.text,
            completed && PropsStyle.completed
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color="#e5f45dff" />
      </TouchableOpacity>
    </View>
  );
}


