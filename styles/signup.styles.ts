import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2a7fff',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },

  signupButton: {
    backgroundColor: '#2a7fff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  linkText: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 14,
    color: '#2a7fff',
  },
});
