import { login, getOTP } from '../mine';
import { mutationFactory } from './base';

export function useLogin () {
  const mutations = mutationFactory(login, {
    needToken: false
  });

  return mutations
}
export function useGetOTP () {
  const mutations = mutationFactory(getOTP, {
    needToken: false
  });

  return mutations
}