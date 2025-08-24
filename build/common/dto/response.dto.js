"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFactory = exports.ApiResponseDto = void 0;
class ApiResponseDto {
}
exports.ApiResponseDto = ApiResponseDto;
class ResponseFactory {
    static success(data, message = 'Operation successful') {
        return {
            success: true,
            message,
            data,
        };
    }
    static error(message, errors) {
        return {
            success: false,
            message,
            errors,
        };
    }
    static paginated(data, total, page, limit, message = 'Data retrieved successfully') {
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
exports.ResponseFactory = ResponseFactory;
//# sourceMappingURL=response.dto.js.map