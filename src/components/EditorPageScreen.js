import React, {useState} from 'react';
import {Button, Image, TextInput, View} from 'react-native';
import {getAuth, updateEmail, updateProfile} from 'firebase/auth';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import placeholder from '../assets/placeholder.jpg';

const EditorPageScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [newPhoto, setNewPhoto] = useState(null);

  const handleSave = async () => {
    if (newPhoto) {
      const storage = getStorage();
      const storageRef = ref(storage, 'userPhotos/' + user.uid);
      await uploadBytes(storageRef, newPhoto);
      const url = await getDownloadURL(storageRef);
      setPhotoURL(url);
    }

    await updateProfile(user, {displayName: name, photoURL});
    if (user.email !== email) {
      await updateEmail(user, email);
    }
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName} placeholder="Nom"/>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email"/>
      <Image source={photoURL ? {uri: photoURL} : placeholder}/>
      <Button title="Choisir une photo" onPress={() => {
        /* code pour choisir une photo */
      }}/>
      <Button title="Enregistrer" onPress={handleSave}/>
    </View>
  );
};

export default EditorPageScreen;