import axios from "axios";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";

type ReceitaProps = { idMeal: string, strMeal: string, strMealThumb: string, strInstructions: string, strCategory: string,
    strIngredient1: string,
    strIngredient2: string,
    strIngredient3: string,
    strIngredient4: string,
    strIngredient5: string,
    strIngredient6: string,
    strIngredient7: string,
    strIngredient8: string,
    strIngredient9: string,
    strIngredient10: string,
    strIngredient11: string,
    strIngredient12: string,
    strIngredient13: string,
    strIngredient14: string,
    strIngredient15: string,
    strIngredient16: string,
    strIngredient17: string,
    strIngredient18: string,
    strIngredient19: string,
    strIngredient20: string
 };

export const Detalhes = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [receita, setReceita] = useState<ReceitaProps>();

    const chamaApi = () => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((resp) => {
            setReceita(resp.data.meals[0]);
        });
    };

    useEffect(() => {
        chamaApi();
    }, []);

    const Ingredientes = () => (
        <FlatList
            data={[
                {key: receita?.strIngredient1},
                {key: receita?.strIngredient2},
                {key: receita?.strIngredient3},
                {key: receita?.strIngredient4},
                {key: receita?.strIngredient5},
                {key: receita?.strIngredient6},
                {key: receita?.strIngredient7},
                {key: receita?.strIngredient8},
                {key: receita?.strIngredient9},
                {key: receita?.strIngredient10},
                {key: receita?.strIngredient11},
                {key: receita?.strIngredient12},
                {key: receita?.strIngredient13},
                {key: receita?.strIngredient14},
                {key: receita?.strIngredient15},
                {key: receita?.strIngredient16},
                {key: receita?.strIngredient17},
                {key: receita?.strIngredient18},
                {key: receita?.strIngredient19},
                {key: receita?.strIngredient20},
            ]}
            renderItem={({item}) => <Text style={styles.ingrediente}>{item.key}</Text>}        />
    )
    

    return (
        <ScrollView style={styles.fundo}>
            <View style={styles.container}>
                <Image
                    source={{ uri: receita?.strMealThumb }}
                    style={styles.logo}
                />
                <View style={styles.detalhes}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.receita}>{receita?.strMeal}</Text>
                        <Text style={styles.categoria}>{receita?.strCategory}</Text>
                    </View>
                    <View style={styles.segundo}>
                        <View style={styles.container}>
                            <Text style={styles.preparo}>Ingredientes</Text>
                            <Text style={styles.instrucoes}><Ingredientes/></Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.preparo}>Modo de preparo</Text>
                            <Text style={styles.instrucoes}>{receita?.strInstructions}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    ingrediente: {
        
    },
    segundo: {
        flex: 3,
        flexDirection: 'row'
    },
    detalhes: {
        padding: 25,
        backgroundColor: '#F9F0E0',
        borderRadius: 10,
    },
    receita: {
        textAlign: 'left',
        width: '800%',
        fontSize: 32
    },
    categoria: {
        textAlign: 'right',
        width: '20%',
        fontSize: 20,
        color: 'gray'
    },
    instrucoes: {
        marginTop: 25,
        textAlign: 'justify',
        fontSize: 16,
    },
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
    logo: {
        width: '100%',
        height: 500,
        borderRadius: 10,
        marginBottom: 20,
        resizeMode: 'cover'
    },
    preparo: {
        marginTop: 20,
        fontSize: 32,
        fontWeight: 'bold'
    }
});