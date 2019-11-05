import React , { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';


const indexScreen = ({ navigation}) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(() => {
        // primeira vez que a tela é exibida getBlogPosts() é executado
        getBlogPosts();

        // todas as vezes que é retornado para esta tela, código abaixo é executado
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View>
            <FlatList 
                data={state}
                keyExtractor={item => item.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title} - {item.id}</Text>
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <Feather style={styles.icon} name="trash"></Feather>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

indexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: (
                    <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                        <Feather name="plus" size={30} />
                    </TouchableOpacity>
                )
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderTopWidth: 1,
        paddingHorizontal: 10,
        borderColor: 'gray',
    },
    title: {
        fontSize: 18,
    },
    icon: {
        fontSize: 24,
    }
});

export default indexScreen;