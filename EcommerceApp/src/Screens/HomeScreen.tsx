import {View, Text, Platform, ScrollView, Pressable, Alert} from 'react-native';
import React, {useCallback, useEffect, useRef,useState} from 'react';
import { TabsStackScreenProps } from '../Navigation/TabsNavigator';
import { SafeAreaView } from 'react-native';
import { HeadersComponent } from '../Components/HeaderComponent/HeaderComponent';
import ImageSlider from './../Components/HomeScreenComponents/ImageSlider';
import { ProductListParams } from './../TypesCheck/HomeProps';
import { CategoryCard } from '../Components/HomeScreenComponents/CategoryCard';
import { fetchCategories, fetchProductsByCatID, fetchTrendingProducts } from '../MiddeleWare/HomeMiddeWare';
import { useFocusEffect } from '@react-navigation/native';
import { ProductCard } from '../Components/HomeScreenComponents/ProductCard';
import { useSelector } from 'react-redux';
import { CartState } from '../TypesCheck/productCartTypes';

const HomeScreen = ({navigation, route}: TabsStackScreenProps<"Home">) => {
    const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
    const cart = useSelector((state: CartState) => state.cart.cart);
    const gotoCartScreen = () => {
        if(cart.length === 0){
            setMessage("Cart is empty. Please add products to cart.");
            setDisplayMessage(true);
            setTimeout(() => {
                setDisplayMessage(false);
            }, 3000)
        } else {
            navigation.navigate("TabsStack", {screen: "Cart"});
        }
    }

    const goToPreviousScreen = () => {
        if(navigation.canGoBack()) {
            console.log("Chuyen ve trang truoc.");
            navigation.goBack();
        } else {
            console.log("Khong the quay lai, chuyen ve trang Onboarding.");
            navigation.navigate("OnboardingScreen");
        }
    }

    const sliderImages = [
      "https://i.pinimg.com/736x/66/19/fc/6619fcd3cbd6b6a8e7a965789c28e54c.jpg",
      "https://i.pinimg.com/474x/92/6f/b0/926fb0479307cf3641500a3492c8a311.jpg",
      "https://i.pinimg.com/474x/8f/0f/27/8f0f27f4861b11049526e6b372ee7099.jpg",
      "https://i.pinimg.com/474x/0e/f1/2f/0ef12fb72057dc5c62ed3f85727ea5fd.jpg",
    ];

    const [getCategory, setGetCategory] = useState<ProductListParams[]>([])
    const [activeCat, setActiveCat] = useState<string>("")
    const [trendingProducts, setTrendingProducts] = useState<ProductListParams[]>([])
    const [message, setMessage] = React.useState("");
    const [displayMessage, setDisplayMessage] = React.useState<boolean>(false);

    useEffect(() => {
        fetchCategories({setGetCategory});
        fetchTrendingProducts({setTrendingProducts});
    }, []);

    useEffect(() => {
        console.log("fetchProductByCatID: ", fetchProductsByCatID);
        if(activeCat) {
            fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat});
        }
    }, [activeCat]);

    useFocusEffect(
        useCallback(() => {
            fetchCategories({setGetCategory});
            if (activeCat){
                fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat});
            }
        }, [activeCat]) //dependency array rong de tranh goi lai khong can thiet!
    );


    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40:0, flex: 1, backgroundColor: "white"}}>
            <HeadersComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} gotoPrevious={goToPreviousScreen}/>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                style= {{backgroundColor:"#efg"}}>
                    <ImageSlider images={sliderImages}/>
            </ScrollView>
            <View style={{ backgroundColor: "blue", flex: 0}}>
                <Text style={{color: "white", fontWeight: "bold", padding: 10}}>
                    Category
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    contentContainerStyle = {{paddingHorizontal: 15}}
                    style= {{margin: 0, backgroundColor: "white"}}
                >
                    {
                        getCategory.map((item, index) => (
                            <CategoryCard
                                item={{ "name" : item.name, "images" : item.images, _id : item._id}}
                                catStyleProps={{
                                    "height": 50,
                                    "width": 55,
                                    "radius": 20,
                                    "resizeMode": "contain"
                                }}
                                catProps={{
                                    "activeCat": activeCat,  "onPress" : () => setActiveCat(item._id)
                                }}
                            />
                        ))
                    }

                </ScrollView>
            </View>

            <View style= {{
                backgroundColor: "blue", flexDirection: "row", justifyContent: "space-between",
                marginTop: 2
            }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10, color: "white"}}>
                    Products from Selected Category
                </Text>
                <Pressable>
                    <Text style= {{fontSize: 11, fontWeight: "bold", padding: 10, color: "white"}}>
                        See all
                    </Text>
                </Pressable>
            </View>

            <View style= {{
                backgroundColor: "#fff", borderWidth: 2, borderColor: "green", flexDirection: "row",
                justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"
            }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        getProductsByCatID?.length> 0 ? (
                            getProductsByCatID.map((item, index) => (
                                <CategoryCard
                                    key={index}
                                    item={{"name": item.name, "images": item.images, "_id": item._id}}
                                    catStyleProps={{
                                        "height": 100,
                                        "width": 100,
                                        "radius": 10,
                                        "resizeMode": "contain"
                                    }}
                                    catProps={{
                                        "onPress": () => Alert.alert(item.name)
                                    }}
                                 />
                            ))
                        ) : (
                            <Text> Khong co san pham nao</Text>
                        )}
                </ScrollView>
            </View>
            <View style={{
                backgroundColor: "blue", flexDirection: "row", justifyContent: "space-between", marginTop:1
            }}>
                <Text style={{ color: "white", fontSize: 14, fontWeight: "bold", padding: 10}}>
                    Trending Deals of The Week
                </Text>
            </View>
            <View style={{
                backgroundColor:"#fff", borderWidth: 2, borderColor: "blue", flexDirection: "row",
                justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" 
            }}>
                {
                    trendingProducts.map((item, index) => (
                        <ProductCard
                            item={{
                                _id: item?._id || index.toString(),
                                name: item?.name || "No name",
                                images: item?.images || [""],
                                price: item?.price || 0,
                                oldPrice: item?.oldPrice || item?.price || 0,
                                description: item?.description || "No description available",
                                quantity: item?.quantity ?? 1,
                                inStock: item?.inStock ?? true,
                                isFeatured: Boolean(item?.isFeatured),
                                category: item?.category?.toString() || "Uncategorized"
                            }}
                            key={index}
                            pStyleProps={{"resizeMode": "contain", "width": 100, height: 90, "marginBottom": 5}}   
                            productProps={{
                                "onPress": () => {
                                    navigation.navigate("productDetails", item)
                                }
                            }} 
                        ></ProductCard>
                    ))
                }
                
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen