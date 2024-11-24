import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('CPF:', cpf, 'Senha:', password);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Substitua pela URL da logo
        style={styles.logo}
        resizeMode="contain"
      />

      {/* CPF / CNPJ */}
      <TextInput
        mode="outlined"
        label="CPF/CNPJ"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
        keyboardType="numeric"
      />

      {/* Senha */}
      <TextInput
        mode="outlined"
        label="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      {/* Esqueci minha senha */}
      <TouchableOpacity onPress={() => console.log('Esqueci minha senha')}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>

      {/* Botão Entrar */}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        buttonColor="#34A853"
      >
        Entrar
      </Button>

      {/* Link para Cadastro */}
      <Text style={styles.registerText}>
        Ainda não tem cadastro?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Register')} // Substitua com a navegação para a tela de cadastro
        >
          Cadastre-se aqui
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  link: {
    color: '#1E88E5',
    fontSize: 14,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  button: {
    width: '100%',
    marginVertical: 16,
  },
  registerText: {
    fontSize: 14,
    color: '#000000',
  },
});