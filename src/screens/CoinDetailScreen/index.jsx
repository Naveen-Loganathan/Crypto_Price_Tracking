import React from "react";
import { View, Text, Dimensions } from "react-native";
import Coin from '../../../assets/data/crypto.json'
import CoinDetailHeader from "./components/CoinDetailHeader";
import styles from "./styles";
import { AntDesign } from '@expo/vector-icons';
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';



const CoinDetailScreen = () => {
    // here i am destructuring twice because when you go to crypto.json there the image is a object of three data
    const { image: { small },
        name,
        market_data: { market_cap_rank, current_price, price_change_percentage_24h },
        symbol,
        prices } = Coin

    const screenWidth = Dimensions.get('window').width
    const percentageColor = price_change_percentage_24h > 0 ? '#16c784' : '#ea3943'

    const formatCurrency = (value) => {
        'worklet';
        if (value === "") {
            return `$${current_price.usd.toFixed(2)}`
        }
        return `$${current_price.usd.toFixed(2)}`
    }

    // ([x, y]) => ({x, y})
    // (price) => ({x:price[0], y:price[1]})
    return (
        <View style={{ paddingHorizontal: 10 }}>
            <ChartPathProvider data={{ points: prices.map((price) => ({ x: price[0], y: price[1] })), smoothingStrategy: 'bezier' }}>
                <CoinDetailHeader image={small}
                    name={name}
                    symbol={symbol}
                    marketCapRank={market_cap_rank} />
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <ChartYLabel
                            format={formatCurrency}
                            style={styles.currentPrice} />
                        {/* <Text style={styles.currentPrice}>${current_price.usd}</Text> */}
                    </View>
                    <View style={{ backgroundColor: percentageColor, paddingHorizontal: 3, paddingVertical: 8, borderRadius: 5, flexDirection: "row" }}>
                        <AntDesign name={price_change_percentage_24h > 0 ? "caretup" : "caretdown"}
                            size={13}
                            color='white'
                            style={{ alignSelf: 'center', marginRight: 5 }} />
                        <Text style={styles.priceChange}>{price_change_percentage_24h.toFixed(2)}%</Text>
                    </View>
                </View>
                {/* wrapping the chart with view to show the blue dot on the graph  */}
                <View>
                    <ChartPath height={screenWidth / 2} stroke="yellow" width={screenWidth}
                     />
                    <ChartDot style={{ backgroundColor: 'blue' }} />
                </View>
            </ChartPathProvider>
        </View>
    )
}

export default CoinDetailScreen