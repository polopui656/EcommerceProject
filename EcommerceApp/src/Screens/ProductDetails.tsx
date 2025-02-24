import { View, Text, Image, Platform, ScrollView, SectionList, Pressable, Alert
    , SafeAreaView ,Dimensions, ImageBackground } from "react-native";
import React from "react";
import { RootStackParams, RootStackScreenProps } from "../Navigation/RootNavigator";
import { HeadersComponent } from "../Components/HeaderComponent/HeaderComponent";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

const ProductDetails = ({navigation, route}: RootStackScreenProps<"productDetails">) => {
    const {_id, images, name, price, oldPrice, inStock, color, size, description, quantity} = route.params;
    const gotoCartScreen = () => {
        navigation.navigate("Cart")
    }

    const goToPreviousScreen = () => {
        if(navigation.canGoBack()) {
            console.log("Chuyen ve trang truoc.");
            navigation.goBack();
        } else {
            console.log("Khong the quay lai, chuyen ve trang Onboarding.");
            navigation.navigate("OnboardingScreen");
        }
    };

    return (
        <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 20 : 0, flex: 1, backgroundColor: "white"}}>
            <HeadersComponent gotoCartScreen={gotoCartScreen} gotoPrevious={goToPreviousScreen}/>
        </SafeAreaView>
    )
}
export default ProductDetails