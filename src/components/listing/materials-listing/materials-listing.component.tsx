import React, { Fragment, useEffect, useState } from "react";

import { getAllMaterial } from "../../../services";
import styles from './materials-listing.style';
import moment from "moment";
import { IMaterial } from "../../../typings";
import { FlatList, View } from "react-native";
import { DataTable } from "react-native-paper";
import { COMMON, NAVIGATION } from "../../../constants";

export const MaterialsListing = (props: any) => {

  const [listData, setListData] = useState([] as Array<IMaterial>);


  const allWorkReport = async () => {
    if(props.currentSite.id){
      const allWorkReportRespond = await getAllMaterial(props.currentSite.id);
      if(allWorkReportRespond && allWorkReportRespond.data){
        setListData(allWorkReportRespond.data);
      }
    }
  }

  useEffect(() => {
    allWorkReport();
  }, [props.refreshFlag]);


  const viewMaterial = (currentMaterial: IMaterial) => {
    props.navigation.push(NAVIGATION.VIEW_MATERIAL, {
      currentMaterial,
      refreshData: props.refreshData
    })
  }

  const _renderItem = ({item, index}: {item: IMaterial, index: any}) => {
    return (
    <DataTable.Row onPress={()=>viewMaterial(item)} key={item.metId || index}>
      <DataTable.Cell>{item.metId}</DataTable.Cell>
      <DataTable.Cell>{item.supervisorName}</DataTable.Cell>
      <DataTable.Cell>{item.siteName}</DataTable.Cell>
      <DataTable.Cell>{moment(item.date).format(COMMON.DATE_FORMAT)}</DataTable.Cell>
    </DataTable.Row>
    )
  }

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Id</DataTable.Title>
          <DataTable.Title>Reporter</DataTable.Title>
          <DataTable.Title>Site Name</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>

        <FlatList
          contentContainerStyle={{ alignSelf: 'stretch' }}
          data={listData}
          keyExtractor={(item: any) => item.metId}
          renderItem={_renderItem}
          refreshing={false}
          onRefresh={allWorkReport}
        />
      </DataTable>
    </View>
  );
};
