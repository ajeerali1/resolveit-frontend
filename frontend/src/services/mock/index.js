import MockAdapter from 'axios-mock-adapter'
import api from '../api'
import setupAuthMock from './auth.mock'
import setupCustomerMock from './customer.mock'
import setupVendorMock from './vendor.mock'
import setupAdminMock from './admin.mock'

export default function initMocks() {
  const mock = new MockAdapter(api, { delayResponse: 500 })

  setupAuthMock(mock)
  setupCustomerMock(mock)
  setupVendorMock(mock)
  setupAdminMock(mock)

  console.log('Mock API initialized')
}
