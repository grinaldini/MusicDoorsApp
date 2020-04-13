import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Button,
  Text,
  Platform,
  TouchableOpacity,
  ListView,
  ActivityIndicator,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import {Swipeable} from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';

import {AuthContext, StateContext, GalleryContext, SchoolContext, ResetContext} from './context';
//import {HeaderTitle} from '@react-navigation/stack';
//import { doesNotReject } from 'assert';
//import { monitorEventLoopDelay } from 'perf_hooks';
//import { InvalidatedProjectKind } from 'typescript';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Lightbox from 'react-native-lightbox';
import {ScrollView} from 'react-native-gesture-handler';

import GetGallery from './API/Gallery/getGallery';

import AdminDirectorL1 from './API/User/Admin/list1Director';
import AdminStudentL2 from './API/User/Admin/list2Student';

import StudentInstructorL1 from './API/User/Student/list1Instructor';
import AvailableAppt from './API/User/Student/list2AvailableAppt';
import InstAvailableAppt from './API/User/Student/list3InstAvailableAppt';
import RequestAppointment from './API/User/Student/Appointment/requestAppt';
import InstructorData from './API/User/Student/Appointment/instructorData';

import AccessCodeList from './API/AccessCode/listAccessCode';
import CreateAccessCode from './API/AccessCode/createAccessCode';
import DeleteAccessCode from './API/AccessCode/deleteAccessCode';



import CalendarPicker from 'react-native-calendar-picker';
import AllAppt from './API/User/Student/Appointment/studentShowAllAppt';




const userTypes = [
  {
    id: 2,
    name:"Director"
  },
  {
    id:3,
    name:"Student"
  },
  {
    id:4,
    name:"Private Student"
  },
  {
    id:5,
    name:"Instructor"
  }
];

const items = [
  {
    id: 1,
    name: "Bassoon"
  },
  {
    id: 2,
    name: "Cello"
  },
  {
    id: 3,
    name: "Clarinet"
  },
  {
    id: 4,
    name: "Double Bass"
  },
  {
    id: 5,
    name: "Euphonium"
  },
  {
    id: 6,
    name: "Flute"
  },
  {
    id: 7,
    name: "French Horn"
  },
  {
    id: 8,
    name: "Harp"
  },
  {
    id: 9,
    name: "Oboe"
  },
  {
    id: 10,
    name: "Percussion"
  },
  {
    id: 11,
    name: "Piano"
  },
  {
    id: 12,
    name: "Saxophone"
  },
  {
    id: 13,
    name: "Trombone"
  },
  {
    id: 14,
    name: "Trumpet"
  },
  {
    id: 15,
    name: "Tuba"
  },
  {
    id: 16,
    name: "Viola"
  },
  {
    id: 17,
    name: "Violin"
  },
];

const ScreenContainer = ({children}) => (
  <View style={styles.container}>{children}</View>
);

export const Welcome = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Image
        source={{uri:'http://musicdoors.org/Assets/HeaderImages/logo.png'}}
        style={styles.logo}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => navigation.push('SignIn')}>
        <Text style={styles.TextStyle}> Sign In </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => navigation.push('DirectorCreateAccount')}>
        <Text style={styles.TextStyle}> Director Sign Up </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => navigation.push('StudentCreateAccount')}>
        <Text style={styles.TextStyle}> Student Sign Up </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => navigation.push('PrivateStudentCreateAccount')}>
        <Text style={styles.TextStyle}> Private Student Sign Up </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => navigation.push('InstructorCreateAccount')}>
        <Text style={styles.TextStyle}> Instructor Sign Up </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};
// test 'directorSchool1@gmail.com', 'password_directorSchool1'
export const SignIn = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);
  const [email, setEmail] = useState('Email');
  const [password, setPassword] = useState('Password');
  return (
    <ScreenContainer>
      <TextInput
        placeholder="Email"
        underlineColorAndroid="transparent"
        onChangeText={val => setEmail(val)}
        autoCapitalize="none"
        style={styles.TextInputStyleClass}
      />
      <TextInput
        placeholder="Password"
        underlineColorAndroid="transparent"
        onChangeText={val => setPassword(val)}
        autoCapitalize="none"
        style={styles.TextInputStyleClass}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => navigation.push('ForgotPassword')}>
        <Text style={styles.TextStyle}> Forgot Password </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => signIn(email, password)}>
        <Text style={styles.TextStyle}> Log In </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const ForgotPassword = ({navigation}) => {
  const {sendResetCode} = React.useContext(ResetContext);
  const [email, setEmail] = useState('Email');
  const [userTypeId, setUserTypeId] = useState(null);
  return (
    <ScreenContainer>
      <TextInput
        placeholder="Email"
        underlineColorAndroid="transparent"
        onChangeText={val => setEmail(val)}
        autoCapitalize="none"
        style={styles.TextInputStyleClass}
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setUserTypeId(item.id)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={userTypes}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Select User Type"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => sendResetCode(email, userTypeId)}
      >
        <Text style={styles.TextStyle}> Send Code </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => navigation.push('ResetPassword')}>
        <Text style={styles.TextStyle}> Reset Password </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const ResetPassword = ({navigation}) => {
  const {resetPassword} = React.useContext(ResetContext);
  const [resetCode, setResetCode] = useState('Reset Code');
  const [newPassword, setNewPassword] = useState('New Password');
  const [confPassword, setConfPassword] = useState('Confirm New Password');
  return (
    <ScreenContainer>
       <TextInput
        placeholder="Reset Code"
        underlineColorAndroid="transparent"
        onChangeText={val => setResetCode(val)}
        autoCapitalize="none"
        style={styles.TextInputStyleClass}
      />
      <TextInput
        placeholder="New Password"
        underlineColorAndroid="transparent"
        onChangeText={val => setNewPassword(val)}
        autoCapitalize="none"
        style={styles.TextInputStyleClass}
      />
      <TextInput
        placeholder="Confirm New Password"
        underlineColorAndroid="transparent"
        onChangeText={val => setConfPassword(val)}
        autoCapitalize="none"
        style={styles.TextInputStyleClass}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => resetPassword(resetCode, newPassword, confPassword)}>
        <Text style={styles.TextStyle}> Reset </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

//For all screens use userProfile.(attribute from mainTable on host gator) to get user attributes (from state context defined in App.js)

/*
Administrator Screens
  + Profile Screen
  + Homes Screen
  + Code Generator Screen

  
*/
export const AdminProfile = ({navigation, route}) => {
  const {signOut} = React.useContext(AuthContext);

  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;
  return (
    <ScreenContainer>
      <Text>
        Admin Profile Screen {userProfile ? userProfile.email : 'abc'}
      </Text>
      <Button title="Edit Admin Profile" onPress={() => navigation.push('Edit Profile',{name: 'Edit Admin Profile '})}/>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};


export const AdminHome = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;


  return (
    <ScreenContainer>
      <Text>Master List Screen</Text>
      <Text>{userProfile ? userProfile.email : 'abc'}</Text>
      <Button
        title="Director List"
        onPress={() => navigation.push('Director List')}
      />
      <Button
        title="Private Student List"
        onPress={() =>
          navigation.push('Details', {name: 'React Native School'})
        }
      />
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </ScreenContainer>
  );
};

export const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: .5,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
};


export const AdminDirectorList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [user, setUser] = React.useState(null);

  AdminDirectorL1.getDirectorList()
    .then(data=>data.json())
    .then(data=>{
      setUser(data);
    });

  //console.log(user);
  
  return (
    <ScreenContainer>
      <View style = {userListStyles.MainContainer}>
          <FlatList
          
          data={user}
          
          ItemSeparatorComponent = {FlatListItemSeparator}

          renderItem={({item}) => 
              <TouchableHighlight onPress={() => navigation.push('Admin Student List', {parent: item})} underlayColor={'#FF5722'}>
                <View style={{flex:1, flexDirection: 'row'}}>
                  <Image source = {{ uri: item.avatar }} style={userListStyles.imageView} />
                  <Text style={userListStyles.textView}>{item.first_name} {item.last_name}{"\n"}{item.current_school}{"\n"}{item.email}{"\n"}{item.phone_number}</Text>
                </View>
              </TouchableHighlight>
          }

          keyExtractor={(item, index) => index.toString()}
          
          />
      </View>
    </ScreenContainer>
  );
};


export const AdminStudentList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [studentUser, setStudentUser] = React.useState(null);

  console.log(route.params.parent.current_school)
  AdminStudentL2.getStudentList(route.params.parent.current_school)
    .then(data2=>data2.json())
    .then(data2=>{
      if (data2.length > 0) {
        setStudentUser(data2);
      
      }
      if (data2 === false) {
        Alert.alert(
          'No Students Registered Under Director',
        );
      }
      
    });

  console.log(studentUser);

  return (
    <ScreenContainer>
      <View style = {userListStyles.MainContainer}>
          <FlatList
          
          data={studentUser}
          
          ItemSeparatorComponent = {FlatListItemSeparator}

          renderItem={({item}) => 
              <TouchableHighlight  underlayColor={'#FF5722'}>
                <View style={{flex:1, flexDirection: 'row'}}>
                  <Image source = {{ uri: item.avatar }} style={userListStyles.imageView} />
                  <Text style={userListStyles.textView}>{item.first_name} {item.last_name}{"\n"}{item.current_school}{"\n"}{item.target_school}{"\n"}{item.email}</Text>
                </View>
              </TouchableHighlight>
          }

          keyExtractor={(item, index) => index.toString()}
          
          />
      </View>
      <Text>{route.params.parent.current_school}</Text>
    </ScreenContainer>
  );
};

export const AdminCodeGenerator = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;


  return (
    <ScreenContainer>
      <Text>Code Generator</Text>
      <Button
        title="Create Access Code"
        onPress={() => navigation.push('Create Access Code')}
      />
      <Button
        title="Delete Access Code"
        onPress={() =>
          navigation.push('Delete Access Code')}
      />
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </ScreenContainer>
  );
};

export const AdminCreateAccessCode = ({navigation,route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [description, setDescription] = React.useState(null);
  const [user_type_id, setUserTypeId] = React.useState(null);


  moment.locale('en');
  var part1 = moment().format('l');
  part1 = part1.replace('/','');
  part1 = part1.replace('/','');
  var part2 = moment().format('LTS');
  part2 = part2.replace(/:/g, '');
  part2 = part2.replace(/PM/g, '');
  part2 = part2.replace(/AM/g, '');
  
  var code = part2 + part1;
  var code = code.replace(/ /, '');
  console.log(code);

  return (
    <ScreenContainer>
      <TextInput
        placeholder="Description"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setDescription(val)}
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setUserTypeId(item.id)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={userTypes}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Select User Type"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => {
          CreateAccessCode.createAC(
            code,
            user_type_id,
            description,
            moment().format('llll'),
          )
            .then(data => data.json)
            .then(data => {
              if (data === false) {
                Alert.alert('Error Adding Access Code, Try Again Later');
              } else {
                Alert.alert('Successfully Added Unique Access Code');
              }
            });
        }}>
        <Text style={styles.TextStyle}> Create Access Code </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const AdminDeleteAccessCode = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [acList, setAC] = React.useState(null);

  AccessCodeList.getAC()
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAC(data2);
      }
      if (data2 === false) {
        Alert.alert('No Access Codes Available');
      }
    });

  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={acList}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                source={{uri: 'http://musicdoors.org/Assets/generalCode.jpg'}}
                style={userListStyles.imageView}
              />
              <Text
                style={userListStyles.textView}
                onPress={() => {
                    Alert.alert(
                      'Delete',
                      item.code,
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Yes', 
                          onPress: () =>{
                            DeleteAccessCode.deleteAC(item.code, item.user_type_id)
                            .then(data => data.json())
                            .then(data => {
                              if (data === false) {
                                Alert.alert('Deleted Successfully');
                              } else {
                                ('Not Deleted, Try Again Later');
                              }
                            }); 
                          }
                        },
                      ],
                      {cancelable: false},
                    );
                  }
                }>
                {item.code}
                {'\n'}
                {item.description}
                {'\n'}
                {item.dateString}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScreenContainer>
  );
};

/*
Director Screens
  + CreateAccount => NULL Values: (avatar,description(for now)) , street_address, feeder_school, instrument, instrument_2, instrument_3
  + Profile Screen
*/
export const DirectorCreateAccount = () => {
  const {signUp} = React.useContext(AuthContext);

  const user_type_id = 2;

  const [email, setEmail] = React .useState(null);
  const [password, setPass] = React .useState(null);
  const [first_name, setFName] = React .useState(null);
  const [last_name, setLName] = React .useState(null);
  const [phone_number, setPN] = React. useState(null);
  const [city, setCity] = React.useState(null);
  const [st, setS] = React.useState(null);
  const [zip_code, setZC] = React.useState(null);
  const [current_school, setCS] = React.useState(null);

  const [code, setAccessCode] = React.useState(0);

  const street_address = null;
  const feeder_school = null;
  const instrument = null;
  const instrument_2 = null;
  const instrument_3 = null;

  return (
    <ScreenContainer>
       <TextInput
        placeholder="Enter Email"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setEmail(val)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter Password"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setPass(val)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter First Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setFName(val)}
      />
      <TextInput
        placeholder="Enter Last Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setLName(val)}
      />
      <TextInput
        placeholder="Enter Current School"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setCS(val)}
      />
      <TextInput
        placeholder="Enter Phone Number"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setPN(val)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter City"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setCity(val)}
      />
      <TextInput
        placeholder="Enter State"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setS(val)}
      />

      <TextInput
        placeholder="Enter Zip Code"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setZC(val)}
      />
      <TextInput
        placeholder="Access Code"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setAccessCode(val)}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => signUp(user_type_id,email,password,first_name,last_name,phone_number, street_address, city,st,zip_code,feeder_school,current_school,instrument,instrument_2,instrument_3,code)}>
        <Text style={styles.TextStyle}> Create Account </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const DirectorProfile = ({navigation, route}) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Director Profile Screen</Text>
      <Button title="Edit Director Profile" onPress={() => navigation.push('Edit Profile', {name: 'Edit Director Profile '})}/>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

export const DirectorHome = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Home</Text>
      <Text>{userProfile ? userProfile.email : 'abc'}</Text>
      <Button
        title="User Lists"
        onPress={() =>
          navigation.push('Details', {name: 'React Native by Example '})
        }
      />
      <Button
        title="Appointment List"
        onPress={() =>
          navigation.push('Details', {name: 'React Native School'})
        }
      />
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </ScreenContainer>
  );
};

/*
Student Screens
  + Create Account => NULL Values: (avatar,description(for now)) , street_address
  + Profile Screen
*/
export const StudentCreateAccount = () => {
  const {signUp} = React.useContext(AuthContext);

  const user_type_id = 3;

  const [email, setEmail] = React .useState(false);
  const [password, setPass] = React .useState(false);
  const [first_name, setFName] = React .useState(false);
  const [last_name, setLName] = React .useState(false);
  const [instrument, setInstrument] = React.useState(false);
  const [instrument_2, setInstrument2] = React.useState(false);
  const [instrument_3, setInstrument3] = React.useState(false);
  const [current_school, setCS] = React.useState(false);
  const [feeder_school, setFS] = React.useState(false);
  const [city, setCity] = React.useState(false);
  const [st, setS] = React.useState(false);
  const [zip_code, setZC] = React.useState(false);

  const [code, setAccessCode] = React.useState(0);

  const street_address = false;
  const phone_number = false;

  /*
  const items = [
    {
      id: 1,
      name: 'Violin',
    },
    {
      id: 2,
      name: 'Trumpet',
    },
    {
      id: 3,
      name: 'Clarinet',
    },
  ];
  */

  return (
    <ScreenContainer>
      <TextInput
        placeholder="Enter Email"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setEmail(val)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter Password"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setPass(val)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter First Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setFName(val)}
      />
      <TextInput
        placeholder="Enter Last Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setLName(val)}
      />

      <TextInput
        placeholder="Enter City"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setCity(val)}
      />

      <TextInput
        placeholder="Enter State"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setS(val)}
      />

      <TextInput
        placeholder="Enter Zip Code"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setZC(val)}
      />

      <TextInput
        placeholder="Enter Current School"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setCS(val)}
      />

      <TextInput
        placeholder="Enter Feeder High School"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setFS(val)}
      />

      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setInstrument(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={items}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Select Instrument"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setInstrument2(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={items}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Optional Second Instrument"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setInstrument3(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={items}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Optional Third Instrument"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />

      <TextInput
        placeholder="Access Code"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setAccessCode(val)}
      />

      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => signUp(user_type_id,email,password,first_name,last_name,phone_number, street_address, city,st,zip_code,feeder_school,current_school,instrument,instrument_2,instrument_3,code)}>
        <Text style={styles.TextStyle}> Create Account </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const StudentProfile = ({navigation, route}) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Student Profile Screen</Text>
      <Button title="Edit Student Profile" onPress={() => navigation.push('Edit Profile', {name: 'Edit Student Profile '})}/>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

export const StudentHome = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;
  return (
      <ScreenContainer>
        <Text>Student Home</Text>
        <Text>{userProfile ? userProfile.email : 'abc'}</Text>
        <Button
          title="Instructor List"
          onPress={() => navigation.push('Instructor List')}
        />
        <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      </ScreenContainer>
  );
};

export const StudentAppointment = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Button
        title="Appointment"
        onPress={() => navigation.push('Appointment')}
      />
      <Button
        title="Pending Appointment"
        onPress={() => navigation.push('Appointment Request')}
      />
      <Button
        title="Cancel Appointment"
        onPress={() => navigation.push('Cancel Appointment')}
      />
    </ScreenContainer>
  );
};

export const StudentAppointmentList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [appt, setAppt] = React.useState(null);
  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);

  AllAppt.getAllAppt(userProfile.id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAppt(data2);
      } else {
        Alert.alert('No Appointments');
      }
    });
  
  //InstructorData.getInfo()
  return (
      <ScreenContainer>
        <View style={userListStyles.MainContainer}>
              <FlatList
                data={appt}
                ItemSeparatorComponent={FlatListItemSeparator}
                renderItem={({item}) => (
                  <TouchableHighlight
                  onPress={() =>
                    navigation.push('Appointment Info', {instructor_id: item.instructor_id})
                  }
                  underlayColor={'#FF5722'}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image
                          source={{uri: 'http://musicdoors.org/Assets/generalAppointment.jpg'}}
                          style={userListStyles.imageView}
                        />
                        <Text style={userListStyles.textView}>
                          {item.date}
                          {'\n\n'}
                          {item.start}
                          {'-'}
                          {item.end}
                          {'\n\n'}
                        </Text>   
                      </View>
                  </TouchableHighlight>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
        </View>
      </ScreenContainer>
    );
};

export const StudentAppointmentInfo = ({navigation,route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;
  const [apptInfo, setAI] = React.useState([]);

  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);
  const [check, setCheck] = React.useState(0);
  InstructorData.getApptInfo(route.params.instructor_id)
    .then(data => data.json())
    .then(data =>{
      //console.log(data);
      if (data === false) {
        Alert.alert('Error, Try Again Later');
      } else {
        setAI(data[0]);
        setCheck(1);
      }
    }); 

  console.log(check);
  if(check > 0){
    return (
      <ScreenContainer>
      <ScrollView>
          <View style={profilePage.container}>
            <View style={[profilePage.card, profilePage.profileCard]}> 
              <Image style={profilePage.avatar} source={{uri: apptInfo.avatar}} />
              <Text style={profilePage.name}>
                {apptInfo.first_name} {apptInfo.last_name}
              </Text>
            </View> 
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>Contact Info</Text>
              <Text> -  {apptInfo.street_address}</Text>
              <Text> -  {apptInfo.city},{apptInfo.state},{apptInfo.zip_code}</Text>
              <Text> -  {apptInfo.phone_number}</Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>About</Text>
              <Text> -  Instrument: {apptInfo.instrument}</Text>
              <Text> -  Description:  {apptInfo.description}</Text>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }else{
    return(
      <ScreenContainer>
        <ActivityIndicator size="large" color="#c70046" />
      </ScreenContainer>
    );
  }
};

export const StudentPendingAppointmentList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [appt, setAppt] = React.useState(null);
  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);

  AllAppt.getAllAppt(userProfile.id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAppt(data2);
      } else {
        Alert.alert('No Appointments Requested');
      }
    });
  
  InstructorData.getInfo()

  //console.log(user);

  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={appt}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{uri: 'http://musicdoors.org/Assets/generalAppointment.jpg'}}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.first_name} {item.last_name}
                  {'\n'}
                  {item.feeder_school}
                  {'\n'}
                  {item.email}
                  {'\n'}
                  {item.phone_number}
                </Text>
                <TouchableOpacity
                   activeOpacity={0.4}
                   style={styles.TouchableOpacityStyle}
                   onPress={() => console.log("cancel appointment")}>
                   <Text style={styles.TextStyle}> Cancel </Text>
                </TouchableOpacity>r3
              </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScreenContainer>
  );
};


export const StudentCancelAppointmentList = ({navigation,route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [appt, setAppt] = React.useState(null);
  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);

  AllAppt.getAllAppt(userProfile.id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAppt(data2);
      } else {
        Alert.alert('No Appointments Requested');
      }
    });
  
  InstructorData.getInfo()

  //console.log(user);

  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={appt}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{uri: 'http://musicdoors.org/Assets/generalAppointment.jpg'}}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.first_name} {item.last_name}
                  {'\n'}
                  {item.feeder_school}
                  {'\n'}
                  {item.email}
                  {'\n'}
                  {item.phone_number}
                </Text>
                <TouchableOpacity
                   activeOpacity={0.4}
                   style={styles.TouchableOpacityStyle}
                   onPress={() => console.log("cancel appointment")}>
                   <Text style={styles.TextStyle}> Cancel </Text>
                </TouchableOpacity>r3
              </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScreenContainer>
  );
};



export const StudentInstructorList = ({navigation,route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [user, setUser] = React.useState(null);
  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);

  StudentInstructorL1.getInstructorList(
    userProfile.feeder_school,
    userProfile.instrument,
    userProfile.instrument_2,
    userProfile.instrument_3,
  )
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setUser(data2);
      } else {
        Alert.alert('No instructor with same instrument in your area');
      }
    });

  //console.log(user);

  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={user}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() =>
                navigation.push('Booking Calendar', {parent: item})
              }
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{uri: item.avatar}}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.first_name} {item.last_name}
                  {'\n'}
                  {item.feeder_school}
                  {'\n'}
                  {item.email}
                  {'\n'}
                  {item.phone_number}
                </Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScreenContainer>
  );
};



export const StudentBookingCalendar = ({route, navigation}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;
  const [choice, setChoice] = React.useState(null);
  const [customDatesStyles, setSC] = React.useState([]);
  //const [customDatesStyles, setSC] = React.useState(null);

  //console.log(route.params.parent.id);

  let today = moment();
  let day = today.clone().startOf('month');

  //console.log(day.clone());

  AvailableAppt.getAllAppt(route.params.parent.id)
    .then(data => data.json())
    .then(data => {
      //console.log(data2)
      if (data.length > 0) {
        var data2 = data.map(function(item) {
          let date = moment(item.date, 'MM/DD/YYYY');
          return {
            "date": date.clone(),
            "style": {backgroundColor: '#00FF7F'},
            "textStyle": {color: 'black'},
            "containerStyle": [],
          };
        });
        //console.log([data2])
        setSC(data2);
      } else {
        Alert.alert('No Appt Available');
      }
    });
  /*
    onDateChange={val => {
      setChoice(val.format('l'));
      navigation.push('Appointment Request', {
        date: choice,
        id: route.params.parent.id,
      });
    }}
*/
  //console.log(customDatesStyles);
  //console.log(user);
  return (
    <ScreenContainer>
    <View style={styles.container}>
        <CalendarPicker   
          todayBackgroundColor = "#00BCD4"
          selectedDayColor="#FF5722"
          onDateChange= {(val)=>{ 
          //console.log(val.format('l'));
          navigation.push("Appointment Request", {date:val.format('l'), id: route.params.parent.id});}}
          customDatesStyles= {customDatesStyles}
          minDate={moment()}
          disabledDates = {(val)=>
          {
            if((customDatesStyles.some(item => val.format('l') === item.date.format('l')))===false){
              return true;
            } else {
              return false;
            }
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export const StudentAppointmentRequest = ({navigation,route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [date, setDate] = React.useState('');
  //console.log(user);

  const [appt, setAppt] = React.useState([]);

  InstAvailableAppt.getInstAppt(route.params.id, route.params.date)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAppt(data2);
      }
      if (data2 === false) {
        Alert.alert('No Appt Available');
      }
    });

  return (
    <ScreenContainer>
      <FlatList
          data={appt}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                source={{uri: 'http://musicdoors.org/Assets/generalAppointment.jpg'}}
                style={userListStyles.imageView}
              />
              <Text
                style={userListStyles.textView}
                onPress={() => {
                  //const textString = 'Requesting Appointment on: ' + toString(item.date) + '\nFrom: ' + toString(item.start) + '\nTo: ' + toString(item.end);
                   // textString = toString(textString)
                  console.log(typeof(userProfile.id));
                  console.log(typeof(item.instructor_id));
                  console.log(typeof(item.date));
                  console.log(typeof(item.start));
                  console.log(typeof(item.end));
                  Alert.alert(
                    'Requesting Appointment',
                    `Date: ${item.date} \nFrom: ${item.start} \nTo: ${item.end}\n`,
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          RequestAppointment.reqAppt(
                            userProfile.id,
                            item.instructor_id,
                            item.date,
                            item.start,
                            item.end,)
                            .then(data3 => data3.json())
                            .then(data3 => {
                              console.log(data3);
                              if (data3 === false) {
                                Alert.alert('Did Not Book, Try Again Later');
                              }
                              if (data3.length > 0) {
                                Alert.alert('Requested Successfully');
                              }
                            });
                        },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              {item.date}
              {'\n\n'}
              {item.start}
              {'-'}
              {item.end}
              {'\n\n'}
              Available: {item.available}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScreenContainer>
  );
};

/*
Private Student Screens
  + Create Account => NULL Values: (avatar,description(for now)) , street_address, feeder_school, current_school
  + Profile Screen
*/
export const PrivateStudentCreateAccount = () => {
  const {signUp} = React.useContext(AuthContext);

  const user_type_id = 4;

  const [email, setEmail] = React .useState('');
  const [password, setPass] = React .useState('');
  const [first_name, setFName] = React .useState('');
  const [last_name, setLName] = React .useState('');
  const [instrument, setInstrument] = React.useState('');
  const [instrument_2, setInstrument2] = React.useState('');
  const [instrument_3, setInstrument3] = React.useState('');
  const [city, setCity] = React.useState('');
  const [st, setS] = React.useState('');
  const [zip_code, setZC] = React.useState(0);

  const [code, setAccessCode] = React.useState(0);

  const street_address = null;
  const phone_number = null;
  const feeder_school = null;
  const current_school = null;

  /*
  const items = [
    {
      id: 1,
      name: 'Violin',
    },
    {
      id: 2,
      name: 'Trumpet',
    },
    {
      id: 3,
      name: 'Clarinet',
    },
  ];
  */
  return (
    <ScreenContainer>
      <TextInput
        placeholder="Enter Email"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setEmail(val)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter Password"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setPass(val)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter First Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setFName(val)}
      />
      <TextInput
        placeholder="Enter Last Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setLName(val)}
      />
      <TextInput
        placeholder="Enter City"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setCity(val)}
      />
      <TextInput
        placeholder="Enter State"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setS(val)}
      />

      <TextInput
        placeholder="Enter Zip Code"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setZC(val)}
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setInstrument(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={items}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Select Instrument"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setInstrument2(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={items}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Optional Second Instrument"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setInstrument3(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={items}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Optional Third Instrument"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <TextInput
        placeholder="Access Code"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setAccessCode(val)}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => signUp(user_type_id, email, password, first_name, last_name, phone_number, street_address, city, st, zip_code, feeder_school, current_school, instrument, instrument_2, instrument_3, code)}>
        <Text style={styles.TextStyle}> Create Account </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const PrivateStudentProfile = ({navigation,route}) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Private Student Profile Screen</Text>
      <Button title="Edit Private Student Profile" onPress={() => navigation.push('Edit Profile', {name: 'Edit Private Student Profile'})}/>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

export const PrivateStudentHome = ({navigation,route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Private Student Home</Text>
      <Text>{userProfile ? userProfile.email : 'abc'}</Text>
      <Button
        title="Instructor List"
        onPress={() =>
          navigation.push('Details', {name: 'React Native by Example '})
        }
      />
      <Button
        title="Appointment List"
        onPress={() =>
          navigation.push('Details', {name: 'React Native School'})
        }
      />
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </ScreenContainer>
  );
};



/*
Instructor Screens
  + Create Account
  + Profile Screen
*/
export const InstructorCreateAccount = () => {
  const {signUp} = React.useContext(AuthContext);

  const schoolsInfoContext = React.useContext(SchoolContext);
  const [schools, setSchools] = schoolsInfoContext;

  const user_type_id = 5;

  const [email, setEmail] = React .useState('');
  const [password, setPass] = React .useState('');
  const [first_name, setFName] = React .useState('');
  const [last_name, setLName] = React .useState('');
  const [street_address, setSA] = React .useState('');
  const [phone_number, setPN] = React. useState('');
  const [feeder_school, setFS] = React.useState('');
  const [city, setCity] = React.useState('');
  const [st, setS] = React.useState('');
  const [zip_code, setZC] = React.useState(0);
  const [instrument, setInstrument] = React.useState('');
  const [instrument_2, setInstrument2] = React.useState('');
  const [instrument_3, setInstrument3] = React.useState('');

  const [code, setAccessCode] = React.useState(0);

  const current_school = null;

  /*
  const items = [
    {
      id: 1,
      name: 'Violin',
    },
    {
      id: 2,
      name: 'Trumpet',
    },
    {
      id: 3,
      name: 'Clarinet',
    },
  ];
  */

  return (
    <ScreenContainer>
      <TextInput
        placeholder="Enter Email"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setEmail(val)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter Password"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setPass(val)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter First Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setFName(val)}
      />
      <TextInput
        placeholder="Enter Last Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setLName(val)}
      />
      <TextInput
        placeholder="Enter Phone Number"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setPN(val)}
      />
      <TextInput
        placeholder="Enter Home Address"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setSA(val)}
      />
      <TextInput
        placeholder="Enter City"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setCity(val)}
      />
      <TextInput
        placeholder="Enter State"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setS(val)}
      />
      <TextInput
        placeholder="Enter Zip Code"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setZC(val)}
      />
      <TextInput
        placeholder="Enter Target High School"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setFS(val)}
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setFS(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={schools}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Enter Target High School"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setInstrument(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={items}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Select Instrument"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setInstrument2(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={items}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Optional Second Instrument"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setInstrument3(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={items}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Optional Third Instrument"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <TextInput
        placeholder="Access Code"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        onChangeText={val => setAccessCode(val)}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => signUp(user_type_id,email,password,first_name,last_name,phone_number, street_address, city,st,zip_code,feeder_school,current_school,instrument,instrument_2,instrument_3,code)}>
        <Text style={styles.TextStyle}> Create Account </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const InstructorProfile = ({navigation,route}) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Instructor Profile Screen</Text>
      <Button title="Edit Instructor Profile" onPress={() => navigation.push('Edit Profile', {name: 'Edit Instructor Profile'})}/>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

export const InstructorHome = ({navigation,route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>InstructorHome</Text>
      <Text>{userProfile ? userProfile.email : 'abc'}</Text>
      <Button
        title="Director List"
        onPress={() =>
          navigation.push('Details', {name: 'React Native by Example '})
        }
      />
      <Button
        title="Private Student List"
        onPress={() =>
          navigation.push('Details', {name: 'React Native School'})
        }
      />
      <Button
        title="Appointment List"
        onPress={() =>
          navigation.push('Details', {name: 'React Native School'})
        }
      />
      <Button
        title="Calendar"
        onPress={() =>
          navigation.push('Details', {name: 'React Native School'})
        }
      />
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </ScreenContainer>
  );
};

//In Progress Edit Profile Screens

export const EditAdminProfile = ({navigation,route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Details For Administrator</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};

export const EditDirectorProfile = ({navigation,route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return(
    <ScreenContainer>
      <Text>Details For Director</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};

export const EditStudentProfile = ({navigation,route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return(
  <ScreenContainer>
    <ScrollView>
    <View style={profilePage.container}>
      <View style={[profilePage.card, profilePage.profileCard]}> 
        <Image style={profilePage.avatar} source={{uri: userProfile.avatar}} />
        <Text style={profilePage.name}>
          {userProfile.first_name} {userProfile.last_name}
        </Text>
      </View> 
      <Button title="Upload Avatar" onPress={()=>{console.log("upload from photo library")}}/>
      <TextInput
        placeholder= {userProfile.email}
        underlineColorAndroid="transparent"
        style={styles2.TextInputStyleClass}
        onChangeText={val => setEmail(val)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder= {userProfile.password}
        underlineColorAndroid="transparent"
        style={styles2.TextInputStyleClass}
        onChangeText={val => setPass(val)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder= {userProfile.first_name}
        underlineColorAndroid="transparent"
        style={styles2.TextInputStyleClass}
        onChangeText={val => setFName(val)}
      />
      <TextInput
        placeholder= {userProfile.last_name}
        underlineColorAndroid="transparent"
        style={styles2.TextInputStyleClass}
        onChangeText={val => setLName(val)}
      />

      <TextInput
        placeholder= {userProfile.city}
        underlineColorAndroid="transparent"
        style={styles2.TextInputStyleClass}
        onChangeText={val => setCity(val)}
      />

      <TextInput
        placeholder= {userProfile.state}
        underlineColorAndroid="transparent"
        style={styles2.TextInputStyleClass}
        onChangeText={val => setS(val)}
      />

      <TextInput
        placeholder= {userProfile.zip_code}
        underlineColorAndroid="transparent"
        style={styles2.TextInputStyleClass}
        onChangeText={val => setZC(val)}
      />

      <TextInput
        placeholder= {userProfile.current_school}
        underlineColorAndroid="transparent"
        style={styles2.TextInputStyleClass}
        onChangeText={val => setCS(val)}
      />

      <TextInput
        placeholder= {userProfile.feeder_school}
        underlineColorAndroid="transparent"
        style={styles2.TextInputStyleClass}
        onChangeText={val => setFS(val)}
      />

      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setInstrument(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles2.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles2.ddInputStyle}
        itemStyle={styles2.ddItemStyle}
        itemTextStyle={styles2.ddItemTextStyle}
        itemsContainerStyle={styles2.ddItemsContainerStyle}
        items={items}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder= {userProfile.instrument}
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setInstrument2(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles2.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles2.ddInputStyle}
        itemStyle={styles2.ddItemStyle}
        itemTextStyle={styles2.ddItemTextStyle}
        itemsContainerStyle={styles2.ddItemsContainerStyle}
        items={items}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder={userProfile.instrument_2}
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setInstrument3(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles2.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles2.ddInputStyle}
        itemStyle={styles2.ddItemStyle}
        itemTextStyle={styles2.ddItemTextStyle}
        itemsContainerStyle={styles2.ddItemsContainerStyle}
        items={items}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder={userProfile.instrument_3}
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles2.TouchableOpacityStyle}
        onPress={() => {console.log("update student profile");}}
      >
        <Text style={styles2.TextStyle}> Update Account </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  </ScreenContainer>
  );
};
export const EditPrivateStudentProfile = ({navigation,route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return(
    <ScreenContainer>
      <Text>Details For Private Student</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};
export const EditInstructorProfile = ({navigation,route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return(
    <ScreenContainer>
      <Text>Details For Instructor</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};

export const Gallery = ({navigation,route}) => {
  const galleryContext = React.useContext(GalleryContext);
  const [galleryImages, setImages] = galleryContext;

  const width = Dimensions.get('window').width;

  const gridStyle = {
    width: "100%", 
    height: "100%",
    margin: "auto",
    resizeMode: "cover",
    borderWidth: 3,
    borderColor: "#fff"
  };

  const activeStyle = {
    width: "100%", 
    height: "100%",
    margin: "auto",
    resizeMode: "contain",
    borderWidth: 0
  };

  const screenWidth = Dimensions.get('window').width;
  return (
      <ScrollView>
        <View
          style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row'
        }}
        >
          {galleryImages.map((image, i) =>
            <View
              style={{
                width: screenWidth/2,
                height: screenWidth/2,
                padding: 2
              }}>
              <Lightbox
                activeProps={activeStyle}
                backgroundColor="rgba(0, 0, 0, 0.8)">
                <Image style={gridStyle} source={{uri: image.name}} key={i} />
              </Lightbox>
            </View>
          )}
        </View>
      </ScrollView>
    );
  
};

//Loading display for all users
export const Splash = () => (
  <ScreenContainer>
    <ActivityIndicator size="large" color="#FF5722" />
  </ScreenContainer>
);

/////////////////////////////Change to appropriate functional components for each user type

//Home => Start nesting lists
export const Home = ({navigation}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Master List Screen</Text>
      <Text>{userProfile ? userProfile.email : 'abc'}</Text>
      <Button
        title="React Native by Example"
        onPress={() =>
          navigation.push('Details', {name: 'React Native by Example '})
        }
      />
      <Button
      title="React Native School"
        onPress={() =>
          navigation.push('Details', {name: 'React Native School'})
        }
      />
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </ScreenContainer>
  );
};
//Search & Search2 => Student Appointment Status, Instructor Time Slot Creator and Appointment Confirmation
export const Search = ({navigation}) => {
  
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;
  
  return (
  <ScreenContainer>
    <Text>Search Screen</Text>
    <Button title="Search 2" onPress={() => navigation.push('Search2')} />
    <Button
      title="React Native School"
      onPress={() => {
        navigation.navigate('Home', {
          screen: 'Details',
          params: {name: 'React Native School'},
        });
      }}
    />
  </ScreenContainer>
  );
};

//Create copies of Details and Search2 for creating new screens
export const Search2 = () => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
  <ScreenContainer>
    <Text>Search2 Screen</Text>
  </ScreenContainer>

  );
};

//Admin Lists
//+ Directors and Private Student List
//+ Student List 
//+ Private Student List
//+ Instructor List

/*
const ListItem = ({ contact, onPress }) => {
  const iconName = Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward';
  const name = `${capitalizeFirstLetter(contact.name.first)} ${capitalizeFirstLetter(contact.name.last)}`;
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={colors.rowUnderlay}
    >
      <View style={listStyles.row}>
        <Image
          style={listStyles.avatar}
          source={{ uri: contact.picture.thumbnail }}
        />
        <View>
          <Text style={listStyles.name}>{name}</Text>
          <Text style={listStyles.email}>{contact.email}</Text>
        </View>
        <View style={listStyles.chevronContainer}>
          <Icon
            name={iconName}
            size={CHEVRON_SIZE}
            style={listStyles.chevron}
            color={colors.subtleText}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};
*/

export const AdminDetails = ({route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Details Screen</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};

/*
export const AdminDirectorList = ({route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Details Screen</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};
*/

export const AdminPrivateStudentList = ({route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Details Screen</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};

export const AdminInstructorList = ({route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Details Screen</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};

//Details => Music Doors User Details
export const Details = ({route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Details Screen</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};


//Style Sheet => IOS and Android
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },

  MainContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },

  MainContainer_For_Show_StudentList_Activity: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
    marginLeft: 5,
    marginRight: 5,
  },

  TextInputStyleClass: {
    textAlign: 'center',
    width: '90%',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 5,
  },

  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: '90%',
    backgroundColor: '#00BCD4',
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    
  },

  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 500,
  },
  ddInputStyle: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#FF5722',
    textAlign: 'center',
  },
  ddItemStyle: {
    //single dropdown item style
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    padding: 12,
    marginTop: 2,
    borderColor: '#FF5722',
    borderWidth: 1,
    textAlign: 'center',
  },
  ddItemTextStyle: {
    color: '#222',
    textAlign: 'center',
  },
  ddContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: '90%',
    textAlign: 'center',
  },
  ddItemContainerStyle: {
    //items container style you can pass maxHeight
    //to restrict the items dropdown hieght
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: '90%',
    maxHeight: '60%',
    textAlign: 'center',
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },

  MainContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },

  MainContainer_For_Show_StudentList_Activity: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
    marginLeft: 5,
    marginRight: 5,
  },

  TextInputStyleClass: {
    textAlign: 'center',
    width: '90%',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#00BCD4',
    backgroundColor: '#fff',
    borderRadius: 5,
  },

  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: '90%',
    backgroundColor: '#00BCD4',
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },

  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 500,
  },
  ddInputStyle: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#00BCD4',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  ddItemStyle: {
    //single dropdown item style
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    padding: 12,
    marginTop: 2,
    borderColor: '#00BCD4',
    borderWidth: 1,
    textAlign: 'center',
  },
  ddItemTextStyle: {
    color: '#222',
    textAlign: 'center',
  },
  ddContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: '90%',
    textAlign: 'center',
  },
  ddItemContainerStyle: {
    //items container style you can pass maxHeight
    //to restrict the items dropdown hieght
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: '90%',
    maxHeight: '60%',
    textAlign: 'center',
  },
});

const PickerStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#d3d3d3',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
  },

  selectLabelTextStyle: {
    color: '#000',
    textAlign: 'left',
    width: '99%',
    padding: 10,
    flexDirection: 'row',
  },
  placeHolderTextStyle: {
    color: '#D3D3D3',
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: 'center',
  },
  listTextViewStyle: {
    color: '#000',
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  pickerStyle: {
    marginLeft: 18,
    elevation: 3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderWidth: 1,
    shadowRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#d3d3d3',
    borderRadius: 5,
    flexDirection: 'row',
  },
});

const PickerStyles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#d3d3d3',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
  },

  selectLabelTextStyle: {
    color: '#000',
    textAlign: 'left',
    width: '99%',
    padding: 10,
    flexDirection: 'row',
  },
  placeHolderTextStyle: {
    color: '#000',
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: 'center',
  },
  listTextViewStyle: {
    color: '#000',
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  pickerStyle: {
    marginLeft: 18,
    elevation: 3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderWidth: 1,
    shadowRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#d3d3d3',
    borderRadius: 5,
    flexDirection: 'row',
  },
});

const userListStyles = StyleSheet.create({
  MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
 
  },
 
  imageView: {

    width: '50%',
    height: 120,
    margin: 2,
    borderRadius : 7
 
  },
 
  textView: {

    width:'50%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
  },
  

});

const profilePage = StyleSheet.create({
  container:{
    flex:1,
    padding:40,
    backgroundColor : "#ffaaaa",
  },
  container2:{
    flex:1,
    padding:40,
    backgroundColor : "#d3d3d3",
  },
  cardTittle:{
    fontSize:20,
    marginBottom:5,
  },
  avatar:{
    width:150,
    height:150,
  },
  card:{
    backgroundColor: "#00BCD4",
    borderRadius:5,
    padding:10,
    height:100,
    width:300,
    marginTop:10,
  },
  profileCard:{
    height:200,
    alignItems: 'center',
    marginTop:20,
    
  },
  descr:{
    fontSize:15,

  },
  name:{
    marginTop:10,
    fontSize:23,
  },
  photosContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
  },
  photosCard:{
    marginTop:10,
  },
  photo:{
    width:113,
    height:113,
    marginTop:5,
    marginRight:5,
  },

});