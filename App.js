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

//Navigators and Stack Containers
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

//contexts
import {AuthContext, StateContext} from './context';

//API's
import AuthApi from './API/auth';
import CheckAccessCode from './API/AccessCode/checkAccessCode';
import UserRegistration from './API/User/userRegistration';
import DupRegistration from './API/User/dupRegistration';

//Screens
import {
  Welcome,
  SignIn,
  AdminProfile, AdminHome, AdminCodeGenerator, EditAdminProfile,
  DirectorCreateAccount, DirectorProfile, DirectorHome, EditDirectorProfile,
  StudentCreateAccount, StudentProfile, StudentHome, EditStudentProfile,
  PrivateStudentCreateAccount, PrivateStudentProfile, PrivateStudentHome, EditPrivateStudentProfile,
  InstructorCreateAccount,InstructorProfile, InstructorHome, EditInstructorProfile,
  Search,
  Home,
  Details,
  Search2,
  Splash,
} from './Screens';

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
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </HomeStack.Navigator>
);

const AdminCGStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Code Generator" component={AdminCodeGenerator} />
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
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </HomeStack.Navigator>
);

const DirectorProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Director Profile" component={DirectorProfile} />
    <HomeStack.Screen
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
    <Tabs.Screen name="Gallery" component={GalleryStackScreen} />
  </Tabs.Navigator>
);

const StudentHomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={StudentHome} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </HomeStack.Navigator>
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
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Home" component={StudentTabsScreen} />
    <Drawer.Screen name="Profile" component={StudentProfileStackScreen} />
  </Drawer.Navigator>
);


//Private Student
// + Bottom Tabs
// + Drawer


const PrivateStudentTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={PrivateStudentHomeStackScreen} />
    <Tabs.Screen name="Gallery" component={GalleryStackScreen} />
  </Tabs.Navigator>
);

const PrivateStudentHomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={PrivateStudentHome} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </HomeStack.Navigator>
);

const PrivateStudentProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Private Student Profile" component={PrivateStudentProfile} />
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
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Home" component={PrivateStudentTabsScreen} />
    <Drawer.Screen
      name="Profile"
      component={PrivateStudentProfileStackScreen}
    />
  </Drawer.Navigator>
);

//Instructor
// + Bottom Tabs
// + Drawer

const InstructorTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={InstructorHomeStackScreen} />
    <Tabs.Screen name="Gallery" component={GalleryStackScreen} />
  </Tabs.Navigator>
);

const InstructorHomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={InstructorHome} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </HomeStack.Navigator>
);

const InstructorProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Instructor Profile" component={InstructorProfile}/>
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
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Home" component={InstructorTabsScreen} />
    <Drawer.Screen name="Profile" component={InstructorProfileStackScreen} />
  </Drawer.Navigator>
);


//Gallery Stack for Director, Student, Private Student, Instructor

const GalleryStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Gallery" component={Gallery} />
    <SearchStack.Screen name="Search2" component={Search2} />
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
              setUserProfile(data[0]);
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
                              setUserProfile(regData[0]);
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
                              setUserProfile(regData[0]);
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
                              setUserProfile(regData[0]);
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
                              setUserProfile(regData[0]);
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
    <AuthContext.Provider value={authContext}>
      <StateContext.Provider value={stateContext}>
        <NavigationContainer>
          <RootStackScreen
            userToken={userToken}
            userId={userId}
            userProfile={userProfile}
          />
        </NavigationContainer>
      </StateContext.Provider>
    </AuthContext.Provider>
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
