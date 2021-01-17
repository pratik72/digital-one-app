import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SiteScreen } from '../screens/site/site.screen';
import { WorkReportScreen } from '../screens/work-report/work-report.screen';
import { HeaderComponent } from '../components';
import LoginScreen from '../screens/login/login.screen';
import {store} from "../reducers/store";
import { Alert } from 'react-native';
import { logout } from '../services';
import { setUser } from '../reducers/actions';

const Drawer = createDrawerNavigator();
const SiteStack = createStackNavigator();
const WorkReportStack = createStackNavigator();
const AuthStack = createStackNavigator();

const isLoggedIn = false;

const hideHeaderOpt = {
    headerShown: false
}


const siteNavigator = () => {
    return (
        <SiteStack.Navigator 
          screenOptions={{
            header: (props) => <HeaderComponent {...props} />,
          }}>
            <SiteStack.Screen name="Site" component={SiteScreen} options={{
                  title: "Site",
                }}/>
        </SiteStack.Navigator>
    );
}

const workReportNavigator = () => {
    return (
        <WorkReportStack.Navigator 
          screenOptions={{
            header: (props) => <HeaderComponent {...props} />,
          }}>
            <WorkReportStack.Screen name="Work Report" component={WorkReportScreen} options={{
                  title: "Work Report",
                }}/>
        </WorkReportStack.Navigator>
    );
}

const LogoutDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={async () => {
        console.log(props)
        console.log(store)
        const logoutRespond = await logout();
        if(logoutRespond.data){
           Alert.alert("Logout Success!")
           store.dispatch(setUser(""));
           props.navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
           props.navigation.navigate('Auth')
        }
      }} />
    </DrawerContentScrollView>
  );
}

const MainStack = createStackNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <LogoutDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={siteNavigator} />
      <Drawer.Screen name="Work Report" component={workReportNavigator} />
    </Drawer.Navigator>
  )
}

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={LoginScreen} options={{
              title: "Login",
              ...hideHeaderOpt
            }}/>
    </AuthStack.Navigator>
)
}

const AppContainer = () => {
  const user = store && store.getState().user;
  const initialRoute = user && user.token ? "Home" : "Auth";
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName={initialRoute} screenOptions={{...hideHeaderOpt}}>
        <MainStack.Screen name="Home" component={DrawerNavigator} />
        <MainStack.Screen name="Auth" component={AuthNavigator} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;