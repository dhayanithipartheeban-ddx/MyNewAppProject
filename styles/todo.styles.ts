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
    marginBottom: 20,
    color: '#e5f45dff'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#bccad2ff',
    borderRadius: 5,
    padding: 10,
    color: "#C0C0C0"
  },
  addBtn: {
    backgroundColor: '#349aa1ff',
    padding: 12,
    marginLeft: 10,
    borderRadius: 5.

  },
  addText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15
  },
  filterText: {
    fontSize: 16,
    color: '#dbdb24ff',
    fontWeight:500
  },
  activeFilter: {
    fontWeight: 'bold',
    color: '#6afe20ff',
    textDecorationLine: 'underline'
  },
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
},
appIcon: {
  width: 50,
  height: 50,
  borderRadius: 8
},
appTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#222'
},
logout:{
   color: 'white', 
   fontSize: 18
   }


});

export default styles;
