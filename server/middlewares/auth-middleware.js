import { ApiError } from "../exceptions/api-error.js";
import tokenService from "../service/token-service.js";

export default function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return ApiError.UnauthorizedError();
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateAccessToken(accessToken);
    console.log(userData);
    if (userData === null) {
      return ApiError.UnauthorizedError();
    }

    req.user = userData;
    next();
  } catch (error) {
    return ApiError.UnauthorizedError();
  }
}
