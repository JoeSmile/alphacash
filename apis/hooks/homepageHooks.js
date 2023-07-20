import { getUserQuota } from '../mine';
import { mutationFactory } from './base';

export function useGetUserQuota() {
  return mutationFactory(getUserQuota);
}

