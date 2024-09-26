# create-typescript-starter

This is an opinionated starter project for creating a TypeScript project.
It works as other _crete-\*_ projects, but it is focused on TypeScript.

## How to use

To create a project based on this starter, you can run one of the following commands:

```bash
pnpm create @c3s4/typescript-starter
```

or

```bash
yarn create @c3s4/typescript-starter
```

or

```bash
npm create @c3s4/typescript-starter
```

## Choices I made

- Use `tsx` as Typescript executor, instead of `ts-node`, because it is more
  powerful and has better support for TypeScript features.

- Use `vitest` as testing platform.

- Use my `eslint` and `prettier` configurations. You caon obviously change them anytime, after the project is created.

- Prepare the project to be build as `cjs` and `esm` modules.

- Use differente `tsconfig` files to configure different types of builds.

## TODO

- [ ] Use `tsup` as bundler to build the project. This will solve the problem related to the `cjs` and `esm` modules. But causes to have only one bundle.

- [ ] Ask if you want the project to be a library or an application. This will change the `tsconfig.json` and the `package.json` scripts.
