import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { TextInput, Button, Text, useTheme, Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
    const theme = useTheme();
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid =
            name.trim().length > 0 &&
            email.includes("@") &&
            password.length >= 6 &&
            password === confirmPassword;

        setIsFormValid(isValid);
    }, [name, email, password, confirmPassword])

    const handleRegister = () => {
        if (isFormValid) {
            navigation.navigate('Login')
        }
    }

    return (
        <View style={styles.container}>
            <Icon
                source="account"
                size={90}
            />
            <TextInput
                label="Name*"
                mode="outlined"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                label="Email*"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
            />

            <TextInput
                label="Password*"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <TextInput
                label="Repeat password*"
                mode="outlined"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
            />

            <Button
                mode="contained"
                onPress={handleRegister}
                disabled={!isFormValid}
                style={[styles.button, { backgroundColor: isFormValid ? "#34A853" : theme.colors.disabled}]}
            >
                Register
            </Button>
        </View>
    );
}
