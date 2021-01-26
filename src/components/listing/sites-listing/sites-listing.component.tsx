import React, { Fragment, useEffect, useState } from "react";

import { getAllSites } from "../../../services";
import styles from './sites-listing.style';
import moment from "moment";
import { useSelector } from "react-redux";
import { SiteType } from "../../../typings";
import { FlatList, View } from "react-native";
import { DataTable } from "react-native-paper";

interface TableObject {
  columnName: string;
  key: string;
  type: string;
  view: Function;
}

export const SitesListing = (props: any) => {
  const user = useSelector((state:any) => state.user)
  const MODAL_NAMES = {
    CREATE_SITE: "CREATE_SITE",
    SITE_SETTINGS: "SITE_SETTINGS",
    WORK_CATEGORY: "WORK_CATEGORY"
  }

  const [listData, setListData] = useState([] as Array<SiteType>);
  const [show, setShow] = useState(false);
  const [isReadOnly, setReadOnlyFlag] = useState(false);
  const [modalName, setModalName] = useState("");
  const [currentSite, setCurrentSite] = useState({} as SiteType);

  const allSites = async () => {
    const allSitesRespond = await getAllSites();
    if (allSitesRespond && allSitesRespond.data) {
      setListData(allSitesRespond.data);
    }
  }

  useEffect(() => {
    allSites();
  }, [props.refreshFlag]);

  // const tableObject: Array<TableObject> = [{
  //   columnName: "Site Name",
  //   key: "siteName",
  //   type: "text",
  //   view: (rowObj:any, text: any) => (<Button variant="link" onClick={() => viewSite(rowObj)}>{text}</Button>),
  // },
  // {
  //   columnName: "Owner Name",
  //   key: "ownerName",
  //   type: "text",
  //   view: (rowObj:any, text: any) => (<h6>{text}</h6>),
  // },
  // {
  //   columnName: "Start Date",
  //   key: "siteInaugurationDate",
  //   type: "date",
  //   view: (rowObj:any, text: any) => (moment(text).format('DD/MM/YYYY')),
  // },
  // {
  //   columnName: "Complete Date",
  //   key: "tentativeDeadline",
  //   type: "date",
  //   view: (rowObj:any, text: any) => (moment(text).format('DD/MM/YYYY')),
  // }];

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setReadOnlyFlag(false);
    allSites();
  };

  const openModal = (modalString: any) => {
    setModalName(modalString);
    handleShow();
  }

  const openSiteSetting = (siteObject: SiteType) => {
    setCurrentSite(siteObject);
    openModal(MODAL_NAMES.SITE_SETTINGS);
  }


  const viewSite = (siteDetails: SiteType) => {
    props.navigation.push('ViewSite', {
      siteDetails,
      refreshSiteData: props.refreshSiteData
    })
  }

  const _renderItem = ({item}: {item: SiteType}) => {
    return (
    <DataTable.Row onPress={()=>viewSite(item)} key={item.siteId}>
      <DataTable.Cell>{item.siteName}</DataTable.Cell>
      <DataTable.Cell>{item.ownerName}</DataTable.Cell>
      <DataTable.Cell>{moment(item.tentativeDeadline).format('DD/MM/YYYY')}</DataTable.Cell>
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
        />
      </DataTable>
    </View>
  );
};
