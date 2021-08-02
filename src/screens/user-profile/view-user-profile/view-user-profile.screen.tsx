import React from "react";

import styles from './view-user-profile.style';
import { Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../typings";
import { LabelValueRow } from "../../../components";
import { Button } from "react-native-paper";
import { NAVIGATION } from "../../../constants";


export const ViewUserProfileScreen = (props: any) => {
  
  const content = useSelector((state:RootState) => state.user);

  const openEditUserProfie = () => {
    props.navigation.navigate(NAVIGATION.EDIT_USER);
  }

  const openChangePassword = () => {
    props.navigation.navigate(NAVIGATION.CHANGE_PASSWORD);
  }

  return (
    <View style={styles.container}>
        <View style={styles.btnContainer}>
          <Button mode="outlined" uppercase={false} onPress={openEditUserProfie} style={styles.btnStyle}>
            <Text style={{fontSize: 16}}>{'Edit Details'}</Text>
          </Button>
          <Button mode="outlined" uppercase={false} onPress={openChangePassword} style={styles.btnStyle}>
            <Text style={{fontSize: 16}}>{'Change Password'}</Text>
          </Button>
        </View>

        <View style={{marginBottom: 1, flex: 1}}>
          <ScrollView>
            <View style={styles.scrollWrapper}>
              <LabelValueRow label="First Name" value={content.firstName}/>
              <LabelValueRow label="Last Name" value={content.lastName}/>
              <LabelValueRow label="Email" value={content.email}/>
              <LabelValueRow label="Contact No." value={content.contactNo ? content.contactNo.toString() : ''}/>
              <LabelValueRow label="Organization." value={content.organization ? content.organization.orgName : ''}/>
            </View>

          </ScrollView>
        </View>
      </View>
  );
};