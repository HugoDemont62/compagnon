import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import PasswordInput from './PasswordInput';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [username, setUsername] = useState('');

  const handleChangeEmail = (email) => {
    setEmail(email);
    setEmailError(''); // reset the error message
  };

  const handleChangePassword = (password) => {
    setPassword(password);
    setPasswordError(''); // reset the error message
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas.');
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).
      then((userCredential) => {
        setEmailError('');
        setPasswordError('');
        console.log('User successfully logged in!');
        const user = userCredential.user;
        updateProfile(user, {displayName: username}).then(() => {
          console.log('Username updated successfully');
          navigation.navigate('App', {screen: 'Accueil'});
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setUsername('');
        }).catch((error) => {
          console.log('Failed to update username', error);
        });
      }).
      catch((error) => {
        const errorCode = error.code;

        switch (errorCode) {
          case 'auth/email-already-in-use':
            setEmailError(
              'The email address is already in use by another account.');
            break;
          case 'auth/invalid-email':
            setEmailError('The email address is not valid.');
            break;
          case 'auth/operation-not-allowed':
            console.log(
              'Email/password accounts are not enabled. Enable email/password in the Firebase Console, under the Auth tab.');
            break;
          case 'auth/weak-password':
            setPasswordError('The password is not strong enough.');
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>S'inscrire</Text>

      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Nom d'utilisateur"
        autoCapitalize="none"
      />

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

      <PasswordInput
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirmer le mot de passe"
      />

      <TouchableOpacity style={styles.button} title="S'inscrire"
                        onPress={handleRegister}>
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
    borderRadius: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontWeight: 'bold',
    color: 'tomato',
  },
  errorText: {
    color: 'tomato',
    marginBottom: 10,
  },
});

export default RegisterScreen;