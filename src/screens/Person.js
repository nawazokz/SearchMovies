import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HeartIcon} from 'react-native-heroicons/solid';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from '../theme';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {
  fallbackPersonPoster,
  fetchPersonDetail,
  fetchPersonMovies,
  image342,
} from '../../api/MovieDb';

const {width: viewportWidth, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'mt-3';
const Person = () => {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false);
  const [personMovie, setPersonMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState({});
  useEffect(() => {
    setLoading(true);
    getPersonDetail(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetail = async id => {
    const data = await fetchPersonDetail(id);
    if (data) setPerson(data);
    setLoading(false);
  };
  const getPersonMovies = async id => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovie(data.cast);
    setLoading(false);
  };
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{paddingBottom: 20}}>
      <SafeAreaView
        className={
          ' z-20 w-full justify-between flex-row items-center px-4' +
          verticalMargin
        }>
        <TouchableOpacity
          style={styles.background}
          className="rounded-xl p-2"
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={20} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-xl p-2"
          onPress={() => toggleFavorite(!isFavorite)}>
          <HeartIcon size={35} color={isFavorite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: {width: 0, height: 5},
              shadowOpacity: 1,
            }}>
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                // source={require('../../assets/album-arts/hate-me.jpg')}
                source={{
                  uri: image342(person.profile_path) || fallbackPersonPoster,
                }}
                style={{
                  width: viewportWidth * 0.74,
                  height: height * 0.43,
                }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-white text-3xl text-center font-bold ">
              {person?.name}
            </Text>
            <Text className="text-neutral-400 text-center ">
              {person?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full border-neutral-500">
            <View className=" items-center border-r-neutral-400 border-r-2 px-2">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 font-sm">
                {person?.gender === 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View className=" items-center border-r-neutral-400 border-r-2 px-2">
              <Text className="text-white font-semibold">BirthDay</Text>
              <Text className="text-neutral-300 font-sm">
                {person?.birthday}
              </Text>
            </View>
            <View className=" items-center border-r-neutral-400 border-r-2 px-2">
              <Text className="text-white font-semibold">Known For</Text>
              <Text className="text-neutral-300 font-sm">
                {person.known_for_department}
              </Text>
            </View>
            <View className=" items-center px-2">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 font-sm">
                {person.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography || 'N/A'}
            </Text>
          </View>
          <MovieList data={personMovie} title={'Movies'} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
};

export default Person;
