import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import Coin from '../../../assets/data/crypto.json'
import CoinDetailHeader from "./components/CoinDetailHeader";
import styles from "./styles";
import { AntDesign } from '@expo/vector-icons';
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';
import { useRoute } from "@react-navigation/native";
import { getCoinMarketChart, getDetailedCoinData } from "../../services/request";


const CoinDetailScreen = () => {
    // here i am destructuring twice because when you go to crypto.json there the image is a object of three data
    // const { image: { small },
    //     name,
    //     market_data: { market_cap_rank, current_price, price_change_percentage_24h },
    //     symbol,
    //     prices } = Coin

    const route = useRoute()

    // this will give a respective id when i tap on the coinItem ie coin by passing the coinId while tapping on that coin on HomeScreen
    const { params: { coinId } } = route
    // console.log(coinId)

    const [coinValue, setCoinValue] = useState("1")
    // const [usdValue, setUsdValue] = useState(current_price.usd.toString())
    // initially we are setting to empty string after get the data from coingecko we can set the actual value
    const [usdValue, setUsdValue] = useState("")

    const [coin, setCoin] = useState(null)
    const [loading, setLoading] = useState(false)
    const [coinMarketData, setCoinMarketData] = useState(null)

    const screenWidth = Dimensions.get('window').width

    // this fetchCoinData will get the coin information from the request.js file using coingecko api
    const fetchCoinData = async () => {
        // setLoading will be true when we start fetching data and false after fetching the data to indicate user the loading screen.
        setLoading(true)
        const fetchedCoinData = await getDetailedCoinData(coinId)
        const fetchedCoinMarketData = await getCoinMarketChart(coinId)
        setCoin(fetchedCoinData)
        setCoinMarketData(fetchedCoinMarketData)
        setUsdValue(fetchedCoinData.market_data.current_price.usd.toString())
        setLoading(false)
    }

    useEffect(() => {
        fetchCoinData()
    }, [])


    if (loading || !coin || !coinMarketData) {
        return <ActivityIndicator />
    }

    const { image: { small },
        id,
        name,
        market_data: { market_cap_rank, current_price, price_change_percentage_24h },
        symbol } = coin

    const { prices } = coinMarketData

    // while fetching data from api may be all data doesnot have price_change_percentage_24h if this is case then the app may crash
    const percentageColor = price_change_percentage_24h > 0 ? '#16c784' : '#ea3943' || 'white'

    // this will change the color of the chart accoding to the price (if it is greater it will show green and vice versa)
    const chartColor = current_price.usd > prices[0][1] ? '#16c784' : '#ea3943'

    // this will change the value of a formatCurrency according to movement of dot on graph
    const formatCurrency = (value) => {
        // marking it as a worklet indicates the value will change synchronously (this method will execute synchronously)
        'worklet';
        if (value === "") {
            return `$${current_price.usd.toFixed(2)}`
        }
        return `$${current_price.usd.toFixed(2)}`
    }

    const changeCoinValue = (value) => {
        console.log('coinValue')
        setCoinValue(value)
        // here we have or condition because if the value is an empty string then conveting it to float will result in NaN
        const floatValue = parseFloat(value.replace(',', '.')) || 0
        setUsdValue((floatValue * current_price.usd).toString())
    }

    const changeUsdValue = (value) => {
        console.log('usdValue')
        setUsdValue(value)
        // here we have or condition because if the value is an empty string then conveting it to float will result in NaN
        const floatValue = parseFloat(value.replace(',', '.')) || 0
        setCoinValue((floatValue / current_price.usd).toString())
    }

    // ([x, y]) => ({x, y})
    // (price) => ({x:price[0], y:price[1]})
    return (
        <View style={{ paddingHorizontal: 10 }}>
            <ChartPathProvider data={{ points: prices.map((price) => ({ x: price[0], y: price[1] })), smoothingStrategy: 'bezier' }}>
                <CoinDetailHeader image={small}
                    coinId={id}
                    name={name}
                    symbol={symbol}
                    marketCapRank={market_cap_rank} />
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        {/* ChartYLabel will display(change) a formatCurrency according to the chardot moves in the graph */}
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
                        <Text style={styles.priceChange}>{price_change_percentage_24h?.toFixed(2)}%</Text>
                    </View>
                </View>
                {/* wrapping the chart with view to show the blue dot on the graph  */}
                <View>
                    <ChartPath strokeWidth={2} height={screenWidth / 2} stroke={chartColor} width={screenWidth}
                    />
                    <ChartDot style={{ backgroundColor: chartColor }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>{symbol.toUpperCase()}</Text>
                        <TextInput style={styles.input}
                            value={coinValue}
                            keyboardType='numeric'
                            onChangeText={changeCoinValue} />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>USD</Text>
                        {/* here the initial value would be the current price of the bitcoin */}
                        <TextInput style={styles.input}
                            value={usdValue}
                            keyboardType='numeric'
                            onChangeText={changeUsdValue} />
                    </View>
                </View>
            </ChartPathProvider>
        </View>
    )
}

export default CoinDetailScreen