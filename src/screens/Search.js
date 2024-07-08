import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import {debounce} from 'lodash';
import {
  fallbackMoviesPoster,
  fetchSearchMovies,
  image185,
} from '../../api/MovieDb';

const {width: viewportWidth, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const marginTop = ios ? '' : 'mt-3';
const Search = () => {
  const navigation = useNavigation();

  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  let movieName = 'Ant-man and the Wasp: Quantamania';
  const handleSearch = value => {
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchMovies({
        query: value,
        inclue_adult: false,
        language: 'en-US',
        page: '1',
      }).then(data => {
        setLoading(false);
        if (data && data.results) setResult(data.results);
      });
    } else {
      setLoading(false);
      setResult([]);
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 mt-4 flex-row justify-between border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={'white'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-2 bg-neutral-500">
          <XMarkIcon size={20} color="white" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : result.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          className="space-y-3">
          <Text className="text-white font-semibold ml-1">
            Results ({result.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {result.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push('Movie', item)}>
                  <View className="space-y-2 mb-4">
                    <Image
                      className=" rounded-3xl"
                      // source={require('../../assets/album-arts/solo.jpg')}
                      source={{
                        uri: image185(item.poster_path) || fallbackMoviesPoster,
                      }}
                      style={{
                        width: viewportWidth * 0.44,
                        height: height * 0.3,
                      }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {' '}
                      {item?.title?.length > 20
                        ? item?.title.slice(0, 20) + '...'
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/album-arts/bad-liar.jpg')}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;
