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
  const [showPassword, setShowPassword] = useState(false);

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
    <>
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
        <PasswordInput
          onChangeText={setPassword}
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
    </>
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
});

export default LoginScreen;