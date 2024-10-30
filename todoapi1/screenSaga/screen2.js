import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTaskSaga } from '../saga/slice';

export default function Screen2({ route, navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.users);
  const [searchNote, setSearchNote] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(user.notes);

  // Hàm xóa ghi chú
  function deleteNote(noteId) {
    dispatch(deleteTaskSaga(noteId));
  }

  // Cập nhật danh sách ghi chú mỗi khi user thay đổi
  useEffect(() => {
    setFilteredNotes(user.notes);
  }, [user]);

  // Cập nhật danh sách ghi chú theo từ khóa tìm kiếm
  useEffect(() => {
    const notes = user.notes.filter(item => 
      item.note.toLowerCase().includes(searchNote.toLowerCase())
    );
    setFilteredNotes(notes);
  }, [searchNote, user.notes]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchNote}
          onChangeText={text => setSearchNote(text)}
        />
      </View>

      <View style={styles.notesContainer}>
        <FlatList
          data={filteredNotes}
          keyExtractor={item => item?.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.noteItem}>
              <Image source={require('../image/Frame.png')} />
              <Text style={styles.noteText}>{item.note}</Text>
              <View style={styles.noteActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    navigation.navigate('screen3', {
                      idNote: item.id,
                      textUpdate: item.note,
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
          onPress={() => navigation.navigate('screen3')}
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
