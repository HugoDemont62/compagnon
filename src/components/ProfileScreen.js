import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

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
      <Text>Nom d'utilisateur: {user.displayName}</Text>
      <Text>UID: {user.uid}</Text>
      {user.photoURL &&
        <Image source={{uri: user.photoURL}} style={{width: 50, height: 50}}/>}
      <Button title="Se déconnecter" onPress={() => {
        const auth = getAuth();
        auth.signOut();
        navigation.navigate('Auth', {screen: 'Login'});
      }}/>
    </View>
  );
};

export default ProfileScreen;