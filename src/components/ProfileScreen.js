import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <View>
      <Text>Bonjour, {user.email}</Text>
      <Button title="Se déconnecter" onPress={() => {
        const auth = getAuth();
        auth.signOut();
        navigation.navigate('Auth', {screen: 'Login'});
      }}/>
    </View>
  );
}

export default ProfileScreen;