import ERROR_CODES from './errorCodes.js';

export class ApiError extends Error {
  constructor(status, message, errorCode) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
    this.errorCode = errorCode;
  }
}

export function errorResponse(res, error) {
  if (error instanceof ApiError) {
    res.status(error.status).json({
      success: false,
      data: null,
      error: {
        message: error.message,
        code: error.errorCode,
        description: ERROR_CODES[error.errorCode]?.description || null
      }
    });
  } else {
    res.status(500).json({
      success: false,
      data: null,
      error: {
        message: 'Internal Server Error',
        code: ERROR_CODES.INTERNAL_SERVER_ERROR.code,
        description: ERROR_CODES.INTERNAL_SERVER_ERROR.description
      }
    });
  }
}

export function successResponse(res, data, status = 200) {
  res.status(status).json({
    success: true,
    data,
    error: null
  });
}