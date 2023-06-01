import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import CoinDetailScreen from './src/screens/CoinDetailScreen';

export default function App() {

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // console.log(imageError)
//require('./assets/bitcoin.png')
  return (
    <View style={styles.container}>
      {/* <HomeScreen /> */}
      <CoinDetailScreen />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
  }
});
