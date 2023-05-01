import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import Home from '../../assets/home-oncocheck.png';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MainPage() {
    const navigation = useNavigation();
    const [input, setInput] = useState('');

    return (
        <LinearGradient colors={['#69FFD2', '#3E4EDD']} style={styles.screenMain}>
        <View style={styles.blocoButtons}>
            <TouchableOpacity style={styles.blocosArrow} onPress={() => navigation.navigate('Login')}>
                 <FontAwesomeIcon icon={faArrowLeft} size={30}/>
             </TouchableOpacity>
             <TouchableOpacity style={styles.blocosArrow} onPress={() => navigation.navigate('Favoritos')}>
                 <FontAwesomeIcon icon={faStar} size={30}/>
             </TouchableOpacity>
        </View>
        <View
            style={{
            ...styles.logoContainer,
            }}
        >
            <Text style={styles.titleHome}>Buscar exames de acordo com a parte do corpo relacionada</Text>
            <Image source={Home} style={styles.imageHome}/>
        </View>

        <View style={{ ...styles.contentContainer }} >

             <View style={styles.boxPesquisaHome}>
             <Text style={styles.titlePesquisaHome}>Ou digite aqui sua suspeita</Text>
             <TextInput
                 style={styles.pesquisaHome}
                 placeholder='Pesquise aqui'
                 onChangeText={(text) => setInput(text)}
             />
             <TouchableOpacity style={styles.buttonPesquisaHome} onPress={() => navigation.navigate('Pesquisa')}>
                 <Text style={styles.buttonPesquisaHomeText}>Consultar</Text>
             </TouchableOpacity>
             </View>

        </View>

        </LinearGradient >
    );
}

const styles = StyleSheet.create({
    screenMain: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 28,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 32,
        paddingHorizontal: 8,
        borderWidth: 0,
        borderTopStartRadius: 32,
        borderTopEndRadius: 32,
        width: '100%',
    },
    titleHome: {
        fontWeight: '600',
        fontSize: 30,
        color: '#FFFFFF',
        margin: 0,
        textAlign: 'center',
    },
    blocoButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '80%',
      paddingTop: 40,
    },
    blocosArrow: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        fontSize: 30,
    },
    imageHome: {
      width: 220,
      height: 300,
    },
    boxPesquisaHome: {
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      width: '93%',
      height: '80%',
      padding: 10,
      borderRadius: 20,
      justifyContent: 'space-between',
    },
    titlePesquisaHome: {
      fontWeight: '500',
      fontSize: 16,
      color: '#666666',
    },
    pesquisaHome: {
      backgroundColor: '#F6F6F6',
      borderColor: '#E8E8E8',
      borderWidth: 1,
      borderRadius: 8,
      height: 50,
      margin: 10,
      paddingHorizontal: 10,
    },
    buttonPesquisaHome: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#5162FA',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderRadius: 8,
    },
    buttonPesquisaHomeText: {
        fontWeight: '600',
        fontSize: 16,
        color: '#FFFFFF',
    },
  });