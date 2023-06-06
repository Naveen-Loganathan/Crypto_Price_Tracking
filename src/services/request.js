import axios from "axios";

// this function will get the coin detail from the coingecko with the respectivre id
export const getDetailedCoinData = async (coinId) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false` )
        return response.data
    } catch(e) {
        console.log(e)
    } 
}

// this function will get the coin detail from the coingecko with the respectivre id for details of charts
export const getCoinMarketChart = async (coinId) => {
    try{
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=hourly`)
        return response.data
    } catch(e) {
        console.log(e)
    }
}

// this functio is used to fetch the coin list we want to show in homescreen
export const getMarketData = async (pageNumber = 1) => {
    try{
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h&locale=en`)
        return response.data
    } catch(e) {
        console.log(e)
    }
}

export const getWatchedListedCoin = async (pageNumber = 1, coinIds) => {
    try{
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h&locale=en`)
        return response.data
    } catch(e) {
        console.log(e)
    }
}