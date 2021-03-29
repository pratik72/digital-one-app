import React, { Fragment, useEffect, useState } from "react";

import { getAllMaterial } from "../../../services";
import styles from './materials-listing.style';
import moment from "moment";
import { IMaterial } from "../../../typings";
import { FlatList, View } from "react-native";
import { DataTable } from "react-native-paper";
import { COMMON, NAVIGATION } from "../../../constants";
import { EmptyListItem, PaginationComponent } from "../..";

export const MaterialsListing = (props: any) => {

  const [listData, setListData] = useState([] as Array<IMaterial>);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [totalPages, setTotalPages] = useState(0);


  const allMaterials = async (page: number = 1) => {
    if (props.currentSite.id) {
      setRefreshFlag(true);
      const allMaterialsRespond = await getAllMaterial({siteId: props.currentSite.id, page});
      if (allMaterialsRespond && allMaterialsRespond.data[0] && allMaterialsRespond.data[0].data) {
        setListData(allMaterialsRespond.data[0].data);
        const totalPage = Math.ceil(allMaterialsRespond.data[0].count / COMMON.PAGE_SIGE);
        setTotalPages(totalPage);
      }else{
        setListData([]);
        setTotalPages(0);
      }
      setRefreshFlag(false);
    }
  }

  useEffect(() => {
    setTotalPages(0);
    allMaterials();
  }, [props.refreshFlag]);


  const viewMaterial = (currentMaterial: IMaterial) => {
    props.navigation.push(NAVIGATION.VIEW_MATERIAL, {
      currentMaterial,
      refreshData: props.refreshData
    })
  }

  const _renderItem = ({ item, index }: { item: IMaterial, index: any }) => {
    return (
      <DataTable.Row onPress={() => viewMaterial(item)}>
        <DataTable.Cell>{item.metId}</DataTable.Cell>
        <DataTable.Cell>{item.supervisorName}</DataTable.Cell>
        <DataTable.Cell>{item.siteName}</DataTable.Cell>
        <DataTable.Cell>{moment(item.date).format(COMMON.DATE_FORMAT)}</DataTable.Cell>
      </DataTable.Row>
    )
  }
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
            contentContainerStyle={{ alignSelf: 'stretch' }}
            data={listData}
            keyExtractor={(item: any) => item._id}
            renderItem={_renderItem}
            refreshing={refreshFlag}
            onRefresh={allMaterials}
            ListEmptyComponent={EmptyListItem}
          />
        </DataTable>
      </View>
      {!!totalPages && <View style={styles.paginationView}>
        <PaginationComponent totalPages={totalPages} changePage={allMaterials} />
      </View>}
    </Fragment>
  );
};
