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
  const [isExpandable, setIsExpandable] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (isExpandable) {
          setExpanded(!expanded);
        }
      }}
      style={PropsStyle.container}
    >
      <View style={PropsStyle.textWrapper}>
        <Text
          style={[
            PropsStyle.text,
            completed && PropsStyle.completed
          ]}
          numberOfLines={expanded ? undefined : 2}
          onTextLayout={(e) => {
            if (e.nativeEvent.lines.length > 2) {
              setIsExpandable(true);
            }
          }}
        >
          {text}
        </Text>
      </View>

      {/* SHOW ACTIONS ONLY WHEN NOT EXPANDED */}
      {!expanded && (
        <View style={PropsStyle.actions}>
          <TouchableOpacity onPress={onToggle}>
            <Text style={PropsStyle.actionText}>
              {completed ? '↩️' : '✅'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete}>
            <MaterialIcons name="delete" style={PropsStyle.delete} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

}
