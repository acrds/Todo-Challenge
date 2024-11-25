import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { TextInput, Button, useTheme, Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../services/auth";

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

    const handleRegister = async () => {
        if (isFormValid) {
            try {
                const data = { name, email, password };
                await registerUser(data);
                alert("Register Successfully");
                navigation.navigate("Login");
            } catch (error) {
                alert("Error to register. Try again.");
            }
        } else {
            alert("Please, fill correctly");
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Icon
                    source="account"
                    size={90}
                />
            </View>

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
                secureTextEntry={true}
                style={styles.input}
            />

            <TextInput
                label="Repeat password*"
                mode="outlined"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                style={styles.input}
            />

            <Button
                mode="contained"
                onPress={handleRegister}
                disabled={!isFormValid}
                style={[styles.button, { backgroundColor: isFormValid ? "#004aad" : theme.colors.disabled }]}
            >
                Register
            </Button>
        </View>
    );
}
