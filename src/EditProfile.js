import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userRef = firestore().collection('users').doc(auth().currentUser.uid);

    userRef.get().then(doc => {
      const userData = doc.data();
      console.log("userdata =====",userData)
      setName(userData.userName);
      setEmail(userData.email);
      setPassword(userData.password);
    });
  }, []);

  const handleSubmit = () => {
    setLoading(true);

    const userRef = firestore().collection('users').doc(auth().currentUser.uid);

    userRef.update({
      name,
      email,
      password,
    }).then(() => {
      setLoading(false);
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  };

  return (
    <View>
      <TextInput value={name}  onChangeText={setName} />
      <TextInput value={email} onChangeText={setEmail} />
      <TextInput value={password} onChangeText={setPassword} />
      <Button title="Submit" onPress={handleSubmit} disabled={loading} />
    </View>
  );
};

export default EditProfile;
