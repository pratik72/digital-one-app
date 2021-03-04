import { IDropdownObject } from "./site.types";

export interface IMaterial {
  metId? : String;
  siteId : String;
  siteName?: String;
  supervisorName : String;
  supervisorId : String;
  materialType : String;
  materialUnit : String;
  materialTotalQuantity : String;
  pricePerUnit : String;
  invoicePrice : String;
  invoiceNo : String,
  date : Date;
  siteObject?: IDropdownObject;
  remarks : String;
  supplier : String;
  _id? : String;
}