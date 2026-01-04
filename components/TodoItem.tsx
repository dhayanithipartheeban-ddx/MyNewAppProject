import PropsStyle from '@/styles/TodoPrps.styles';
import { Text, TouchableOpacity, View } from 'react-native';
type TodoItemProps = {
  text: string;
  onDelete: () => void;
};

export default function TodoItem({ text, onDelete }: TodoItemProps) {
  return (
    <View style={PropsStyle.item}>
      <Text style={PropsStyle.text}>{text}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Text style={PropsStyle.delete}>❌</Text>
      </TouchableOpacity>
    </View>
  );
}

