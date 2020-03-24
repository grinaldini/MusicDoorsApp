import React from 'react';
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
} from 'react-native';

import {AuthContext} from './context';
import {HeaderTitle} from '@react-navigation/stack';

const ScreenContainer = ({children}) => (
  <View style={styles.container}>{children}</View>
);

export const Home = ({navigation}) => (
  <ScreenContainer>
    <Text>Master List Screen</Text>
    <Button
      title="React Native by Example"
      onPress={() =>
        navigation.push('Details', {name: 'React Native by Example '})
      }
    />
    <Button
      title="React Native School"
      onPress={() => navigation.push('Details', {name: 'React Native School'})}
    />
    <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
  </ScreenContainer>
);

export const Details = ({route}) => (
  <ScreenContainer>
    <Text>Details Screen</Text>
    {route.params.name && <Text>{route.params.name}</Text>}
  </ScreenContainer>
);

export const Search = ({navigation}) => (
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

export const Search2 = () => (
  <ScreenContainer>
    <Text>Search2 Screen</Text>
  </ScreenContainer>
);

export const Profile = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Profile Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

export const Splash = () => (
  <ScreenContainer>
    <Text>Loading...</Text>
  </ScreenContainer>
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

/*
export default class LoginActivity{
 
 
constructor(props) {
 
    super(props)
 
    this.state = {
 
      UserEmail: '',
      UserPassword: ''
 
    }
 
  }
 
UserLoginFunction = () =>{
 
 const { UserEmail }  = this.state ;
 const { UserPassword }  = this.state ;
 
 
fetch('https://reactnativecode.000webhostapp.com/User_Login.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    email: UserEmail,
 
    password: UserPassword
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
 
        // If server response message same as Data Matched
       if(responseJson === 'Data Matched')
        {
 
            //Then open Profile activity and send user email to profile activity.
            this.props.navigation.navigate('Second', { Email: UserEmail });
 
        }
        else{
 
          Alert.alert(responseJson);
        }
 
      }).catch((error) => {
        console.error(error);
      });
 
 
  }
 
  render() {
    return (
 
<View style={styles.MainContainer}>
 
        <Text style= {styles.TextComponentStyle}>User Login Form</Text>
  
        <TextInput
          
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Email"
 
          onChangeText={UserEmail => this.setState({UserEmail})}
 
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
 
          style={styles.TextInputStyleClass}
        />
 
        <TextInput
          
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Password"
 
          onChangeText={UserPassword => this.setState({UserPassword})}
 
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
 
          style={styles.TextInputStyleClass}
 
          secureTextEntry={true}
        />
 
        <Button title="Click Here To Login" onPress={this.UserLoginFunction} color="#2196F3" />
      
  
 
</View>
            
    );
}
*/

export const SignIn = () => {
  const {signIn} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <TextInput
        placeholder="User Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />
      <TextInput
        placeholder="Password"
        underlineColorAndroid="transparent"
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
        onPress={() => signIn()}>
        <Text style={styles.TextStyle}> Log In </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const CreateAccount = () => {
  const {signUp} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Create Account Screen</Text>
      <Button title="Create Account" onPress={() => signUp()} />
    </ScreenContainer>
  );
};

export const DirectorCreateAccount = () => {
  const {signUp} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
       <TextInput
        placeholder="Enter First Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Last Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Current School"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Phone Number"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Email"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="EXCLUSIVE CODE"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => signUp()}>
        <Text style={styles.TextStyle}> Create Account </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const StudentCreateAccount = () => {
  const {signUp} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <TextInput
        placeholder="Enter First Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Last Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Instrument"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Current School"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Target High School"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter City"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter State"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Zip Code"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="EXCLUSIVE CODE"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => signUp()}>
        <Text style={styles.TextStyle}> Create Account </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const PrivateStudentCreateAccount = () => {
  const {signUp} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <TextInput
        placeholder="Enter First Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Last Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Instrument"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter City"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter State"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Zip Code"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="EXCLUSIVE CODE"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => signUp()}>
        <Text style={styles.TextStyle}> Create Account </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const InstructorCreateAccount = () => {
  const {signUp} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <TextInput
        placeholder="Enter First Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Last Name"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Target High School"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />
      <TextInput
        placeholder="Enter Instrument"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Address"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter City"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter State"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="Enter Zip Code"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TextInput
        placeholder="EXCLUSIVE CODE"
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />

      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={() => signUp()}>
        <Text style={styles.TextStyle}> Create Account </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

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
});
