import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).
      then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      }).
      catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/email-already-in-use':
            // Handle email already in use
            console.log(
              'The email address is already in use by another account.');
            break;
          case 'auth/invalid-email':
            // Handle invalid email
            console.log('The email address is not valid.');
            break;
          case 'auth/operation-not-allowed':
            // Handle operation not allowed
            console.log(
              'Email/password accounts are not enabled. Enable email/password in the Firebase Console, under the Auth tab.');
            break;
          case 'auth/weak-password':
            // Handle weak password
            console.log('The password is not strong enough.');
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
      <Text style={styles.title}>S'inscrire</Text>
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
      <Button title="S'inscrire" onPress={handleRegister}/>
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

export default RegisterScreen;