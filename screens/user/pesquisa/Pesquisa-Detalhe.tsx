import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
// import Cerebro from '../../../assets/cerebro.png'
import config from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ExamDetailsParams {
  id: number
}

interface Exam {
  id: number
  name: string
  description: string
}

export default function PesquisaDetalhe() {
  const navigation = useNavigation();
  const route = useRoute()

  const [examId, setExamId] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  const [examDetails, setExamDetails] = useState({} as Exam)

  const loadExamDetails = async () => {
    const responseRaw = await fetch(config.apiUrl + '/exams/' + examId)

    const response = await responseRaw.json()

    setExamDetails(response.data)
  }

  const getFavoritesFromCache = async () => {
    const cachedFavoritesExamsRaw = await AsyncStorage.getItem('@favorites')

    if (!cachedFavoritesExamsRaw) {
      return [] as number[]
      // Seria aqui que carregariamos da API os exames mais recentes, mas...
    } else {
      const cachedFavoritesExams =
        JSON.parse(cachedFavoritesExamsRaw) as number[]

      console.log(isFavorited, cachedFavoritesExams)
      return cachedFavoritesExams
    }
  }

  const checkIfIsFavorited = async () => {
    const favorites = await getFavoritesFromCache()

    return favorites.includes(examDetails.id)
  }

  const favoriteExam = async () => {
    const cachedFavoritesExams = await getFavoritesFromCache()

    if (!cachedFavoritesExams.includes(examDetails.id)) {
      cachedFavoritesExams.push(examDetails.id)

      await AsyncStorage.setItem(
        '@favorites',
        JSON.stringify(cachedFavoritesExams)
      )

      setIsFavorited(true)
    }
  }

  useEffect(() => {
    setExamId((route.params as ExamDetailsParams).id)
  }, [])

  useEffect(() => {
    loadExamDetails()
  }, [examId])

  useEffect(() => {
    async function checkFavorited() {
      setIsFavorited(await checkIfIsFavorited())
    }

    checkFavorited()
  }, [examDetails])
  // <Image source={Cerebro} style={styles.imageDetalhe} />

  return (
    <View style={styles.screenDetalhe}>
      <View style={styles.blocoButtons}>
        <TouchableOpacity
          style={styles.blocosArrow}
          onPress={navigation.goBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.fullLogoContainer}>
        {examDetails && (
          <Fragment>

            <View style={{ ...styles.logoContainer, }} >
              <Text style={styles.titleDetalhe}>
                {examDetails.name}
              </Text>
            </View>
            <View style={styles.subLogoContainer}>
              <TouchableOpacity style={styles.blocosArrow} onPress={favoriteExam}>
                <Text
                  style={isFavorited
                    ? styles.subTitleDetalheFavoritado
                    : styles.subTitleDetalhe
                  }>
                  Favoritar
                </Text>
                <FontAwesomeIcon
                  icon={faStar}
                  size={30}
                  color={isFavorited ? "#5162fa" : "#000"}
                />
              </TouchableOpacity>
            </View>
          </Fragment>
        )}
      </View>
      <View style={{ ...styles.contentContainer }} >
        {examDetails && (
          <ScrollView>
            <Text>
              {examDetails.description}
            </Text>
          </ScrollView>
        )}
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonVermelho}
          onPress={() => navigation.navigate('Inconsistencia')}
        >
          <Text style={styles.textButton}>Relatar inconsistência</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  screenDetalhe: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  fullLogoContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 28,
    paddingBottom: 28,
    width: '100%'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleDetalhe: {
    fontWeight: '600',
    fontSize: 30,
    textAlign: 'center',
  },
  subTitleDetalhe: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  subTitleDetalheFavoritado: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    color: '#5162fa'
  },
  textDetalhe: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'justify',
  },
  blocoButtons: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '80%',
    paddingTop: 40,
  },
  blocosArrow: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageDetalhe: {
    width: 90,
    height: 65,
  },
  buttonVermelho: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 20,
    backgroundColor: '#F61515',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 8,
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
  textButton: {
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
});