import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function UserSignup({navigation}){
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError(null);
    setLoading(true);

  
    if (!name || !username || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

     
      await setDoc(doc(db, 'users', user.uid), {
        name,
        username,
        email,
        createdAt: new Date(),
        
      });

      console.log('User signed up successfully:', user.uid);
      
      navigation.navigate('UserLogin'); 
    } catch (err) {
      setError(err.message);
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/login_bg.jpg')} style={styles.bgImage}>
        <StatusBar style="auto" />
        <View>
        <Text style={styles.textTitle}>User Signup</Text>
        </View>
        <TextInput placeholder="Name" style={styles.inputBox} onChangeText={setName} value={name} />
        <TextInput placeholder="Username" style={styles.inputBox} onChangeText={setUsername} value={username} />
        <TextInput placeholder="Email" style={styles.inputBox} onChangeText={setEmail} value={email} keyboardType="email-address" />
        <TextInput placeholder="Password" style={styles.inputBox} onChangeText={setPassword} value={password} secureTextEntry />
        <TextInput placeholder="Confirm Password" style={styles.inputBox} onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry />
        
        {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
        
        <View>
        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
            <LinearGradient
            colors={['#FF8C00', '#FFA500', '#FFD700']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}   
            style={styles.gradient}>
            <Text style={styles.buttonText}>Signup</Text>
            </LinearGradient>
        </TouchableOpacity>
        </View>
        </ImageBackground>
    </View>
  );
}

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
      margin:5,
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#FF9500',
      backgroundColor: 'white',
      borderRadius: 30,
      height: 55,
      paddingHorizontal: 15
    },
    buttonText: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    },
    button:{
      borderRadius: 25, 
      overflow: 'hidden', // Essential to clip the gradient within the border radius
      width: 110,        
      height: 50,        
      marginVertical: 15,  
    },
    gradient: {
      flex: 1, // Make the gradient fill the TouchableOpacity
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20, // Add padding for text
      paddingVertical: 10,
    },
    signUpContainer: {
      flexDirection: 'row',
      marginTop: 20,
      alignItems: 'center'
    },

})    
