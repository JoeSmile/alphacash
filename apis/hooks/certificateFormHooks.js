import { getIdentityInfoDetail, updateIdentityInfo, updateUserImages } from '../mine';
import { mutationFactory } from './base';

export function useGetIdentityInfoDetail() {
  return mutationFactory(getIdentityInfoDetail);
}


export function useUpdateIdentityInfo() {
  return mutationFactory(updateIdentityInfo);
}

// bill 有错
export function useUpdateBillUserImages() {
  return mutationFactory(updateUserImages);
}