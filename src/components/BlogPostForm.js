import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const BlogPostForm = ({ onSubmit, titulo, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View>
            <Text style={styles.label}>{titulo} Title:</Text>
            <TextInput style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <Text style={styles.label}>{titulo} Content:</Text>
            <TextInput style={styles.input}
                value={content}
                onChangeText={(text) => setContent(text)}
            />
            <Button 
                title="Save Blog Post"
                onPress={() => onSubmit(title, content) }
            />
        </View>
    );
};

BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 5,
        margin: 5
    },

    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    }
});

export default BlogPostForm;