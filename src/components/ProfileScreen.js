import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import EditorPageScreen from './EditorPageScreen';

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
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Bonjour, {user.displayName}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <View>
        <TouchableOpacity style={styles.buttonSignOut} onPress={() => {
          const auth = getAuth();
          auth.signOut().then(() => {
            console.log('User successfully signed out!');
            navigation.navigate('Auth', {screen: 'Connexion'});
          }).catch((error) => {
            console.log('Failed to sign out', error);
          });
        }}>
          <Text style={styles.textSignOut}>Se déconnecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonEditProfile} onPress={() => {
          navigation.navigate('EditorPageScreen');
        }}>
          <Text style={styles.textEditProfile}>Modifier le profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 16,
    padding: 8,
  },
  welcomeMessage: {
    fontSize: 18,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonSignOut: {
    marginTop: 16,
    backgroundColor: 'tomato',
    padding: 8,
    borderRadius: 10,
  },
  textSignOut: {
    color: '#fff',
    textAlign: 'center',
  },
  buttonEditProfile: {
    marginTop: 16,
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 10,
  },
  textEditProfile: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProfileScreen;