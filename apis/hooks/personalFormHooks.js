import { getPersonalInfoDetail, updatePersonalInfo, getPersonalOptions } from '../mine';
import { mutationFactory } from './base';

// personal form
export function useGetPersonalDetail () {
  return mutationFactory(getPersonalInfoDetail);
}

export function useUpdatePersonalInfo () {
  return mutationFactory(updatePersonalInfo);
}
export function useGetPersonalOptions () {
  return mutationFactory(getPersonalOptions);
}