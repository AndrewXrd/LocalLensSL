import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [hosts, setHosts] = useState([]);

  const searchHosts = async () => {
    if (searchText.trim() === '') {
      setHosts([]);
      return;
    }

    const hostsRef = collection(db, 'hosts');
    const q = query(
      hostsRef,
      where('experienceName', '>=', searchText),
      where('experienceName', '<=', searchText + '\uf8ff')
    );

    try {
      const querySnapshot = await getDocs(q);
      const hostsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHosts(hostsData);
    } catch (error) {
      console.error('Error searching hosts:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter experience name"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity title="Search" style={styles.button} onPress={searchHosts} >
        <LinearGradient
          style={styles.button}
          colors={['#FF6B6B', '#FFD166']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <Text style={styles.text}>Search</Text>
        </LinearGradient>
      </TouchableOpacity>
      <FlatList
        data={hosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('HostDetail', { host: item })}>
            <View style={styles.hostContainer}>
              <Text style={styles.hostName}>{item.name}</Text>
              <Text>{item.experienceName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  hostContainer: {
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  hostName: {
    fontWeight: 'bold',
  },
  button: {
    height: 'auto',
    width: '100%',
    padding: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default SearchScreen
