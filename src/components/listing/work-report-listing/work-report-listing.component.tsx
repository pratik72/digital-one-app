import React, {Fragment, useEffect, useState} from 'react';

import { getAllWorkReport} from '../../../services';
import styles from './work-report-listing.style';
import moment from 'moment';
import {IWorkReportTypes} from '../../../typings';
import {FlatList, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {COMMON, NAVIGATION} from '../../../constants';
import {EmptyListItem, PaginationComponent} from '../..';

export const WorkReportListing = (props: any) => {
  const [listData, setListData] = useState([] as Array<IWorkReportTypes>);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const allWorkReport = async (page: number = 1) => {
    if (props.currentSite.id) {
      setRefreshFlag(true);

      const allWorkReportRespond = await getAllWorkReport({
        siteId: props.currentSite.id,
        page,
      });
      if (
        allWorkReportRespond &&
        allWorkReportRespond.data[0] &&
        allWorkReportRespond.data[0].data
      ) {
        setListData(allWorkReportRespond.data[0].data);
        const totalPage = Math.ceil(
          allWorkReportRespond.data[0].count / COMMON.PAGE_SIGE,
        );
        setTotalPages(totalPage);
      } else {
        setListData([]);
        setTotalPages(0);
      }
      setRefreshFlag(false);
    }
  };

  useEffect(() => {
    setTotalPages(0);
    allWorkReport();
  }, [props.refreshFlag]);

  const viewWorkReport = (currentWorkReport: IWorkReportTypes) => {
    props.navigation.push(NAVIGATION.VIEW_WORK_REPORT, {
      currentWorkReport,
      refreshData: props.refreshData,
      user: props.user,
    });
  };

  const _renderItem = ({item}: {item: IWorkReportTypes}) => {
    return (
      <DataTable.Row onPress={() => viewWorkReport(item)} key={item.workId}>
        <DataTable.Cell>{item.workId}</DataTable.Cell>
        <DataTable.Cell>{item.supervisorName}</DataTable.Cell>
        <DataTable.Cell>{item.siteName}</DataTable.Cell>
        <DataTable.Cell>
          {moment(item.date).format(COMMON.DATE_FORMAT)}
        </DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <Fragment>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Id</DataTable.Title>
            <DataTable.Title>Reporter</DataTable.Title>
            <DataTable.Title>Site Name</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
          </DataTable.Header>

          <FlatList
            contentContainerStyle={{alignSelf: 'stretch'}}
            data={listData}
            keyExtractor={(item: any) => item.workId}
            renderItem={_renderItem}
            refreshing={refreshFlag}
            onRefresh={allWorkReport}
            ListEmptyComponent={EmptyListItem}
          />
        </DataTable>
      </View>
      {!!totalPages && (
        <View style={styles.paginationView}>
          <PaginationComponent
            totalPages={totalPages}
            changePage={allWorkReport}
          />
        </View>
      )}
    </Fragment>
  );
};
