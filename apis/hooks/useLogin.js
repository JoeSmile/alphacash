import { login } from '../mine';
import { mutationFactory } from './base';

export function useLogin () {
  const mutations = mutationFactory(login, {
    needToken: false
  });

  return mutations
}