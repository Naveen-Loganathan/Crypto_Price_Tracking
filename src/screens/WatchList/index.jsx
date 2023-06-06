import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useWatchList } from "../../Contexts/WatchListContext";
import CoinItem from "../../components/CoinItem";
import { getWatchedListedCoin } from "../../services/request";

const WatchListScreen = () => {
    const { watchListCoinsIds } = useWatchList()
    console.log(watchListCoinsIds)

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)

    // here we need to add %2c to each element of our array because this is how in the http reques to designed to separate coinids
    const transformCoinIds = () => watchListCoinsIds.join('%2C')

    const fetchWatchedListedCoins = async () => {
        console.log(loading)
        if(loading) {
            return
        }
        setLoading(true)
        const watchListedCoinsData = await getWatchedListedCoin(1, transformCoinIds())
        console.log(watchListCoinsIds)
        // setCoins((existingCoins) => [...existingCoins, ...watchListedCoinsData])
        setCoins(watchListedCoinsData)
        setLoading(false)
    }

    useEffect(() => {
        fetchWatchedListedCoins()
    },[watchListCoinsIds])    


    return (
        <FlatList
        data={coins}
        renderItem={({item}) => <CoinItem marketCoin={item} />}
        refreshControl={
            <RefreshControl
            refreshing={loading}
            tintColor='white'
            onRefresh={fetchWatchedListedCoins} />
        } />
    )
}

export default WatchListScreen