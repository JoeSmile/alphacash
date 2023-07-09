import { login } from '../mine';
import { useSystemStore } from '../../store/useSystemStore';
import { mutationFactory } from './base';

export function useLogin ({onSuccess}) {
  const mutations = mutationFactory(login, {
    afterSuccess: (res => {
      if (res.data.error_code === 1) {
        useSystemStore.getState().setToken(res.data.token);
        onSuccess && onSuccess()
      }
    }),
    needToken: false
  });

  return mutations
}