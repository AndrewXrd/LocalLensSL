import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';

const CategoryItems = ({ route, navigation }) => {
    const { category, type } = route.params; // type: 'location' or 'activity'
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const hostsRef = collection(db, 'hosts');
                let q;

                if (type === 'location') {
                    q = query(hostsRef, where('location', '==', category));
                } else {
                    q = query(hostsRef, where('category', '==', category));
                }

                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [category, type]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{category}</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={items}
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
                    ListEmptyComponent={<Text>No items found for this category.</Text>}
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

export default CategoryItems;
