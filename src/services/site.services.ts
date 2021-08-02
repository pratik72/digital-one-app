import {get, getQueryBasedOnParam, post} from '../utils/axios.util';
import {SiteFilterAPIProps, SiteType} from '../typings';

export const addNewSite = (siteParam: SiteType) => {
  return post({url: 'constructionSite/addNewSite', body: siteParam});
};

export const editSite = (siteParam: SiteType) => {
  return post({url: 'constructionSite/editSiteInfo', body: siteParam});
};

export const getAllSites = ({
  page,
  siteName,
  siteInaugurationDateFrom,
  siteInaugurationDateTo,
  tentativeDeadlineFrom,
  tentativeDeadlineTo,
}: SiteFilterAPIProps) => {
  const query = getQueryBasedOnParam({
    page,
    siteName,
    siteInaugurationDateFrom,
    siteInaugurationDateTo,
    tentativeDeadlineFrom,
    tentativeDeadlineTo,
  });
  console.log('query', query);
  return get({url: `constructionSite/getAllSite?${query}`});
};

export const getSiteSettings = ({siteId}: {siteId: string}) => {
  return get({url: `constructionSite/getSiteSettings?siteId=${siteId}`});
};

export const updateSiteSettings = ({
  siteId,
  body,
}: {
  body: any;
  siteId: string;
}) => {
  return post({
    url: `constructionSite/editSiteSettings?siteId=${siteId}`,
    body,
  });
};

export const addWorkCategory = (body: any) => {
  return post({url: 'constructionSite/addWorkCategory', body});
};

export const getAllWorkCategory = () => {
  return get({url: 'constructionSite/getAllCategories'});
};

export const editWorkCategory = ({
  workId,
  body,
}: {
  workId: string;
  body: any;
}) => {
  return post({
    url: `constructionSite/editWorkCategory?workId=${workId}`,
    body,
  });
};
