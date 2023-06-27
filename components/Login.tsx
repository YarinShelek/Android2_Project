import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const AuthScreen: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAuthAction = () => {
    if (isRegistering) {
      console.log('Registering...');
    } else {
      console.log('Logging in...');
    }
  };

  const toggleAuthMode = () => {
    setIsRegistering((prevMode) => !prevMode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Register' : 'Login'}</Text>
      {isRegistering && (
        <TextInput
          style={styles.input}
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          autoCapitalize="none"
        />
      )}
      {isRegistering && (
        <TextInput
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          autoCapitalize="none"
        />
      )}
      {!isRegistering && (
        <TextInput
          style={styles.input}
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          autoCapitalize="none"
        />
      )}
      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
      />
      {isRegistering && (
        <TextInput
          style={styles.input}
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          mode="outlined"
        />
      )}
      <Button mode="contained" onPress={handleAuthAction} style={styles.button}>
        {isRegistering ? 'Register' : 'Login'}
      </Button>
      <TouchableOpacity onPress={toggleAuthMode}>
        <Text style={styles.linkText}>
          {isRegistering ? 'Already registered? Click here to login!' : 'Not registered? Click here to register!'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 16,
  },
});

export default AuthScreen;
