import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

//pass - whitedevill616 . Devilll

export default function UserLogin({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully:', userCredential.user.uid);
      navigation.navigate('Main');
    } catch (authErr) {
      setError('Invalid email or password.');
      console.error('Login error:', authErr);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/login_bg.jpg')} style={styles.bgImage}>
        <StatusBar style="auto" />
        <View>
          <Text style={styles.textTitle}>User Login</Text>
        </View>
        <TextInput placeholder="Email" style={styles.inputBox} onChangeText={setEmail} value={email} keyboardType="email-address" />
        <TextInput placeholder="Password" style={styles.inputBox} onChangeText={setPassword} value={password} secureTextEntry />

        {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}

        <View>
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <LinearGradient
              colors={['#FF8C00', '#FFA500', '#FFD700']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}>
              <Text style={styles.buttonText}>{loading ? 'Logging' : 'Login'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.logInContainer}>
          <Text style={styles.text}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('UserSignup')}>
            <Text style={styles.textSignUp}>SignUp</Text>
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
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 1 },
    textShadowRadius: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  inputBox: {
    padding: 5,
    margin: 5,
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
  textSignUp: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 1 },
    textShadowRadius: 1,
  },
  button: {
    borderRadius: 25, // Adjust for desired button curvature
    overflow: 'hidden', // Essential to clip the gradient within the border radius
    width: 110,
    height: 50,
    marginVertical: 10,
  },
  gradient: {
    flex: 1, // Make the gradient fill the TouchableOpacity
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Add padding for text
    paddingVertical: 10,
  },
  logInContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 20,
  }

})    
