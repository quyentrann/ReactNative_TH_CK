import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSaveData } from '../recoil/slice'

export default function Screen1({ navigation }) {
  const saveData = useSaveData();
  const [name, setName] = React.useState('tran');
  const [message, setMessage] = React.useState('');

  async function checkUser(){
    const resp = await fetch("https://6555ccce84b36e3a431e5d74.mockapi.io/todo/");
    const json = await resp.json();
    const user = json.find((u) => u.name === name);
     if (!user) {
      setMessage('User không tồn tại');
      return;
    }
    setMessage('');
    saveData(user);
    navigation.navigate('screen2', { user });
  }

  

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Image source={require('../image/Image96.png')} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          MANAGE YOUR {'\n'} TASK
        </Text>
      </View>
      <View style={{ flex: 1.5, justifyContent: 'space-around', alignItems: 'center' }}>
        <TextInput
          placeholder="Enter Email"
          style={{ height: 50, width: 290, borderWidth: 1, borderRadius: 15, paddingLeft: 15 }}
          value={name}
          onChangeText={setName}
        />
        {message ? <Text style={{ color: 'red' }}>{message}</Text> : null}
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            height: 50,
            width: 190,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={checkUser}
        >
          <Text style={{ color: 'white' }}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
