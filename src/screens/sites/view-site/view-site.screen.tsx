import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button} from 'react-native-paper';
import { LabelValueRow, Loader } from '../../../components';
import { COMMON, NAVIGATION } from '../../../constants';
import { getSiteSettings } from '../../../services';
import styles from './view-site.style';


export const ViewSiteScreen = (props: any) => {

  const [siteDetails, setSiteDetails] = useState(props.route.params.siteDetails);
  const [canUpdateSite, setUpdateSiteFlag] = useState(false);
  const [xhrLoader, setXhrLoader] = useState(true);

    const getCurrentSiteSetting = async () => {
      console.log(xhrLoader)
      const siteSetting = await getSiteSettings({siteId: siteDetails?.siteId, userId: props.route.params.user.user_id});
      if(siteSetting.data){
        const allAdminUsers = siteSetting.data.adminUsers;
        for (let index = 0; index < allAdminUsers.length; index++) {
          const element = allAdminUsers[index];
          if(element.adminUserId === props.route.params.user.user_id){
            setUpdateSiteFlag(true);
          }
        }
      }
      setXhrLoader(false);
    }

    useEffect(() => {
      if(xhrLoader){
        getCurrentSiteSetting();
      }
    });

    const openEditSite = () => {
      const {refreshSiteData} = props.route.params;
      props.navigation.push(NAVIGATION.ADD_SITE, {
        refreshSiteData,
        siteDetails,
        setSiteDetails
      })
    }

    const openSiteSettig = () => {
      props.navigation.push(NAVIGATION.SITE_SETTING , {siteDetails})
    }

    return (
      <View style={styles.container}>
        {canUpdateSite && <View style={styles.btnContainer}>
          <Button mode="outlined" uppercase={false} onPress={openEditSite} style={styles.btnStyle}>
            <Text style={{fontSize: 16}}>{'Edit'}</Text>
          </Button>
          <Button mode="outlined" uppercase={false} onPress={openSiteSettig} style={styles.btnStyle}>
            <Text style={{fontSize: 16}}>{'Setting'}</Text>
          </Button>  
        </View>}

        {xhrLoader && <View style={styles.btnContainer}>
          <Loader />
        </View>}
        

        <View>
          <ScrollView>
              <View style={styles.scrollWrapper}>
                <LabelValueRow label="Id" value={siteDetails.siteId}/>
                <LabelValueRow label="Site Name" value={siteDetails.siteName}/>
                <LabelValueRow label="Owner Name" value={siteDetails.ownerName}/>
                <LabelValueRow label="Owner Contract No" value={siteDetails.ownerContactNo}/>
                <LabelValueRow label="Address" value={siteDetails.siteAddress.AddressLine1}/>
                <LabelValueRow label="City" value={siteDetails.siteAddress.City}/>
                <LabelValueRow label="State" value={siteDetails.siteAddress.State}/>
                <LabelValueRow label="Pincode" value={siteDetails.siteAddress.pincode}/>
                <LabelValueRow label="Start Date" value={moment(siteDetails.tentativeDeadline).format(COMMON.DATE_FORMAT)}/>
                <LabelValueRow label="Estimate" value={siteDetails.siteEstimate}/>
                <LabelValueRow label="Deadline" value={moment(siteDetails.tentativeDeadline).format(COMMON.DATE_FORMAT)}/>

              </View>
        
          </ScrollView>
        
        </View>
      </View>
    );
}
