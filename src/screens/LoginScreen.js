import React, { useState, useEffect } from 'react';
import styles from '../styles/LoginStyles';
import { Image, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Button, useTheme, TextInput, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../services/routes';
import { saveToken } from "../utils/tokenStorage";
import { CommonActions } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation();
    const theme = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid =
            email.includes("@") &&
            password.length >= 6;

        setIsFormValid(isValid);
    }, [email, password])

    const handleLogin = async () => {
        try {
            const data = { email, password };
            const response = await loginUser(data);
            const { token } = response;
            await saveToken(token);
            navigation.replace("To Bee");
            navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'To Bee' }
                ]
            })
        );
        } catch (error) {
            if (error.status === 400) {
                alert("Fields are required");
            } else if (error.status === 404) {
                alert("User not found. Please register");
            } else if (error.status === 401) {
                alert("Invalid credentials");
            } else {
                alert(error.message);
            }
        }
    };


    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

            <TextInput
                mode="outlined"
                label="Email"
                value={email.toLowerCase()}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
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
                onPress={handleLogin}
                disabled={!isFormValid}
                style={[styles.button, { backgroundColor: isFormValid ? "#004aad" : theme.colors.disabled }]}
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
            </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>    );
}
