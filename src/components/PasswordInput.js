import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PasswordInput = ({ onChangeText, value, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputSection}>
      <TextInput
        style={styles.inputPassword}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="grey"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'tomato',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputPassword: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PasswordInput;