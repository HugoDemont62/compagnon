import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {getAuth, updateEmail, updateProfile} from 'firebase/auth';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import ImagePicker from 'react-native-image-picker';
import placeholder from '../assets/placeholder.jpg';

const EditorPageScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [photo, setPhoto] = useState(null);

  // TODO : Faire l'ajout correct de la photo de profil
  const handleChoosePhoto = () => {
    //
  };

  const handleSave = async () => {
    if (photo) {
      const storage = getStorage();
      const storageRef = ref(storage, 'userPhotos/' + user.uid);
      await uploadBytes(storageRef, photo);
      const url = await getDownloadURL(storageRef);
      setPhoto({uri: url});
    }

    await updateProfile(user, {displayName: name});
    if (user.email !== email) {
      await updateEmail(user, email);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={name} onChangeText={setName}
                 placeholder="Nom"/>
      <TextInput style={styles.input} value={email} onChangeText={setEmail}
                 placeholder="Email"/>
      <Image style={styles.image}
             source={placeholder}/>
      <TouchableOpacity style={styles.button} title="Choisir une photo" onPress={handleChoosePhoto}>
        <Text style={styles.buttonText}>Choisir une photo</Text>
      </TouchableOpacity>
      <Button title="Enregistrer" onPress={handleSave}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'tomato',
    marginBottom: 16,
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 50,
    borderColor: 'tomato',
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
export default EditorPageScreen;