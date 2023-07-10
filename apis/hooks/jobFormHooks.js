import { getWorkInfoOptions, getWorkInfoDetail, updateWorkInfo, getUserFormStatus } from '../mine';
import { mutationFactory } from './base';

// job form
export function useWorkInfoOptions () {
  return mutationFactory(getWorkInfoOptions);
}

export function useGetWorkInfoDetail () {
  return mutationFactory(getWorkInfoDetail);
}

export function useUpdateWorkInfo () {
  return mutationFactory(updateWorkInfo);
}


export function useGetUserFormStatus () {
  return mutationFactory(getUserFormStatus);
}
