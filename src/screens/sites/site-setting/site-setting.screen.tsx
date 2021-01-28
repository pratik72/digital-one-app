import { Formik, FormikValues } from 'formik';
import moment from 'moment';
import React, { Component } from 'react';
import {
  ScrollView,
    Text,
  View
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { Button, HelperText, TextInput } from 'react-native-paper';
import * as Yup from 'yup';
import { DateTimePickerComponent } from '../../../components';
import { addNewSite, editSite, getAllUsersDetails, getAllWorkCategory, getSiteSettings } from '../../../services';
import { ISiteRules, SiteType } from '../../../typings';

import styles from './site-setting.style';

const siteSchema= Yup.object().shape({
  siteName: Yup.string().required(),
  ownerName: Yup.string().required(),
  ownerContactNo: Yup.string().required(),
  siteAddress: Yup.object().shape({
    AddressLine1: Yup.string().required()
  }),
  siteEstimate: Yup.string().required()
});
export class SiteSettingScreen extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      siteSetting: {} as ISiteRules,
      allWorkCategory: [],
      allWorkCategoryAsOption: [],

      allUsersDetails: [],
      allUsersAsOption: [],

      adminUsersOpt: [],
      supervisorsOpt: [],
      userExpenseOpt: [],
      workCategoryOpt: [],
    }
  }

  componentDidMount =  async() => {
    this.fetchSiteSetting();
  }

  fetchSiteSetting = async () => {
    var respond = await getSiteSettings({siteId: this.props.currentSite.siteId,userId: this.props.user.user_id});
    if (respond.data) {
      this.setState({
        siteSetting: respond.data
      });
      this.fetchAllUsers();
      this.fetchAllWorkCategory();
    }
  }

  fetchAllWorkCategory = async () => {
    var respond = await getAllWorkCategory();
    if (respond.data) {
      const alreadyExistWorkType = this.state.siteSetting.workCategories && this.state.siteSetting.workCategories.map((obj: any)=>{
        return obj.workCategoryId
      });
      const tempWorkCategory = [];
      const selectedWorkType = [];
      for (let index = 0; index < respond.data.length; index++) {
        const element = respond.data[index];
        tempWorkCategory.push({
          value: element.workId,
          label: element.WorkTypes
        });

        if(alreadyExistWorkType.indexOf(element.workId) > -1 ){
          selectedWorkType.push({
            value: element.workId,
            label: element.WorkTypes
          });
        }
        
      }

      this.setState({
        allWorkCategory: respond.data,
        allWorkCategoryAsOption: tempWorkCategory,
        workCategoryOpt: selectedWorkType
      });
    }
  }

  fetchAllUsers = async () => {
    var respond = await getAllUsersDetails();
    if (respond.data) {
      const userOptions: Array<any> = [];
      for (let index = 0; index < respond.data.length; index++) {
        const element = respond.data[index];
        userOptions.push({
          value: element.user_id,
          label: `${element.firstName} ${element.lastName}`,
          isFixed: element.user_id === this.props.currentSite.createdBy,
        });
      }

      this.setState({
        allUsersDetails: respond.data,
        allUsersAsOption: userOptions
      });
      
      this.setInitAdminUsers();
    }
  };

  setInitAdminUsers = () => {
    const {siteSetting, allUsersAsOption} = this.state;
    const allAdminMap = siteSetting.adminUsers && siteSetting.adminUsers.map((obj: any)=>{
      return obj.adminUserId
    });
    const allSupervisorsMap = siteSetting.supervisors && siteSetting.supervisors.map((obj: any)=>{
      return obj.supervisorId
    });
    const allExpenseUserMap = siteSetting.userExpense && siteSetting.userExpense.map((obj: any)=>{
      return obj.expenseUserId
    });
    const adminUsersOpt = [];
    const supervisorsOpt = [];
    const userExpenseOpt = [];
    for (let index = 0; index < allUsersAsOption.length; index++) {
      const element = allUsersAsOption[index];
      if(element.value && allAdminMap.indexOf(element.value) > -1){
        adminUsersOpt.push(element);
      }

      if(element.value && allSupervisorsMap.indexOf(element.value) > -1){
        supervisorsOpt.push(element);
      }

      if(element.value && allExpenseUserMap.indexOf(element.value) > -1){
        userExpenseOpt.push(element);
      }

    }

    this.setState({
      adminUsersOpt,
      supervisorsOpt,
      userExpenseOpt
    });
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

  multiSelect: any;

  onSelectedItemsChange = (adminUsersOpt: any) => {
    this.setState({ adminUsersOpt });
  };

  render() {
    const {allUsersAsOption} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <MultiSelect
            hideTags
            items={allUsersAsOption}
            uniqueKey="id"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedItems}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={ (text)=> console.log(text)}
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />
          <View>
            {this.multiSelect?.getSelectedItemsExt(this.state.selectedItems)}
          </View>
        </View>

      </View>
    );
  }
}
