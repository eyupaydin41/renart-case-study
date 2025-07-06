import { getAllProducts, getProductsByPopularityScoreBetween, getProductsByPriceBetween } from '../services/productService.js';
import { errorResponse, successResponse, ApiError } from '../utils/ApiError.js';
import ERROR_CODES from '../utils/errorCodes.js';

export async function getProducts(req, res) {
  try {
    const result = await getAllProducts();
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, err);
  }
}

export async function getProductsByPopularity(req, res) {
  try {
    const min = req.query.min ? parseFloat(req.query.min) : 0;
    const max = req.query.max ? parseFloat(req.query.max) : 1;
    if (isNaN(min) || isNaN(max)) throw new ApiError(400, 'Invalid min or max value', ERROR_CODES.INVALID_MIN_MAX.code);
    const result = await getProductsByPopularityScoreBetween({ min, max });
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, err);
  }
}

export async function getProductsByPrice(req, res) {
  try {
    const min = req.query.min ? parseFloat(req.query.min) : 0;
    const max = req.query.max ? parseFloat(req.query.max) : Number.MAX_SAFE_INTEGER;
    if (isNaN(min) || isNaN(max)) throw new ApiError(400, 'Invalid min or max value', ERROR_CODES.INVALID_MIN_MAX.code);
    const result = await getProductsByPriceBetween({ min, max });
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, err);
  }
}