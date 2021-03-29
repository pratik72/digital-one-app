import { IMaterial } from "../typings";
import { get, getQueryBasedOnParam, post } from "../utils/axios.util";

export const addNewMaterial = (materialParam: IMaterial) => {
    return post({ url: 'constructionSite/addMaterialToInventory', body: materialParam })
};

export const editMaterial = (materialParam: IMaterial) => {
    return post({ url: 'constructionSite/editSiteInventory', body: materialParam })
};

export const getAllMaterial = ({ page, siteId }: { page?:number, siteId:string }) => {
    const query = getQueryBasedOnParam({ page, siteId });
    return get({ url: `constructionSite/getSiteInventory?${query}`})
};

