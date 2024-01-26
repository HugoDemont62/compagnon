import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import PasswordInput from './PasswordInput';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChangeEmail = (email) => {
    setEmail(email);
    setEmailError(''); // reset the error message
  };

  const handleChangePassword = (password) => {
    setPassword(password);
    setPasswordError(''); // reset the error message
  };

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setEmailError('');
      setPasswordError('');
      console.log('User successfully logged in!');
      const user = userCredential.user;
      navigation.navigate('App', {screen: 'Accueil'});
    }).catch((error) => {
      const errorCode = error.code;

      switch (errorCode) {
        case 'auth/invalid-email':
          setEmailError('The email address is not valid.');
          break;
        case 'auth/user-not-found':
          setEmailError(
            'There is no user record corresponding to this identifier. The user may have been deleted.');
          break;
        case 'auth/wrong-password':
          setPasswordError(
            'The password is invalid or the user does not have a password.');
          break;
        case 'auth/too-many-requests':
          setPasswordError('Too many requests. Try again later.');
          break;
        case 'auth/network-request-failed':
          setPasswordError('Network error. Try again later.');
          break;
        case 'auth/invalid-credential':
          setPasswordError(
            'The supplied auth credential is malformed or has expired.');
          break;
        default:
          console.log(error.message);
          break;
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>

      {emailError !== '' &&
        <Text style={styles.errorText}>{emailError}</Text>
      }
      <TextInput
        style={styles.input}
        onChangeText={handleChangeEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {passwordError !== '' &&
        <Text style={styles.errorText}>{passwordError}</Text>
      }
      <PasswordInput
        onChangeText={handleChangePassword}
        value={password}
        placeholder="Mot de passe"
      />

      <TouchableOpacity style={styles.button} title="S'inscrire"
                        onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

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
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'tomato',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontWeight: 'bold',
    color: 'tomato',
  },
  errorText: {
    color: 'tomato',
    marginBottom: 10,
  },
});

export default LoginScreen;