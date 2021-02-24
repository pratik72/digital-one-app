import React, { useEffect, useState } from "react";

import { getAllSites } from "../../../services";
import styles from './sites-listing.style';
import moment from "moment";
import { SiteType } from "../../../typings";
import { FlatList, View } from "react-native";
import { DataTable } from "react-native-paper";
import { COMMON, NAVIGATION } from "../../../constants";
import { EmptyListItem } from "../..";

export const SitesListing = (props: any) => {

  const [listData, setListData] = useState([] as Array<SiteType>);

  const allSites = async () => {
    const allSitesRespond = await getAllSites();
    if (allSitesRespond && allSitesRespond.data) {
      setListData(allSitesRespond.data);
    }
  }

  useEffect(() => {
    allSites();
  }, [props.refreshFlag]);

  const viewSite = (siteDetails: SiteType) => {
    props.navigation.push(NAVIGATION.VIEW_SITE, {
      siteDetails,
      refreshSiteData: props.refreshSiteData
    })
  }

  const _renderItem = ({item}: {item: SiteType}) => {
    return (
    <DataTable.Row onPress={()=>viewSite(item)} key={item.siteId}>
      <DataTable.Cell>{item.siteName}</DataTable.Cell>
      <DataTable.Cell>{item.ownerName}</DataTable.Cell>
      <DataTable.Cell>{moment(item.tentativeDeadline).format(COMMON.DATE_FORMAT)}</DataTable.Cell>
    </DataTable.Row>
    )
  }

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Site Name</DataTable.Title>
          <DataTable.Title>Owner Name</DataTable.Title>
          <DataTable.Title>Complete Date</DataTable.Title>
        </DataTable.Header>

        <FlatList
          contentContainerStyle={{ alignSelf: 'stretch' }}
          data={listData}
          keyExtractor={(item: any) => item.siteId}
          renderItem={_renderItem}
          refreshing={false}
          onRefresh={allSites}
          ListEmptyComponent={EmptyListItem}
        />
      </DataTable>
    </View>
  );
};
