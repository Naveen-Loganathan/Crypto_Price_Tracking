import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";



const CoinItem = ({ marketCoin }) => {

  // console.log(prop)
  const { id, name, market_cap_rank, current_price, price_change_percentage_24h, symbol, market_cap, image } = marketCoin

  // it is used to change the color of percentage icon according to percentage value
      // while fetching data from api may be all data doesnot have price_change_percentage_24h if this is case then the app may crash ie adding or comndition to white

  const percentageColor = price_change_percentage_24h > 0 ? '#ea3943' : '#16c784' || 'white'

  // this function used to reduce the market_cap price
  const normalizeMarketCap = (marketCap) => {
    // 1e12 = 1_000_000_000_000 trillion
    if (marketCap > 1e12) {
      return `${Math.floor(marketCap / 1e12)} T`
    } if (marketCap > 1e9) {
      return `${Math.floor(marketCap / 1e9)} B`
    } if (marketCap > 1e6) {
      return `${Math.floor(marketCap / 1e6)} M`
    } if (marketCap > 1e3) {
      return `${Math.floor(marketCap / 1e3)} K`
    }
    return marketCap
  }

  const navigation = useNavigation()

  return (
    <Pressable style={styles.coinContainer} onPress={() => navigation.navigate('CoinDetailScreen', {coinId: id})}>
      {/* <Image source={{ uri: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'}}  */}
        <Image source={{ uri: image}}
        // onError={handleImageError}
        style={styles.image} />
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          {/* the below icon will change according to percentage price */}
          <AntDesign name={price_change_percentage_24h > 0 ? "caretdown" : "caretup"}
            size={13}
            color={percentageColor}
            style={{ alignSelf: 'center', marginRight: 5 }} />
          <Text style={{color: percentageColor}}>{price_change_percentage_24h?.toFixed(2)}%</Text>
        </View>
      </View>
      {/* this marginLeft auto will automativally set the view to the left corner */}
      <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
        <Text style={styles.title}>{current_price}</Text>
        <Text style={{ color: 'white' }}>MCap {normalizeMarketCap(market_cap)}</Text>
      </View>
    </Pressable>
  )
}

export default CoinItem