import { IMaterial } from "../typings";
import { get, post } from "../utils/axios.util";

export const addNewMaterial = (materialParam: IMaterial) => {
    return post({ url: 'constructionSite/addMaterialToInventory', body: materialParam })
};

export const editMaterial = (materialParam: IMaterial) => {
    return post({ url: 'constructionSite/editSiteInventory', body: materialParam })
};

export const getAllMaterial = () => {
    return get({ url: 'constructionSite/getSiteInventory'})
};

