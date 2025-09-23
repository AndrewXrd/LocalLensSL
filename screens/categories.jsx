import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';


export default function Categories(){

    return (
        
        <View style={styles.container}>
        <ImageBackground source={require('../assets/location_bg_2.jpg')} style={styles.bgImage}>
        <View style={styles.imageContainer}>
            <Text style={styles.titleText}>Select Category</Text>
            <ScrollView>
            <TouchableOpacity style={{zIndex: 1, elevation: 1,}}>
            <View>
            <Image source={require('../assets/wildlife.jpg')} style={styles.imageTop}/>
            <Text style={styles.text}>Wild Life</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{zIndex: 1, elevation: 1,}}>
            <View>
            <Image source={require('../assets/adventure.jpg')} style={styles.image}/>
            <Text style={styles.text}>Adventure</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{zIndex: 1, elevation: 1,}}>
            <View>
            <Image source={require('../assets/family.jpg')} style={styles.image}/>
            <Text style={styles.text}>Family-Friendly</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{zIndex: 1, elevation: 1,}}>
            <View>
            <Image source={require('../assets/halfday.png')} style={styles.imageBottom}/>
            <Text style={styles.text}>Half-Day</Text>
            </View>
            </TouchableOpacity>
             </ScrollView>
        </View>
        </ImageBackground>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'top',
    },
    imageContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',  
        gap: 15,
        marginTop: 20,
    },
    imageTop: {
        marginTop: '1',
        width: '350',
        height: '220',
        borderRadius: 15,
    },
    image: {
        marginTop: '10',
        width: '350',
        height: '220',
        borderRadius: 15,
    },
    imageBottom: {
        marginBottom: '10',
        marginTop : '10',
        width: '350',
        height: '220',
        borderRadius: 15,
    },
    text: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    titleText:{
        marginTop: 40,
        marginBottom: 10,
        textAlign: 'center',
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },

})
