import {
  useMutation,
} from 'react-query';
import { login } from '../login';
import { useEffect } from 'react';
import { useSystemStore } from '../../store/useSystemStore';

function mutationFactory (func, {afterSuccess}) {
  return useMutation({
    mutationFn: (parameters) => {
      return func(parameters)
    },
    onSuccess: (res) => {
      if (afterSuccess) {
        afterSuccess(res);
      }
    }
  }) 
}

export function useLogin () {
  const mutations = mutationFactory(login, {
    afterSuccess: (res => {
      if (res.error_code === 1) {
        useSystemStore.getState().setToken(res.data.token);
      }
    })
  });

  return mutations
}