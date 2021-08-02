import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button, Colors, IconButton} from 'react-native-paper';
import {connect} from 'react-redux';
import {SiteFilters} from '../../../components/filters/site-filters/site-filters.component';
import {SitesListing} from '../../../components/listing/sites-listing/sites-listing.component';
import {COMMON, NAVIGATION} from '../../../constants';

import styles from './site.style';

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

class SiteScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      refreshFlag: 0,
      showFilter: false,
      filterParam: {},
    };
  }

  componentDidMount = () => {};

  openAddSite = () => {
    this.props.navigation.push(NAVIGATION.ADD_SITE, {
      refreshSiteData: this.refreshSiteData,
    });
  };

  openWorkCategory = () => {
    this.props.navigation.push(NAVIGATION.WORK_CATEGORY);
  };

  refreshSiteData = () => {
    this.setState({
      refreshFlag: Math.floor(Math.random() * 6) + 1,
    });
  };

  toggleFilter = () => {
    this.setState({
      showFilter: !this.state.showFilter,
    });
  };

  closeModalCallback = (flag: boolean) => {
    this.setState({
      showFilter: flag,
    });
  };

  applyFilter = (filterParam: any) => {
    console.log('filter param', filterParam);
    this.setState(
      {
        filterParam,
      },
      this.refreshSiteData,
    );
  };

  render() {
    const {userType} = this.props.user;
    return (
      <View style={styles.container}>
        {userType == COMMON.SUPER_USER && (
          <View style={styles.btnContainer}>
            <Button
              mode="outlined"
              uppercase={false}
              onPress={this.openAddSite}>
              <Text style={{fontSize: 16}}>{'Add Site'}</Text>
            </Button>

            <Button
              mode="outlined"
              uppercase={false}
              onPress={this.openWorkCategory}>
              <Text style={{fontSize: 16}}>{'Manage Category'}</Text>
            </Button>

            <IconButton
              icon="filter-plus-outline"
              color={Colors.deepPurpleA700}
              onPress={this.toggleFilter}
            />
          </View>
        )}

        <SitesListing
          {...this.props}
          refreshFlag={this.state.refreshFlag}
          refreshSiteData={this.refreshSiteData}
          filterParam={this.state.filterParam}
        />

        <SiteFilters
          showModalFlag={this.state.showFilter}
          closeCallback={this.closeModalCallback}
          setFilterCallback={this.applyFilter}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, {})(SiteScreen);
