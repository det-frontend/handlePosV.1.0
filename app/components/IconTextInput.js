import { Image, TextInputComponent, View, StyleSheet, TextInput} from "react-native";
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import color from "../config/color";
import { useFonts,Poppins_900Black,Poppins_400Regular } from '@expo-google-fonts/poppins';


export const IconTextInput = ({ placeholder,iconName, ...rest }) => {
let [fontsLoaded, fontError] = useFonts({
    Poppins_900Black,Poppins_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
    return ( <View style={styles.inputContainer}>
  
        <TextInput placeholder={placeholder} style={styles.input} {...rest} />
        <Ionicons name={iconName} size={32} color={color.light} />
  </View>)
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderWidth: 1,
        height: 50,
        backgroundColor: color.bottomActiveNavigation,
        paddingHorizontal: 10,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    input: {
        fontFamily: 'Poppins_400Regular',
        width: "90%",
        height: '100%',
        color:color.light
    }
})