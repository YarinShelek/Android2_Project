import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Text as PaperText,
  TouchableRipple,
} from "react-native-paper";
import axios, { AxiosResponse } from "axios";
import { User } from "../context/UserContext";

interface RegistrationRequest {
  username: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isAdmin: boolean;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginProps {
  onLogin: (userData: User) => void;
  onDataChange: (data: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onDataChange }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const token = "ASLKnffnsaf24afsAKLnn3";

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const sendDataToParent = () => {
    onDataChange(username); // Pass the username data to the parent component
  };

  const handleAuthAction = async () => {
    if (isRegistering) {
      // Registration
      try {
        const registrationData: RegistrationRequest = {
          username,
          password,
          name,
          address,
          phone,
          email,
          isAdmin: true,
        };

        const queryString = Object.entries(registrationData)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join("&");
        const url = `https://ksp2.onrender.com/users/register?${queryString}`;
        console.log(url);
        const response = await axios.post<User>(
          url,
          {},
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        // Handle the response
        handleResponse(response);
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      // Login
      try {
        const loginData: LoginRequest = {
          username,
          password,
        };
        console.log(loginData);
        const queryParams = `username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`;
        const url = `https://ksp2.onrender.com/users/login?${queryParams}`;
        console.log(url);

        const response = await axios.post<User>(
          url,
          {},
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        // Handle the response

        onDataChange(username); // Pass the username data to the parent component
        handleResponse(response);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  const handleResponse = async (response: AxiosResponse<User>) => {
    if (response.status === 200) {
      console.log(
        isRegistering ? "Registration successful" : "Login successful"
      );
      console.log(response);
      onLogin(response.data); // Call the onLogin function with the user data
    } else {
      console.log(
        isRegistering ? "Registration failed" : "Login failed",
        response.data
      );
    }
  };

  const toggleAuthMode = () => {
    setIsRegistering((prevMode) => !prevMode);
  };

  return (
    <View style={styles.container}>
      <PaperText style={styles.title}>
        {isRegistering ? "Register" : "Login"}
      </PaperText>
      <TextInput
        style={styles.input}
        label="Username"
        value={username}
        onChangeText={handleUsernameChange}
        mode="outlined"
        autoCapitalize="none"
      />
      {isRegistering && (
        <TextInput
          style={styles.input}
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          autoCapitalize="none"
        />
      )}
      {isRegistering && (
        <TextInput
          style={styles.input}
          label="Address"
          value={address}
          onChangeText={setAddress}
          mode="outlined"
          autoCapitalize="none"
        />
      )}
      {isRegistering && (
        <TextInput
          style={styles.input}
          label="Phone"
          value={phone}
          onChangeText={setPhone}
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
        {isRegistering ? "Register" : "Login"}
      </Button>
      <TouchableRipple onPress={toggleAuthMode}>
        <PaperText style={styles.linkText}>
          {isRegistering
            ? "Already registered? Click here to login!"
            : "Not registered? Click here to register!"}
        </PaperText>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: "100%",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 16,
  },
});

export default Login;
