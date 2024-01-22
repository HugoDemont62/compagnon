import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      console.log('Les mots de passe ne correspondent pas.');
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).
      then((userCredential) => {
        console.log('User successfully logged in!');
        const user = userCredential.user;
        navigation.navigate('App', {screen: 'Accueil'});
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
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} title="S'inscrire" onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text>Vous avez déjà un compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    color: '#333333',
  },
  input: {
    width: '80%',
    borderColor: 'tomato',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 18,
  },
  button: {
    width: '80%',
    backgroundColor: 'tomato',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: '#333333',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;