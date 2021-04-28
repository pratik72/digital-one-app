import React, { useState } from "react";

import styles from './change-password.style';
import { Text, View, ScrollView } from "react-native";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { IChangePasswordParma, RootState, UserTypes } from "../../../typings";
import { LabelValueRow, Loader } from "../../../components";
import { Button, HelperText, TextInput } from "react-native-paper";
import { NAVIGATION } from "../../../constants";
import { Formik, FormikValues, useFormik } from "formik";
import { changeUserPassword, editUsrInfo } from "../../../services";
import { setUser } from "../../../reducers/actions";


export const ChangePasswordScreen = (props: any) => {

  const content = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch()
  const [isXhrSubmit, setIsXhrSubmit] = useState(false);

  const onSubmit = async (values: FormikValues) => {
    setIsXhrSubmit(true);
    const updatedPasswordData: IChangePasswordParma = {
      email: content.email,
      password: values.newPassword1
    }

    const passwordUpdated = await changeUserPassword(updatedPasswordData);
    console.log(passwordUpdated)
    if(passwordUpdated && passwordUpdated.data){
      goBack();
    }
  }

  const passwordValidateSchema = Yup.object().shape({
    newPassword1: Yup.string().required('Password is required'),
    newPassword2: Yup.string().required('Confirm Password is required')
     .oneOf([Yup.ref('newPassword1'), null], 'Passwords must match')
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
          newPassword1: '',
          newPassword2: ''
        }}
        onSubmit={onSubmit}
        validationSchema={passwordValidateSchema}
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
                      label="New Password"
                      value={formikProps.values.newPassword1}
                      onChangeText={formikProps.handleChange('newPassword1')}
                      returnKeyType='next'
                      onSubmitEditing={setFocusOnNextField.bind(this, 'newPassword2')}
                      error={!!formikProps.touched.newPassword1 && !!formikProps.errors.newPassword1}
                    />
                    <HelperText type="error" visible={!!formikProps.errors.newPassword1}>{formikProps.errors.newPassword1}
                        </HelperText>
                  </View>


                  <View style={styles.fieldView}>
                    <TextInput
                      label="Confirm Password"
                      ref={(ref) => setFieldRef(ref, 'newPassword2')}
                      value={formikProps.values.newPassword2}
                      onChangeText={formikProps.handleChange('newPassword2')}
                      onSubmitEditing={formikProps.handleSubmit}
                      error={!!formikProps.touched.newPassword2 && !!formikProps.errors.newPassword2}
                      returnKeyType='done'
                    />
                    <HelperText type="error" visible={!!formikProps.errors.newPassword2}>{formikProps.errors.newPassword2}
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
