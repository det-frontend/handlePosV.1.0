import React from 'react'
import { StyleSheet ,TouchableOpacity,Text} from 'react-native';
import color from '../config/color';

export const CustomButton = ({ onPress, title, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
    backgroundColor:color.white,  // Customize the button background color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',  // Customize the button text color
    textAlign: 'center',
    fontSize: 20,
    textTransform:'uppercase'
    
  },
  customButton: {
    // Additional styles for the custom button if needed
  },
})