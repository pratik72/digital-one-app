import { Formik, FormikValues } from "formik";
import React from "react";

import { Alert, FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, DataTable, Divider, HelperText, List, TextInput } from "react-native-paper";
import * as Yup from 'yup';
import { Loader } from "../../components";
import { addWorkCategory, editWorkCategory, getAllWorkCategory } from "../../services";
import styles from './work-category.style';

interface IWorkCategory {
  WorkTypes: string;
  workId: string;
}

interface IState {
  newWorkCategory: string;
  allCategory: Array<IWorkCategory>;
  editCategory: IWorkCategory;
  xhrLoader: boolean;
  refreshFlag: boolean;
}

const categorySchema = Yup.object().shape({
  newWorkCategory: Yup.string().required()
});

export class WorkCategory extends React.PureComponent<any, IState> {

  private xhr: any = {};

  public constructor(props: any) {
    super(props);

    this.state = {
      newWorkCategory: "",
      allCategory: [] as Array<IWorkCategory>,
      editCategory: {} as IWorkCategory,
      xhrLoader: false,
      refreshFlag: false
    };
  }

  componentDidMount = async () => {
    this.fetchAllWorkCategory();
  }

  componentWillUnmount = () => {
    if (this.xhr.respond && this.xhr.respond.abort) {
      this.xhr.respond.abort();
    }

    if (this.xhr.addWorkCatRespond && this.xhr.addWorkCatRespond.abort) {
      this.xhr.addWorkCatRespond.abort();
    }

  }

  fetchAllWorkCategory = () => {
    this.setState({
      refreshFlag: true
    }, async () => {
      this.xhr.respond = await getAllWorkCategory();
      if (this.xhr.respond.data) {
        this.setState({
          allCategory: this.xhr.respond.data,
          refreshFlag: false
        });
      }else{
        this.setState({
          refreshFlag: false
        });
      }
    });
  }

  saveData =  (formData: FormikValues, formikObj: any) => {
    console.log(formikObj);
    const { newWorkCategory } = formData;
    const { editCategory } = this.state;
    if (newWorkCategory) {
      const body = { WorkTypes: newWorkCategory }
      this.setState({
        xhrLoader: true
      }, async () => {
        this.xhr.addWorkCatRespond = await (editCategory?.workId ? editWorkCategory({ body, workId: editCategory.workId }) : addWorkCategory(body));
        if (this.xhr.addWorkCatRespond && this.xhr.addWorkCatRespond.data) {
          //Alert.alert("Success", this.xhr.addWorkCatRespond.data.message);
          formikObj && formikObj.resetForm && formikObj.resetForm();
          this.setState({
            newWorkCategory: "",
            editCategory: {} as IWorkCategory,
            xhrLoader: false
          },this.fetchAllWorkCategory);
        }else{
          this.setState({
            xhrLoader: false
          });
        }
      });
    } else {
      Alert.alert("Validation", "Please add text in field.");
    }
  }



  updateNewWorkCategory = (event: any) => {
    this.setState({
      newWorkCategory: event.target.value
    });
  }

  editWorkCategory = (obj: IWorkCategory) => {
    this.setState({
      editCategory: obj,
      newWorkCategory: obj.WorkTypes
    });
  }

  _renderItem = ({item}:{item:any}) => {

    return (
      <DataTable.Row >
        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingTop: 10}}>
          <Text >{item.WorkTypes}</Text>
            <TouchableOpacity style={{marginRight: 5}} onPress={this.editWorkCategory.bind(this,item)}>
              <Text style={{fontSize: 14, color: '#007bff'}}>Edit</Text>
            </TouchableOpacity>
        </View>
        
      </DataTable.Row>
    );
  }


  public render() {
    const { newWorkCategory, allCategory, editCategory } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <Formik
            enableReinitialize
            initialValues={{ newWorkCategory }}
            validationSchema={categorySchema}
            onSubmit={this.saveData}
          >
            {props => {
              return (
                <View>
                  <View>
                    <View>
                      <TextInput
                        label="Work Category"
                        value={props.values.newWorkCategory}
                        onChangeText={props.handleChange('newWorkCategory')}
                        onSubmitEditing={props.handleSubmit}
                        returnKeyType='done'
                        autoCapitalize='none'
                        error={!!props.touched.newWorkCategory && !!props.errors.newWorkCategory}
                      />
                      <HelperText type="error" visible={!!props.touched.newWorkCategory && !!props.errors.newWorkCategory}>
                        {props.touched.newWorkCategory && props.errors.newWorkCategory}
                      </HelperText>
                    </View>


                    <View>
                      {!this.state.xhrLoader && <Button mode="contained" onPress={props.handleSubmit} uppercase={false}>
                        <Text style={{ fontSize: 16 }}>{'Add'}</Text>
                      </Button>}

                      {this.state.xhrLoader && <Loader />}
                    </View>

                  </View>

                </View>
              );
            }}
          </Formik>
          <Divider />
        </View>
        
        <View>
          <FlatList
            contentContainerStyle={{ alignSelf: 'stretch' }}
            data={allCategory}
            keyExtractor={(item: any) => item.workId}
            renderItem={this._renderItem}
            refreshing={this.state.refreshFlag}
            onRefresh={this.fetchAllWorkCategory}
          />
        </View>
      </View>
    );
  }
};
