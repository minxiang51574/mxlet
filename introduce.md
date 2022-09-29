## 1、monorepo
Monorepo是一种项目管理方式，就是把多个项目放在一个仓库里面。
一般 Monorepo 的目录如下所示，在 packages 存放多个子项目，并且每个子项目都有自己的**package.json**
```js
├── packages
|   ├── pkg1
|   |   ├── package.json
|   ├── pkg2
|   |   ├── package.json
├── package.json

```
### MultiRepo的痛点
要想知道 Monorepo 的优势，首先得弄清楚之前的开发方式有什么痛点。

传统的方式MultiRepo当中，每个项目都对应单独的一个代码仓库，是真真切切地感受到了这种方式带来的诸多弊端。
- 1.代码复用
   维护多个项目时，一些基础的组件、工具函数，或者一些配置，出现bug、或者需要调整的时候，就得修改多份，维护成本越来越高
- 2.版本管理
  当某一个工具包版本是 v1.0.0，有诸多项目都依赖于这个工具包，但在某个时刻，这个工具包发了一个 **change** 版本，和原来版本的 API 完全不兼容。而事实上有些项目并没有升级这个依赖，导致一些莫名的报错
- 3.项目基建
    由于在 MultiRepo 当中，各个项目的工作流是割裂的，因此每个项目需要单独配置开发环境、配置 CI 流程、配置部署发布流程等等，甚至每个项目都有自己单独的一套脚手架工具。
    其实，很容易发现这些项目里的很多基建的逻辑都是重复的，如果是 10 个项目，就需要维护 10 份基建的流程，逻辑重复不说，各个项目间存在构建、部署和发布的规范不能统一的情况，这样维护起来就更加麻烦了

### 优点
- 依赖管理：共享依赖，所有的代码都在一个仓库。版本管理非常方便；

- 基建成本降低：所有项目复用一套标准的工具、组件和规范，代码质量和统一风格更容易；有新的项目接入，也可以直接复用已有的基建流程，比如 CI 流程、构建和发布流程

- 团队协作更容易：所有人都能看到全部代码，能够方便地共享和复用代码，跨团队协作和贡献更容易；


## 2、pnpm
![image](./pnpm.png)
pnpm 本质上就是一个包管理器，这一点跟 npm/yarn 没有区别。杀手锏在于：
- 包安装速度极快；
- 磁盘空间利用非常高效

### 特点
- 1. 速度快
- 2. 高效利用磁盘空间
  - 不会重复安装同一个包。用 npm/yarn 的时候，如果 100 个项目都依赖 lodash，那么 lodash 很可能就被安装了 100 次，磁盘中就有 100 个地方写入了这部分代码。但在使用 pnpm 只会安装一次，磁盘中只有一个地方写入，后面再次使用都会直接使用 **hardlink 硬链接**
  - 即使一个包的不同版本，pnpm 也会极大程度地复用之前版本的代码。举个例子，比如 lodash 有 100 个文件，更新版本之后多了一个文件，那么磁盘当中并不会重新写入 101 个文件，而是保留原来的 100 个文件的 **hardlink**，仅仅写入那一个**新增的文件**
- 3. 支持 monorepo
- 4. 安全性高
  - 之前在使用 npm/yarn 的时候，由于 node_module 的扁平结构，如果 A 依赖 B， B 依赖 C，那么 A 当中是可以直接使用 C 的，但问题是 A 当中并没有声明 C 这个依赖。因此会出现这种非法访问的情况。但 pnpm 脑洞特别大，自创了一套依赖管理方式，很好地解决了这个问题，保证了安全性

## 创建项目

- 1.安装
```js
 npm i pnpm -g
```

- 2.初始化package
```js
 pnpm init
```
- 3.创建 .npmrc 文件
  根据需要添加配置

- 4.创建pnpm-workspace.yaml文件，工作空间的根目录
```js
  packages:
  - 'packages/**'
```
- 5.添加项目配置等
```js
eslintignore、gitignore、eslint、stylelint、prettier、husky、lint-staged、commitlint
```


### 3、目录结构
├── packages/
|   ├── kmlet-shared/      // 公共方法
|   ├── kmlet-ui/          // 核心UI库
|   ├── kmlet-example/         // UI库测试项目

### 4、测试项目

### 5、组件文档


### 6、问题
iconfont 如何引入？  在k-icon组件中全局引入
为什么那些开源组件的字体都用px?
打包发布？
pnpm workspace引入问题？


### 7、changesets TODO

管理包的version和生成changelog

### 8、版本
alpha版：内部测试版。α是希腊字母的第一个，表示最早的版本，一般用户不要下载这个版本，这个版本包含很多BUG，功能也不全，主要是给开发人员和 测试人员测试和找BUG用的。

beta版：公开测试版。β是希腊字母的第二个，顾名思义，这个版本比alpha版发布得晚一些，主要是给“部落”用户和忠实用户测试用的，该版本任然存 在很多BUG，但是相对alpha版要稳定一些。这个阶段版本的软件还会不断增加新功能。如果你是发烧友，可以下载这个版本。

rc版：全写：Release Candidate（候选版本），该版本又较beta版更进一步了，该版本功能不再增加，和最终发布版功能一样。这个版本有点像最终发行版之前的一个类似 预览版，这个的发布就标明离最终发行版不远了。作为普通用户，如果你很急着用这个软件的话，也可以下载这个版本。

stable版：稳定版。在开源软件中，都有stable版，这个就是开源软件的最终发行版，用户可以放心大胆的用了。

### 9、问题
 1.在使用pnpm install 安装依赖 

ERR_PNPM_NO_MATCHING_VERSION_INSIDE_WORKSPACE  In : No matching version found for @kmlet/shared@0.0.2 inside the workspace

解决:在包发布时使用了npm publish 导致workspace配置失效，改成pnpm publish即可解决

### 10、打包格式
 es、cjs、umd、iife 格式的包
- cjs (CommonJS) — 只能在 NodeJS 上运行，使用 require("module") 读取并加载模块。
- amd (Asynchronous Module Definition，异步模块化定义) — 与 RequireJS 等模块加载工具一起使用。
- umd 同时兼容 CJS 和 AMD，并且支持直接在前端用 <script src="lib.umd.js"></script> 的方式加载。现在还在广泛使用，不过可以想象 ESM 和 IIFE 逐渐代替它
- es — ECMAScript Module，现在使用的模块方案，使用 import export 来管理依赖 ,将 bundle 保存为 ES 模块文件。适用于其他打包工具，在现代浏览器中用 `<script type=module>` 标签引入,package.json 添加 "type": "module" 来使用。


### 11、Git提交规范

   规范
  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

### 12、npm version
版本号基本是由三位数字组成：
   1   .   0   .   0
[MAJOR].[MINOR].[PATCH]

| 选项	|描述 |	例子	|说明
|major	|重大更新版本	|npm version major	|0.2.0 =》1.0.0
|minor	|主要更新版本	|npm version minor	|0.2.0 =》0.3.0
|patch	|补丁更新版本	|npm version patch	|0.2.0 =》0.2.1

1、更新至新的补丁版本
$ npm version patch

2、自定义git的提交内容
npm version major -m "版本更新至%s"

3、不进行git操作
npm version patch --no-git-tag-version