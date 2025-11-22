import { React, useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase';

const profile = ({ navigation }) => {

  const [userData, setUserData] = useState({ username: 'Loading...', email: 'Loading...' });

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              username: data.username || 'Username',
              email: user.email || 'Email Address',
            });
          } else {
            Alert.alert('Error', 'User document not found.');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch user data: ' + error.message);
        }
      } else {
        // Redirect to login if not authenticated (optional for MVP)
        navigation.navigate('UserLogin');
      }
    });

    return unsubscribe; // Cleanup on unmount
  }, [navigation]);


  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <Image source={require('../assets/header.jpg')} style={styles.header} />

      <Image source={require('../assets/logo.png')} style={styles.profilePic} />

      <Text style={{ fontSize: 40, fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>{userData.username}</Text>
      <Text style={{ fontSize: 15, color: 'gray', alignItems: 'center', justifyContent: 'center' }}>{userData.email}</Text>

      <TouchableOpacity style={styles.textEditProfile} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={{ marginHorizontal: 20, marginBottom: 2 }}>📝</Text>
        <Text style={{ color: 'gray' }}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textWishlist} onPress={() => navigation.navigate('UserSignup')}>
        <Text style={{ marginBottom: 1, marginHorizontal: 13 }}>       📝</Text>
        <Text style={{ color: 'gray' }}>Create Profile</Text>
      </TouchableOpacity>


    </View>
  )
}

export default profile

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  header: {
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
    width: '100%',
    height: 60,
  },

  profilePic: {
    marginTop: 50,
    marginBottom: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#FFA500',
    resizeMode: 'cover',
  },

  textEditProfile: {
    fontSize: 11,
    position: 'absolute',
    left: 8,
    bottom: 235
  },

  textWishlist: {

    fontSize: 11,
    position: 'absolute',
    right: 8,
    bottom: 235
  }


})