import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

const Wishlist = ({ navigation }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!auth.currentUser) return;

            try {
                const wishlistRef = collection(db, 'users', auth.currentUser.uid, 'wishlist');
                const querySnapshot = await getDocs(wishlistRef);
                const items = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setWishlistItems(items);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isFocused) {
            fetchWishlist();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Wishlist</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={wishlistItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
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
                    )}
                    ListEmptyComponent={<Text>Your wishlist is empty.</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FF8C00',
    },
    itemContainer: {
        marginBottom: 20,
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

export default Wishlist;
