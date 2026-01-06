import PropsStyle from '@/styles/TodoPrps.styles';
import { MaterialIcons } from '@expo/vector-icons';
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
        <MaterialIcons name="delete" size={18} color="#e6ef3aff" style={PropsStyle.delete}/>
      </TouchableOpacity>
    </View>
  );
}

