import { Formik } from 'formik';
import React, { Component, ElementRef } from 'react';
import {
  GestureResponderEvent,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Yup from 'yup';
import { Button, Card, Colors, IconButton, Paragraph, TextInput, Title } from 'react-native-paper';

import styles from './login.style';
import { login } from '../../services';
import { setUser } from '../../reducers/actions';
import { connect } from 'react-redux';

interface ILoginState {
  showPassword: boolean;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Enter your Email/Phone Number'),
  password: Yup.string()
    .required()
});


class LoginScreen extends Component<any, ILoginState> {

  constructor(props: any) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  passwordRef: any;

  componentDidMount = () => {
    this.props.user && this.props.user.token && this.loadHomeScreen();
  }

  handleLogin = async (userData: any) => {
    console.log(userData)
    const { email, password } = userData;

    const submitdata = await login({ email, password });
    console.log(submitdata);
    if(submitdata && submitdata.data){
      this.props.setUser(submitdata.data);
      this.loadHomeScreen();
    }
  };

  loadHomeScreen = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
    this.props.navigation.navigate('Home')
  }

  togglePassword = (event: GestureResponderEvent) => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <KeyboardAvoidingView behavior="padding" style={styles.container1}>
          <View style={styles.loginView}>
            <View>
              <Title style={{ color: '#00dddd', fontSize: 30 }}>{'Login'}</Title>
            </View>
            <View>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={this.handleLogin}
              >
                {props => {
                  return (
                    <View>
                      <ScrollView style={{ padding: 0 }} contentContainerStyle={{ flexGrow: 1 }}>

                        <View>
                          <View>
                            <TextInput
                              label="Email"
                              value={props.values.email}
                              onChangeText={props.handleChange('email')}
                              onSubmitEditing={()=>{this.passwordRef.focus()}}
                              returnKeyType='next'
                              autoCapitalize='none'
                            />
                            <Text>{props.touched.email && props.errors.email}</Text>
                          </View>

                          <View style={{marginTop: 10}}>
                            <TextInput
                              label="Password"
                              ref={(ref)=>{this.passwordRef = ref}}
                              secureTextEntry={!this.state.showPassword}
                              value={props.values.password}
                              onChangeText={props.handleChange('password')}
                              onSubmitEditing={props.handleSubmit}
                              returnKeyType='done'
                              right={
                                <TextInput.Icon
                                      name={this.state.showPassword ? 'eye-off': 'eye'}
                                      onPress={this.togglePassword}
                                    />
                                  
                              }
                            />
                            <Text>{props.touched.password && props.errors.password}</Text>
                          </View>

                          <View style={{marginTop: 10}}>
                            <Button mode="contained" onPress={props.handleSubmit} uppercase={false}>
                              <Text style={{fontSize: 16}}>{'Login'}</Text>
                            </Button>                            
                          </View>

                        </View>
                        

                      </ScrollView>
                      
                    </View>
                  );
                }}
              </Formik>
          </View>
          </View>
        </KeyboardAvoidingView>

      </View >
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    actionResult: state.default,
    user: state.user
  };
};

const mapDispatchToProps ={
  setUser: setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);