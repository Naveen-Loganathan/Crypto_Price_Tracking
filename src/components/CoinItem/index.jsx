import React from "react";
import { Text, View, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";



const CoinItem = ({ marketCoin }) => {

  // console.log(prop)
  const { name, market_cap_rank, current_price, price_change_percentage_24h, symbol, market_cap, image } = marketCoin

  // it is used to change the color of percentage icon according to percentage value
  const percentageColor = price_change_percentage_24h > 0 ? '#ea3943' : '#16c784'

  // this function used to reduce the market_cap price
  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1_000_000_000_000) {
      return `${Math.floor(marketCap / 1_000_000_000_000)} T`
    } if (marketCap > 1_000_000_000) {
      return `${Math.floor(marketCap / 1_000_000_000)} B`
    } if (marketCap > 1_000_000) {
      return `${Math.floor(marketCap / 1_000_000)} M`
    } if (marketCap > 1_000) {
      return `${Math.floor(marketCap / 1_000)} K`
    }
    return marketCap
  }

  return (
    <View style={styles.coinContainer}>
      {/* <Image source={{ uri: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'}}  */}
      <Image source={{ uri: image }}
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
          <Text style={{color: percentageColor}}>{price_change_percentage_24h.toFixed(2)}%</Text>
        </View>
      </View>
      {/* this marginLeft auto will automativally set the view to the left corner */}
      <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
        <Text style={styles.title}>{current_price}</Text>
        <Text style={{ color: 'white' }}>MCap {normalizeMarketCap(market_cap)}</Text>
      </View>
    </View>
  )
}

export default CoinItem