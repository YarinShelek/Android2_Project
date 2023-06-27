import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { RadioButton, Divider } from 'react-native-paper';

const SettingsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('english');
  const appVersion = '69420';

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleAccountDeactivation = () => {
    // Logic to deactivate the user's account
    // You can implement the account deactivation functionality here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Divider style={styles.divider} />

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Personal Information</Text>
        <Text style={styles.settingValue}>Edit</Text>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Theme Selection</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
      <Divider style={styles.divider} />

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>App Version</Text>
        <Text style={styles.settingValue}>{appVersion}</Text>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Language Preferences</Text>
        <RadioButton.Group
          value={selectedLanguage}
          onValueChange={handleLanguageChange}
        >
          <View style={styles.radioButtonContainer}>
            <RadioButton value="english" color="#1DA1F2" />
            <Text style={styles.radioButtonLabel}>English</Text>
          </View>
        </RadioButton.Group>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Account Deactivation</Text>
        <Text style={styles.settingValue} onPress={handleAccountDeactivation}>
          Deactivate
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  divider: {
    marginVertical: 8,
    backgroundColor: '#CCCCCC',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
    flex: 1,
    color: '#333333',
  },
  settingValue: {
    fontSize: 16,
    color: '#1DA1F2',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333333',
  },
});

export default SettingsPage;
