import React from 'react';
import PropTypes from 'prop-types';
import {Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import {mediaUrl} from '../utils/app-config';
import {View} from 'react-native-web';

const Single = ({route, navigation}) => {
  const singleMedia = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textAndImage}>
        <Image
          style={styles.image}
          source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
        />
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
        <Text>File ID: {singleMedia.file_id}</Text>
        <Text>User ID: {singleMedia.user_id}</Text>
        <Text>Time added: {singleMedia.time_added}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    paddingLeft: '100%',
    paddingTop: '100%',
    backgroundColor: 'lightgrey',
  },
  textAndImage: {
    width: '100%',
    flex: 1,
    backgroundColor: 'lightgrey',
    padding: 20,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
  },
  text: {
    padding: 20,
    width: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
