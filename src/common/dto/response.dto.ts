export class ApiResponseDto<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class ResponseFactory {
  static success<T>(data: T, message = 'Operation successful'): ApiResponseDto<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message: string, errors?: any): ApiResponseDto<null> {
    return {
      success: false,
      message,
      errors,
    };
  }

  static paginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Data retrieved successfully'
  ): ApiResponseDto<T[]> {
    return {
      success: true,
      message,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}