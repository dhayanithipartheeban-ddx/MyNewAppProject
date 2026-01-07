import PropsStyle from '@/styles/TodoPrps.styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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

  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setExpanded(!expanded)}
      style={PropsStyle.container}
    >
      <View style={PropsStyle.textWrapper}>
        <Text
          style={[
            PropsStyle.text,
            completed && PropsStyle.completed
          ]}
          numberOfLines={expanded ? undefined : 2}
        >
          {text}
        </Text>
      </View>

      <View style={PropsStyle.actions}>
        <TouchableOpacity onPress={onToggle}>
          <Text style={PropsStyle.actionText}>
            {completed ? '↩️' : '✅'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <MaterialIcons name="delete" size={24} color="#de8787ff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
