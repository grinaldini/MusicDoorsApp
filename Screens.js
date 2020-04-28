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
  SafeAreaView,
  ImagePickerIOS,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {Swipeable} from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';

import {
  AuthContext,
  StateContext,
  GalleryContext,
  SchoolContext,
  ResetContext,
} from './context';
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
import AdminPrivateStudentL1 from './API/User/Admin/list1PrivateStudentList';
import AdminInstructorL1 from './API/User/Admin/list1InstructorList';
import AdminAppointmentL1 from './API/User/Admin/list1ApptList';
import AdminApptStudentV2 from './API/User/Admin/view2Student';
import AdminApptInstructorV2 from './API/User/Admin/view2Instructor';

import DirectorStudentL1 from './API/User/Director/list1Student';
import DirectorAppointmentL2 from './API/User/Director/list2ApptList';

import StudentInstructorL1 from './API/User/Student/list1Instructor';
import AvailableAppt from './API/User/Student/list2AvailableAppt';
import InstAvailableAppt from './API/User/Student/list3InstAvailableAppt';
import RequestAppointment from './API/User/Student/Appointment/requestAppt';
import InstructorData from './API/User/Student/Appointment/instructorData';
import CancelPendingRequest from './API/User/Student/Appointment/cancelPending';
import CancelConfirmedAppt from './API/User/Student/Appointment/cancelConfirmed';
import StudentAllAppt from './API/User/Student/Appointment/studentShowAllAppt';
import AllPendingAppt from './API/User/Student/Appointment/pendingShowAllAppt';
import UpdateStudent from './API/User/Student/Profile/update';

import PrivateStudentInstructorL1 from './API/User/PrivateStudent/list1Instructor';

import InstructorStudentL1 from './API/User/Instructor/list1Student';
import InstructorPrivateStudentL1 from './API/User/Instructor/list1PrivateStudent';
import DirectorList from './API/User/Instructor/list2DirectorList';
import DirectorData from './API/User/Instructor/view2Director';
import InstructorAllAppt from './API/User/Instructor/Appointment/instructorShowAllAppt';
import InstructorAllPendingAppt from './API/User/Instructor/Appointment/pendingShowAllAppt';
import StudentData from './API/User/Instructor/Appointment/studentData';
import ConfirmPendingRequest from './API/User/Instructor/Appointment/confirmPending';
import CreateAppointment from './API/User/Instructor/Appointment/createAppointment';
import InstructorAllOpenAppt from './API/User/Instructor/Appointment/instructorShowAllOpenAppt';
import DeleteAppointment from './API/User/Instructor/Appointment/deleteAppointment';
import DayApptList from './API/User/Instructor/Appointment/dayApptList';
import InstructorAllCancelAppt from './API/User/Instructor/Appointment/instructorShowAllCancelAppt';
import InstructorCancelPendingRequest from './API/User/Instructor/Appointment/instructorCancelPending';

import AccessCodeList from './API/AccessCode/listAccessCode';
import CreateAccessCode from './API/AccessCode/createAccessCode';
import DeleteAccessCode from './API/AccessCode/deleteAccessCode';

import CalendarPicker from 'react-native-calendar-picker';

import ImageResizer from 'react-native-image-resizer';

import RNFetchBlob from 'rn-fetch-blob';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const userTypes = [
  {
    id: 2,
    name: 'Director',
  },
  {
    id: 3,
    name: 'Student',
  },
  {
    id: 4,
    name: 'Private Student',
  },
  {
    id: 5,
    name: 'Instructor',
  },
];

const items = [
  {
    id: 1,
    name: 'Bassoon',
  },
  {
    id: 2,
    name: 'Cello',
  },
  {
    id: 3,
    name: 'Clarinet',
  },
  {
    id: 4,
    name: 'Double Bass',
  },
  {
    id: 5,
    name: 'Euphonium',
  },
  {
    id: 6,
    name: 'Flute',
  },
  {
    id: 7,
    name: 'French Horn',
  },
  {
    id: 8,
    name: 'Harp',
  },
  {
    id: 9,
    name: 'Oboe',
  },
  {
    id: 10,
    name: 'Percussion',
  },
  {
    id: 11,
    name: 'Piano',
  },
  {
    id: 12,
    name: 'Saxophone',
  },
  {
    id: 13,
    name: 'Trombone',
  },
  {
    id: 14,
    name: 'Trumpet',
  },
  {
    id: 15,
    name: 'Tuba',
  },
  {
    id: 16,
    name: 'Viola',
  },
  {
    id: 17,
    name: 'Violin',
  },
  {id: 18, name: 'None'},
];

const fixedTimes = [
  {
    id: 1,
    name: '1:00 AM ',
  },
  {
    id: 2,
    name: '2:00 AM',
  },
  {
    id: 3,
    name: '3:00 AM',
  },
  {
    id: 4,
    name: '4:00 AM',
  },
  {
    id: 5,
    name: '5:00 AM',
  },
  {
    id: 6,
    name: '6:00 AM',
  },
  {
    id: 7,
    name: '7:00 AM',
  },
  {
    id: 8,
    name: '8:00 AM',
  },
  {
    id: 9,
    name: '9:00 AM',
  },
  {
    id: 10,
    name: '10:00 AM',
  },
  {
    id: 11,
    name: '11:00 AM',
  },
  {
    id: 12,
    name: '12:00 PM',
  },
  {
    id: 13,
    name: '1:00 PM',
  },
  {
    id: 14,
    name: '2:00 PM',
  },
  {
    id: 15,
    name: '3:00 PM',
  },
  {
    id: 16,
    name: '4:00 PM',
  },
  {
    id: 17,
    name: '5:00 PM',
  },
  {id: 18, name: '6:00 PM'},
  {
    id: 19,
    name: '7:00 PM',
  },
  {
    id: 20,
    name: '8:00 PM',
  },
  {
    id: 21,
    name: '9:00 PM',
  },
  {
    id: 22,
    name: '10:00 PM',
  },
  {
    id: 23,
    name: '11:00 PM',
  },
  {id: 24, name: '12:00 AM'},
];

const ScreenContainer = ({children}) => (
  <View style={styles.container}>{children}</View>
);
const ScrollScreenContainer = ({children}) => (
  <ScrollView style={styles.container}>{children}</ScrollView>
);

export const Welcome = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Image
        resizeMode="contain"
        source={{uri: 'http://musicdoors.org/Assets/HeaderImages/logo.png'}}
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        secureTextEntry
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
        onPress={() => {
          //console.log(email);
          //console.log(userTypeId);
          sendResetCode(email, userTypeId);
        }}>
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
  const [email, setEmail] = useState('Email');

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
        placeholder="Email"
        underlineColorAndroid="transparent"
        onChangeText={val => setEmail(val)}
        autoCapitalize="none"
        style={styles.TextInputStyleClass}
      />
      <TextInput
        placeholder="New Password"
        underlineColorAndroid="transparent"
        secureTextEntry
        onChangeText={val => setNewPassword(val)}
        autoCapitalize="none"
        style={styles.TextInputStyleClass}
      />
      <TextInput
        placeholder="Confirm New Password"
        underlineColorAndroid="transparent"
        secureTextEntry
        onChangeText={val => setConfPassword(val)}
        autoCapitalize="none"
        style={styles.TextInputStyleClass}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() =>
          resetPassword(resetCode, newPassword, confPassword, email)
        }>
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
      <CustomButton
        title="Edit Admin Profile"
        onPress={() =>
          navigation.push('Edit Profile', {name: 'Edit Admin Profile '})
        }
      />
      <CustomButton title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

export const EditAdminProfile = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);

  const [userProfile, setUserProfile] = stateContext;

  const [email, setEmail] = React.useState(userProfile.email);
  const [password, setPass] = React.useState(userProfile.password);
  const [first_name, setFName] = React.useState(userProfile.first_name);
  const [last_name, setLName] = React.useState(userProfile.last_name);
  const [city, setCity] = React.useState(userProfile.city);
  const [st, setS] = React.useState(userProfile.state);
  const [zip_code, setZC] = React.useState(userProfile.zip_code);
  const [current_school, setCS] = React.useState(userProfile.current_school);
  const [feeder_school, setFS] = React.useState(userProfile.feeder_school);
  const [instrument, setInstrument] = React.useState(userProfile.instrument);
  const [instrument_2, setInstrument2] = React.useState(
    userProfile.instrument_2,
  );
  const [instrument_3, setInstrument3] = React.useState(
    userProfile.instrument_3,
  );
  const [phone_number, setPhoneNumber] = React.useState(
    userProfile.phone_number,
  );
  const [street_address, setSA] = React.useState(userProfile.street_address);

  return (
    <ScreenContainer>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={profilePage.container}>
          <TextInput
            placeholder={userProfile.email}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setEmail(val)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder={userProfile.password}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setPass(val)}
            autoCapitalize="none"
          />
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles2.TouchableOpacityStyle}
            onPress={() => {
              UpdateStudent.update(
                userProfile.id,
                email,
                password,
                first_name,
                last_name,
                phone_number,
                street_address,
                city,
                st,
                zip_code,
                feeder_school,
                current_school,
                instrument,
                instrument_2,
                instrument_3,
              )
                .then(data => data.json())
                .then(data => {
                  if (data === false) {
                    Alert.alert('Error, try again later ');
                  } else {
                    setUserProfile({
                      ...userProfile,
                      email: email,
                      password: password,
                    });
                    Alert.alert('Profile updated successfully');
                  }
                });
            }}>
            <Text style={styles2.TextStyle}> Update Account </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export const AdminHome = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  //TODO: Remove userProfile
  return (
    <ScreenContainer>
      <CustomButton
        title="Director List"
        onPress={() => navigation.push('Director List')}
      />
      <CustomButton
        title="Private Student List"
        onPress={() => navigation.push('Private Student List')}
      />
      <CustomButton
        title="Instructor List"
        onPress={() => navigation.push('Instructor List')}
      />
      <CustomButton
        title="Appointment List"
        onPress={() => navigation.push('Appointment List')}
      />
    </ScreenContainer>
  );

  //<Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
  //<Text>Master List Screen</Text>
};

export const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#000',
      }}
    />
  );
};

export const AdminDirectorList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [user, setUser] = React.useState(null);

  AdminDirectorL1.getDirectorList()
    .then(data => data.json())
    .then(data => {
      if (data.length > 0) {
        setUser(data);
      }
      if (data === false) {
        //Alert.alert('No Directors Available');
      }
    });

  const message = 'No Directors Available';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={user}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() =>
                navigation.push('Admin Student List', {parent: item})
              }
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{uri: item.avatar}}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.first_name} {item.last_name}
                  {'\n\n'}
                  {item.current_school}
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

export const AdminStudentList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [studentUser, setStudentUser] = React.useState(null);

  AdminStudentL2.getStudentList(route.params.parent.current_school)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setStudentUser(data2);
      }
      if (data2 === false) {
       // Alert.alert('No Students Registered Under Director');
      }
    });

  const message = 'No Students Registered Under Director';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={studentUser}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                source={{uri: item.avatar}}
                style={userListStyles.imageView}
              />
              <Text style={userListStyles.textView}>
                {item.first_name} {item.last_name}
                {'\n\n'}
                {item.current_school}
                {'\n'}
                {item.feeder_school}
                {'\n'}
                {item.email}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScreenContainer>
  );
};

export const AdminPrivateStudentList = ({route}) => {
  const [studentUser, setStudentUser] = React.useState(null);

  AdminPrivateStudentL1.getPS()
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setStudentUser(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Private Students Registered');
      }
    });

  const message = 'No Private Students Registered';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={studentUser}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                source={{uri: item.avatar}}
                style={userListStyles.imageView}
              />
              <Text style={userListStyles.textView}>
                {item.first_name} {item.last_name}
                {'\n\n'}
                {item.email}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScreenContainer>
  );
};

export const AdminInstructorList = ({route}) => {
  const [instructorUser, setInstructorUser] = React.useState(null);

  AdminInstructorL1.getInstructors()
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setInstructorUser(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Instructors Registered');
      }
    });

  const message = 'No Instructors Registered';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={instructorUser}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                source={{uri: item.avatar}}
                style={userListStyles.imageView}
              />
              <Text style={userListStyles.textView}>
                {item.first_name} {item.last_name}
                {'\n\n'}
                {item.feeder_school}
                {'\n'}
                {item.email}
                {'\n'}
                {item.phone_number}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScreenContainer>
  );
};

export const AdminAppointmentList = ({navigation, route}) => {
  const [appointment, setAppointment] = React.useState(null);

  AdminAppointmentL1.getAppt()
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAppointment(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Confirmed Appointments');
      }
    });

  const message = 'No Confirmed Appointments';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={appointment}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() =>
                navigation.push('Participants Info', {parent: item})
              }
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: 'http://musicdoors.org/Assets/generalAppointment.png',
                  }}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.date}
                  {'\n\n'}
                  {item.start}
                  {'-'}
                  {item.end}
                  {'\n\n'}
                  {'Appointment Status: Confirmed'}
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

export const AdminParticipantsInfo = ({navigation, route}) => {
  const [student, setStudent] = React.useState([]);
  const [instructor, setInstructor] = React.useState([]);
  const [check, setCheck] = React.useState(0);

  AdminApptStudentV2.getParticipant(route.params.parent.student_id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setStudent(data2[0]);
      }
      if (data2 === false) {
        Alert.alert('No Students Info Available');
      }
    });

  AdminApptInstructorV2.getParticipant(route.params.parent.instructor_id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setInstructor(data2[0]);
        setCheck(1);
      }
      if (data2 === false) {
        Alert.alert('No Instructors Info');
      }
    });

  //console.log(student);
  //console.log(instructor);

  if (check > 0) {
    return (
      <ScreenContainer>
        <ScrollView>
          <View style={profilePage.container}>
            <View style={[profilePage.card, profilePage.profileCard]}>
              <Image
                style={profilePage.avatar}
                source={{
                  uri: 'http://musicdoors.org/Assets/generalAppointment.png',
                }}
              />
              <Text style={profilePage.name}>{route.params.parent.date}</Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>Appointment Details:</Text>
              <Text>
                {' '}
                - {route.params.parent.start}
                {'-'}
                {route.params.parent.end}
              </Text>
              <Text>
                {' '}
                - {instructor.street_address},{instructor.city},
                {instructor.state},{instructor.zip_code}
              </Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>
                Instructor: {instructor.first_name} {instructor.last_name}
              </Text>
              <Text> - {instructor.email}</Text>
              <Text> - {instructor.phone_number}</Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>
                Student: {student.first_name}
                {student.last_name}
              </Text>
              <Text> - {student.email}</Text>
              <Text> - Current School: {student.current_school}</Text>
              <Text> - Feeder School: {student.feeder_school}</Text>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  } else {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="#FF5722" />
      </ScreenContainer>
    );
  }
};

export const AdminCodeGenerator = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <CustomButton
        title="Create Access Code"
        onPress={() => navigation.push('Create Access Code')}
      />
      <CustomButton
        title="View Access Codes"
        onPress={() => navigation.push('View Access Codes')}
      />
    </ScreenContainer>
  );
};

export const AdminCreateAccessCode = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [description, setDescription] = React.useState(null);
  const [user_type_id, setUserTypeId] = React.useState(null);

  moment.locale('en');
  var part1 = moment().format('l');
  part1 = part1.replace('/', '');
  part1 = part1.replace('/', '');
  var part2 = moment().format('LTS');
  part2 = part2.replace(/:/g, '');
  part2 = part2.replace(/PM/g, '');
  part2 = part2.replace(/AM/g, '');

  var code = part2 + part1;
  var code = code.replace(/ /, '');
  //console.log(code);

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
                Alert.alert(
                  `Successfully Added ${code} for:\n\n${description}`,
                );
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
        //Alert.alert('No Access Codes Available');
      }
    });

  const message = 'No Access Codes Available';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={acList}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
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
                        onPress: () => {
                          DeleteAccessCode.deleteAC(
                            item.code,
                            item.user_type_id,
                          )
                            .then(data => data.json())
                            .then(data => {
                              if (data === false) {
                                Alert.alert(`Deleted ${item.code}`);
                              } else {
                                Alert.alert('Not Deleted, Try Again Later');
                              }
                            });
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }}>
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

  const schoolsInfoContext = React.useContext(SchoolContext);
  const [schools, setSchools] = schoolsInfoContext;

  const user_type_id = 2;

  const [email, setEmail] = React.useState(null);
  const [password, setPass] = React.useState(null);
  const [confPassword, setCPass] = React.useState(null);
  const [first_name, setFName] = React.useState(null);
  const [last_name, setLName] = React.useState(null);
  const [phone_number, setPN] = React.useState(null);
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
      <ScrollView
        style={{width: '90%'}}
        contentContainerStyle={{
          paddingLeft: 35,
          flexGrow: 1,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="always">
        <TextInput
          placeholder="Enter Email"
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          onChangeText={val => setEmail(val)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          onChangeText={val => setPass(val)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          onChangeText={val => setCPass(val)}
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
        <SearchableDropdown
          onTextChange={text => console.log(text)}
          //On text change listener on the searchable input
          onItemSelect={item => setCS(item.name)}
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
          placeholder="Select Current School"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
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
          onPress={() =>{
            if (password.length >= 8){
              if (password === confPassword) {
                signUp(
                  user_type_id,
                  email,
                  password,
                  first_name,
                  last_name,
                  phone_number,
                  street_address,
                  city,
                  st,
                  zip_code,
                  feeder_school,
                  current_school,
                  instrument,
                  instrument_2,
                  instrument_3,
                  code,
                )
              }else{
                Alert.alert("Passwords Do Not Match");
              }
            }else{
              Alert.alert("Password Minimum Length: 8");
            }
          }}>
          <Text style={styles.TextStyle}> Create Account </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

export const EditDirectorProfile = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);

  const [userProfile, setUserProfile] = stateContext;

  const [email, setEmail] = React.useState(userProfile.email);
  const [password, setPass] = React.useState(userProfile.password);
  const [first_name, setFName] = React.useState(userProfile.first_name);
  const [last_name, setLName] = React.useState(userProfile.last_name);
  const [city, setCity] = React.useState(userProfile.city);
  const [st, setS] = React.useState(userProfile.state);
  const [zip_code, setZC] = React.useState(userProfile.zip_code);
  const [current_school, setCS] = React.useState(userProfile.current_school);
  const [feeder_school, setFS] = React.useState(userProfile.feeder_school);
  const [instrument, setInstrument] = React.useState(userProfile.instrument);
  const [instrument_2, setInstrument2] = React.useState(
    userProfile.instrument_2,
  );
  const [instrument_3, setInstrument3] = React.useState(
    userProfile.instrument_3,
  );
  const [phone_number, setPhoneNumber] = React.useState(
    userProfile.phone_number,
  );

  const street_address = false;

  return (
    <ScreenContainer>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={profilePage.container}>
          <View style={[profilePage.card, profilePage.profileCard]}>
            <Image
              style={profilePage.avatar}
              source={{uri: userProfile.avatar}}
            />
            <Text style={profilePage.name}>
              {userProfile.first_name} {userProfile.last_name}
            </Text>
          </View>
          <CustomButton
            title="Upload Avatar"
            onPress={() => {
              chooseImage()
                .then(originalResponse => {
                  if (!originalResponse.cancelled) {
                    //console.log(originalResponse.uri);

                    //console.log(originalResponse.uri.type);

                    ImageResizer.createResizedImage(
                      originalResponse.uri,
                      600,
                      600,
                      'JPEG',
                      100,
                    )
                      .then(resizedImageUri => {
                        //console.log(resizedImageUri);
                        var imageName = userProfile.email;
                        imageName = imageName.replace('@', '');
                        imageName = imageName.replace('.', '');
                        imageName = imageName.replace(' ', '');
                        imageName = userProfile.id + imageName;
                        var domainName = `http://musicdoors.org/Assets/Avatar/${imageName}.jpeg`;

                        var data = new FormData();
                        data.append('avatar', {
                          uri: resizedImageUri.uri,
                          name: 'avatar.jpg',
                          type: originalResponse.uri.type,
                        });

                        data.append('email', userProfile.email);
                        data.append('imageName', imageName);
                        fetch('http://musicdoors.org/Assets/UploadImage.php', {
                          method: 'POST',
                          body: data,
                          headers: {
                            Accept: 'application/json',
                          },
                        })
                          .then(data2 => data2.json())
                          .then(data2 => {
                            //console.log(data2);
                            if (data2 === false) {
                              //setUserProfile({...userProfile, avatar: data.avatar});
                              alert(
                                'An error occurred while uploading avatar.',
                              );
                            } else {
                              //console.log(userProfile);
                              setUserProfile({
                                ...userProfile,
                                avatar: data2.avatar,
                              });
                              //setTimeout(() => console.log(userProfile), 1000);
                              //console.log('here');
                            }
                          })
                          .then(data2 => {
                            //console.log(domainName);
                          })
                          .catch(err => {
                            console.error('upload error: ' + err);
                            alert('An error occurred while uploading avatar.');
                          });
                      })
                      .catch(err => {
                        // Oops, something went wrong. Check that the filename is correct and
                        // inspect err to get more details.
                      });
                  }
                })
                .catch(err => {
                  console.error('ImagePicker error: ' + err);
                  alert('An error occurred while selecting the avatar.');
                });
            }}
          />
          <TextInput
            placeholder={userProfile.email}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setEmail(val)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder={userProfile.password}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setPass(val)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder={userProfile.first_name}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setFName(val)}
          />
          <TextInput
            placeholder={userProfile.last_name}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setLName(val)}
          />
          <TextInput
            placeholder={userProfile.phone_number}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setPhoneNumber(val)}
          />
          <TextInput
            placeholder={userProfile.city}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setCity(val)}
          />

          <TextInput
            placeholder={userProfile.state}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setS(val)}
          />

          <TextInput
            placeholder={userProfile.zip_code}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setZC(val)}
          />

          <TextInput
            placeholder={userProfile.current_school}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setCS(val)}
          />
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles2.TouchableOpacityStyle}
            onPress={() => {
              //console.log(instrument_2);
              if (instrument == 'None') {
                setInstrument(null);
              }
              if (instrument_2 == 'None') {
                setInstrument2(null);
              }
              console.log(instrument_2);
              if (instrument_3 == 'None') {
                setInstrument3(null);
              }
              UpdateStudent.update(
                userProfile.id,
                email,
                password,
                first_name,
                last_name,
                phone_number,
                street_address,
                city,
                st,
                zip_code,
                feeder_school,
                current_school,
                instrument,
                instrument_2,
                instrument_3,
              )
                .then(data => data.json())
                .then(data => {
                  if (data === false) {
                    Alert.alert('Error, try again later ');
                  } else {
                    setUserProfile({
                      ...userProfile,
                      email: email,
                      password: password,
                      first_name: first_name,
                      last_name: last_name,
                      phone_number: phone_number,
                      street_address: street_address,
                      city: city,
                      st: st,
                      zip_code: zip_code,
                      feeder_school: feeder_school,
                      current_school: current_school,
                      instrument: instrument,
                      instrument_2: instrument_2,
                      instrument_3: instrument_3,
                    });
                    Alert.alert('Profile updated successfully');
                  }
                });
            }}>
            <Text style={styles2.TextStyle}> Update Account </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export const DirectorProfile = ({navigation, route}) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <CustomButton
        title="Edit Director Profile"
        onPress={() =>
          navigation.push('Edit Profile', {name: 'Edit Director Profile '})
        }
      />
      <CustomButton title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

export const DirectorHome = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <CustomButton
        title="Student List"
        onPress={() => navigation.push('Student List')}
      />
    </ScreenContainer>
  );
};

export const DirectorStudentList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [studentUser, setStudentUser] = React.useState(null);

  DirectorStudentL1.getStudentList(userProfile.current_school)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setStudentUser(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Students Registered Under Director');
      }
    });

  const message = 'No Students Registered Under Director';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={studentUser}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() =>
                navigation.push('Appointment List', {student_id: item.id})
              }
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{uri: item.avatar}}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.first_name} {item.last_name}
                  {'\n\n'}
                  {item.current_school}
                  {'\n'}
                  {item.feeder_school}
                  {'\n'}
                  {item.email}
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

export const DirectorAppointmentList = ({navigation, route}) => {
  const [appointment, setAppointment] = React.useState(null);
  //console.log(route.params.student_id);
  DirectorAppointmentL2.getAppt(route.params.student_id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAppointment(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Confirmed Appointments Available');
      }
    });

  const message = 'No Confirmed Appointments Available';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={appointment}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() =>
                navigation.push('Participants Info', {parent: item})
              }
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: 'http://musicdoors.org/Assets/generalAppointment.png',
                  }}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.date}
                  {'\n\n'}
                  {item.start}
                  {'-'}
                  {item.end}
                  {'\n\n'}
                  {'Appointment Status: Confirmed'}
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

export const DirectorParticipantsInfo = ({navigation, route}) => {
  const [student, setStudent] = React.useState([]);
  const [instructor, setInstructor] = React.useState([]);
  const [check, setCheck] = React.useState(0);

  AdminApptStudentV2.getParticipant(route.params.parent.student_id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setStudent(data2[0]);
      }
      if (data2 === false) {
        Alert.alert('No Student Info');
      }
    });

  AdminApptInstructorV2.getParticipant(route.params.parent.instructor_id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setInstructor(data2[0]);
        setCheck(1);
      }
      if (data2 === false) {
        Alert.alert('No Instructor Info');
      }
    });

  //console.log(student);
  //console.log(instructor);

  if (check > 0) {
    return (
      <ScreenContainer>
        <ScrollView>
          <View style={profilePage.container}>
            <View style={[profilePage.card, profilePage.profileCard]}>
              <Image
                style={profilePage.avatar}
                source={{
                  uri: 'http://musicdoors.org/Assets/generalAppointment.png',
                }}
              />
              <Text style={profilePage.name}>{route.params.parent.date}</Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>Appointment Details:</Text>
              <Text>
                {' '}
                - {route.params.parent.start}
                {'-'}
                {route.params.parent.end}
              </Text>
              <Text>
                {' '}
                - {instructor.street_address},{instructor.city},
                {instructor.state},{instructor.zip_code}
              </Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>
                Instructor: {instructor.first_name} {instructor.last_name}
              </Text>
              <Text> - {instructor.email}</Text>
              <Text> - {instructor.phone_number}</Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>
                Student: {student.first_name}
                {student.last_name}
              </Text>
              <Text> - {student.email}</Text>
              <Text> - Current School: {student.current_school}</Text>
              <Text> - Feeder School: {student.feeder_school}</Text>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  } else {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="#FF5722" />
      </ScreenContainer>
    );
  }
};

/*
Student Screens
  + Create Account => NULL Values: (avatar,description(for now)) , street_address
  + Profile Screen
*/
export const StudentCreateAccount = () => {
  const {signUp} = React.useContext(AuthContext);

  const schoolsInfoContext = React.useContext(SchoolContext);
  const [schools, setSchools] = schoolsInfoContext;

  const user_type_id = 3;


  const [email, setEmail] = React.useState(false);
  const [password, setPass] = React.useState(false);
  const [confPassword, setCPass] = React.useState(false);
  const [first_name, setFName] = React.useState(false);
  const [last_name, setLName] = React.useState(false);
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
      <ScrollView
        style={{width: '90%'}}
        contentContainerStyle={{
          paddingLeft: 35,
          flexGrow: 1,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="always">
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
          secureTextEntry
          style={styles.TextInputStyleClass}
          onChangeText={val => setPass(val)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Confirm Password"
          underlineColorAndroid="transparent"
          secureTextEntry
          style={styles.TextInputStyleClass}
          onChangeText={val => setCPass(val)}
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
          //On text change listener on the searchable input
          onItemSelect={item => setCS(item.name)}
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
          placeholder="Select Current School"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
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
          placeholder="Select Feeder High School"
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
          onPress={() =>{
            if (password.length >= 8){
              if (password === confPassword) {
                signUp(
                  user_type_id,
                  email,
                  password,
                  first_name,
                  last_name,
                  phone_number,
                  street_address,
                  city,
                  st,
                  zip_code,
                  feeder_school,
                  current_school,
                  instrument,
                  instrument_2,
                  instrument_3,
                  code,
                )
              }else{
                Alert.alert("Passwords Do Not Match");
              }
            }else{
              Alert.alert("Password Minimum Length: 8");
            }
          }}>
          <Text style={styles.TextStyle}> Create Account </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

export const StudentProfile = ({navigation, route}) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <CustomButton
        title="Edit Student Profile"
        onPress={() =>
          navigation.push('Edit Profile', {name: 'Edit Student Profile '})
        }
      />
      <CustomButton title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

export const EditStudentProfile = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);

  const [userProfile, setUserProfile] = stateContext;

  const [email, setEmail] = React.useState(userProfile.email);
  const [password, setPass] = React.useState(userProfile.password);
  const [first_name, setFName] = React.useState(userProfile.first_name);
  const [last_name, setLName] = React.useState(userProfile.last_name);
  const [city, setCity] = React.useState(userProfile.city);
  const [st, setS] = React.useState(userProfile.state);
  const [zip_code, setZC] = React.useState(userProfile.zip_code);
  const [current_school, setCS] = React.useState(userProfile.current_school);
  const [feeder_school, setFS] = React.useState(userProfile.feeder_school);
  const [instrument, setInstrument] = React.useState(userProfile.instrument);
  const [instrument_2, setInstrument2] = React.useState(
    userProfile.instrument_2,
  );
  const [instrument_3, setInstrument3] = React.useState(
    userProfile.instrument_3,
  );

  const street_address = false;
  const phone_number = false;

  return (
    <ScreenContainer>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={profilePage.container}>
          <View style={[profilePage.card, profilePage.profileCard]}>
            <Image
              style={profilePage.avatar}
              source={{uri: userProfile.avatar}}
            />
            <Text style={profilePage.name}>
              {userProfile.first_name} {userProfile.last_name}
            </Text>
          </View>
          <CustomButton
            title="Upload Avatar"
            onPress={() => {            
              
              chooseImage()
                .then(originalResponse => {
                  if (!originalResponse.cancelled) {
                    //console.log(originalResponse.uri);

                    //console.log(originalResponse.uri.type);

                    ImageResizer.createResizedImage(
                      originalResponse.uri,
                      600,
                      600,
                      'JPEG',
                      100,
                    )
                      .then(resizedImageUri => {
                        //console.log(resizedImageUri);
                        var imageName = userProfile.email;
                        imageName = imageName.replace('@', '');
                        imageName = imageName.replace('.', '');
                        imageName = imageName.replace(' ', '');
                        imageName = userProfile.id + imageName;
                        var domainName = `http://musicdoors.org/Assets/Avatar/${imageName}.jpeg`;

                        var data = new FormData();
                        data.append('avatar', {
                          uri: resizedImageUri.uri,
                          name: 'avatar.jpg',
                          type: originalResponse.uri.type,
                        });

                        data.append('email', userProfile.email);
                        data.append('imageName', imageName);
                        fetch('http://musicdoors.org/Assets/UploadImage.php', {
                          method: 'POST',
                          body: data,
                          headers: {
                            Accept: 'application/json',
                          },
                        })
                          .then(data2 => data2.json())
                          .then(data2 => {
                            //console.log(data2);
                            if (data2 === false) {
                              //setUserProfile({...userProfile, avatar: data.avatar});
                              alert(
                                'An error occurred while uploading avatar.',
                              );
                            } else {
                              //console.log(userProfile);
                              setUserProfile({
                                ...userProfile,
                                avatar: data2.avatar,
                              });
                              //setTimeout(() => console.log(userProfile), 1000);
                              //console.log('here');
                            }
                          })
                          .then(data2 => {
                            //console.log(domainName);
                          })
                          .catch(err => {
                            console.error('upload error: ' + err);
                            alert('An error occurred while uploading avatar.');
                          });
                      })
                      .catch(err => {
                        // Oops, something went wrong. Check that the filename is correct and
                        // inspect err to get more details.
                      });
                  }
                })
                .catch(err => {
                  console.error('ImagePicker error: ' + err);
                  alert('An error occurred while selecting the avatar.');
                });
            }}
          />
          <TextInput
            placeholder={userProfile.email}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setEmail(val)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder={userProfile.password}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setPass(val)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder={userProfile.first_name}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setFName(val)}
          />
          <TextInput
            placeholder={userProfile.last_name}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setLName(val)}
          />

          <TextInput
            placeholder={userProfile.city}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setCity(val)}
          />

          <TextInput
            placeholder={userProfile.state}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setS(val)}
          />

          <TextInput
            placeholder={userProfile.zip_code}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setZC(val)}
          />

          <TextInput
            placeholder={userProfile.current_school}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setCS(val)}
          />

          <TextInput
            placeholder={userProfile.feeder_school}
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
            placeholder={userProfile.instrument}
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
            onPress={() => {
              
              if (instrument == 'None') {
                setInstrument(null);
              }
              if (instrument_2 == 'None') {
                setInstrument2(null);
              }
              if (instrument_3 == 'None') {
                setInstrument3(null);
              }
              UpdateStudent.update(
                userProfile.id,
                email,
                password,
                first_name,
                last_name,
                phone_number,
                street_address,
                city,
                st,
                zip_code,
                feeder_school,
                current_school,
                instrument,
                instrument_2,
                instrument_3,
              )
                .then(data => data.json())
                .then(data => {
                  if (data === false) {
                    Alert.alert('Error, try again later ');
                  } else {
                    setUserProfile({
                      ...userProfile,
                      email: email,
                      password: password,
                      first_name: first_name,
                      last_name: last_name,
                      phone_number: phone_number,
                      street_address: street_address,
                      city: city,
                      st: st,
                      zip_code: zip_code,
                      feeder_school: feeder_school,
                      current_school: current_school,
                      instrument: instrument,
                      instrument_2: instrument_2,
                      instrument_3: instrument_3,
                    });
                    Alert.alert('Profile updated successfully');
                  }
                });
            }}>
            <Text style={styles2.TextStyle}> Update Account </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export const StudentHome = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const schoolsContext = React.useContext(SchoolContext);
  const [schools, setSchools] = schoolsContext;

  //TODO: Remove Student Home and userProfile
  return (
    <ScreenContainer>
      <CustomButton
        title="Instructor List"
        onPress={() => navigation.push('Instructor List')}
      />
    </ScreenContainer>
  );
  //<Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
};

export const StudentAppointment = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <CustomButton
        title="Appointment List"
        onPress={() => navigation.push('Appointment')}
      />
      <CustomButton
        title="Pending Appointment List"
        onPress={() => navigation.push('Pending Appointment')}
      />
    </ScreenContainer>
  );
};

export const StudentAppointmentList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [appt, setAppt] = React.useState([]);
  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);

  StudentAllAppt.getAllAppt(userProfile.id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAppt(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Appointments Confirmed');
      }
    });

  //InstructorData.getInfo()
  const message = 'No Appointments Confirmed';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={appt}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() =>
                navigation.push('Appointment Info', {
                  instructor_id: item.instructor_id,
                  appointment_id: item.id,
                })
              }
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: 'http://musicdoors.org/Assets/generalAppointment.png',
                  }}
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

export const StudentAppointmentInfo = ({navigation, route}) => {
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
    .then(data => {
      //console.log(data);
      if (data === false) {
        Alert.alert('No Appointment Info');
      } else {
        setAI(data[0]);
        setCheck(1);
      }
    });

  //console.log(check);
  if (check > 0) {
    return (
      <ScreenContainer>
        <ScrollView>
          <View style={profilePage.container}>
            <View style={[profilePage.card, profilePage.profileCard]}>
              <Image
                style={profilePage.avatar}
                source={{uri: apptInfo.avatar}}
              />
              <Text style={profilePage.name}>
                {apptInfo.first_name} {apptInfo.last_name}
              </Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>Contact Info</Text>
              <Text> - {apptInfo.street_address}</Text>
              <Text>
                {' '}
                - {apptInfo.city},{apptInfo.state},{apptInfo.zip_code}
              </Text>
              <Text> - {apptInfo.phone_number}</Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>About</Text>
              <Text> - Instrument: {apptInfo.instrument}</Text>
              <Text> - Description: {apptInfo.description}</Text>
            </View>
          </View>
          <CustomCancelButton
            title="Request Cancelation"
            onPress={() => {
              Alert.alert(
                'Requesting Cancellation: \n',
                `Notifying ${apptInfo.first_name} ${apptInfo.last_name}`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('PRESSED'),
                    style: 'cancel',
                  },
                  {
                    text: 'Confirm',
                    onPress: () => {
                      //console.log(route.params.appointment_id);
                      CancelConfirmedAppt.requestCancel(
                        route.params.appointment_id,
                      )
                        .then(cancelData => cancelData.json())
                        .then(cancelData => {
                          if (cancelData === false) {
                            Alert.alert(
                              'Cancelation Request Pending:\n Tutor will email you shortly',
                            );
                          } else {
                            Alert.alert('Error, Try Again Later');
                          }
                        });
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
          />
        </ScrollView>
      </ScreenContainer>
    );
  } else {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="#FF5722" />
      </ScreenContainer>
    );
  }
};

export const StudentPendingAppointmentList = ({navigation}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [appt, setAppt] = React.useState([]);
  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);

  AllPendingAppt.getAllPendingAppt(userProfile.id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAppt(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Pending Appointments');
      }
    });

  //console.log(user);
  const message = "No Pending Appointment";
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={appt}
          ListEmptyComponent={<ListEmpty title={message}/>}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() =>
                navigation.push('Pending Appointment Info', {
                  instructor_id: item.instructor_id,
                  appointment_id: item.id,
                })
              }
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: 'http://musicdoors.org/Assets/generalAppointment.png',
                  }}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.date}
                  {'\n\n'}
                  {item.start}
                  {'-'}
                  {item.end}
                  {'\n\n'}
                  {'Appointment Status: Pending'}
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

export const StudentPendingAppointmentInfo = ({navigation, route}) => {
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
    .then(data => {
      //console.log(data);
      if (data === false) {
        Alert.alert('Error, Try Again Later');
      } else {
        setAI(data[0]);
        setCheck(1);
      }
    });

  //console.log(check);
  if (check > 0) {
    return (
      <ScreenContainer>
        <ScrollView>
          <View style={profilePage.container}>
            <View style={[profilePage.card, profilePage.profileCard]}>
              <Image
                style={profilePage.avatar}
                source={{uri: apptInfo.avatar}}
              />
              <Text style={profilePage.name}>
                {apptInfo.first_name} {apptInfo.last_name}
              </Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>Contact Info</Text>
              <Text> - {apptInfo.street_address}</Text>
              <Text>
                {' '}
                - {apptInfo.city},{apptInfo.state},{apptInfo.zip_code}
              </Text>
              <Text> - {apptInfo.phone_number}</Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>About</Text>
              <Text> - Instrument: {apptInfo.instrument}</Text>
              <Text> - Description: {apptInfo.description}</Text>
            </View>
          </View>
          <CustomCancelButton
            title="Cancel"
            onPress={() => {
              CancelPendingRequest.cancelPending(route.params.appointment_id)
                .then(cancelData => cancelData.json())
                .then(cancelData => {
                  if (cancelData === false) {
                    Alert.alert('Error, Try Again Later');
                  } else {
                    Alert.alert('Canceled Succesfully');
                  }
                });
            }}
          />
        </ScrollView>
      </ScreenContainer>
    );
  } else {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="#FF5722" />
      </ScreenContainer>
    );
  }
};

export const StudentInstructorList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [user, setUser] = React.useState([]);
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
      }
      if (data2 === false) {
        //Alert.alert('No instructor with same instrument in your area');
      }
    });

  //console.log(user);

  const message = 'No Instructor Available';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={user}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
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
            date: date.clone(),
            style: {backgroundColor: '#00FF7F'},
            textStyle: {color: 'black'},
            containerStyle: [],
          };
        });
        //console.log([data2])
        setSC(data2);
      }
      if (data === false) {
        Alert.alert('No Appointment Available');
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
          todayBackgroundColor="#00BCD4"
          selectedDayColor="#FF5722"
          onDateChange={val => {
            //console.log(val.format('l'));
            navigation.push('Appointment Request', {
              date: val.format('l'),
              id: route.params.parent.id,
            });
          }}
          customDatesStyles={customDatesStyles}
          minDate={moment()}
          disabledDates={val => {
            if (
              customDatesStyles.some(
                item => val.format('l') === item.date.format('l'),
              ) === false
            ) {
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

export const StudentAppointmentRequest = ({navigation, route}) => {
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
        //Alert.alert('No Appointments Available');
      }
    });

  const message = 'No Appointments Available';
  return (
    <ScreenContainer>
      <FlatList
        data={appt}
        ListEmptyComponent={<ListEmpty title={message}/>}
        ItemSeparatorComponent={FlatListItemSeparator}
        renderItem={({item}) => (
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'http://musicdoors.org/Assets/generalAppointment.png',
              }}
              style={userListStyles.imageView}
            />
            <Text
              style={userListStyles.textView}
              onPress={() => {
                //const textString = 'Requesting Appointment on: ' + toString(item.date) + '\nFrom: ' + toString(item.start) + '\nTo: ' + toString(item.end);
                // textString = toString(textString)
                //console.log(typeof userProfile.id);
               // console.log(typeof item.instructor_id);
               // console.log(typeof item.date);
               // console.log(typeof item.start);
               // console.log(typeof item.end);
                Alert.alert(
                  'Requesting Appointment',
                  `Date: ${item.date} \nFrom: ${item.start} \nTo: ${
                    item.end
                  }\n`,
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
                          item.end,
                        )
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

  const [email, setEmail] = React.useState('');
  const [password, setPass] = React.useState('');
  const [confPassword, setCPass] = React.useState('');
  const [first_name, setFName] = React.useState('');
  const [last_name, setLName] = React.useState('');
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
      <ScrollView
        style={{width: '90%'}}
        contentContainerStyle={{
          paddingLeft: 35,
          flexGrow: 1,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="always">
        <TextInput
          placeholder="Enter Email"
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          onChangeText={val => setEmail(val)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          onChangeText={val => setPass(val)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          onChangeText={val => setCPass(val)}
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
          onPress={() =>{
            if (password.length >= 8){
              if (password === confPassword) {
                signUp(
                  user_type_id,
                  email,
                  password,
                  first_name,
                  last_name,
                  phone_number,
                  street_address,
                  city,
                  st,
                  zip_code,
                  feeder_school,
                  current_school,
                  instrument,
                  instrument_2,
                  instrument_3,
                  code,
                )
              }else{
                Alert.alert("Passwords Do Not Match");
              }
            }else{
              Alert.alert("Password Minimum Length: 8");
            }
          }}>
          <Text style={styles.TextStyle}> Create Account </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

export const EditPrivateStudentProfile = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);

  const [userProfile, setUserProfile] = stateContext;

  const [email, setEmail] = React.useState(userProfile.email);
  const [password, setPass] = React.useState(userProfile.password);
  const [first_name, setFName] = React.useState(userProfile.first_name);
  const [last_name, setLName] = React.useState(userProfile.last_name);
  const [city, setCity] = React.useState(userProfile.city);
  const [st, setS] = React.useState(userProfile.state);
  const [zip_code, setZC] = React.useState(userProfile.zip_code);
  const [current_school, setCS] = React.useState(userProfile.current_school);
  const [feeder_school, setFS] = React.useState(userProfile.feeder_school);
  const [instrument, setInstrument] = React.useState(userProfile.instrument);
  const [instrument_2, setInstrument2] = React.useState(
    userProfile.instrument_2,
  );
  const [instrument_3, setInstrument3] = React.useState(
    userProfile.instrument_3,
  );

  const street_address = false;
  const phone_number = false;

  return (
    <ScreenContainer>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={profilePage.container}>
          <View style={[profilePage.card, profilePage.profileCard]}>
            <Image
              style={profilePage.avatar}
              source={{uri: userProfile.avatar}}
            />
            <Text style={profilePage.name}>
              {userProfile.first_name} {userProfile.last_name}
            </Text>
          </View>
          <CustomButton
            title="Upload Avatar"
            onPress={() => {
              chooseImage()
                .then(originalResponse => {
                  if (!originalResponse.cancelled) {
                    //console.log(originalResponse.uri);

                    //console.log(originalResponse.uri.type);

                    ImageResizer.createResizedImage(
                      originalResponse.uri,
                      600,
                      600,
                      'JPEG',
                      100,
                    )
                      .then(resizedImageUri => {
                        //console.log(resizedImageUri);
                        
                        var imageName = userProfile.email;
                        imageName = imageName.replace('@', '');
                        imageName = imageName.replace('.', '');
                        imageName = imageName.replace(' ', '');
                        imageName = userProfile.id + imageName;
                        var domainName = `http://musicdoors.org/Assets/Avatar/${imageName}.jpeg`;

                        var data = new FormData();
                        data.append('avatar', {
                          uri: resizedImageUri.uri,
                          name: 'avatar.jpg',
                          type: originalResponse.uri.type,
                        });

                        data.append('email', userProfile.email);
                        data.append('imageName', imageName);
                        fetch('http://musicdoors.org/Assets/UploadImage.php', {
                          method: 'POST',
                          body: data,
                          headers: {
                            Accept: 'application/json',
                          },
                        })
                          .then(data2 => data2.json())
                          .then(data2 => {
                            //console.log(data2);
                            if (data2 === false) {
                              //setUserProfile({...userProfile, avatar: data.avatar});
                              alert(
                                'An error occurred while uploading avatar.',
                              );
                            } else {
                              //console.log(userProfile);
                              setUserProfile({
                                ...userProfile,
                                avatar: data2.avatar,
                              });
                              //setTimeout(() => console.log(userProfile), 1000);
                              //console.log('here');
                            }
                          })
                          .then(data2 => {
                            //console.log(domainName);
                          })
                          .catch(err => {
                            console.error('upload error: ' + err);
                            alert('An error occurred while uploading avatar.');
                          });
                      })
                      .catch(err => {
                        // Oops, something went wrong. Check that the filename is correct and
                        // inspect err to get more details.
                      });
                  }
                })
                .catch(err => {
                  console.error('ImagePicker error: ' + err);
                  alert('An error occurred while selecting the avatar.');
                });
            }}
          />
          <TextInput
            placeholder={userProfile.email}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setEmail(val)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder={userProfile.password}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setPass(val)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder={userProfile.first_name}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setFName(val)}
          />
          <TextInput
            placeholder={userProfile.last_name}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setLName(val)}
          />

          <TextInput
            placeholder={userProfile.city}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setCity(val)}
          />

          <TextInput
            placeholder={userProfile.state}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setS(val)}
          />

          <TextInput
            placeholder={userProfile.zip_code}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setZC(val)}
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
            placeholder={userProfile.instrument}
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
            onPress={() => {
              //console.log(instrument_2);
              if (instrument == 'None') {
                setInstrument(null);
              }
              if (instrument_2 == 'None') {
                setInstrument2(null);
              }
              //console.log(instrument_2);
              if (instrument_3 == 'None') {
                setInstrument3(null);
              }
              UpdateStudent.update(
                userProfile.id,
                email,
                password,
                first_name,
                last_name,
                phone_number,
                street_address,
                city,
                st,
                zip_code,
                feeder_school,
                current_school,
                instrument,
                instrument_2,
                instrument_3,
              )
                .then(data => data.json())
                .then(data => {
                  if (data === false) {
                    Alert.alert('Error, try again later ');
                  } else {
                    setUserProfile({
                      ...userProfile,
                      email: email,
                      password: password,
                      first_name: first_name,
                      last_name: last_name,
                      phone_number: phone_number,
                      street_address: street_address,
                      city: city,
                      st: st,
                      zip_code: zip_code,
                      feeder_school: feeder_school,
                      current_school: current_school,
                      instrument: instrument,
                      instrument_2: instrument_2,
                      instrument_3: instrument_3,
                    });
                    Alert.alert('Profile updated successfully');
                  }
                });
            }}>
            <Text style={styles2.TextStyle}> Update Account </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export const PrivateStudentProfile = ({navigation, route}) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <CustomButton
        title="Edit Private Student Profile"
        onPress={() =>
          navigation.push('Edit Profile', {
            name: 'Edit Private Student Profile',
          })
        }
      />
      <CustomButton title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

export const PrivateStudentHome = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const schoolsContext = React.useContext(SchoolContext);
  const [schools, setSchools] = schoolsContext;

  //TODO: Remove Student Home and userProfile
  return (
    <ScreenContainer>
      <CustomButton
        title="Instructor List"
        onPress={() => navigation.push('Instructor List')}
      />
    </ScreenContainer>
  );
  //<Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
};

export const PrivateStudentAppointment = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <CustomButton
        title="Appointment List"
        onPress={() => navigation.push('Appointment')}
      />
      <CustomButton
        title="Pending Appointment List"
        onPress={() => navigation.push('Pending Appointment')}
      />
    </ScreenContainer>
  );
};

export const PrivateStudentAppointmentList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [appt, setAppt] = React.useState([]);
  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);

  StudentAllAppt.getAllAppt(userProfile.id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAppt(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Appointments Confirmed');
      }
    });

  //InstructorData.getInfo()
  const message = 'No Appointments Confirmed';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={appt}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() =>
                navigation.push('Appointment Info', {
                  instructor_id: item.instructor_id,
                  appointment_id: item.id,
                })
              }
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: 'http://musicdoors.org/Assets/generalAppointment.png',
                  }}
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

export const PrivateStudentAppointmentInfo = ({navigation, route}) => {
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
    .then(data => {
      //console.log(data);
      if (data === false) {
        Alert.alert('No Appointment Info');
      } else {
        setAI(data[0]);
        setCheck(1);
      }
    });

  //console.log(check);
  if (check > 0) {
    return (
      <ScreenContainer>
        <ScrollView>
          <View style={profilePage.container}>
            <View style={[profilePage.card, profilePage.profileCard]}>
              <Image
                style={profilePage.avatar}
                source={{uri: apptInfo.avatar}}
              />
              <Text style={profilePage.name}>
                {apptInfo.first_name} {apptInfo.last_name}
              </Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>Contact Info</Text>
              <Text> - {apptInfo.street_address}</Text>
              <Text>
                {' '}
                - {apptInfo.city},{apptInfo.state},{apptInfo.zip_code}
              </Text>
              <Text> - {apptInfo.phone_number}</Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>About</Text>
              <Text> - Instrument: {apptInfo.instrument}</Text>
              <Text> - Description: {apptInfo.description}</Text>
            </View>
          </View>
          <CustomCancelButton
            title="Request Cancelation"
            onPress={() => {
              Alert.alert(
                'Requesting Cancellation: \n',
                `Notifying ${apptInfo.first_name} ${apptInfo.last_name}`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('PRESSED'),
                    style: 'cancel',
                  },
                  {
                    text: 'Confirm',
                    onPress: () => {
                      //console.log(route.params.appointment_id);
                      CancelConfirmedAppt.requestCancel(
                        route.params.appointment_id,
                      )
                        .then(cancelData => cancelData.json())
                        .then(cancelData => {
                          if (cancelData === false) {
                            Alert.alert(
                              'Cancelation Request Pending:\n Tutor will email you shortly',
                            );
                          } else {
                            Alert.alert('Error, Try Again Later');
                          }
                        });
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
          />
        </ScrollView>
      </ScreenContainer>
    );
  } else {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="#FF5722" />
      </ScreenContainer>
    );
  }
};

export const PrivateStudentPendingAppointmentList = ({navigation}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [appt, setAppt] = React.useState([]);
  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);

  AllPendingAppt.getAllPendingAppt(userProfile.id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAppt(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Pending Appointments');
      }
    });

  //console.log(user);
  const message = 'No Pending Appointments';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={appt}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() =>
                navigation.push('Pending Appointment Info', {
                  instructor_id: item.instructor_id,
                  appointment_id: item.id,
                })
              }
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: 'http://musicdoors.org/Assets/generalAppointment.png',
                  }}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.date}
                  {'\n\n'}
                  {item.start}
                  {'-'}
                  {item.end}
                  {'\n\n'}
                  {'Appointment Status: Pending'}
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

export const PrivateStudentPendingAppointmentInfo = ({navigation, route}) => {
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
    .then(data => {
      //console.log(data);
      if (data === false) {
        Alert.alert('Error, Try Again Later');
      } else {
        setAI(data[0]);
        setCheck(1);
      }
    });

  //console.log(check);
  if (check > 0) {
    return (
      <ScreenContainer>
        <ScrollView>
          <View style={profilePage.container}>
            <View style={[profilePage.card, profilePage.profileCard]}>
              <Image
                style={profilePage.avatar}
                source={{uri: apptInfo.avatar}}
              />
              <Text style={profilePage.name}>
                {apptInfo.first_name} {apptInfo.last_name}
              </Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>Contact Info</Text>
              <Text> - {apptInfo.street_address}</Text>
              <Text>
                {' '}
                - {apptInfo.city},{apptInfo.state},{apptInfo.zip_code}
              </Text>
              <Text> - {apptInfo.phone_number}</Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>About</Text>
              <Text> - Instrument: {apptInfo.instrument}</Text>
              <Text> - Description: {apptInfo.description}</Text>
            </View>
          </View>
          <CustomCancelButton
            title="Cancel"
            onPress={() => {
              CancelPendingRequest.cancelPending(route.params.appointment_id)
                .then(cancelData => cancelData.json())
                .then(cancelData => {
                  if (cancelData === false) {
                    Alert.alert('Error, Try Again Later');
                  } else {
                    Alert.alert('Canceled Succesfully');
                  }
                });
            }}
          />
        </ScrollView>
      </ScreenContainer>
    );
  } else {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="#FF5722" />
      </ScreenContainer>
    );
  }
};

export const PrivateStudentInstructorList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [user, setUser] = React.useState([]);
  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);

  PrivateStudentInstructorL1.getInstructorList(
    userProfile.instrument,
    userProfile.instrument_2,
    userProfile.instrument_3,
  )
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setUser(data2);
      }
      if (data2 === false) {
        //Alert.alert('No instructor with same instrument in your area');
      }
    });

  //console.log(user);

  const message = 'No Instructor Available';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={user}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
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
                  {item.city}, {item.state}, {item.zip_code}
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

export const PrivateStudentBookingCalendar = ({route, navigation}) => {
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
            date: date.clone(),
            style: {backgroundColor: '#00FF7F'},
            textStyle: {color: 'black'},
            containerStyle: [],
          };
        });
        //console.log([data2])
        setSC(data2);
      }
      if (data === false) {
        Alert.alert('No Appointment Available');
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
          todayBackgroundColor="#00BCD4"
          selectedDayColor="#FF5722"
          onDateChange={val => {
            //console.log(val.format('l'));
            navigation.push('Appointment Request', {
              date: val.format('l'),
              id: route.params.parent.id,
            });
          }}
          customDatesStyles={customDatesStyles}
          minDate={moment()}
          disabledDates={val => {
            if (
              customDatesStyles.some(
                item => val.format('l') === item.date.format('l'),
              ) === false
            ) {
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

export const PrivateStudentAppointmentRequest = ({navigation, route}) => {
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
        //Alert.alert('No Appointments Available');
      }
    });

  const message = 'No Appointments Available';
  return (
    <ScreenContainer>
      <FlatList
        data={appt}
        ItemSeparatorComponent={FlatListItemSeparator}
        ListEmptyComponent={<ListEmpty title={message}/>}
        renderItem={({item}) => (
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'http://musicdoors.org/Assets/generalAppointment.png',
              }}
              style={userListStyles.imageView}
            />
            <Text
              style={userListStyles.textView}
              onPress={() => {
                //const textString = 'Requesting Appointment on: ' + toString(item.date) + '\nFrom: ' + toString(item.start) + '\nTo: ' + toString(item.end);
                // textString = toString(textString)
                //console.log(typeof userProfile.id);
                //console.log(typeof item.instructor_id);
                //console.log(typeof item.date);
                //console.log(typeof item.start);
                //console.log(typeof item.end);
                Alert.alert(
                  'Requesting Appointment',
                  `Date: ${item.date} \nFrom: ${item.start} \nTo: ${
                    item.end
                  }\n`,
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
                          item.end,
                        )
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
Instructor Screens
  + Create Account
  + Profile Screen
*/

export const InstructorCreateAccount = () => {
  const {signUp} = React.useContext(AuthContext);

  const schoolsInfoContext = React.useContext(SchoolContext);
  const [schools, setSchools] = schoolsInfoContext;

  const user_type_id = 5;

  const [email, setEmail] = React.useState('');
  const [password, setPass] = React.useState('');
  const [confPassword, setCPass] = React.useState('');
  const [first_name, setFName] = React.useState('');
  const [last_name, setLName] = React.useState('');
  const [street_address, setSA] = React.useState('');
  const [phone_number, setPN] = React.useState('');
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
      <ScrollView
        style={{width: '90%'}}
        contentContainerStyle={{
          paddingLeft: 35,
          flexGrow: 1,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="always">
        <TextInput
          placeholder="Enter Email"
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          onChangeText={val => setEmail(val)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          onChangeText={val => setPass(val)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          onChangeText={val => setCPass(val)}
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
          onPress={() =>{
            if (password.length >= 8){
              if (password === confPassword) {
                signUp(
                  user_type_id,
                  email,
                  password,
                  first_name,
                  last_name,
                  phone_number,
                  street_address,
                  city,
                  st,
                  zip_code,
                  feeder_school,
                  current_school,
                  instrument,
                  instrument_2,
                  instrument_3,
                  code,
                )
              }else{
                Alert.alert("Passwords Do Not Match");
              }
            }else{
              Alert.alert("Password Minimum Length: 8");
            }
          }}>
          <Text style={styles.TextStyle}> Create Account </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

export const EditInstructorProfile = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);

  const [userProfile, setUserProfile] = stateContext;
  const [street_address, setAddress] = React.useState(
    userProfile.street_address,
  );
  const [email, setEmail] = React.useState(userProfile.email);
  const [password, setPass] = React.useState(userProfile.password);
  const [first_name, setFName] = React.useState(userProfile.first_name);
  const [last_name, setLName] = React.useState(userProfile.last_name);
  const [city, setCity] = React.useState(userProfile.city);
  const [st, setS] = React.useState(userProfile.state);
  const [zip_code, setZC] = React.useState(userProfile.zip_code);
  const [current_school, setCS] = React.useState(userProfile.current_school);
  const [feeder_school, setFS] = React.useState(userProfile.feeder_school);
  const [instrument, setInstrument] = React.useState(userProfile.instrument);
  const [instrument_2, setInstrument2] = React.useState(
    userProfile.instrument_2,
  );
  const [instrument_3, setInstrument3] = React.useState(
    userProfile.instrument_3,
  );
  const [phone_number, setPN] = React.useState(userProfile.phone_number);

  return (
    <ScreenContainer>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={profilePage.container}>
          <View style={[profilePage.card, profilePage.profileCard]}>
            <Image
              style={profilePage.avatar}
              source={{uri: userProfile.avatar}}
            />
            <Text style={profilePage.name}>
              {userProfile.first_name} {userProfile.last_name}
            </Text>
          </View>
          <CustomButton
            title="Upload Avatar"
            onPress={() => {
              chooseImage()
                .then(originalResponse => {
                  if (!originalResponse.cancelled) {
                    //console.log(originalResponse.uri);

                    //console.log(originalResponse.uri.type);

                    ImageResizer.createResizedImage(
                      originalResponse.uri,
                      600,
                      600,
                      'JPEG',
                      100,
                    )
                      .then(resizedImageUri => {
                        //console.log(resizedImageUri);

                        
                        var imageName = userProfile.email;
                        imageName = imageName.replace('@', '');
                        imageName = imageName.replace('.', '');
                        imageName = imageName.replace(' ', '');
                        imageName = userProfile.id + imageName;
                        var domainName = `http://musicdoors.org/Assets/Avatar/${imageName}.jpeg`;

                        var data = new FormData();
                        data.append('avatar', {
                          uri: resizedImageUri.uri,
                          name: 'avatar.jpg',
                          type: originalResponse.uri.type,
                        });

                        data.append('email', userProfile.email);
                        data.append('imageName', imageName);
                        fetch('http://musicdoors.org/Assets/UploadImage.php', {
                          method: 'POST',
                          body: data,
                          headers: {
                            Accept: 'application/json',
                          },
                        })
                          .then(data2 => data2.json())
                          .then(data2 => {
                            //console.log(data2);
                            if (data2 === false) {
                              //setUserProfile({...userProfile, avatar: data.avatar});
                              alert(
                                'An error occurred while uploading avatar.',
                              );
                            } else {
                              //console.log(userProfile);
                              setUserProfile({
                                ...userProfile,
                                avatar: data2.avatar,
                              });
                              //setTimeout(() => console.log(userProfile), 1000);
                              //console.log('here');
                            }
                          })
                          .catch(err => {
                            console.error('upload error: ' + err);
                            alert('An error occurred while uploading avatar.');
                          });
                      })
                      .catch(err => {
                        console.error('ImagePicker error: ' + err);
                        alert('An error occurred while selecting the avatar.');
                      });
                  }
                })
                .catch(err => {
                  console.error('ImagePicker error: ' + err);
                  alert('An error occurred while selecting the avatar.');
                });
            }}
          />
          <TextInput
            placeholder={userProfile.email}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setEmail(val)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder={userProfile.password}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setPass(val)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder={userProfile.first_name}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setFName(val)}
          />
          <TextInput
            placeholder={userProfile.last_name}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setLName(val)}
          />
          <TextInput
            placeholder={userProfile.phone_number}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setPN(val)}
          />
          <TextInput
            placeholder={userProfile.street_address}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setAddress(val)}
          />
          <TextInput
            placeholder={userProfile.city}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setCity(val)}
          />
          <TextInput
            placeholder={userProfile.state}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setS(val)}
          />
          <TextInput
            placeholder={userProfile.zip_code}
            underlineColorAndroid="transparent"
            style={styles2.TextInputStyleClass}
            onChangeText={val => setZC(val)}
          />
          <TextInput
            placeholder={userProfile.feeder_school}
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
            placeholder={userProfile.instrument}
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
            onPress={() => {
              if (instrument == 'None') {
                setInstrument(null);
              }
              if (instrument_2 == 'None') {
                setInstrument2(null);
              }
              //console.log(instrument_2);
              if (instrument_3 == 'None') {
                setInstrument3(null);
              }
              UpdateStudent.update(
                userProfile.id,
                email,
                password,
                first_name,
                last_name,
                phone_number,
                street_address,
                city,
                st,
                zip_code,
                feeder_school,
                current_school,
                instrument,
                instrument_2,
                instrument_3,
              )
                .then(data => data.json())
                .then(data => {
                  if (data === false) {
                    Alert.alert('Error, try again later ');
                  } else {
                    setUserProfile({
                      ...userProfile,
                      email: email,
                      password: password,
                      first_name: first_name,
                      last_name: last_name,
                      phone_number: phone_number,
                      street_address: street_address,
                      city: city,
                      st: st,
                      zip_code: zip_code,
                      feeder_school: feeder_school,
                      current_school: current_school,
                      instrument: instrument,
                      instrument_2: instrument_2,
                      instrument_3: instrument_3,
                    });
                    Alert.alert('Profile updated successfully');
                  }
                });
            }}>
            <Text style={styles2.TextStyle}> Update Account </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export const InstructorProfile = ({navigation, route}) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <CustomButton
        title="Edit Instructor Profile"
        onPress={() =>
          navigation.push('Edit Profile', {name: 'Edit Instructor Profile'})
        }
      />
      <CustomButton title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

export const InstructorHome = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  //<Text>{userProfile ? userProfile.email : 'abc'}</Text>
  return (
    <ScreenContainer>
      <CustomButton
        title="Student List"
        onPress={() => navigation.push('Student List')}
      />
      <CustomButton
        title="Private Student List"
        onPress={() => navigation.push('Private Student List')}
      />
    </ScreenContainer>
  );
};

export const InstructorStudentList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [studentUser, setStudentUser] = React.useState(null);

  InstructorStudentL1.getStudentList(
    userProfile.feeder_school,
    userProfile.instrument,
    userProfile.instrument_2,
    userProfile.instrument_3,
  )
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setStudentUser(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Students Booked Under Instructor');
      }
    });

  //console.log(studentUser);
  const message = 'No Students Booked Under Instructor';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={studentUser}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() => navigation.push('Director List', {parent: item})}
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{uri: item.avatar}}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.first_name} {item.last_name}
                  {'\n\n'}
                  {item.current_school}
                  {'\n'}
                  {item.feeder_school}
                  {'\n'}
                  {item.email}
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

export const InstructorDirectorList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [directorUsers, setDirectorUser] = React.useState(null);

  DirectorList.getDirectorList(route.params.parent.current_school)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setDirectorUser(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Director');
      }
    });

  //console.log(studentUser);
  const message = 'No Directors Available';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={directorUsers}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() => navigation.push('Director Info', {parent: item})}
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{uri: item.avatar}}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.first_name} {item.last_name}
                  {'\n\n'}
                  {item.current_school}
                  {'\n'}
                  {item.email}
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

export const InstructorDirectorInfo = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;
  const [director, setDirector] = React.useState([]);

  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);
  const [check, setCheck] = React.useState(0);
  //console.log(route.params.parent.id);
  DirectorData.getInfo(route.params.parent.id)
    .then(data => data.json())
    .then(data => {
      //console.log(data);
      if (data.length > 0) {
        setDirector(data[0]);
        setCheck(1);
      }
      if (data === false) {
        Alert.alert('Error, Try Again Later');
      }
    });

  //console.log(check);
  if (check > 0) {
    return (
      <ScreenContainer>
        <ScrollView>
          <View style={profilePage.container}>
            <View style={[profilePage.card, profilePage.profileCard]}>
              <Image
                style={profilePage.avatar}
                source={{uri: director.avatar}}
              />
              <Text style={profilePage.name}>
                {director.first_name} {director.last_name}
              </Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>Contact Info</Text>
              <Text>
                {' '}
                - {director.city},{director.state},{director.zip_code}
              </Text>
              <Text> - {director.email}</Text>
              <Text> - {director.phone_number}</Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>About</Text>
              <Text> - School: {director.current_school}</Text>
              <Text> - Description: {director.description}</Text>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  } else {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="#FF5722" />
      </ScreenContainer>
    );
  }
};

export const InstructorPrivateStudentList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [studentUser, setStudentUser] = React.useState(null);

  InstructorPrivateStudentL1.getPrivateStudentList(
    userProfile.instrument,
    userProfile.instrument_2,
    userProfile.instrument_3,
  )
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setStudentUser(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Private Students Matched');
      }
    });

  //console.log(studentUser);

  const message = 'No Private Students Available';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={studentUser}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                source={{uri: item.avatar}}
                style={userListStyles.imageView}
              />
              <Text style={userListStyles.textView}>
                {item.first_name} {item.last_name}
                {'\n\n'}
                {item.current_school}
                {'\n'}
                {item.feeder_school}
                {'\n'}
                {item.email}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScreenContainer>
  );
};

export const InstructorAppointment = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  return (
    <ScreenContainer>
      <CustomButton
        title="Confirmed Appointment"
        onPress={() => navigation.push('Confirmed Appointment')}
      />
      <CustomButton
        title="Pending Appointment"
        onPress={() => navigation.push('Pending Appointment')}
      />
      <CustomButton
        title="Appointment Creator"
        onPress={() => navigation.push('Appointment Creator')}
      />
      <CustomButton
        title="View Open Appointments"
        onPress={() => navigation.push('View Open Appointments')}
      />
      <CustomButton
        title="Cancellation Requests"
        onPress={() => navigation.push('Cancellation Requests')}
      />
    </ScreenContainer>
  );
};
/*
  <Button
        title="Create Appointment"
        onPress={() => navigation.push('Create Appointment')}
      />
      <Button
        title="Delete Appointment"
        onPress={() => navigation.push('Delete Appointment')}
      />
      <Button
        title="Cancellation Request"
        onPress={() => navigation.push('Cancellation Request')}
      />

*/

export const InstructorConfirmedAppointmentList = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [appt, setAppt] = React.useState([]);
  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);

  InstructorAllAppt.getAllAppt(userProfile.id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAppt(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Appointments');
      }
    });

  const message = 'No Appointments Available';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={appt}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() =>
                navigation.push('Confirmed Appointment Info', {
                  student_id: item.student_id,
                  appointment_id: item.id,
                })
              }
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: 'http://musicdoors.org/Assets/generalAppointment.png',
                  }}
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

export const InstructorConfirmedAppointmentInfo = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;
  const [apptInfo, setAI] = React.useState([]);

  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);
  const [check, setCheck] = React.useState(0);
  StudentData.getApptInfo(route.params.student_id)
    .then(data => data.json())
    .then(data => {
      //console.log(data);
      if (data === false) {
        Alert.alert('Error, Try Again Later');
      } else {
        setAI(data[0]);
        setCheck(1);
      }
    });

  //console.log(check);
  if (check > 0) {
    return (
      <ScreenContainer>
        <ScrollView>
          <View style={profilePage.container}>
            <View style={[profilePage.card, profilePage.profileCard]}>
              <Image
                style={profilePage.avatar}
                source={{uri: apptInfo.avatar}}
              />
              <Text style={profilePage.name}>
                {apptInfo.first_name} {apptInfo.last_name}
              </Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>Contact Info</Text>
              <Text> - {apptInfo.email}</Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>About</Text>
              <Text> - Instrument: {apptInfo.instrument}</Text>
              <Text> - Description: {apptInfo.description}</Text>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  } else {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="#FF5722" />
      </ScreenContainer>
    );
  }
};

export const InstructorPendingAppointmentList = ({navigation}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [appt, setAppt] = React.useState([]);
  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);

  InstructorAllPendingAppt.getAllPendingAppt(userProfile.id)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAppt(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Pending Appointments');
      }
    });

  //console.log(user);

  const message = 'No Pending Appointments';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={appt}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() =>
                navigation.push('Pending Appointment Info', {
                  student_id: item.student_id,
                  appointment_id: item.id,
                })
              }
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: 'http://musicdoors.org/Assets/generalAppointment.png',
                  }}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.date}
                  {'\n\n'}
                  {item.start}
                  {'-'}
                  {item.end}
                  {'\n\n'}
                  {'Appointment Status: Pending'}
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

export const InstructorPendingAppointmentInfo = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;
  const [apptInfo, setAI] = React.useState([]);

  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);
  const [check, setCheck] = React.useState(0);
  StudentData.getApptInfo(route.params.student_id)
    .then(data => data.json())
    .then(data => {
      //console.log(data);
      if (data === false) {
        Alert.alert('No Pending Appointments');
      } else {
        setAI(data[0]);
        setCheck(1);
      }
    });

  //console.log(check);
  if (check > 0) {
    return (
      <ScreenContainer>
        <ScrollView>
          <View style={profilePage.container}>
            <View style={[profilePage.card, profilePage.profileCard]}>
              <Image
                style={profilePage.avatar}
                source={{uri: apptInfo.avatar}}
              />
              <Text style={profilePage.name}>
                {apptInfo.first_name} {apptInfo.last_name}
              </Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>Contact Info</Text>
              <Text> - {apptInfo.email}></Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>About</Text>
              <Text> - Instrument: {apptInfo.instrument}</Text>
              <Text> - Description: {apptInfo.description}</Text>
            </View>
          </View>
          <CustomCancelButton
            title="Confirm"
            onPress={() => {
              ConfirmPendingRequest.confirmPending(route.params.appointment_id)
                .then(cancelData => cancelData.json())
                .then(cancelData => {
                  if (cancelData === false) {
                    Alert.alert('Error, Try Again Later');
                  } else {
                    Alert.alert('Confirmed Succesfully');
                  }
                });
            }}
          />
        </ScrollView>
      </ScreenContainer>
    );
  } else {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="#FF5722" />
      </ScreenContainer>
    );
  }
};

export const InstructorAppointmentCreator = ({route, navigation}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;
  const [choice, setChoice] = React.useState(null);
  const [customDatesStyles, setSC] = React.useState([]);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <CalendarPicker
          todayBackgroundColor="#00BCD4"
          selectedDayColor="#FF5722"
          onDateChange={val => {
            navigation.push('Create Session', {date: val.format('l')});
          }}
          customDatesStyles={customDatesStyles}
          minDate={moment()}
        />
      </View>
    </ScreenContainer>
  );
};

export const InstructorCreateSession = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [endTime, setEndTime] = React.useState('');
  const [startTime, setStartTime] = React.useState('');

  return (
    <ScreenContainer>
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setStartTime(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={fixedTimes}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Select Start Time"
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
      <SearchableDropdown
        onTextChange={text => console.log(text)}
        //On text change listner on the searchable input
        onItemSelect={item => setEndTime(item.name)}
        //onItemSelect called after the selection from the dropdown
        containerStyle={styles.ddContainerStyle}
        //suggestion container style
        textInputStyle={styles.ddInputStyle}
        itemStyle={styles.ddItemStyle}
        itemTextStyle={styles.ddItemTextStyle}
        itemsContainerStyle={styles.ddItemsContainerStyle}
        items={fixedTimes}
        //mapping of item array
        //defaultIndex={2}
        //default selected item index
        placeholder="Select End Time"
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
          if (startTime === endTime) {
            Alert.alert('Conflicting Start Time and End Time,\n Try Again');
          } else {
            CreateAppointment.createAppt(
              userProfile.id,
              startTime,
              endTime,
              route.params.date,
            )
              .then(data => data.json)
              .then(data => {
                if (data === false) {
                  Alert.alert('Error Adding Appointment, Try Again Later');
                } else {
                  Alert.alert(
                    `Successfully Added Appointment on ${
                      route.params.date
                    }\nStart Time: ${startTime}\nEnd Time: ${endTime}`,
                  );
                }
              });
          }
        }}>
        <Text style={styles.TextStyle}> Create New Session </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const InstructorViewAppointments = ({route, navigation}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;
  const [customDatesStyles, setSC] = React.useState([]);
  //const [customDatesStyles, setSC] = React.useState(null);

  //console.log(route.params.parent.id);

  let today = moment();
  let day = today.clone().startOf('month');

  //console.log(day.clone());

  InstructorAllOpenAppt.getAllAppt(userProfile.id)
    .then(data => data.json())
    .then(data => {
      //console.log(data2)
      if (data.length > 0) {
        //console.log(data);
        var data2 = data.map(function(item) {
          let date = moment(item.date, 'MM/DD/YYYY');
          return {
            date: date.clone(),
            style: {backgroundColor: '#00FF7F'},
            textStyle: {color: 'black'},
            containerStyle: [],
          };
        });
        //console.log([data2])
        setSC(data2);
      }
      if (data === false) {
        Alert.alert('No Appointments Available');
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
          todayBackgroundColor="#00BCD4"
          selectedDayColor="#FF5722"
          onDateChange={val => {
            navigation.push('View Sessions', {date: val.format('l')});
          }}
          customDatesStyles={customDatesStyles}
          disabledDates={val => {
            if (
              customDatesStyles.some(
                item => val.format('l') === item.date.format('l'),
              ) === false
            ) {
              return true;
            } else {
              return false;
            }
          }}
          minDate={moment()}
        />
      </View>
    </ScreenContainer>
  );
};

export const InstructorViewSessions = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [apptList, setAL] = React.useState(null);

  //TODO
  DayApptList.getAllAppt(userProfile.id, route.params.date)
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        setAL(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Access Codes Available');
      }
    });

  const message = 'No Access Codes Available';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={apptList}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                source={{
                  uri: 'http://musicdoors.org/Assets/generalAppointment.png',
                }}
                style={userListStyles.imageView}
              />
              <Text
                style={userListStyles.textView}
                onPress={() => {
                  Alert.alert(
                    'Delete Appointment on\n',
                    item.date,
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: () => {
                          DeleteAppointment.deleteAppt(item.id)
                            .then(data => data.json())
                            .then(data => {
                              if (data === false) {
                                Alert.alert(`Deleted Appointment`);
                              } else {
                                Alert.alert('Not Deleted, Try Again Later');
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
                {'Appointment Status: Available'}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScreenContainer>
  );
};

export const InstructorCancelAppointmentList = ({navigation}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;

  const [appt, setAppt] = React.useState([]);
  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);

  InstructorAllCancelAppt.getAllCancelAppt(userProfile.id)
    .then(data2 => data2.json())
    .then(data2 => {
      //console.log(data2);
      //console.log(typeof data2);
      if (data2.length > 0) {
        setAppt(data2);
      }
      if (data2 === false) {
        //Alert.alert('No Cancellation Requests');
      }
    });

  //console.log(user);

  const message = 'No Cancellation Requests';
  return (
    <ScreenContainer>
      <View style={userListStyles.MainContainer}>
        <FlatList
          data={appt}
          ItemSeparatorComponent={FlatListItemSeparator}
          ListEmptyComponent={<ListEmpty title={message}/>}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() =>
                navigation.push('Cancel Pending Info', {
                  student_id: item.student_id,
                  appointment_id: item.id,
                })
              }
              underlayColor={'#FF5722'}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: 'http://musicdoors.org/Assets/generalAppointment.png',
                  }}
                  style={userListStyles.imageView}
                />
                <Text style={userListStyles.textView}>
                  {item.date}
                  {'\n\n'}
                  {item.start}
                  {'-'}
                  {item.end}
                  {'\n\n'}
                  {'Appointment Status: Cancellation Requested'}
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

export const InstructorCancelPendingInfo = ({navigation, route}) => {
  const stateContext = React.useContext(StateContext);
  const [userProfile, setUserProfile] = stateContext;
  const [apptInfo, setAI] = React.useState([]);

  //console.log(userProfile.feeder_school);
  //console.log(userProfile.instrument);
  //console.log(userProfile.instrument_2);
  //console.log(userProfile.instrument_3);
  const [check, setCheck] = React.useState(0);
  StudentData.getApptInfo(route.params.student_id)
    .then(data => data.json())
    .then(data => {
      //console.log(data);
      if (data === false) {
        Alert.alert('Error, Try Again Later');
      } else {
        setAI(data[0]);
        setCheck(1);
      }
    });

  //console.log(check);
  if (check > 0) {
    return (
      <ScreenContainer>
        <ScrollView>
          <View style={profilePage.container}>
            <View style={[profilePage.card, profilePage.profileCard]}>
              <Image
                style={profilePage.avatar}
                source={{uri: apptInfo.avatar}}
              />
              <Text style={profilePage.name}>
                {apptInfo.first_name} {apptInfo.last_name}
              </Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>Contact Info</Text>
              <Text> - {apptInfo.email}></Text>
            </View>
            <View style={profilePage.card}>
              <Text style={profilePage.cardTittle}>About</Text>
              <Text> - Instrument: {apptInfo.instrument}</Text>
              <Text> - Description: {apptInfo.description}</Text>
            </View>
          </View>
          <CustomCancelButton
            title="Confirm Cancellation Request"
            onPress={() => {
              InstructorCancelPendingRequest.cancel(route.params.appointment_id)
                .then(cancelData => cancelData.json())
                .then(cancelData => {
                  if (cancelData === false) {
                    Alert.alert('Canceled Successfully');
                  } else {
                    Alert.alert('Error, Try Again Later');
                  }
                });
            }}
          />
        </ScrollView>
      </ScreenContainer>
    );
  } else {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="#FF5722" />
      </ScreenContainer>
    );
  }
};

//In Progress Edit Profile Screens

export const Gallery = ({navigation, route}) => {
  const galleryContext = React.useContext(GalleryContext);
  const [galleryImages, setImages] = galleryContext;

  const width = Dimensions.get('window').width;

  const gridStyle = {
    width: '100%',
    height: '100%',
    margin: 'auto',
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: '#fff',
  };

  const activeStyle = {
    width: '100%',
    height: '100%',
    margin: 'auto',
    resizeMode: 'contain',
    borderWidth: 0,
  };
  const screenWidth = Dimensions.get('window').width;
  return (
    <ScrollView>
      <View
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}>
        {galleryImages.map((image, i) => (
          <View
            style={{
              width: screenWidth / 2,
              height: screenWidth / 2,
              padding: 2,
            }}>
            <Lightbox
              activeProps={activeStyle}
              backgroundColor="rgba(0, 0, 0, 0.8)">
              <Image style={gridStyle} source={{uri: image.name}} key={i} />
            </Lightbox>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

function chooseImage() {
  return new Promise((resolve, reject) => {
    let options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    //launchImageLibraryAsync(option, repsonse => 
    ImagePicker.showImagePicker(options, response => {
      //console.log(response);
      if (response.didCancel) {
        resolve({cancelled: true});
      } else if (response.error) {
        console.error('ImagePicker Error: ' + response.error);
        reject(response.error);
      } else {
        resolve({
          path: response,
          data: response.data,
          uri: response.uri,
        });
      }
    });
  });
}

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
      <CustomButton
        title="React Native by Example"
        onPress={() =>
          navigation.push('Details', {name: 'React Native by Example '})
        }
      />
      <CustomButton
        title="React Native School"
        onPress={() =>
          navigation.push('Details', {name: 'React Native School'})
        }
      />
      <CustomButton title="Drawer" onPress={() => navigation.toggleDrawer()} />
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
      <CustomButton
        title="Search 2"
        onPress={() => navigation.push('Search2')}
      />
      <CustomButton
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

const CustomButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          textAlign: 'center',
          marginVertical: 10,
          color: '#2096F4',
          fontSize: 18,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

//color: '#ff5c5c',

const CustomCancelButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          textAlign: 'center',
          marginVertical: 10, 
          color: '#ff5c5c',
          fontSize: 18,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const ListEmpty = ({title}) => {
  return (
    //View to show when list is empty
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', color:'#FF5722',fontSize:17,marginVertical: 10,}}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Orange: {
    color: '#FF5722',
    fontSize: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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
    height: screenHeight / 2.4,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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
    alignContent: 'center',
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
    backgroundColor: 'rgba(255,255,255,1)',
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

const androidStyles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    color: '#00f',
  },
});
const userListStyles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },

  imageView: {
    width: '50%',
    height: 120,
    margin: 2,
    borderRadius: 7,
  },

  textView: {
    width: '50%',
    textAlignVertical: 'center',
    padding: 10,
    color: '#000',
  },
});

const profilePage = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#ffa500',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    padding: 40,
    backgroundColor: '#d3d3d3',
    textDecorationColor: '#fff',
  },
  cardTittle: {
    fontSize: 20,
    marginBottom: 5,
  },
  avatar: {
    width: 150,
    height: 150,
  },
  card: {
    backgroundColor: '#00BCD4',
    borderRadius: 5,
    padding: 10,
    height: 100,
    width: 300,
    marginTop: 10,
    marginBottom:10,
  },
  profileCard: {
    height: 200,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:10,
  },
  descr: {
    fontSize: 15,
  },
  name: {
    marginTop: 10,
    fontSize: 24,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
  },
  photosCard: {
    marginTop: 10,
  },
  photo: {
    width: 113,
    height: 113,
    marginTop: 5,
    marginRight: 5,
  },
});



const stylesPM= {
  container: { flex: 1, justifyContent: "center" },
  input: {
    margin: 5,
    padding: 6,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: "#eceff1"
  }
};



