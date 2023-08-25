import {StatusBar} from 'expo-status-bar';
import {StyleSheet, SafeAreaView} from 'react-native';
import List from './components/List';
const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
})

export default App;
