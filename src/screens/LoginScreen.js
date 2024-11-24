import React, { useState } from 'react';
import styles from '../styles/LoginStyles';
import { View, Image } from 'react-native';
import { Button, useTheme, TextInput, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation();
    const theme = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="numeric"
            />

            <TextInput
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button
                mode="contained"
                onPress={() => navigation.navigate('Home')}
                style={styles.button}
                buttonColor="#34A853"
            >
                Sign in
            </Button>

            <Text style={styles.registerText}>
            Don't have an account yet?{' '}
                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate('Register')}
                >
                    Register now
                </Text>
            </Text>
        </View>
    );
}
