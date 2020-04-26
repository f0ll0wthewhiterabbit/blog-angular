import { Environment } from './interface'
import { apiKey, firebaseDatabaseUrl } from './privateFields'

export const environment: Environment = {
  production: true,
  apiKey,
  firebaseDatabaseUrl,
}
