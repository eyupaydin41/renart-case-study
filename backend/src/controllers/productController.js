import { getAllProducts } from '../services/productService.js';
import { errorResponse, successResponse, ApiError } from '../utils/ApiError.js';
import ERROR_CODES from '../utils/errorCodes.js';

export async function getProducts(req, res) {
  try {
    const popMin = req.query.popMin ? parseFloat(req.query.popMin) : 0;
    const popMax = req.query.popMax ? parseFloat(req.query.popMax) : 1;
    const priceMin = req.query.priceMin ? parseFloat(req.query.priceMin) : 0;
    const priceMax = req.query.priceMax ? parseFloat(req.query.priceMax) : Number.MAX_SAFE_INTEGER;

    if ([popMin, popMax, priceMin, priceMax].some(val => isNaN(val))) {
      throw new ApiError(400, 'Invalid filter values', ERROR_CODES.INVALID_MIN_MAX.code);
    }

    const result = await getAllProducts({ popMin, popMax, priceMin, priceMax });
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, err);
  }
}