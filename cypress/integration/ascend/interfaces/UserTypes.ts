export interface UserListResponse {
  count: number;
  data: User[];
}

export interface User {
  matchid: number;
  userid: string;
  email?: string;
  firstname: string;
  lastname: string;
  title?: string;
  phonenumber?: number;
  totpurl: string;
  profileJson?: string;
  state: number;
  date_created: string;
  last_loggedin?: string;
  country?: unknown;
  countrycode?: number;
  roleid: number;
  roleName: string;
  scopes?: unknown;
  roletype: string;
  statusid: number;
  status: string;
  invitemail: boolean;
  salesforceid?: unknown;
  name?: string;
}

export interface TableVaildationData {
  [key: string]: {
    searchTerm: string;
    column: string;
  };
}

export enum UserElementLabels {
  Email = 'Email',
  AddUserCloseButton = 'Modal X',
  AddUserContinueCta = 'Continue button',
  AddUserModalButton = 'Add User',
  FirstName = 'First Name',
  LastName = 'Last Name',
  Title = 'Title',
  BackButton = 'Back',
  UserSuccesfullyAdded = 'User Succesfully Added',
  UserFilter = 'User filter',
  EmailFilter = 'Email filter',
  TitleFilter = 'Title filter',
  StatusFilter = 'Status filter',
  CreatedFilter = 'Created filter',
  LastLoginFilter = 'Last Login filter',
  Actions = 'Actions',
  UserSearch = 'User Search',
  EmailSearch = 'Email Search',
  TitleSearch = 'Title Search',
  StatusSearch  = 'Status Search',
  CreatedSearch = 'Created Search',
  LastLoginSearch = 'Last Login Search',
  AddUserCTA = 'Add User CTA',
  EditAction = 'Edit Action',
  RestoreAction = 'Restore Action',
  Users = 'Users',
  Edit = 'Edit',
  Recover = 'Recover',
  Delete = 'Delete',
}

export enum UserButtons {
  AddUser = 'Add User',
  Continue = 'Continue',
  AddUserModal = 'Add User Modal',
}