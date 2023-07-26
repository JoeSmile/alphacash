import { useMutation } from "react-query";
import { useSystemStore } from "@store/useSystemStore";
import { Toast } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";

export function mutationFactory(func, options = {}) {
  const store = useSystemStore();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: (parameters) => {
      if (options.needToken === false) {
        return func({
          app: store.app,
          sign: store.sign,
          ...parameters,
        });
      }
      return func({
        token: store.token,
        app: store.app,
        sign: store.sign,
        ...parameters,
      });
    },
    onSuccess: (res) => {
      //console.log("res----", res);
      if (!res.data) {
        Toast.info({
          content: res.message,
          duration: 3,
        });
        return;
      }

      // 后台返回业务错误
      if (res?.data?.error_code !== 1) {
        Toast.info({
          content: res.data.msg,
          duration: 3,
        });

        switch(res.data.error_code) {
          case 5:
            navigation.push('Login');
            break;
            
          case 666:
            //刷新
            navigation.replace("Apply");
            break;
          default:
            break;
        };
      
      } else if (options && options.afterSuccess) {
        options.afterSuccess(res);
      }
    },
  });
}
