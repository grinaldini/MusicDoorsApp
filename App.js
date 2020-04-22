import React, {Component} from 'react';

//Style
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
} from 'react-native';

import moment from 'moment';

//Navigators and Stack Containers
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

//contexts
import {
  AuthContext,
  StateContext,
  GalleryContext,
  SchoolContext,
  ResetContext,
} from './context';

//API's
import AuthApi from './API/auth';
import CheckAccessCode from './API/AccessCode/checkAccessCode';
import CheckResetCode from './API/AccessCode/checkResetCode';
import UpdateResetPassword from './API/User/resetPassword';
import UserRegistration from './API/User/userRegistration';
import DupRegistration from './API/User/dupRegistration';
import GetGallery from './API/Gallery/getGallery';
import GetSchools from './API/SchoolsList/getSchools';
import EmailPassword from './API/User/emailPassword';

//Screens
import {
  Welcome,
  SignIn,
  ForgotPassword,
  ResetPassword,
  AdminProfile,
  AdminHome,
  AdminCodeGenerator,
  EditAdminProfile,
  AdminDirectorList,
  AdminStudentList,
  AdminPrivateStudentList,
  AdminInstructorList,
  AdminAppointmentList,
  AdminParticipantsInfo,
  AdminCreateAccessCode,
  AdminDeleteAccessCode,
  DirectorCreateAccount,
  DirectorProfile,
  DirectorHome,
  DirectorStudentList,
  DirectorAppointmentList,
  DirectorParticipantsInfo,
  EditDirectorProfile,
  StudentCreateAccount,StudentProfile,StudentHome,EditStudentProfile,StudentInstructorList,StudentBookingCalendar,StudentAppointmentRequest,StudentAppointmentList,StudentPendingAppointmentList,StudentCancelAppointmentList,StudentAppointmentInfo,StudentPendingAppointmentInfo,StudentAppointment,
  PrivateStudentCreateAccount,PrivateStudentProfile,PrivateStudentHome,EditPrivateStudentProfile,PrivateStudentInstructorList,PrivateStudentBookingCalendar,PrivateStudentAppointmentRequest,PrivateStudentAppointmentList,PrivateStudentPendingAppointmentList,PrivateStudentCancelAppointmentList,PrivateStudentAppointmentInfo,PrivateStudentPendingAppointmentInfo,PrivateStudentAppointment,
  InstructorCreateAccount,
  InstructorProfile,
  InstructorHome,
  InstructorStudentList,
  InstructorDirectorList,
  InstructorDirectorInfo,
  InstructorPrivateStudentList,
  InstructorAppointment,
  InstructorConfirmedAppointmentList,
  InstructorConfirmedAppointmentInfo,
  InstructorPendingAppointmentList,
  InstructorPendingAppointmentInfo,
  InstructorAppointmentCreator,
  InstructorCreateSession,
  InstructorViewAppointments,
  InstructorViewSessions,
  InstructorCancelAppointmentList,
  InstructorCancelPendingInfo,
  EditInstructorProfile,
  Gallery,
  Search,
  Home,
  Details,
  Search2,
  Splash,
} from './Screens';
import CreateAccessCode from './API/AccessCode/createAccessCode';
import DeleteAccessCode from './API/AccessCode/deleteAccessCode';

//Navigator => Authorization Stack
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Welcome"
      component={Welcome}
      options={{title: 'Welcome'}}
    />
    {/*
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{title: 'Sign In'}}
    />
    */}
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{title: 'Sign In'}}
    />
    <AuthStack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{title: 'Forgot Password'}}
    />
    <AuthStack.Screen
      name="ResetPassword"
      component={ResetPassword}
      options={{title: 'Reset Password'}}
    />
    <AuthStack.Screen
      name="DirectorCreateAccount"
      component={DirectorCreateAccount}
      options={{title: 'Director Create Account'}}
    />
    <AuthStack.Screen
      name="StudentCreateAccount"
      component={StudentCreateAccount}
      options={{title: 'Student Create Account'}}
    />
    <AuthStack.Screen
      name="PrivateStudentCreateAccount"
      component={PrivateStudentCreateAccount}
      options={{title: 'Private Student Create Account'}}
    />
    <AuthStack.Screen
      name="InstructorCreateAccount"
      component={InstructorCreateAccount}
      options={{title: 'Instructor Create Account'}}
    />
  </AuthStack.Navigator>
);

// Define Bottom Tabs navigator, and the Navigator for the Bottom Tab options

const Tabs = createBottomTabNavigator();

const SearchStack = createStackNavigator();
const ListStack = createStackNavigator();

const HomeStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const ProfileStack = createStackNavigator();

//Administrator
// + Bottom Tabs
// + Drawer

const AdminTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={AdminHomeStackScreen} />
    <Tabs.Screen name="Code Generator" component={AdminCGStackScreen} />
  </Tabs.Navigator>
);

const AdminHomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={AdminHome} />
    <HomeStack.Screen name="Director List" component={AdminDirectorList} />
    <HomeStack.Screen
      name="Admin Student List"
      component={AdminStudentList}
      options={({route}) => ({
        parent: route.params.parent,
      })}
    />
    <HomeStack.Screen
      name="Private Student List"
      component={AdminPrivateStudentList}
    />
    <HomeStack.Screen name="Instructor List" component={AdminInstructorList} />
    <HomeStack.Screen
      name="Appointment List"
      component={AdminAppointmentList}
    />
    <HomeStack.Screen
      name="Participants Info"
      component={AdminParticipantsInfo}
      options={({route}) => ({
        parent: route.params.parent,
      })}
    />
  </HomeStack.Navigator>
);

const AdminUserListsStackScreen = () => (
  <ListStack.Navigator>
    <ListStack.Screen
      name="Admin Director List"
      component={AdminDirectorList}
      options={({route}) => ({
        school: route.params.profile,
      })}
    />
    <ListStack.Screen
      name="Admin Student List"
      component={AdminStudentList}
      options={({route}) => ({
        title: route.params.profile,
      })}
    />
    <ListStack.Screen
      name="Admin Private Student List"
      component={AdminPrivateStudentList}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
    <ListStack.Screen
      name="Admin Instructor List"
      component={AdminInstructorList}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
    <ListStack.Screen
      name="Admin Appointment List"
      component={AdminAppointmentList}
    />
    <ListStack.Screen
      name="Admin Instructor Info"
      component={AdminInstructorList}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </ListStack.Navigator>
);

const AdminCGStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="Access Code Generator"
      component={AdminCodeGenerator}
    />
    <SearchStack.Screen
      name="Create Access Code"
      component={AdminCreateAccessCode}
    />
    <SearchStack.Screen
      name="View Access Codes"
      component={AdminDeleteAccessCode}
    />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const AdminProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Admin Profile" component={AdminProfile} />
    <HomeStack.Screen
      name="Edit Profile"
      component={EditAdminProfile}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </ProfileStack.Navigator>
);

const DrawerScreen1 = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={AdminTabsScreen} />
    <Drawer.Screen name="Profile" component={AdminProfileStackScreen} />
  </Drawer.Navigator>
);

//Director
// + Bottom Tabs
// + Drawer

const DirectorTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={DirectorHomeStackScreen} />
    <Tabs.Screen name="Gallery" component={GalleryStackScreen} />
  </Tabs.Navigator>
);

const DirectorHomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={DirectorHome} />
    <HomeStack.Screen name="Student List" component={DirectorStudentList} />
    <HomeStack.Screen
      name="Appointment List"
      component={DirectorAppointmentList}
      options={({route}) => ({
        student_id: route.params.student_id,
      })}
    />
    <HomeStack.Screen
      name="Participants Info"
      component={DirectorParticipantsInfo}
      options={({route}) => ({
        parent: route.params.parent,
      })}
    />
  </HomeStack.Navigator>
);

const DirectorProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Director Profile" component={DirectorProfile} />
    <ProfileStack.Screen
      name="Edit Profile"
      component={EditDirectorProfile}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </ProfileStack.Navigator>
);

const DrawerScreen2 = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={DirectorTabsScreen} />
    <Drawer.Screen name="Profile" component={DirectorProfileStackScreen} />
  </Drawer.Navigator>
);

//Student
// + Bottom Tabs
// + Drawer

const StudentTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={StudentHomeStackScreen} />
    <Tabs.Screen name="Appointment" component={StudentAppointmentStackScreen} />
  </Tabs.Navigator>
);

const StudentHomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={StudentHome} />
    <HomeStack.Screen
      name="Instructor List"
      component={StudentInstructorList}
    />
    <HomeStack.Screen
      name="Booking Calendar"
      component={StudentBookingCalendar}
      options={({route}) => ({
        parent: route.params.parent,
      })}
    />
    <HomeStack.Screen
      name="Appointment Request"
      component={StudentAppointmentRequest}
      options={({route}) => ({
        parent: route.params.parent,
        id: route.params.instructor_id,
      })}
    />
  </HomeStack.Navigator>
);

const StudentAppointmentStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="Appointment Menu"
      component={StudentAppointment}
    />
    <SearchStack.Screen name="Appointment" component={StudentAppointmentList} />
    <SearchStack.Screen
      name="Appointment Info"
      component={StudentAppointmentInfo}
      options={({route}) => ({
        instructor_id: route.params.instructor_id,
        appointment_id: route.params.appointment_id,
      })}
    />
    <SearchStack.Screen
      name="Pending Appointment Info"
      component={StudentPendingAppointmentInfo}
      options={({route}) => ({
        instructor_id: route.params.instructor_id,
        appointment_id: route.params.appointment_id,

      })}
    />
    <SearchStack.Screen
      name="Pending Appointment"
      component={StudentPendingAppointmentList}
    />
  </SearchStack.Navigator>
);

const StudentProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Student Profile" component={StudentProfile} />
    <HomeStack.Screen
      name="Edit Profile"
      component={EditStudentProfile}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </ProfileStack.Navigator>
);

const DrawerScreen3 = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={StudentTabsScreen} />
    <Drawer.Screen name="Profile" component={StudentProfileStackScreen} />
    <Drawer.Screen name="Gallery" component={GalleryStackScreen} />
  </Drawer.Navigator>
);

//Private Student
// + Bottom Tabs
// + Drawer
const PrivateStudentTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={PrivateStudentHomeStackScreen} />
    <Tabs.Screen name="Appointment" component={PrivateStudentAppointmentStackScreen} />
  </Tabs.Navigator>
);

const PrivateStudentHomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={StudentHome} />
    <HomeStack.Screen
      name="Instructor List"
      component={PrivateStudentInstructorList}
    />
    <HomeStack.Screen
      name="Booking Calendar"
      component={PrivateStudentBookingCalendar}
      options={({route}) => ({
        parent: route.params.parent,
      })}
    />
    <HomeStack.Screen
      name="Appointment Request"
      component={PrivateStudentAppointmentRequest}
      options={({route}) => ({
        parent: route.params.parent,
        id: route.params.instructor_id,
      })}
    />
  </HomeStack.Navigator>
);

const PrivateStudentAppointmentStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="Appointment Menu"
      component={PrivateStudentAppointment}
    />
    <SearchStack.Screen name="Appointment" component={PrivateStudentAppointmentList} />
    <SearchStack.Screen
      name="Appointment Info"
      component={PrivateStudentAppointmentInfo}
      options={({route}) => ({
        instructor_id: route.params.instructor_id,
        appointment_id: route.params.appointment_id,
      })}
    />
    <SearchStack.Screen
      name="Pending Appointment Info"
      component={PrivateStudentPendingAppointmentInfo}
      options={({route}) => ({
        instructor_id: route.params.instructor_id,
        appointment_id: route.params.appointment_id,

      })}
    />
    <SearchStack.Screen
      name="Pending Appointment"
      component={PrivateStudentPendingAppointmentList}
    />
  </SearchStack.Navigator>
);

const PrivateStudentProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Student Profile" component={PrivateStudentProfile} />
    <HomeStack.Screen
      name="Edit Profile"
      component={EditPrivateStudentProfile}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </ProfileStack.Navigator>
);

const DrawerScreen4 = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={PrivateStudentTabsScreen} />
    <Drawer.Screen
      name="Profile"
      component={PrivateStudentProfileStackScreen}
    />
    <Drawer.Screen name="Gallery" component={GalleryStackScreen} />
  </Drawer.Navigator>
);

//Instructor
// + Bottom Tabs
// + Drawer

const InstructorTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={InstructorHomeStackScreen} />
    <Tabs.Screen name="Appointment" component={InstructorAppointmentStackScreen} />
  </Tabs.Navigator>
);

const InstructorHomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={InstructorHome} />
    <HomeStack.Screen name="Student List" component={InstructorStudentList} />
    <HomeStack.Screen
      name="Director List"
      component={InstructorDirectorList}
      options={({route}) => ({
        parent: route.params.parent,
      })}
    />
    <HomeStack.Screen
      name="Director Info"
      component={InstructorDirectorInfo}
      options={({route}) => ({
        parent: route.params.parent,
      })}
    />
    <HomeStack.Screen
      name="Private Student List"
      component={InstructorPrivateStudentList}
    />
  </HomeStack.Navigator>
);

const InstructorAppointmentStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="Appointment Menu"
      component={InstructorAppointment}
    />
    <SearchStack.Screen
      name="Confirmed Appointment"
      component={InstructorConfirmedAppointmentList}
    />
    <SearchStack.Screen
      name="Confirmed Appointment Info"
      component={InstructorConfirmedAppointmentInfo}
      options={({route}) => ({
        student_id: route.params.student_id,
        appointment_id: route.params.appointment_id,
      })}
    />
    <SearchStack.Screen
      name="Pending Appointment"
      component={InstructorPendingAppointmentList}
    />
    <SearchStack.Screen
      name="Pending Appointment Info"
      component={InstructorPendingAppointmentInfo}
      options={({route}) => ({
        student_id: route.params.student_id,
        appointment_id: route.params.appointment_id,
      })}
    />
    <SearchStack.Screen
      name="Appointment Creator"
      component={InstructorAppointmentCreator}
    />
    <SearchStack.Screen
      name="Create Session"
      component={InstructorCreateSession}
      options={({route}) => ({
        date: route.params.date,
      })}
    />
    <SearchStack.Screen
      name="View Open Appointments"
      component={InstructorViewAppointments}
    />
    <SearchStack.Screen
      name="View Sessions"
      component={InstructorViewSessions}
      options={({route}) => ({
        date: route.params.date,
      })}
    />
    <SearchStack.Screen
      name="Cancellation Requests"
      component={InstructorCancelAppointmentList}
    />
    <SearchStack.Screen
      name="Cancel Pending Info"
      component={InstructorCancelPendingInfo}
      options={({route}) => ({
        student_id: route.params.student_id,
        appointment_id: route.params.appointment_id,
      })}
    />
  </SearchStack.Navigator>
);

/*
      <SearchStack.Screen
      name="Create Appointment"
      //component={InstructorCreateAppointment}
    />
    <SearchStack.Screen
      name="Delete Appointment"
      //component={InstructorDeleteAppointment}
    />
    <SearchStack.Screen
      name="Cancellation Requests"
      //component={InstructorCancelAppointmentList}
    />

*/
const InstructorProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Instructor Profile"
      component={InstructorProfile}
    />
    <HomeStack.Screen
      name="Edit Profile"
      component={EditInstructorProfile}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </ProfileStack.Navigator>
);

const DrawerScreen5 = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={InstructorTabsScreen} />
    <Drawer.Screen name="Profile" component={InstructorProfileStackScreen} />
    <Drawer.Screen name="Gallery" component={GalleryStackScreen} />
  </Drawer.Navigator>
);

//Gallery Stack for Director, Student, Private Student, Instructor

const GalleryStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Gallery" component={Gallery} />
  </SearchStack.Navigator>
);

//General User template

//Tabs => Bottom tabs are Home for nesting lists and "Search"(will be replaced with code generator for Admin and appointment lists for all others)
const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);
//Stack => Home  => will show lists in hierarchical order depending on user type
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </HomeStack.Navigator>
);
//Stack => "Search" Page  => will change to code generator for admin, null for director, appointment list for students and instructors
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

//Stack => Root
const RootStack = createStackNavigator();
const RootStackScreen = ({userToken, userId}) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      userId === 1 ? (
        <RootStack.Screen
          name="App"
          component={DrawerScreen1}
          options={{
            animationEnabled: false,
          }}
        />
      ) : userId === 2 ? (
        <RootStack.Screen
          name="App"
          component={DrawerScreen2}
          options={{
            animationEnabled: false,
          }}
        />
      ) : userId === 3 ? (
        <RootStack.Screen
          name="App"
          component={DrawerScreen3}
          options={{
            animationEnabled: false,
          }}
        />
      ) : userId === 4 ? (
        <RootStack.Screen
          name="App"
          component={DrawerScreen4}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="App"
          component={DrawerScreen5}
          options={{
            animationEnabled: false,
          }}
        />
      )
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);



//State Context => Render from Root Stack onwards
export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [userProfile, setUserProfile] = React.useState(null);
  const [userId, setUserId] = React.useState(0);
  const stateContext = React.useMemo(() => [userProfile, setUserProfile], [
    userProfile,
    setUserProfile,
  ]);

  const resetContext = React.useMemo(() => {
    return {
      sendResetCode: (email, user_type_id) => {
        //setIsLoading(true);
        //here is where we need to send the email
        //for now, just print the code to the screen
        var part1 = moment().format('l');
        part1 = part1.replace('/','');
        part1 = part1.replace('/','');
        var part2 = moment().format('LTS');
        part2 = part2.replace(/:/g, '');
        part2 = part2.replace(/PM/g, '');
        part2 = part2.replace(/AM/g, '');   
        var code = part1 + part2;
        var note = email;

        console.log(email);
        console.log(user_type_id);
        DupRegistration.checkDup(email, user_type_id)
          .then(data => data.json())
          .then(data => {
            if (data === false) {
              Alert.alert('Error try again later');
            } else {
              CreateAccessCode.createAC(code, 6, note, moment().format('llll'))
                .then(data2 => data2.json())
                .then(data2 => {
                  if (data2 === false) {
                    Alert.alert('Error Adding Access Code, Try Again Later');
                  } else {
                    Alert.alert('Successfully Added Unique Access Code');
                  }
                });

              EmailPassword.tempPass(email, code)
                .then(data2 => {
                  //console.log(data);
                  if (data2 === false) {
                    Alert.alert('Error');
                  } else {
                    Alert.alert('Email Sent');
                  }

                });
            }
          });
        //var al = "Temp Code:\n" + code + "\nFor:\n" + email;
        //alert(al);
      },
      resetPassword: (resetCode, newPassword, confPassword, email) => {
        setIsLoading(false);
        //here is where we need to send the email
        //for now, just print the code to the screen
        //
        //let user_type_id = 1; //this needs to be addressed. are we asking the user what type they are?
        if (newPassword === confPassword) {
          CheckResetCode.checkValid(resetCode, email)
            .then(data=>data.json())
            .then(data=>{
              console.log(resetCode);
              console.log(email);
              if(data===false){
                Alert.alert("Invalid Email or Code");
              }
              else{
                UpdateResetPassword.reset(email, newPassword)
                .then(data2=>data2.json())
                .then(data2 => {
                    if (data2 === false) {
                      Alert.alert('Error, try again later');
                    } else {
                      Alert.alert('Updated');
                      DeleteAccessCode.deleteAC(resetCode, 6)
                      .then(data3 => data3.json())
                      .then(data3 => {
                            if (data3 === false) {
                              console.log('Deleted Successfully');
                            } else {
                              console.log('Not Deleted, Try Again Later');
                            }
                      });                      
                    }
                  });
              } 
            });
        }
        else {
          Alert.alert('Passwords must match');
        }
      },
    }
  });

  const [galleryImages, setImages] = React.useState(null);
  const galleryContext = React.useMemo(() => [galleryImages, setImages], [
    galleryImages,
    setImages,
  ]);

  const [schools, setSchools] = React.useState(null);
  const schoolInfoContext = React.useMemo(() => [schools, setSchools], [
    schools,
    setSchools,
  ]);

  GetSchools.loadSchools()
    .then(data2 => data2.json())
    .then(data2 => {
      if (data2.length > 0) {
        
        var jsonData = JSON.stringify(data2, [
          'id',
          'name',
          'isd',
          'zip_code'
        ]);
        jsonData = JSON.parse(jsonData);

        setSchools(jsonData);
      }
    });
  
  //console.log(schools);

  //const listContext = React.useMemo
  const authContext = React.useMemo(() => {
    return {
      signIn: (email, pass) => {
        setIsLoading(false);
        AuthApi.login(email, pass)
          .then(data => data.json())
          .then(data => {
            if (data.length > 0) {
              //Alert.alert(data[0].user_type_id);
              setUserToken('asdf');
              setUserId(parseInt(data[0].user_type_id));

              //console.log(data[0]);
              var jsonData = JSON.stringify(data[0], [
                'id',
                'user_type_id',
                'email',
                'password',
                'avatar',
                'description',
                'first_name',
                'last_name',
                'phone_number',
                'street_address',
                'city',
                'state',
                'zip_code',
                'feeder_school',
                'current_school',
                'instrument',
                'instrument_2',
                'instrument_3',
              ]);
              jsonData = JSON.parse(jsonData);
              console.log(jsonData);
              setUserProfile(jsonData);

              
              GetGallery.loadGallery()
                .then(data2 => data2.json())
                .then(data2 => {
                  if (data2.length > 0) {
                    setImages(data2);
                  }
                });
              
            }
            if (data === false) {
              Alert.alert('Incorrect Login');
            }
          });
      },
      signUp: (
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
      ) => {
        setIsLoading(false);
        CheckAccessCode.authAccess(code, user_type_id)
          .then(data => data.json())
          .then(data => {
            if (data === true) {
              DupRegistration.checkDup(email, user_type_id)
                .then(dupData => dupData.json())
                .then(dupData => {
                  if (dupData === false) {
                    //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    //if (reg.test(email) === true){
                    if (user_type_id === 2) {
                      if (
                        email != null &&
                        password != null &&
                        first_name != null &&
                        last_name != null &&
                        phone_number != null &&
                        city != null &&
                        st != null &&
                        zip_code != null &&
                        current_school != null
                      ) {
                        UserRegistration.userReg(
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
                        )
                          .then(regData => regData.json())
                          .then(regData => {
                            if (regData.length > 0) {
                              Alert.alert('Welcome to Music Doors');
                              setUserToken('asdf');
                              setUserId(parseInt(regData[0].user_type_id));
                              var jsonData = JSON.stringify(regData[0], [
                                'id',
                                'user_type_id',
                                'email',
                                'password',
                                'avatar',
                                'description',
                                'first_name',
                                'last_name',
                                'phone_number',
                                'street_address',
                                'city',
                                'state',
                                'zip_code',
                                'feeder_school',
                                'current_school',
                                'instrument',
                                'instrument_2',
                                'instrument_3',
                              ]);
                              jsonData = JSON.parse(jsonData);
                              console.log(jsonData);
                              setUserProfile(jsonData);
                              GetGallery.loadGallery()
                                .then(data2 => data2.json())
                                .then(data2 => {
                                  if (data2.length > 0) {
                                    setImages(data2);
                                  }
                                });
                            }
                            if (regData === false) {
                              Alert.alert(
                                'Unable to Register:\nTry again later',
                              );
                            }
                          });
                      } else {
                        Alert.alert('Please Complete All Required Fields');
                      }
                    }
                    if (user_type_id === 3) {
                      if (
                        email !== false &&
                        password !== false &&
                        first_name !== false &&
                        last_name !== false &&
                        city !== false &&
                        st !== false &&
                        zip_code !== false &&
                        current_school !== false &&
                        feeder_school !== false &&
                        instrument !== false
                      ) {
                        UserRegistration.userReg(
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
                        )
                          .then(regData => regData.json())
                          .then(regData => {
                            if (regData.length > 0) {
                              Alert.alert('Welcome to Music Doors');
                              setUserToken('asdf');
                              setUserId(parseInt(regData[0].user_type_id));
                              var jsonData = JSON.stringify(regData[0], [
                                'id',
                                'user_type_id',
                                'email',
                                'password',
                                'avatar',
                                'description',
                                'first_name',
                                'last_name',
                                'phone_number',
                                'street_address',
                                'city',
                                'state',
                                'zip_code',
                                'feeder_school',
                                'current_school',
                                'instrument',
                                'instrument_2',
                                'instrument_3',
                              ]);
                              jsonData = JSON.parse(jsonData);
                              console.log(jsonData);
                              setUserProfile(jsonData);
                              GetGallery.loadGallery()
                                .then(data2 => data2.json())
                                .then(data2 => {
                                  if (data2.length > 0) {
                                    setImages(data2);
                                  }
                                });
                            }
                            if (regData === false) {
                              Alert.alert(
                                'Unable to Register:\nTry again later',
                              );
                            }
                          });
                      } else {
                        Alert.alert('Please Complete All Required Fields');
                      }
                    }
                    if (user_type_id === 4) {
                      if (
                        email != null &&
                        password != null &&
                        first_name != null &&
                        last_name != null &&
                        phone_number != null &&
                        city != null &&
                        st != null &&
                        zip_code != null &&
                        instrument != null
                      ) {
                        UserRegistration.userReg(
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
                        )
                          .then(regData => regData.json())
                          .then(regData => {
                            if (regData.length > 0) {
                              Alert.alert('Welcome to Music Doors');
                              setUserToken('asdf');
                              setUserId(parseInt(regData[0].user_type_id));
                              var jsonData = JSON.stringify(regData[0], [
                                'id',
                                'user_type_id',
                                'email',
                                'password',
                                'avatar',
                                'description',
                                'first_name',
                                'last_name',
                                'phone_number',
                                'street_address',
                                'city',
                                'state',
                                'zip_code',
                                'feeder_school',
                                'current_school',
                                'instrument',
                                'instrument_2',
                                'instrument_3',
                              ]);
                              jsonData = JSON.parse(jsonData);
                              console.log(jsonData);
                              setUserProfile(jsonData);
                              GetGallery.loadGallery()
                                .then(data2 => data2.json())
                                .then(data2 => {
                                  if (data2.length > 0) {
                                    setImages(data2);
                                  }
                                });
                            }
                            if (regData === false) {
                              Alert.alert(
                                'Unable to Register:\nTry again later',
                              );
                            }
                          });
                      } else {
                        Alert.alert('Please Complete All Required Fields');
                      }
                    }
                    if (user_type_id === 5) {
                      if (
                        email != null &&
                        password != null &&
                        first_name != null &&
                        last_name != null &&
                        city != null &&
                        street_address != null &&
                        st != null &&
                        zip_code != null &&
                        instrument != null
                      ) {
                        UserRegistration.userReg(
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
                        )
                          .then(regData => regData.json())
                          .then(regData => {
                            if (regData.length > 0) {
                              Alert.alert('Welcome to Music Doors');
                              setUserToken('asdf');
                              setUserId(parseInt(regData[0].user_type_id));
                              var jsonData = JSON.stringify(data[0], [
                                'id',
                                'user_type_id',
                                'email',
                                'password',
                                'avatar',
                                'description',
                                'first_name',
                                'last_name',
                                'phone_number',
                                'street_address',
                                'city',
                                'state',
                                'zip_code',
                                'feeder_school',
                                'current_school',
                                'instrument',
                                'instrument_2',
                                'instrument_3',
                              ]);
                              jsonData = JSON.parse(jsonData);
                              console.log(jsonData);
                              setUserProfile(jsonData);
                              GetGallery.loadGallery()
                                .then(data2 => data2.json())
                                .then(data2 => {
                                  if (data2.length > 0) {
                                    setImages(data2);
                                  }
                                });
                              GetSchools.loadSchools()
                                .then(data2 => data2.json())
                                .then(data2 => {
                                  if (data2.length > 0) {
                                    setSchools(data2);
                                  }
                                });
                            }
                            if (regData === false) {
                              Alert.alert(
                                'Unable to Register:\nTry again later',
                              );
                            }
                          });
                      } else {
                        Alert.alert('Please Complete All Required Fields');
                      }
                    }
                    //}
                  } else {
                    Alert.alert('Account Already Exists');
                  }
                });
            }
            if (data === false) {
              Alert.alert('Invalid Access Code');
            }
          });
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <ResetContext.Provider value={resetContext}>
      <SchoolContext.Provider value={schoolInfoContext}>
        <AuthContext.Provider value={authContext}>
          <StateContext.Provider value={stateContext}>
            <GalleryContext.Provider value={galleryContext}>
              <NavigationContainer>
                <RootStackScreen
                  userToken={userToken}
                  userId={userId}
                  userProfile={userProfile}
                  galleryImages={galleryImages}
                  schools={schools}
                />
              </NavigationContainer>
            </GalleryContext.Provider>
          </StateContext.Provider>
        </AuthContext.Provider>
      </SchoolContext.Provider>
    </ResetContext.Provider>
  );
};

const styles = StyleSheet.create({
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
});
