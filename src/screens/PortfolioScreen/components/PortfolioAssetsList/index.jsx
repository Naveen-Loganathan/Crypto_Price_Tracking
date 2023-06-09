import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import PortfolioAssetItem from "../PortfolioAssetItem";
import { useNavigation } from "@react-navigation/native";



const PortfolioAssetsList = () => {
    const navigation = useNavigation()

    return (
        <View>
            <FlatList
                data={[{id: 'bitcoin'}]}
                renderItem={(item) => <PortfolioAssetItem assetItem={item} />}
                ListHeaderComponent={
                    <>
                    <View style={styles.balanceContainer}>
                        <View>
                        <Text style={styles.currentBalance}>Current Balance</Text>
                        <Text style={styles.currentBalanceValue}>$20000</Text>
                        <Text style={styles.valueChange}>$1000 (All Time)</Text>
                        </View>
                        <View style={styles.priceChangePercentageContainer}>
                            <AntDesign name={"caretup"}
                                size={13}
                                color='white'
                                style={{ alignSelf: 'center', marginRight: 5 }}
                            />
                            <Text style={styles.percentageChange}>1.2%</Text>
                        </View>
                        </View>
                        <View>
                            <Text style={styles.assetsLabel}>Your Assets</Text>
                        </View>
                    </>
                }
                ListFooterComponent={
                    <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate("AddNewAssetScreen")}>
                        <Text style={styles.buttonText}>Add New Asset</Text>
                    </Pressable>
                }
            />
        </View>
    )
}

export default PortfolioAssetsList