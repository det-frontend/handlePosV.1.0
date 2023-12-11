import { Image, Text,View } from 'react-native'
import { Screen } from '../../components/Screen'
import color from '../../config/color'
import LottieView from 'lottie-react-native';


export const Account = () => {
  return (
    <Screen>
      <View style={{ height: 200, width: '100%', backgroundColor: color.bottomActiveNavigation }} >
      <View style={{ height: 200, width: '50%',justifyContent:'center',alignItems:'center'}}>
         <LottieView
        autoPlay
        style={{
          width: '90%',
          height: '90%',
          backgroundColor: color.bottomActiveNavigation,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../../assets/mm.json')}
          /> 
        <Text>Manager</Text>
      </View>
    </View>
    </Screen>
  )
}
