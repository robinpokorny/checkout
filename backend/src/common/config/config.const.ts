export enum SERVICE_CONFIG {
  NAME = 'service.name',
  DESCRIPTION = 'service.description',
  ENVIRONMENT = 'service.environment',
  VERSION = 'service.version',
  BASE_URL = 'service.baseUrl',
}

export enum DOCS_CONFIG {
  BASE_URL = 'service.docs.baseUrl',
  USERNAME = 'service.docs.username',
  PASSWORD = 'service.docs.password',
}

export enum SECURITY_CONFIG {
  SECRET = 'security.secret',
  JWT_EXPIRY = 'security.jwt.expiry',
}

export enum SERVER_CONFIG {
  HOST = 'server.host',
  PORT = 'server.port',
  SHUTDOWN_DELAY = 'server.shutdownDelay',
}
