import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db, auth } from '../firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

const HostDetail = ({ route, navigation }) => {
  const { host } = route.params;
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!auth.currentUser) return;
      const docRef = doc(db, 'users', auth.currentUser.uid, 'wishlist', host.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsWishlisted(true);
      }
    };
    checkWishlistStatus();
  }, [host.id]);

  const toggleWishlist = async () => {
    if (!auth.currentUser) {
      alert('Please login to add to wishlist');
      return;
    }

    const docRef = doc(db, 'users', auth.currentUser.uid, 'wishlist', host.id);

    if (isWishlisted) {
      await deleteDoc(docRef);
      setIsWishlisted(false);
    } else {
      await setDoc(docRef, host);
      setIsWishlisted(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <LinearGradient
          colors={['#FF8C00', '#FFA500', '#FFD700']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Image
            source={require('../assets/titleLogo.png')}
            style={styles.titleLogo}
          />
        </LinearGradient>
      </View>

      <ScrollView style={{ width: '100%' }}>
        <View style={styles.banner}>
          {host?.bannerPic ? (
            <Image
              source={{ uri: host.bannerPic }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          ) : (
            <Text style={{ color: 'gray' }}>No Banner Image</Text>
          )}
          <TouchableOpacity style={styles.wishlistIcon} onPress={toggleWishlist}>
            <Ionicons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={24}
              color={isWishlisted ? 'red' : 'white'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dp}>
          {host?.profilePic ? (
            <Image
              source={{ uri: host.profilePic }}
              style={{ width: '100%', height: '100%', borderRadius: 60 }}
              resizeMode="cover"
            />
          ) : (
            <Text style={{ color: 'gray' }}>No Profile Photo</Text>
          )}
        </View>

        <View style={styles.detailsOne}>
          <Text style={styles.textEx}>
            {host?.experienceName || 'Experience Name'}
          </Text>
          <Text style={styles.textHost}>
            {host?.name || 'Host Name'}
          </Text>
        </View>

        <View style={styles.detailsTwo}>
          <Text style={styles.textDetails}>
            📍 {host?.location || 'Location'}
          </Text>
          <Text style={styles.textDetails}>
            🏕️ {host?.category || 'Category'}
          </Text>
          <Text style={styles.textDetails}>
            📞 {host?.contactInfo || 'Contact Info'}
          </Text>
          <Text style={styles.textDetails}>
            👤 {host?.about || 'About'}
          </Text>
        </View>

        <View style={styles.gallery}>
          <Text style={styles.galleryTitle}>Gallery</Text>
          {host?.galleryPics && host.galleryPics.length > 0 ? (
            host.galleryPics.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={styles.galleryPic}
                resizeMode="cover"
              />
            ))
          ) : (
            <Text style={styles.galleryPic}>No Gallery Images</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HostDetail;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  editLogo: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  banner: {
    backgroundColor: '#d9d7d7ff',
    height: 200,
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dp: {
    backgroundColor: '#d9d7d7ff',
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
    position: 'absolute',
    left: 8,
    top: 150,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  detailsOne: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: 5,
    marginTop: 65,
  },
  detailsTwo: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    margin: 5,
    marginTop: 26,
    marginBottom: 15,
  },
  textEx: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 2,
  },
  textHost: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'gray',
  },
  textDetails: {
    fontSize: 18,
    color: 'gray',
    marginLeft: 2,
    marginBottom: 18,
  },
  gallery: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 10,
  },
  galleryPic: {
    fontSize: 16,
    color: 'gray',
    width: '100%',
    height: 200,
    textAlign: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#d9d7d7ff',
  },
  wishlistIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
    padding: 4,
  },
});