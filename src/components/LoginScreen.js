import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      switch (errorCode) {
        case 'auth/invalid-email':
          // Handle invalid email
          console.log('The email address is not valid.');
          break;
        case 'auth/user-disabled':
          // Handle user disabled
          console.log(
            'The user account has been disabled by an administrator.');
          break;
        case 'auth/user-not-found':
          // Handle user not found
          console.log(
            'There is no user record corresponding to this identifier. The user may have been deleted.');
          break;
        case 'auth/wrong-password':
          // Handle wrong password
          console.log(
            'The password is invalid or the user does not have a password.');
          break;
        default:
          // Handle other errors
          console.log(errorMessage);
          break;
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Mot de passe"
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Se connecter" onPress={handleLogin}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginBottom: 15,
  },
});

export default LoginScreen;