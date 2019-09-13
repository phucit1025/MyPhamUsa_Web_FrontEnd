// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  token: 'AUTH_TOKEN',
  endPoint: 'http://45.119.212.145:4453/',
  apiPaths: {
    account: {
      login: 'api/Account/LoginV2',
      getAdminInfo: 'api/Account/GetAdminInformation',
      changePassword: 'api/Account/ChangePassword',
    },
    product: {
      getProduct: '/api/Product/GetProduct',
      getProducts: '/api/Product/GetProducts',
      createProduct: '/api/Product/CreateProduct',
      updateProduct: '/api/Product/UpdateProduct',
      deleteProduct: '/api/Product/DeleteProduct',
      isAvailableCode: '/api/Product/IsAvailableCode',
    },
    category: {
      getCategories: '/api/Category/GetCategories',
    },
  },
};
