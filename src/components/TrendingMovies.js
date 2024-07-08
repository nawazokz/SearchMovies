import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {image500} from '../../api/MovieDb';

const {width: viewportWidth, height} = Dimensions.get('window');

const TrendingMovies = ({data}) => {
  const navigation = useNavigation();
  const handleClick = item => {
    navigation.navigate('Movie', item);
  };
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-2">Trending</Text>
      <Carousel
        data={data}
        renderItem={({item}) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.8}
        itemWidth={viewportWidth * 0.62}
        sliderWidth={viewportWidth}
      />
    </View>
  );
};

export default TrendingMovies;

const MovieCard = ({item, handleClick}) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        // source={require('../../assets/album-arts/faded.jpg')}
        source={{uri: image500(item.poster_path)}}
        style={{
          width: viewportWidth * 0.6,
          height: height * 0.4,
        }}
      />
    </TouchableWithoutFeedback>
  );
};
