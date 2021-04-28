import React, { useState } from "react";

import styles from './edit-user-profile.style';
import { Text, View, ScrollView } from "react-native";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { RootState, UserTypes } from "../../../typings";
import { LabelValueRow, Loader } from "../../../components";
import { Button, HelperText, TextInput } from "react-native-paper";
import { NAVIGATION } from "../../../constants";
import { Formik, FormikValues, useFormik } from "formik";
import { editUsrInfo } from "../../../services";
import { setUser } from "../../../reducers/actions";


export const EditUserProfileScreen = (props: any) => {

  const content = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch()
  const [isXhrSubmit, setIsXhrSubmit] = useState(false);

  const onSubmit = async (values: FormikValues) => {
    setIsXhrSubmit(true);
    const updatedUserData: UserTypes = {
      user_id: content.user_id,
      firstName: values.firstName,
      lastName: values.lastName,
      contactNo: values.contactNo,
      email: values.email,
      userType: content.userType,
      organization: {
        orgId: content.organization.orgId,
        orgName: content.organization.orgName
      }
    }

    const updatedUserInfo = await editUsrInfo(updatedUserData);
    console.log(updatedUserInfo)
    if(updatedUserInfo){
      dispatch(setUser({...content, ...updatedUserData}));
      goBack();
    }
  }

  const userValidateSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    contactNo: Yup.number().required('Contact No. is required')
  });

  const _allFieldArray: any = {};
  const setFieldRef = (ref: any, keyName: string) => {
    _allFieldArray[keyName] = ref
  }

  const setFocusOnNextField = (refKey: string) => {
    _allFieldArray[refKey] && _allFieldArray[refKey].focus()
  }

  const goBack = () => {
    props.navigation.goBack()
  }

  return (
    <View style={styles.container}>

      <Formik
        initialValues={{
          firstName: content.firstName,
          lastName: content.lastName,
          email: content.email,
          contactNo: content.contactNo ? content.contactNo.toString() : ""
        }}
        onSubmit={onSubmit}
        validationSchema={userValidateSchema}
      >
        {formikProps => {
          return (
            <View>
              <ScrollView
                style={{ padding: 0 }}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
              >

                <View>
                  <View style={styles.fieldView}>
                    <TextInput
                      label="First Name"
                      value={formikProps.values.firstName}
                      onChangeText={formikProps.handleChange('firstName')}
                      returnKeyType='next'
                      onSubmitEditing={setFocusOnNextField.bind(this, 'lastName')}
                      error={!!formikProps.touched.firstName && !!formikProps.errors.firstName}
                    />
                    <HelperText type="error" visible={!!formikProps.errors.firstName}>{formikProps.errors.firstName}
                        </HelperText>
                  </View>


                  <View style={styles.fieldView}>
                    <TextInput
                      label="Last Name"
                      ref={(ref) => setFieldRef(ref, 'lastName')}
                      value={formikProps.values.lastName}
                      onChangeText={formikProps.handleChange('lastName')}
                      onSubmitEditing={setFocusOnNextField.bind(this, 'email')}
                      error={!!formikProps.touched.lastName && !!formikProps.errors.lastName}
                      returnKeyType='next'
                    />
                    <HelperText type="error" visible={!!formikProps.errors.lastName}>{formikProps.errors.lastName}
                        </HelperText>
                  </View>

                  <View style={styles.fieldView}>
                    <TextInput
                      label="Email"
                      ref={(ref) => setFieldRef(ref, 'email')}
                      value={formikProps.values.email}
                      onChangeText={formikProps.handleChange('email')}
                      onSubmitEditing={setFocusOnNextField.bind(this, 'contactNo')}
                      returnKeyType='next'
                      error={!!formikProps.touched.email && !!formikProps.errors.email}
                    />
                    <HelperText type="error" visible={!!formikProps.errors.email}>{formikProps.errors.email}
                        </HelperText>
                  </View>

                  <View style={styles.fieldView}>
                    <TextInput
                      label="Contract No."
                      ref={(ref) => setFieldRef(ref, 'contactNo')}
                      value={formikProps.values.contactNo}
                      keyboardType="number-pad"
                      onChangeText={formikProps.handleChange('contactNo')}
                      onSubmitEditing={formikProps.handleSubmit}
                      returnKeyType='done'
                      error={!!formikProps.touched.contactNo && !!formikProps.errors.contactNo}
                    />
                    <HelperText type="error" visible={!!formikProps.errors.contactNo}>{formikProps.errors.contactNo}
                        </HelperText>
                  </View>

                  {!isXhrSubmit && <View style={styles.btnView}>
                    <Button mode="contained" onPress={formikProps.handleSubmit} uppercase={false} style={styles.btn}>
                      <Text style={{ fontSize: 16 }}>{'Save'}</Text>
                    </Button>
                    <Button mode="contained" onPress={goBack} uppercase={false} style={styles.btn}>
                      <Text style={{ fontSize: 16 }}>{'Cancel'}</Text>
                    </Button>
                  </View>}

                  {isXhrSubmit && <Loader />}

                </View>


              </ScrollView>

            </View>
          );
        }}
      </Formik>
    </View>
  );
};
