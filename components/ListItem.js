import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <TouchableOpacity>

      <View style={styles.textAndImage}>
        <Image
          style={styles.image}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />
        <View style={styles.text}>
          <Text style={styles.title}>{props.singleMedia.title}</Text>
          <Text>{props.singleMedia.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: '100%',
    backgroundColor: '#FFDBAA',
    alignSelf: 'flex-start',
    borderRadius: 50,
  },
  textAndImage: {
    flex: 1,
    backgroundColor: '#FFDBAA', padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  text: {
    padding: 20,
    width: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
export default ListItem;