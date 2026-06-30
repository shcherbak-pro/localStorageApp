export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  age: number;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'Admin' | 'Developer' | 'QA' | 'Designer' | 'Student';

export interface UserDraft {
  name: string;
  email: string;
  role: UserRole;
  age: number;
  city: string;
}

export interface UserSearchCriteria {
  query: string;
  role: UserRole | 'All';
  minAge: number | null;
  maxAge: number | null;
  sortBy: UserSortOption;
}

export type UserSortOption = 'createdDesc' | 'createdAsc' | 'nameAsc' | 'ageAsc' | 'ageDesc';

export const USER_ROLES: readonly UserRole[] = ['Admin', 'Developer', 'QA', 'Designer', 'Student'];

export const DEFAULT_USER_SEARCH_CRITERIA: UserSearchCriteria = {
  query: '',
  role: 'All',
  minAge: null,
  maxAge: null,
  sortBy: 'createdDesc',
};
