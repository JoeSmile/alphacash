import { getProvinceList, getCityList } from '../mine';
import { mutationFactory } from './base';

export function useGetProvinceList () {
  return mutationFactory(getProvinceList);
}

export function useGetCityList () {
  return mutationFactory(getCityList);
}
