import React from 'react'
import { Text, View,Modal,TouchableOpacity } from 'react-native'
import { IconTextInput } from './IconTextInput'
import color from '../config/color'
import { CustomButton } from './LoginButton';
import Ionicons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFonts,Poppins_900Black,Poppins_400Regular } from '@expo-google-fonts/poppins';

function PermitComponent({ modalVisible,setModalVisible }) {
    
    const handleChange = () => { };

    let [fontsLoaded, fontError] = useFonts({
    Poppins_900Black,Poppins_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
      <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          from
        >
       <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:color.bottomNavigation,position:'absolute',top:60,bottom:86,left:0,right:0,opacity:0.7}}>
        </View>
        <View style={{ margin: 20,borderWidth:1,elevation:50, backgroundColor: color.bottomNavigation, position: 'absolute', top: 37, left: '30%', width: '70%', bottom: 65, zIndex: 30, padding: 10 }}><TouchableOpacity style={{borderWidth:1,width:'96%',backgroundColor:color.bottomActiveNavigation,justifyContent:'start',alignItems:'center',flexDirection:'row',gap:3,padding:5}} onPress={() => setModalVisible(false)}>
        <Ionicons size={40} color={color.yello} name='close-box-multiple'/>
        <Text style={{fontWeight:'bold',fontFamily:'Poppins_400Regular',color:color.white,fontSize:16,}}>ClOSE</Text>
          </TouchableOpacity>
        <Text style={{fontSize:20,color:color.white,textAlign:'center',marginVertical:16,fontFamily:'Poppins_400Regular'}}>Nozzle - 01 (Permit)</Text>
       <View style={{width:'96%'}}>
         <IconTextInput 
         placeholder="Customer Name"
         iconName={"email"}
         onChangeText={handleChange('emailOrUsername')}
         placeholderTextColor={color.white}
        />
         <IconTextInput 
         placeholder="Customer Id"
         iconName={"email"}
         onChangeText={handleChange('emailOrUsername')}
         placeholderTextColor={color.white}
        />
         <IconTextInput 
         placeholder="Car No"
         iconName={"car"}
         onChangeText={handleChange('emailOrUsername')}
         placeholderTextColor={color.white}
        />
        <CustomButton title={"Permit"} style={{backgroundColor:color.activeColor}}/>
       </View>
      </View>
        </Modal>
  )
}

export default PermitComponent