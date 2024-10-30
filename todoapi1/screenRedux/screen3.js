import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useDispatch} from "react-redux"
import { updateTask, addTask } from '../redux_toolkit/userSlice';

export default function Screen3({ navigation, route }) {
  const dispatch = useDispatch()

  const [note, setNote] = useState(route.params?.textUpdate || '');

  const addNotes = () => {
    if (route.params?.textUpdate) {
      const newData = {
        id: route.params?.idNote,
        newNote:note
      }
      dispatch(updateTask(newData))
    } else {
      dispatch(addTask(note))
    }
    navigation.navigate('screen2');
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
