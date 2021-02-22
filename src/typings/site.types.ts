export interface SiteAddressType {
  AddressLine1: string;
  City: string;
  State: string;
  pincode: number;
}

export interface SupervisorType {
  siteSupervisorId : string;
  siteSupervisorName : string;
  siteSupervisorNo : number;
}


export interface SiteType {
  siteName: string;
  siteId?: string;
  ownerName: string;
  ownerContactNo: string;
  siteAddress: SiteAddressType;
  siteInaugurationDate: Date;
  siteEstimate: string;
  tentativeDeadline: Date;
}


export interface ISiteRules {
  siteId : string;
  supervisors : Array<{
    supervisorId : string;
    supervisorName : string;
  }>;
  userExpense : Array<{
    expenseUserId : string;
    expenseUserName : string;
  }>;
  adminUsers : Array<{
    adminUserId : string;
    adminUserName : string;
  }>;
  workCategories: Array<{
    workId : string;
    WorkTypes : string;
  }>
}

export interface IDropdownObject {
  value: string;
  label: string;
  id: string;
  isFixed?: boolean;
}