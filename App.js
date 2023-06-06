import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import CoinDetailScreen from './src/screens/CoinDetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import WatchListProvider from './src/Contexts/WatchListContext';

export default function App() {

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // console.log(imageError)
//require('./assets/bitcoin.png')
  return (
    <NavigationContainer theme={{
      colors: {
        background: '#121212'
      }
    }}>
      <WatchListProvider>
        <View style={styles.container}>
          {/* <HomeScreen /> */}
          {/* <CoinDetailScreen /> */}
          <Navigation />
          <StatusBar style="light" />
        </View>
      </WatchListProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
  }
});
