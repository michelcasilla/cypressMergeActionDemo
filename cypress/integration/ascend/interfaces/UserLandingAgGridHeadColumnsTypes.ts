import * as Moment from 'moment';
import { AgGridColumn } from '../../../helpers/agGrid';

export enum UserLandingAgGridHeadColumnsTypes {
    User = 'User',
    Email = 'Email',
    Role = 'Role',
    Title = 'Title',
    Status = 'Status',
    Created = 'Created',
    LastLogin = 'Last Login',
}

export const UserLandingAgGridHeadColumns: {[key in UserLandingAgGridHeadColumnsTypes]: AgGridColumn} = {
    [UserLandingAgGridHeadColumnsTypes.User]: {
        id: 'name',
        comparator: (valueA: string, valueB: string): number => {
            if (valueA?.toLowerCase() === valueB?.toLowerCase()) return 0;
            return (valueA?.toLowerCase() > valueB?.toLowerCase()) ? 1 : -1;
        },
    },
    [UserLandingAgGridHeadColumnsTypes.Email]: {
        id: 'email',
    },
    [UserLandingAgGridHeadColumnsTypes.Role]: {
        id: 'role'
    },
    [UserLandingAgGridHeadColumnsTypes.Title]: {
        id: 'title',
        valueParser: (cell: Element): string => {
            return cell.textContent.trim().toLowerCase();
        },
        comparator: (valueA: string, valueB: string): number => {
            if (valueA?.toLowerCase() === valueB?.toLowerCase()) return 0;
            return (valueA?.toLowerCase() > valueB?.toLowerCase()) ? 1 : -1;
        },
    },
    [UserLandingAgGridHeadColumnsTypes.Status]: {
        id: 'status'
    },
    [UserLandingAgGridHeadColumnsTypes.Created]: {
        id: 'dateCreated',
        valueParser: (cell: Element): number => {
            const dateString = cell.textContent.trim().split(' ')[0];
            return Moment.default(dateString, "MM/DD/YY").valueOf();
        }
    },
    [UserLandingAgGridHeadColumnsTypes.LastLogin]: {
        id: 'lastLoggedIn',
        valueParser: (cell: Element): number => {
            const dateString = cell.textContent.trim().split(' ')[0];
            if (dateString) {
                return Moment.default(dateString, "MM/DD/YY").valueOf();
            }
            return -1;
        }
    },
}
