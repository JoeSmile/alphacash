import { getIdentityInfoDetail, updateIdentityInfo, updateUserImages } from '../mine';
import { mutationFactory } from './base';

export function useGetIdentityInfoDetail() {
  return mutationFactory(getIdentityInfoDetail);
}

export function useUpdateIdentityInfo() {
  return mutationFactory(updateIdentityInfo);
}
export function useUpdateUserImages() {
  return mutationFactory(updateUserImages);
}