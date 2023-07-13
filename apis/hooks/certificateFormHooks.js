import { getIdentityInfoDetail, updateIdentityInfo } from '../mine';
import { mutationFactory } from './base';

export function useGetIdentityInfoDetail() {
  return mutationFactory(getIdentityInfoDetail);
}

export function useUpdateIdentityInfo() {
  return mutationFactory(updateIdentityInfo);
}