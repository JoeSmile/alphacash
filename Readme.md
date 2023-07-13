# expo doc

## build and update Android app doc

<https://docs.expo.dev/eas-update/getting-started/>

## navigation doc

<https://reactnavigation.org/docs/getting-started>

1. 安装依赖， 使用 npm (官网推荐)

```
    npm install
```

2. 启动开发环境

```
   npm run web
```

3. 关于自动更新

参考：<https://docs.expo.dev/eas-update/getting-started>
有几个易错的地方：
1、extra.eas.projectId 和 updates.url 后半部分的 id 必须一致
2、必须使用形如 0.0.1 的 runtimeVersion，不要使用{"policy": "nativeVersion"}
3、eas.json 中的每个 key，就是一个 profile，运行 eas build 命令时必须对应，找不到时默认是打 live 包
4、要自动更新，必须配置 profile 中的 channel
5、先要有 build 版本，然后再有 update，eas update --branch [[branch-name]]，branch-name 必须与 channel 一致
6、build 和 upate 的 runtimeVersion 必须保持一致。不同版本可以用不同 version
