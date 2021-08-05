export const LoginTO = {
    description: 'user login',
    tags: ['User'],
    summary: 'User login',
    body: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
        os: { type: 'string' },
        device: { type: 'string' },
      }
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          success: { type: 'string' },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              userId: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              address: { type: 'string' },
              userImageUrl: { type: 'string' },
              poin: { type: 'number' },
              token: { type: 'string' },
            }
          }
        }
      },
      400: {
        description: 'error response',
        type: 'object',
        properties: {
          success: { type: 'string' },
          message: { type: 'string' },
          error: { type: 'string' },
        }
      }
    }
  }
  
  export const UserProfileTO = {
    description: 'user profile',
    tags: ['User'],
    summary: 'User profile',
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          success: { type: 'string' },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              userId: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              userImageUrl: { type: 'string' },
              address: { type: 'string' },
              poin: { type: 'number' },
            }
          }
        }
      },
      400: {
        description: 'error response',
        type: 'object',
        properties: {
          success: { type: 'string' },
          message: { type: 'string' },
          error: { type: 'string' },
        }
      }
    }
  }
  
  export const LogoutTO = {
    description: 'user logout',
    tags: ['User'],
    summary: 'User logout',
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          success: { type: 'string' },
          message: { type: 'string' }
        }
      },
      400: {
        description: 'error response',
        type: 'object',
        properties: {
          success: { type: 'string' },
          message: { type: 'string' },
          error: { type: 'string' },
        }
      }
    }
  }