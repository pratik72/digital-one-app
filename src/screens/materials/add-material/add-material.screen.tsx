import { Formik, FormikValues } from 'formik';
import moment from 'moment';
import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View
} from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { DateTimePickerComponent, MultiSelect } from '../../../components';
import { addNewMaterial, editMaterial, getAllSites } from '../../../services';
import { IDropdownObject, IMaterial, UserTypes } from '../../../typings';

import styles from './add-material.style';

export interface IProps {
  user: UserTypes;
  navigation: any;
  route: any;
}

const MaterialSchema = Yup.object().shape({
  siteObject: Yup.object().shape({
    value: Yup.string().required()
  }),
  materialType: Yup.string().required(),
  materialUnit: Yup.string().required(),
  materialTotalQuantity: Yup.string().required(),
  invoicePrice: Yup.string().required()
});

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  };
};

class AddMaterial extends Component<IProps, any> {

  constructor(props: IProps) {
    super(props);

    const materialFormsObj: IMaterial = this.getMaterialFormObject();

    this.state = {
      initialValues: materialFormsObj,
      allSitesAsOption: [],
      siteRespond: []
    };

  }

  getMaterialFormObject = () => {

    if (this.props.route.params.currentMaterial && this.props.route.params.currentMaterial._id) {
      const allExistingWorks = [...this.props.route.params.currentMaterial.Works];
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
        
        date: moment(this.props.route.params.currentMaterial.date).toDate(),
        siteObject: {
          value: this.props.route.params.currentMaterial.siteId,
          label: this.props.route.params.currentMaterial.siteName,
        },
        siteId: this.props.route.params.currentMaterial.siteId,
        supervisorId: this.props.route.params.currentMaterial.supervisorId,
        supervisorName: this.props.route.params.currentMaterial.supervisorName,
        siteName: this.props.route.params.currentMaterial.siteName,

        materialType : this.props.route.params.currentMaterial.materialType,
        materialUnit : this.props.route.params.currentMaterial.materialUnit,
        materialTotalQuantity : this.props.route.params.currentMaterial.materialTotalQuantity,
        pricePerUnit : this.props.route.params.currentMaterial.pricePerUnit,
        invoicePrice : this.props.route.params.currentMaterial.invoicePrice,
        invoiceNo : this.props.route.params.currentMaterial.invoiceNo
      }
    } else {
      return {
        date: moment().toDate(),
        siteId: "",
        siteObject: {} as IDropdownObject,
        supervisorId: "",
        supervisorName: "",
        siteName: "",
        materialType : "",
        materialUnit : "",
        materialTotalQuantity : "",
        pricePerUnit : "",
        invoicePrice : "",
        invoiceNo : ""
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

    }
  }

  componentDidMount = () => {
    this.allSites();
    if (this.props.route.params.currentMaterial && this.props.route.params.currentMaterial._id) {
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

  submitEvent = async (values: FormikValues) => {
    const { 
      Works,
      cementAmount,
      date,
      siteObject,
      materialType,
      materialUnit,
      materialTotalQuantity,
      pricePerUnit,
      invoicePrice,
      invoiceNo
    } = values;

    const isEdit = this.props.route.params.currentMaterial && this.props.route.params.currentMaterial.metId;
    const newWorkReportData: IMaterial = {
      date,
      siteId: siteObject.value,
      supervisorId: this.props.user.user_id,
      supervisorName: `${this.props.user.firstName} ${this.props.user.lastName}`,
      siteName: siteObject.label,
      materialType,
      materialUnit,
      materialTotalQuantity,
      pricePerUnit,
      invoicePrice,
      invoiceNo
    };

    const workReportCreated = await (isEdit ? editMaterial({...newWorkReportData, metId: this.props.route.params.currentMaterial.metId }) : addNewMaterial(newWorkReportData));

    if (workReportCreated && workReportCreated.data) {
      this.props.navigation.goBack()
        this.props.route.params.refreshData();
        if(isEdit && this.props.route.params.setWorkReportDetails){
          this.props.route.params.setWorkReportDetails({...newWorkReportData, _id: this.props.route.params.currentMaterial._id });
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
            validationSchema={MaterialSchema}
          >
            {props => {
              return (
                <View>
                  <ScrollView style={{ padding: 0 }} contentContainerStyle={{ flexGrow: 1 }}>

                    <View>
                      <View>
                        <MultiSelect value={props.values.siteObject} items={this.state.allSitesAsOption} onChange={(val: any) => { props.setFieldValue('siteObject', val); }} label="Site" />
                        <HelperText type="error" visible={!!props.errors.siteObject?.value}>{ props.errors.siteObject?.value}
                        </HelperText>
                      </View>

                      <View>
                        <DateTimePickerComponent label="Date" values={props.values.date} onChange={(date: Date) => props.setFieldValue('date', date)} />
                      </View>

                      <View style={styles.fieldView}>
                        <TextInput
                          label="Invoice Number"
                          ref={(ref) => this.setFieldRef(ref, 'invoiceNo')}
                          value={props.values.invoiceNo}
                          onChangeText={props.handleChange('invoiceNo')}
                          onSubmitEditing={this.setFocusOnNextField.bind(this, 'materialType')}
                          returnKeyType='next'
                        />
                      </View>

                      <View style={styles.fieldView}>
                        <TextInput
                          label="Material Name"
                          ref={(ref) => this.setFieldRef(ref, 'materialType')}
                          value={props.values.materialType}
                          onChangeText={props.handleChange('materialType')}
                          onSubmitEditing={this.setFocusOnNextField.bind(this, 'materialUnit')}
                          returnKeyType='next'
                          error={!!props.touched.materialType && !!props.errors.materialType}
                        />
                      </View>

                      <View style={styles.fieldView}>
                        <TextInput
                          label="Unit"
                          keyboardType="number-pad"
                          ref={(ref) => this.setFieldRef(ref, 'materialUnit')}
                          value={props.values.materialUnit}
                          onChangeText={props.handleChange('materialUnit')}
                          onSubmitEditing={this.setFocusOnNextField.bind(this, 'materialTotalQuantity')}
                          returnKeyType='next'
                          error={!!props.touched.materialUnit && !!props.errors.materialUnit}
                        />
                      </View>

                      <View style={styles.fieldView}>
                        <TextInput
                          label="Quantity"
                          keyboardType="number-pad"
                          ref={(ref) => this.setFieldRef(ref, 'materialTotalQuantity')}
                          value={props.values.materialTotalQuantity}
                          onChangeText={props.handleChange('materialTotalQuantity')}
                          onSubmitEditing={this.setFocusOnNextField.bind(this, 'pricePerUnit')}
                          returnKeyType='next'
                          error={!!props.touched.materialTotalQuantity && !!props.errors.materialTotalQuantity}
                        />
                      </View>

                      <View style={styles.fieldView}>
                        <TextInput
                          label="Per Unit Price"
                          keyboardType="number-pad"
                          ref={(ref) => this.setFieldRef(ref, 'pricePerUnit')}
                          value={props.values.pricePerUnit}
                          onChangeText={props.handleChange('pricePerUnit')}
                          onSubmitEditing={this.setFocusOnNextField.bind(this, 'invoicePrice')}
                          returnKeyType='next'
                        />
                      </View>

                      <View style={styles.fieldView}>
                        <TextInput
                          label="Invoice Price"
                          keyboardType="number-pad"
                          ref={(ref) => this.setFieldRef(ref, 'invoicePrice')}
                          value={props.values.invoicePrice}
                          onChangeText={props.handleChange('invoicePrice')}
                          onSubmitEditing={props.handleSubmit}
                          returnKeyType='done'
                        />
                      </View>

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

export default connect(mapStateToProps, {})(AddMaterial);