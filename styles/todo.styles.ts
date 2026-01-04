import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10
  },
  addBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    marginLeft: 10,
    borderRadius: 5
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  
});

export default styles;
