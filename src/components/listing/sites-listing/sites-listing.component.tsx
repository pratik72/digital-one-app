import React, {Fragment, useEffect, useState} from 'react';

import {getAllSites} from '../../../services';
import styles from './sites-listing.style';
import moment from 'moment';
import {SiteType} from '../../../typings';
import {FlatList, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {COMMON, NAVIGATION} from '../../../constants';
import {EmptyListItem, PaginationComponent} from '../..';

export const SitesListing = (props: any) => {
  const [listData, setListData] = useState([] as Array<SiteType>);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const allSites = async (page: number = 1) => {
    console.log('props.filterParam', props.filterParam);
    setRefreshFlag(true);
    const allSitesRespond = await getAllSites({page, ...props.filterParam});
    console.log('allSitesRespond', allSitesRespond);
    if (allSitesRespond && allSitesRespond.status == 200) {
      const totalPage = Math.ceil(
        (allSitesRespond.data.length ? allSitesRespond.data[0].count : 0) /
          COMMON.PAGE_SIGE,
      );
      setListData(
        allSitesRespond.data.length ? allSitesRespond.data[0].data : [],
      );
      setTotalPages(totalPage);
    }
    setRefreshFlag(false);
  };

  useEffect(() => {
    allSites();
  }, [props.refreshFlag]);

  const viewSite = (siteDetails: SiteType) => {
    props.navigation.push(NAVIGATION.VIEW_SITE, {
      siteDetails,
      refreshSiteData: props.refreshSiteData,
      user: props.user,
    });
  };

  const _renderItem = ({item}: {item: SiteType}) => {
    return (
      <DataTable.Row onPress={() => viewSite(item)} key={item.siteId}>
        <DataTable.Cell>{item.siteName}</DataTable.Cell>
        <DataTable.Cell>{item.ownerName}</DataTable.Cell>
        <DataTable.Cell>
          {moment(item.tentativeDeadline).format(COMMON.DATE_FORMAT)}
        </DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <Fragment>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Site Name</DataTable.Title>
            <DataTable.Title>Owner Name</DataTable.Title>
            <DataTable.Title>Complete Date</DataTable.Title>
          </DataTable.Header>

          <FlatList
            contentContainerStyle={{alignSelf: 'stretch'}}
            data={listData}
            keyExtractor={(item: any) => item.siteId}
            renderItem={_renderItem}
            refreshing={refreshFlag}
            onRefresh={allSites}
            ListEmptyComponent={EmptyListItem}
          />
        </DataTable>
      </View>
      <View style={styles.paginationView}>
        <PaginationComponent totalPages={totalPages} changePage={allSites} />
      </View>
    </Fragment>
  );
};
