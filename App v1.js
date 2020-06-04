import React, {Component} from 'react';
import { CustomImage, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';  
import { createAppContainer} from  'react-navigation';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { getWorldAlignment } from 'expo/build/AR';


var textinp1 = '';

class HomeScreen extends React.Component {  
  render() {  
      return (  
        <View style={style2.container}>
        <Text style={{color: '#9B9BBC', fontSize: 40, fontFamily: 'notoserif' , fontWeight: 'bold',paddingBottom:50}}>Gesture Talk</Text>
        <Text style={{color: '#9B9BBC', fontSize: 20,fontWeight: 'normal',paddingBottom:25}}>An Assistant for Unspoken </Text>
        <Text style={{color: '#9B9BBC', fontSize: 20,fontWeight: 'normal',paddingBottom:40}}>And Unheard Thoughts </Text>
        <TouchableOpacity
             style = {style2.submitButton}
             onPress = {
                () => this.props.navigation.navigate('Profile')
             }>
             <Text style = {style2.submitButtonText}> Continue </Text>
          </TouchableOpacity>

        </View>  
      );  
  }  
}  
class ProfileScreen extends React.Component {  
  render() {  
      return (  
        <View style={style2.container}>
        <Text style={{color: '#9B9BBC', fontSize: 25, fontFamily: 'notoserif' , fontWeight: 'bold',paddingBottom:50,textAlign:'center'}}>Select to proceed with the following</Text>
        <TouchableOpacity
             style = {style2.submitButton}
             onPress = {
                () => this.props.navigation.navigate('CameraOpen')
             }>
             <Text style = {style2.submitButtonText}> 1. Conversion of Gesture to Text </Text>
          </TouchableOpacity>

        <Text style={{color: '#07063A', fontSize: 25, fontFamily: 'notoserif' , fontWeight: 'bold',textAlign:'center'}}>Select to proceed with the following</Text>
        <TouchableOpacity
             style = {style2.submitButton}
             onPress = {
                () => this.props.navigation.navigate('TextGesture')
             }>
             <Text style = {style2.submitButtonText}> 2. Conversion of Text to Gesture </Text>
          </TouchableOpacity>

        </View>  
        );  
          }  
}  
class CameraInt extends React.Component{
  state = {
    
    hasPermission: null,
    type: Camera.Constants.Type.back,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }
  handleCameraType=()=>{
    const { cameraType } = this.state

    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }

  takePicture = async () => {
    if (this.camera) {
      var photoo;
      let photo = await this.camera.takePictureAsync().then((dataa) => {
        this.setState({

        }),
        photoo = dataa.uri; 

        var formData=new FormData();
       
        formData.append('file1', {uri: photoo, name: 'check.jpg', type: 'image/jpg'});

        const config = {
          headers: {
              'content-type': 'multipart/form-data'}
          };

        axios.post('http://192.168.1.101/hand_rec',formData,config).then(result => {
        
        var res = result.data.resp;
        console.log(res);
        
        Alert.alert(
          'Response',
          'LABEL RETURNED:'+res,
          [
            {text: 'OK', onPress: () => console.log('Yes Pressed')}
          ],
          { cancelable: true } 
        )
    
        }).catch(error => {
            console.log("api call failed" + error);
            
        });




    });
    }
    }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
  
      console.log(result);
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };
  render() {
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
      <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.cameraType} 
            ref={ref => {
              this.camera = ref;
             }}
        >
            
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
        <TouchableOpacity
            style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent',                  
          }}
          onPress={()=>this.pickImage}
          >
          <Ionicons
            name="ios-photos"
            style={{ color: "#fff", fontSize: 40}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
          alignSelf: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}
        onPress={()=>this.takePicture()}
        >
        <FontAwesome
          name="camera"
          style={{ color: "#fff", fontSize: 40}}
        />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
          alignSelf: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}
        onPress={()=>this.handleCameraType()}
        >
        <MaterialCommunityIcons
          name="camera-switch"
          style={{ color: "#fff", fontSize: 40}}
        />
       </TouchableOpacity>
    </View>
         </Camera>
        </View>
      );
    }
  }

  }

class ImageResultss extends Component {
  
      
  render() {
     
      const IMAGES = {
        'img': require('./assets/img.jpg'),
        'ok': require('./assets/ok.jpg'),
        'any questions': require('./assets/anyquestions.gif'),
        'are you hungry': require('./assets/areyouhungry.gif'),
        'be careful': require('./assets/becareful.gif'),
        'come here': require('./assets/comehere.jpg'),
        'dislike': require('./assets/dislike.jpg'),
        'do you have money': require('./assets/doyouhavemoney.gif'),
        'do you want something to drink': require('./assets/doyouwantsomethingtodrink.gif'),
        'dont worry': require('./assets/dontworry.gif'),
        'fingers crossed': require('./assets/fingerscrossed.jpg'),
        'good afternoon': require('./assets/goodafternoon.gif'),
        'good morning': require('./assets/goodmorning.gif'),
        'good question': require('./assets/goodquestion.gif'),
        'heart': require('./assets/heart.jpg'),
        'hello': require('./assets/hello.gif'),
        'hey you': require('./assets/heyyou.jpg'),
        'i am fine': require('./assets/iamfine.gif'),
        'i am sorry': require('./assets/iamsorry.gif'),
        'like': require('./assets/like.jpg'),
        'live long and prosper': require('./assets/livelongandprosper.jpg'),
        'nice to meet you': require('./assets/nicetomeetyou.gif'),
        'pakistan': require('./assets/pakistan.gif'),
        'peace': require('./assets/peace.jpg'),
        'pray': require('./assets/pray.jpg'),
        'rock and roll': require('./assets/rockandroll.jpg'),
        'shall i help you': require('./assets/shallihelpyou.gif'),
        'sit down': require('./assets/sitdown.gif'),
        'stand up': require('./assets/standup.gif'),
        'stop': require('./assets/stop.jpg'),
        'stop time': require('./assets/stoptime.jpg'),
        'take care': require('./assets/takecare.gif'),
        'thank you': require('./assets/thankyou.jpg'),
        'what is the problem': require('./assets/whatistheproblem.gif'),
        'what is today\' date': require('./assets/whatistoday\'sdate.gif'),
        'what is your name': require('./assets/whatisyourname.gif'),
        'whats up': require('./assets/whatsup.gif'),
        'where is the police station': require('./assets/whereisthepolicestation.gif'),
        'you were wrong': require('./assets/youarewrong.gif'),
        'yup': require('./assets/yup.jpg')

        
        }
      var ltextinp1 = textinp1.toLowerCase(); 


      if(ltextinp1 in IMAGES)
      {
      return (  
      <ScrollView>
      <View style={{ flex: 1 , justifyContent: 'flex-start',alignItems:'center', flexDirection: 'column', backgroundColor: 'transparent'}}>
         

        <Image
          style={{ width: 300, height: 200 }}
          source={IMAGES[ltextinp1]}
        />
        
        
       
       <TouchableOpacity 
             style = {style2.submitButton}
             onPress = {
                () => this.props.navigation.navigate('TextGesture')
             }>
             <Text style = {style2.submitButtonText}> Back </Text>
          </TouchableOpacity>

     
        </View>
        </ScrollView>
 
      );
    }
    else
    {
      var alpha = [];
      alpha = ltextinp1.split("");

      return (  

      <ScrollView>
        <View style={{ flex: 1 , justifyContent: 'flex-start',alignItems:'center', flexDirection: 'column'}}>
         
         
         {alpha.map((item, key) => (
            
            <Image
            style={{ width: 150, height: 170 }}
            source={IMAGES[item]}
          />

          ))}

         <TouchableOpacity 
               style = {style2.submitButton}
               onPress = {
                  () => this.props.navigation.navigate('TextGesture')
               }>
               <Text style = {style2.submitButtonText}> Back </Text>
            </TouchableOpacity>
  
       
          </View>
          </ScrollView>
        );
    }
  }
}
  

class UserInputs extends Component{
  state = {
    textinp: ''
 }
 handleTextInp = (text) => {
    this.setState({ textinp: text }),
    textinp1 = text;
 }

 render() {
    return (
       <View style = {style2.container}>
          <TextInput style = {style2.input}
             underlineColorAndroid = "transparent"
             placeholder = "    Enter your Text here"
             placeholderTextColor = "#9B9BBC"
             autoCapitalize = "none"
             onChangeText = {this.handleTextInp}/>
          
          <TouchableOpacity
             style = {style2.submitButton}
             onPress = {
                () => this.props.navigation.navigate('Results')
             }>
             <Text style = {style2.submitButtonText}> Submit </Text>
          </TouchableOpacity>
       </View>
    )
 }
}
const AppNavigator = createStackNavigator(  
  {  
      Gesture_Talk: HomeScreen,  
      Profile: ProfileScreen,
      CameraOpen: CameraInt,
      TextGesture: UserInputs,
      Results: ImageResultss
  },  
  {  
      initialRouteName: "Gesture_Talk"  
  }  
);
const AppContainer = createAppContainer(AppNavigator);  
export default class App extends React.Component {  
    render() {  
        return <AppContainer />;  
    }  
}  

const style2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07063A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 15,
    height: 100,
    width:250,
    borderColor: '#9B9BBC',
    borderWidth: 1,
    justifyContent: 'center',
    color: '#9B9BBC'
 },
 submitButton: {
    backgroundColor: '#9B9BBC',
    padding: 10,
    margin: 15,
    height: 40,
 },
 submitButtonText:{
  color: '#07063A'
 },
 stretch: {
  width: 50,
  height: 200,
  resizeMode: 'stretch'
 }
});