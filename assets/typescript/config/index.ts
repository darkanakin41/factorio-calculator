import { AxiosRequestConfig } from 'axios'

// import merge from 'lodash/merge'

export interface Config {
  api: AxiosRequestConfig
}

const config: Config = {
  api: {
    baseURL: 'https://factorio-calculator.test/api'
  }
}

// const config = merge({
//   api: {
//     baseURL: 'http://factorio-calculator.test/api'
//   },
// }, (window as any).config) as Config

export default config
