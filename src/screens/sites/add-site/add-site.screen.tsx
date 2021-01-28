import { Formik, FormikValues } from 'formik';
import moment from 'moment';
import React, { Component } from 'react';
import {
  ScrollView,
    Text,
  View
} from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import * as Yup from 'yup';
import { DateTimePickerComponent } from '../../../components';
import { addNewSite, editSite } from '../../../services';
import { SiteType } from '../../../typings';

import styles from './add-site.style';

const siteSchema= Yup.object().shape({
  siteName: Yup.string().required(),
  ownerName: Yup.string().required(),
  ownerContactNo: Yup.string().required(),
  siteAddress: Yup.object().shape({
    AddressLine1: Yup.string().required()
  }),
  siteEstimate: Yup.string().required()
});
export class AddSiteScreen extends Component<any, any> {

  getInitialValue = () => {
    const props = this.props;
    if(props.route.params.siteDetails && props.route.params.siteDetails.siteId){
      const currentSite = props.route.params.siteDetails;
      return {
        siteName: currentSite.siteName,
        ownerName: currentSite.ownerName,
        ownerContactNo: currentSite.ownerContactNo && currentSite.ownerContactNo.toString(),
        siteAddress: {
          AddressLine1: currentSite.siteAddress.AddressLine1,
          City: currentSite.siteAddress.City,
          State: currentSite.siteAddress.State,
          pincode: currentSite.siteAddress.pincode && currentSite.siteAddress.pincode.toString(),
        },
        siteInaugurationDate: moment(currentSite.siteInaugurationDate).toDate(),
        siteEstimate: currentSite.siteEstimate,
        tentativeDeadline: moment(currentSite.tentativeDeadline).toDate()
      }
    } else {
      return {
        siteName: '',
        ownerName: '',
        ownerContactNo: '',
        siteAddress: {
          AddressLine1: '',
          City: '',
          State: '',
          pincode: '',
        },
        siteInaugurationDate: new Date(),
        siteEstimate: '',
        tentativeDeadline: new Date()
      }
    }
  }

  constructor(props: any) {
    super(props);
  }

  componentDidMount = () => {
    if(this.props.route.params.siteDetails && this.props.route.params.siteDetails.siteId){
      this.props.navigation.setOptions({
        title: "Edit Site"
      })
    }
  }

  saveSiteData = async (siteData: FormikValues) => {
    const {siteDetails} = this.props.route.params;
    const isEditSite = siteDetails && siteDetails.siteId;
    const { ownerContactNo, ownerName, siteAddress, siteEstimate, siteInaugurationDate, siteName, tentativeDeadline } = siteData;
    
    const newSiteData: SiteType = {
      ownerContactNo,
      ownerName,
      siteAddress,
      siteEstimate,
      siteInaugurationDate,
      siteName,
      tentativeDeadline
    };

    var siteCreated = await ( isEditSite ? editSite({...newSiteData, siteId: siteDetails.siteId }) : addNewSite(newSiteData));;
    if (siteCreated && siteCreated.data) {
      if(this.props.route.params && this.props.route.params.refreshSiteData){
        this.props.navigation.goBack()
        this.props.route.params.refreshSiteData();
        if(isEditSite && this.props.route.params.setSiteDetails){
          this.props.route.params.setSiteDetails({...newSiteData, siteId: siteDetails.siteId });
        }
      }
    }
  }

  setFocusOnNextField = (refKey: string) => {
    this._allFieldArray[refKey] && this._allFieldArray[refKey].focus()
  }
  
  _allFieldArray:any = {};
  setFieldRef = (ref: any, keyName:string) => {
    this._allFieldArray[keyName] = ref
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
        <Formik
                initialValues={this.getInitialValue()}
                onSubmit={this.saveSiteData}
                validationSchema={siteSchema}
              >
                {props => {
                  return (
                    <View>
                      <ScrollView style={{ padding: 0 }} contentContainerStyle={{ flexGrow: 1 }}>

                        <View>
                          <View>
                            <TextInput
                              label="Site Name"
                              ref={(ref)=>this.setFieldRef(ref, 'siteName')}
                              value={props.values.siteName}
                              onChangeText={props.handleChange('siteName')}
                              onSubmitEditing={this.setFocusOnNextField.bind(this, 'ownerName')}
                              returnKeyType='next'
                              autoCapitalize='none'
                              error={!!props.touched.siteName && !!props.errors.siteName}
                            />
                            <HelperText type="error" visible={!!props.touched.siteName && !!props.errors.siteName}>
                              {props.touched.siteName && props.errors.siteName}
                            </HelperText>
                          </View>

                          <View style={styles.fieldView}>
                            <TextInput
                              label="Owner Name"
                              ref={(ref) => this.setFieldRef(ref, 'ownerName')}
                              value={props.values.ownerName}
                              onChangeText={props.handleChange('ownerName')}
                              onSubmitEditing={this.setFocusOnNextField.bind(this, 'ownerContactNo')}
                              returnKeyType='next'
                              error={!!props.touched.ownerName && !!props.errors.ownerName}
                            />
                            <HelperText type="error" visible={!!props.touched.ownerName && !!props.errors.ownerName}>
                              {props.touched.ownerName && props.errors.ownerName}
                            </HelperText>
                          </View>

                          <View style={styles.fieldView}>
                            <TextInput
                              label="Owner Contract No"
                              keyboardType="number-pad"
                              ref={(ref) => this.setFieldRef(ref, 'ownerContactNo')}
                              value={props.values.ownerContactNo}
                              onChangeText={props.handleChange('ownerContactNo')}
                              onSubmitEditing={this.setFocusOnNextField.bind(this, 'AddressLine1')}
                              returnKeyType='next'
                              error={!!props.touched.ownerContactNo && !!props.errors.ownerContactNo}
                            />
                            <HelperText type="error" visible={!!props.touched.ownerContactNo && !!props.errors.ownerContactNo}>
                              {props.touched.ownerContactNo && props.errors.ownerContactNo}
                            </HelperText>
                          </View>

                          <View style={styles.fieldView}>
                            <TextInput
                              label="Address"
                              name="siteAddress.AddressLine1"
                              multiline={true}
                              ref={(ref) => this.setFieldRef(ref, 'AddressLine1')}
                              value={props.values.siteAddress.AddressLine1}
                              onChangeText={props.handleChange('siteAddress.AddressLine1')}
                              onSubmitEditing={this.setFocusOnNextField.bind(this, 'City')}
                              returnKeyType='next'
                              error={!!props.touched.siteAddress?.AddressLine1 && !!props.errors.siteAddress?.AddressLine1}
                            />
                            <HelperText type="error" visible={!!props.touched.siteAddress?.AddressLine1 && !!props.errors.siteAddress?.AddressLine1}>
                              {props.touched.siteAddress?.AddressLine1 && props.errors.siteAddress?.AddressLine1}
                            </HelperText>
                          </View>

                          <View style={styles.fieldView}>
                            <TextInput
                              label="City"
                              ref={(ref) => this.setFieldRef(ref, 'City')}
                              value={props.values.siteAddress.City}
                              onChangeText={props.handleChange('siteAddress.City')}
                              onSubmitEditing={this.setFocusOnNextField.bind(this, 'State')}
                              returnKeyType='next'
                            />
                          </View>

                          <View style={styles.fieldView}>
                            <TextInput
                              label="State"
                              ref={(ref) => this.setFieldRef(ref, 'State')}
                              value={props.values.siteAddress.State}
                              onChangeText={props.handleChange('siteAddress.State')}
                              onSubmitEditing={this.setFocusOnNextField.bind(this, 'pincode')}
                              returnKeyType='next'
                            />
                          </View>

                          <View style={styles.fieldView}>
                            <TextInput
                              label="Pincode"
                              keyboardType="numeric"
                              ref={(ref) => this.setFieldRef(ref, 'pincode')}
                              value={props.values.siteAddress.pincode}
                              onChangeText={props.handleChange('siteAddress.pincode')}
                              onSubmitEditing={this.setFocusOnNextField.bind(this, 'ownerContactNo')}
                              returnKeyType='next'
                            />
                          </View>

                          <View style={styles.fieldView}>
                            <DateTimePickerComponent label="Start Date" values={props.values.siteInaugurationDate} onChange={(date:Date) => props.setFieldValue('siteInaugurationDate', date)}/>
                          </View>

                          <View style={styles.fieldView}>
                            <TextInput
                              label="Estimate"
                              keyboardType="number-pad"
                              ref={(ref) => this.setFieldRef(ref, 'siteEstimate')}
                              value={props.values.siteEstimate}
                              onChangeText={props.handleChange('siteEstimate')}
                              onSubmitEditing={this.setFocusOnNextField.bind(this, 'ownerContactNo')}
                              returnKeyType='next'
                              error={!!props.touched.siteEstimate && !!props.errors.siteEstimate}
                            />
                            <HelperText type="error" visible={!!props.touched.siteEstimate && !!props.errors.siteEstimate}>
                              {props.touched.siteEstimate && props.errors.siteEstimate}
                            </HelperText>
                          </View>

                          <View style={styles.fieldView}>
                            <DateTimePickerComponent label="Deadline" values={props.values.tentativeDeadline} onChange={(date:Date) => props.setFieldValue('tentativeDeadline', date)}/>
                          </View>

                          <View style={styles.btnView}>
                            <Button mode="contained" onPress={props.handleSubmit} uppercase={false} style={styles.btn}>
                              <Text style={{fontSize: 16}}>{'Save'}</Text>
                            </Button>
                            <Button mode="contained" onPress={this.goBack} uppercase={false} style={styles.btn}>
                              <Text style={{fontSize: 16}}>{'Cancel'}</Text>
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
    );
  }
}
