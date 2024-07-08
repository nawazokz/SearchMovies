import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {styles} from '../theme';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import {fetchTrendingMovies, fetchUpcomingMovies} from '../../api/MovieDb';
const ios = Platform.OS === 'ios';
const Home = () => {
  const [trending, setTrending] = useState([]);
  const [upComing, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcoming(data.results);
    setLoading(false);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTopRated(data.results);
    setLoading(false);
  };
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          {trending.length > 0 && <TrendingMovies data={trending} />}
          <MovieList title="Upcomming" data={upComing} />
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default Home;
