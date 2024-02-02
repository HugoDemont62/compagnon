import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import placeholder from '../assets/placeholder.jpg';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (updatedUser) => {
      setUser(updatedUser);
    });

    return () => unsubscribe();
  }, [auth]);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/*
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Edit Profile');
        }}>
          <Ionicons name="settings" size={30} color="gray"/>
        </TouchableOpacity>
      </View>
      */}
      <View style={styles.imageContainer}>
        <Image style={styles.avatarPlaceholder} source={placeholder}/>
      </View>
      <View style={styles.center}>
        <Text style={styles.welcomeMessage}>Hello, {user.displayName}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
      </View>
      <View style={styles.containerBottom}>
        <TouchableOpacity style={styles.buttonSignOut} onPress={() => {
          const auth = getAuth();
          auth.signOut().then(() => {
            console.log('User successfully signed out!');
            navigation.navigate('Auth', {screen: 'Connexion'});
          }).catch((error) => {
            console.log('Failed to sign bout', error);
          });
        }}>
          <Text style={styles.textSignOut}>Disconnect</Text>
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
  header: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 50,
    borderColor: 'tomato',
    borderWidth: 1,
  },
  containerBottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  welcomeMessage: {
    fontSize: 18,
  },
  buttonSignOut: {
    marginTop: 16,
    backgroundColor: 'tomato',
    padding: 8,
    borderRadius: 10,
    marginBottom: 36,
  },
  textSignOut: {
    color: '#fff',
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
  },
});

export default ProfileScreen;