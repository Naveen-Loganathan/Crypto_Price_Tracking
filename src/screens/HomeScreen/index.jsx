import React, { useEffect, useState } from 'react';
import  {FlatList, RefreshControl } from 'react-native';
import cryptocurrencies from '../../../assets/data/cryptocurrencies.json'
import CoinItem from '../../components/CoinItem';
import { getMarketData } from '../../services/request';

const HomeScreen = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
     
    const fetchCoins = async (pageNumber) => {
        if(loading) {
            return
        }
        setLoading(true)
        const coinsData = await getMarketData(pageNumber)
        // setCoins((existingCoins) => (existingCoins.concat(coinsData)))
        // here we are adding the new set of coin to the existing coin array
        setCoins((existingCoins) => [...existingCoins, ...coinsData])
        // setCoins(coinsData)
        setLoading(false)
    }

    // referesh the flatlist data
    const refetchCoins = async () => {
        if(loading) {
            return
        }
        setLoading(true)
        const coinsData = await getMarketData()
        setCoins(coinsData)
        setLoading(false)
    }

    useEffect(() => {
        fetchCoins()
    }, [])

    return (
        <FlatList
        //  data={cryptocurrencies} 
        //now passing the data fetched by api
        data={coins}
        renderItem={({item}) => <CoinItem marketCoin={item} />}
        refreshControl={
            <RefreshControl 
            refreshing={loading}
            tintColor={'white'}
            onRefresh={refetchCoins}/>
        }
        // here when the end reached we are fetching the new data byb using pageNumber from Coingecko api
        onEndReached={() => fetchCoins((coins.length / 50) + 1)}
        />
    )
}

export default HomeScreen