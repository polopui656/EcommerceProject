import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios'
import { GoBack } from './GoBackButton';

interface IHeaderParams {
    pageTitle?: string; 
    gotoPrevious?: () => void;
    search?: () => void;
    cartLength?: number;
    gotoCartScreen?: () => void;
}

export const HeadersComponent = ({ gotoPrevious, search, cartLength, gotoCartScreen } : IHeaderParams) => {
    const [searchInput, setSearchInput] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to search products
    const handleSearch = async () => {
      if (searchInput.trim() === "") return; // Don't search if input is empty

      setLoading(true);
      try {
        const response = await axios.get("http://192.168.1.5:9000/product/getAllProduct", {
          params: {
            search: searchInput,
          },
        });
        setFilteredProducts(response.data); // Set filtered products
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    return (
      <View
        style={{
          backgroundColor: "blue",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <GoBack onPress={gotoPrevious}/>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 10,
            height: 38,
            flex: 1,
          }}
        >
          <Pressable style={{ padding: 10 }} onPress={search}>
            <AntDesign name="search1" size={20} color={"blue"} />
          </Pressable>
          <TextInput
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder="search Items ... "
          />
        </Pressable>
        <Pressable onPress={gotoCartScreen}>
            <View>
                <Text style={{color: "pink"}}>
                    {cartLength}
                </Text>
            </View>
            <MaterialIcons style={{padding: 5, marginTop: 3}} name="shopping-cart" size={24} color={"white"}/>
        </Pressable>
      </View>
    )
}

