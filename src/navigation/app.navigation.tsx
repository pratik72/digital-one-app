import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SiteScreen from '../screens/sites/site/site.screen';
import WorkReportScreen from '../screens/work-reports/work-report/work-report.screen';
import { HeaderComponent } from '../components';
import LoginScreen from '../screens/login/login.screen';
import {store} from "../reducers/store";
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { logout } from '../services';
import { setUser } from '../reducers/actions';
import { ViewSiteScreen } from '../screens/sites/view-site/view-site.screen';
import { AddSiteScreen } from '../screens/sites/add-site/add-site.screen';
import { WorkCategory } from '../screens/work-cetegory/work-category.component';
import SiteSettingScreen from '../screens/sites/site-setting/site-setting.screen';
import AddWorkReport from '../screens/work-reports/add-work-report/add-work-report.screen';
import { ViewWorkReportScreen } from '../screens/work-reports/view-work-report/view-work-report.screen';
import { NAVIGATION } from '../constants';
import { MaterialsScreen } from '../screens/materials/materials/materials.screen';
import AddMaterial from '../screens/materials/add-material/add-material.screen'
import { ViewMaterialScreen } from '../screens/materials/view-material/view-material.screen';
import { navigationRef } from './root.navigation';
import { Colors } from 'react-native-paper';
import { ViewUserProfileScreen } from '../screens/user-profile/view-user-profile/view-user-profile.screen';

const Drawer = createDrawerNavigator();
const SiteStack = createStackNavigator();
const WorkReportStack = createStackNavigator();
const MaterialsStack = createStackNavigator();
const AuthStack = createStackNavigator();
const UserProfileStack = createStackNavigator();

const hideHeaderOpt = {
    headerShown: false
}

const userProfileNavigator = () => {
  return (
    <UserProfileStack.Navigator 
      screenOptions={{
        header: (props) => <HeaderComponent {...props} />,
      }}>
        <UserProfileStack.Screen name={NAVIGATION.SITE} component={ViewUserProfileScreen} options={{
              title: "User Profile",
            }}/>
        <UserProfileStack.Screen name={NAVIGATION.VIEW_SITE} component={ViewSiteScreen} options={{
              title: "Edit User Profile",
            }}/>
    </UserProfileStack.Navigator>
  );
}

const siteNavigator = () => {
    return (
        <SiteStack.Navigator 
          screenOptions={{
            header: (props) => <HeaderComponent {...props} />,
          }}>
            <SiteStack.Screen name={NAVIGATION.SITE} component={SiteScreen} options={{
                  title: "Site",
                }}/>
            <SiteStack.Screen name={NAVIGATION.VIEW_SITE} component={ViewSiteScreen} options={{
                  title: "View Site",
                }}/>
            <SiteStack.Screen name={NAVIGATION.ADD_SITE} component={AddSiteScreen} options={{
                  title: "Add Site",
                }}/>
            <SiteStack.Screen name={NAVIGATION.WORK_CATEGORY} component={WorkCategory} options={{
                  title: "Work Category",
                }}/>
            <SiteStack.Screen name={NAVIGATION.SITE_SETTING} component={SiteSettingScreen} options={{
                  title: "Site Settings",
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
            <WorkReportStack.Screen name={NAVIGATION.WORK_REPORT} component={WorkReportScreen} options={{
                  title: "Work Report",
                }}/>
            <WorkReportStack.Screen name={NAVIGATION.ADD_WORK_REPORT} component={AddWorkReport} options={{
                  title: "Add Work Report",
                }}/>
            <WorkReportStack.Screen name={NAVIGATION.VIEW_WORK_REPORT} component={ViewWorkReportScreen} options={{
                  title: "View Work Report",
                }}/>
                
        </WorkReportStack.Navigator>
    );
}

const materialsNavigator = () => {
  return (
      <MaterialsStack.Navigator 
        screenOptions={{
          header: (props) => <HeaderComponent {...props} />,
        }}>
          <MaterialsStack.Screen name={NAVIGATION.MATERIALS} component={MaterialsScreen} options={{
                title: "Materials",
              }}/>
          <MaterialsStack.Screen name={NAVIGATION.ADD_MATERIAL} component={AddMaterial} options={{
                title: "Add Material",
              }}/>
          <MaterialsStack.Screen name={NAVIGATION.VIEW_MATERIAL} component={ViewMaterialScreen} options={{
                title: "View Material",
              }}/>
              
      </MaterialsStack.Navigator>
  );
}

const DrawerUserInfo = (props: any) => {
  const user = store && store.getState().user;
  return (
    <View style={{marginHorizontal: 10, marginVertical: 20, paddingLeft: 5}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{`${user.firstName} ${user.lastName}`}</Text>
        <Text style={{fontSize: 12}}>{user.organization.orgName}</Text>
        <TouchableOpacity onPress={()=> {console.log("Hello"); props.navigation.navigate(NAVIGATION.USER);}}>
          <Text style={{fontSize: 12, color: Colors.cyanA700}}>View Profile</Text>
        </TouchableOpacity>
      </View>
  );
}

const LogoutDrawerContent = (props: any) => {
  
  return (
    <DrawerContentScrollView {...props}>
      <DrawerUserInfo {...props} />
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={async () => {
        const logoutRespond = await logout();
        if(logoutRespond.data){
           Alert.alert("Logout Success!")
           store.dispatch(setUser(""));
           props.navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.AUTH }],
          });
           props.navigation.navigate(NAVIGATION.AUTH)
        }
      }} />
    </DrawerContentScrollView>
  );
}

const MainStack = createStackNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName={NAVIGATION.HOME} drawerContent={props => <LogoutDrawerContent {...props} />}>
      <Drawer.Screen name={NAVIGATION.HOME} component={siteNavigator} />
      <Drawer.Screen name={NAVIGATION.WORK_REPORT} component={workReportNavigator} />
      <Drawer.Screen name={NAVIGATION.MATERIALS} component={materialsNavigator} />
    </Drawer.Navigator>
  )
}

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
        <AuthStack.Screen name={NAVIGATION.LOGIN} component={LoginScreen} options={{
              title: "Login",
              ...hideHeaderOpt
            }}/>
    </AuthStack.Navigator>
)
}

const AppContainer = () => {
  const user = store && store.getState().user;
  const initialRoute = user && user.token ? NAVIGATION.HOME : NAVIGATION.AUTH;
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator initialRouteName={initialRoute} screenOptions={{...hideHeaderOpt}}>
        <MainStack.Screen name={NAVIGATION.HOME} component={DrawerNavigator} />
        <MainStack.Screen name={NAVIGATION.AUTH} component={AuthNavigator} />
        <MainStack.Screen name={NAVIGATION.USER} component={userProfileNavigator} />        
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;