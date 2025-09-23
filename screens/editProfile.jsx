import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from "@react-native-material/core";
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, onAuthStateChanged, updatePassword, updateEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../firebase';


const editProfile = ({navigation}) => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
            setName(data.name || '');
            setUsername(data.username || '');
            setEmail(user.email || '');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to load user data: ' + error.message);
        }
      } else {navigation.navigate('UserLogin');
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleUpdate = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const auth = getAuth(app);
    const db = getFirestore(app);
    const user = auth.currentUser;

    if (user) {
      try {
        // Update Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          name,
          username,
        });

        // Update Auth email if changed
        if (email !== user.email) {
          await updateEmail(user, email);
        }

        // Update password if provided
        if (newPassword) {
          await updatePassword(user, newPassword);
        }

        Alert.alert('Success', 'Profile updated!');
        navigation.goBack(); // Go back to Profile
      } catch (error) {
        Alert.alert('Error', 'Update failed: ' + error.message);
      }
    }
  };


  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/login_bg.jpg')} style={styles.bgImage}>
        <StatusBar style="auto" />
        <View>
        <Text style={styles.textTitle}>Edit Profile</Text>
        </View>
        <TextInput label="Name" style={styles.inputBox} />
        <TextInput label="Username" style={styles.inputBox} />
        <TextInput label="Email" style={styles.inputBox} />
        <TextInput label="New Password" style={styles.inputBox} />
        <TextInput label="Confirm Password" style={styles.inputBox} />
        
        
        <View>
        <TouchableOpacity style={styles.button}>
            <LinearGradient
            colors={['#FF8C00', '#FFA500', '#FFD700']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}   
            style={styles.gradient}>
            <Text style={styles.buttonText}>Update</Text>
            </LinearGradient>
        </TouchableOpacity>
        </View>
        </ImageBackground>
    </View>
  )
}

export default editProfile

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        color: 'white',
        fontSize: 30,
        fontWeight : 'bold',
        marginBottom: 30,
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 0.5, height:1 },
        textShadowRadius: 1,
    },
    inputBox: {
        padding: 5,
        width: '80%',
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    button:{
        borderRadius: 10, 
        overflow: 'hidden', 
        width: 110,        
        height: 50,        
        marginVertical: 15,
        
    },
    gradient: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },

})    