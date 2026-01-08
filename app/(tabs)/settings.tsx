import { signOut } from 'firebase/auth';
import { Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../lib/firebase';

export default function SettingsScreen() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
