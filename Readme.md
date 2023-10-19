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
   npm run web/android
```

3. 打本地 debug 包（可以开启调试模式）

```
   npm run build:local
```

打包产物在跟目录下，可以直接拖到模拟器安装，或通过工具安装到真机。开发时，建议这么打包，远程打包要排队耗时很长。

4. 打远程 preiew 包

```
   npm run build:preview
```

打包产物在 expo 平台上。可以通过<https://expo.dev/accounts/sunhao/projects/financeexpo/builds>查看和安装。给 QA 测试用。

5. 打 preiew 热更包

```
   npm run update:preview
```

打包产物在 expo 平台上。可以通过<https://expo.dev/accounts/sunhao/projects/financeexpo/updates>查看，不需要安装，启动几次 APP 就能完成热更新。如要区分，可以更改 package.json 中该命令的 message

6. 打 live 包及其热更包（aab 格式，上传到 app 商城的）

```
   npm run build/update:live
```

7. 关于自动更新

参考：<https://docs.expo.dev/eas-update/getting-started>

8. 注意事项：

1、extra.eas.projectId 和 updates.url 后半部分的 id 必须一致

2、必须使用形如 0.0.1 的 runtimeVersion，不要使用{"policy": "nativeVersion"}

3、eas.json 中的每个 key，就是一个 profile，运行 eas build 命令时必须对应，找不到时默认是打 live 包

4、要自动更新，必须配置 profile 中的 channel

5、先要有 build 版本，然后再有 update，eas update --branch [[branch-name]]，branch-name 必须与 channel 一致

6、build 和 upate 的 runtimeVersion 必须保持一致。不同版本可以用不同 version

7、项目中用到了两个包，expo-applist，fork-expo-image-picker，目前只支持支持 Android。
