import { FieldArray, Formik, FormikValues } from 'formik';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import {
  ScrollView,
  Text,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { DateTimePickerComponent, MultiSelect } from '../../../components';
import { addNewSite, addNewWorkReport, editSite, editWorkReport, getAllSites, getSiteSettings } from '../../../services';
import { IDropdownObject, IWorkDetailTypes, IWorkReportTypes, SiteType, UserTypes } from '../../../typings';

import styles from './add-work-report.style';

export interface IProps {
  user: UserTypes;
  navigation: any;
  route: any;
}

const WorkReportSchema = Yup.object().shape({
  siteObject: Yup.object().shape({
    value: Yup.string().required()
  })
});

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  };
};

class AddWorkReport extends Component<IProps, any> {

  constructor(props: IProps) {
    super(props);

    const WorkDetailTypes: IWorkDetailTypes = {
      totalworker: {
        labour: 0,
        mason: 0
      },
      workDescription: "",
      workType: "",
      workId: "",
      workTypeObject: {
        label: "",
        value: ""
      }
    }
    const workReportFormsObj: IWorkReportTypes = this.getWorkReportFormObject(WorkDetailTypes);

    this.state = {
      initialValues: workReportFormsObj,
      allSitesAsOption: [],
      siteRespond: [],
      allWorkTypeOption: [],
      WorkDetailTypes
    };

  }

  getWorkReportFormObject = (WorkDetailTypes: IWorkDetailTypes) => {

    if (this.props.route.params.currentWorkReport && this.props.route.params.currentWorkReport._id) {
      const allExistingWorks = [...this.props.route.params.currentWorkReport.Works];
      for (let index = 0; index < allExistingWorks.length; index++) {
        const element = allExistingWorks[index];
        element.totalworker.labour = element.totalworker.labour.toString();
        element.totalworker.mason = element.totalworker.mason.toString();
        element.workTypeObject = {
          label: element.workType,
          value: element.workId,
        }

      }
      return {
        Works: allExistingWorks,
        cementAmount: this.props.route.params.currentWorkReport.cementAmount.toString(),
        date: moment(this.props.route.params.currentWorkReport.date).toDate(),
        siteObject: {
          value: this.props.route.params.currentWorkReport.siteId,
          label: this.props.route.params.currentWorkReport.siteName,
        },
        siteId: this.props.route.params.currentWorkReport.siteId,
        supervisorId: this.props.route.params.currentWorkReport.supervisorId,
        supervisorName: this.props.route.params.currentWorkReport.supervisorName,
        siteName: this.props.route.params.currentWorkReport.siteName
      }
    } else {
      return {
        Works: [WorkDetailTypes],
        cementAmount: 0,
        date: moment().toDate(),
        siteId: "",
        siteObject: {} as IDropdownObject,
        supervisorId: "",
        supervisorName: "",
        siteName: ""
      }
    }
  }

  allSites = async () => {
    const respond = await getAllSites();
    if (respond.data) {
      const sitesOptions: Array<{}> = [];
      for (let index = 0; index < respond.data.length; index++) {
        const element = respond.data[index];
        sitesOptions.push({
          value: element.siteId,
          label: element.siteName,
          id: element.siteId,
        });
      }

      this.setState({
        allSitesAsOption: sitesOptions,
        siteRespond: respond.data
      });

      if (this.props.route.params.currentWorkReport && this.props.route.params.currentWorkReport._id) {
        this.fetchSiteSetting({ value: this.props.route.params.currentWorkReport.siteId });
      }
    }
  }

  componentDidMount = () => {
    this.allSites();
    if (this.props.route.params.currentWorkReport && this.props.route.params.currentWorkReport._id) {
      this.props.navigation.setOptions({
        title: "Edit Work Report"
      })
    }
  }

  setFocusOnNextField = (refKey: string) => {
    this._allFieldArray[refKey] && this._allFieldArray[refKey].focus()
  }

  _allFieldArray: any = {};
  setFieldRef = (ref: any, keyName: string) => {
    this._allFieldArray[keyName] = ref
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  handleChangeData = (selectedItems: any, stateKey: string) => {
    this.setState({ [stateKey]: selectedItems });
  };

  fetchSiteSetting = async (siteObj: any) => {
    var respond = await getSiteSettings({ siteId: siteObj.value, userId: this.props.user.user_id });
    if (respond.data && respond.data.workCategories) {
      const newArray = [];
      for (let index = 0; index < respond.data.workCategories.length; index++) {
        const element = respond.data.workCategories[index];
        newArray.push({
          value: element.workCategoryId,
          label: element.workType,
          id: element.workCategoryId
        });
      }

      this.setState({
        allWorkTypeOption: newArray
      });
    }
  }

  submitEvent = async (values: FormikValues) => {
    const { 
      Works,
      cementAmount,
      date,
      siteObject
    } = values;

    const isEdit = this.props.route.params.currentWorkReport && this.props.route.params.currentWorkReport._id;
    const newWorkReportData: IWorkReportTypes = {
      Works,
      cementAmount,
      date,
      siteId: siteObject.value,
      supervisorId: this.props.user.user_id,
      supervisorName: `${this.props.user.firstName} ${this.props.user.lastName}`,
      siteName: siteObject.label
    };

    const workReportCreated = await (isEdit ? editWorkReport({...newWorkReportData, _id: this.props.route.params.currentWorkReport._id }) : addNewWorkReport(newWorkReportData));

    if (workReportCreated && workReportCreated.data) {
      this.props.navigation.goBack()
        this.props.route.params.refreshData();
        if(isEdit && this.props.route.params.setWorkReportDetails){
          this.props.route.params.setWorkReportDetails({...newWorkReportData, _id: this.props.route.params.currentWorkReport._id });
        }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <Formik
            initialValues={this.state.initialValues}
            onSubmit={this.submitEvent}
            validationSchema={WorkReportSchema}
          >
            {props => {
              return (
                <View>
                  <ScrollView style={{ padding: 0 }} contentContainerStyle={{ flexGrow: 1 }}>

                    <View>
                      <View>
                        <MultiSelect value={props.values.siteObject} items={this.state.allSitesAsOption} onChange={(val: any) => { props.setFieldValue('siteObject', val); this.fetchSiteSetting(val); }} label="Site" />
                        <HelperText type="error" visible={!!props.errors.siteObject?.value}>{ props.errors.siteObject?.value}
                        </HelperText>
                      </View>

                      <View>
                        <DateTimePickerComponent label="Date" values={props.values.date} onChange={(date: Date) => props.setFieldValue('date', date)} />
                      </View>
                      <View style={styles.fieldView}>
                        <TextInput
                          label="Cement"
                          keyboardType="number-pad"
                          ref={(ref) => this.setFieldRef(ref, 'cementAmount')}
                          value={props.values.cementAmount}
                          onChangeText={props.handleChange('cementAmount')}
                          onSubmitEditing={this.setFocusOnNextField.bind(this, 'ownerContactNo')}
                          returnKeyType='next'
                          error={!!props.touched.cementAmount && !!props.errors.cementAmount}
                        />
                      </View>

                      <FieldArray
                        name="Works"
                        render={arrayHelpers => (
                          <Fragment>
                            {!!props.values.Works.length && props.values.Works.map((workDetails: any, idx: any) => (
                              <View style={[styles.fieldView, { borderWidth: 1, borderColor: '#dee2e6', backgroundColor: '#007bff', paddingHorizontal: 5, paddingVertical: 7 }]} key={idx}>
                                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }]}>
                                  <Text style={[styles.labelText, { width: 200, color: '#fff' }]}>Work Details</Text>
                                  <TouchableOpacity style={{ marginRight: 7 }} onPress={() => {
                                    arrayHelpers.remove(idx);
                                  }}>
                                    <Text style={[styles.labelText, { color: '#fff' }]}>X</Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={styles.fieldView}>
                                  <MultiSelect value={workDetails.workTypeObject} name={`Works[${idx}].workTypeObject`} items={this.state.allWorkTypeOption} onChange={(val: any) => { props.setFieldValue(`Works[${idx}].workTypeObject`, val); props.setFieldValue(`Works[${idx}].workId`, val.value); props.setFieldValue(`Works[${idx}].workType`, val.label); }} label="Work Type" disabled={!props.values.siteObject?.value} />
                                </View>
                                <View style={styles.fieldView}>
                                  <TextInput
                                    label="Mason"
                                    keyboardType="number-pad"
                                    ref={(ref) => this.setFieldRef(ref, 'Mason')}
                                    value={workDetails.totalworker.mason}
                                    onChangeText={props.handleChange(`Works[${idx}].totalworker.mason`)}
                                    onSubmitEditing={this.setFocusOnNextField.bind(this, 'Labour')}
                                    returnKeyType='next'
                                  />
                                </View>

                                <View style={styles.fieldView}>
                                  <TextInput
                                    label="Labour"
                                    keyboardType="number-pad"
                                    ref={(ref) => this.setFieldRef(ref, 'Labour')}
                                    value={workDetails.totalworker.labour}
                                    onChangeText={props.handleChange(`Works[${idx}].totalworker.labour`)}
                                    onSubmitEditing={this.setFocusOnNextField.bind(this, 'Description')}
                                    returnKeyType='next'
                                  />
                                </View>

                                <View style={styles.fieldView}>
                                  <TextInput
                                    label="Description"
                                    multiline={true}
                                    ref={(ref) => this.setFieldRef(ref, 'Description')}
                                    value={workDetails.workDescription}
                                    onChangeText={props.handleChange(`Works[${idx}].workDescription`)}
                                    onSubmitEditing={props.handleSubmit}
                                    returnKeyType='done'
                                  />
                                </View>

                              </View>
                            ))}

                            <View style={styles.fieldView}>
                              <Button mode="contained" onPress={() => { arrayHelpers.push(this.state.WorkDetailTypes) }} uppercase={false} style={styles.btn}>
                                <Text style={{ fontSize: 16 }}>{'Add Another Work Details'}</Text>
                              </Button>
                            </View>
                          </Fragment>
                        )}></FieldArray>




                      <View style={styles.btnView}>
                        <Button mode="contained" onPress={props.handleSubmit} uppercase={false} style={styles.btn}>
                          <Text style={{ fontSize: 16 }}>{'Save'}</Text>
                        </Button>
                        <Button mode="contained" onPress={this.goBack} uppercase={false} style={styles.btn}>
                          <Text style={{ fontSize: 16 }}>{'Cancel'}</Text>
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

export default connect(mapStateToProps, {})(AddWorkReport);