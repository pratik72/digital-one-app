import { get, getQueryBasedOnParam, post } from "../utils/axios.util";
import {IWorkReportTypes} from "../typings"

export const addNewWorkReport = (siteParam: IWorkReportTypes) => {
    return post({ url: 'constructionSite/addWorkDetails', body: siteParam })
};

export const editWorkReport = (siteParam: IWorkReportTypes) => {
    return post({ url: 'constructionSite/editWorkDetails', body: siteParam })
};

export const getAllWorkReport = ({ page, siteId }: { page?:number, siteId:string }) => {
    const query = getQueryBasedOnParam({ page, siteId });
    return get({ url: `constructionSite/getWorkDetail?${query}`})
};
