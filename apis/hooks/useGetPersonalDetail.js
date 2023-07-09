import { getPersonalInfoDetail } from '../mine';
import { mutationFactory } from './base';

export function useGetPersonalDetail () {
  
  return mutationFactory(getPersonalInfoDetail);
}