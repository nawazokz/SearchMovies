import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {styles} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {fallbackMoviesPoster, image185} from '../../api/MovieDb';

const {width: viewportWidth, height} = Dimensions.get('window');

const MovieList = ({title, data, hideSeeAll}) => {
  let movieName = 'Ant-man and the Wasp: Quantamania';
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row justify-between items-center mx-4">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}>
              <View className="space-y-1 mr-4">
                <Image
                  // source={require('../../assets/album-arts/solo.jpg')}
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviesPoster,
                  }}
                  className="rounded-3xl"
                  style={{
                    width: viewportWidth * 0.33,
                    height: height * 0.22,
                  }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + '...'
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
