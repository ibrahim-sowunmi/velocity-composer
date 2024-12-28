(Files content cropped to 300k characters, download full ingest to see more)
================================================
File: /README.md
================================================
# Puck

The visual editor for React.

<p align="left">
  <a aria-label="Measured logo" href="https://measured.co">
    <img src="https://img.shields.io/badge/MADE%20BY%20Measured-000000.svg?style=for-the-badge&labelColor=000">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@measured/puck">
    <img alt="" src="https://img.shields.io/npm/v/@measured/puck.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/measuredco/puck/blob/main/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/@measured/puck.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Join the community on Discord" href="https://discord.gg/D9e4E3MQVZ">
    <img alt="" src="https://img.shields.io/badge/Join%20the%20Discord-blueviolet.svg?style=for-the-badge&logo=Discord&labelColor=000000&logoWidth=20">
  </a>
 <a aria-label="Browse the awesome-puck community repo" href="https://github.com/measuredco/awesome-puck">
    <img alt="" src="https://img.shields.io/badge/repo-awesome--puck-fc60a8.svg?style=for-the-badge&labelColor=000000&logoWidth=20">
  </a>
</p>

## Demo

Visit https://demo.puckeditor.com/edit to try the demo.

## Documentation

Visit https://puckeditor.com to view the full documentation.

## Quick start

Install the package:

```sh
npm i @measured/puck --save # or npx create-puck-app my-app
```

Render the editor:

```jsx
// Editor.jsx
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";

// Create Puck component config
const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }) => {
        return <h1>{children}</h1>;
      },
    },
  },
};

// Describe the initial data
const initialData = {};

// Save the data to your database
const save = (data) => {};

// Render Puck editor
export function Editor() {
  return <Puck config={config} data={initialData} onPublish={save} />;
}
```

Render the page:

```jsx
// Page.jsx
import { Render } from "@measured/puck";
import "@measured/puck/puck.css";

export function Page() {
  return <Render config={config} data={data} />;
}
```

## Recipes

Use `create-puck-app` to quickly spin up a a pre-configured app based on our provided [recipes](https://github.com/measuredco/puck/tree/main/recipes):

```sh
npx create-puck-app my-app
```

Available recipes include:

- [**next**](https://github.com/measuredco/puck/tree/main/recipes/next): Next.js 13 app example, using App Router and static page generation
- [**remix**](https://github.com/measuredco/puck/tree/main/recipes/remix): Remix Run v2 app example, using dynamic routes at root-level

## Community

- [Discord server](https://discord.gg/D9e4E3MQVZ) for discussions
- [awesome-puck](https://github.com/measuredco/awesome-puck) community repo for plugins, custom fields & more

## Hire the Puck team

Puck is developed and maintained by **Measured**, a small group of industry veterans with decades of experience helping companies solve hard UI problems. We offer consultancy and development services for scale-ups, SMEs and enterprises.

If you need support integrating Puck or creating a beautiful component library, please reach out via the [Measured](https://measured.co) website.

## License

MIT © [Measured Corporation Ltd](https://measured.co)


================================================
File: /.prettierignore
================================================
CHANGELOG.md


================================================
File: /.npmrc
================================================
auto-install-peers = true


================================================
File: /CHANGELOG.md
================================================
# CHANGELOG

<!--__CHANGELOG_ENTRY__-->

## [0.17.1](https://github.com/measuredco/puck/compare/v0.17.0...v0.17.1) (2024-12-18)


### Bug Fixes

* respect falsey booleans types in select/radio fields ([3406b01](https://github.com/measuredco/puck/commit/3406b01d5ce00e8f2b885a1f951b5c96aa7a7989))




## [0.17.0](https://github.com/measuredco/puck/compare/v0.16.2...v0.17.0) (2024-12-18)

### Features

* add duplicate action to array field ([229cbdd](https://github.com/measuredco/puck/commit/229cbddb7eed513c8ac9a2e36e3af3b53ff28d7e))
* add renderFooter API to external field ([ccec96e](https://github.com/measuredco/puck/commit/ccec96e5ddf831fcd89a2af335449ad4cff1ea81))
* allow react elements in external field mapRow ([2f781de](https://github.com/measuredco/puck/commit/2f781de0a910a193f0a4bae795725119476f8e94))
* enable resolveFields to access parent data ([196227b](https://github.com/measuredco/puck/commit/196227bdf33ee678ce47b68fc624804448008cc1))
* list React 19 as supported peer dependency ([85e8cc1](https://github.com/measuredco/puck/commit/85e8cc1a6fcd29d9dd04e5e53c6e7f9a85f99959))
* track focused field in app state ([91bc97a](https://github.com/measuredco/puck/commit/91bc97a760d1750d65dedbbffee962a6c6ee8d60))
* upgrade next recipe to v15.1 ([8ef51c5](https://github.com/measuredco/puck/commit/8ef51c54e386528fca69be1e54b8a3ce69651bd0))
* use React 19 in next recipe ([6b3d97f](https://github.com/measuredco/puck/commit/6b3d97f9f3d0cc2283178ba6f4bda3b23f1f718a))


### Bug Fixes

* always run field resolvers when item change ([159d819](https://github.com/measuredco/puck/commit/159d819e0263f4e91bff8a83adfa404601850aa5))
* always update fields when resolveData runs ([39dd619](https://github.com/measuredco/puck/commit/39dd61934c15a452c59f26b0c6721802df0c1889))
* ensure radio fields are functional inside arrays ([7736294](https://github.com/measuredco/puck/commit/7736294d201f432799c0854be14b35edbad156d8))
* prevent field name collision causing hook render mismatch ([b51954a](https://github.com/measuredco/puck/commit/b51954a19875e1f3c87e0cdc03c10173e9786820))
* prevent flicker when using resolveData with arrays ([1be9b88](https://github.com/measuredco/puck/commit/1be9b886325a1515434759011e9e3514c583bd2e))
* provide better error when usePuck used inappropriately ([9991c07](https://github.com/measuredco/puck/commit/9991c079b2b7d8f18ecb42efc3ebc32e5d679b88))
* remove leading zeros in Number field ([5ba9399](https://github.com/measuredco/puck/commit/5ba9399e6546919ae744d7a4986b59faa1cd7aef))
* respect original value type in radio and select fields ([00ccd1d](https://github.com/measuredco/puck/commit/00ccd1df6513d2420c87cd136577e1df1ac9a9a3) and [6e5864a](https://github.com/measuredco/puck/commit/6e5864a5df01a52fb4e6b23132d68d4496f1e64e))




## [0.16.2](https://github.com/measuredco/puck/compare/v0.16.1...v0.16.2) (2024-11-07)


### Bug Fixes

* always treat data as immutable, fixing Redux issues ([51154e9](https://github.com/measuredco/puck/commit/51154e92b9022311afa79d086f69b70b6b8beb77))
* don't crash if component definition missing ([525b506](https://github.com/measuredco/puck/commit/525b5065563675d03d89cf090ce1f7fdf8ff0486))
* don't crash when selecting component with no config ([cb90f5d](https://github.com/measuredco/puck/commit/cb90f5d9109b340407bc9828fcd9761183d83e68)), closes [#671](https://github.com/measuredco/puck/issues/671)
* export missing resolveAllData lib in RSC bundle ([2f5fb7b](https://github.com/measuredco/puck/commit/2f5fb7ba69b61b857ad14720b93ceab026571aa7))
* fix RTL styles in action bar overlay ([bf5c5a3](https://github.com/measuredco/puck/commit/bf5c5a33081599331049063c79c7859aea96d0da))
* remove internal AutoField and FieldLabel components from bundle ([5df1597](https://github.com/measuredco/puck/commit/5df1597feede2f0ff922ad13297fd3acaf942da2))
* remove unused label from AutoField type ([18b6f1a](https://github.com/measuredco/puck/commit/18b6f1acae0186245817f35d4a27e6fdf4153ea1))




## [0.16.1](https://github.com/measuredco/puck/compare/v0.16.0...v0.16.1) (2024-10-07)


### Bug Fixes

* don't delete array field on click in FieldLabel ([ed282b9](https://github.com/measuredco/puck/commit/ed282b98ebe8574258444ba91716d8da7e8117d1))
* don't overwrite user input when field recently changed ([6126040](https://github.com/measuredco/puck/commit/61260407c5c87cc8c5c4fe925835f2d0d2a6f9ff))
* don't show field loader if no resolver defined ([8c706cd](https://github.com/measuredco/puck/commit/8c706cda92474114faffc7ed77f4b4024f75bf68))
* hide ActionBar.Group border when empty ([4345165](https://github.com/measuredco/puck/commit/4345165ee71b9762e6bca9baaa53d0c53144d0c4))
* prevent item click before iframe load ([61e1653](https://github.com/measuredco/puck/commit/61e1653020b9e272133c70fa9494f1a81782531e))
* prevent flash of field loader when no data changed ([20d7309](https://github.com/measuredco/puck/commit/20d730924d2f235871bfec4f0467a6652a518704))
* respect readOnly styles in AutoField ([9ffe817](https://github.com/measuredco/puck/commit/9ffe8176c1c437524fd9f7b2912f1a5846fc5e55))




## [0.16.0](https://github.com/measuredco/puck/compare/v0.15.0...v0.16.0) (2024-09-16)


### Features

* add actionBar override for adding component controls ([48ec0d7](https://github.com/measuredco/puck/commit/48ec0d786c7c589efc8b97152a5e1a4c065c0312))
* add automatic RSC export, replacing /rsc bundle ([d21eba6](https://github.com/measuredco/puck/commit/d21eba6185da8efcbcb5458eaaa5be6c321b3d1a))
* add isDisabled prop to Drawer.Item ([cad95b8](https://github.com/measuredco/puck/commit/cad95b887c6b06a41a2bacf28792fd4dbc808d72))
* add generic type to usePuck hook ([01703a9](https://github.com/measuredco/puck/commit/01703a95093413a57af1314b1f31cc34f85c38e0))
* add iframe override for style injection ([7cac376](https://github.com/measuredco/puck/commit/7cac3764d1f9336776b97fa08cbd48bec95e6a10))
* add initialHistory prop to Puck ([54b5a87](https://github.com/measuredco/puck/commit/54b5a871570120a3d0d55e96738746ec375dee0d))
* add onAction API to track and react to state changes ([c7007ac](https://github.com/measuredco/puck/commit/c7007acab334ec2d08f95669d685edb8c3947bcc))
* add permissions API ([a43914d](https://github.com/measuredco/puck/commit/a43914dc36e70c5596c186d3c63b9497949365a9))
* add plugin for injecting Emotion cache ([f8a88b9](https://github.com/measuredco/puck/commit/f8a88b9c2447c76f2f7a00ce5705f8fae07be58c))
* add resolvePermissions API ([f0655f0](https://github.com/measuredco/puck/commit/f0655f08a96b853cf18d681025f40e8d30df3013))
* add waitForStyles option to iframe config ([bc81d9c](https://github.com/measuredco/puck/commit/bc81d9c7de671fea0bc155911ee11598a1b920c2))
* call resolveData when new item inserted ([3298831](https://github.com/measuredco/puck/commit/329883165c9e428b9f291add7b6009ba29680146))
* don't mandate fields for optional props ([5a219ef](https://github.com/measuredco/puck/commit/5a219eff0c2f4763ec1d9f48f45fe684e6482b8f))
* export ActionBar component for use in overrides ([04fd6c5](https://github.com/measuredco/puck/commit/04fd6c5c7a65fc3ec9a05da277865341efe229af))
* infer Data type from user config ([50045bb](https://github.com/measuredco/puck/commit/50045bbda2cf3b64e37e0e6bedcfce14f680cda1))
* make ID optional in History type (BREAKING CHANGE) ([d917229](https://github.com/measuredco/puck/commit/d917229ae4f553bb54a420e1c708c1a509431106))
* provide ES Module build ([ff9076b](https://github.com/measuredco/puck/commit/ff9076b9d24d030ad47619b6a359b1f120422d70))
* rename history.data to history.state (BREAKING CHANGE) ([b09244c](https://github.com/measuredco/puck/commit/b09244c864fd049ceeda2b7eb20ec6cab9f40054))
* show spinner if iframe load takes over 500ms ([cfecf54](https://github.com/measuredco/puck/commit/cfecf5499d06b8e90438dc151e5e915da06ccb87))
* streamline usePuck history API ([c8b2807](https://github.com/measuredco/puck/commit/c8b28075fde0081b8ac824eb256114c9b8836f9e))
* upgrade "next" recipe to typescript@5.5.4 ([60fe631](https://github.com/measuredco/puck/commit/60fe63113f8ad8bbce52d8457ee4372aa4b09509))


### Bug Fixes

* add favicon to next recipe to prevent Puck 404 ([2c52d27](https://github.com/measuredco/puck/commit/2c52d271c6c20e9368a59eb1f2a5df184cef72bc))
* add missing readOnly state to External fields ([bf1449d](https://github.com/measuredco/puck/commit/bf1449dd8b299a4f469986d94f8986b02b79a688))
* always record history on component insert ([88c5ab6](https://github.com/measuredco/puck/commit/88c5ab6b545ecbd045de3ee0d43801c48f50e8b0))
* don't cache /edit route in Next recipe ([94f16b2](https://github.com/measuredco/puck/commit/94f16b25efea86ff475683d3a21f5937e07b201c))
* don't submit buttons if Puck used in form ([f761e5f](https://github.com/measuredco/puck/commit/f761e5fed63fc698e3a9d6ba94607364ed46f31b))
* ensure demo types are satisfied with TypeScript@5 ([958dc25](https://github.com/measuredco/puck/commit/958dc255ac5d285f98b6b592df677883b74e2830))
* export missing Plugin type ([eb42734](https://github.com/measuredco/puck/commit/eb427343fd58752861cac850f59c1098cf473f50))
* fix crash if component in data is missing from config ([0daf478](https://github.com/measuredco/puck/commit/0daf478d9ad8b14d2844ff6ae2db9bd72970d680))
* improve resiliency of iframe CSS for some frameworks, like Mantine ([538cb05](https://github.com/measuredco/puck/commit/538cb05606126c338e97c047b97065463e618d36))
* make Config and Data types more robust ([6bcf555](https://github.com/measuredco/puck/commit/6bcf555da74d54d70f00f37878d35fa166bb7e4c))
* prevent infinite loop when using plugins with some frameworks ([3870871](https://github.com/measuredco/puck/commit/38708716f32d65a9131b87fe664ba96b32aead15))
* prevent Tailwind from clashing with viewport zoom select ([9151255](https://github.com/measuredco/puck/commit/91512553430b295c37c80a935f0db929bb37870c))
* remove body margin in remix recipe ([0898b26](https://github.com/measuredco/puck/commit/0898b26cd021680dfb77a439b04140ce2fb8cb2c))
* resize viewport when changed via app state ([14419ec](https://github.com/measuredco/puck/commit/14419ecf1c606e6fa0d6d9c5198401eb01bc72dd))
* resolve fields when switching between items of same type ([a3518ca](https://github.com/measuredco/puck/commit/a3518ca8560ba9fcdbe5086220490920ecf24fc0))
* return lastData as null instead of empty object in resolvers (BREAKING CHANGE) ([648eb92](https://github.com/measuredco/puck/commit/648eb92b3d2c5be8f5fc99a22db5eff64cefb155))
* show warning if heading-analyzer styles aren't loaded ([4e7110b](https://github.com/measuredco/puck/commit/4e7110b591a4a12e2b3c89eb1fa98faf5f9338d4))
* use correct color in FieldLabel labels ([b0469a1](https://github.com/measuredco/puck/commit/b0469a1134ac8eafc9a3b16de4d7805241127947))




## [0.15.0](https://github.com/measuredco/puck/compare/v0.14.2...v0.15.0) (2024-05-30)


### Bug Fixes

* align Drawer behaviour and docs with expectation ([e2cd445](https://github.com/measuredco/puck/commit/e2cd445f9d3abccca5b3daf95a4d92774a1dd47a))
* animate loader in iframe ([151a267](https://github.com/measuredco/puck/commit/151a2675bf8e700368aad0652192bc7d9fd2bbd6))
* don't inline link stylesheets for more predictable behaviour ([c0a331d](https://github.com/measuredco/puck/commit/c0a331de31c2d59e0e21ef342eb4c821850e10be))
* don't overflow external inputs inside arrays/objects ([42ef582](https://github.com/measuredco/puck/commit/42ef582cac949f8a24f9cdad204baf24d808b410))
* don't throw warning when user is correctly specifying root props ([46aa8ff](https://github.com/measuredco/puck/commit/46aa8ff3a68dcbd4aec4ebfef246d400469ca4d4))
* don't unintentionally use read-only styles in external fields ([acaf727](https://github.com/measuredco/puck/commit/acaf72746c2c82881a753dab6350161c774cd13f))
* fix defaultProps for root ([9a1cc7c](https://github.com/measuredco/puck/commit/9a1cc7c925f0b8a79b5f523fc7c8a6d6afdc2067))
* infer correct value types in Custom fields ([5c8c0e1](https://github.com/measuredco/puck/commit/5c8c0e1bfa9ca4da04e1cfac83c7a3ab5883fc5c))
* position field loader relative to sidebar, not fields ([2e8936e](https://github.com/measuredco/puck/commit/2e8936e4f416b0a04b273250cf3848447fb7e045))
* show external field modal when using custom interfaces ([6e97a0e](https://github.com/measuredco/puck/commit/6e97a0e18aea72581ba466e8cf3f87e60f3a65f3))
* show field loader when using field overrides ([8ccfa4c](https://github.com/measuredco/puck/commit/8ccfa4c0c3477b8e1d2db2fcc7a352b353643095))
* still load iframe if styles fail to load ([3e56bc1](https://github.com/measuredco/puck/commit/3e56bc1816c40c555de2eb28148baf5dcdcacbea))


### Features

* add AutoField component for using Puck fields inside custom fields ([106028b](https://github.com/measuredco/puck/commit/106028b59bb1a02756645bb76ce400adc398430d))
* add isEditing flag to `puck` object prop ([13bb1bd](https://github.com/measuredco/puck/commit/13bb1bdf03a62000c07a7d49a56ad09c1433fda0))
* add resolveFields API for dynamic fields ([0a18bdb](https://github.com/measuredco/puck/commit/0a18bdb9387f302565f74fa30f09fd912ea0769b))
* allow data prop to accept an empty object ([aedd401](https://github.com/measuredco/puck/commit/aedd401dd415e9d7dc1cbd6e33e59f5264180374))
* bump next recipe to Next@14 ([47a27ed](https://github.com/measuredco/puck/commit/47a27ed2c6aee80d4093975c399d96b950cb6956))
* enable override of publish button (breaking change) ([480467a](https://github.com/measuredco/puck/commit/480467ae2e06ae4d36c4fd67f75757557058f561))
* expose previous data to resolveData via `lastData` param ([dd7051e](https://github.com/measuredco/puck/commit/dd7051e8fbb3770714100c92f7f5c69d0be5dab6))
* replace history chevrons with undo/redo icons ([91dff22](https://github.com/measuredco/puck/commit/91dff227c382ddd5ad183cd69cb4d2fabd56f093))




## [0.14.2](https://github.com/measuredco/puck/compare/v0.14.0...v0.14.2) (2024-04-17)


### Bug Fixes

* add DropZone iframe compatablity mode for bug in Safari 17.2, 17.3 and 17.4 ([47496c2](https://github.com/measuredco/puck/commit/47496c25407b1a5fdb88333e1fbf5416efc51c50))
* check for optionality to handle race condition when dragging ([4dbd487](https://github.com/measuredco/puck/commit/4dbd487f6055ea3d38ab7de54e29bd6e4ffe84ce))
* defer iframe event binding until contentWindow is ready ([268ea53](https://github.com/measuredco/puck/commit/268ea53f969a892843c026e5ba9ced15edb9f801))
* don't crash if component is missing after referenced in category ([dc93789](https://github.com/measuredco/puck/commit/dc93789c4311e386b022b5c3d7c8595c00a8a212))
* don't force height of DropZones in custom interfaces ([046c255](https://github.com/measuredco/puck/commit/046c2557b6baa62994380c547ad006759b02cc92))
* don't query iframe document if not ready ([2b2ef32](https://github.com/measuredco/puck/commit/2b2ef32555387d4656872674289740b73dcd406b))
* don't throw undefined error if rapidly zooming browser in some environments ([282a8b0](https://github.com/measuredco/puck/commit/282a8b0d9f170ea95f5717c8b2ad08ec487d7d8f))
* fix drag-and-drop when entire Puck component used inside an iframe ([23db292](https://github.com/measuredco/puck/commit/23db292b9a2caa8e65117c08706843d3ed343454))
* fix support for boolean values in select fields ([c4a66ad](https://github.com/measuredco/puck/commit/c4a66addacd9acdc1f042ac54831b7dac38f2757))
* make draggable outlines consistent ([9008b70](https://github.com/measuredco/puck/commit/9008b70ed63155140a5241914c86456a2d4c9388))
* prevent grid layout issues in generated apps ([5c05f94](https://github.com/measuredco/puck/commit/5c05f945679f7f2c0edd5d99c652989c00920ac6))
* reflect value changes made via resolveData in radio fields ([9a7066f](https://github.com/measuredco/puck/commit/9a7066f4e837575aecbde0de4dd2bc96328a2a15))
* remove peer dependencies causing warnings ([041ca64](https://github.com/measuredco/puck/commit/041ca64a6fe96539681d88e9cd0e66a6ac27a6ce))
* resolve security warning when additional iframes present ([03ab0bd](https://github.com/measuredco/puck/commit/03ab0bd3314a4d6dfc863bdcf5f23246331b959b))
* use 100% width for Puck preview when iframe disabled ([#414](https://github.com/measuredco/puck/issues/414)) ([64303c8](https://github.com/measuredco/puck/commit/64303c8510df15b6ca94bc7be0294d9746193b35))
* use more custom interface friendly styles for iframes ([e6e01c6](https://github.com/measuredco/puck/commit/e6e01c6ec5b2bee9ab3a4a9425276ad4f1840c20))


### Performance Improvements

* add API for disabling auto-scroll due to performance issues ([3e5599e](https://github.com/measuredco/puck/commit/3e5599e687643094f7c80d0ce99a7c6a0c947e28))
* batch load initial iframe styles ([e585f20](https://github.com/measuredco/puck/commit/e585f2090c0457d124006bd6349a69c9883d3c03))
* don't lock main thread when iframe styles changed ([e529e85](https://github.com/measuredco/puck/commit/e529e8525eb758025261577c424d8601c1ed8daf))
* reuse host window styles in iframes ([e7fe7e0](https://github.com/measuredco/puck/commit/e7fe7e0d7577bae1ab90650e5d7986d6745fbaf9))




## [0.14.1](https://github.com/measuredco/puck/compare/v0.14.0...v0.14.1) (2024-04-01)


### Bug Fixes

* don't throw undefined error if rapidly zooming browser in some environments ([282a8b0](https://github.com/measuredco/puck/commit/282a8b0d9f170ea95f5717c8b2ad08ec487d7d8f))
* prevent grid layout issues in generated apps ([5c05f94](https://github.com/measuredco/puck/commit/5c05f945679f7f2c0edd5d99c652989c00920ac6))
* remove peer dependencies causing warnings ([041ca64](https://github.com/measuredco/puck/commit/041ca64a6fe96539681d88e9cd0e66a6ac27a6ce))




## [0.14.0](https://github.com/measuredco/puck/compare/v0.13.0...v0.14.0) (2024-03-28)


### Features

* add "name" prop to componentItem override ([45bbceb](https://github.com/measuredco/puck/commit/45bbceb1d2805455fa38f5bce91d892f6acacfbf))
* add `min` and `max` APIs to array fields ([53b7937](https://github.com/measuredco/puck/commit/53b7937675303bc3cf282bbd005309c8c276d1b2))
* add API to opt-out of iframes ([03dd90b](https://github.com/measuredco/puck/commit/03dd90b98c8a72e2af3baa8fc436ff7d4f4c7449))
* add Contentful field package ([d944288](https://github.com/measuredco/puck/commit/d94428819a958b4f566e5d0e8cd29b3bf1107881))
* add filter fields to ExternalFields ([7a55053](https://github.com/measuredco/puck/commit/7a5505374953ab8004720a9c91d8975ad3df94e5))
* add iframe support ([1d0bf57](https://github.com/measuredco/puck/commit/1d0bf57894200edc6b9a883a41937f7a3141074f))
* add `min` and `max` APIs to number fields ([4932a6e](https://github.com/measuredco/puck/commit/4932a6ef1b640410b3291cc67fb1f3153c04eac4))
* add `selectedItem` convenience param to usePuck ([c1224d0](https://github.com/measuredco/puck/commit/c1224d026d37bbbcf1366804947771902e29d9bb))
* add viewport switching ([ccf9149](https://github.com/measuredco/puck/commit/ccf91495f3a9f20a37051ba407abd992095a7b4d))
* enable mapping of table rows in external fields ([d50c56e](https://github.com/measuredco/puck/commit/d50c56e829b482f13c5ec08acc76eed70494d3cf))
* expose history via usePuck hook ([1b907cb](https://github.com/measuredco/puck/commit/1b907cba506dda7a2b1fe201a426e1c4bcfffecc))
* hide array Add button when array is readOnly ([4e27c3f](https://github.com/measuredco/puck/commit/4e27c3f18a0fa9a97dcd5fd240b01a133d7cb153))
* improve touch, contrast & keyboard a11y ([f975d87](https://github.com/measuredco/puck/commit/f975d87c5c2823e1f27161e6b6aa76a0d3fafad2))
* refine UI for external field modal ([6a2afa1](https://github.com/measuredco/puck/commit/6a2afa1abbd33a062bca6962b547b5534ed93036))
* support custom component labels via the new label param ([712fb8e](https://github.com/measuredco/puck/commit/712fb8eeac0502b2baea4c86a4494eb8f924ed82))
* update to 12-tint color palette ([d43da58](https://github.com/measuredco/puck/commit/d43da581da3bd79324ed846ca5c5cd0c86469b23))
* use InterVariable font ([88532fb](https://github.com/measuredco/puck/commit/88532fbc248a3a171dc2e26906dcd68ba5979570))


### Bug Fixes

* avoid FOUC of side bars on mobile ([83be956](https://github.com/measuredco/puck/commit/83be95643e4dcb96e30d0e6a9dbfe03c60f83002))
* correctly infer objectFields type from props ([e8991cc](https://github.com/measuredco/puck/commit/e8991cc90d5fd899a3357f6d1f50b382d90aad23))
* don't attempt to resolve data if component missing from config ([cc7d391](https://github.com/measuredco/puck/commit/cc7d391503cce3cbdbad9b769b5fb0fca6610cb0))
* don't flash nested DropZones on first drag ([38c3dc4](https://github.com/measuredco/puck/commit/38c3dc418e047b7f1218c8c50cf3ba3f2e6b74d8))
* don't unexpectedly show DropZone background ([2001fa2](https://github.com/measuredco/puck/commit/2001fa2bb6e69451f68cd94a3f872a0f83ff2b4b))
* ensure font loads for ExternalFields ([e9bca75](https://github.com/measuredco/puck/commit/e9bca751926db8a88f4f6ad2bc135a10705987d9))
* ensure heading-analyzer updates when content changes ([d75df7a](https://github.com/measuredco/puck/commit/d75df7a5c8ab365a4ef0de6c81c707e706433383))
* ensure select and radio fields support read only arrays ([cbdf66d](https://github.com/measuredco/puck/commit/cbdf66d348acc3461f321956c80dbc87a896069e))
* fix array field when used on root ([95280e6](https://github.com/measuredco/puck/commit/95280e686409342d3be3d68ec2acb90f7cfc570e))
* fix renderDropZone method in editor ([2c738dd](https://github.com/measuredco/puck/commit/2c738dd3761596925caecfee2bfdcb2960a10b83))
* lower opacity of DropZone background to support dark backgrounds ([9a5c0b8](https://github.com/measuredco/puck/commit/9a5c0b8ec57e41eeda3592d9a45ab00907a7a313))
* make getItemSummary optional on ExternalFields, as expected ([26bc4ff](https://github.com/measuredco/puck/commit/26bc4ff320cc93bf4376edd190b3779774f2f87c))
* only import Puck CSS on editor pages ([22a4182](https://github.com/measuredco/puck/commit/22a41823559d36fd06842496d59788004b316797))
* prevent unexpected field behaviour when pressing "Enter" key ([bf4f527](https://github.com/measuredco/puck/commit/bf4f5277f5d5cbf7a7ccf473130055575a5e983a))
* use strict return type for resolveData ([777cd3c](https://github.com/measuredco/puck/commit/777cd3c02a0b0ec8df1b81e19654b1179b56cb53))
* vertically align field icons ([fa92436](https://github.com/measuredco/puck/commit/fa924363c8f2e5ad3d866793ba34a1b488250ce5))



## [0.13.1](https://github.com/measuredco/puck/compare/v0.13.0...v0.13.1) (2023-12-23)


### Bug Fixes

* don't render plugins twice when using React strict mode ([f70c722](https://github.com/measuredco/puck/commit/f70c7222dd844257fab791fb4d5f8cf90e3361df))
* replace crypto with uuid lib ([a84e06f](https://github.com/measuredco/puck/commit/a84e06feec977bca1ac7e08b6e55ba8afe0141dc))




## [0.13.0](https://github.com/measuredco/puck/compare/v0.12.0...v0.13.0) (2023-12-19)


### Features

* add "ui" prop to Puck to set the initial state ([71f8b2f](https://github.com/measuredco/puck/commit/71f8b2f1143b9774fd763a8f5a3685957474237b))
* add APIs to restrict components dropped in DropZones ([28f24f9](https://github.com/measuredco/puck/commit/28f24f927a2d1c378834f124e85abfcc2267a0d7))
* add data migration API ([f987324](https://github.com/measuredco/puck/commit/f987324804d59e55a3a5e6770389305d88f39194))
* add generic Config type to Puck and Render components ([1c4b97f](https://github.com/measuredco/puck/commit/1c4b97f0a8487785b5a677a2a1ba168b292e5ca4))
* add object field type ([243278b](https://github.com/measuredco/puck/commit/243278bb01e34de6123a47d902fcc58ea7678642))
* add Puck class to outer div ([0698a12](https://github.com/measuredco/puck/commit/0698a127e093cb2cf66fa35dafca80ebd4c73f89))
* add search to external fields ([fe3b439](https://github.com/measuredco/puck/commit/fe3b4394c7464eeab69e1af5a96bd525bd15872a))
* add transformProps lib to migrate component props ([1ec2a78](https://github.com/measuredco/puck/commit/1ec2a78968e10efc5666aaf994b6feea6c820449))
* add usePuck hook ([13f3ccb](https://github.com/measuredco/puck/commit/13f3ccbd314e5a82f5a509c713ad34d3d0614b34))
* introduce UI overrides API ([8a7c325](https://github.com/measuredco/puck/commit/8a7c3252d8aed2c160e390c1ba7c411d8b884b6f))
* make onPublish prop optional ([60f317f](https://github.com/measuredco/puck/commit/60f317f75bb1a18bd59819d1323c45266334138c))
* remove renderComponentList in favour of overrides API ([97f65e3](https://github.com/measuredco/puck/commit/97f65e3f0411abab66a72ea3c9ecd485cd941b4e))
* replace existing plugin API with plugin overrides ([46cca26](https://github.com/measuredco/puck/commit/46cca26c879a2ae53cf3e668f1dad37bb480bd84))
* support compositional Puck ([22f053f](https://github.com/measuredco/puck/commit/22f053fa6209735c27b172eb625ea25d9df4bb3d))
* track isDragging in app state ([841ae12](https://github.com/measuredco/puck/commit/841ae126d3f5e8a9e40c064b69d5ee675169e4cd))


### Bug Fixes

* don't crash when loading external data into array field items ([d13d00b](https://github.com/measuredco/puck/commit/d13d00b67a7106889a0fc3beae94fa9c2e5bfcc3))
* enable user to pass in config without casting ([ee211e2](https://github.com/measuredco/puck/commit/ee211e2a3ae6fbcb3d2b12316172e49f11fecd1e)), closes [#185](https://github.com/measuredco/puck/issues/185)
* fix broken nested array fields ([7a3949f](https://github.com/measuredco/puck/commit/7a3949f7f10b2323504b31bcae9a9aa5d46f4074))
* fix initial UI state on mobile ([3aa0057](https://github.com/measuredco/puck/commit/3aa005740b650879d95318a01ac9e2949ec5e9d8))
* prevent pollution of global styles into component overlay ([3fcf8e3](https://github.com/measuredco/puck/commit/3fcf8e3f9975a14d8bc355e025585c9f55f233b1))
* record history when a user selects an item ([3a649c9](https://github.com/measuredco/puck/commit/3a649c9922cc0a6c8c6c2b96f5fbe44bd3a6176a))
* remove packages triggering superficial security warning ([0f52b61](https://github.com/measuredco/puck/commit/0f52b610769550b3365ab91f856b264d02d005c2))
* respect label in radio fields ([fe550d7](https://github.com/measuredco/puck/commit/fe550d795eed20ce3a3004a2e7c8dfdbaca0b67d))
* set aria-label on all loaders ([9adca27](https://github.com/measuredco/puck/commit/9adca2774dae5e532134be76de9c79e0b4af751c))
* stop color pollution in external field modals ([2e1b5ef](https://github.com/measuredco/puck/commit/2e1b5ef330ebbddee8c44b5002be65c2361fda4f))
* use correct title path in recipes ([60244ba](https://github.com/measuredco/puck/commit/60244ba5637d889530ae646986b1890c6b89efea))
* watch puck.config.tsx in Remix recipe ([ecb276c](https://github.com/measuredco/puck/commit/ecb276c39fd3cf03d524b221b3f34b3a8df99823))




## [0.12.0](https://github.com/measuredco/puck/compare/v0.11.0...v0.12.0) (2023-11-23)


### Features

* support React server components via @measured/puck/rsc bundle ([90ac161](https://github.com/measuredco/puck/commit/90ac161513d0c8c84f6b2bb968f7e5400c732a0a))
* add remix recipe ([f882878](https://github.com/measuredco/puck/commit/f882878e081b44a2b0bd1f773114f3c35b8398b1))
* add explicit rsc and css exports ([0b6a527](https://github.com/measuredco/puck/commit/0b6a52792628225d392775ba6b3d549aab5be59b))
* improve responsive behaviour ([889b4c7](https://github.com/measuredco/puck/commit/889b4c7a91f1a9b95c9fd7d4b3cdb20b2ee4946b))
* add visibility toggle for right-hand sidebar ([3d6c5d4](https://github.com/measuredco/puck/commit/3d6c5d479f2237400e0dc7cab6d5ed5773058d3b))
* allow custom fields to set UI state during onChange ([388793c](https://github.com/measuredco/puck/commit/388793c9b0ac27b14a538b70357abd0dc4f26779))
* expose field "id" to custom fields ([849161e](https://github.com/measuredco/puck/commit/849161ef0e2e2e01f6a1b9f517ba4bcc66cf6bd1))
* improve IconButton accessibility ([4c71d39](https://github.com/measuredco/puck/commit/4c71d39d1138f0fc823ada04710d0057433475b7))
* add new monospaced font stack ([c484ea6](https://github.com/measuredco/puck/commit/c484ea6bae5e6283bf82860e9a84413e60720163))
* tweak Field input focus state ([8012afd](https://github.com/measuredco/puck/commit/8012afdd9be2e3bc96185b4f0208b3ebdef0ed21))


### Bug Fixes

* don't enable style pollution of input background color ([bb1a76b](https://github.com/measuredco/puck/commit/bb1a76b314f744b76197cb670c448abc7896a45e))
* don't reset array item labels when changing order ([57563e1](https://github.com/measuredco/puck/commit/57563e1da1826dbfa08a32fabb27153e4618ab40))
* ensure field icon and label are vertically aligned ([caa40e0](https://github.com/measuredco/puck/commit/caa40e0499570831e5779f9a6a031e38f054c3f8))
* ensure root render receives props from latest data API ([abb6ff1](https://github.com/measuredco/puck/commit/abb6ff1bd53d7f93ef0ac287290712943ca2c1ce))
* export missing PuckAction type ([f22f32d](https://github.com/measuredco/puck/commit/f22f32dc5569eaa9cea90f896cf4cdafc59940fe))
* fix rootResolver behaviour when using recommended root data API ([5c13de5](https://github.com/measuredco/puck/commit/5c13de58a335f2b4c81f2b424fee8b4a356fb563))
* migrate to @hello-pangea/dnd to fix defaultProps warning ([2c97362](https://github.com/measuredco/puck/commit/2c97362e15f5d2046dc216c6e5fc25f5199d0a37))
* prevent inconsistent default input font-size ([99f90b3](https://github.com/measuredco/puck/commit/99f90b3ba81bf286758685f7c2a457abaffeb2e1))
* show a default value when no placeholder set on external fields ([e30b5b6](https://github.com/measuredco/puck/commit/e30b5b69b6a9f6467db4b05c55ffdc5f1ecebcfb))
* stop `zones` getting wiped out if data prop updated ([0c4514f](https://github.com/measuredco/puck/commit/0c4514fcde24d0ba585fea0981d73e7a8188840f))
* stop style pollution into array field items ([03b89d5](https://github.com/measuredco/puck/commit/03b89d568ded7cae6eb34e0dcf45e60eb758b552))
* stretch external field table to width of modal ([f6d89f6](https://github.com/measuredco/puck/commit/f6d89f69f1a24f94479365b9d955a3ea60b17b8d))
* use correct root data API in next recipe example database ([b598144](https://github.com/measuredco/puck/commit/b5981446ee64a3b5451eb17b8d42263f42df179f))
* use Inter font in button type Buttons ([1973847](https://github.com/measuredco/puck/commit/19738473723c49ddb0d764864283bf597280c7c5))




## [0.11.3](https://github.com/measuredco/puck/compare/v0.11.2...v0.11.3) (2023-11-12)


### Bug Fixes

* ensure field debounce doesn't sporadically lock preview update ([487ab83](https://github.com/measuredco/puck/commit/487ab83e2ffa42ad93ab90c2eadea9486008de9b))
* stop generator crashing on Windows due to commits with single quotes ([ab9d43f](https://github.com/measuredco/puck/commit/ab9d43f08113ef1c3f6fa30f7f87ba881b74a1e1))




## [0.11.2](https://github.com/measuredco/puck/compare/v0.11.1...v0.11.2) (2023-11-11)


### Bug Fixes

* add missing database.json back to generated next recipe ([3c15255](https://github.com/measuredco/puck/commit/3c15255a8f7f5e77c047ce853382f92715045c8d))




## [0.11.1](https://github.com/measuredco/puck/compare/v0.11.0...v0.11.1) (2023-11-11)


### Bug Fixes

* include next recipe in generator ([5b833ef](https://github.com/measuredco/puck/commit/5b833efd0f87b21e57303256e89f1456254b82bf))




## [0.11.0](https://github.com/measuredco/puck/compare/v0.10.0...v0.11.0) (2023-11-03)


### Bug Fixes

* don't flicker root DropZone when dragging ([358435c](https://github.com/measuredco/puck/commit/358435c36a216e6749be73599ab631ffdd8069c8))
* ensure array fields can render if value is undefined ([47ab3c9](https://github.com/measuredco/puck/commit/47ab3c971e4aafec443e8b4d73e7c921dec38ac6))
* isolate external field modal from high z-indexes ([fdf97c7](https://github.com/measuredco/puck/commit/fdf97c7f6da6035447e9b7deec9019217875c4ef))
* make Field types required based on type ([daf36ac](https://github.com/measuredco/puck/commit/daf36ac8864dc1b0f324c3e08294f9d62568acf2))
* prevent global style pollution in external fields ([429731d](https://github.com/measuredco/puck/commit/429731dbb77de2d8ca1c4a88832c73294a9b141c))
* prevent long header titles from rendering over actions ([4613df4](https://github.com/measuredco/puck/commit/4613df47fdde9ac796419f02a2d9f649892b3d35))
* use correct heading component for external inputs ([462266d](https://github.com/measuredco/puck/commit/462266d069b04a3de09684af4b816e1d1dac46dc))


### Features

* add categories API for grouping components in side bar ([594cc76](https://github.com/measuredco/puck/commit/594cc76c763a7d2ce06cd78f34a4683c0fa89f8e))
* add read-only states to all field types ([746d896](https://github.com/measuredco/puck/commit/746d896996f01d086d557f2a2918f4e76e3f5b35))
* add icon to external fields ([a3a018b](https://github.com/measuredco/puck/commit/a3a018bb1876fd4b831676e8ff848052ec7ba527))
* add loading state to external field modal ([5b4fc92](https://github.com/measuredco/puck/commit/5b4fc92f96caf83148fa335321dad3a5f1a65789))
* add lock icon when field is read-only ([a051000](https://github.com/measuredco/puck/commit/a05100016fed1e368be333f2707087b152fb4c0e))
* add mapProp API to external fields ([86c4979](https://github.com/measuredco/puck/commit/86c49795ac1d198836242772ec01bd755ee699c8))
* add renderComponentList API ([ec985e3](https://github.com/measuredco/puck/commit/ec985e3d28a4915f8fb2816b9599060d20bbf621))
* add resolveData API for modifying props dynamically ([c1181ad](https://github.com/measuredco/puck/commit/c1181ad9b1de6cc036cfedebcc3e57334ef62196))
* deprecate adaptors in favour of new external field APIs ([7f13efc](https://github.com/measuredco/puck/commit/7f13efc769ddc77fc7931a8191796f017354e89a))
* deprecate magic adaptor _data behaviour in favour of resolveData API ([4ee31e7](https://github.com/measuredco/puck/commit/4ee31e7c0d93578976b2b655e0c56477571f8341))
* deprecate props under root in favour of `root.props` ([7593584](https://github.com/measuredco/puck/commit/759358446e01b4320e55156dbe849d264e4e7edf))
* make external field more consistent with other fields ([5bfbc5b](https://github.com/measuredco/puck/commit/5bfbc5bf71b0af72e97e24b5828ad7009836e51e))
* update next recipe to render to static ([a333857](https://github.com/measuredco/puck/commit/a33385783022179e12ef3f732cb4e2e387985030))


### Performance Improvements

* cache data between fetchList calls in external fields ([04b7322](https://github.com/measuredco/puck/commit/04b7322d5fa5a5506b853c3dcde7a0b47d5b21bc))
* improve render performance of fields ([d92de7f](https://github.com/measuredco/puck/commit/d92de7fe6eaf081deff139b010e4741d07ba6114))




## [0.10.0](https://github.com/measuredco/puck/compare/v0.9.0...v0.10.0) (2023-10-18)


### Bug Fixes

* ensure layer tree consistently shows selected item ([6a9145c](https://github.com/measuredco/puck/commit/6a9145c23b1461e46f3568e9a107d3c429aa87d2))
* only render strings or numbers in external adaptors ([3c337be](https://github.com/measuredco/puck/commit/3c337be171c5fa6ad464f5a16fcb7f17e9b1a4f9))
* prevent style pollution for select fields ([fa7af7d](https://github.com/measuredco/puck/commit/fa7af7da9d770d5e790944d421dc0a30f0da84b1))


### Features

* align component list UI with refreshed array fields ([74cd3a7](https://github.com/measuredco/puck/commit/74cd3a7ba9100e5e7e1a5e626511906fbdf75b98))
* enable drag-and-drop of array items ([12800f8](https://github.com/measuredco/puck/commit/12800f816b872d614ed50c9fcf3179f41dbbbfb2))
* expose state dispatcher to plugins ([e94accb](https://github.com/measuredco/puck/commit/e94accb22bae2afbb30728e0d58f8c6a558b3e39))
* expose state to plugins, removing data ([89f9f2e](https://github.com/measuredco/puck/commit/89f9f2e3a526a1459d14bdd7301f2c761f7c340d))
* expose state to renderHeader, removing data ([29ddaaf](https://github.com/measuredco/puck/commit/29ddaaf376b57134be46a489e7686978d0465669))
* record application state in undo/redo history ([0f2d7c5](https://github.com/measuredco/puck/commit/0f2d7c55aebe898925084ff27d5af97e9a7b9090))
* refresh UI for array fields ([5ef8a96](https://github.com/measuredco/puck/commit/5ef8a96b6952d450927a499f1ec0f93610450864))




## [0.9.0](https://github.com/measuredco/puck/compare/v0.8.0...v0.9.0) (2023-10-06)


### Bug Fixes

* fill empty space under puck-root ([d42cfb6](https://github.com/measuredco/puck/commit/d42cfb69aa7c7e0b70321b4b509efd3c6fdbe393))
* prevent global pollution of Heading color ([327721c](https://github.com/measuredco/puck/commit/327721c705546a538fedd0a3b794926605cd58fc))
* render `icon` if provided to FieldLabel ([ae01891](https://github.com/measuredco/puck/commit/ae01891ce55b844c5a76a20faa33e5df16c2d593))
* reset stacking context for each item ([a826492](https://github.com/measuredco/puck/commit/a826492ee7bab57710edad6b7df498f294398606))


### Features

* add undo/redo history ([222697e](https://github.com/measuredco/puck/commit/222697e5b9e95e3b28d0dfd9ac0b85f46c56068e))
* make actions sticky to component scroll ([f3e5b50](https://github.com/measuredco/puck/commit/f3e5b50d921f0c75978f805a7d44b88511fbaf69))




## [0.8.0](https://github.com/measuredco/puck/compare/v0.7.0...v0.8.0) (2023-10-03)


 ### Features

 * introduce DropZone API for nesting components and advanced layouts ([5053a84](https://github.com/measuredco/puck/commit/5053a8430de1f4bfb6fb7a4b1f194a1474ed3ae3))
 * introduce new outline UI ([e32c4ff](https://github.com/measuredco/puck/commit/e32c4ff784a2fcc5f2e2879807c045bd2742f4ac))
 * redesign action overlay and move outside of component ([5145cba](https://github.com/measuredco/puck/commit/5145cba6595e2051d14a7bfd37d9b180d9553330))
 * cast number field types to Number ([d5df959](https://github.com/measuredco/puck/commit/d5df95946dd9abf1502cb21bfc8682dd98efb1e1))


 ### Bug Fixes

 * add missing id type to render props ([18753cf](https://github.com/measuredco/puck/commit/18753cf1142d70f7100bc6fd5aa913813491042e))
 * add missing optional chaining operator to next recipe ([a368319](https://github.com/measuredco/puck/commit/a368319ec73adfc5bce8fb6bd31ac8e46e669400))
 * don't show margin underneath placeholder when dragging in ([2620455](https://github.com/measuredco/puck/commit/26204557b6fc92b208ee1051921965b793a78b1e))
 * don't switch between controlled/uncontrolled inputs ([b20e298](https://github.com/measuredco/puck/commit/b20e2980be6df6d57f9dfb6987b512686ccc5a7a))
 * ensure form styles override global styles ([104091a](https://github.com/measuredco/puck/commit/104091ac87c95d1395687d1785e621f5580efd87))
 * ensure hooks can always be used within render functions ([cbf8e8e](https://github.com/measuredco/puck/commit/cbf8e8e49fc5d43a8818cf41010cfba6034bbf28))
 * ensure types allow for nested arrays ([06b145b](https://github.com/measuredco/puck/commit/06b145b9089548725166fec3dd54f757b6e932cc))
 * fix unpredictable rendering of drop placeholder ([bf5f16b](https://github.com/measuredco/puck/commit/bf5f16b394ef950318949e9a440dd1bf2407636e))
 * only show sidebar scroll bars if necessary ([87c8736](https://github.com/measuredco/puck/commit/87c87369003f417600ca0a7bb38041de5c675afb))
 * prevent global styles from overwriting fieldset styles ([550bd0e](https://github.com/measuredco/puck/commit/550bd0ef9263766817709cea2c0365e9bd3e95cf))
 * respect labels for array item fields ([f2e7843](https://github.com/measuredco/puck/commit/f2e7843de0b12df4b15b1c1dd953e8b4d82ce366))
 * prevent global styles from overwriting outline styles ([1dc222c](https://github.com/measuredco/puck/commit/1dc222cfa5924aca2e5eb5ea535f77cfe2fe1281))
 * prevent styles from clashing with dark mode root element ([8506e8e](https://github.com/measuredco/puck/commit/8506e8e7f72aa8df7e69a1e7349eae273ebdee0e))
 * upgrade next version in recipe to ensure vercel builds pass ([c2d7fae](https://github.com/measuredco/puck/commit/c2d7faeed59fea5c7c795f76915cf354151d644d))


 ### Performance Improvements

 * reduce bundle size by 61% by removing unused react-feather icons ([f4b0563](https://github.com/measuredco/puck/commit/f4b0563e38a93a5f582b0210b0d75a846e3bada4))


## [0.7.0](https://github.com/measuredco/puck/compare/v0.6.2...v0.7.0) (2023-09-14)


### Features

* add support for custom fields ([b46b721](https://github.com/measuredco/puck/commit/b46b721aea70698e249cd3dfff34f88717952da7))




## [0.6.2](https://github.com/measuredco/puck/compare/v0.6.1...v0.6.2) (2023-09-07)


### Bug Fixes

* bust cache in generated app on publish ([6e1c8ed](https://github.com/measuredco/puck/commit/6e1c8ed9df1be9634e49d18edc8c42c7ebf6e864))
* don't 404 on homepage in generated app ([8fd7b3b](https://github.com/measuredco/puck/commit/8fd7b3b38a046776f69105e25f86a622b5e41c40))
* don't call API when building generated app ([8041fc1](https://github.com/measuredco/puck/commit/8041fc1da598f61b4c30c711d8233466c8643099))
* fix type issues in generated app ([b16e98e](https://github.com/measuredco/puck/commit/b16e98e15407678524d904211ecc74230b205018))




## [0.6.1](https://github.com/measuredco/puck/compare/v0.6.0...v0.6.1) (2023-09-06)


### Bug Fixes

* add missing glob dependency for create-puck-app ([7dbe190](https://github.com/measuredco/puck/commit/7dbe1902bf1c31a674b35c1269ee44ac09aac763))
* return component to original position when drag cancelled ([cae760f](https://github.com/measuredco/puck/commit/cae760fbfb8497de09311bb81e3059c07efe75ac))
* use correct peer dependencies for react ([39f4e7f](https://github.com/measuredco/puck/commit/39f4e7fab5818266aa75046d2c2ca6e858803a13))




## [0.6.0](https://github.com/measuredco/puck/compare/v0.5.0...v0.6.0) (2023-08-15)


### Bug Fixes

* ensure component label doesn't inherit user styles ([5c0d65b](https://github.com/measuredco/puck/commit/5c0d65b8519897c454b2f321330dd24dd30f831f))
* make default props on root optional ([dc5b1ae](https://github.com/measuredco/puck/commit/dc5b1aec6518f1c3ed1ad8f798bcfe359077865f))


### Features

* export Button and IconButton to make extending header seamless ([d98eb29](https://github.com/measuredco/puck/commit/d98eb298f14ef0ae8888a710cadf85fac13e084d))




## [0.5.0](https://github.com/measuredco/puck/compare/v0.4.1...v0.5.0) (2023-08-14)


### Features

* add headerTitle and headerPath APIs ([ae5c7c2](https://github.com/measuredco/puck/commit/ae5c7c2083b16e8f69e9995d74f8be7fffbe6ea5))
* gracefully fallback if component definition doesn't exist ([d7e3190](https://github.com/measuredco/puck/commit/d7e31901626734ce43cd9161971d9811b6d5c483))
* refine editor styles ([9e57649](https://github.com/measuredco/puck/commit/9e57649e7bd9444b290122ecbc1c40bc6d88c3d1))
* support booleans in radios and selects ([acb7a96](https://github.com/measuredco/puck/commit/acb7a96b727c9bc6d4599dcd06e2448c10e82d0f))




## [0.4.1](https://github.com/measuredco/puck/compare/v0.4.0...v0.4.1) (2023-08-09)


### Bug Fixes

* move incorrect dependency to devDependencies ([6ffd86c](https://github.com/measuredco/puck/commit/6ffd86c9d668449991a0642d79fa85c1a364deae))




## [0.4.0](https://github.com/measuredco/puck/compare/v0.3.2...v0.4.0) (2023-07-07)


### Bug Fixes

* avoid hardcoding localhost in strapi adaptor ([f8d920c](https://github.com/measuredco/puck/commit/f8d920c6d188e9b8c9ea1bc7cb58d63e6f25d823))
* stretch ExternalInput button to fill container ([69ee221](https://github.com/measuredco/puck/commit/69ee221e41ab09aae3d4d4d89c92d799d9b387f9))


### Features

* add adaptor-fetch package ([eaf7875](https://github.com/measuredco/puck/commit/eaf787527c0f76f3d43cbb8fd6fd1542aebdf5b0))
* rename page to root in API ([8519675](https://github.com/measuredco/puck/commit/8519675ab450438ae459bee54a8ae00bdc7553b4))




## [0.3.2](https://github.com/measuredco/puck/compare/v0.3.1...v0.3.2) (2023-07-06)


### Bug Fixes

* export correct files for Strapi adaptor ([577a849](https://github.com/measuredco/puck/commit/577a84928cd3c8e4f7a57d1f2746abd69db23eeb))
* set correct font family for empty outlines ([3d45841](https://github.com/measuredco/puck/commit/3d4584190e13f9b07077d6012d1ce4197de0a436))




## [0.3.1](https://github.com/measuredco/puck/compare/v0.3.0...v0.3.1) (2023-07-05)


### Bug Fixes

* include .gitignore in recipes ([e18bf67](https://github.com/measuredco/puck/commit/e18bf67e366c431a6bea08a9965b7d40866119e2))




## [0.3.0](https://github.com/measuredco/puck/compare/v0.2.2...v0.3.0) (2023-07-05)


### Features

* release create-puck-app ([0722a65](https://github.com/measuredco/puck/commit/0722a656c7da4b4caa9212385affd62323a56c92))




## [0.2.2](https://github.com/measuredco/puck/compare/v0.2.1...v0.2.2) (2023-07-05)


### Bug Fixes

* ensure margin collapse fix works with coloured backgrounds ([fdec4fa](https://github.com/measuredco/puck/commit/fdec4faac197e541a04785ab7c16919223b3ec9d))




## [0.2.1](https://github.com/measuredco/puck/compare/v0.2.0...v0.2.1) (2023-07-05)


### Bug Fixes

* remove border on draggable components ([726a27c](https://github.com/measuredco/puck/commit/726a27cc0df6b8c439d0aa8e0dd05cac32774b3e))




## [0.2.0](https://github.com/measuredco/puck/compare/v0.1.3...v0.2.0) (2023-07-04)


### Bug Fixes

* inject react into libraries ([7e10d91](https://github.com/measuredco/puck/commit/7e10d9141901aaf79ae4ebfa3a7b60b589c6c715))
* render drag and drop correctly when using margins ([f88025b](https://github.com/measuredco/puck/commit/f88025bf27479036426305a1004acfe8f0ab6644))


### Features

* add icons to inputs ([f47482e](https://github.com/measuredco/puck/commit/f47482e8cabd334360666ea90d2e6a12b3648cf9))
* improve UI for fields ([aa0d2fe](https://github.com/measuredco/puck/commit/aa0d2fe56ff633b9c2cff2023ae00c8b9ec04df3))
* rename "group" field type to "array" ([4f99c7d](https://github.com/measuredco/puck/commit/4f99c7d761b8e1cfa280fb5e74f6f369be84d7a2))




## [0.1.6](https://github.com/measuredco/puck/compare/v0.1.3...v0.1.6) (2023-07-04)


### Bug Fixes

* inject react into libraries ([7e10d91](https://github.com/measuredco/puck/commit/7e10d9141901aaf79ae4ebfa3a7b60b589c6c715))




## 0.1.5 (2023-07-03)

- Publish all packages


================================================
File: /scripts/publish.sh
================================================
cd packages/core && npm publish --access public --tag $1
cd ../../

cd packages/field-contentful && npm publish --access public --tag $1
cd ../../

cd packages/plugin-emotion-cache && npm publish --access public --tag $1
cd ../../

cd packages/plugin-heading-analyzer && npm publish --access public --tag $1
cd ../../

cd packages/create-puck-app && npm run removeGitignore && npm publish --access public --tag $1 && npm run restoreGitignore
cd ../../


================================================
File: /scripts/get-unstable-version.js
================================================
const { exec } = require("child_process");
const pkg = require("../package.json");

exec("git rev-parse --short HEAD", (_, stdout) => {
  console.log(`${pkg.version}-${process.argv[2] || "canary"}.${stdout}`);
  process.exit();
});


================================================
File: /scripts/create-changelog.js
================================================
const standardChangelog = require("standard-changelog");
const path = require("path");
const fs = require("fs");

const releasePattern = /^#\s(\[?(([0-9]|\.)+)\]?.*)((.|\n)*)/gm;

const transform = (body) =>
  body.replace(releasePattern, (_, header, _2, _3, content) => {
    return `## ${header}${content}`;
  });

const changelogPath = path.join(__dirname, "../CHANGELOG.md");
const changelog = fs.readFileSync(changelogPath, "utf8");

let changes = "";

const standardStream = standardChangelog();

standardStream.on(
  "data",
  (chunk) => (changes = `${changes}${chunk.toString()}`)
);

standardStream.on("end", () => {
  // Indent headers and add download section
  const transformed = transform(changes);

  // Inject into changelog
  const updatedChangelog = changelog.replace(
    "<!--__CHANGELOG_ENTRY__-->\n",
    `<!--__CHANGELOG_ENTRY__-->\n\n${transformed}`
  );

  fs.writeFileSync(changelogPath, updatedChangelog);
});


================================================
File: /.github/workflows/publish.yml
================================================
name: Publish release
on:
  push:
    branches:
      - "releases/**"
permissions:
  contents: write
jobs:
  tag-and-publish-to-npm:
    runs-on: ubuntu-latest
    if: "startsWith(github.event.head_commit.message, 'release: ')"
    steps:
      - uses: actions/checkout@v2.0.0
      - name: Extract version
        shell: bash
        run: echo "TAG_NAME=$(git log -1 --oneline --pretty=%B | sed 's/release:\ //g')" >> $GITHUB_ENV
      - name: Tag commit
        uses: tvdias/github-tagger@v0.0.1
        with:
          repo-token: "${{ secrets.GH_TOKEN }}"
          tag: ${{ env.TAG_NAME }}

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          registry-url: "https://registry.npmjs.org"

      - name: Install dependencies
        run: yarn

      - name: Publish all packages
        run: ./scripts/publish.sh latest
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      # Trigger a new build to ensure Vercel creates a distinct release branch, rather than reusing latest
      - name: Triggering new build
        run: |
          git config --global user.name 'chrisvxd'
          git config --global user.email 'chrisvxd@users.noreply.github.com'
          git commit -m "ci: trigger build" --allow-empty
          git push

    timeout-minutes: 10


================================================
File: /.github/workflows/ci.yml
================================================
# This workflow will run all checks required for a PR to be merged.

name: Build and Test ci

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2.0.0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Check Yarn Version
        run: yarn --version

      - name: Install dependencies
        run: yarn

      - name: Run tests
        run: yarn test

      - name: Check linting and formatting
        run: |
          if yarn lint && yarn format:check; then
            echo "Linting and formatting checks passed."
          else
            echo "Linting or formatting checks failed. Please fix the issues."
            exit 1
          fi

      - name: Build everything
        run: |
          yarn build

      - name: Check for build failures
        run: |
          if [ $? -ne 0 ]; then
            echo "Build failed. Please fix the issues."
            exit 1
          fi


================================================
File: /.github/workflows/publish-canary.yml
================================================
name: Publish canary release
on:
  push:
    branches:
      - "main"
      - "releases/**"

jobs:
  tag-and-publish-to-npm:
    runs-on: ubuntu-latest

    # Don't run on regular releases
    if: "!startsWith(github.event.head_commit.message, 'release: ')"
    steps:
      - uses: actions/checkout@v4.0.0
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          registry-url: "https://registry.npmjs.org"

      - name: Install dependencies
        run: yarn

      - name: Run release script
        run: yarn release:canary

      - name: Publish all packages
        run: ./scripts/publish.sh canary
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

    timeout-minutes: 10


================================================
File: /apps/docs/releases.json
================================================
{
  "canary": "https://puck-docs-git-main-measured.vercel.app",
  "0.17.1": "https://puck-docs-git-releases-v0171-measured.vercel.app",
  "0.17.0": "https://puck-docs-git-releases-v0170-measured.vercel.app",
  "0.16.2": "https://puck-docs-git-releases-v0162-measured.vercel.app",
  "0.16.1": "https://puck-docs-git-releases-v0161-measured.vercel.app",
  "0.16.0": "https://puck-docs-git-releases-v0160-measured.vercel.app",
  "0.15.0": "https://puck-docs-git-releases-v0150-measured.vercel.app",
  "0.14.2": "https://puck-docs-git-releases-v0142-measured.vercel.app",
  "0.14.1": "https://puck-docs-git-releases-v0141-measured.vercel.app",
  "0.14.0": "https://puck-docs-git-releases-v0140-measured.vercel.app",
  "0.13.1": "https://puck-docs-git-releases-v0131-measured.vercel.app",
  "0.13.0": "https://puck-docs-git-releases-v0130-measured.vercel.app",
  "0.12.0": "https://puck-docs-git-releases-v0120-measured.vercel.app"
}


================================================
File: /apps/docs/middleware.ts
================================================
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import releases from "./releases.json";

const versionPattern = /\/v\/([\d+|\.]+|canary)/;

export function middleware(request: NextRequest) {
  const path = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  const urlMatch = versionPattern.exec(request.url);

  if (urlMatch) {
    const version = urlMatch[1];
    const newUrl = `${releases[version]}${path}`;

    return NextResponse.rewrite(new URL(newUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/v/:path*"],
};


================================================
File: /apps/docs/styles.css
================================================
@import "../../packages/core/styles.css";

article p a,
article li a,
article td a {
  color: var(--puck-color-azure-05) !important;
}

article p a:hover,
article li a:hover,
article td a:hover {
  color: var(--puck-color-azure-03) !important;
}

html.dark p a:hover,
html.dark li a:hover {
  color: var(--puck-color-azure-07) !important;
}

li > a {
  white-space: nowrap;
}


================================================
File: /apps/docs/theme.config.tsx
================================================
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";

import { ReleaseSwitcher } from "./components/ReleaseSwitcher";
import { FooterActions } from "./components/FooterActions";
import { Viewport } from "./components/Viewport";

const Head = () => {
  const { asPath, defaultLocale, locale } = useRouter();
  const { frontMatter, title } = useConfig();

  const siteUrl = "https://puckeditor.com";
  const url =
    siteUrl + (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

  const defaultTitle = `Puck - The open-source visual editor for React`;
  const description =
    frontMatter.description ||
    `Puck empowers developers to build amazing visual editing experiences into their own React applications, powering the next generation of content tools.`;

  return (
    <>
      <link rel="canonical" href={`${siteUrl}${asPath}`} />
      <meta property="og:url" content={url} />
      <meta property="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${siteUrl}/social.png`} />
      <meta property="og:image:height" content="675" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:alt" content="Puck" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:locale" content="en" />
      <meta property="og:site_name" content={defaultTitle} />
      <meta name="image" content={`${siteUrl}/social.png`} />
      <meta itemProp="image" content={`${siteUrl}/social.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={`${siteUrl}/social.png`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:alt" content="Puck" />
      <meta name="twitter:image:height" content="675" />
      <meta name="twitter:image:type" content="image/png" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:site" content="@puckeditor" />
      <meta
        name="twitter:title"
        content={title !== defaultTitle ? `${title} - Puck` : defaultTitle}
      />
      <title>{title !== defaultTitle ? `${title} - Puck` : defaultTitle}</title>

      <link rel="icon" href="/favicon.ico" sizes="48x48" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
      "@context" : "https://schema.org",
      "@type" : "WebSite",
      "name" : "Puck",
      "url" : "https://puckeditor.com/"
    }`,
        }}
      />
      {asPath == "/" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Puck",
              url: siteUrl,
            })}`,
          }}
        />
      )}
    </>
  );
};

const theme: DocsThemeConfig = {
  head: Head,
  logo: (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1300 326"
        width="1300"
        height="326"
        style={{ width: 128, marginBottom: -5, height: 32 }}
        fill="currentColor"
      >
        <path d="M368.9 5.9H455c48.1 0 88.1 15.4 88.1 70.4 0 54.4-37 71.1-85.8 71.1H420v90.4h-51.1V5.9zm51.1 98.2h34c18 0 36-6.2 36-27.8 0-23.9-24.2-27.2-43.9-27.2H420v55zM786 148.3c0 54.7-33.4 95.3-97.6 95.3-64.5 0-97.9-40.6-97.9-95.3V5.9h51.1v140.5c0 28.5 19.6 50.1 46.8 50.1 26.8 0 46.5-21.6 46.5-50.1V5.9H786v142.4zM997.1 66.1c-10.1-12.1-24.9-19-43.9-19-38.6 0-67.1 31.4-67.1 74.7s28.5 74.7 65.5 74.7c20.6 0 37.3-9.2 47.8-24.9l42.6 31.8c-19.3 27.5-52.1 40.3-83.8 40.3-72.4 0-125.1-47.5-125.1-121.8C833.1 47.5 885.8 0 958.2 0c25.9 0 58.6 8.8 78.3 34.1l-39.4 32zM1083.2 5.9h51.1v96.3l90-96.3h66.8L1188 113.6l112 124.1h-71.4l-94.3-110v110h-51.1V5.9zM149.3 237.7H82.5v-24.4h66.9v24.4zm82.5-82.5h-24.4V88.4h24.4v66.8zm-207.4 0H0V88.4h24.4v66.8zM149.3 30.3H82.5V5.9h66.9v24.4zM45.6 237.7H0v-45.6h24.4v21.2h21.2v24.4zM231.8 51.5h-24.4V30.3h-21.2V5.9h45.6v45.6zm-207.4 0H0V5.9h45.6v24.4H24.4v21.2zM164.8 170.7l27.5 155.2L320 198.2l-155.2-27.5z" />
      </svg>
    </div>
  ),
  project: {
    link: "https://github.com/measuredco/puck",
  },
  footer: {
    content: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <p className="mt-6 text-xs">
          MIT © {new Date().getFullYear()}{" "}
          <a style={{ textDecoration: "underline" }} href="https://measured.co">
            Measured Corporation Ltd.
          </a>
        </p>
      </div>
    ),
  },
  chat: {
    link: "https://discord.gg/D9e4E3MQVZ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid"
        viewBox="0 -28.5 256 256"
        fill="currentColor"
      >
        <path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" />
      </svg>
    ),
  },
  toc: {
    backToTop: true,
  },
  banner:
    process.env.NEXT_PUBLIC_IS_LATEST === "true"
      ? {
          dismissible: true,
          key: "v0.17.0",
          content: (
            <a
              href="https://github.com/measuredco/puck/releases"
              target="_blank"
            >
              <b>🎄 Puck 0.17</b>: React 19 and field enhancements →
            </a>
          ),
        }
      : {},
  docsRepositoryBase: "https://github.com/measuredco/puck/tree/main/apps/docs",
  navbar: {
    extraContent: () => (
      <Viewport desktop>
        <ReleaseSwitcher />
      </Viewport>
    ),
  },
  themeSwitch: {
    component: FooterActions,
  },
};

export default theme;


================================================
File: /apps/docs/.gitignore
================================================
/public/sitemap.xml


================================================
File: /apps/docs/next.config.mjs
================================================
import packageJson from "./package.json" assert { type: "json" };
import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

const BRANCH_NAME = process.env.VERCEL_GIT_COMMIT_REF || "";
const IS_RELEASE_BRANCH = BRANCH_NAME.startsWith("releases/");

export default withNextra({
  async redirects() {
    return [
      {
        source: "/docs/api-reference/configuration/fields/:path*",
        destination: "/docs/api-reference/fields/:path*",
        permanent: true,
      },
      {
        source: "/docs/api-reference/plugins",
        destination: "/docs/api-reference/plugin",
        permanent: true,
      },
      {
        source: "/docs/api-reference/overrides/component-list",
        destination: "/docs/api-reference/overrides/components",
        permanent: true,
      },
    ];
  },
  transpilePackages: ["@measured/puck"],
  basePath: IS_RELEASE_BRANCH
    ? `/v/${packageJson.version}`
    : process.env.NEXT_PUBLIC_IS_CANARY
    ? "/v/canary"
    : "",
});


================================================
File: /apps/docs/components/Home/styles.module.css
================================================
.Home {
  display: flex;
  padding-bottom: 48px;
  padding-top: 48px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  max-height: 1280px;
}

@media (min-width: 768px) {
  .Home {
    padding-bottom: 96px;
    padding-top: 96px;
  }
}

.Home-title {
  max-width: 1156px;
}

.Home-description {
  max-width: 896px;
}

.Home-heading {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .Home-heading {
    font-size: 64px;
  }
}

.Home-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.Home-builtBy {
  color: currentColor;
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.Home-builtBy a {
  color: #0158ad;
}

:global(html.dark) .Home-builtBy a {
  color: currentColor;
}

.Home-builtBy a:hover {
  opacity: 0.8;
}

.Home-card {
  background-color: var(--puck-color-azure-01);
  background-image: url(https://res.cloudinary.com/measuredco/image/upload/v1732634892/site/site-background-top_v8ll2o.png),
    url(https://res.cloudinary.com/measuredco/image/upload/v1732635074/site/site-background-repeat_kjbjx5.png);
  background-position: center -1rem, top;
  background-repeat: no-repeat, repeat-y;
  background-size: auto;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 544px;
  padding: 32px;
  text-align: left;
  border: 1px solid var(--puck-color-grey-03);
  border-radius: 8px;
}

.Home-card p a {
  color: #6db5f8 !important;
}

.Home-card p a:hover {
  color: #93c5fa !important;
  opacity: 0.8;
}

.Home-cardHeading {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}

.Home-cardActions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.Home-dot {
  border-radius: 8px;
  background-color: currentColor;
  padding: 2px;
  margin: 28px;
  opacity: 0.5;
}

.Home-peakWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 96px;
  text-align: center;
  width: 100%;
}


================================================
File: /apps/docs/components/Home/index.tsx
================================================
import React from "react";

import styles from "./styles.module.css";
import getClassNameFactory from "@/core/lib/get-class-name-factory";
import { Button } from "@/core/components/Button";
import Link from "next/link";

const getClassName = getClassNameFactory("Home", styles);

export default function CallButton() {
  return (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "puck-enquiry", {origin:"https://cal.com"});
  Cal.ns["puck-enquiry"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
  `,
        }}
      />

      <Button
        data-cal-link="chrisvxd/puck-enquiry"
        data-cal-namespace="puck-enquiry"
        data-cal-config='{"layout":"month_view"}'
        variant="primary"
      >
        Book discovery call
      </Button>
    </>
  );
}

const MeasuredLogo = () => (
  <span>
    <svg
      fill="currentColor"
      aria-labelledby="measured"
      height="30"
      role="img"
      viewBox="0 0 454 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="measured">Measured</title>
      <path d="M69.1 69.1V43c0-23.7-19.3-43-43-43H0v30.7h26.1c6.8 0 12.3 5.5 12.3 12.3v26.1h30.7Zm52.8-60.4 13 31.5h.6l12.9-31.5h15.3v50.9h-12V28.3h-.4l-12.3 31h-7.7l-12.2-31.2h-.4v31.5h-12V8.7h15.2Zm45.9 32c0-11.8 7.4-19.8 19-19.8s18.5 6.9 18.5 19.5v3h-25.5v.3c0 4.7 2.9 7.8 7.6 7.8 4.7 0 5.7-1.4 6.6-3.9l11.2.3c-1.4 7.5-8 12.4-18 12.4s-19.3-7.4-19.3-19.7l-.1.1Zm26.2-4.3c0-3.9-2.9-6.7-6.9-6.7s-7 2.9-7.2 6.7h14.2-.1ZM208.7 49c0-8.5 6.5-11.3 14.2-12 6.5-.6 9.1-1.1 9.1-3.4 0-2.7-1.9-4.1-4.9-4.1-3 0-5.2 1.5-5.7 3.9l-11.2-.4c1-7 6.8-12.1 17.1-12.1s16.9 4.7 16.9 12.7v26h-11.4v-5.3h-.3c-2.1 3.9-5.8 6-11.1 6s-12.6-3.7-12.6-11.2l-.1-.1Zm23.3-3v-3.6c-1.4.7-4.2 1.2-6.4 1.5-3.5.5-5.4 2-5.4 4.5s2 3.9 4.8 3.9 7-2.5 7-6.3Zm39.6-12.6c-.3-2.4-2.6-4.1-5.8-4.1-3.2 0-5.1 1.2-5.1 3.1 0 1.5 1 2.6 4.3 3.3l7.4 1.4c7.6 1.5 11.3 4.8 11.3 10.4 0 7.9-7.5 13-17.7 13s-17.4-4.9-18.3-12.4l12-.3c.5 2.8 2.9 4.3 6.3 4.3s5.2-1.3 5.3-3.2c0-1.7-1.5-2.7-4.7-3.3l-6.7-1.3c-7.6-1.4-11.4-5.2-11.3-11.1 0-7.7 6.5-12.2 16.9-12.2 10.4 0 16.5 4.6 17.2 12.2l-11.2.3.1-.1Zm40.5-12h12.2v38.2h-11.6v-7.1h-.4c-1.7 4.7-5.9 7.6-11.7 7.6-5.8 0-13.1-5.7-13.1-14.4V21.3h12.2v22c0 4.2 2.3 6.7 6 6.7s6.4-2.5 6.4-6.9V21.4Zm17.9 0h11.8v7h.4c1.4-5.1 4.7-7.5 8.9-7.5s2.4.2 3.4.4v10.6c-1.2-.4-3.3-.6-4.8-.6-4.4 0-7.6 3.1-7.6 7.6v20.8h-12.2V21.5l.1-.1Zm25.9 19.3c0-11.8 7.4-19.8 19-19.8s18.5 6.9 18.5 19.5v3h-25.5v.3c0 4.7 2.9 7.8 7.6 7.8 4.7 0 5.7-1.4 6.6-3.9l11.2.3c-1.4 7.5-8 12.4-18 12.4S356 52.9 356 40.6l-.1.1Zm26.2-4.3c0-3.9-2.9-6.7-6.9-6.7s-7 2.9-7.2 6.7h14.2-.1Zm14.8 4.1c0-13.5 7.2-19.6 15.2-19.6 8 0 9.4 3.5 10.8 7h.2V8.6h12.2v51h-12v-6.2h-.4c-1.5 3.5-5 6.7-10.7 6.7-8.4 0-15.3-6.6-15.3-19.6Zm26.5 0c0-6.2-2.6-10.1-7-10.1s-7 4-7 10.1 2.5 10.2 7 10.2 7-4 7-10.2Zm17.5 13.4c0-3.5 2.9-6.4 6.5-6.4s6.4 2.9 6.5 6.4c0 3.6-3.1 6.5-6.5 6.5s-6.5-2.9-6.5-6.5Z"></path>
    </svg>
  </span>
);

export const Home = () => {
  return (
    <div className={getClassName()}>
      <div className={getClassName("title")}>
        <h1 style={{ visibility: "hidden" }}>Puck</h1>

        <span>Open-source under MIT</span>
        <h2 className={getClassName("heading")}>The visual editor for React</h2>
      </div>
      <div style={{ paddingTop: 24 }} />
      <div className={getClassName("description")}>
        <p style={{ fontSize: 18, lineHeight: 1.5, opacity: 0.7 }}>
          Puck empowers developers to build amazing visual editing experiences
          into their own React applications, powering the next generation of
          content tools, no-code builders and WYSIWYG editors.
        </p>
      </div>
      <div style={{ paddingTop: 32 }} />
      <div className={getClassName("ctas")}>
        <div className={getClassName("actions")}>
          <Link href="/docs" style={{ display: "flex" }}>
            <Button>Read docs</Button>
          </Link>
          <Button href="https://demo.puckeditor.com/edit" variant="secondary">
            View demo
          </Button>
        </div>
        <div style={{ paddingTop: 32 }} />
        <pre style={{ padding: 0, margin: 0 }}>
          <span style={{ userSelect: "none" }}>~ </span>npm i @measured/puck
          --save
        </pre>
      </div>
      <div className={getClassName("peakWrapper")}>
        <div className={getClassName("builtBy")}>
          <p>Built by</p>
          <Link href="https://measured.co" target="_blank">
            <MeasuredLogo />
          </Link>
        </div>

        <div>
          <div className={getClassName("dot")} />
          <div className={getClassName("dot")} />
          <div className={getClassName("dot")} />
        </div>

        <div className={getClassName("peak")}>
          <div className={getClassName("card")}>
            <h2 className={getClassName("cardHeading")} id="support">
              Stuck with Puck?
            </h2>
            <p>
              Puck is built by{" "}
              <Link href="https://measured.co" target="_blank">
                Measured
              </Link>
              , experts in UI strategy. We provide premium Puck support, design
              system builds, and consultancy.
            </p>
            <div className={getClassName("cardActions")}>
              <CallButton />
              <Button
                href="https://discord.gg/D9e4E3MQVZ"
                variant="secondary"
                newTab
              >
                Join Discord — Free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


================================================
File: /apps/docs/components/Preview/styles.module.css
================================================
.PreviewFrame {
  background: white;
  border: 1px solid var(--puck-color-grey-09);
  color: black;
  border-radius: 16px;
  margin-top: 32px;
  overflow: hidden;
}

.PreviewFrame-header {
  background: var(--puck-color-azure-11);
  gap: 8px;
  color: var(--puck-color-azure-05);
  font-weight: 0;
  padding: 12px 16px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom: 1px solid var(--puck-color-grey-09);
  align-items: center;
}

.PreviewFrame-annotation {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
}

.PreviewFrame-label {
  margin-left: auto;
}

.PreviewFrame-body {
  padding: 32px;
}

.ConfigPreview {
  display: flex;
  flex-wrap: wrap;
  background: var(--puck-color-grey-09);
  gap: 1px;
}

.ConfigPreview-field {
  flex-grow: 1;
  flex-basis: 49%;
  min-width: 1px;
  background: white;
}

.ConfigPreview-fieldLabel {
  padding: 24px;
}

.ConfigPreview-fieldLabel + .ConfigPreview-fieldLabel {
  border-top: 1px solid var(--puck-color-grey-09);
}

.ConfigPreview-preview {
  color: var(--puck-color-grey-03);
  flex-grow: 1;
  flex-basis: 49%;
  min-width: 256px;
  padding: 16px;
  background: white;
}

.ConfigPreview-preview > * {
  color: var(
    --puck-color-grey-03
  ) !important; /* Override any injected Nextra/Tailwind styles */
}


================================================
File: /apps/docs/components/Preview/index.tsx
================================================
import React, { CSSProperties } from "react";

export { AutoField } from "@/core/components/AutoField";

import { ReactNode } from "react";
import "@/core/styles.css";
import { Puck } from "@/core/components/Puck";

import { ComponentConfig } from "@/core/types";
import { getClassNameFactory } from "@/core/lib";

import styles from "./styles.module.css";
import { usePuck } from "@/core/lib/use-puck";
import { FieldLabel } from "@/core/components/AutoField";

const getClassNamePreview = getClassNameFactory("PreviewFrame", styles);
const getClassNameConfigPreview = getClassNameFactory("ConfigPreview", styles);

export const PreviewFrame = ({
  children,
  label,
  style = {},
  disableOnClick = false,
}: {
  children?: ReactNode;
  label?: string;
  style?: CSSProperties;
  disableOnClick?: boolean;
}) => {
  const { dispatch } = usePuck();

  return (
    <div
      className={getClassNamePreview()}
      onClick={() => {
        if (disableOnClick) return;

        dispatch({ type: "setUi", ui: { itemSelector: null } });
      }}
    >
      <div className={getClassNamePreview("header")}>
        <div className={getClassNamePreview("annotation")}>
          Interactive Demo
        </div>
        {label && <div className={getClassNamePreview("label")}>{label}</div>}
      </div>
      <div className={getClassNamePreview("body")} style={style}>
        {children}
      </div>
    </div>
  );
};

export const PuckPreview = ({
  label,
  children,
  style = {},
  ...puckProps
}: React.ComponentProps<typeof Puck> & {
  label: string;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <Puck config={{}} data={{}} {...puckProps} iframe={{ enabled: false }}>
      <PreviewFrame label={label} style={style}>
        {children}
      </PreviewFrame>
    </Puck>
  );
};

const ConfigPreviewInner = ({
  componentConfig,
}: {
  componentConfig: ComponentConfig;
}) => {
  const { appState } = usePuck();

  return (
    <div className={getClassNameConfigPreview()}>
      <div className={getClassNameConfigPreview("field")}>
        <Puck.Fields />
      </div>

      {componentConfig.render && (
        <div className={getClassNameConfigPreview("preview")}>
          {componentConfig.render({
            ...appState.data["content"][0].props,
            puck: { renderDropZone: () => <div />, isEditing: false },
          })}
        </div>
      )}
    </div>
  );
};

export const ConfigPreview = ({
  componentConfig,
  label,
}: {
  componentConfig: ComponentConfig;
  label: string;
}) => {
  return (
    <Puck
      config={{ components: { Example: componentConfig } }}
      data={{
        content: [
          {
            type: "Example",
            props: { ...componentConfig.defaultProps, id: "example" },
          },
        ],
        root: { props: {} },
      }}
      onPublish={() => {}}
      ui={{ itemSelector: { index: 0 } }}
    >
      <PreviewFrame label={label} style={{ padding: 0 }} disableOnClick>
        <ConfigPreviewInner componentConfig={componentConfig} />
      </PreviewFrame>
    </Puck>
  );
};


================================================
File: /apps/docs/components/FooterActions/styles.module.css
================================================
.FooterActions {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
}

.FooterActions-releaseSwitcher {
  display: block;
  margin-left: auto;
}

@media (min-width: 768px) {
  .FooterActions-releaseSwitcher {
    display: none;
  }
}


================================================
File: /apps/docs/components/FooterActions/index.tsx
================================================
import { getClassNameFactory } from "@/core/lib";

import styles from "./styles.module.css";
import { ThemeSwitch } from "nextra-theme-docs";
import { ReleaseSwitcher } from "../ReleaseSwitcher";

const getClassName = getClassNameFactory("FooterActions", styles);

export const FooterActions = () => {
  return (
    <div className={getClassName()}>
      <div className={getClassName("themeSwitch")}>
        <ThemeSwitch />
      </div>
      <div className={getClassName("releaseSwitcher")}>
        <ReleaseSwitcher variant="light" />
      </div>
    </div>
  );
};


================================================
File: /apps/docs/components/Viewport/styles.module.css
================================================
.Viewport {
  display: none;
}

.Viewport--mobile {
  display: block;
}

@media (min-width: 768px) {
  .Viewport--desktop {
    display: block;
  }

  .Viewport--mobile:not(.Viewport--desktop) {
    display: none;
  }
}


================================================
File: /apps/docs/components/Viewport/index.tsx
================================================
import { getClassNameFactory } from "@/core/lib";

import styles from "./styles.module.css";
import { ReactNode } from "react";

const getClassName = getClassNameFactory("Viewport", styles);

export const Viewport = ({
  children,
  mobile,
  desktop,
}: {
  children: ReactNode;
  mobile?: boolean;
  desktop?: boolean;
}) => {
  return <div className={getClassName({ mobile, desktop })}>{children}</div>;
};


================================================
File: /apps/docs/components/ReleaseSwitcher/styles.module.css
================================================
.ReleaseSwitcher {
  appearance: none; /* Safari */
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23c3c3c3'><polygon points='0,0 100,0 50,50'/></svg>")
    no-repeat;
  background-size: 12px;
  background-position: calc(100% - 12px) calc(50% + 3px);
  background-repeat: no-repeat;
  background-color: var(--puck-color-grey-11);
  border-radius: 100px;
  color: black;
  padding-left: 16px;
  padding-right: 16px;
  height: 33px; /* Magic number to align with Nextra search */
  width: 156px;
}

.ReleaseSwitcher--light {
  background-color: white;
  border: 1px solid var(--puck-color-grey-10);
}


================================================
File: /apps/docs/components/ReleaseSwitcher/index.tsx
================================================
import { useEffect, useState } from "react";

import packageJson from "../../package.json";
import { getClassNameFactory } from "@/core/lib";

import styles from "./styles.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://puckeditor.com";

const { version } = packageJson;

const getClassName = getClassNameFactory("ReleaseSwitcher", styles);

export const ReleaseSwitcher = ({
  variant = "default",
}: {
  variant?: "light" | "default";
}) => {
  const isCanary = process.env.NEXT_PUBLIC_IS_CANARY === "true" || false;
  const isLatest = process.env.NEXT_PUBLIC_IS_LATEST === "true" || false;

  const currentValue = isCanary ? "canary" : isLatest ? "" : version;

  const [options, setOptions] = useState<{ value: string; label: string }[]>([
    {
      label: "canary",
      value: "canary",
    },
    ...(isCanary
      ? []
      : [
          {
            label: isLatest ? `${version} (latest)` : version,
            value: isLatest ? "" : version,
          },
        ]),
  ]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/releases`)
      .then(async (res) => {
        const { releases } = await res.json();
        const releaseOptions = Object.keys(releases).map((key) => ({
          label: key,
          value: key,
        }));

        releaseOptions[1].label = `${releaseOptions[1].label} (latest)`;
        releaseOptions[1].value = ""; // Okay to set to "" because isLatest will be true for this release option

        setOptions(releaseOptions);
      })
      .catch((e) => {
        console.error(`Could not load releases: ${e}`);
      });
  }, []);

  return (
    <select
      className={getClassName({ [variant]: true })}
      value={currentValue}
      onChange={(e) => {
        const newHref = e.currentTarget.value
          ? `/v/${e.currentTarget.value}`
          : "https://puckeditor.com";

        if (window.parent) {
          window.parent.location.href = newHref;
        } else {
          window.location.href = newHref;
        }
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};


================================================
File: /apps/docs/.eslintrc.js
================================================
module.exports = {
  root: true,
  extends: ["custom"],
};


================================================
File: /apps/docs/public/manifest.webmanifest
================================================
{
  "name": "Puck",
  "short_name": "Puck",
  "start_url": "/",
  "icons": [
    {
      "src": "/maskable_icon_x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/maskable_icon.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#111",
  "background_color": "#ffffff",
  "display": "standalone"
}


================================================
File: /apps/docs/public/robots.txt
================================================
User-Agent: *
Disallow: /v/*


================================================
File: /apps/docs/next-env.d.ts
================================================
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/pages/building-your-application/configuring/typescript for more information.


================================================
File: /apps/docs/package.json
================================================
{
  "name": "docs",
  "version": "0.17.1",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postbuild": "next-sitemap",
    "start": "next start",
    "lint": "next lint"
  },
  "devDependencies": {
    "@types/node": "^17.0.12",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.2",
    "eslint-config-custom": "*",
    "typescript": "^5.5.4"
  },
  "dependencies": {
    "next": "^14.2.11",
    "next-sitemap": "^4.2.3",
    "nextra": "^3.2.5",
    "nextra-theme-docs": "^3.2.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}


================================================
File: /apps/docs/pages/api/releases.ts
================================================
import type { NextApiRequest, NextApiResponse } from "next";

import releases from "../../releases.json";

/**
 * Proxy GitHub and rely on Next.js cache to prevent rate limiting
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  res.status(200).json({ releases });
}


================================================
File: /apps/docs/pages/docs/integrating-puck/_meta.js
================================================
const menu = {
  "component-configuration": {},
  "root-configuration": {},
  "multi-column-layouts": {},
  categories: {},
  "dynamic-props": {},
  "dynamic-fields": {},
  "external-data-sources": {},
  "server-components": {},
  "data-migration": {},
  viewports: {},
  "feature-toggling": {},
};

export default menu;


================================================
File: /apps/docs/pages/docs/integrating-puck/data-migration.mdx
================================================
# Data Migration

## Version migrating

Puck follows semantic versioning. Major releases may introduce breaking changes for your Data payload.

Puck provides the [`migrate`](/docs/api-reference/functions/migrate) helper method to help migrate legacy data payloads to the latest data model, transforming any deprecated properties to their latest counterparts as described by the [Data API reference](/docs/api-reference/data).

```tsx
import { migrate } from "@measured/puck";

migrate(legacyData);
```

## Breaking changes to props

Renaming or removing the props passed to your components are considered breaking changes. Any existing [Data](/docs/api-reference/data) payloads that reference these props will be unable to render.

There are two strategies for dealing with this:

1. Retaining backwards-compatible props
2. Implementing a prop migration

### Retaining backwards-compatibility

The easiest way to avoid breaking changes is to implement your prop changes in a backwards compatible manor:

```tsx copy showLineNumbers {2}
const config = {
  HeadingBlock: ({ title, heading }) => <h1>{heading || title}</h1>,
};
```

### Implementing a prop migration

It will often be preferrable to update the underlying [Data](/docs/api-reference/data) payload. Puck provides the [`transformProps`](/docs/api-reference/functions/transform-props) utility method to conveniently transform the props for a given component throughout the payload.

```tsx copy showLineNumbers {15-18}
import { transformProps } from "@measured/puck";

const config = {
  // Renamed `title` prop to `heading`
  HeadingBlock: ({ heading }) => <h1>{heading}</h1>,
};

const data = {
  content: [
    // HeadingBlock references the legacy `title` prop
    { type: "HeadingBlock", props: { title: "Hello, world" } },
  ],
};

const updatedData = transformProps(data, {
  // Map `heading` to the legacy `title` prop
  HeadingBlock: ({ title, ...props }) => ({ heading: title, ...props }),
});

console.log(updatedData);
// { content: [{ type: "HeadingBlock", props: { heading: "Hello, world" } }] };
```

You may choose to run this transform every time you render your content, or perform a batch operation against your database.

```tsx copy showLineNumbers filename="Example showing data being updated before rendering"
import { Puck, Render, transformProps } from "@measured/puck";

const transforms = {
  HeadingBlock: ({ title, ...props }) => ({ heading: title, ...props }),
};

export const MyEditor = ({ data, config }) => (
  <Puck data={transformProps(data, transforms)} config={config} />
);

export const MyPage = ({ data, config }) => (
  <Render data={transformProps(data, transforms)} config={config} />
);
```

## Further reading

- [`Data` API reference](/docs/api-reference/data)
- [`migrate` API reference](/docs/api-reference/functions/migrate)
- [`transformProps` API reference](/docs/api-reference/functions/transform-props)


================================================
File: /apps/docs/pages/docs/integrating-puck/multi-column-layouts.mdx
================================================
---
title: Multi-column Layouts
---

import { PuckPreview } from "@/docs/components/Preview";
import { Puck } from "@/core";

# Multi-column Layouts

Multi-column and other complex layouts can be achieved by nesting components.

## Using DropZones

Puck provides support for nesting components via the [`<DropZone>` API](/docs/api-reference/components/drop-zone).

### Nesting components

The `<DropZone>` component can be rendered anywhere within your component.

```tsx {1,9} showLineNumbers copy
import { DropZone } from "@measured/puck";

const config = {
  components: {
    Example: {
      render: () => {
        return (
          <div>
            <DropZone zone="my-content" />
          </div>
        );
      },
    },
    HeadingBlock: {
      render: () => <p>Hello, world</p>,
    },
  },
};
```

<PuckPreview
  label="Nested components example"
  config={{
    components: {
      Example: {
        render: ({ puck: { renderDropZone: DropZone } }) => {
          return (
            <div style={{ padding: 32 }}>
              <DropZone zone="my-content" />
            </div>
          );
        },
      },
      HeadingBlock: {
        render: () => {
          return <p style={{ color: "black" }}>Hello, world</p>;
        },
      },
    },
  }}
  data={{
    content: [{ type: "Example", props: { id: "Example-1" } }],
    root: { props: {} },
    zones: {
      "Example-1:my-content": [
        { type: "HeadingBlock", props: { id: "Example-2" } },
      ],
    },
  }}
>
  <Puck.Preview />
</PuckPreview>

### Creating multi-column layouts

Combine multiple `<DropZone>` components with something like [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) or [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) to achieve multi-column layouts.

```tsx {9,11,12} showLineNumbers copy
import { DropZone } from "@measured/puck";

const config = {
  components: {
    Example: {
      render: () => {
        return (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <DropZone zone="left-column" />
            <DropZone zone="right-column" />
          </div>
        );
      },
    },
    HeadingBlock: {
      render: ({ text }) => <p>{text}</p>,
    },
  },
};
```

<PuckPreview
  label="Multi-column DropZone example"
  config={{
    components: {
      Example: {
        render: ({ puck: { renderDropZone: DropZone } }) => {
          return (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                padding: 32,
              }}
            >
              <DropZone zone="left-column" />
              <DropZone zone="right-column" />
            </div>
          );
        },
      },
      HeadingBlock: {
        render: ({ content }) => {
          return <p>{content}</p>;
        },
      },
    },
  }}
  data={{
    content: [{ type: "Example", props: { id: "Example-1" } }],
    root: { props: {} },
    zones: {
      "Example-1:left-column": [
        {
          type: "HeadingBlock",
          props: { id: "Example-2", content: "Left column" },
        },
      ],
      "Example-1:right-column": [
        {
          type: "HeadingBlock",
          props: { id: "Example-3", content: "Right column" },
        },
      ],
    },
  }}
>
  <Puck.Preview />
</PuckPreview>

### Reusing the `zone`

The [`zone` identifier](/docs/api-reference/components/drop-zone#zone) is unique to the component, and can be reused in different components.

```tsx {3-8,16,25} showLineNumbers copy
import { DropZone } from "@measured/puck";

const Columns = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
    <DropZone zone="left-column" />
    <DropZone zone="right-column" />
  </div>
);

const config = {
  components: {
    Example: {
      render: () => {
        return (
          <div>
            <Columns />
          </div>
        );
      },
    },
    Alternative: {
      render: () => {
        return (
          <div>
            <Columns />
          </div>
        );
      },
    },
  },
};
```

### Restricting components

The [`allow`](/docs/api-reference/components/drop-zone#allow) and [`disallow`](/docs/api-reference/components/drop-zone#disallow) props allow us to restrict which components can be dragged into a DropZone.

```tsx {9} showLineNumbers copy
import { DropZone } from "@measured/puck";

const config = {
  components: {
    Example: {
      render: () => {
        return (
          <div>
            <DropZone zone="my-content" allow={["HeadingBlock"]} />
          </div>
        );
      },
    },
  },
};
```

This can be combined with [categories](/docs/integrating-puck/categories) to restrict based on your existing groups:

```tsx {4-8,14} showLineNumbers copy
import { DropZone } from "@measured/puck";

const config = {
  categories: {
    typography: {
      components: ["HeadingBlock"],
    },
  },
  components: {
    Example: {
      render: () => {
        return (
          <div>
            <DropZone
              zone="my-content"
              allow={categories.typography.components}
            />
          </div>
        );
      },
    },
  },
};
```

## Further reading

- [The `<DropZone>` API](/docs/api-reference/components/drop-zone)
- [How DropZones store data](/docs/api-reference/data#zones)
- [DropZones and React Server Components](/docs/integrating-puck/server-components)


================================================
File: /apps/docs/pages/docs/integrating-puck/root-configuration.mdx
================================================
# Root Configuration

The root is the top-level component within Puck. It:

1. Renders a single wrapper around your other components. This can be overwritten with a `render` function.
2. Stores meta data, like the page title. This can be extended with `fields`.

Configuring the root is similar to [configuring components](component-configuration).

## The root `render` function

Use the [`root` parameter](/docs/api-reference/configuration/config#root) to specify a [`render` function](/docs/api-reference/configuration/component-config#renderprops):

```tsx showLineNumbers copy {10-12}
const config = {
  components: {
    HeadingBlock: {
      render: () => {
        return <h1>Hello, world</h1>;
      },
    },
  },
  root: {
    render: ({ children }) => {
      return <div>{children}</div>;
    },
  },
};
```

The root `render` function will wrap all of the components. `children` is a node containing the nested components.

If you don't render `children`, your components will not be rendered (unless you're defining [custom root DropZones](#)).

### Example output

Given a minimal data payload containing one **HeadingBlock**

```json copy
{
  "content": [
    {
      "type": "HeadingBlock",
      "props": {
        "id": "HeadingBlock-1234"
      }
    }
  ],
  "root": {}
}
```

the example config will render HTML nodes like this:

```html
<!-- root render -->
<div>
  <!-- HeadingBlock render -->
  <h1>Hello, world</h1>

  <!-- Remining nodes -->
</div>
```

## Adding fields

Root fields provide user input to the root render method, and can be used to store metadata.

By default, `root` is configured with a `title` text field:

```tsx showLineNumbers copy /title/
const config = {
  // ...
  root: {
    render: ({ children, title }) => {
      return (
        <div>
          <h1>{title}</h1>
          {children}
        </div>
      );
    },
  },
};
```

We can override the default field configuration by providing custom [Fields](/docs/api-reference/fields) to the [`fields` parameter](/docs/api-reference/configuration/component-config#fields):

```tsx showLineNumbers copy {4-7} /description/2,3
const config = {
  // ...
  root: {
    fields: {
      title: { type: "text" }, // We need to redefine the `title` field if we want to retain it
      description: { type: "textarea" },
    },
    render: ({ children, title, description }) => {
      return (
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </div>
      );
    },
  },
};
```

When the user modifies the inputs, the editor will produce a data payload like this:

```json copy {6-9}
{
  "content": [
    // ...
  ],
  "root": {
    "props": {
      "title": "Hello, world",
      "description": "Lorem ipsum"
    }
  }
}
```

### TypeScript

Generic types can be passed to the `Config` type to strictly type your root configuration:

```tsx copy {1,3-5} /RootProps/2
import type { Config } from "@measured/puck";

type RootProps = {
  description: string;
};

const config: Config<{}, RootProps> = {
  // ...
};
```

## Setting default props

Provide an object to the [`defaultProps`](/docs/api-reference/configuration/component-config#fields) parameter to configure default props for the root fields:

```tsx showLineNumbers copy {8-11}
const config = {
  // ...
  root: {
    fields: {
      title: { type: "text" },
      description: { type: "textarea" },
    },
    defaultProps: {
      title: "Hello, world",
      description: "Lorem ipsum",
    },
    render: ({ children, title, description }) => {
      return (
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </div>
      );
    },
  },
};
```

Unlike [default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters), `defaultProps` are stored in the data payload and will populate the Puck fields.


================================================
File: /apps/docs/pages/docs/integrating-puck/dynamic-fields.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";

# Dynamic Fields

Dynamic field resolution allows you to change the [field configuration](/docs/api-reference/configuration/component-config#fields) for a component based on the current component props.

## Dynamic component fields

The [`resolveFields` function](/docs/api-reference/configuration/component-config#resolvefieldsdata-params) allows you to make synchronous and asynchronous changes to the field configuration.

For example, we can set the configuration of one field based on the prop value of another:

```tsx {4-25} showLineNumbers copy
const config = {
  components: {
    MyComponent: {
      resolveFields: (data) => {
        const fields = {
          drink: {
            type: "radio",
            options: [
              { label: "Water", value: "water" },
              { label: "Orange juice", value: "orange-juice" },
            ],
          },
        };

        if (data.props.drink === "water") {
          return {
            ...fields,
            waterType: {
              // ... Define field
            },
          };
        }

        return fields;
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label='Try changing the "drink" field'
  componentConfig={{
    resolveFields: (data) => {
      const fields = {
        drink: {
          type: "radio",
          options: [
            { label: "Water", value: "water" },
            { label: "Orange juice", value: "orange-juice" },
          ],
        },
      };

      if (data.props.drink === "water") {
        return {
          ...fields,
          waterType: {
            type: "radio",
            options: [
              { label: "Still", value: "still" },
              { label: "Sparkling", value: "sparkling" },
            ],
          },
        };
      }

      return fields;
    },
    defaultProps: {
      drink: "water",
      waterType: "still",
    },
    render: ({ drink, waterType }) => (
      <p>
        {drink}
        {drink === "water" ? ` (${waterType})` : ""}
      </p>
    ),

}}
/>

### Making asynchronous calls

The [`resolveFields` function](/docs/api-reference/configuration/component-config#resolvefieldsdata-params) also enables asynchronous calls.

Here's an example populating the options for a [`select` field](/docs/api-reference/fields/select) based on a [`radio` field](/docs/api-reference/fields/radio)

```tsx {4-24} showLineNumbers copy
const config = {
  components: {
    MyComponent: {
      resolveFields: async (data, { changed, lastFields }) => {
        // Don't call the API unless `category` has changed
        if (!changed.category) return lastFields;

        // Make an asynchronous API call to get the options
        const options = await getOptions(data.category);

        return {
          category: {
            type: "radio",
            options: [
              { label: "Fruit", value: "fruit" },
              { label: "Vegetables", value: "vegetables" },
            ],
          },
          item: {
            type: "select",
            options,
          },
        };
      },
      render: ({ item }) => <h1>{item}</h1>,
    },
  },
};
```

<ConfigPreview
  label='Try changing the "category" field'
  componentConfig={{
    resolveFields: async (data, { changed, lastFields }) => {
      if (!changed.category) return lastFields;

      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        category: {
          type: "radio",
          options: [
            { label: "Fruit", value: "fruit" },
            { label: "Vegetables", value: "vegetables" },
          ],
        },
        item: {
          type: "select",
          options:
            data.props.category === "fruit"
              ? [
                { label: "Select a fruit", value: "" },
                { label: "Apple", value: "apple" },
                { label: "Orange", value: "orange" },
                { label: "Tomato", value: "tomato" }
              ] : [
                { label: "Select a vegetable", value: "" },
                { label: "Broccoli", value: "broccoli" },
                { label: "Cauliflower", value: "cauliflower" },
                { label: "Mushroom", value: "mushroom" },
              ],
        },
      };
    },

    defaultProps: {
      category: "fruit",
      item: "",
    },
    render: ({ item }) => <p>{item}</p>,

}}
/>

## Further reading

- [`resolveFields` API reference](/docs/api-reference/configuration/component-config#resolvefieldsdata-params)


================================================
File: /apps/docs/pages/docs/integrating-puck/categories.mdx
================================================
# Categories

Categories allow you to group components in the left side bar.

## Creating categories

Use the [`categories` API](/docs/api-reference/configuration/config#categories) to define the component categories.

```tsx {2-6} copy showLineNumbers
const config = {
  categories: {
    typography: {
      components: ["HeadingBlock", "ParagraphBlock"],
    },
  },
  // ...
};
```

Components can appear in separate categories:

```tsx /HeadingBlock/ copy showLineNumbers
const config = {
  categories: {
    typography: {
      components: ["HeadingBlock", "ParagraphBlock"],
    },
    foundational: {
      components: ["HeadingBlock"],
    },
  },
  // ...
};
```

You can also change the title, collapse and hide categories:

```tsx {5,6,10} copy showLineNumbers
const config = {
  categories: {
    typography: {
      components: ["HeadingBlock", "ParagraphBlock"],
      title: "Text",
      defaultExpanded: false, // Collapse this category by default
    },
    foundational: {
      components: ["HeadingBlock"],
      visible: false, // Mark this category as hidden
    },
  },
  // ...
};
```

## The "other" category

Any uncategorized components will be grouped in the `other` category. This will be visible by default. It respects the same API as other categories.

```tsx {6-8} copy showLineNumbers
const config = {
  categories: {
    typography: {
      components: ["HeadingBlock", "ParagraphBlock"],
    },
    other: {
      title: "Other components",
    },
  },
  // ...
};
```

## TypeScript

You can pass in available category names to the `Config` type if using TypeScript

```tsx copy {3}
import type { Config } from "@measured/puck";

const config: Config<{}, {}, "typography" | "interactive"> = {
  categories: {
    typography: {},
    interactive: {},
  },
  // ...
};
```

## Further reading

- [`categories` API reference](/docs/api-reference/configuration/config#categories)
- [`renderComponentList` API reference](/docs/api-reference/components/puck#rendercomponentlistparams)


================================================
File: /apps/docs/pages/docs/integrating-puck/server-components.mdx
================================================
# React Server Components

Puck provides support for [React Server Components](https://react.dev/reference/react/use-server#use-server) (RSC), but the interactive-nature of Puck requires special consideration.

## The server environment

Puck supports the server environment for the following APIs:

- The [`<Render>`](/docs/api-reference/components/render) component, for rendering pages produced by Puck
- The [`resolveAllData`](/docs/api-reference/functions/resolve-all-data) lib, for running all [data resolvers](/docs/integrating-puck/dynamic-props)

These APIs can be used in an RSC environment, but in order to do so the Puck config that they reference must be RSC-friendly.

This can be done by either avoiding client-only code (React `useState`, Puck `<DropZone>`, etc), or split out client components with the `"use client";` directive.

## The client environment

All other Puck APIs, including the core `<Puck>` component, cannot run in an RSC environment due to their high-degree of interactivity.

As these APIs render on the client, the Puck config provided must be safe for client-use, avoiding any server-specific logic.

## Implementation

Since the Puck config can be referenced on the client or the server, we need to consider how to satisfy both environments.

There are three approaches to this:

1. Avoid using any client-specific functionality (like React `useState` or Puck's `<DropZone>`) in your components
2. Mark your components up with the `"use client";` directive if you need client-specific functionality
3. Create separate configs for client and server rendering

### Avoid client-specific code

Avoiding client-specific code is the easiest way to support RSC across both environments, but may not be realistic for all users. This means:

1. Avoiding React hooks like `useState`, `useContext` etc
2. Replacing Puck's `<DropZone>` with the `renderDropZone` prop

#### Replacing DropZone with renderDropZone

The [`puck.renderDropZone` prop](/docs/api-reference/configuration/component-config#propspuckrenderdropzone) is an RSC-friendly way to implement `<DropZone>` functionality:

```tsx copy
const config = {
  components: {
    Columns: {
      render: ({ puck: { renderDropZone } }) => (
        <div>{renderDropZone({ zone: "my-content" })}</div>
      ),
    },
  },
};
```

### Marking up components with `"use client";`

Many modern component libraries will require some degree of client-side behaviour. For these cases, you'll need to mark them up with the `"use client";` directive.

To achieve this, you must import each of those component from a separate file:

```tsx copy showLineNumbers filename="puck.config.tsx"
import type { Config } from "@measured/puck";
import type { HeadingBlockProps } from "./components/HeadingBlock";
import HeadingBlock from "./components/HeadingBlock";

type Props = {
  HeadingBlock: HeadingBlockProps;
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      // You must call the component, rather than passing it in directly. This will change in the future.
      render: ({ title }) => <HeadingBlock title={title} />,
    },
  },
};
```

And add the `"use client";` directive to the top of each component file:

```tsx copy showLineNumbers filename="components/HeadingBlock.tsx" {1}
"use client";

import { useState } from "react";

export type HeadingBlockProps = {
  title: string;
};

export default ({ title }: { title: string }) => {
  useState(); // useState fails on the server

  return (
    <div style={{ padding: 64 }}>
      <h1>{title}</h1>
    </div>
  );
};
```

This config can now be rendered inside an RSC component, such as a Next.js app router page:

```tsx copy showLineNumbers filename="app/page.tsx"
import { config } from "../puck.config.tsx";

export default async function Page() {
  const data = await getData(); // Some server function

  const resolvedData = await resolveAllData(data, config); // Optional call to resolveAllData, if this needs to run server-side

  return <Render data={resolvedData} config={config} />;
}
```

### Creating separate configs

Alternatively, consider entirely separate configs for the `<Puck>` and `<Render>` components. This approach can enable you to have different rendering behavior for a component for when it renders on the client or the server.

To achieve this, you can create a shared config type:

```tsx copy showLineNumbers filename="puck.config.ts"
import type { Config } from "@measured/puck";
import type { HeadingBlockProps } from "./components/HeadingBlock";

type Props = {
  HeadingBlock: HeadingBlockProps;
};

export type UserConfig = Config<Props>;
```

Define a server component config that uses any server-only components, excluding any unnecessary fields:

```tsx copy showLineNumbers filename="puck.config.server.tsx"
import type { UserConfig } from "./puck.config.ts";
import HeadingBlockServer from "./components/HeadingBlockServer"; // Import server component

export const config: UserConfig = {
  components: {
    HeadingBlock: {
      render: HeadingBlockServer,
    },
  },
};
```

And a separate client component config, for use within the `<Puck>` component on the client:

```tsx copy showLineNumbers filename="puck.config.client.tsx"
import type { UserConfig } from "./puck.config.server.ts";
import HeadingBlockClient from "./components/HeadingBlockClient";

export const config: UserConfig = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => <HeadingBlockClient title={title} />, // Note you must call the component, rather than passing it in directly
    },
  },
};
```

Now you can render with different configs depending on the context. Here's a Next.js app router example of a server render:

```tsx copy showLineNumbers filename="app/page.tsx"
import { config } from "../puck.config.server.tsx";

export default async function Page() {
  const data = await getData(); // Some server function

  return <Render data={resolvedData} config={config} />;
}
```


================================================
File: /apps/docs/pages/docs/integrating-puck/dynamic-props.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";

# Dynamic Props

Dynamic prop resolution allows you to change the props for a component after the props have been changed by the user. This is useful for making third-party API calls, such as requesting the latest content from a headless CMS.

## Dynamic component props

The [`resolveData` function](/docs/api-reference/configuration/component-config#resolvedatadata-params) allows you to make changes to the props and set fields as read-only.

For example, we can set the value of one prop to another:

```tsx {12-18} showLineNumbers copy
const config = {
  components: {
    HeadingBlock: {
      fields: {
        title: {
          type: "text",
        },
        resolvedTitle: {
          type: "text",
        },
      },
      resolveData: async ({ props }) => {
        return {
          props: {
            resolvedTitle: props.title,
          },
        };
      },
      render: ({ resolvedTitle }) => {
        return <h1>{resolvedTitle}</h1>;
      },
    },
  },
};
```

<ConfigPreview
  label='Try changing the "title" field'
  componentConfig={{
    fields: {
      title: {
        type: "text",
      },
      resolvedTitle: {
        type: "text",
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
    resolveData: ({ props }) => {
      return {
        props: { resolvedTitle: props.title },
      };
    },
    render: ({ resolvedTitle }) => {
      return <p style={{ margin: 0 }}>{resolvedTitle}</p>;
    },

}}
/>

> When inserting components with `resolveData`, the Puck state will update twice - once for the initial insert, and once more when the method resolves, if it changes the data. This will be reflected in the undo/redo history.

### Setting fields as read-only

[`resolveData`](/docs/api-reference/configuration/component-config#resolvedatadata-params) also allows us to mark fields as read-only using the [`readOnly` parameter](/docs/api-reference/configuration/component-config#datareadonly-1).

```tsx {17} showLineNumbers copy
const config = {
  components: {
    HeadingBlock: {
      // ...
      resolveData: async ({ props }) => {
        return {
          props: {
            resolvedTitle: props.title,
          },
          readOnly: { resolvedTitle: true },
        };
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label='The resolvedTitle field is locked'
  componentConfig={{
    fields: {
      title: {
        type: "text",
      },
      resolvedTitle: {
        type: "text",
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
    resolveData: ({ props }) => {
      return {
        props: { resolvedTitle: props.title },
        readOnly: { resolvedTitle: true }
      };
    },
    render: ({ resolvedTitle }) => {
      return <p style={{ margin: 0 }}>{resolvedTitle}</p>;
    },

}}
/>

### Preventing duplicate calls

It's possible that `resolveData` may carry out an expensive operation (like an API call) that we want to avoid making unless a specific prop has changed.

This can be restricted by checking the [`changed` param](docs/api-reference/configuration/component-config#paramschanged) before calling any expensive operations.

```tsx {6} showLineNumbers copy
const config = {
  components: {
    HeadingBlock: {
      // ...
      resolveData: async ({ props }, { changed }) => {
        if (!changed.text) return { props };

        return {
          props: {
            resolvedTitle: await expensiveOperation(props.title),
          },
        };
      },
      // ...
    },
  },
};
```

## Dynamic Root props

The `resolveData` method is also available on the [root component](/docs/api-reference/configuration/config#root).

```tsx showLineNumbers copy {12-18}
const config = {
  components: {},
  root: {
    fields: {
      title: {
        type: "text",
      },
      resolvedTitle: {
        type: "text",
      },
    },
    resolveData: async ({ props }) => {
      return {
        props: {
          resolvedTitle: props.title,
        },
      };
    },
    render: ({ children, resolvedTitle }) => {
      return (
        <>
          <h1>{resolvedTitle}</h1>
          {children}
        </>
      );
    },
  },
};
```

## Triggering `resolveData`

Resolve data is triggered whenever the props for a component change, or when the [`resolveAllData` utility](/docs/api-reference/functions/resolve-all-data) is used.

```tsx
import { resolveAllData } from "@measured/puck";

const updatedData = await resolveAllData(data, config);
```

## Further reading

- [`resolveData` API reference](/docs/api-reference/configuration/component-config#resolvedatadata-params)
- [`resolveAllData` API reference](/docs/api-reference/functions/resolve-all-data)


================================================
File: /apps/docs/pages/docs/integrating-puck/feature-toggling.mdx
================================================
# Feature Toggling

Feature toggling is enabled by Puck's [Permissions API](/docs/api-reference/permissions). This enables you to toggle behavior like:

- Deletion
- Dragging
- Duplication
- Editing (setting all fields to read-only)
- etc

See the [supported permissions reference](/docs/api-reference/permissions#supported-permissions) for a complete list.

## Toggling features globally

Toggling features across the entire Puck instance can be done with global permissions. These can be set by the [`permissions` prop](/docs/api-reference/components/puck#permissions) on the Puck component:

```tsx showLineNumbers copy {4-6}
export function Editor() {
  return (
    <Puck
      permissions={{
        delete: false, // Disable delete function on all components
      }}
      // ...
    />
  );
}
```

## Toggling features per component

Toggling feature for all instance of a component can be done using component permissions. This is controlled by the [`permissions` parameter](/docs/api-reference/configuration/component-config#permissions) on the component config, and inherits the global permissions.

```tsx showLineNumbers copy {4-6}
const config = {
  components: {
    HeadingBlock: {
      permissions: {
        delete: false, // Disable delete function on all HeadingBlock instances
      },
      // ...
    },
  },
};
```

Component permissions can also be applied to the `root` config.

## Toggling features dynamically

Dynamic permissions enable runtime calculation of permissions based on the component data, enabling instance-specific permissions. This is controlled by the [`resolvePermissions` parameter](/docs/api-reference/configuration/component-config#resolvepermissionsdata-params) on the component config.

```tsx showLineNumbers copy {4-12}
const config = {
  components: {
    HeadingBlock: {
      resolvePermissions: (data, { permissions }) => {
        if (data.props.locked) {
          return {
            delete: false, // Disable delete function when HeadingBlock `locked` prop is set
          };
        }

        return permissions; // Return inherited permissions (component or global)
      },
      // ...
    },
  },
};
```

### Asynchronous feature toggling

Permissions can be resolved asynchronously, enabling powerful patterns like querying permissions from an endpoint whenever the data changes.

```tsx showLineNumbers copy {4-8}
const config = {
  components: {
    HeadingBlock: {
      resolvePermissions: async (data) => {
        const serverPermissions = await myPermissionsApi(data.props.id); // Query permissions from a server

        return serverPermissions;
      },
      // ...
    },
  },
};
```

### Preventing duplicate calls

Permission resolvers are cached based on the component props. If none of the props change, then the resolver won't be called. This prevents duplicate calls to expensive asynchronous operations.

However, it's possible that you may want to avoid making an expensive operation unless a _specific_ prop has changed, rather than any prop.

This can be restricted by checking the [`changed` param](/docs/api-reference/configuration/component-config#paramschanged-2) before calling any expensive operations.

```tsx {6} showLineNumbers copy
const config = {
  components: {
    HeadingBlock: {
      // ...
      resolvePermissions: async (data, { changed, lastPermissions }) => {
        if (!changed.locked) return lastPermissions; // Return last permissions if `locked` hasn't changed

        return await myExpensivePermissionsApi(data),
      },
      // ...
    },
  },
};
```

## Further reading

- [Permissions API reference](/docs/api-reference/permissions)
- [Supported permissions reference](/docs/api-reference/permissions#supported-permissions)
- [Global `permissions` prop API reference](/docs/api-reference/components/puck#permissions)
- [Component `permissions` param API reference](/docs/api-reference/configuration/component-config#permissions)
- [Component `resolvePermissions` param API reference](/docs/api-reference/configuration/component-config#resolvepermissionsdata-params)


================================================
File: /apps/docs/pages/docs/integrating-puck/component-configuration.mdx
================================================
import { ConfigPreview, PuckPreview } from "@/docs/components/Preview";
import { Puck } from "@/core";

# Component Configuration

Puck's core behaviour is configured via the [Config](/docs/api-reference/configuration/config). This describes:

- which components are available to Puck
- how to render each component
- which fields to show when the user selects a component
- additional information, like [category grouping](categories)

The [Config](/docs/api-reference/configuration/config) is provided via the `config` prop to the main Puck components:

- [`<Puck>`](/docs/api-reference/components/puck) reads the Config and renders an editor UI. The user interacts with the editor to produce a [data payload](/docs/api-reference/data).
- [`<Render>`](/docs/api-reference/components/render) walks a [data payload](/docs/api-reference/data) and renders it according to the provided Config.

## The `render` function

Components can be defined by via the `components` object in [Config](/docs/api-reference/configuration/config). Every definition must provide a [`render` function](/docs/api-reference/configuration/component-config#renderprops):

```tsx showLineNumbers copy {4-6}
const config = {
  components: {
    HeadingBlock: {
      render: () => {
        return <h1>Hello, world</h1>;
      },
    },
  },
};
```

This tells Puck that **HeadingBlock** is a valid component, and describes how to render it.

When the user drags the component onto the preview and hits **Publish** in the editor UI via the `<Puck>` component, this Config will produce a [data payload](/docs/api-reference/data) like this:

```json copy
{
  "content": [
    {
      "type": "HeadingBlock",
      "props": {
        "id": "HeadingBlock-1234"
      }
    }
  ],
  "root": {}
}
```

The data payload and Config together tell `<Render>` how to render the page. It can also be provided to `<Puck>` as an [initial `data` payload](/docs/api-reference/components/puck#data).

<PuckPreview
  label="Try interacting with the heading"
  config={{
    components: {
      HeadingBlock: {
        render: () => {
          return <span>Hello, world</span>;
        },
      },
    },
  }}
  data={{
    content: [{ type: "HeadingBlock", props: { id: "HeadingBlock-1" } }],
    root: { props: {} },
  }}
>
  <Puck.Preview />
</PuckPreview>

### TypeScript

If you're using TypeScript, we recommend strictly typing your config:

```tsx copy {1,3-5} /Components/2
import type { Config } from "@measured/puck";

type Components = {
  HeadingBlock: {};
};

const config: Config<Components> = {
  components: {
    HeadingBlock: {
      render: () => {
        return <h1>Hello, world</h1>;
      },
    },
  },
};
```

## Adding fields

[Fields](/docs/api-reference/fields) allow users to provide input to components. The value of each field is passed in as a prop to the `render` function.

You can define a field via the [`fields` parameter](/docs/api-reference/configuration/component-config#fields):

```tsx showLineNumbers copy {5-7} /title/2,3
const config = {
  components: {
    HeadingBlock: {
      fields: {
        title: {
          type: "text",
        },
      },
      render: ({ title }) => {
        return <h1>{title}</h1>;
      },
    },
  },
};
```

This will render a [Text field](/docs/api-reference/fields/text) when the user selects an instance of the **HeadingBlock** component in the editor UI.

<ConfigPreview
  label='Text field example'
  componentConfig={{
    fields: {
      title: {
        type: "text",
      },
    },
    render: ({ title }) => {
      return <span>{title}</span>;
    },

}}
/>

When the user modifies the input, the editor will produce a data payload like this:

```json copy {7}
{
  "content": [
    {
      "type": "HeadingBlock",
      "props": {
        "id": "HeadingBlock-1234",
        "title": "Hello, world"
      }
    }
  ],
  "root": {}
}
```

### TypeScript

It's best to define the props for the component if using TypeScript. This enables strict type checking for your fields.

```tsx copy {5}
import type { Config } from "@measured/puck";

type Components = {
  HeadingBlock: {
    title: string;
  };
};

const config: Config<Components> = {
  // ...
};
```

## Setting default props

Default props allow you to set an initial value for a prop when a new component is added.

Provide an object to the [`defaultProps`](/docs/api-reference/configuration/component-config#fields) parameter to configure this:

```tsx showLineNumbers copy {9-11}
const config = {
  components: {
    HeadingBlock: {
      fields: {
        title: {
          type: "text",
        },
      },
      defaultProps: {
        title: "Hello, world",
      },
      render: ({ title }) => {
        return <h1>{title}</h1>;
      },
    },
  },
};
```

Unlike [default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters), `defaultProps` are stored in the data payload and will populate the Puck fields.

<ConfigPreview
  label="Text field example"
  componentConfig={{
    fields: {
      title: {
        type: "text",
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
    render: ({ title }) => {
      return <span>{title}</span>;
    },
  }}
/>


================================================
File: /apps/docs/pages/docs/integrating-puck/external-data-sources.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";

# External Data Sources

There are several different approaches for loading external data into a Puck component.

It's possible for Puck components to load their own data internally on the client, or on the server using [React server components](/docs/integrating-puck/server-components). This doesn't require any Puck configuration.

If you want to provide the user a way to select the data, you can use the [`external` field type](/docs/api-reference/fields/external).

## Selecting external data

The [`external` field type](/docs/api-reference/fields/external) allows users to select tabular data from a third-party data source, like a headless CMS. This will load the data once and save it into the [data payload](/docs/api-reference/data).

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      data: {
        type: "external",
        getItemSummary: (item) => item.title,
        fetchList: async () => {
          return [
            { title: "Hello, world", description: "Lorem ipsum 1" },
            { title: "Goodbye, world", description: "Lorem ipsum 2" },
          ];
        },
      },
    },
    render: ({ data }) => {
      if (!data) {
        return "No data selected";
      }

      return (
        <>
          <b>{data.title}</b>
          <p>{data.description}</p>
        </>
      );
    },

}}
/>

```tsx {5-17} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async () => {
            // Query an API for a list of items
            const items = await fetch(`/api/items`).then((res) => res.json());
            // [
            //   { title: "Hello, world", description: "Lorem ipsum 1" },
            //   { title: "Goodbye, world", description: "Lorem ipsum 2" },
            // ];

            return items;
          },
        },
      },
      render: ({ data }) => {
        if (!data) {
          return "No data selected";
        }

        return (
          <>
            <b>{data.title}</b>
            <p>{data.description}</p>
          </>
        );
      },
    },
  },
};
```

You can also use the [`showSearch` parameter](/docs/api-reference/fields/external#showsearch) to show a search input to the user.

## Data syncing

To keep the data in sync with the external source, we can combine the `external` field with the [`resolveData`](/docs/api-reference/configuration/component-config#resolvedatadata-params) function.

This technique re-fetches the content every time the page is loaded, or the [`resolveAllData` utility](/docs/api-reference/functions/resolve-all-data) is called.

```tsx showLineNumbers {19-37} /id: 0/1 /id: 1/ copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async () => {
            // Query an API for a list of items
            const items = await fetch(`/api/items`).then((res) => res.json());
            // [
            //   { title: "Hello, world", id: 0 },
            //   { title: "Goodbye, world", id: 1 },
            // ];

            return items;
          },
        },
      },
      resolveData: async ({ props }, { changed }) => {
        if (!props.data) return { props };

        // Don't query unless `data` has changed since resolveData was last run
        if (!changed.data) return { props };

        // Re-query the API for a particular item
        const latestData = await fetch(`/api/items/${props.data.id}`).then(
          (res) => res.json()
        );
        // { title: "Hello, world", description: "Lorem ipsum 1", id: 0 }

        return {
          props: {
            // Update the value for `data`
            data: latestData,
          },
        };
      },
      // ...
    },
  },
};
```

## Hybrid authoring

Hybrid authoring enables users to edit fields inline, or populate those fields with data from an external source.

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      data: {
        type: "external",
        getItemSummary: (item) => item.title,
        fetchList: async () => {
          return [
            { title: "Hello, world", description: "Lorem ipsum 1" },
            { title: "Goodbye, world", description: "Lorem ipsum 2" },
          ];
        },
      },
      title: {
        type: "text",
      },
    },
    resolveData: async ({ props }) => {
      if (!props.data) return { props,  readOnly: { title: false } };

      return {
        props: { title: props.data.title },
        readOnly: { title: true }
      };
    },
    render: ({ title }) => {
      return (
        <>
          <b>{title}</b>
        </>
      );
    },

}}
/>

This can be achieved by mapping the data from `data.title` to `title` in [`resolveData`](/docs/api-reference/configuration/component-config#resolvedatadata-params), and marking the field as read-only.

```tsx showLineNumbers {21,22} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          // ...
        },
        title: {
          type: "text",
        },
      },
      resolveData: async ({ props }, { changed }) => {
        // Remove read-only from the title field if `data` is empty
        if (!props.data) return { props, readOnly: { title: false } };

        // Don't query unless `data` has changed since resolveData was last run
        if (!changed.data) return { props };

        return {
          props: {
            title: props.data.title,
            readOnly: { title: true },
          },
        };
      },
      render: ({ title }) => <b>{title}</b>,
    },
  },
};
```

## External data packages

We provide helper packages to load data from common data sources.

- [`contentful`](https://github.com/measuredco/puck/tree/main/packages/field-contentful): Select content entries from a [Contentful](https://www.contentful.com) space.

## Further reading

- [`external` field API reference](/docs/api-reference/fields/external)
- [`resolveData` API reference](/docs/api-reference/configuration/component-config#resolvedatadata-params)
- [`resolveAllData` API reference](/docs/api-reference/functions/resolve-all-data)

<div id="puck-portal-root" />


================================================
File: /apps/docs/pages/docs/integrating-puck/viewports.mdx
================================================
# Viewports

The Puck preview renders in a same-origin iframe that can be resized to simulate different viewports.

## Default viewports

Puck provides 3 viewports [by default](/docs/api-reference/components/puck#default-viewports):

1. Small: 360px wide
2. Medium: 768px wide
3. Large: 1280px wide

Each of the default viewports have 100% height, filling the available space (via the `auto` height parameter).

## Customizing viewports

Customizing the available viewports using the [`viewports` API](/docs/api-reference/components/puck#viewports):

```tsx
export function Editor() {
  return (
    <Puck
      viewports={[
        {
          width: 1440,
          height: "auto", // Optional height. Can be numeric or "auto". Defaults to "auto".
          label: "My Viewport", // Optional. Shown in tooltip.
          icon: <svg />, // Optional. Use lucide-icons to align with Puck UI.
        },
      ]}
      // ...
    />
  );
}
```

## Opting out of iframes

Opt-out of iframe rendering by using the [`iframe` API](/docs/api-reference/components/puck#iframe):

```tsx
export function Editor() {
  return (
    <Puck
      iframe={{
        enabled: false,
      }}
      // ...
    />
  );
}
```

This which will disable all viewport functionality.

## Controlling viewports with custom interfaces

When implementing a [custom interface](/docs/extending-puck/custom-interfaces), the `viewports` API will have no effect. Instead, the viewport size can be controlled by the dimensions of the wrapping element that contains [`<Puck.Preview />`](/docs/api-reference/components/puck-preview).

CSS transforms can be used to zoom the viewport without impacting drag-and-drop behaviour.

```tsx {6-8}
import { Puck } from "@measured/puck";

export function Editor() {
  return (
    <Puck>
      <div style={{ transform: "scale(0.5)", width: 1280 }}>
        <Puck.Preview />
      </div>
    </Puck>
  );
}
```


================================================
File: /apps/docs/pages/docs/_meta.js
================================================
const menu = {
  index: {
    title: "Introduction",
  },
  "getting-started": {
    title: "Getting Started",
  },
  "integrating-puck": {
    title: "Integrating Puck",
  },
  "extending-puck": {
    title: "Extending Puck",
  },
  "api-reference": {
    title: "API Reference",
  },
};

export default menu;


================================================
File: /apps/docs/pages/docs/index.mdx
================================================
# Introduction

Welcome to the Puck documentation!

## What is Puck?

Puck is a modular, open-source visual editor for React.js. You can use Puck to build custom drag-and-drop experiences with your own application and React components.

Because Puck is just a React component, it plays well with all React.js environments, including Next.js. You own your data and there's no vendor lock-in.

Puck is also licensed under MIT, making it suitable for both internal systems and commercial applications.

## Main Features

| Feature                                                                   | Description                                                                                                          |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [Component Configuration](/docs/integrating-puck/component-configuration) | Integrate your own components with Puck by providing render functions and configuring fields that map to your props. |
| [Root Configuration](/docs/integrating-puck/root-configuration)           | Customize the root component that wraps all other Puck components.                                                   |
| [Multi-column Layouts](/docs/integrating-puck/multi-column-layouts)       | Use DropZones to build more multi-column layouts by nesting components.                                              |
| [Categories](/docs/integrating-puck/categories)                           | Group your components in the side bar.                                                                               |
| [Dynamic Props](/docs/integrating-puck/dynamic-props)                     | Dynamically set props after user input and mark fields as read-only                                                  |
| [Dynamic Fields](/docs/integrating-puck/dynamic-fields)                   | Dynamically set fields based on user input                                                                           |
| [External Data Sources](/docs/integrating-puck/external-data-sources)     | Load content from a third-party CMS or other data source                                                             |
| [Server Components](/docs/integrating-puck/server-components)             | Opt-in support for React Server Components                                                                           |
| [Data Migration](/docs/integrating-puck/data-migration)                   | Migrate between breaking Puck releases and your own breaking prop changes                                            |
| [Viewports](/docs/integrating-puck/viewports)                             | Preview and edit your content in a same-origin iframe to simulate different viewports                                |
| [Feature Toggling](/docs/integrating-puck/feature-toggling)               | Toggle Puck features, like duplication or deletion, via the permissions API.                                         |

## Join our Community

If you have any questions about Puck, please join us on [GitHub](https://github.com/measuredco/puck) or [Discord](https://discord.gg/D9e4E3MQVZ).

## Hire the Puck Team

Puck is developed and maintained by **Measured**, a small group of industry veterans with decades of experience helping companies solve hard UI problems. We offer consultancy and development services for scale-ups, SMEs and enterprises.

If you need support integrating Puck or creating a beautiful component library, please reach out via [our website](https://measured.co).

## License

Puck is licensed under MIT.


================================================
File: /apps/docs/pages/docs/api-reference/data.mdx
================================================
# Data

An object produced by Puck describing the shape of content.

```json copy
{
  "content": [
    {
      "type": "HeadingBlock",
      "props": {
        "id": "HeadingBlock-1234",
        "title": "Hello, world"
      }
    }
  ],
  "root": { "props": { "title": "Puck Example" } },
  "zones": {}
}
```

## Params

| Param                 | Example                                  | Type   | Status   |
| --------------------- | ---------------------------------------- | ------ | -------- |
| [`content`](#content) | `content: []`                            | Array  | Required |
| [`root`](#root)       | `root: { props: { title: "My page" } }`  | Object | Required |
| [`zones`](#zones)     | `zones: { "HeadingBlock-123:zone": [] }` | Object | -        |

### `content`

An array containing an object for each component in the main content region.

### `content[*]`

#### Params

| Param                          | Example                            | Type   | Status   |
| ------------------------------ | ---------------------------------- | ------ | -------- |
| [`type`](#contenttype)         | `type: "HeadingBlock"`             | String | Required |
| [`props`](#contentprops)       | `props: { title: "Hello, world" }` | Object | Required |
| [`readOnly`](#contentreadonly) | `readOnly: { title: true }`        | Object | -        |

#### Required params

##### `content[*].type`

The type of the component, which tells Puck to run the [`render()`](/docs/api-reference/configuration/component-config#renderprops) method for the component of the [same key](/docs/api-reference/config#components).

##### `content[*].props`

The props stored based on the [`component config`](/docs/api-reference/configuration/component-config) that Puck will pass to the [`render()`](/docs/api-reference/configuration/component-config#renderprops) method for the component of the [same key](/docs/api-reference/config#components).

```json {5-8} copy
{
  "content": [
    {
      "type": "HeadingBlock",
      "props": {
        "id": "HeadingBlock-1234",
        "title": "Hello, world"
      }
    }
  ],
  "root": {},
  "zones": {}
}
```

#### Optional params

##### `content[*].readOnly`

An object describing which fields are set to [read-only](/docs/api-reference/configuration/component-config#datareadonly-1).

```json {9-11} copy
{
  "content": [
    {
      "type": "HeadingBlock",
      "props": {
        "id": "HeadingBlock-1234",
        "title": "Hello, world"
      },
      "readOnly": {
        "title": true
      }
    }
  ],
  "root": {},
  "zones": {}
}
```

### `root`

An object describing data for the [`root` config](/docs/api-reference/configuration/config#root).

#### Params

| Param                       | Example                            | Type   | Status |
| --------------------------- | ---------------------------------- | ------ | ------ |
| [`props`](#rootprops)       | `props: { title: "Hello, world" }` | Object | -      |
| [`readOnly`](#rootreadonly) | `readOnly: { title: true }`        | Object | -      |

#### Optional params

##### `root.props`

The props stored based on the [`component config`](/docs/api-reference/configuration/component-config) that Puck will pass to the [`render()`](/docs/api-reference/configuration/component-config#renderprops) method for the [`root` config](/docs/api-reference/config#root).

```json {3} copy
{
  "content": [],
  "root": { "props": { "title": "Puck Example" } },
  "zones": {}
}
```

##### `root.readOnly`

An object describing which fields are set to [read-only](/docs/api-reference/configuration/component-config#datareadonly-1).

```json {4-6} copy
{
  "content": [],
  "root": {
    "readOnly": {
      "title": true
    }
  },
  "zones": {}
}
```

### `zones`

An object describing nested content regions for each [DropZone](/docs/api-reference/components/drop-zone).

#### `zones[zoneKey]`

An array describing the content for a particular region. Shares a shape with [`content`](#content).

`zoneKey` is a compound of the component `id` and [DropZone `zone`](/docs/api-reference/components/drop-zone#zone).

```json {5-13} copy showLineNumbers
{
  "content": [],
  "root": {},
  "zones": {
    "HeadingBlock-1234:my-content": [
      {
        "type": "HeadingBlock",
        "props": {
          "id": "HeadingBlock-1234",
          "title": "Hello, world"
        }
      }
    ]
  }
}
```


================================================
File: /apps/docs/pages/docs/api-reference/_meta.js
================================================
const menu = {
  components: {},
  configuration: {},
  fields: {},
  functions: {},
  overrides: {},
};

export default menu;


================================================
File: /apps/docs/pages/docs/api-reference/fields/_meta.js
================================================
const menu = {
  base: {
    title: "Base",
  },
};

export default menu;


================================================
File: /apps/docs/pages/docs/api-reference/fields/base.mdx
================================================
# Base

The base type shared by all fields.

## Params

| Param             | Example          | Type   | Status |
| ----------------- | ---------------- | ------ | ------ |
| [`label`](#label) | `label: "Title"` | String | -      |

## Optional params

### `label`

Set the label for the input. Puck will use the key if not provided.

```tsx {6} copy
const config = {
  components: {
    Example: {
      fields: {
        items: {
          label: "My Field",
          // ...
        },
      },
      // ...
    },
  },
};
```


================================================
File: /apps/docs/pages/docs/api-reference/fields/custom.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";

# Custom

Implement a field with a custom UI. Extends [Base](base).

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      title: {
        type: "custom",
        render: ({ name, onChange, value }) => {
          return (
            <input
              defaultValue={value}
              name={name}
              onChange={(e) => onChange(e.currentTarget.value)}
              style={{
                background: "white",
                border: "1px solid black",
                padding: 4,
              }}
            />
          );
        },
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
    render: ({ title }) => {
      return <p style={{ margin: 0 }}>{title}</p>;
    },
  }}
/>

```tsx {7-16} copy showLineNumbers
import { FieldLabel } from "@measured/puck";

const config = {
  components: {
    Example: {
      fields: {
        title: {
          type: "custom",
          render: ({ name, onChange, value }) => (
            <input
              defaultValue={value}
              name={name}
              onChange={(e) => onChange(e.currentTarget.value)}
            />
          ),
        },
      },
      render: ({ title }) => {
        return <p>{title}</p>;
      },
    },
  },
};
```

## Params

| Param                       | Example                   | Type     | Status   |
| --------------------------- | ------------------------- | -------- | -------- |
| [`type`](#type)             | `type: "custom"`          | "custom" | Required |
| [`render()`](#renderparams) | `render: () => <input />` | Function | Required |

## Required params

### `type`

The type of the field. Must be `"custom"` for Custom fields.

```tsx {6} showLineNumbers copy
const config = {
  components: {
    Example: {
      fields: {
        title: {
          type: "custom",
          render: ({ name, onChange, value }) => (
            <input
              defaultValue={value}
              name={name}
              onChange={(e) => onChange(e.currentTarget.value)}
            />
          ),
        },
      },
      // ...
    },
  },
};
```

### `render(params)`

Render the custom field.

```tsx {9-14} showLineNumbers copy
import { FieldLabel } from "@measured/puck";

const config = {
  components: {
    Example: {
      fields: {
        title: {
          type: "custom",
          render: ({ name, onChange, value }) => (
            <input
              defaultValue={value}
              name={name}
              onChange={(e) => onChange(e.currentTarget.value)}
            />
          ),
        },
      },
      // ...
    },
  },
};
```

#### `params`

| Param                 | Example                    | Type     |
| --------------------- | -------------------------- | -------- |
| `field`               | `{ type: "custom" }`       | Object   |
| `id`                  | `id`                       | String   |
| `name`                | `"title"`                  | String   |
| `onChange(value, ui)` | `onChange("Hello, world")` | Function |
| `value`               | `"Hello, world"`           | Any      |

##### onChange(value, [ui])

Set the value of the field and optionally update the [Puck UI state](/docs/api-reference/app-state#ui).

| Param   | Example                       | Type                                        | Status   |
| ------- | ----------------------------- | ------------------------------------------- | -------- |
| `value` | `"Hello, world"`              | Any                                         | Required |
| `ui`    | `{leftSideBarVisible: false}` | [UiState](/docs/api-reference/app-state#ui) |          |

## Further reading

- [Custom Fields guide](/docs/extending-puck/custom-fields)
- [The `<FieldLabel>` API reference](/docs/api-reference/components/field-label)


================================================
File: /apps/docs/pages/docs/api-reference/fields/external.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";

# External

Select data from a list, typically populated via a third-party API. Extends [Base](base).

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      data: {
        type: "external",
        fetchList: async () => {
          return [
            { title: "Hello, world", description: "Lorem ipsum 1" },
            { title: "Goodbye, world", description: "Lorem ipsum 2" },
          ];
        },
      },
    },
    render: ({ data }) => {
      return <p style={{ margin: 0 }}>{data?.title || "No data selected"}</p>;
    },
  }}
/>

```tsx {5-15} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async () => {
            // ... fetch data from a third party API, or other async source

            return [
              { title: "Hello, world", description: "Lorem ipsum 1" },
              { title: "Goodbye, world", description: "Lorem ipsum 2" },
            ];
          },
        },
      },
      render: ({ data }) => {
        return <p>{data?.title || "No data selected"}</p>;
      },
    },
  },
};
```

## Params

| Param                                     | Example                                      | Type       | Status   |
| ----------------------------------------- | -------------------------------------------- | ---------- | -------- |
| [`type`](#type)                           | `type: "external"`                           | "external" | Required |
| [`fetchList()`](#fetchlistqueryparams)    | `fetchList: async () => []`                  | Function   | Required |
| [`filterFields`](#filterfields)           | `{ "rating": { type: "number" } }`           | Object     | -        |
| [`getItemSummary()`](#getitemsummaryitem) | `getItemSummary: async ({ title }) => title` | Function   | -        |
| [`initialFilters`](#initialfilters)       | `{ "rating": 1 }`                            | Object     | -        |
| [`initialQuery`](#initialquery)           | `initialQuery: "Hello, world"`               | String     | -        |
| [`mapProp()`](#mappropitem)               | `mapProp: async ({ title }) => title`        | Function   | -        |
| [`mapRow()`](#maprowitem)                 | `mapRow: async ({ title }) => title`         | Function   | -        |
| [`placeholder`](#placeholder)             | `placeholder: "Select content"`              | String     | -        |
| [`renderFooter()`](#renderfooterprops)    | `renderFooter: (props) => <p>Hello</p>`      | Function   | -        |
| [`showSearch`](#showsearch)               | `showSearch: true`                           | Boolean    | -        |

## Required params

### `type`

The type of the field. Must be `"external"` for Array fields.

```tsx {6} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async () => {
            return [
              { title: "Hello, world", description: "Lorem ipsum 1" },
              { title: "Goodbye, world", description: "Lorem ipsum 2" },
            ];
          },
        },
      },
      // ...
    },
  },
};
```

### `fetchList(queryParams)`

Return a promise with a list of objects to be rendered in a tabular format via the external input modal.

The table will only render strings and numbers.

```tsx {7-14} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async () => {
            // ... fetch data from a third party API, or other async source

            return [
              { title: "Hello, world", description: "Lorem ipsum 1" },
              { title: "Goodbye, world", description: "Lorem ipsum 2" },
            ];
          },
        },
      },
      // ...
    },
  },
};
```

#### `queryParams`

The parameters passed to the `fetchList` method based on your field configuration.

| Param                 | Example             | Type   |
| --------------------- | ------------------- | ------ |
| [`query`](#query)     | `"My Query"`        | String |
| [`filters`](#filters) | `"{ "rating": 1 }"` | Object |

##### `query`

The search query when using [`showSearch`](#showsearch).

##### `filters`

An object describing the filters configured by [`filterFields`](#filterfields).

## Optional params

### `filterFields`

An object describing filters for your query using the [Fields API](/docs/api-reference/fields)

```tsx {13-17} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async ({ filters }) => {
            return [
              { title: "Apple", description: "Lorem ipsum 1", rating: 5 },
              { title: "Orange", description: "Lorem ipsum 2", rating: 3 },
            ].filter((item) => item.rating >= (filters.rating || 0));
          },
          filterFields: {
            rating: {
              type: "number",
            },
          },
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      data: {
        type: "external",
        fetchList: async ({ filters }) => {
          return [
            { title: "Apple", description: "Lorem ipsum 1", rating: 5 },
            { title: "Orange", description: "Lorem ipsum 2", rating: 3 },
          ].filter((item) =>
            item.rating >= (filters.rating || 0)
          )
        },
        filterFields: {
          rating: {
            type: "number",
          },
        },
      },
    },
    render: ({ data }) => {
      return <p>{data?.title || "No data selected"}</p>;
    },

}}
/>

### `getItemSummary(item)`

Get the label to show once the item is selected.

```tsx {13} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async () => {
            return [
              { title: "Hello, world", description: "Lorem ipsum 1" },
              { title: "Goodbye, world", description: "Lorem ipsum 2" },
            ];
          },
          getItemSummary: (item) => item.title,
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      data: {
        type: "external",
        fetchList: async () => {
          return [
            { title: "Hello, world", description: "Lorem ipsum 1" },
            { title: "Goodbye, world", description: "Lorem ipsum 2" },
          ];
        },
        getItemSummary: (item) => item.title,
      },
    },
    defaultProps: {
      data: {
        title: "Hello, world",
        description: "Lorem ipsum 1",
      },
    },
    render: ({ data }) => {
      return <p>{data?.title || "No data selected"}</p>;
    },
  }}
/>

### `initialFilters`

The initial filter values when using [`filterFields`](#filterfields).

```tsx {18-20} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async ({ filters }) => {
            return [
              { title: "Apple", description: "Lorem ipsum 1", rating: 5 },
              { title: "Orange", description: "Lorem ipsum 2", rating: 3 },
            ].filter((item) => item.rating >= (filters.rating || 0));
          },
          filterFields: {
            rating: {
              type: "number",
            },
          },
          initialFilters: {
            rating: 1,
          },
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      data: {
        type: "external",
        fetchList: async ({ filters }) => {
          return [
            { title: "Apple", description: "Lorem ipsum 1", rating: 5 },
            { title: "Orange", description: "Lorem ipsum 2", rating: 3 },
          ].filter((item) =>
            item.rating >= (filters.rating || 0)
          )
        },
        filterFields: {
          rating: {
            type: "number",
          },
        },
        initialFilters: {
          rating: 1,
        },
      },
    },
    render: ({ data }) => {
      return <p>{data?.title || "No data selected"}</p>;
    },

}}
/>

### `initialQuery`

Set an initial query when using showing a search input with [`showSearch`](#showsearch).

```tsx {16} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async ({ query }) => {
            return [
              { title: "Apple", description: "Lorem ipsum 1" },
              { title: "Orange", description: "Lorem ipsum 2" },
            ].filter((item) => {
              // ...
            });
          },
          showSearch: true,
          initialQuery: "Apple",
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      data: {
        type: "external",
        fetchList: async ({ query }) => {
          return [
            {
              title: "Apple",
              description:
                "An apple is a round, edible fruit produced by an apple tree.",
            },
            {
              title: "Orange",
              description:
                "An orange is a fruit of various citrus species in the family Rutaceae.",
            },
          ].filter((item) => {
            if (!query) return item;

            const queryLowercase = query.toLowerCase();

            if (item.title.toLowerCase().indexOf(queryLowercase) > -1) {
              return item;
            }

            if (item.description.toLowerCase().indexOf(queryLowercase) > -1) {
              return item;
            }
          })
        },
        showSearch: true,
        initialQuery: 'apple'
      },
    },
    render: ({ data }) => {
      return <p>{data?.title || "No data selected"}</p>;
    },

}}
/>

### `mapProp(item)`

Modify the shape of the item selected by the user in the table before writing to the page data.

```tsx {13} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async () => {
            return [
              { title: "Hello, world", description: "Lorem ipsum 1" },
              { title: "Goodbye, world", description: "Lorem ipsum 2" },
            ];
          },
          mapProp: (item) => item.description,
        },
      },
      render: ({ data }) => {
        return <p>{data || "No data selected"}</p>;
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      data: {
        type: "external",
        fetchList: async () => {
          return [
            { title: "Hello, world", description: "Lorem ipsum 1" },
            { title: "Goodbye, world", description: "Lorem ipsum 2" },
          ];
        },
        mapProp: (item) => item.description,
      },
    },
    render: ({ data }) => {
      return <p>{data || "No data selected"}</p>;
    },
  }}
/>

### `mapRow(item)`

Modify the shape of the item before rendering it in the table. This will not affect the selected data.

```tsx {13} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async () => {
            return [
              { title: "Hello, world", description: "Lorem ipsum 1" },
              { title: "Goodbye, world", description: "Lorem ipsum 2" },
            ];
          },
          mapRow: (item) => ({ ...item, title: item.title.toUpperCase() }),
        },
      },
      render: ({ data }) => {
        return <p>{data || "No data selected"}</p>;
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      data: {
        type: "external",
        fetchList: async () => {
          return [
            { title: "Hello, world", description: "Lorem ipsum 1" },
            { title: "Goodbye, world", description: "Lorem ipsum 2" },
          ];
        },
        mapRow: (item) => ({ ...item, title: item.title.toUpperCase() }),
      },
    },
    render: ({ data }) => {
      return <p>{data?.title || "No data selected"}</p>;
    },
  }}
/>

### `placeholder`

Set the placeholder text when no item is selected.

```tsx {13} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async () => {
            return [
              { title: "Apple", description: "Lorem ipsum 1" },
              { title: "Orange", description: "Lorem ipsum 2" },
            ];
          },
          placeholder: "Pick your favorite fruit",
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      data: {
        type: "external",
        fetchList: async () => {
          return [
            {
              title: "Apple",
              description:
                "An apple is a round, edible fruit produced by an apple tree.",
            },
            {
              title: "Orange",
              description:
                "An orange is a fruit of various citrus species in the family Rutaceae.",
            },
          ];
        },
        placeholder: "Pick your favorite fruit",
      },
    },
    render: ({ data }) => {
      return <p>{data?.title || "No data selected"}</p>;
    },
  }}
/>

### `renderFooter(props)`

Customize what will be displayed in the footer of the modal.

```tsx {13-15} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async () => {
            return [
              { title: "Hello, world", description: "Lorem ipsum 1" },
              { title: "Goodbye, world", description: "Lorem ipsum 2" },
            ];
          },
          renderFooter: ({ items }) => (
            <b>Custom footer with {items.length} results</b>
          ),
        },
      },
      render: ({ data }) => {
        return <p>{data || "No data selected"}</p>;
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      data: {
        type: "external",
        fetchList: async () => {
          return [
            { title: "Hello, world", description: "Lorem ipsum 1" },
            { title: "Goodbye, world", description: "Lorem ipsum 2" },
          ];
        },
        renderFooter: ({ items }) => (
          <b>Custom footer with {items.length} results</b>
        ),
      },
    },
    render: ({ data }) => {
      return <p>{data?.title || "No data selected"}</p>;
    },
  }}
/>

### `showSearch`

Show a search input, the value of which will be passed to `fetchList` as the `query` param.

```tsx {15} copy
const config = {
  components: {
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async ({ query }) => {
            return [
              { title: "Apple", description: "Lorem ipsum 1" },
              { title: "Orange", description: "Lorem ipsum 2" },
            ].filter((item) => {
              // ...
            });
          },
          showSearch: true,
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      data: {
        type: "external",
        fetchList: async ({ query }) => {
          return [
            {
              title: "Apple",
              description:
                "An apple is a round, edible fruit produced by an apple tree.",
            },
            {
              title: "Orange",
              description:
                "An orange is a fruit of various citrus species in the family Rutaceae.",
            },
          ].filter((item) => {
            if (!query) return item;

            const queryLowercase = query.toLowerCase();

            if (item.title.toLowerCase().indexOf(queryLowercase) > -1) {
              return item;
            }

            if (item.description.toLowerCase().indexOf(queryLowercase) > -1) {
              return item;
            }
          })
        },
        showSearch: true,
      },
    },
    render: ({ data }) => {
      return <p>{data?.title || "No data selected"}</p>;
    },

}}
/>

<div id="puck-portal-root" />


================================================
File: /apps/docs/pages/docs/api-reference/fields/number.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";

# Number

Render a `number` input. Extends [Base](base).

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      myNumber: {
        type: "number",
      },
    },
    defaultProps: { myNumber: 5 },
    render: ({ myNumber }) => {
      return <div>{myNumber}</div>;
    },
  }}
/>

```tsx {5-7} copy
const config = {
  components: {
    Example: {
      fields: {
        myNumber: {
          type: "number",
        },
      },
      render: ({ myNumber }) => {
        return <div>{myNumber}</div>;
      },
    },
  },
};
```

## Params

| Param           | Example          | Type     | Status   |
| --------------- | ---------------- | -------- | -------- |
| [`type`](#type) | `type: "number"` | "number" | Required |
| [`max`](#max)   | `max: 10`        | number   | -        |
| [`min`](#min)   | `min: 0`         | number   | -        |

## Required params

### `type`

The type of the field. Must be `"number"` for Number fields.

```tsx {6} copy
const config = {
  components: {
    Example: {
      fields: {
        myNumber: {
          type: "number",
        },
      },
      // ...
    },
  },
};
```

## Optional params

### `max`

The maximum numeric value allowed.

```tsx {7} copy
const config = {
  components: {
    Example: {
      fields: {
        myNumber: {
          type: "number",
          max: 10,
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      myNumber: {
        type: "number",
        max: 10,
      },
    },
    defaultProps: { myNumber: 5 },
    render: ({ myNumber }) => {
      return <div>{myNumber}</div>;
    },
  }}
/>

### `min`

The minimum numeric value allowed.

```tsx {7} copy
const config = {
  components: {
    Example: {
      fields: {
        myNumber: {
          type: "number",
          min: 0,
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      myNumber: {
        type: "number",
        min: 0,
      },
    },
    defaultProps: { myNumber: 5 },
    render: ({ myNumber }) => {
      return <div>{myNumber}</div>;
    },
  }}
/>


================================================
File: /apps/docs/pages/docs/api-reference/fields/radio.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";

# Radio

Render a `radio` input with a list of options. Extends [Base](base).

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      textAlign: {
        type: "radio",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
    },
    defaultProps: {
      textAlign: "left",
    },
    render: ({ textAlign }) => {
      return <p style={{ textAlign, margin: 0 }}>Hello, world</p>;
    },
  }}
/>

```tsx {5-11} copy
const config = {
  components: {
    Example: {
      fields: {
        textAlign: {
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: {
        textAlign: "left",
      },
      render: ({ textAlign }) => {
        return <p style={{ textAlign }}>Hello, world</p>;
      },
    },
  },
};
```

## Params

| Param                 | Example                                               | Type     | Status   |
| --------------------- | ----------------------------------------------------- | -------- | -------- |
| [`type`](#type)       | `type: "radio"`                                       | "radio"  | Required |
| [`options`](#options) | `options: [{ label: "Option 1", value: "option-1" }]` | Object[] | Required |

## Required params

### `type`

The type of the field. Must be `"radio"` for Array fields.

```tsx {6} copy
const config = {
  components: {
    Example: {
      fields: {
        textAlign: {
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
      },
      // ...
    },
  },
};
```

### `options`

The options for the radio field. The `value` can be a String, Number or Boolean.

```tsx {7-10} copy
const config = {
  components: {
    Example: {
      fields: {
        textAlign: {
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
      },
      // ...
    },
  },
};
```


================================================
File: /apps/docs/pages/docs/api-reference/fields/select.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";

# Select

Render a `select` input with a list of options. Extends [Base](base).

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      textAlign: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
    },
    render: ({ textAlign }) => {
      return <p style={{ textAlign, margin: 0 }}>Hello, world</p>;
    },
  }}
/>

```tsx {5-11} copy
const config = {
  components: {
    Example: {
      fields: {
        textAlign: {
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
      },
      render: ({ textAlign }) => {
        return <p style={{ textAlign }}>Hello, world</p>;
      },
    },
  },
};
```

## Params

| Param                 | Example                                               | Type     | Status   |
| --------------------- | ----------------------------------------------------- | -------- | -------- |
| [`type`](#type)       | `type: "select"`                                      | "select" | Required |
| [`options`](#options) | `options: [{ label: "Option 1", value: "option-1" }]` | Object[] | Required |

## Required params

### `type`

The type of the field. Must be `"select"` for Array fields.

```tsx {6} copy
const config = {
  components: {
    Example: {
      fields: {
        textAlign: {
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
      },
      // ...
    },
  },
};
```

### `options`

The options for the select field. The `value` can be a String, Number or Boolean.

```tsx {7-10} copy
const config = {
  components: {
    Example: {
      fields: {
        textAlign: {
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
      },
      // ...
    },
  },
};
```


================================================
File: /apps/docs/pages/docs/api-reference/fields/text.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";

# Text

Render a `text` input. Extends [Base](base).

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      title: {
        type: "text",
      },
    },
    defaultProps: { title: "Hello, world" },
    render: ({ title }) => {
      return <p style={{ margin: 0 }}>{title}</p>;
    },
  }}
/>

```tsx {5-7} copy
const config = {
  components: {
    Example: {
      fields: {
        title: {
          type: "text",
        },
      },
      render: ({ title }) => {
        return <p>{title}</p>;
      },
    },
  },
};
```

## Params

| Param           | Example        | Type   | Status   |
| --------------- | -------------- | ------ | -------- |
| [`type`](#type) | `type: "text"` | "text" | Required |

## Required params

### `type`

The type of the field. Must be `"text"` for Text fields.

```tsx {6} copy
const config = {
  components: {
    Example: {
      fields: {
        items: {
          type: "text",
        },
      },
      // ...
    },
  },
};
```


================================================
File: /apps/docs/pages/docs/api-reference/fields/textarea.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";

# Textarea

Render a `textarea` input. Extends [Base](base).

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      description: {
        type: "textarea",
      },
    },
    render: ({ description }) => {
      return <p>{description}</p>;
    },
    defaultProps: { description: "Hello, world" },
  }}
/>

```tsx {5-7} copy
const config = {
  components: {
    Example: {
      fields: {
        description: {
          type: "textarea",
        },
      },
      render: ({ description }) => {
        return <p>{description}</p>;
      },
    },
  },
};
```

## Params

| Param           | Example            | Type       | Status   |
| --------------- | ------------------ | ---------- | -------- |
| [`type`](#type) | `type: "textarea"` | "textarea" | Required |

## Required params

### `type`

The type of the field. Must be `"textarea"` for Textarea fields.

```tsx {6} copy
const config = {
  components: {
    Example: {
      fields: {
        description: {
          type: "textarea",
        },
      },
      // ...
    },
  },
};
```


================================================
File: /apps/docs/pages/docs/api-reference/fields/array.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";

# Array

Render a list of items with a subset of fields. Extends [Base](base).

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      items: {
        type: "array",
        arrayFields: {
          title: { type: "text" },
        },
      },
    },
    defaultProps: { items: [{ title: "Apple" }, { title: "Banana" }] },
    render: ({ items }) => {
      return (
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item.title}</li>
          ))}
        </ul>
      );
    },
  }}
/>

```tsx {5-10} copy
const config = {
  components: {
    Example: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
          },
        },
      },
      render: ({ items }) => {
        return (
          <ul>
            {items.map((item, i) => (
              <li key={i}>{item.title}</li>
            ))}
          </ul>
        );
      },
    },
  },
};
```

## Params

| Param                                           | Example                                       | Type     | Status   |
| ----------------------------------------------- | --------------------------------------------- | -------- | -------- |
| [`type`](#type)                                 | `type: "array"`                               | "array"  | Required |
| [`arrayFields`](#arrayfields)                   | `arrayFields: { title: { type: "text" } }`    | Object   | Required |
| [`defaultItemProps`](#defaultitemprops)         | `defaultItemProps: { title: "Hello, world" }` | String   | -        |
| [`getItemSummary()`](#getitemsummaryitem-index) | `getItemSummary: (item) => item.title`        | Function | -        |
| [`max`](#max)                                   | `max: 3`                                      | Number   | -        |
| [`min`](#min)                                   | `min: 1`                                      | Number   | -        |

## Required params

### `type`

The type of the field. Must be `"array"` for Array fields.

```tsx {6} copy
const config = {
  components: {
    Example: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
          },
        },
      },
      // ...
    },
  },
};
```

### `arrayFields`

Describe the fields for each item in the array. Shares an API with `fields`.

Can include any field type, including nested array fields.

```tsx {7-9} copy
const config = {
  components: {
    Example: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
          },
        },
      },
      // ...
    },
  },
};
```

## Optional params

### `defaultItemProps`

Set the default values when a new item is added to the array.

```tsx {10-12} copy
const config = {
  components: {
    Example: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
          },
          defaultItemProps: {
            title: "Hello, world",
          },
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      items: {
        type: "array",
        arrayFields: {
          title: { type: "text" },
        },
        defaultItemProps: {
          title: "Hello, world",
        },
      },
    },
    defaultProps: { items: [{ title: "Apple" }, { title: "Banana" }] },
    render: ({ items }) => {
      return (
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item.title}</li>
          ))}
        </ul>
      );
    },
  }}
/>

### `getItemSummary(item, index)`

Get a label of each item in the array.

```tsx {10} copy
const config = {
  components: {
    Example: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
          },
          getItemSummary: (item) => item.title || "Item",
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      items: {
        type: "array",
        arrayFields: {
          title: { type: "text" },
        },
        getItemSummary: (item) => item.title || "Item",
      },
    },
    defaultProps: { items: [{ title: "Apple" }, { title: "Banana" }] },
    render: ({ items }) => {
      return (
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item.title}</li>
          ))}
        </ul>
      );
    },
  }}
/>

### `max`

The maximum amount of items allowed in the array.

```tsx {10-10} copy
const config = {
  components: {
    Example: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
          },
          max: 3,
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      items: {
        type: "array",
        max: 3,
        arrayFields: {
          title: { type: "text" },
        },
      },
    },
    defaultProps: { items: [{ title: "Apple" }, { title: "Banana" }] },
    render: ({ items }) => {
      return (
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item.title}</li>
          ))}
        </ul>
      );
    },
  }}
/>

### `min`

The minimum amount of items allowed in the array.

```tsx {10-10} copy
const config = {
  components: {
    Example: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
          },
          min: 1,
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      items: {
        type: "array",
        min: 1,
        arrayFields: {
          title: { type: "text" },
        },
      },
    },
    defaultProps: { items: [{ title: "Apple" }, { title: "Banana" }] },
    render: ({ items }) => {
      return (
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item.title}</li>
          ))}
        </ul>
      );
    },
  }}
/>


================================================
File: /apps/docs/pages/docs/api-reference/fields/object.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";

# Object

Render an object with a subset of fields. Extends [Base](base).

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      params: {
        type: "object",
        objectFields: {
          title: { type: "text" },
        },
      },
    },
    defaultProps: { params: { title: "Hello, world" } },
    render: ({ params }) => {
      return <p>{params.title}</p>;
    },
  }}
/>

```tsx {5-10} copy
const config = {
  components: {
    Example: {
      fields: {
        params: {
          type: "object",
          objectFields: {
            title: { type: "text" },
          },
        },
      },
      render: ({ params }) => {
        return <p>{params.title}</p>;
      },
    },
  },
};
```

## Params

| Param                           | Example                                     | Type    | Status   |
| ------------------------------- | ------------------------------------------- | ------- | -------- |
| [`type`](#type)                 | `type: "array"`                             | "array" | Required |
| [`objectFields`](#objectfields) | `objectFields: { title: { type: "text" } }` | Object  | Required |

## Required params

### `type`

The type of the field. Must be `"object"` for Object fields.

```tsx {6} copy
const config = {
  components: {
    Example: {
      fields: {
        items: {
          type: "object",
          objectFields: {
            title: { type: "text" },
          },
        },
      },
      // ...
    },
  },
};
```

### `objectFields`

Describe the fields for the object. Shares an API with `fields`.

Can include any field type, including nested object fields.

```tsx {7-9} copy
const config = {
  components: {
    Example: {
      fields: {
        items: {
          type: "object",
          objectFields: {
            title: { type: "text" },
          },
        },
      },
      // ...
    },
  },
};
```


================================================
File: /apps/docs/pages/docs/api-reference/fields.mdx
================================================
# Fields

A field represents a user input shown in the Puck interface.

- [Base](fields/base) - The base type shared by all fields.
- [Array](fields/array) - Render a list of items with a subset of fields.
- [Custom](fields/custom) - Implement a field with a custom UI.
- [External](fields/external) - Select data from a list, typically populated via a third-party API.
- [Number](fields/number) - Render a `number` input.
- [Object](fields/object) - Render a subset of fields.
- [Radio](fields/radio) - Render a `radio` input with a list of options.
- [Select](fields/select) - Render a `select` input with a list of options.
- [Text](fields/text) - Render a `text` input.
- [Textarea](fields/textarea) - Render a `textarea` input.


================================================
File: /apps/docs/pages/docs/api-reference/permissions.mdx
================================================
# Permissions

Permissions enable the [toggling of Puck features](/docs/integrating-puck/feature-toggling). There are three types of permissions:

1. **Global permissions** are shared across the entire Puck application. Controlled via the `permissions` prop on the `<Puck>` component.
2. **Component permissions** allow feature control across for all instances of a given component type. Controlled by the `permissions` component config API.
3. **Dynamic permissions** enable control after each data change, and are ideal for per-instance component permissions. Controlled by the `resolvePermissions` component config API.

## APIs

### Setting permissions

1. Global [`permissions` prop](/docs/api-reference/components/puck#permissions)
2. Component [`permissions` parameter](/docs/api-reference/configuration/component-config#permissions)
3. Component [`resolvePermissions` parameter](/docs/api-reference/configuration/component-config#resolvepermissionsdata-params)

### Extending permissions

1. `getPermissions`
2. `refreshPermissions`

## Supported permissions

| Param                  | Example        | Type    | Default     | Status |
| ---------------------- | -------------- | ------- | ----------- | ------ |
| [`delete`](#delete)    | `delete: true` | Boolean | `true`      | -      |
| [`drag`](#drag)        | `drag: true`   | Boolean | `true`      | -      |
| [`edit`](#edit)        | `edit: true`   | Boolean | `true`      | -      |
| [`insert`](#insert)    | `insert: true` | Boolean | `true`      | -      |
| [`...custom`](#custom) | `myPerm: true` | Boolean | `undefined` | -      |

### `delete`

Enable deletion of components.

### `drag`

Enable component dragging. Disabling this will lock the component in place, but other components can still be dragged around it.

### `duplicate`

Enable duplication of components.

### `edit`

Enable field editing. This is the same as setting `readOnly` to `true` for all fields.

### `insert`

Enable insertion of new components. Disabling this will disable the component list items.

### `...custom`

Custom permissions enable you to control your own functionality when building [custom interfaces](/docs/extending-puck/custom-interfaces).


================================================
File: /apps/docs/pages/docs/api-reference/components/_meta.js
================================================
const menu = {
  "action-bar": {},
  "action-bar-action": {},
  "action-bar-group": {},
  "auto-field": {},
  drawer: {},
  "drawer-item": {},
  "drop-zone": {},
  "field-label": {},
  puck: {},
  "puck-components": {},
  "puck-fields": {},
  "puck-outline": {},
  "puck-preview": {},
  render: {},
};

export default menu;


================================================
File: /apps/docs/pages/docs/api-reference/components/drawer-item.mdx
================================================
---
title: <Drawer.Item>
---

import { PuckPreview } from "@/docs/components/Preview";
import { Drawer } from "@/core/components/Drawer";

# \<Drawer.Item\>

An item that can be dragged from a [`<Drawer>`](drawer).

```tsx {7} copy
import { Puck, Drawer } from "@measured/puck";

export function Editor() {
  return (
    <Puck>
      <Drawer>
        <Drawer.Item name="Orange" index={0} />
      </Drawer>
    </Puck>
  );
}
```

## Props

| Prop                    | Example                   | Type     | Status   |
| ----------------------- | ------------------------- | -------- | -------- |
| [`name`](#name)         | `name: "Orange"`          | String   | Required |
| [`index`](#index)       | `index: 0`                | Number   | Required |
| [`children`](#children) | `children: () => <div />` | Function | -        |
| [`id`](#id)             | `id: "OrangeComponent"`   | String   | -        |

## Required props

### `name`

The name of this drawer item.

- This will be rendered on the item by default.
- Will be used as the `id`, unless otherwise specified

### `index`

A numerical index for each item in the drawer.

- Must be sequential, i.e. `0`, `1`, `2`.
- Must start at `0`.

## Optional props

### `children`

A custom render function to render inside the component.

```tsx {8} copy
import { Puck, Drawer } from "@measured/puck";

export function Editor() {
  return (
    <Puck>
      <Drawer>
        <Drawer.Item name="Orange" index={0}>
          {() => <div>Orange 🍊</div>}
        </Drawer.Item>
      </Drawer>
    </Puck>
  );
}
```

<PuckPreview config={{}} data={{ root: { props: {} }, content: [] }}>
  <Drawer>
    <Drawer.Item name="Orange" index={0}>
      {() => <div>Orange 🍊</div>}
    </Drawer.Item>
  </Drawer>
</PuckPreview>

#### Render Props

| Prop                      | Example             | Type   |
| ------------------------- | ------------------- | ------ |
| [`children`](#children-1) | `children: <div />` | String |

##### `children`

The original node for the drawer item.

### `id`

A unique id for this drawer item. Defaults to the value of [`name`](#name).

If using the `<Drawer>` as a component list to be dragged into `<Puck.Preview>`, this should be the key of a component defined in the [Config](/docs/api-reference/configuration/config).


================================================
File: /apps/docs/pages/docs/api-reference/components/render.mdx
================================================
---
title: <Render>
---

# \<Render\>

Render a [`Data`](/docs/api-reference/data) object for a given [`Config`](/docs/api-reference/config).

```tsx copy showLineNumbers
import { Render } from "@measured/puck";

export function Example() {
  return <Render config={config} data={data} />;
}
```

## Props

| Param               | Example                      | Type                                 | Status   |
| ------------------- | ---------------------------- | ------------------------------------ | -------- |
| [`config`](#config) | `config: { components: {} }` | [Config](/docs/api-reference/config) | Required |
| [`data`](#data)     | `data: {}`                   | [Data](/docs/api-reference/data)     | Required |

## Required props

### `config`

An object describing the available components, fields and more. See the [`Config` docs](/docs/api-reference/configuration/config) for a full reference.

```tsx {4-17} copy
export function Example() {
  return (
    <Render
      config={{
        components: {
          HeadingBlock: {
            fields: {
              children: {
                type: "text",
              },
            },
            render: ({ children }) => {
              return <h1>{children}</h1>;
            },
          },
        },
      }}
      // ...
    />
  );
}
```

### `data`

The data to render against the provided config. See the [`Data` docs](/docs/api-reference/data) for a full reference.

```tsx {4-12} copy
export function Example() {
  return (
    <Render
      data={{
        content: [
          {
            props: { children: "Hello, world", id: "id" },
            type: "HeadingBlock",
          },
        ],
        root: {},
      }}
      // ...
    />
  );
}
```


================================================
File: /apps/docs/pages/docs/api-reference/components/puck.mdx
================================================
---
title: <Puck>
---

# \<Puck\>

Render the Puck editor.

```tsx copy
import { Puck } from "@measured/puck";

const config = {
  components: {},
};

const initialData = {
  content: [],
  root: {},
};

export function Editor() {
  return <Puck config={config} data={initialData} />;
}
```

## Props

| Param                                                 | Example                                            | Type                                               | Status       |
| ----------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | ------------ |
| [`config`](#config)                                   | `config: { components: {} }`                       | [Config](/docs/api-reference/configuration/config) | Required     |
| [`data`](#data)                                       | `data: {}`                                         | [Data](/docs/api-reference/data)                   | Required     |
| [`dnd`](#dnd)                                         | `dnd: {}`                                          | [DndConfig](#dnd-params)                           | -            |
| [`children`](#children)                               | `children: <Puck.Preview />`                       | ReactNode                                          | -            |
| [`headerPath`](#headerpath)                           | `headerPath: "/my-page"`                           | String                                             | -            |
| [`headerTitle`](#headertitle)                         | `headerTitle: "My Page"`                           | String                                             | -            |
| [`iframe`](#iframe)                                   | `iframe: {}`                                       | [IframeConfig](#iframe-params)                     | -            |
| [`initialHistory`](#initialhistory)                   | `initialHistory: {}`                               | [InitialHistory](#initialhistory-params)           | -            |
| [`onAction()`](#onactionaction-appstate-prevappstate) | `onAction: (action, appState, prevAppState) => {}` | Function                                           | -            |
| [`onChange()`](#onchangedata)                         | `onChange: (data) => {}`                           | Function                                           | -            |
| [`onPublish()`](#onpublishdata)                       | `onPublish: async (data) => {}`                    | Function                                           | -            |
| [`overrides`](#overrides)                             | `overrides: { header: () => <div /> }`             | [Overrides](/docs/api-reference/overrides)         | Experimental |
| [`permissions`](#permissions)                         | `permissions: {}`                                  | [Plugin\[\]](/docs/api-reference/plugin)           | Experimental |
| [`plugins`](#plugins)                                 | `plugins: [myPlugin]`                              | [Plugin\[\]](/docs/api-reference/plugin)           | Experimental |
| [`ui`](#ui)                                           | `ui: {leftSideBarVisible: false}`                  | [AppState.ui](/docs/api-reference/app-state#ui)    | -            |
| [`viewports`](#viewports)                             | `viewports: [{ width: 1440 }]`                     | [Viewport\[\]](#viewport-params)                   | -            |

## Required props

### `config`

An object describing the available components, fields and more. See the [`Config` docs](/docs/api-reference/configuration/config) for a full reference.

```tsx {4-17} copy
export function Editor() {
  return (
    <Puck
      config={{
        components: {
          HeadingBlock: {
            fields: {
              children: {
                type: "text",
              },
            },
            render: ({ children }) => {
              return <h1>{children}</h1>;
            },
          },
        },
      }}
      // ...
    />
  );
}
```

### `data`

The initial data to render. Cannot be changed once `<Puck>` has been mounted. See the [`Data` docs](/docs/api-reference/data) for a full reference.

```tsx {4-12} copy
export function Editor() {
  return (
    <Puck
      data={{
        content: [
          {
            props: { children: "Hello, world", id: "id" },
            type: "HeadingBlock",
          },
        ],
        root: {},
      }}
      // ...
    />
  );
}
```

## Optional props

### `children`

Render custom nodes to create [custom interfaces](/docs/extending-puck/custom-interfaces).

```tsx {4} copy
export function Editor() {
  return (
    <Puck /*...*/>
      <Puck.Preview />
    </Puck>
  );
}
```

### `dnd`

Configure drag-and-drop behavior.

#### dnd params

| Param                                     | Example                   | Type    | Status |
| ----------------------------------------- | ------------------------- | ------- | ------ |
| [`disableAutoScroll`](#disableautoscroll) | `disableAutoScroll: true` | boolean | -      |

##### `disableAutoScroll`

Disable auto-scroll when the user drags an item near the edge of the preview area.

### `headerPath`

Set a path to show after the header title

```tsx {4} copy
export function Editor() {
  return (
    <Puck
      headerPath="/my-page"
      // ...
    />
  );
}
```

### `headerTitle`

Set the title shown in the header

```tsx {4} copy
export function Editor() {
  return (
    <Puck
      headerPath="My page"
      // ...
    />
  );
}
```

### `iframe`

Configure the iframe behaviour.

```tsx {4} copy
export function Editor() {
  return (
    <Puck
      iframe={{ enabled: false }}
      // ...
    />
  );
}
```

#### iframe params

| Param                           | Example                | Type    | Status |
| ------------------------------- | ---------------------- | ------- | ------ |
| [`enabled`](#enabled)           | `enabled: false`       | boolean | -      |
| [`waitForStyles`](#deferrender) | `waitForStyles: false` | boolean | -      |

##### `enabled`

Render the Puck preview within iframe. Defaults to `true`.

Disabling iframes will also disable [viewports](#viewports).

##### `waitForStyles`

Defer rendering of the Puck preview until the iframe styles have loaded, showing a spinner. Defaults to `true`.

### `initialHistory`

Sets the undo/redo Puck history state when using the `usePuck` [history API](/docs/api-reference/functions/use-puck#history).

```tsx showLineNumbers copy {12-15}
const historyState = {
  data: {
    root: {
      props: { title: "My History" },
    },
  },
};

export function Editor() {
  return (
    <Puck
      initialHistory={{
        histories: [{ state: historyState }],
        index: 0,
      }}
      // ...
    />
  );
}
```

#### `initialHistory` params

| Param                       | Example             | Type                                                                 | Status   |
| --------------------------- | ------------------- | -------------------------------------------------------------------- | -------- |
| [`histories`](#histories)   | `histories: []`     | [History](/docs/api-reference/functions/use-puck#history-params)\[\] | Required |
| [`index`](#index)           | `index: 2`          | Number                                                               | Required |
| [`appendData`](#appenddata) | `appendData: false` | Boolean                                                              | -        |

##### `histories`

An array of histories to reset the Puck state history state to.

##### `index`

The index of the histories to set the user to.

##### `appendData`

Append the Puck [`data`](#data) prop onto the end of [`histories`](#histories). Defaults to `true`.

When `false`, the Puck `data` prop will be ignored but you must specify at least one item in the `histories` array.

### `onAction(action, appState, prevAppState)`

Callback that triggers when Puck dispatches an [action](https://puckeditor.com/docs/api-reference/actions), like `insert` or `set`. Use this to track changes, perform side effects, or sync with external systems.

Receives three arguments:

1. `action`: The action that was dispatched
2. `appState`: The new [`AppState`](/docs/api-reference/app-state) after the action was applied
3. `prevAppState`: The previous [`AppState`](/docs/api-reference/app-state) before the action was applied

```tsx {4-8} copy
export function Editor() {
  return (
    <Puck
      onAction={(action, appState, prevAppState) => {
        if (action.type === "insert") {
          console.log("New component was inserted", appState);
        }
      }}
      // ...
    />
  );
}
```

### `onChange(data)`

Callback that triggers when the user makes a change.

Receives a single [`Data`](/docs/api-reference/data) arg.

```tsx {4-6} copy
export function Editor() {
  return (
    <Puck
      onChange={(data) => {
        console.log("Puck data was updated", data);
      }}
      // ...
    />
  );
}
```

### `onPublish(data)`

Callback that triggers when the user hits the "Publish" button. Use this to save the Puck data to your database.

Receives a single [`Data`](/docs/api-reference/data) arg.

```tsx {4-9} copy
export function Editor() {
  return (
    <Puck
      onPublish={async (data) => {
        await fetch("/my-api", {
          method: "post",
          body: JSON.stringify({ data }),
        });
      }}
      // ...
    />
  );
}
```

### `overrides`

An [`Overrides`](/docs/api-reference/overrides) object defining custom render methods for various parts of the Puck UI.

```tsx {4-6} copy
export function Editor() {
  return (
    <Puck
      overrides={{
        header: () => <div />,
      }}
      // ...
    />
  );
}
```

### `permissions`

Set the global [permissions](/docs/api-reference/permissions) for the Puck instance to toggle Puck functionality.

```tsx {4-6} copy
export function Editor() {
  return (
    <Puck
      permissions={{
        delete: false, // Prevent deletion of all components
      }}
      // ...
    />
  );
}
```

### `plugins`

An array of plugins to enhance Puck's behaviour. See the [Plugin API reference](/docs/api-reference/plugin).

```tsx {6} copy
import headingAnalyzer from "@measured/puck-plugin-heading-analyzer";

export function Editor() {
  return (
    <Puck
      plugins={[headingAnalyzer]}
      // ...
    />
  );
}
```

### `ui`

Set the initial application UI state. See [`AppState.ui`](/docs/api-reference/app-state#ui).

```tsx {5} copy
export function Editor() {
  return (
    <Puck
      // Hide the left side bar by default
      ui={{ leftSideBarVisible: false }}
      // ...
    />
  );
}
```

### `viewports`

Configure the viewports available to the user, rendered as an iframe. Puck will select the most appropriate initial viewport based on the user's window size, unless otherwise specified via the [`ui`](#ui) prop.

```tsx {4-8} copy
export function Editor() {
  return (
    <Puck
      viewports={[
        {
          width: 1440,
        },
      ]}
      // ...
    />
  );
}
```

#### Viewport params

| Param               | Example           | Type                                                     | Status   |
| ------------------- | ----------------- | -------------------------------------------------------- | -------- |
| [`width`](#width)   | `width: 1440`     | number                                                   | Required |
| [`height`](#height) | `height: 968`     | number \| `"auto"`                                       | -        |
| [`icon`](#icon)     | `icon: "Monitor"` | `"Smartphone"` \| `"Tablet"` \| `"Monitor"` \| ReactNode | -        |
| [`label`](#label)   | `label: "iPhone"` | string                                                   | -        |

##### `width`

The width of the viewport.

##### `height`

An optional height for the viewport. Defaults to `auto`, which will fit to the window.

##### `label`

An optional label for the viewport. This is used for browser tooltip.

##### `icon`

The icon to show in the viewport switcher. Can be:

- `"Smartphone"`
- `"Tablet"`
- `"Monitor"`
- ReactNode

Puck uses [Lucide icons](https://lucide.dev/icons/). You can use [lucide-react](https://lucide.dev/guide/packages/lucide-react) to choose a similar icon, if desired.

#### Default viewports

By default, Puck exposes small, medium and large viewports based on common viewport sizes.

```json
[
  {
    "width": 360,
    "height": "auto",
    "icon": "Smartphone",
    "label": "Small"
  },
  {
    "width": 768,
    "height": "auto",
    "icon": "Tablet",
    "label": "Medium"
  },
  {
    "width": 1280,
    "height": "auto",
    "icon": "Monitor",
    "label": "Large"
  }
]
```


================================================
File: /apps/docs/pages/docs/api-reference/components/drawer.mdx
================================================
---
title: <Drawer>
---

import { PuckPreview } from "@/docs/components/Preview";
import { Drawer } from "@/core/components/Drawer";
import { Puck } from "@/core/components/Puck";

# \<Drawer\>

A vertical or horizontal list of items that can be dragged into a [`<Puck.Preview>`](puck-preview). Used for composing custom Puck UIs.

<PuckPreview
  config={{ components: { Orange: { render: () => <div>Orange</div> } } }}
  data={{ root: { props: {} }, content: [] }}
>
  <Drawer droppableId="example">
    <Drawer.Item name="Orange" index={0} />
  </Drawer>
</PuckPreview>

```tsx {6-8} /Drawer/1 copy
import { Puck, Drawer } from "@measured/puck";

export function Editor() {
  return (
    <Puck>
      <Drawer>
        <Drawer.Item name="Orange" index={0} />
      </Drawer>
    </Puck>
  );
}
```

## Props

| Param                         | Example                     | Type                     | Status   |
| ----------------------------- | --------------------------- | ------------------------ | -------- |
| [`children`](#children)       | `children: <Drawer.Item />` | ReactNode                | Required |
| [`direction`](#direction)     | `direction: "horizontal"`   | `horizontal`, `vertical` | -        |
| [`droppableId`](#droppableId) | `droppableId: "my-drawer"`  | String                   | -        |

## Required props

### `children`

A React node representing the contents of the `<Drawer>`. Will likely contain [`<Drawer.Item>`](drawer-item) nodes.

## Optional props

### `direction`

Set the direction of the drawer.

Defaults to `vertical`.

### `droppableId`

Set a custom ID for the underlying [Droppable](https://github.com/hello-pangea/dnd/blob/main/docs/api/droppable.md).

- Must be unique.
- Will be prefixed with `component-list:`.

Defaults to `default`.


================================================
File: /apps/docs/pages/docs/api-reference/components/field-label.mdx
================================================
---
title: <FieldLabel>
---

import { ConfigPreview } from "../../../../components/Preview";
import { FieldLabel } from "@/core/components/AutoField";
import { Globe } from "lucide-react";

# \<FieldLabel\>

Render a styled `label` when creating [`custom` fields](/docs/api-reference/fields/custom).

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      title: {
        type: "custom",
        render: () => {
          return (
            <FieldLabel label="Title">
              <input
                style={{ background: "white", border: "1px solid black" }}
              />
            </FieldLabel>
          );
        },
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
  }}
/>

```tsx {1,4-6} copy
import { FieldLabel } from "@measured/puck";

const CustomField = () => (
  <FieldLabel label="Title">
    <input />
  </FieldLabel>
);

const config = {
  components: {
    Example: {
      fields: {
        title: {
          type: "custom",
          render: MyCustomField,
        },
      },
    },
  },
};
```

## Props

| Param                     | Example                | Type             | Status   |
| ------------------------- | ---------------------- | ---------------- | -------- |
| [`label`](#label)         | `label: "Title"`       | String           | Required |
| [`children`](#children)   | `children: <div />`    | ReactNode        | -        |
| [`className`](#classname) | `className: "MyLabel"` | String           | -        |
| [`el`](#el)               | `el: false`            | "label" \| "div" | -        |
| [`icon`](#icon)           | `icon: <svg />`        | ReactNode        | -        |
| [`readOnly`](#readonly)   | `readOnly: false`      | Boolean          | -        |

## Required props

### `label`

The label string for the fields.

```tsx /label="Title"/ copy
import { FieldLabel } from "@measured/puck";

const CustomField = () => (
  <FieldLabel label="Title">
    <input />
  </FieldLabel>
);

// ...
```

## Optional props

### `children`

A node to render inside the FieldLabel's internal `<label>` element. You can also define your input element as a sibling.

```tsx {5} copy
import { FieldLabel } from "@measured/puck";

const CustomField = () => (
  <FieldLabel label="Title">
    <input />
  </FieldLabel>
);

// ...
```

### `className`

Define a custom class for the field label.

```tsx /className="MyClass"/ copy
import { FieldLabel } from "@measured/puck";

const CustomField = () => (
  <FieldLabel className="MyClass" label="Title">
    <input />
  </FieldLabel>
);

// ...
```

### `el`

Specify whether to render a `label` or `div`. **Defaults to `"label"`**.

```tsx /el="div"/ copy
import { FieldLabel } from "@measured/puck";

const CustomField = () => (
  <FieldLabel el="div" label="Title">
    <input />
  </FieldLabel>
);

// ...
```

### `icon`

Render an icon before the label text. Puck uses [lucide-react](https://lucide.dev/guide/packages/lucide-react) internally.

```tsx /icon={<Globe size="16" />}/ copy
import { FieldLabel } from "@measured/puck";
import { Globe } from "lucide-react";

const CustomField = () => (
  <FieldLabel icon={<Globe size="16" />} label="Title">
    <input />
  </FieldLabel>
);

// ...
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      title: {
        type: "custom",
        render: () => {
          return (
            <FieldLabel label="Title" icon={<Globe size="16" />}>
              <input style={{ border: "1px solid black" }} />
            </FieldLabel>
          );
        },
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
  }}
/>

### `readOnly`

Indicate to the user that this field is in a read-only state by showing a padlock icon to the right of the text.

```tsx /readOnly/1 copy
import { FieldLabel } from "@measured/puck";

const CustomField = () => (
  <FieldLabel label="Title" readOnly>
    <input readOnly />
  </FieldLabel>
);

// ...
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      title: {
        type: "custom",
        render: () => {
          return (
            <div style={{ maxWidth: "max-content" }}>
              <FieldLabel label="Title" readOnly>
                <input style={{ border: "1px solid black" }} readOnly />
              </FieldLabel>
            </div>
          );
        },
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
  }}
/>


================================================
File: /apps/docs/pages/docs/api-reference/components/auto-field.mdx
================================================
---
title: <AutoField>
---

import { ConfigPreview } from "@/docs/components/Preview";
import { AutoField } from "@/core/components/AutoField";

# \<AutoField\>

Render a Puck field based on a [Field](/docs/api-reference/fields) object. Use this when building [custom fields](/docs/extending-puck/custom-fields) that need to use Puck-style fields internally.

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      title: {
        type: "custom",
        render: ({ onChange, value }) => {
          return (
            <AutoField
              field={{ type: "text" }}
              onChange={onChange}
              value={value}
            />
          );
        },
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
    render: ({ title }) => {
      return <p style={{ margin: 0 }}>{title}</p>;
    },
  }}
/>

```tsx {1,4} copy
import { Autofield } from "@measured/puck";

const CustomField = ({ onChange, value }) => (
  <AutoField field={{ type: "text" }} onChange={onChange} value={value} />
);

const config = {
  components: {
    Example: {
      fields: {
        title: {
          type: "custom",
          render: MyCustomField,
        },
      },
    },
  },
};
```

## Props

| Prop                    | Example                      | Type                                | Status   |
| ----------------------- | ---------------------------- | ----------------------------------- | -------- |
| [`field`](#field)       | `{ type: "text" }`           | [Field](/docs/api-reference/fields) | Required |
| [`onChange`](#onchange) | `onChange("Goodbye, world")` | Function                            | Required |
| [`value`](#value)       | `"Hello, world"`             | Any                                 | Required |
| [`id`](#id)             | `"my-input"`                 | String                              | -        |
| [`readOnly`](#readonly) | `true`                       | Boolean                             | -        |

## Required Props

### `field`

An object containing the user defined [Field](/docs/api-reference/fields) configuration.

### `onChange`

A callback that triggers when the value changes.

### `value`

The current value for the field.

## Optional Props

### `id`

An optional ID for this field. Will be generated if not specified.

### `readOnly`

A boolean describing whether or not this field is `readOnly`.

## Further reading

- [Custom fields](/docs/extending-puck/custom-fields)
- [The `<FieldLabel>` API reference](/docs/api-reference/components/field-label)


================================================
File: /apps/docs/pages/docs/api-reference/components/action-bar-group.mdx
================================================
---
title: <ActionBar.Group>
---

import { PuckPreview } from "@/docs/components/Preview";
import { ActionBar } from "@/core/components/ActionBar";

# \<ActionBar.Group\>

Render an action group in the [`<ActionBar>`](action-bar).

```tsx showLineNumbers {2-3} copy
<ActionBar label="Actions">
  <ActionBar.Group>Group 1</ActionBar.Group>
  <ActionBar.Group>Group 2</ActionBar.Group>
</ActionBar>
```

<PuckPreview>
  <div style={{ display: "flex" }}>
    <ActionBar label="Actions">
      <ActionBar.Group>Group 1</ActionBar.Group>
      <ActionBar.Group>Group 2</ActionBar.Group>
    </ActionBar>
  </div>
</PuckPreview>

## Props

| Prop                    | Example   | Type      | Status   |
| ----------------------- | --------- | --------- | -------- |
| [`children`](#children) | `<div />` | ReactNode | Required |

## Required Props

### `children`

A node to render as the children of the action. If a fragment, the items will be rendered in a flex row.

Normally contains [`<ActionBar.Action>`](action-bar-action)


================================================
File: /apps/docs/pages/docs/api-reference/components/puck-fields.mdx
================================================
---
title: <Puck.Fields>
---

import { PuckPreview } from "@/docs/components/Preview";
import { Puck } from "@/core";

# \<Puck.Fields\>

Render the fields for the currently selected item in [`<Puck.Preview>`](/docs/api-reference/components/puck-preview) when composing a custom Puck UI.

<PuckPreview
  config={{
    components: {
      HeadingBlock: {},
    },
  }}
  data={{ root: { props: {} }, content: [] }}
  style={{ padding: 4 }}
>
  <Puck.Fields />
</PuckPreview>

```tsx {14} showLineNumbers copy
import { Puck } from "@measured/puck";

export function Editor() {
  return (
    <Puck>
      <Puck.Fields />
    </Puck>
  );
}
```

## Props

This component doesn't accept any props.


================================================
File: /apps/docs/pages/docs/api-reference/components/puck-components.mdx
================================================
---
title: <Puck.Components>
---

import { PuckPreview } from "@/docs/components/Preview";
import { Puck } from "@/core";

# \<Puck.Components\>

Render a draggable list of components based on the [user-defined components](/docs/api-reference/configuration/config#components) when composing a custom Puck UI. Respects the [`categories` API](/docs/api-reference/configuration/config#categories).

<PuckPreview
  config={{
    components: {
      HeadingBlock: {},
      ParagraphBlock: {},
    },
  }}
  data={{ root: { props: {} }, content: [] }}
>
  <Puck.Components />
</PuckPreview>

```tsx {} showLineNumbers copy
import { Puck } from "@measured/puck";

export function Editor() {
  return (
    <Puck>
      <Puck.Components />
    </Puck>
  );
}
```

## Props

This component doesn't accept any props.


================================================
File: /apps/docs/pages/docs/api-reference/components/action-bar.mdx
================================================
---
title: <ActionBar>
---

import { PuckPreview } from "@/docs/components/Preview";
import { ActionBar } from "@/core/components/ActionBar";

# \<ActionBar\>

Render the Puck ActionBar. Use this when overriding the [actionBar](/docs/api-reference/overrides/action-bar).

```tsx showLineNumbers copy
<ActionBar label="Actions">
  <ActionBar.Group>
    <ActionBar.Action onClick={() => console.log("Clicked!")}>
      ★
    </ActionBar.Action>
  </ActionBar.Group>
</ActionBar>
```

<PuckPreview>
  <div style={{ display: "flex" }}>
    <ActionBar label="Actions">
      <ActionBar.Group>
        <ActionBar.Action onClick={() => console.log("Clicked!")}>
          ★
        </ActionBar.Action>
      </ActionBar.Group>
    </ActionBar>
  </div>
</PuckPreview>

## Props

| Prop                    | Example   | Type      | Status   |
| ----------------------- | --------- | --------- | -------- |
| [`children`](#children) | `<div />` | ReactNode | Required |
| [`label`](#label)       | `"Label"` | String    | Required |

## Required Props

### `children`

The children for the ActionBar. Normally a fragment of [`<ActionBar.Action>` components](/docs/api-reference/components/action-bar-action).

If this is a fragment, it will be rendered in a flex row.

### `label`

The label for the ActionBar.


================================================
File: /apps/docs/pages/docs/api-reference/components/action-bar-action.mdx
================================================
---
title: <ActionBar.Action>
---

import { PuckPreview } from "@/docs/components/Preview";
import { ActionBar } from "@/core/components/ActionBar";

# \<ActionBar.Action\>

Render an action button in the [`<ActionBar>`](action-bar). Normally used inside an [`<ActionBar.Group>`](action-bar-group).

```tsx showLineNumbers {3-5} copy
<ActionBar label="Actions">
  <ActionBar.Group>
    <ActionBar.Action onClick={() => console.log("Clicked!")}>
      ★
    </ActionBar.Action>
  </ActionBar.Group>
</ActionBar>
```

<PuckPreview>
  <div style={{ display: "flex" }}>
    <ActionBar label="Actions">
      <ActionBar.Group>
        <ActionBar.Action onClick={() => console.log("Clicked!")}>
          ★
        </ActionBar.Action>
      </ActionBar.Group>
    </ActionBar>

  </div>
</PuckPreview>

## Props

| Prop                    | Example      | Type      | Status   |
| ----------------------- | ------------ | --------- | -------- |
| [`children`](#children) | `<svg />`    | ReactNode | Required |
| [`onClick`](#on-clicke) | `() => void` | Function  | -        |
| [`label`](#label)       | `"Label"`    | String    | -        |

## Required Props

### `children`

A node to render as the children of the action. Should be a string or an icon.

Puck uses [Lucide icons](https://lucide.dev/icons/). You can use [lucide-react](https://lucide.dev/guide/packages/lucide-react) to choose a similar icon, if desired.

### `onClick(e)`

An [onClick callback](https://react.dev/learn/responding-to-events) triggered when the user clicks the action.

## Optional Props

### `label`

A label to provide an accessible label when using icon.


================================================
File: /apps/docs/pages/docs/api-reference/components/puck-outline.mdx
================================================
---
title: <Puck.Outline>
---

import { PuckPreview } from "@/docs/components/Preview";
import { Puck } from "@/core";

# \<Puck.Outline\>

Render an interactive outline of the current data payload when composing a custom Puck UI.

<PuckPreview
  config={{
    components: {
      HeadingBlock: { render: () => <div>Hello world</div> },
      ParagraphBlock: {},
    },
  }}
  data={{
    root: { props: {} },
    content: [{ type: "HeadingBlock", props: { id: "HeadingBlock-123" } }],
  }}
>
  <Puck.Outline />
  {/* Outline doesn't render unless Preview is rendered due to zone flushing */}
  <div style={{ display: "none" }}>
    <Puck.Preview />
  </div>
</PuckPreview>

```tsx {12} showLineNumbers copy
import { Puck } from "@measured/puck";

export function Editor() {
  return (
    <Puck>
      <Puck.Outline />
    </Puck>
  );
}
```

## Props

This component doesn't accept any props.


================================================
File: /apps/docs/pages/docs/api-reference/components/puck-preview.mdx
================================================
---
title: <Puck.Preview>
---

import { PuckPreview } from "@/docs/components/Preview";
import { Puck } from "@/core";

# \<Puck.Preview\>

Render a drag-and-drop preview for the current data when composing a custom Puck UI.

<PuckPreview
  config={{
    components: {
      HeadingBlock: {
        fields: {title: {type: 'text'}},
        render: ({title}) => <div>{title}</div>
      }
    }
  }}
  data={{
    root: { props: {} },
    content: [{ type: "HeadingBlock", props: { id: "HeadingBlock-123", title: 'Hello, world' } }],
  }}
>

  <Puck.Preview />
</PuckPreview>

```tsx {17} showLineNumbers copy
import { Puck } from "@measured/puck";

export function Editor() {
  return (
    <Puck>
      <Puck.Preview />
    </Puck>
  );
}
```

## Props

| Param       | Example                    | Type   | Status |
| ----------- | -------------------------- | ------ | ------ |
| [`id`](#id) | `id: "my-preview-content"` | String | -      |

## Optional props

### `id`

A unique identifier for the preview frame. Default: `puck-preview`.

```tsx {6} copy
import { Puck } from "@measured/puck";

export function Editor() {
  return (
    <Puck>
      <Puck.Preview id="my-frame" />
    </Puck>
  );
}
```


================================================
File: /apps/docs/pages/docs/api-reference/components/drop-zone.mdx
================================================
---
title: <DropZone>
---

# \<DropZone\>

Place droppable regions (zones) inside other components to enable nested components.

```tsx {1,9} copy
import { DropZone } from "@measured/puck";

const config = {
  components: {
    Example: {
      render: () => {
        return (
          <div>
            <DropZone zone="my-content" />
          </div>
        );
      },
    },
  },
};
```

## Props

| Param                   | Example                      | Type   | Status   |
| ----------------------- | ---------------------------- | ------ | -------- |
| [`zone`](#zone)         | `zone: "my-zone"`            | String | Required |
| [`allow`](#allow)       | `allow: ["HeadingBlock"]`    | Array  |          |
| [`disallow`](#disallow) | `disallow: ["HeadingBlock"]` | Array  |          |

## Required props

### `zone`

Set the zone identifier for the given DropZone.

Must be unique within this component, but two different components can both define DropZones with the same `zone` value.

```tsx /zone="my-content"/ copy
const config = {
  components: {
    Example: {
      render: () => {
        return (
          <div>
            <DropZone zone="my-content" />
          </div>
        );
      },
    },
  },
};
```

## Optional props

### `allow`

Only allow specific components to be dragged into the DropZone:

```tsx copy {7}
const config = {
  components: {
    Example: {
      render: () => {
        return (
          <div>
            <DropZone zone="my-content" allow={["HeadingBlock"]} />
          </div>
        );
      },
    },
  },
};
```

### `disallow`

Allow all but specific components to be dragged into the DropZone. Any items in `allow` will override `disallow`.

```tsx copy {7}
const config = {
  components: {
    Example: {
      render: () => {
        return (
          <div>
            <DropZone zone="my-content" disallow={["HeadingBlock"]} />
          </div>
        );
      },
    },
  },
};
```

## Restrictions

You can't drag between DropZones that don't share a parent component.

## React server components

By default, DropZones don't work with React server components as they rely on context.

Instead, you can use the [`renderDropZone` method](/docs/api-reference/configuration/component-config#propspuckrenderdropzone) passed to your component render function.


================================================
File: /apps/docs/pages/docs/api-reference/plugin.mdx
================================================
# Plugin

> **⚠️ The plugin API is highly experimental and is likely to experience breaking changes.**

A plugins is an extensions that enhances the capabilities of Puck.

```tsx showLineNumbers copy {3-9, 15}
import { Puck } from "@measured/puck";

const MyPlugin = {
  overrides: {
    componentItem: ({ name }) => (
      <div style={{ backgroundColor: "hotpink" }}>{name}</div>
    ),
  },
};

export function Editor() {
  return (
    <Puck
      // ...
      plugins={[MyPlugin]}
    />
  );
}
```

## Params

| Prop                      | Example                                | Type                                       | Status |
| ------------------------- | -------------------------------------- | ------------------------------------------ | ------ |
| [`overrides`](#overrides) | `overrides: { fields: () => <div /> }` | [Overrides](/docs/api-reference/overrides) | -      |

### `overrides`

Override the render functions for specific portions of the Puck UI. Implements the [`overrides` API](/docs/api-reference/overrides).


================================================
File: /apps/docs/pages/docs/api-reference/actions.mdx
================================================
# Actions

Actions enable you to make changes to the internal [AppState](/docs/api-reference/app-state) via the [dispatcher](/docs/api-reference/functions/use-puck#dispatch).

This is a partial reference of the most useful actions. A full reference is available in [the codebase](https://github.com/measuredco/puck/blob/main/packages/core/reducer/actions.tsx).

## Types

### `setData`

Modify the [data payload](/docs/api-reference/data) currently managed by Puck.

| Param  | Example           | Type                             | Status   |
| ------ | ----------------- | -------------------------------- | -------- |
| `type` | `type: "setData"` | "setData"                        | Required |
| `data` | `data: {}`        | [Data](/docs/api-reference/data) | Required |

#### Example

```tsx
dispatch({
  type: "setData",
  data: {},
});
```

### `setUi`

Change a value on Puck's [UI state](/docs/api-reference/app-state#ui).

| Param  | Example                             | Type                                         | Status   |
| ------ | ----------------------------------- | -------------------------------------------- | -------- |
| `type` | `type: "setUi"`                     | "setUi"                                      | Required |
| `ui`   | `ui: { leftSideBarVisible: false }` | [UiState](/docs/api-reference/app-state/#ui) | Required |

#### Example

```tsx
dispatch({
  type: "setUi",
  ui: {
    leftSideBarVisible: false,
  },
});
```

### `set`

Change the entire [AppState](/docs/api-reference/app-state) in a single action.

| Param   | Example                       | Type                                      | Status   |
| ------- | ----------------------------- | ----------------------------------------- | -------- |
| `type`  | `type: "set"`                 | "set"                                     | Required |
| `state` | `state: { data: {}, ui: {} }` | [AppState](/docs/api-reference/app-state) | Required |

#### Example

```tsx
dispatch({
  type: "set",
  state: { data: {}, ui: {} },
});
```


================================================
File: /apps/docs/pages/docs/api-reference/functions.mdx
================================================
# Functions

- [migrate](functions/migrate) - Migrate a legacy [data payload](/docs/api-reference/data) to the latest shape.
- [resolveAllData](functions/resolve-all-data) - Utility function to execute all [`resolveData` methods](/docs/api-reference/configuration/component-config#resolvedatadata-params) on a data payload.
- [transformProps](functions/transform-props) - Transform component props stored in the [data payload](/docs/api-reference/data). Use this for migrations, like prop renames.
- [usePuck](functions/use-puck) - A hook for building custom components that can interact with Puck.


================================================
File: /apps/docs/pages/docs/api-reference/overrides/preview.mdx
================================================
---
title: preview
---

# preview

Override the drag-and-drop preview.

```tsx copy
const overrides = {
  preview: ({ children }) => <div>{children}</div>,
};
```

## Props

| Prop                    | Example   | Type      |
| ----------------------- | --------- | --------- |
| [`children`](#children) | `<div />` | ReactNode |

### `children`

The default node for the preview.


================================================
File: /apps/docs/pages/docs/api-reference/overrides/_meta.js
================================================
const menu = {
  "action-bar": {},
  "component-item": {},
  components: {},
  "field-label": {},
  "field-types": {},
  fields: {},
  "header-actions": {},
  header: {},
  iframe: {},
  outline: {},
  preview: {},
  puck: {},
};

export default menu;


================================================
File: /apps/docs/pages/docs/api-reference/overrides/header-actions.mdx
================================================
---
title: headerActions
---

# headerActions

Override the header actions. Return a fragment so your items appear inline.

```tsx copy
const overrides = {
  headerActions: ({ children }) => (
    <>
      {children}
      <button>Click me</button>
    </>
  ),
};
```

## Props

| Prop                    | Example   | Type      |
| ----------------------- | --------- | --------- |
| [`children`](#children) | `<div />` | ReactNode |

### `children`

The default node for the header actions, which includes the default publish button.


================================================
File: /apps/docs/pages/docs/api-reference/overrides/puck.mdx
================================================
---
title: puck
---

# puck

Override the Puck children. This is the equivalent of passing in [`children`](/docs/api-reference/components/puck#children) to the [`<Puck>`](/docs/api-reference/components/puck) component.

```tsx copy
const overrides = {
  puck: ({ children }) => <div>{children}</div>,
};
```

## Props

| Prop                    | Example   | Type      |
| ----------------------- | --------- | --------- |
| [`children`](#children) | `<div />` | ReactNode |

### `children`

The default node for the [`<Puck>`](/docs/api-reference/components/puck) children.


================================================
File: /apps/docs/pages/docs/api-reference/overrides/fields.mdx
================================================
---
title: fields
---

# fields

Override the fields wrapper.

```tsx copy
const overrides = {
  fields: ({ children }) => <div>{children}</div>,
};
```

## Props

| Prop                    | Example   | Type      |
| ----------------------- | --------- | --------- |
| [`children`](#children) | `<div />` | ReactNode |

### `children`

The default node for the fields.


================================================
File: /apps/docs/pages/docs/api-reference/overrides/field-types.mdx
================================================
---
title: fieldTypes
---

# fieldTypes

Override each [field type](/docs/api-reference/fields).

```tsx copy
const overrides = {
  fieldType: {
    number: ({ onChange }) => (
      <input type="number" onChange={(e) => onChange(e.currentTarget.value)} />
    ),
    text: ({ onChange }) => (
      <input type="text" onChange={(e) => onChange(e.currentTarget.value)} />
    ),
    // ...
  },
};
```

You can specify a custom render method for each known [field type](/docs/api-reference/fields), or introduce completely new ones.

## Render Props

Extends the [`<AutoField>` API](/docs/api-reference/components/auto-field).

| Prop                    | Example     | Type                                                           |
| ----------------------- | ----------- | -------------------------------------------------------------- |
| [`children`](#children) | `<input />` | ReactNode                                                      |
| [`name`](#name)         | `"title"`   | string                                                         |
| `...`                   | `{}`        | [`<AutoField>` API](/docs/api-reference/components/auto-field) |

### `children`

The default node for this field type.

### `name`

The name of the prop this field is rendering for.


================================================
File: /apps/docs/pages/docs/api-reference/overrides/outline.mdx
================================================
---
title: outline
---

# outline

Override the outline.

```tsx copy
const overrides = {
  outline: ({ children }) => <div>{children}</div>,
};
```

## Props

| Prop                    | Example   | Type      |
| ----------------------- | --------- | --------- |
| [`children`](#children) | `<div />` | ReactNode |

### `children`

The default node for the outline.


================================================
File: /apps/docs/pages/docs/api-reference/overrides/field-label.mdx
================================================
---
title: fieldLabel
---

# fieldLabel

Override the label for all internal fields.

```tsx copy
const overrides = {
  fieldLabel: ({ children, label }) => (
    <label>
      <div>{label}</div>
      {children}
    </label>
  ),
};
```

## Props

See [FieldLabel](/docs/api-reference/components/field-label) component.


================================================
File: /apps/docs/pages/docs/api-reference/overrides/iframe.mdx
================================================
---
title: iframe
---

# iframe

Override the root of the iframe.

```tsx copy
const overrides = {
  iframe: ({ children, document }) => {
    useEffect(() => {
      if (document) {
        document.body.setAttribute("style", "background: hotpink;");
      }
    }, [document]);

    return <>{children}</>;
  },
};
```

## Props

| Prop                    | Example   | Type      |
| ----------------------- | --------- | --------- |
| [`document`](#document) | `{}`      | Document  |
| [`children`](#children) | `<div />` | ReactNode |

### `document`

The document of the iframe window.

### `children`

The default node for the iframe.


================================================
File: /apps/docs/pages/docs/api-reference/overrides/header.mdx
================================================
---
title: header
---

# header

Override the header.

```tsx copy
const overrides = {
  header: ({ actions }) => (
    <header>
      <span>My header</span>
      <div>{actions}</div>
    </header>
  ),
};
```

## Props

| Prop                    | Example   | Type      |
| ----------------------- | --------- | --------- |
| [`actions`](#actions)   | `<div />` | ReactNode |
| [`children`](#children) | `<div />` | ReactNode |

### `actions`

A node containing the [`headerActions`](header-actions).

### `children`

The default node for the header.


================================================
File: /apps/docs/pages/docs/api-reference/overrides/action-bar.mdx
================================================
---
title: actionBar
---

# actionBar

Override the action bar. Use the [`<ActionBar>` component](/docs/api-reference/components/action-bar) to extend the default ActionBar UI.

```tsx copy
import { ActionBar } from "@measured/puck";

const overrides = {
  actionBar: ({ children }) => (
    <ActionBar label="Actions">
      <ActionBar.Group>{children}</ActionBar.Group>
    </ActionBar>
  ),
};
```

## Props

| Prop                    | Example   | Type      |
| ----------------------- | --------- | --------- |
| [`children`](#children) | `<div />` | ReactNode |

### `children`

A fragment containing the default [actions](/docs/api-reference/components/action-bar-action). This should normally be rendered inside an [`<ActionBar.Group>`](/docs/api-reference/components/action-bar-group).


================================================
File: /apps/docs/pages/docs/api-reference/overrides/components.mdx
================================================
---
title: components
---

# components

Override the component list.

```tsx copy
const overrides = {
  components: ({ children }) => <div>{children}</div>,
};
```

## Props

| Prop                    | Example   | Type      |
| ----------------------- | --------- | --------- |
| [`children`](#children) | `<div />` | ReactNode |

### `children`

The default node for the component list.


================================================
File: /apps/docs/pages/docs/api-reference/overrides/component-item.mdx
================================================
---
title: componentItem
---

# componentItem

Override an individual item within the component list.

```tsx copy
const overrides = {
  componentItem: ({ name }) => <div>{name}</div>,
};
```

## Props

| Prop                    | Example    | Type      |
| ----------------------- | ---------- | --------- |
| [`children`](#children) | `<div />`  | ReactNode |
| [`name`](#name)         | `"Button"` | ReactNode |

### `children`

The default node for the component item.

### `name`

THe name of the component item.


================================================
File: /apps/docs/pages/docs/api-reference/configuration.mdx
================================================
# Configuration

- [Config](configuration/config) - The main configuration object describing what Puck can render.
- [ComponentConfig](configuration/component-config) - The configuration of each component defined in the main config.


================================================
File: /apps/docs/pages/docs/api-reference/app-state.mdx
================================================
# `AppState`

> **⚠️ The application state is unstable and is likely to experience breaking changes.**

The internal state of the [`<Puck>`](/docs/api-reference/components/puck) component.

## `data`

The current [`Data`](/docs/api-reference/data) payload being managed by Puck.

## `ui`

The current state of the Puck editor interface.

| Param                                           | Example                                               | Type    |
| ----------------------------------------------- | ----------------------------------------------------- | ------- |
| [`arrayState`](#uiarraystate)                   | `{}`                                                  | Object  |
| [`componentList`](#uicomponentlist)             | `{ typography: { components: [ "HeadingBlock" ] } }`  | Object  |
| [`field.focus`](#fieldfocus)                    | `"title"`                                             | String  |
| [`isDragging`](#isdragging)                     | `false`                                               | Boolean |
| [`itemSelector`](#uiitemselector)               | `{ index: 0, zone: "my-content" }`                    | Object  |
| [`leftSideBarVisible`](#uileftsidebarvisible)   | `false`                                               | Boolean |
| [`rightSideBarVisible`](#uirightsidebarvisible) | `false`                                               | Boolean |
| [`viewports`](#uiviewports)                     | `{ controlsVisible: true, current: {}, options: [] }` | Object  |

---

### `ui.arrayState`

An object describing the internal state of array items

---

### `ui.componentList`

An object describing the component list. Similar shape to the [categories API](/docs/api-reference/configuration/config#categories)

#### `ui.componentList[key].components`

Array containing the names of components in this category

#### `ui.componentList[key].title`

Title of the category

#### `ui.componentList[key].visible`

Whether or not the category is visible in the side bar

#### `ui.componentList[key].expanded`

Whether or not the category is expanded in the side bar

---

### `ui.field.focus`

The name of the currently focused field.

---

### `ui.isDragging`

A boolean stating whether or not the user is currently dragging a component.

---

### `ui.itemSelector`

An object describing which item is selected.

#### `ui.itemSelector.index`

The index of the item within the zone.

#### `ui.itemSelector.zone`

The zone that the item is defined within. **Defaults to [main content zone](/docs/api-reference/data#content).**

---

### `ui.leftSideBarVisible`

Whether or not the left side bar is visible.

---

### `ui.rightSideBarVisible`

Whether or not the right side bar is visible.

---

### `ui.viewports`

| Param                                            | Example                           | Type                                                                 |
| ------------------------------------------------ | --------------------------------- | -------------------------------------------------------------------- |
| [`controlsVisible`](#uiviewportscontrolsvisible) | `false`                           | Boolean                                                              |
| [`current`](#uiviewportscurrent)                 | `{ width: 1440, height: "auto" }` | Object                                                               |
| [`options`](#uiviewportsoptions)                 | `[]`                              | [Viewports\[\]](/docs/api-reference/components/puck#viewport-params) |

#### `ui.viewports.controlsVisible`

Whether or not the viewport controls are visible.

#### `ui.viewports.current`

The currently selected viewport.

| Param                                 | Example  | Type               |
| ------------------------------------- | -------- | ------------------ |
| [`width`](#uiviewportscurrentwidth)   | `1440`   | Number             |
| [`height`](#uiviewportscurrentheight) | `"auto"` | Number \| `"auto"` |

##### `ui.viewports.current.width`

The width of the current viewport.

##### `ui.viewports.current.height`

The height of the current viewport.

#### `ui.viewports.options`

The available viewport options, as provided via the [`viewports` API](/docs/api-reference/components/puck#viewports).


================================================
File: /apps/docs/pages/docs/api-reference/configuration/_meta.js
================================================
const menu = {
  config: {},
};

export default menu;


================================================
File: /apps/docs/pages/docs/api-reference/configuration/config.mdx
================================================
# Config

The main configuration object describing what Puck can render.

```tsx copy
const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }) => {
        return <h1>{children}</h1>;
      },
    },
  },
};
```

## Params

| Param                       | Example                                                        | Type                                                                    | Status   |
| --------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------- | -------- |
| [`components`](#components) | `components: { HeadingBlock: {{ render: () => <h1 /> } }`      | Object                                                                  | Required |
| [`root`](#root)             | `root: { render: () => <div /> }`                              | [`ComponentConfig`](/docs/api-reference/configuration/component-config) | -        |
| [`categories`](#categories) | `categories: { typography: { components: ["HeadingBlock"] } }` | Object                                                                  | -        |

## Required params

### `components`

An object describing the components available to Puck. Each component definition implements the [`ComponentConfig` API](/docs/api-reference/configuration/component-config).

```tsx {2-13} copy showLineNumbers
const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }) => {
        return <h1>{children}</h1>;
      },
    },
  },
};
```

## Optional params

### `root`

An object describing the root of your component tree. This component wraps the rest of your components. Implements the [`ComponentConfig` API](/docs/api-reference/configuration/component-config).

- You must return children to render the internal Puck [`DropZone`](/docs/api-reference/components/drop-zone).

```tsx {2-6} copy showLineNumbers
const config = {
  root: {
    render: ({ children }) => {
      return <div>{children}</div>;
    },
  },
  // ...
};
```

### `categories`

An object describing categories for your components. Will be used to group the components in the left side-bar.

```tsx {2-6} copy showLineNumbers
const config = {
  categories: {
    typography: {
      components: ["HeadingBlock"],
    },
  },
  // ...
};
```

#### `categories[key].components`

An array of components in this category.

- Must use names of [`components`](#components).
- A component can appear in more than one category.

#### `categories[key].title`

The user-facing title for the category. Will use the `category` key if not provided.

#### `categories[key].visible`

A boolean describing whether or not the category should be visible in the side bar. **Defaults to `true`**.

#### `categories[key].defaultExpanded`

A boolean describing whether or not the category should be expanded by default in the side bar. **Defaults to `true`**.

#### `categories["other"]`

The default category for all uncategorized components. Receives all other categories params.


================================================
File: /apps/docs/pages/docs/api-reference/configuration/component-config.mdx
================================================
---
title: ComponentConfig
---

import { ConfigPreview, PuckPreview } from "@/docs/components/Preview";
import { Drawer } from "@/core/components/Drawer";

# ComponentConfig

The configuration for each component defined in [`Config`](/docs/api-reference/configuration/config).

```tsx {3-10} copy
const config = {
  components: {
    HeadingBlock: {
      fields: {
        title: {
          type: "text",
        },
      },
      render: ({ title }) => <h1>{title}</h1>,
    },
  },
};
```

## Params

| Param                                                    | Example                                          | Type     | Status   |
| -------------------------------------------------------- | ------------------------------------------------ | -------- | -------- |
| [`render()`](#renderprops)                               | `render: () => <div />`                          | Function | Required |
| [`fields`](#fields)                                      | `fields: { title: { type: "text"} }`             | Object   | -        |
| [`defaultProps`](#defaultprops)                          | `defaultProps: { title: "Hello, world" }`        | Object   | -        |
| [`label`](#label)                                        | `label: "Heading Block"`                         | String   | -        |
| [`permissions()`](#permissions)                          | `permissions: { delete: false }`                 | Object   | -        |
| [`resolveData()`](#resolvedatadata-params)               | `resolveData: async ({ props }) => ({ props })`  | Object   | -        |
| [`resolveFields()`](#resolvefieldsdata-params)           | `resolveFields: async ({ props }) => ({})}`      | Object   | -        |
| [`resolvePermissions()`](#resolvepermissionsdata-params) | `resolvePermissions: async ({ props }) => ({})}` | Object   | -        |

## Required params

### `render(props)`

A render function to render your component. Receives props as defined in `fields`, and some internal Puck props.

```tsx {4} copy
const config = {
  components: {
    HeadingBlock: {
      render: () => <h1>Hello, world</h1>,
    },
  },
};
```

#### Render props

| Arg                                          | Example       | Type     |
| -------------------------------------------- | ------------- | -------- |
| [`id`](#id)                                  | `button-1234` | String   |
| [`puck.isEditing`](#puckisediting)           | `false`       | Boolean  |
| [`puck.renderDropZone`](#puckrenderdropzone) | `() => {}`    | Function |
| [`...props`](#props)                         | `{}`          | Object   |

##### `id`

A unique ID generated by Puck for this component. You can optionally apply this, or use your own ID.

##### `puck.isEditing`

A boolean describing whether or not this component is being rendered in the `<Puck>` component.

##### `puck.renderDropZone`

A render method that creates a [`<DropZone>`](/docs/api-reference/components/drop-zone) for creating nested components. Use this method instead of the `<DropZone>` when implementing React server components.

```tsx {5} /renderDropZone/1 copy
const config = {
  components: {
    Example: {
      render: ({ puck: { renderDropZone } }) => {
        return <div>{renderDropZone({ zone: "my-content" })}</div>;
      },
    },
  },
};
```

##### `...props`

The remaining props are provided by the user-defined [fields](#fields).

## Optional params

### `fields`

An object describing which [`Field`](/docs/api-reference/fields) to show for each prop passed to the component.

```tsx {4-8} copy showLineNumbers
const config = {
  components: {
    HeadingBlock: {
      fields: {
        title: {
          type: "text",
        },
      },
      render: ({ title }) => <h1>{title}</h1>,
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      title: {
        type: "text",
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
    render: ({ title }) => {
      return <p style={{ margin: 0 }}>{title}</p>;
    },
  }}
/>

### `defaultProps`

Default props to apply to a new instance of the component.

```tsx {9} copy showLineNumbers
const config = {
  components: {
    HeadingBlock: {
      fields: {
        title: {
          type: "text",
        },
      },
      defaultProps: { title: "Hello, world" },
      render: ({ title }) => <h1>{title}</h1>,
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      title: {
        type: "text",
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
    render: ({ title }) => {
      return <p style={{ margin: 0 }}>{title}</p>;
    },
  }}
/>

### `label`

A label to show when referring to your component within the Puck editor. Defaults to the key of your component.

```tsx {4} copy showLineNumbers
const config = {
  components: {
    HeadingBlock: {
      label: "Heading Block",
      render: () => <h1>Hello, World</h1>,
    },
  },
};
```

<PuckPreview config={{}} data={{ root: { props: {} }, content: [] }}>
  <Drawer>
    <Drawer.Item name="Heading Block" index={0} />
  </Drawer>
</PuckPreview>

### `permissions`

Set the [permissions](/docs/api-reference/permissions) for all instances of a component to toggle functionality. Inherits [global permissions](/docs/api-reference/components/puck/#permissions).

```tsx {4-6} copy showLineNumbers
const config = {
  components: {
    HeadingBlock: {
      permissions: {
        delete: false, // Disable deletion of all HeadingBlock instances
      },
      render: () => <h1>Hello, World</h1>,
    },
  },
};
```

### `resolveData(data, params)`

Dynamically change the props and set fields as read-only. Supports asynchronous calls.

This function is triggered when [`<Puck>`](/docs/api-reference/components/puck) renders, when a field is changed, or when the [`resolveAllData` function](/docs/api-reference/functions/resolve-all-data) is called.

```tsx {9-14} copy filename="Example mapping 'title' to 'resolvedTitle'"
const config = {
  components: {
    HeadingBlock: {
      fields: {
        title: {
          type: "text",
        },
      },
      resolveData: async ({ props }) => {
        return {
          props: { resolvedTitle: props.title },
          readOnly: { resolvedTitle: true },
        };
      },
      render: ({ resolvedTitle }) => <h1>{resolvedTitle}</h1>,
    },
  },
};
```

<ConfigPreview
  label='Try changing the "title" field'
  componentConfig={{
    fields: {
      title: {
        type: "text",
      },
      resolvedTitle: {
        type: "text",
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
    resolveData: ({ props }) => {
      return {
        props: { resolvedTitle: props.title },
        readOnly: { resolvedTitle: true },
      };
    },
    render: ({ resolvedTitle }) => {
      return <p style={{ margin: 0 }}>{resolvedTitle}</p>;
    },

}}
/>

#### Args

| Prop     | Example                                              | Type   |
| -------- | ---------------------------------------------------- | ------ |
| `data`   | `{ props: { title: "Hello, world" }, readOnly: {} }` | Object |
| `params` | `{ changed: { title: true } }`                       | Object |

##### `data.props`

The current props for the component.

```tsx copy /props/1,3
const resolveData = async ({ props }) => {
  return {
    props: { resolvedTitle: props.title },
  };
};
```

##### `data.readOnly`

The fields currently set to read-only for this component.

##### `params.changed`

An object describing which props have changed on this component since the last time `resolveData` was called.

```tsx copy {2-4} /changed/1 filename="Example only updating 'resolvedTitle' when 'title' changes"
const resolveData = async ({ props }, { changed }) => {
  if (!changed.title) {
    return { props };
  }

  return {
    props: { resolvedTitle: props.title },
  };
};
```

##### `params.lastData`

The data object from the previous run of this function.

#### Returns

| Prop   | Example                                              | Type   |
| ------ | ---------------------------------------------------- | ------ |
| `data` | `{ props: { title: "Hello, world" }, readOnly: {} }` | Object |

##### `data.props`

A partial props object containing modified props. Will be spread into the other props.

```tsx copy {3} filename="Example only updating resolvedTitle when title changes"
const resolveData = async ({ props }) => {
  return {
    props: { resolvedTitle: props.title },
  };
};
```

##### `data.readOnly`

A partial object describing fields to set as readonly. Will be spread into the existing readOnly state.

```tsx copy {4} filename="Example only updating resolvedTitle when title changes"
const resolveData = async ({ props }) => {
  return {
    props: { resolvedTitle: props.title },
    readOnly: { resolvedTitle: true }, // Make the `resolvedTitle` field read-only
  };
};
```

### `resolveFields(data, params)`

Dynamically set the fields for this component. Supports asynchronous calls.

This function is triggered when the component data changes.

```tsx {4-25} copy filename="Example changing one field based on another"
const config = {
  components: {
    MyComponent: {
      resolveFields: (data) => {
        const fields = {
          drink: {
            type: "radio",
            options: [
              { label: "Water", value: "water" },
              { label: "Orange juice", value: "orange-juice" },
            ],
          },
        };

        if (data.props.drink === "water") {
          return {
            ...fields,
            waterType: {
              // ... Define field
            },
          };
        }

        return fields;
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label='Try changing the "drink" field'
  componentConfig={{
    resolveFields: (data) => {
      const fields = {
        drink: {
          type: "radio",
          options: [
            { label: "Water", value: "water" },
            { label: "Orange juice", value: "orange-juice" },
          ],
        },
      };

      if (data.props.drink === "water") {
        return {
          ...fields,
          waterType: {
            type: "radio",
            options: [
              { label: "Still", value: "still" },
              { label: "Sparkling", value: "sparkling" },
            ],
          },
        };
      }

      return fields;
    },
    defaultProps: {
      drink: "water",
      waterType: "still",
    },
    render: ({ drink, waterType }) => (
      <p>
        {drink}
        {drink === "water" ? ` (${waterType})` : ""}
      </p>
    ),

}}
/>

#### Args

| Prop     | Example                                                                               | Type   |
| -------- | ------------------------------------------------------------------------------------- | ------ |
| `data`   | `{ props: { title: "Hello, world" }, readOnly: {} }`                                  | Object |
| `params` | `{ appState: {}, changed: {}, fields: {}, lastData: {}, lastFields: {}, parent: {} }` | Object |

##### `data.props`

The current props for the selected component.

##### `data.readOnly`

The fields currently set to read-only for this component.

##### `params.appState`

An object describing the [AppState](/docs/api-reference/app-state).

##### `params.changed`

An object describing which props have changed on this component since the last time this function was called.

```tsx copy {2-4} /changed/1 filename="Example only updating the fields when 'fieldType' changes"
const resolveFields = async ({ props }, { changed, lastFields }) => {
  if (!changed.fieldType) {
    return lastFields;
  }

  return {
    title: {
      type: fieldType,
    },
  };
};
```

##### `params.fields`

The static fields for this component as defined by [`fields`](#fields).

##### `params.lastData`

The data object from the previous run of this function.

##### `params.lastFields`

The last fields object created by the previous run of this function.

##### `params.parent`

The parent data object if this item is within a [DropZone](/docs/api-reference/components/drop-zone).

### `resolvePermissions(data, params)`

Dynamically set the [permissions](/docs/api-reference/permissions) for this component to toggle functionality. Can be used to control the permissions on a specific component instance. Inherits [`permissions`](#permissions). Supports asynchronous calls.

This function is triggered when the component data changes.

```tsx {4-12} copy filename="Setting permissions for a specific instance" showLineNumbers
const config = {
  components: {
    MyComponent: {
      resolvePermissions: (data, { permissions }) => {
        if (data.props.id === "MyComponent-1234") {
          return {
            delete: false, // Disable deletion on component with id MyComponent-1234
          };
        }

        return { permissions }; // Fallback to inherited permissions
      },
      // ...
    },
  },
};
```

#### Args

| Prop     | Example                                                                             | Type   |
| -------- | ----------------------------------------------------------------------------------- | ------ |
| `data`   | `{ props: { title: "Hello, world" }, readOnly: {} }`                                | Object |
| `params` | `{ appState: {}, changed: {}, permissions: {}, lastData: {}, lastPermissions: {} }` | Object |

##### `data.props`

The current props for the selected component.

##### `data.readOnly`

The fields currently set to read-only for this component.

##### `params.appState`

An object describing the [AppState](/docs/api-reference/app-state).

##### `params.changed`

An object describing which props have changed on this component since the last time this function was called. This helps prevent duplicate calls when making async operations.

```tsx copy {2-4} /changed/1 filename="Example only updating the permissions when 'example' prop changes"
const resolveFields = async ({ props }, { changed, lastPermissions }) => {
  if (!changed.example) {
    return lastPermissions; // Return the last permissions unless the `example` prop has changed
  }

  return await expensiveAsyncOperation();
};
```

##### `params.permissions`

The static fields for this component as defined by [`permissions`](#permissions).

##### `params.lastData`

The data object from the previous run of this function.

##### `params.lastPermissions`

The last permissions object created by the previous run of this function.

#### Returns

A [`fields`](#fields) object.


================================================
File: /apps/docs/pages/docs/api-reference/components.mdx
================================================
# Components

Puck provides several components to support different integration approaches.

## Core

- [\<DropZone\>](components/drop-zone) - Place droppable regions (zones) inside other components to enable nested components.
- [\<Puck\>](components/puck) - Render the Puck editor.
- [\<Render\>](components/render) - Render a [`Data`](/docs/api-reference/data) object for a given [`Config`](/docs/api-reference/configuration/config).

## Compositional

- [\<Puck.Components\>](components/puck-components) - A draggable list of components when composing a custom Puck UI.
- [\<Puck.Fields\>](components/puck-fields) - The fields for the currently selected item when composing a custom Puck UI.
- [\<Puck.Outline\>](components/puck-outline) - An interactive outline when composing a custom Puck UI.
- [\<Puck.Preview\>](components/puck-preview) - A drag-and-drop preview when composing a custom Puck UI.

## Helper

- [\<ActionBar\>](components/action-bar) - An action bar containing a series of actions, normally used with the [actionBar override](/docs/api-reference/overrides/action-bar).
- [\<ActionBar.Action\>](components/action-bar-action) - An action for use within the ActionBar component.
- [\<ActionBar.Group\>](components/action-bar-group) - A group of actions for use within the ActionBar component.
- [\<Drawer\>](components/drawer) - A reference list of items that can be dragged into a droppable area, normally [`<Puck.Preview>`](components/puck-preview).
- [\<Drawer.Item\>](components/drawer-item) - An item that can be dragged from a [`<Drawer>`](components/drawer).
- [\<FieldLabel\>](components/field-label) - Render a styled `label` when creating [`custom` fields](/docs/api-reference/fields/custom).


================================================
File: /apps/docs/pages/docs/api-reference/functions/resolve-all-data.mdx
================================================
---
title: resolveAllData
---

# resolveAllData

Utility function to execute all [`resolveData` methods](/docs/api-reference/configuration/component-config#resolvedatadata-params) on a data payload outside of the [`<Puck>`](/docs/api-reference/components/puck) editor, returning the updated value.

```tsx copy
import { resolveAllData } from "@measured/puck";

const updatedData = await resolveAllData(data, config);
```

This is useful if you need to run your resolvers before passing your data to [`<Render>`](/docs/api-reference/components/render).

## Args

| Param    | Example              | Type                                               |
| -------- | -------------------- | -------------------------------------------------- |
| `data`   | `{}`                 | [Data](/docs/api-reference/data)                   |
| `config` | `{ components: {} }` | [Config](/docs/api-reference/configuration/config) |

## Returns

The updated [Data](/docs/api-reference/data) object.


================================================
File: /apps/docs/pages/docs/api-reference/functions/migrate.mdx
================================================
---
title: migrate
---

# migrate

Migrate the [Data payload](/docs/api-reference/data) to the latest shape, automatically transforming deprecated data.

```tsx copy showLineNumbers {7-10}
import { migrate } from "@measured/puck";

migrate(legacyData);
```

## Returns

The updated [Data](/docs/api-reference/data) object.


================================================
File: /apps/docs/pages/docs/api-reference/functions/transform-props.mdx
================================================
---
title: transformProps
---

# transformProps

Transform component props stored in a [Data payload](/docs/api-reference/data). This convenience method can be used for [prop renames and other data migrations](/docs/integrating-puck/data-migration).

This method will modify all data in [`content`](/docs/api-reference/data#content) and [`zones`](/docs/api-reference/data#zones).

```tsx copy showLineNumbers {7-10}
import { transformProps } from "@measured/puck";

const data = {
  content: [{ type: "HeadingBlock", props: { title: "Hello, world" } }],
};

const updatedData = transformProps(data, {
  // Rename `title` to `heading`
  HeadingBlock: ({ title, ...props }) => ({ heading: title, ...props }),
});

console.log(updatedData);
// { content: [{ type: "HeadingBlock", props: { heading: "Hello, world" } }] };
```

## Args

| Param        | Example                                | Type                             |
| ------------ | -------------------------------------- | -------------------------------- |
| `data`       | `{}`                                   | [Data](/docs/api-reference/data) |
| `transforms` | `{ HeadingBlock: (props) => (props) }` | Object                           |

### `data`

The [Data payload](/docs/api-reference/data) to be transformed.

### `transforms`

An object describing the transform functions for each component defined in your [`config`](/docs/api-reference/configuration/config).

- `root` is a reserved property, and can be used to update the [`root` component](/docs/api-reference/configuration/config#root) props.

## Returns

The updated [Data](/docs/api-reference/data) object.

## Notes

- It's important to consider that data may include both components with old data and new data, and write your transform accordingly.


================================================
File: /apps/docs/pages/docs/api-reference/functions/use-puck.mdx
================================================
---
title: usePuck
---

# usePuck

A hook for building custom components that can interact with Puck.

```tsx copy /usePuck/1 {4}
import { Puck, usePuck } from "@measured/puck";

const JSONRenderer = () => {
  const { appState } = usePuck();

  return <div>{JSON.stringify(appState.data)}</div>;
};

export function Editor() {
  return (
    <Puck>
      <JSONRenderer />
    </Puck>
  );
}
```

**Components using the `usePuck` hook must be rendered within the [`<Puck>`](/docs/api-reference/components/puck) context as [`children`](/docs/api-reference/components/puck#children), [`overrides`](/docs/api-reference/components/puck#overrides) or [`plugins`](/docs/api-reference/components/puck#plugins).**

## Returns

| Param                                             | Example                                          | Type                                                |
| ------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------- |
| [`appState`](#appstate)                           | `{ data: {}, ui: {} }`                           | [AppState](/docs/api-reference/app-state)           |
| [`dispatch`](#dispatchaction)                     | `(action: PuckAction) => void`                   | Function                                            |
| [`getPermissions`](#getpermissionsparams)         | `() => ({ delete: true  })`                      | Function                                            |
| [`history`](#history)                             | `{}`                                             | Object                                              |
| [`refreshPermissions`](#refreshpermissionsparams) | `() => void`                                     | Function                                            |
| [`selectedItem`](#selecteditem)                   | `{ type: "Heading", props: {id: "my-heading"} }` | [ComponentData](/docs/api-reference/data#content-1) |

### `appState`

The current [application state](/docs/api-reference/app-state) for this Puck instance.

```tsx
console.log(appState.data);
// { content: [], root: {}, zones: {} }
```

### `dispatch(action)`

Execute an [action](/docs/api-reference/actions) to mutate the Puck [application state](/docs/api-reference/app-state).

```tsx
dispatch({
  type: "setUi",
  ui: {
    leftSideBarVisible: false,
  },
});
```

### `getPermissions(params)`

Get global, component or resolved dynamic [permissions](/docs/api-reference/permissions).

```tsx
getPermissions();
// { delete: true, edit: true }
```

#### Params

| Param  | Example                                           | Type    |
| ------ | ------------------------------------------------- | ------- |
| `item` | `{ type: "HeadingBlock", props: { id: "1234" } }` | Object  |
| `root` | `false`                                           | Boolean |
| `type` | `"HeadingBlock"`                                  | String  |

##### `item`

Specify `item` to retrieve the permissions for a given component instance, resolving any dynamic permissions for that component, as set by the [`resolvePermissions` parameter](/docs/api-reference/configuration/component-config#resolvepermissionsdata-params).

```tsx
getPermissions({
  item: { type: "HeadingBlock", props: { id: "Heading-1234" } }, // Get resolved permissions for Heading-1234
});
// { delete: false }
```

The `getPermissions` function will be redefined when after resolving dynamic permissions, so it's generally required to wrap it in a `useEffect` hook:

```tsx
const [myPermissions, setMyPermissions] = useState(getPermissions());

useEffect(() => {
  setMyPermissions(getPermissions());
}, [getPermissions]);
```

##### `root`

Specify `root` to retrieve the permissions for the `root`, as set by the [`permissions` parameter](/docs/api-reference/configuration/component-config#permissions).

```tsx
getPermissions({ root: true });
// { delete: false }
```

##### `type`

Specify `type` to retrieve the permissions for a given component type, as set by the [`permissions` parameter](/docs/api-reference/configuration/component-config#permissions).

```tsx
getPermissions({ type: "HeadingBlock" });
// { delete: false }
```

### `history`

The `history` API provides programmatic access to the undo/redo [AppState](/docs/api-reference/app-state) history.

| Param                                 | Example                             | Type                           |
| ------------------------------------- | ----------------------------------- | ------------------------------ |
| [`back`](#historyback)                | `() => void`                        | Function                       |
| [`forward`](#historyforward)          | `() => void`                        | Function                       |
| [`hasPast`](#historyhaspast)          | `true`                              | Boolean                        |
| [`hasFuture`](#historyhasfuture)      | `false`                             | Boolean                        |
| [`histories`](#historyhistories)      | `[{ id: 'abc123', data: {} }]`      | [History](#history-params)\[\] |
| [`index`](#historyindex)              | `5`                                 | Number                         |
| [`setHistories`](#sethistories)       | `setHistories: (histories) => void` | Function                       |
| [`setHistoryIndex`](#sethistoryindex) | `setHistoryIndex: (index) => void`  | Function                       |

#### `history.back()`

A function to move the app state back through the [histories](#historyhistories).

#### `history.forward()`

A function to move the app state forward through the [histories](#historyhistories).

#### `history.hasPast`

A boolean describing whether or not the present app state has past history items.

#### `history.hasFuture`

A boolean describing whether or not the present app state has future history items.

#### `history.histories`

An array describing the recorded history as `History` objects.

##### `History` params

| Param   | Example  | Type                                      |
| ------- | -------- | ----------------------------------------- |
| `state` | `{}`     | [AppState](/docs/api-reference/app-state) |
| `id`    | `abc123` | String                                    |

###### `state`

The [app state](/docs/api-reference/app-state) payload for this history entry.

###### `id`

An optional ID for this history entry.

#### `history.index`

The index of the currently selected history in [`history.histories`](#historyhistories)

#### `setHistories`

A function to set the history state.

```tsx
const { setHistories } = usePuck();
setHistories([]); // clears all history
```

#### `setHistoryIndex`

A function to set current history index.

```tsx
const { setHistoryIndex } = usePuck();
setHistoryIndex(2);
```

### `refreshPermissions(params)`

Force the permissions to refresh, running all [`resolvePermissions` functions](/docs/api-reference/configuration/component-config#resolvepermissionsdata-params) and skipping the cache.

```tsx
resolvePermissions(); // Refresh all permissions
```

#### Params

| Param  | Example                                           | Type    |
| ------ | ------------------------------------------------- | ------- |
| `item` | `{ type: "HeadingBlock", props: { id: "1234" } }` | Object  |
| `root` | `false`                                           | Boolean |
| `type` | `"HeadingBlock"`                                  | String  |

##### `item`

Specify `item` to refresh the permissions for a given component instance only.

```tsx
refreshPermissions({
  item: { type: "HeadingBlock", props: { id: "Heading-1234" } }, // Force refresh the resolved permissions for Heading-1234
});
```

##### `root`

Specify `root` to refresh the permissions for the `root` only.

```tsx
refreshPermissions({ root: true });
```

##### `type`

Specify `type` to refresh the permissions for all components of a given component type.

```tsx
refreshPermissions({ type: "HeadingBlock" });
```

### `selectedItem`

The currently selected item, as defined by `appState.ui.itemSelector`.

```tsx
console.log(selectedItem);
// { type: "Heading", props: {id: "my-heading"} }
```


================================================
File: /apps/docs/pages/docs/api-reference/overrides.mdx
================================================
# Overrides

> **⚠️ The overrides API is highly experimental and is likely to experience breaking changes.**

An object describing render functions to override the default Puck interface.

```tsx copy
const overrides = {
  header: () => <header>My header</header>,
};
```

## Available overrides

- [`actionBar`](overrides/action-bar): Override the action bar.
- [`components`](overrides/components): Override the component list.
- [`componentItem`](overrides/component-item): Override an individual item within the component list.
- [`fields`](overrides/fields): Override the fields wrapper.
- [`fieldLabel`](overrides/field-label): Override the [field labels](/docs/api-reference/configuration/field-label).
- [`fieldTypes`](overrides/field-types): Override each [field type](/docs/api-reference/fields).
- [`header`](overrides/header): Override the header.
- [`headerActions`](overrides/header-actions): Override the header actions. Return a fragment so your items appear inline.
- [`iframe`](overrides/iframe): Override the root of the iframe. Useful for injecting styles.
- [`outline`](overrides/outline): Override the outline.
- [`preview`](overrides/preview): Override the drag-and-drop preview.
- [`puck`](overrides/puck): Override the Puck children. This is the equivalent of passing in [`children`](/docs/api-reference/components/puck#children) to the [`<Puck>`](/docs/api-reference/components/puck) component.


================================================
File: /apps/docs/pages/docs/extending-puck/_meta.js
================================================
const menu = {
  "custom-fields": {},
  "custom-interfaces": {},
  theming: {},
  plugins: {},
};

export default menu;


================================================
File: /apps/docs/pages/docs/extending-puck/plugins.mdx
================================================
# Plugin API

> **⚠️ The plugin API is highly experimental and is likely to experience breaking changes.**

The plugin API enables developers to distribute plugins to customize the Puck interface.

## Official plugins

- [`emotion-cache`](https://github.com/measuredco/puck/tree/main/packages/plugin-emotion-cache): Inject emotion cache into the Puck iframe.
- [`heading-analyzer`](https://github.com/measuredco/puck/tree/main/packages/plugin-heading-analyzer): Analyze the heading outline of your page and be warned when you're not respecting WCAG 2 accessibility standards.

Please see the [awesome-puck repo](https://github.com/measuredco/awesome-puck) for a full list of community plugins.

## Developing a plugin

Plugins implement the same [`overrides`](/docs/api-reference/overrides) API used to build [custom interfaces](custom-interfaces#ui-overrides):

```tsx showLineNumbers copy {3-9, 15}
import { Puck } from "@measured/puck";

const MyPlugin = {
  overrides: {
    componentItem: ({ name }) => (
      <div style={{ backgroundColor: "hotpink" }}>{name}</div>
    ),
  },
};

export function Editor() {
  return (
    <Puck
      // ...
      plugins={[MyPlugin]}
    />
  );
}
```

## Plugin currying

Plugins are rendered in the order they are defined. Unless otherwise specified, all overrides are _curried_, meaning that the return node of one plugin will be passed as `children` to the next plugin.

This may result in some incompatible plugin combinations. To improve your chance of building a widely compatible plugin, consider:

1. Implementing as few override methods as you need
2. Always rendering `children` if possible

## Custom fields

Plugins enable full UI overhauls. If you're creating a field for a specific use-case, you might be better off distributing a [custom field](custom-fields).

## Further reading

- [Plugin API reference](/docs/api-reference/plugin)


================================================
File: /apps/docs/pages/docs/extending-puck/custom-interfaces.mdx
================================================
import { PuckPreview } from "@/docs/components/Preview";
import { Puck } from "@/core/components/Puck";

# Custom Interfaces

Puck uses compositional patterns and UI overrides to enable completely custom editor interfaces.

[See a custom interface example](https://demo.puckeditor.com/custom-ui/edit/)

## Composition

Custom interfaces can be implementing by providing [`children`](/docs/api-reference/components/puck#children) to the [`<Puck>` component](/docs/api-reference/components/puck):

```tsx showLineNumbers copy
import { Puck } from "@measured/puck";

export function Editor() {
  return (
    <Puck>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gridGap: 16 }}
      >
        <div>
          {/* Render the drag-and-drop preview */}
          <Puck.Preview />
        </div>
        <div>
          {/* Render the component list */}
          <Puck.Components />
        </div>
      </div>
    </Puck>
  );
}
```

<PuckPreview
  config={{
    components: {
      HeadingBlock: {
        render: () => {
          return <span>Hello, world</span>;
        },
      },
    },
  }}
  data={{
    content: [{ type: "HeadingBlock", props: { id: "HeadingBlock-1" } }],
    root: { props: {} },
  }}
>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gridGap: 16 }}>
    <div>
      <Puck.Components />
    </div>
    <div>
      <Puck.Preview />
    </div>
  </div>
</PuckPreview>

## Compositional components

Puck exposes its core components, allowing you to compose them together to create new layouts:

- [`<Puck.Components>`](/docs/api-reference/components/puck-components) - A draggable list of components.
- [`<Puck.Fields>`](/docs/api-reference/components/puck-fields) - The fields for the currently selected item.
- [`<Puck.Outline>`](/docs/api-reference/components/puck-outline) - An interactive outline.
- [`<Puck.Preview>`](/docs/api-reference/components/puck-preview) - A drag-and-drop preview.

The internal UI for these components can be changed by implementing [UI overrides](#ui-overrides) or [theming](theming).

### Helper components

Puck also exposes helper components for even deeper customization:

- [`<Drawer>`](/docs/api-reference/components/drawer) - A reference list of items that can be dragged into a droppable area, normally `<Puck.Preview>`.
- [`<Drawer.Item>`](/docs/api-reference/components/drawer-item) - An item that can be dragged from a `<Drawer>`.
- [`<FieldLabel>`](/docs/api-reference/components/field-label) - A styled label for creating inputs.

## Custom components

Access the Puck [`AppState`](/docs/api-reference/app-state) via the [`usePuck`](/docs/api-reference/functions/use-puck) hook to integrate with Puck with custom editor components:

```tsx showLineNumbers copy /usePuck/1 {3-7, 12}
import { Puck, usePuck } from "@measured/puck";

const JSONRenderer = () => {
  const { appState } = usePuck();

  return <div>{JSON.stringify(appState.data)}</div>;
};

export function Editor() {
  return (
    <Puck>
      <JSONRenderer />
    </Puck>
  );
}
```

## UI Overrides

UI overrides allow you to change how Puck renders. It can be used with or without compositional components.

Use the [`overrides` prop](/docs/api-reference/components/puck#overrides) to implement an override:

```tsx showLineNumbers copy {7-12}
import { Puck } from "@measured/puck";

export function Editor() {
  return (
    <Puck
      // ...
      overrides={{
        // Render a custom element for each item in the component list
        componentItem: ({ name }) => (
          <div style={{ backgroundColor: "hotpink" }}>{name}</div>
        ),
      }}
    />
  );
}
```

There are many different overrides available. See the [`overrides` API reference](/docs/api-reference/overrides) for the full list.

### Custom publish button example

A common use case is to override the Puck header. You can either use the [`header` override](/docs/api-reference/overrides/header) to change the entire header, or use the [`headerActions` override](/docs/api-reference/overrides/header-actions) to inject new controls into the header and change the publish button.

Here's an example that replaces the default publish button with a custom one:

```tsx showLineNumbers copy {10-26}
import { Puck, usePuck } from "@measured/puck";

const save = () => {};

export function Editor() {
  return (
    <Puck
      // ...
      overrides={{
        headerActions: ({ children }) => {
          const { appState } = usePuck();

          return (
            <>
              <button
                onClick={() => {
                  save(appState.data);
                }}
              >
                Save
              </button>

              {/* Render default header actions, such as the default Button */}
              {/*{children}*/}
            </>
          );
        },
      }}
    />
  );
}
```

### Custom field type example

An advanced use case is overriding all fields of a certain type by specifying the [`fieldTypes` override](/docs/api-reference/overrides/field-types).

```tsx showLineNumbers copy {8-18}
import { Puck } from "@measured/puck";

export function Editor() {
  return (
    <Puck
      // ...
      overrides={{
        fieldTypes: {
          // Override all text fields with a custom input
          text: ({ name, onChange, value }) => (
            <input
              defaultValue={value}
              name={name}
              onChange={(e) => onChange(e.currentTarget.value)}
              style={{ border: "1px solid black", padding: 4 }}
            />
          ),
        },
      }}
    />
  );
}
```

## Further reading

- [`overrides` API reference](/docs/api-reference/overrides)
- [`usePuck` hook API reference](/docs/api-reference/functions/use-puck)


================================================
File: /apps/docs/pages/docs/extending-puck/custom-fields.mdx
================================================
import { ConfigPreview } from "@/docs/components/Preview";
import { AutoField, FieldLabel } from "@/core/components/AutoField";

# Custom Fields

Puck can be extended with completely custom fields for different use-cases.

## Creating a custom field

Creating a custom field is possible using the [`custom` field type](/docs/api-reference/fields/custom):

```tsx copy showLineNumbers {5-15}
const config = {
  components: {
    Example: {
      fields: {
        title: {
          type: "custom",
          render: ({ name, onChange, value }) => (
            <input
              defaultValue={value}
              name={name}
              onChange={(e) => onChange(e.currentTarget.value)}
              style={{ border: "1px solid black", padding: 4 }}
            />
          ),
        },
      },
      render: ({ title }) => {
        return <p>{title}</p>;
      },
    },
  },
};
```

The [`onChange` function](/docs/api-reference/fields/custom#onchangevalue-ui) updates the Puck data payload for the field name, in this case "title".

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      title: {
        type: "custom",
        render: ({ name, onChange, value }) => {
          return (
            <input
              defaultValue={value}
              name={name}
              onChange={(e) => onChange(e.currentTarget.value)}
              style={{
                background: "white",
                border: "1px solid black",
                padding: 4,
              }}
            />
          );
        },
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
    render: ({ title }) => {
      return <p style={{ margin: 0 }}>{title}</p>;
    },
  }}
/>

## Adding a label

You can add your own label, but it's recommended to use the [`<FieldLabel>` component](/docs/api-reference/components/field-label) provided by Puck to seamlessly integrate into the Puck field UI.

```tsx copy showLineNumbers {1, 11-13}
import { FieldLabel } from "@measured/puck";

const config = {
  components: {
    Example: {
      fields: {
        title: {
          type: "custom",
          label: "Label Example",
          render: ({ field }) => (
            <FieldLabel label={field.label}>
              <input {/*...*/} />
            </FieldLabel>
          ),
        },
      },
      // ...
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      title: {
        type: "custom",
        label: "Label Example",
        render: ({ field, name, onChange, value }) => {
          return (
            <FieldLabel label={field.label}>
              <input
                defaultValue={value}
                name={name}
                onChange={(e) => onChange(e.currentTarget.value)}
                style={{
                  background: "white",
                  border: "1px solid black",
                  padding: 4,
                }}
              />
            </FieldLabel>
          );
        },
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
    render: ({ title }) => {
      return <p style={{ margin: 0 }}>{title}</p>;
    },
  }}
/>

## Rendering Puck fields internally

Use the [`<AutoField>` component](/docs/api-reference/components/auto-field) to render Puck fields within your custom field.

```tsx copy showLineNumbers {1, 12-16}
import { AutoField } from "@measured/puck";

const config = {
  components: {
    Example: {
      fields: {
        title: {
          type: "custom",
          label: "Label Example",
          render: ({ field, value, onChange }) => (
            <FieldLabel label={field.label}>
              <AutoField
                field={{ type: "text" }}
                onChange={(value) => onChange(value)}
                value={value}
              />
            </FieldLabel>
          ),
        },
        // ...
      },
    },
  },
};
```

<ConfigPreview
  label="Example"
  componentConfig={{
    fields: {
      title: {
        type: "custom",
        label: "AutoField Example",
        render: ({ field, value, onChange }) => {
          return (
            <FieldLabel label={field.label}>
              <AutoField
                field={{ type: "text" }}
                value={value}
                onChange={onChange}
              />
            </FieldLabel>
          );
        },
      },
    },
    defaultProps: {
      title: "Hello, world",
    },
    render: ({ title }) => {
      return <p style={{ margin: 0 }}>{title}</p>;
    },
  }}
/>

## Updating the UI state

The [`onChange` function](/docs/api-reference/fields/custom#onchangevalue-ui) can also be used to modify the [Puck UI state](/docs/api-reference/app-state#ui) at the same time as updating the field value:

```tsx copy showLineNumbers {14,15}
const config = {
  components: {
    Example: {
      fields: {
        title: {
          type: "custom",
          render: ({ name, onChange, value }) => (
            <input
              defaultValue={value}
              name={name}
              onChange={(e) =>
                onChange(
                  e.currentTarget.value,
                  // Close the left side bar when this field is changed
                  { leftSideBarVisible: false }
                )
              }
              style={{ border: "1px solid black", padding: 4 }}
            />
          ),
        },
      },
      render: ({ title }) => {
        return <p>{title}</p>;
      },
    },
  },
};
```

## Further reading

- [The `<AutoField>` API reference](/docs/api-reference/components/auto-field)
- [The `<FieldLabel>` API reference](/docs/api-reference/components/field-label)
- [The `custom` field API reference](/docs/api-reference/fields/custom)


================================================
File: /apps/docs/pages/docs/extending-puck/theming.mdx
================================================
# Theming

Whilst Puck provides the ability to create [custom interfaces](custom-interfaces), there is currently no way to apply theming to the built-in Puck components.

We are actively exploring this via [#139 on GitHub](https://github.com/measuredco/puck/issues/139)


================================================
File: /apps/docs/pages/docs/getting-started.mdx
================================================
# Getting Started

## Installation

Install the package

```sh npm2yarn copy
npm i @measured/puck --save
```

Or generate a Puck application using a [recipe](https://github.com/measuredco/puck#recipes)

```sh copy
npx create-puck-app my-app
```

## Render the editor

```jsx copy filename="Editor.jsx"
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";

// Create Puck component config
const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }) => {
        return <h1>{children}</h1>;
      },
    },
  },
};

// Describe the initial data
const initialData = {};

// Save the data to your database
const save = (data) => {};

// Render Puck editor
export function Editor() {
  return <Puck config={config} data={initialData} onPublish={save} />;
}
```

## Render the page

```jsx copy filename="Page.jsx"
import { Render } from "@measured/puck";

export function Page() {
  return <Render config={config} data={data} />;
}
```


================================================
File: /apps/docs/pages/_meta.js
================================================
const menu = {
  index: {
    type: "page",
    title: "Puck",
    display: "hidden",
    theme: {
      layout: "full",
    },
  },
  docs: {
    type: "page",
    title: "Docs",
  },
  measured: {
    type: "page",
    href: "/#support",
    title: "Support",
    newWindow: false,
  },
};

export default menu;


================================================
File: /apps/docs/pages/index.mdx
================================================
---
title: Puck - The open-source visual editor for React
---

import { Home } from "../components/Home";

<Home />


================================================
File: /apps/docs/pages/_app.tsx
================================================
import type { AppProps } from "next/app";
import "../styles.css";

export default function DocsApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}


================================================
File: /apps/docs/pages/_document.tsx
================================================
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DATA_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DATA_DOMAIN}
            src="https://plausible.io/js/plausible.js"
          ></script>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}


================================================
File: /apps/docs/tsconfig.json
================================================
{
  "extends": "./tsconfig/nextjs.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/core": ["../../packages/core"],
      "@/core/*": ["../../packages/core/*"],
      "@/plugin-heading-analyzer": ["../../packages/plugin-heading-analyzer"],
      "@/plugin-heading-analyzer/*": [
        "../../packages/plugin-heading-analyzer/*"
      ],
      "@/docs/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "pages/index.mdx"
  ],
  "exclude": ["node_modules"]
}


================================================
File: /apps/docs/tsconfig/nextjs.json
================================================
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Next.js",
  "extends": "./base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "allowJs": true,
    "declaration": false,
    "declarationMap": false,
    "incremental": true,
    "jsx": "preserve",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "noEmit": true,
    "resolveJsonModule": true,
    "strict": false,
    "target": "es6"
  },
  "include": ["src", "next-env.d.ts"],
  "exclude": ["node_modules"]
}


================================================
File: /apps/docs/tsconfig/base.json
================================================
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "moduleResolution": "node",
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveWatchOutput": true,
    "skipLibCheck": true,
    "strict": true
  },
  "exclude": ["node_modules"]
}


================================================
File: /apps/docs/next-sitemap.config.js
================================================
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://puckeditor.com",
  generateIndexSitemap: false,
};


================================================
File: /apps/demo/.gitignore
================================================
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

database.json

================================================
File: /apps/demo/next.config.js
================================================
module.exports = {
  reactStrictMode: false,
  transpilePackages: ["@measured/puck",