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
} from 'react-native';

import {AuthContext, StateContext} from './context';
//import {HeaderTitle} from '@react-navigation/stack';
//import { doesNotReject } from 'assert';
//import { monitorEventLoopDelay } from 'perf_hooks';
//import { InvalidatedProjectKind } from 'typescript';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Lightbox from 'react-native-lightbox';
import { ScrollView } from 'react-native-gesture-handler';

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
        source={require('./Assets/HeaderImages/logo.png')}
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
export const SignIn = () => {
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
        onPress={() => signIn()}>
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


//For all screens use userProfile.(attribute from mainTable on host gator) to get user attributes (from state context defined in App.js)

/*
Administrator Screens
  + Profile Screen
  + Homes Screen
  + Code Generator Screen

  
*/
export const AdminProfile = ({navigation}) => {
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


export const AdminHome = ({navigation}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Master List Screen</Text>
      <Text>{userProfile ? userProfile.email : 'abc'}</Text>
      <Button
        title="User Lists"
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
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </ScreenContainer>
  );
};

export const AdminCodeGenerator = ({navigation}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Code Generator</Text>
      <Text>{userProfile ? userProfile.email : 'abc'}</Text>
      <Button
        title="Create Codes"
        onPress={() =>
          navigation.push('Details', {name: 'React Native by Example '})
        }
      />
      <Button
        title="Edit Codes"
        onPress={() =>
          navigation.push('Details', {name: 'React Native School'})
        }
      />
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
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
export const DirectorProfile = ({navigation}) => {
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

export const DirectorHome = ({navigation}) => {
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

export const StudentProfile = ({navigation}) => {
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

export const StudentHome = ({navigation}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Student Home</Text>
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

export const PrivateStudentProfile = ({navigation}) => {
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


export const PrivateStudentHome = ({navigation}) => {
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

export const InstructorProfile = ({navigation}) => {
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

export const InstructorHome = ({navigation}) => {
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

export const EditAdminProfile = ({route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <Text>Details For Administrator</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};

export const EditDirectorProfile = ({route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return(
    <ScreenContainer>
      <Text>Details For Director</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};

export const EditStudentProfile = ({route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return(
    <ScreenContainer>
      <Text>Details For Student</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};
export const EditPrivateStudentProfile = ({route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return(
    <ScreenContainer>
      <Text>Details For Private Student</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};
export const EditInstructorProfile = ({route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return(
    <ScreenContainer>
      <Text>Details For Instructor</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};

//Loading display for all users
export const Splash = () => (
  <ScreenContainer>
    <Text>Loading...</Text>
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

//Details => Music Doors User Details
export const Details = ({route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return(
    <ScreenContainer>
      <Text>Details Screen</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};


export const GalleryImage = (props) => {

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
    <View
      style={{
        width: screenWidth/2,
        height: screenWidth/2,
        padding: 2
      }}>
        <Lightbox activeProps={ activeStyle } backgroundColor="rgba(0, 0, 0, 0.8)">
          <Image 
            style={ gridStyle }
            source={props.uri}
            key={props.index}/>
        </Lightbox>
    </View>
  );
};

export const Gallery = (props) => {
  const images = [
    {
      uri: 'https://5.imimg.com/data5/HF/CW/MY-51857835/organic-apple-fruit-250x250.jpg'
    },
    {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Single_Orange_%28Fruit%29.jpg'
    },
    {
      uri: 'https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-320-80.jpg'
    },
    {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Culinary_fruits_front_view.jpg'
    },
    {
      uri: 'https://5.imimg.com/data5/HF/CW/MY-51857835/organic-apple-fruit-250x250.jpg'
    },
    {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Single_Orange_%28Fruit%29.jpg'
    },
    {
      uri: 'https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-320-80.jpg'
    },
    {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Culinary_fruits_front_view.jpg'
    },
    {
      uri: 'https://5.imimg.com/data5/HF/CW/MY-51857835/organic-apple-fruit-250x250.jpg'
    },
    {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Single_Orange_%28Fruit%29.jpg'
    },
    {
      uri: 'https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-320-80.jpg'
    },
    {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Culinary_fruits_front_view.jpg'
    },
  ];

  const width = Dimensions.get('window').width;

  return (
    <ScrollView>
      <View style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
      }}
      key="54323">
        {images.map((image, i) =>
          <GalleryImage index={i} key={i} uri={image}/>)}
      </View>
    </ScrollView>
  );
}


//Style Sheet => IOS and Android
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
