import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import styles from "./styles";

const CoinDetailHeader = (props) => {
    const { image, name, symbol, marketCapRank} = props
    return (
        <View style={styles.headerContainer}>
            <Ionicons name="chevron-back-sharp" size={30} color="white" />
            <View style={styles.tickerContainer}>
                <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
                <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
                <View style={styles.rankContainer}>
                    <Text style={styles.rankTitle}>#{marketCapRank}</Text>
                </View>
            </View>
            <EvilIcons name="user" size={30} color="white" />
        </View>
    )
}

export default CoinDetailHeader