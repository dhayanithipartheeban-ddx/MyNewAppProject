
import { StyleSheet } from 'react-native';
const PropsStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#349aa1ff',
    borderRadius: 10,
    minHeight: 70
  },
  textWrapper: {
    flex: 1,
    paddingRight: 10
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    color: '#dbdb24ff'
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#6afe20ff'
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionText: {
    fontSize: 20,
    marginRight: 10
  },
  delete: {
    fontSize: 20,
    color:'#914040ff'
  }
});

export default PropsStyle;