export interface LoginTypes {
  email: string;
  password: string;
}

export interface OrganizationTypes{
  orgId: string;
  orgName: string;
}


export interface SignUpTypes {
  firstName: string;
  lastName: string;
  email: string;
  contactNo: number;
  password: string;
  organization: OrganizationTypes;
}

export interface UserTypes extends Omit<SignUpTypes, 'password'>{
  user_id: string;
  _id: string;
  __v: number;
}


export interface RootState{
  user: UserTypes
}