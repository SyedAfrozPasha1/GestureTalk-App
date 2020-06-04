import React, {Component} from 'react';
import {TouchableHighlight,CustomImage, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, Dimensions} from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';  
import { createAppContainer} from  'react-navigation';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { ScrollView ,Swipeable} from 'react-native-gesture-handler';
import { getWorldAlignment } from 'expo/build/AR';
import firebase from 'firebase';
// import {firebaseConfig} from './config';

var firebaseConfig = {
  apiKey: "AIzaSyDDi-1L5EdlbRN8fl9VJa2K5llZUMu84CU",
  authDomain: "gesturetalk-85f90.firebaseapp.com",
  databaseURL: "https://gesturetalk-85f90.firebaseio.com",
  projectId: "gesturetalk-85f90",
  storageBucket: "gesturetalk-85f90.appspot.com",
  messagingSenderId: "851378894931",
  appId: "1:851378894931:web:93c5d6e5f8325b2e25aea6",
  measurementId: "G-VB2TFKV3L6"
};

// if (!firebase.apps.length) {
// var app = firebase.initializeApp(firebaseConfig);
// }

// const aud = require('./assets/audio/shutter.mp3');
var textinp1 = '';
var res = '';
var ltextinp1 = '';
const height1 = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const maskRowHeight = Math.round((height1 - 500) / 20);
const maskColWidth = (width - 300) / 2;
var realtime = '0';
var colorr = "#ff0000";
var mode = 'Mode: Capture (Click to change)';
var urlimage = '';
var allimg = [];

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
    change : ''
  }


  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
    this.remove = this.remove.bind(this);

    
  }
  handleCameraType=()=>{
    const { cameraType } = this.state

    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }

  addspace= () => {
    console.log("Space Added");

      res = res + ' ';
      this.setState({
        change: '1'
      })
    
  }
  remove= () => {
    console.log("Removed");
    if (res!='')
    {
      res = res.slice(0, -1);
    }
    
    this.setState({
      change: '1'
    })
    
  }
  takePicture = () => {
    if (this.camera) {
      var photoo;
      let photo = this.camera.takePictureAsync().then((dataa) => {
          
        
        // s = new Sound(aud, (e) => { if (e) { console.log('Error in SOUND', e); return; } s.play(() => s.release()); });
        

        console.log(dataa.height);
        console.log(dataa.width);
        photoo = dataa.uri; 
        console.log(photoo);
        // ImagePicker.openCropper({
        //   path: photoo,
        //   width: maskColWidth,
        //   height: maskRowHeight
        // }).then(image => {
        //   console.log(image);
        // });
       
       var formData=new FormData();
       
       formData.append('file1', {uri: photoo, name: 'check.jpg', type: 'image/jpg'});

        const config = {
          headers: {
              'content-type': 'multipart/form-data'}
          };

        axios.post('http://192.168.1.105/hand_rec',formData,config).then(result => {
        
        res = res + result.data.resp;
       
        console.log(res);
        
        this.setState({
          change: '1'
        })

        // Alert.alert(
        //   'Response',
        //   'LABEL RETURNED:'+res,
        //   [
        //     {text: 'OK', onPress: () => console.log('Yes Pressed')}
        //   ],
        //   { cancelable: true } 
        // )
    
        }).catch(error => {
            console.log("api call failed" + error);
            
        });

      
    });
  
    }

}
sync()
{
  console.log("Synced");
}

realtimehandler= () => {
  if (realtime == '1')
  {
    realtime = '0';
    colorr = "#ff0000";
    console.log("Switched to Click");
    mode = 'Mode: Capture (Click to change)';
    
  }
  else
  {
    realtime = '1';
    colorr = "#00ff00";
    console.log("Switched to Realtime");
    mode = 'Mode: Realtime (Click to change)';
    
  }
  this.setState({
    change: '1'
  })
  

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
      
      if (realtime==1)
      {
        setTimeout(() => {this.takePicture()}, 5000);
        
      }
      return (
        <View style={{ flex: 1 }}>
              <Camera style={{ flex:1 }} type={this.state.cameraType} 
              ref={ref => {
                this.camera = ref;
               }}
          >
          
             <View style={stylescam.maskOutter} >
               
              <View style={[{ flex: maskRowHeight  }, stylescam.maskRow, stylescam.maskFrame]} />
              
              <Text style={{color: '#fffaf0', fontSize: 35, fontFamily: 'Roboto' , fontWeight: 'bold',textAlign:'center', backgroundColor: 'rgba(1,1,1,0.6)',width: Dimensions.get('window').width}}>{res}</Text>
              <View style={[{ flex: 20 }, stylescam.maskCenter]}>      
               <View style={[{ width: maskColWidth }, stylescam.maskFrame]} />
               <TouchableOpacity style={stylescam.maskCenter} onPress={this.remove} onLongPress={this.addspace}>
               
               <View style={stylescam.maskInner} />
              <View style={[{ width: maskColWidth }, stylescam.maskFrame]} />
              </TouchableOpacity>
            </View>
            
            <Text onPress={this.realtimehandler}
                    style={{color: colorr,textAlign:'center',fontSize: 25,backgroundColor: 'rgba(1,1,1,0.6)',width: Dimensions.get('window').width}}>
              {mode}
              </Text> 
           
          <View style={[{ flex: maskRowHeight }, stylescam.maskRow, stylescam.maskFrame]} />
  
        </View>
              
          <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
          <TouchableOpacity
              style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',                  
            }}
            onPress={()=>this.pickImage()}
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
  state = {
    changee : ''
  }
  constructor () {
    super()

    
    // this.database = app.database().ref().child(ltextinp1);
    


    
  }
  componentDidMount(){
    // this.database.on('value',snap=>{
    
    //   console.log(snap.val());
    //   console.log(snap.val());

    //   urlimage = snap.val();
    //   this.setState({
    //     changee: urlimage
    //   })
    //   console.log(urlimage);


    // });
  }
      
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
        'what is today\'s date': require('./assets/whatistoday\'sdate.gif'),
        'what is your name': require('./assets/whatisyourname.gif'),
        'whats up': require('./assets/whatsup.gif'),
        'where is the police station': require('./assets/whereisthepolicestation.gif'),
        'you were wrong': require('./assets/youarewrong.gif'),
        'yup': require('./assets/yup.jpg'),
        'a': require('./assets/a.jpeg'),
        'b': require('./assets/b.jpeg'),
        'c': require('./assets/c.jpeg'),
        'd': require('./assets/d.jpeg'),
        'e': require('./assets/e.jpeg'),
        'f': require('./assets/f.jpeg'),
        'g': require('./assets/g.jpeg'),
        'h': require('./assets/h.jpeg'),
        'i': require('./assets/i.jpeg'),
        'j': require('./assets/j.jpeg'),
        'k': require('./assets/k.jpeg'),
        'l': require('./assets/l.jpeg'),
        'm': require('./assets/m.jpeg'),
        'n': require('./assets/n.jpeg'),
        'o': require('./assets/o.jpeg'),
        'p': require('./assets/p.jpeg'),
        'q': require('./assets/q.jpeg'),
        'r': require('./assets/r.jpeg'),
        's': require('./assets/s.jpeg'),
        't': require('./assets/t.jpeg'),
        'u': require('./assets/u.jpeg'),
        'v': require('./assets/v.jpeg'),
        'w': require('./assets/w.jpeg'),
        'x': require('./assets/x.jpeg'),
        'y': require('./assets/y.jpeg'),
        'z': require('./assets/z.jpeg'),
        '0': require('./assets/0.jpeg'),
        '1': require('./assets/1.jpeg'),
        '2': require('./assets/2.jpeg'),
        '3': require('./assets/3.jpeg'),
        '4': require('./assets/4.jpeg'),
        '5': require('./assets/5.jpeg'),
        '6': require('./assets/6.jpeg'),
        '7': require('./assets/7.jpeg'),
        '8': require('./assets/8.jpeg'),
        '9': require('./assets/9.jpeg')

      }
  
      console.log(urlimage);
      if(ltextinp1 in IMAGES)
      {
      return (  
      <View style={style2.container}>
      <ScrollView>
        
      <View style={{ flex: 1 , justifyContent: 'flex-start',alignItems:'center', flexDirection: 'column', backgroundColor: 'transparent'}}>
         

        <Image
          style={{ width: 390, height: 250 }}
          // source={{uri: urlimage}}
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
        </View>
      );
    }
    else
    {
      var alpha = [];
      alpha = ltextinp1.split("");

      return (  
        <View style={style2.container}>
      <ScrollView>
        <View style={{ flex: 1 , justifyContent: 'flex-start',alignItems:'center', flexDirection: 'column'}}>
         
         
         {alpha.map((item, key) => (
            
            <Image
            style={{ width: 400, height: 400 }}
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
          </View>
        );
    }
  }
}
  

class UserInputs extends Component{
  
  state = {
    textinp: '',
    allimages: [],
    changeee: ''
  }
  
  constructor()
  {
    super()
    // this.database = app.database().ref().child('text');
    
    // this.database.once('value').then(snapshot => {

    //   const uType = snapshot.val();
    //   // this.setState({ allimages: snapshot.val() });
      
    //   allimg = uType;

    //   this.setState({ changeee: 'hello'});
    //   console.log(snapshot.val());
    //   console.log(allimg);

      
    // });
    
  }

  
  
 handleTextInp = (text) => {
    this.setState({ textinp: text }),
    textinp1 = text;
    ltextinp1 = textinp1.toLowerCase(); 
 }

 render() {
  console.log(allimg);

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
const stylescam = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
});

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