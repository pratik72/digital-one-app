import { Formik } from 'formik';
import React, { Component, ElementRef } from 'react';
import {
  Alert,
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
import { NAVIGATION } from '../../constants';
import { Loader } from '../../components';

interface ILoginState {
  showPassword: boolean;
  loginLoader: boolean;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Enter your Email/Phone Number'),
  password: Yup.string()
    .required()
});


class LoginScreen extends Component<any, ILoginState> {

  private xhr: any = {};

  constructor(props: any) {
    super(props);
    this.state = {
      showPassword: false,
      loginLoader: false
    };
  }

  passwordRef: any;

  componentDidMount = () => {
    this.props.user && this.props.user.token && this.loadHomeScreen();
  }

  handleLogin =  (userData: any) => {
    const { email, password } = userData;
    this.setState({
      loginLoader: true
    }, async ()=>{

      this.xhr.submitdata = await login({ email, password });
      if (this.xhr.submitdata && this.xhr.submitdata.data) {
        if(this.xhr.submitdata.data.token){
          this.props.setUser(this.xhr.submitdata.data);
          this.loadHomeScreen();
        }else{
          Alert.alert("ERROR",this.xhr.submitdata.data.message);
          this.setState({
            loginLoader: false
          });
        }
      }else{
        this.setState({
          loginLoader: false
        });
      }
    });

  };

  componentWillUnmount = () => {
    if (this.xhr.submitdata && this.xhr.submitdata.abort) {
      this.xhr.submitdata.abort();
    }
  }

  loadHomeScreen = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: NAVIGATION.HOME }],
    });
    this.props.navigation.navigate(NAVIGATION.HOME)
  }

  togglePassword = (event: GestureResponderEvent) => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  render() {
    const { loginLoader } = this.state;
    return (
      <View style={styles.container}>

        <KeyboardAvoidingView behavior="padding" style={styles.container1}>
          <View style={styles.loginView}>
            <View style={{marginBottom: 30}}>
              <Title style={{ color: Colors.deepPurpleA700, fontSize: 30, paddingLeft: 50 }}>{'Digital Site'}</Title>
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
                              onSubmitEditing={() => { this.passwordRef.focus() }}
                              returnKeyType='next'
                              autoCapitalize='none'
                            />
                            <Text>{props.touched.email && props.errors.email}</Text>
                          </View>

                          <View style={{ marginTop: 10 }}>
                            <TextInput
                              label="Password"
                              ref={(ref) => { this.passwordRef = ref }}
                              secureTextEntry={!this.state.showPassword}
                              value={props.values.password}
                              onChangeText={props.handleChange('password')}
                              onSubmitEditing={props.handleSubmit}
                              returnKeyType='done'
                              right={
                                <TextInput.Icon
                                  name={this.state.showPassword ? 'eye-off' : 'eye'}
                                  onPress={this.togglePassword}
                                />

                              }
                            />
                            <Text>{props.touched.password && props.errors.password}</Text>
                          </View>

                          <View style={{ marginTop: 10 }}>
                            {!loginLoader && <Button mode="contained" onPress={props.handleSubmit} uppercase={false}>
                              <Text style={{ fontSize: 16 }}>{'Login'}</Text>
                            </Button>}
                            {loginLoader && <Loader />}
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

const mapDispatchToProps = {
  setUser: setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);