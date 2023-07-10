import {
  useMutation,
} from 'react-query';
import { useSystemStore } from '@store/useSystemStore'
export function mutationFactory (func, options={}) {
  const store = useSystemStore()

  return useMutation({
    mutationFn: (parameters) => {
      if (options.needToken === false) {
        return func({
          app: store.app,
          sign: store.sign,
          ...parameters
        })
      }
      return func({
        token:  store.token,
        app: store.app,
        sign: store.sign,
        ...parameters
      })
    },
    onSuccess: (res) => {
      if (options && options.afterSuccess) {
        options.afterSuccess(res);
      }
    }
  }) 
}
