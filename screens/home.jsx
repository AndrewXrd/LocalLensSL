import React from 'react'
import { StyleSheet, ScrollView, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <View style={styles.header}>
        <LinearGradient
          colors={['#FF8C00', '#FFA500', '#FFD700']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}   
          style={styles.gradient}>
          <Image source={require('../assets/titleLogo.png')} style={styles.titleLogo}/>
        </LinearGradient>
      </View>

      <Text style={styles.text}>Location</Text>

      <View style={styles.carouselContainer}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        <ImageBackground source={require('../assets/kandy.png')} style={styles.locationImg}>
          <Text style={styles.overlayText}>Kandy</Text>
        </ImageBackground>
        <ImageBackground source={require('../assets/colombo.png')} style={styles.locationImg}>
          <Text style={styles.overlayText}>Colombo</Text>
        </ImageBackground>
        <ImageBackground source={require('../assets/ella.png')} style={styles.locationImg}>
          <Text style={styles.overlayText}>Ella</Text>
        </ImageBackground>
      </ScrollView>
      </View>

      <Text style={styles.text}>Activities</Text>

      <View style={styles.carouselContainer}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        <ImageBackground source={require('../assets/adventure.jpg')} style={styles.locationImg}>
          <Text style={styles.overlayText}>Adventure</Text>
        </ImageBackground>
        <ImageBackground source={require('../assets/family.jpg')} style={styles.locationImg}>
          <Text style={styles.overlayText}>Family-Friendly</Text>
        </ImageBackground>
        <ImageBackground source={require('../assets/wildlife.jpg')} style={styles.locationImg}>
          <Text style={styles.overlayText}>Wild-Life</Text>
        </ImageBackground>
        <ImageBackground source={require('../assets/halfday.png')} style={styles.locationImg}>
          <Text style={styles.overlayText}>Photography</Text>
        </ImageBackground>
      </ScrollView>
      </View>

      <Text style={styles.text}>For You</Text>

    </View>
    
    
  );
}

export default Home

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  header:{
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
    width: '100%',
    height: 60,
    alignItems: 'flex-start', 
    justifyContent: 'center',
  },

  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    },

  titleLogo:{
    resizeMode: 'contain',
    width: 150,
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center', 
  },

  text: {
    fontSize: 19,
    color: 'gray',
    marginTop: 15,
    marginLeft: 7,
  },

  overlayText: {
  position: 'absolute',
  bottom: 10,
  left: 14,
  fontSize: 32,
  fontWeight: 'bold',
  color: '#FF8C00',
  },

  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxHeight: 185,
    width: '100%',
    marginTop: 8,
    borderRadius: 15,
  },

  locationImg: {
    width: 280,
    height: "auto",
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 15,
  },

});

