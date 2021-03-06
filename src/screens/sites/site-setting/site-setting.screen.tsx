import React, { Component, Fragment } from 'react';
import {
  ScrollView,
    Text,
  View
} from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Loader, MultiSelect } from '../../../components';
import { getAllUsersDetails, getAllWorkCategory, getSiteSettings, updateSiteSettings } from '../../../services';
import { ISiteRules } from '../../../typings';

import styles from './site-setting.style';

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  };
};

interface ISiteSettingStates {
  siteSetting: ISiteRules;
  loadSettings: boolean;
  currentSite: any;
  allWorkCategory: Array<any>;
  allWorkCategoryAsOption: Array<any>;

  allUsersDetails: Array<any>;
  allUsersAsOption: Array<any>;

  adminUsersOpt: Array<any>;
  supervisorsOpt: Array<any>;
  userExpenseOpt: Array<any>;
  workCategoryOpt: Array<any>;
}

const VIEW_NAMES = {
  ADMIN_VIEW: "ADMIN_VIEW",
  SUPERVISOR_VIEW: "SUPERVISOR_VIEW",
  EXPENSE_USERS_VIEW: "EXPENSE_USERS_VIEW",
  WORK_CATEGORY_VIEW: "WORK_CATEGORY_VIEW"
}

class SiteSettingScreen extends Component<any, ISiteSettingStates> {

  private xhr: any = {};

  constructor(props: any) {
    super(props);
    this.state = {
      siteSetting: {} as ISiteRules,
      loadSettings: false,
      currentSite: this.props.route.params.siteDetails || {},
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

  componentWillUnmount = () => {
    if (this.xhr.respond && this.xhr.respond.abort) {
      this.xhr.respond.abort();
    }

    if (this.xhr.allWorkCatRespond && this.xhr.allWorkCatRespond.abort) {
      this.xhr.allWorkCatRespond.abort();
    }

    if (this.xhr.getAllUsersRespond && this.xhr.getAllUsersRespond.abort) {
      this.xhr.getAllUsersRespond.abort();
    }

    if (this.xhr.updateData && this.xhr.updateData.abort) {
      this.xhr.updateData.abort();
    }

  }

  fetchSiteSetting =  () => {
    this.setState({
      loadSettings: true
    }, async () => {
      this.xhr.respond = await getSiteSettings({siteId: this.state.currentSite?.siteId, userId: this.props.user.user_id});
      if (this.xhr.respond.data) {
        this.setState({
          siteSetting: this.xhr.respond.data
        }, ()=>{
          this.fetchAllUsers();
          this.fetchAllWorkCategory();
        });
      }
      this.setState({
        loadSettings: false
      });
    });
  }

  fetchAllWorkCategory = async () => {
    this.xhr.allWorkCatRespond = await getAllWorkCategory();
    if (this.xhr.allWorkCatRespond.data) {
      const alreadyExistWorkType = this.state.siteSetting.workCategories && this.state.siteSetting.workCategories.map((obj: any)=>{
        return obj.workCategoryId
      });
      const tempWorkCategory = [];
      const selectedWorkType = [];
      for (let index = 0; index < this.xhr.allWorkCatRespond.data.length; index++) {
        const element = this.xhr.allWorkCatRespond.data[index];
        tempWorkCategory.push({
          value: element.workId,
          label: element.WorkTypes,
          id: element.workId,
          name: element.WorkTypes,
        });

        if(alreadyExistWorkType.indexOf(element.workId) > -1 ){
          selectedWorkType.push({
            value: element.workId,
            label: element.WorkTypes,
            id: element.workId,
            name: element.WorkTypes,
          });
        }
        
      }

      this.setState({
        allWorkCategory: this.xhr.allWorkCatRespond.data,
        allWorkCategoryAsOption: tempWorkCategory,
        workCategoryOpt: selectedWorkType
      });
    }
  }

  fetchAllUsers = async () => {
    this.xhr.getAllUsersRespond = await getAllUsersDetails();
    if (this.xhr.getAllUsersRespond.data) {
      const userOptions: Array<any> = [];
      for (let index = 0; index < this.xhr.getAllUsersRespond.data.length; index++) {
        const element = this.xhr.getAllUsersRespond.data[index];
        userOptions.push({
          value: element.user_id,
          id: element.user_id,
          label: `${element.firstName} ${element.lastName}`,
          name: element.user_id,
          disabled: element.user_id === this.state.currentSite.createdBy,
        });
      }

      this.setState({
        allUsersDetails: this.xhr.getAllUsersRespond.data,
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

  
  handleSubmit = async () => {
    const body = {
      adminUsers: this.getDataFromView(VIEW_NAMES.ADMIN_VIEW),
      supervisors: this.getDataFromView(VIEW_NAMES.SUPERVISOR_VIEW),
      userExpense: this.getDataFromView(VIEW_NAMES.EXPENSE_USERS_VIEW),
      workCategories: this.getDataFromView(VIEW_NAMES.WORK_CATEGORY_VIEW),
    };
    
    this.xhr.updateData = await updateSiteSettings({siteId: this.state.currentSite.siteId, body});
    if(this.xhr.updateData.data){
      this.goBack();
    }
  }

  getDataFromView = (userType: string) => {
    const newUserArray: any = [];
    const { 
      adminUsersOpt,
      supervisorsOpt,
      userExpenseOpt,
      workCategoryOpt
    } = this.state;
    let arrayLength = 0
    switch (userType) {
      case VIEW_NAMES.ADMIN_VIEW:
        arrayLength = adminUsersOpt ? adminUsersOpt.length : 0;
        for (let index = 0; index < arrayLength; index++) {
          const element = adminUsersOpt[index];
          newUserArray.push({
            adminUserId: element.value,
            adminUserName: element.label,
          });
        }
        break;
      case VIEW_NAMES.SUPERVISOR_VIEW:
        arrayLength = supervisorsOpt ? supervisorsOpt.length : 0;
        for (let index = 0; index < arrayLength; index++) {
          const element = supervisorsOpt[index];
          newUserArray.push({
            supervisorId: element.value,
            supervisorName: element.label,
          });
        }
        break;
      case VIEW_NAMES.EXPENSE_USERS_VIEW:
        arrayLength = userExpenseOpt ? userExpenseOpt.length : 0;
        for (let index = 0; index < arrayLength; index++) {
          const element = userExpenseOpt[index];
          newUserArray.push({
            expenseUserId: element.value,
            expenseUserName: element.label,
          });
        }
      break;
      case VIEW_NAMES.WORK_CATEGORY_VIEW:
        arrayLength = workCategoryOpt ? workCategoryOpt.length : 0;
        for (let index = 0; index < arrayLength; index++) {
          const element = workCategoryOpt[index];
          newUserArray.push({
            workCategoryId: element.value,
            workType: element.label,
          });
        }
      break;
    
      default:
        break;
    }

    return newUserArray;
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

  handleChangeData = (selectedItems: any, stateKey: string) => {
    this.setState({ [stateKey]: selectedItems });
  };

  render() {
    const {allUsersAsOption, adminUsersOpt, loadSettings} = this.state;
    return (
      <View style={styles.container}>
        {loadSettings && <View style={{marginTop: 30}}>
          <Loader />
        </View>}
        
        {!loadSettings && <Fragment>
          <View style={{flex: 1}}>
            <ScrollView>
              
              <View style={styles.btnContainer}>
                <Text style={styles.labelText}>Admin Users</Text>
                <MultiSelect values={this.state.adminUsersOpt} items={this.state.allUsersAsOption} onChange={(data: any)=>this.handleChangeData(data, 'adminUsersOpt')} multiple={true} />
              </View>

              <View style={styles.btnContainer}>
                <Text style={styles.labelText}>Supervisors</Text>
                <MultiSelect values={this.state.supervisorsOpt} items={this.state.allUsersAsOption} onChange={(data: any)=>this.handleChangeData(data, 'supervisorsOpt')} multiple={true}/>
              </View>

              <View style={styles.btnContainer}>
                <Text style={styles.labelText}>Expense Users</Text>
                <MultiSelect values={this.state.userExpenseOpt} items={this.state.allUsersAsOption} onChange={(data: any)=>this.handleChangeData(data, 'userExpenseOpt')} multiple={true}/>
              </View>

              <View style={styles.btnContainer}>
                <Text style={styles.labelText}>Site Category</Text>
                <MultiSelect values={this.state.workCategoryOpt} items={this.state.allWorkCategoryAsOption} onChange={(data: any)=>this.handleChangeData(data, 'workCategoryOpt')} multiple={true}/>
              </View>
            </ScrollView>
          </View>
          <View style={{ flexDirection: 'row', margin: 5}}>
            <Button mode="contained" onPress={this.handleSubmit} uppercase={false} style={styles.btn}>
              <Text style={{fontSize: 16}}>{'Save'}</Text>
            </Button>
            <Button mode="outlined" onPress={this.goBack} uppercase={false} style={styles.btn}>
              <Text style={{fontSize: 16}}>{'Cancel'}</Text>
            </Button>
          </View>
        </Fragment>}

      </View>
    );
  }
}

export default connect(mapStateToProps, {})(SiteSettingScreen);