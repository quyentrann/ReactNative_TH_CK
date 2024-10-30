import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

export default function Screen2({ navigation, route }) {
  const [user, setUser] = useState(route.params.user);
  const [note, setNote] = useState(route.params?.textUpdate?.note || '');

  const updateNote = async (newUser) => {
    await fetch(`https://6572ab61192318b7db407fd7.mockapi.io/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    setUser(newUser);
  };

  const addNotes = () => {
    let updatedUser = { ...user };
    if (route.params?.textUpdate) {
      const index = updatedUser.notes.findIndex((n) => n.id === route.params.textUpdate.id);
      updatedUser.notes[index].note = note;
    } else {
      const newId = Math.max(...updatedUser.notes.map((n) => n.id)) + 1;
      updatedUser.notes.push({ id: newId, note });
    }
    updateNote(updatedUser);
    navigation.navigate('screen2', { user: updatedUser });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>ADD YOUR JOB</Text>
        <TextInput
          placeholder="input your job"
          style={{ height: 50, width: 290, borderWidth: 1, borderRadius: 12, paddingLeft: 15 }}
          value={note}
          onChangeText={setNote}
        />
        <TouchableOpacity
          style={{ height: 50, width: 190, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}
          onPress={addNotes}
        >
          <Text style={{ color: 'white' }}>FINISH</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../image/Image96.png')} />
      </View>
    </View>
  );
}
