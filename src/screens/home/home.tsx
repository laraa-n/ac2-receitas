import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

type ReceitaProps = { idMeal: string, strMeal: string, strMealThumb: string };

const Item = ({ idMeal, strMeal, strMealThumb }: ReceitaProps) => (
    <TouchableOpacity
        style={styles.item}
        onPress={() =>
            router.navigate({
                pathname: '/detalhes',
                params: { id: idMeal }
            })
        }
    >
        <Image
            source={{ uri: strMealThumb }}
            style={styles.logo}
        />
        <Text style={styles.title}>{strMeal}</Text>
    </TouchableOpacity>
);

export const Home = () => {
    const [receitas, setReceitas] = useState<ReceitaProps[]>([]);

    const chamaApi = () => {
        axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Brazil').then((resp) => {
            setReceitas(resp.data.meals);
        });
    };

    useEffect(() => {
        chamaApi();
    }, []);

    return (
        <ScrollView style={styles.fundo}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Receitas brasileiras</Text>
                <FlatList
                    data={receitas}
                    renderItem={({ item }) => <Item idMeal={item.idMeal} strMeal={item.strMeal} strMealThumb={item.strMealThumb} />}
                    keyExtractor={item => item.idMeal}
                    horizontal={false}
                    numColumns={5}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fundo: {
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        margin: 25,
    },
    item: {
        backgroundColor: '#F9F0E0',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: 'center',
        flex: 2,
        borderRadius: 10
    },
    title: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center',
    },
    logo: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    titulo: {
        marginBottom: 5,
        fontSize: 32,
        textAlign: 'center',
    },
});