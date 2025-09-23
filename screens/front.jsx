import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';



const Front = ({navigation}) => {
  return (
    <View style={styles.container}>
          <ImageBackground source={require('../assets/bg.jpg')} style={styles.bgImage}>
          <StatusBar style="auto" />
          <View style={styles.logoTextContainer}>
              <Image source={require('../assets/logo.png')} style={styles.logo} />
              <Text style={styles.logoText}>Discover Authentic Sri Lankan Adventures</Text>
          </View>

          <TouchableOpacity style={styles.op} onPress={() => navigation.navigate('UserLogin')}>
            <LinearGradient
                style={styles.button}
                colors={['#FF6B6B', '#FFD166']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>    
              <Text style={styles.text}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>

          </ImageBackground>
      </View>
  );
}

export default Front;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color : 'white',
    fontSize : 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'top',
  },
  logoTextContainer: {
    padding: 35,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 0,
    width: 240,
    height: 240,
  },
  op: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 25,
    width: '96%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',  
    paddingBottom: 10,
    paddingTop: 5,
    marginTop: 4,
  },
});

