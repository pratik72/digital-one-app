import React, { Fragment, useEffect, useState } from "react";

import { getAllSites, getAllWorkReport } from "../../../services";
import styles from './work-report-listing.style';
import moment from "moment";
import { useSelector } from "react-redux";
import { IWorkReportTypes, SiteType } from "../../../typings";
import { FlatList, View } from "react-native";
import { DataTable } from "react-native-paper";
import { COMMON, NAVIGATION } from "../../../constants";

export const WorkReportListing = (props: any) => {

  const [listData, setListData] = useState([] as Array<IWorkReportTypes>);


  const allWorkReport = async () => {
    const allWorkReportRespond = await getAllWorkReport();
    if(allWorkReportRespond && allWorkReportRespond.data){
      setListData(allWorkReportRespond.data);
    }
  }

  useEffect(() => {
    allWorkReport();
  }, [props.refreshFlag]);


  const viewWorkReport = (currentWorkReport: IWorkReportTypes) => {
    props.navigation.push(NAVIGATION.VIEW_WORK_REPORT, {
      currentWorkReport,
      refreshData: props.refreshData
    })
  }

  const _renderItem = ({item}: {item: IWorkReportTypes}) => {
    return (
    <DataTable.Row onPress={()=>viewWorkReport(item)} key={item.workId}>
      <DataTable.Cell>{item.workId}</DataTable.Cell>
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
          keyExtractor={(item: any) => item.workId}
          renderItem={_renderItem}
          refreshing={false}
          onRefresh={allWorkReport}
        />
      </DataTable>
    </View>
  );
};
