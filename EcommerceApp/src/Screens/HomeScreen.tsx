import {View, Text, Platform} from 'react-native';
import React, {useCallback, useEffect, useRef,useState} from 'react';
import { TabsStackScreenProps } from '../Navigation/TabsNavigator';
import { SafeAreaView } from 'react-native';
import { HeadersComponent } from '../Components/HeaderComponent/HeaderComponent';
import ImageSlider from './../Components/HomeScreenComponents/ImageSlider';
import { ScrollView } from 'react-native';
import { ProductListParams } from './../TypesCheck/HomeProps';
import { fetchCategories } from '../MiddeleWare/HomeMiddeWare';
import { useFocusEffect } from '@react-navigation/native';


type Props = {}

const HomeScreen = ({navigation, route}: TabsStackScreenProps<"Home">) => {
    const gotoCartScreen = () => {
        navigation.navigate("Cart")
    }

    const sliderImages = [
        "https://t4.ftcdn.net/jpg/07/08/47/75/360_F_708477508_DNkzRIsNFgibgCJ6KoTgJjjRZNJD4mb4.jpg",
        "https://m.media-amazon.com/images/I/71qTm-Xrh0L.jpg",
    ]

    const [getCategory, setGetCategory] = useState<ProductListParams[]>([])
    const [activeCat, setActiveCat] = useState<string>("")

    useEffect(() => {
        fetchCategories({setGetCategory});
    })

    useFocusEffect(
        useCallback(() => {
            fetchCategories({setGetCategory});
        }, []) //dependency array rong de tranh goi lai khong can thiet!
    )


    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40:0, flex: 1, backgroundColor: "black"}}>
            <HeadersComponent gotoCartScreen={gotoCartScreen}/>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                style= {{backgroundColor:"#efg"}}>
                    <ImageSlider images={sliderImages}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen