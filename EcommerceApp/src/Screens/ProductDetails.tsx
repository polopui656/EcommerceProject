import { View, Text, Image, Platform, ScrollView, SectionList, Pressable, Alert
    , SafeAreaView ,Dimensions, ImageBackground } from "react-native";
import React from "react";
import { RootStackParams, RootStackScreenProps } from "../Navigation/RootNavigator";
import { HeadersComponent } from "../Components/HeaderComponent/HeaderComponent";
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { CartState } from "../TypesCheck/productCartTypes";
import { ProductListParams } from "../TypesCheck/HomeProps";
import { addToCart } from "../redux/CartReducer";
import DisplayMessage from "../Components/ProductDetails/DisplayMessage";

const {width, height} = Dimensions.get("window");

const ProductDetails = ({navigation, route}: RootStackScreenProps<"productDetails">) => {
    const {_id, images, name, price, oldPrice, inStock, color, size, description, quantity} = route.params;
    const gotoCartScreen = () => {
        if (cart.length === 0) {
          setMessage("Cart is empty. Please add products to cart.");
          setDisplayMessage(true);
          setTimeout(() => {
            setDisplayMessage(false);
          }, 3000)
        } else
        navigation.navigate("TabsStack", {screen: "Cart"});
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

    const cart = useSelector((state: CartState) => state.cart.cart);
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [displayMessage, setDisplayMessage] =React.useState<boolean>(false);

    const productItemObj: ProductListParams = route.params as ProductListParams;

    const addItemToCart = (ProductItemObj: ProductListParams) => {
      if(ProductItemObj.quantity <= 0){
        setMessage("Product is out of stock.");
        setDisplayMessage(true);
        setTimeout(() => {
          setDisplayMessage(false);
        }, 3000)
      } else {
        const findItem = cart.find((product) => product._id === _id)
        if (findItem) {
          setMessage("Product is already in cart");
          setDisplayMessage(true);
          setTimeout(() => {
            setDisplayMessage(false);
          }, 3000)
        } else {
          setAddedToCart(!addedToCart);
          dispatch(addToCart(ProductItemObj));
          setMessage("Product added to cart successfully.");
          setDisplayMessage(true);
          setTimeout(() => {
            setDisplayMessage(false);
          }, 3000)
        }
      }
    }

    return (
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 20 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        {displayMessage && <DisplayMessage message= {message} visible={() => setDisplayMessage(!displayMessage)}/>}
        <HeadersComponent
          gotoCartScreen={gotoCartScreen}
          gotoPrevious={goToPreviousScreen}
        />
        <ScrollView style={{ backgroundColor: "purple" }}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <ImageBackground style={{ width, height, marginTop: 25 }}>
              <View
                style={{
                  padding: 3,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#C60C30",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "yellow",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    {oldPrice ? ((1 - price / oldPrice) * 100).toFixed(1) : 0}%
                    off
                  </Text>
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#E0E0E0",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={25}
                    color="green"
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 20,
                }}
              >
                <Image
                  style={{ width: 300, height: 300, resizeMode: "contain" }}
                  source={{ uri: images[0] }}
                />
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "auto",
                  marginBottom: 1000,
                  marginLeft: 20,
                }}
              >
                <AntDesign
                  style={{ paddingLeft: 0, paddingTop: 2 }}
                  name="heart"
                  size={25}
                  color="grey"
                />
              </View>
            </ImageBackground>
          </ScrollView>
          <View
            style={{
              backgroundColor: "white",
              borderColor: "purple",
              borderWidth: 8,
              width,
              position: "absolute",
              top: 420,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
            <Text style={{ fontSize: 16, color: "green" }}>{description}</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Price: {price} $</Text>
            <Text style={{ fontSize: 16, color: "black"}}>OldPrice: {oldPrice} $</Text>
            <Text style={{ fontSize: 16, color: "blue"}}>
                {quantity > 0 ? `In Stock - Quantity: ${quantity}` : "Out of Stock"}
            </Text>
            <Text style={{ fontSize: 16, color: "orange"}}>Color: {color}</Text>
            <Text style={{ fontSize: 16, color: "red"}}>Size: {size}</Text>
          </View>
        </ScrollView>
        <View style= {{backgroundColor: "white", paddingBottom: 0}}>
            <Pressable 
              style={{ backgroundColor: "green", padding: 15, alignItems: 'center', justifyContent: 'center',
                      borderRadius: 10, margin: 10}}
              onPress={() => addItemToCart(productItemObj)}>
              {
                addedToCart ? (
                  <Text style={{color: "violet", fontSize: 20, fontWeight: "bold"}}>Add to Cart</Text>
                ) : (
                  <Text style={{color: "orange", fontSize: 20, fontWeight: "bold"}}>Add to Cart</Text>
                )
              }
            </Pressable>
        </View>
      </SafeAreaView>
    );
}
export default ProductDetails