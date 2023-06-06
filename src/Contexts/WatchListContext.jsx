import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchListContext = createContext()

export const useWatchList = () => useContext(WatchListContext)

const WatchListProvider = ({children}) => {
    const [watchListCoinsIds, setWatchListCoinsIds] = useState([])

    const getWatchListData = async () => {
        // this will get the data with the id of @watchlist_coins
        try{
            const jsonValue = await AsyncStorage.getItem("@watchlist_coins")
            setWatchListCoinsIds(jsonValue != null ? JSON.parse(jsonValue) : []) 
        } catch(e) {
            console.log(e)
        }
    } 

    useEffect(() => {
        getWatchListData()
    }, [])

    const storeWatchLIstCoinId = async (coinId) => {
        // this is used to store data in async storage and async storage will only store the string thats why we are stringfy it.
        try {
            const newWatchList = [...watchListCoinsIds, coinId]
            const jsonValue = JSON.stringify(newWatchList)
            await AsyncStorage.setItem('@watchlist_coins', jsonValue)
            setWatchListCoinsIds(newWatchList)
        } catch (e) {
            console.log(e)
        }
    }

    const removeWatchListCoinId = async (coinId) => {
        try {
            const newWatchList = watchListCoinsIds.filter((coinIdValue) => coinIdValue !== coinId)
            const jsonValue = JSON.stringify(newWatchList)
            await AsyncStorage.setItem('@watchlist_coins', jsonValue)
            setWatchListCoinsIds(newWatchList)
        } catch (e) {
            console.log(e)
        }

    }
    return (
    <WatchListContext.Provider value={{watchListCoinsIds, storeWatchLIstCoinId, removeWatchListCoinId}}>
        {children}
    </WatchListContext.Provider>
    )
}

export default WatchListProvider