import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons, EvilIcons, FontAwesome } from '@expo/vector-icons';
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useWatchList } from "../../../../Contexts/WatchListContext";

const CoinDetailHeader = (props) => {
    const { coinId, image, name, symbol, marketCapRank} = props

    const navigation = useNavigation()

    // by this line we can access the value that is passed by the context
    const { watchListCoinsIds, storeWatchLIstCoinId, removeWatchListCoinId } = useWatchList()

    /// this will check wheather the particular coin is in watchlist or not
    const checkIfCoinisWatchListed = () =>
    watchListCoinsIds.some((coinIdValue) => coinIdValue === coinId)

    const handleWatchListCoin = () => {
        if(checkIfCoinisWatchListed()) {
            return removeWatchListCoinId(coinId)    
        }
        console.log('COinId', coinId)
        return storeWatchLIstCoinId(coinId)
    }    
    return (
        <View style={styles.headerContainer}>
            <Ionicons name="chevron-back-sharp" size={30} color="white" onPress={() => navigation.goBack()} />
            <View style={styles.tickerContainer}>
                <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
                <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
                <View style={styles.rankContainer}>
                    <Text style={styles.rankTitle}>#{marketCapRank}</Text>
                </View>
            </View>
            <FontAwesome name={checkIfCoinisWatchListed() ? "star" : "star-o"} 
            size={30} 
            color={checkIfCoinisWatchListed() ? '#FFBF00' : 'white'} 
            onPress={handleWatchListCoin}/>
        </View>
    )
}

export default CoinDetailHeader