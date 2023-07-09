import { getPersonalInfoDetail, updatePersonalInfo, getPersonalOptions } from '../mine';
import { mutationFactory } from './base';

export function useGetPersonalDetail () {
  return mutationFactory(getPersonalInfoDetail);
}

export function useUpdatePersonalInfo () {
  return mutationFactory(updatePersonalInfo);
}
export function useGetPersonalOptions () {
  return mutationFactory(getPersonalOptions);
}