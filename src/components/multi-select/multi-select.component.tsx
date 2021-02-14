import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
    Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Button, Chip, Colors, Dialog, HelperText, TextInput } from 'react-native-paper';


import styles from './multi-select.component.style';
import { IItemObject, IMultiSelectProps, IMultiSelectStates } from './multi-select.component.types';

export class MultiSelect extends Component<IMultiSelectProps, IMultiSelectStates> {


  constructor(props: IMultiSelectProps) {
    super(props);
    this.state = {
      values: this.props.values || [] as Array<IItemObject>,
      value: this.props.value || {} as IItemObject,
      dialogVisible: false,
      items: this.props.items || [] as Array<IItemObject>,
      selectedItems: [] as Array<IItemObject>,
      disabled: this.props.disabled || false
    }
  }

  componentDidMount = () => {
  }

  componentDidUpdate = (prevProps: IMultiSelectProps) => {
    if(this.props.values != prevProps.values){
      this.setState({
        values: this.props.values || [] as Array<IItemObject>
      });
    }

    if(this.props.value != prevProps.value){
      this.setState({
        value: this.props.value || {} as IItemObject
      });
    }

    if(this.props.disabled != prevProps.disabled){
      this.setState({
        disabled: this.props.disabled || false
      });
    }

    if(this.props.items != prevProps.items){
      this.setState({
        items: this.props.items
      });
    }
  }

  removeChip = (obj: any, index: number) => {
    const allValues = [...this.state.values];
    if(allValues.length && index !== -1 && !obj.disabled){
      allValues.splice(index, 1);
      this.setState({values: allValues});
    }
  }

  openDialog = () => {
    if(this.props.multiple){
      const selectedUserIds = this.state.values.map((obj)=>obj.id);
      const selectedItems = this.state.items.map((obj)=>{
        return selectedUserIds.includes(obj.id) ? {...obj, selected: true } : {...obj, selected: false };
      });
      this.setState({
        dialogVisible: true,
        items: selectedItems
      });
    }else{
      const selectedItems = this.state.items.map((obj)=>{
        return obj.id == this.state.value.id ? {...obj, selected: true } : {...obj, selected: false };
      });
      this.setState({
        dialogVisible: true,
        items: selectedItems
      });
    }
  }

  closeDialog = () => {
    if(this.props.multiple){
      const values = this.state.items.filter((obj)=>{
        return obj.selected && obj
      });
      this.setState({
        dialogVisible: false,
        values,
      }, ()=>{
        this.props.onChange(values);
      });
    }else{
      this.setState({
        dialogVisible: false,
      }, ()=>{
        this.props.onChange(this.state.value);
      });
    }
  }

  onItemSelect = (item: IItemObject) => {
    if(this.props.multiple){
      const items = this.state.items.map((obj)=>{
        return obj.id == item.id ? {...obj, selected: !item.selected}: obj
      });
      this.setState({
        items
      });
    }else{
      const items = this.state.items.map((obj)=>{
        return obj.id == item.id ? {...obj, selected: true}: {...obj, selected: false}
      });
      this.setState({
        items,
        value: item
      }, this.closeDialog);
    }
  }

  renderUserList = ({item}:{item:IItemObject}) => {
    return (
      <TouchableOpacity key={item.id} style={[styles.listRow, item?.selected ? { backgroundColor: '#3f51b526'} : {}, item.disabled ? styles.disabledRow : {}]} disabled={item.disabled} onPress={this.onItemSelect.bind(null, item)}>
        <Text style={[styles.listText, item.disabled ? styles.disabledText : {}]}>{item.label}</Text>
      </TouchableOpacity>
    );
  }

  renderSeparatorView = ({item}:{item:any}) => {
    return (
      <View style={styles.rowSeparator} />
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chipContainer}>
          {this.props.multiple && this.state.values.map((obj:any,index)=>(
            <Chip key={obj.id} onPress={() => console.log('Pressed')} style={styles.chipStyle} onClose={()=>this.removeChip(obj, index)} disabled={obj.disabled}>
              {obj.label}
            </Chip>
          )
          )}
          {this.props.multiple &&
            <Button mode="outlined" uppercase={false} onPress={this.openDialog} style={styles.btnStyle}>
              <Text style={{fontSize: 16}}>Add</Text>
            </Button>
          }

          {!this.props.multiple &&
             <TouchableOpacity onPress={this.openDialog} style={{backgroundColor: '#e7e7e7', paddingHorizontal: 10, paddingVertical: 10, flex: 1}} disabled={this.state.disabled}>
              <Text style={{color:'#6d6d6d', fontSize: 12}}>{this.props.label || 'Select'}</Text>
                {!!this.state.value.label && <Text style={{fontSize: 16, marginTop: 5}}>{this.state.value.label}</Text>}
            </TouchableOpacity>
          }
        </View>

          <Modal
            animationType="slide"
            visible={this.state.dialogVisible}
            onRequestClose={this.closeDialog}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalLable}>Select Users</Text>
              <View style={styles.listView}>
                <FlatList
                  contentContainerStyle={styles.listContainer}
                  data={this.state.items}
                  keyExtractor={(item: any) => item.id}
                  renderItem={this.renderUserList}
                  ItemSeparatorComponent={this.renderSeparatorView}

                />
               
              </View>
              {this.props.multiple && <View style={styles.btnView}>
                <TouchableOpacity style={{...styles.btnStyle, ...styles.btnStyle2}} onPress={this.closeDialog}>
                  <Text style={styles.btnText}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.btnStyle, ...styles.btnStyle2}} onPress={this.closeDialog}>
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
              </View>}
            </View>
        </Modal>

      </View>
    );
  }
}
