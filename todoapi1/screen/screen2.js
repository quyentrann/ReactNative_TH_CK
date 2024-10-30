import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux_toolkit/userSlice';

export default function Screen3({ route, navigation }) {
  const { user } = route.params;
  console.log(user.id)
  const [notesALL, setNotesALL] = useState(user.notes);
  const [notes, setNotes] = useState(user.notes);
  const [searchNote, setSearchNote] = useState('');
  const dispatch = useDispatch();

  // Search filter logic
  useEffect(() => {
    if (searchNote === '') {
      setNotes(notesALL);
    } else {
      const filteredNotes = notesALL.filter((note) =>
        note.note.toLowerCase().includes(searchNote.toLowerCase())
      );
      setNotes(filteredNotes);
    }
  }, [searchNote, notesALL]);

const previousNotes = [...notesALL]; // Lưu trước khi cập nhật state
const [loading, setLoading] = useState(false);

async function deleteNote(noteId) {
  const updatedNotes = notesALL.filter((note) => note.id !== noteId);
  setNotesALL(updatedNotes);
  setNotes(updatedNotes);
  
  setLoading(true); // Bắt đầu loading

  const url = `https://6555ccce84b36e3a431e5d74.mockapi.io/todo/${user.id}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...user, notes: updatedNotes }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to update notes: ${response.status} - ${errorMessage}`);
    }

    Alert.alert('Note deleted successfully!');
    dispatch(deleteTask({ userId: user.id, noteId }));
  } catch (error) {
    console.error('Error deleting note:', error.message);
    Alert.alert('Error', 'Failed to delete the note.');
    
    // Khôi phục state nếu API gặp lỗi
    setNotesALL(notesALL);
    setNotes(notesALL);
  } finally {
    setLoading(false); // Kết thúc loading
  }
}





  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchNote}
          onChangeText={(text) => setSearchNote(text)}
        />
      </View>

      <View style={styles.notesContainer}>
        <FlatList
          data={notes}
         keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.noteItem}>
              <Image source={require('../image/Frame.png')} />
              <Text style={styles.noteText}>{item.note}</Text>
              <View style={styles.noteActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    navigation.navigate('screen3', {
                      notes: notes,
                      idNote: item.id,
                    });
                  }}
                >
                  <Image source={require('../image/Frame(1).png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNote(item.id)}>
                  <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text>No notes available.</Text>}
        />
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('screen3', { notes: notes })}
        >
          <Text style={{ color: 'white' }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 50,
    width: 290,
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 12,
  },
  notesContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  noteItem: {
    height: 50,
    width: 290,
    backgroundColor: '#DEE1E62B',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  noteActions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 10,
  },
  addButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  addButton: {
    height: 50,
    width: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});
