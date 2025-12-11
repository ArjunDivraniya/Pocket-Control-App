import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import client from '../api/client';
import { COLORS } from '../theme';

const CategoryManagerScreen = () => {
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await client.get('/categories');
      setCategories(res.data);
    } catch (e) { console.log(e); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const addCategory = async () => {
    if(!newCatName) return;
    await client.post('/categories', { name: newCatName, icon: '🏷️', type: 'expense' });
    setNewCatName('');
    setModalVisible(false);
    fetchCategories();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      
      <FlatList 
        data={categories}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.iconBox}><Text>{item.icon}</Text></View>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity onPress={async () => {
                await client.delete(`/categories/${item._id}`);
                fetchCategories();
            }}>
                <Text style={{color: COLORS.danger}}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.addBtnText}>+ Add New Category</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>New Category</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Category Name" 
                    value={newCatName} 
                    onChangeText={setNewCatName}
                />
                <TouchableOpacity style={styles.saveBtn} onPress={addCategory}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{marginTop: 15}}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: COLORS.textDark },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, padding: 15, borderRadius: 15, marginBottom: 10 },
  iconBox: { width: 40, height: 40, backgroundColor: '#F3F4F6', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  name: { flex: 1, fontSize: 16, fontWeight: '600' },
  addBtn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  addBtnText: { color: 'white', fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { width: '100%', borderWidth: 1, borderColor: '#eee', padding: 10, borderRadius: 10, marginBottom: 20 },
  saveBtn: { backgroundColor: COLORS.primary, width: '100%', padding: 15, borderRadius: 10, alignItems: 'center' }
});

export default CategoryManagerScreen;