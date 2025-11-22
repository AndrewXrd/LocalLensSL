import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Home = ({ navigation }) => {
  const [forYouItems, setForYouItems] = useState([]);

  useEffect(() => {
    const fetchForYouItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'hosts'));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setForYouItems(items);
      } catch (error) {
        console.error('Error fetching For You items:', error);
      }
    };

    fetchForYouItems();
  }, []);

  const renderForYouItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('HostDetail', { host: item })}>
      <View style={styles.itemContainer}>
        {item.bannerPic && (
          <Image source={{ uri: item.bannerPic }} style={styles.banner} />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.experience}>{item.experienceName}</Text>
          <Text style={styles.location}>📍 {item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.header}>
        <LinearGradient
          colors={['#FF8C00', '#FFA500', '#FFD700']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}>
          <Image source={require('../assets/titleLogo.png')} style={styles.titleLogo} />
        </LinearGradient>
        <TouchableOpacity style={styles.searchIcon} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ width: '100%' }}>
        <Text style={styles.text}>Location</Text>

        <View style={styles.carouselContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryItems', { category: 'Kandy', type: 'location' })}>
              <ImageBackground source={require('../assets/kandy.png')} style={styles.locationImg}>
                <Text style={styles.overlayText}>Kandy</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryItems', { category: 'Colombo', type: 'location' })}>
              <ImageBackground source={require('../assets/colombo.png')} style={styles.locationImg}>
                <Text style={styles.overlayText}>Colombo</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryItems', { category: 'Ella', type: 'location' })}>
              <ImageBackground source={require('../assets/ella.png')} style={styles.locationImg}>
                <Text style={styles.overlayText}>Ella</Text>
              </ImageBackground>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <Text style={styles.text}>Activities</Text>

        <View style={styles.carouselContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryItems', { category: 'Adventure', type: 'activity' })}>
              <ImageBackground source={require('../assets/adventure.jpg')} style={styles.locationImg}>
                <Text style={styles.overlayText}>Adventure</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryItems', { category: 'Family-Friendly', type: 'activity' })}>
              <ImageBackground source={require('../assets/family.jpg')} style={styles.locationImg}>
                <Text style={styles.overlayText}>Family-Friendly</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryItems', { category: 'Wild-Life', type: 'activity' })}>
              <ImageBackground source={require('../assets/wildlife.jpg')} style={styles.locationImg}>
                <Text style={styles.overlayText}>Wild-Life</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryItems', { category: 'Photography', type: 'activity' })}>
              <ImageBackground source={require('../assets/halfday.png')} style={styles.locationImg}>
                <Text style={styles.overlayText}>Photography</Text>
              </ImageBackground>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <Text style={styles.text}>For You</Text>
        <View style={styles.forYouContainer}>
          {forYouItems.map((item) => (
            <View key={item.id} style={{ marginBottom: 10 }}>
              {renderForYouItem({ item })}
            </View>
          ))}
        </View>
      </ScrollView>
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

  header: {
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

  titleLogo: {
    resizeMode: 'contain',
    width: 150,
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  searchIcon: {
    position: 'absolute',
    top: 18,
    right: 15,
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
    height: 180,
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },

  forYouContainer: {
    padding: 10,
  },
  itemContainer: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  experience: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#FF8C00',
  },

});

