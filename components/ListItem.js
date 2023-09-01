import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import React from 'react';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('touched!', singleMedia.title);
        navigation.navigate('Single', singleMedia);
      }}
    >
      <View style={styles.textAndImage}>
        <Image
          style={styles.image}
          source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
        />
        <View style={styles.text}>
          <Text style={styles.title}>{singleMedia.title}</Text>
          <Text>{singleMedia.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: '100%',
    backgroundColor: 'lightgrey',
    alignSelf: 'flex-start',
  },
  textAndImage: {
    flex: 1,
    backgroundColor: 'lightgrey',
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  text: {
    padding: 20,
    width: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default ListItem;
