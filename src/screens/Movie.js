import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles, theme} from '../theme';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {
  fallbackMoviesPoster,
  fetchMovieCridits,
  fetchMovieDetail,
  fetchSimilarMovies,
  image500,
} from '../../api/MovieDb';

const {width: viewportWidth, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const marginTop = ios ? '' : 'mt-3';

const Movie = () => {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState({});

  let movieName = 'Ant-man and the Wasp: Quantamania';

  useEffect(() => {
    setLoading(true);
    getMovieDetail(item.id);
    getMoviesCredits(item.id);
    getSimilarMovies(item.id);
    console.log('params = ', item);
  }, [item]);

  const getMovieDetail = async id => {
    const data = await fetchMovieDetail(id);
    if (data) setMovies(data);
    setLoading(false);
  };
  const getMoviesCredits = async id => {
    const data = await fetchMovieCridits(id);
    if (data && data.cast) setCast(data.cast);
    setLoading(false);
  };
  const getSimilarMovies = async id => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
    setLoading(false);
  };
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 80}}
      className="flex-1 bg-neutral-900">
      <View className="w-full">
        <SafeAreaView
          className={
            'absolute z-20 w-full justify-between flex-row items-center px-4' +
            marginTop
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
            <HeartIcon
              size={35}
              color={isFavorite ? theme.background : 'white'}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require('../../assets/album-arts/death-bed.jpg')}
              source={{
                uri: image500(movies.poster_path) || fallbackMoviesPoster,
              }}
              style={{
                width: viewportWidth,
                height: height * 0.55,
              }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              className="absolute bottom-0"
              style={{width: viewportWidth, height: height * 0.4}}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
            />
          </View>
        )}
      </View>
      <View style={{marginTop: -(height * 0.09)}} className="space-y-3">
        <Text className="text-white text-3xl text-center font-bold tracking-wider">
          {movies?.title}
        </Text>
        {movies?.id ? (
          <Text className="text-neutral-400 text-center font-semibold">
            {movies?.status} . {movies?.release_date.split('-')[0]} .{' '}
            {movies?.runtime} min
          </Text>
        ) : null}
      </View>
      <View className="flex-row justify-center mx-4 space-x-2">
        {movies?.genres?.map((genre, index) => {
          let showDot = index + 1 != movies?.genres?.length;
          return (
            <Text
              key={index}
              className="text-neutral-400 text-center font-semibold">
              {genre?.name} {showDot ? '.' : null}
            </Text>
          );
        })}
        {/* <Text className="text-neutral-400 text-center font-semibold">
          Action .
        </Text>
        <Text className="text-neutral-400 text-center font-semibold">
          Thrill .
        </Text>
        <Text className="text-neutral-400 text-center font-semibold">
          Comedy .
        </Text> */}
      </View>
      <Text className="text-neutral-400 mx-4 tracking-wide">
        {movies?.overview}
      </Text>
      {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}
      {similarMovies.length > 0 && (
        <MovieList
          title="Similer Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
};

export default Movie;
