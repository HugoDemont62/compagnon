import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log('User successfully logged in!');
      const user = userCredential.user;
      navigation.navigate('App', {screen: 'Accueil'});
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
      <Button title="Se connecter" onPress={handleLogin} style={styles.button}/>
      <View style={styles.registerContainer}>
        <Text>Vous n'avez pas de compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Inscrivez-vous</Text>
        </TouchableOpacity>
      </View>
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
    borderRadius: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: 'tomato',
    textDecorationLine: 'underline',
  },
  button: {
    borderRadius: 10,
  },
});

export default LoginScreen;