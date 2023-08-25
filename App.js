import {StatusBar} from 'expo-status-bar';
import {StyleSheet, SafeAreaView, View, Image, TouchableOpacity, Button, Text} from 'react-native';
import List from './components/List';
import {Moon} from "react-native-feather";

const toggleDarkMode = () => {
  console.log('gaga');
}

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.topView}>

          <TouchableOpacity>
            <Moon style={styles.darkMode} width={50} height={50} stroke="white"  />
          </TouchableOpacity>
          <Text style={styles.headerText}>Homeless Cats</Text>
        </View>
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    position: 'realtive',
    backgroundColor: '#96C291',
  },
  darkMode: {
    alignSelf: 'flex-end',
    margin: 30,
  },
  topView: {
    height: 200,
    width: '100%',
    backgroundColor: '#FFDBAA',
  },
  headerText: {
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 40,
    backgroundColor: '#FFB7B7',
    
  },
})

export default App;
