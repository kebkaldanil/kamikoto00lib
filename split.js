"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = void 0;
const min_length_1 = require("./errors/min-length");
/**
 * @throws RangeError
 * @param str
 * @param separator
 * @param options
 */ /*
export function split<
 Str extends string,
 Sep extends string,
 FromEnd extends boolean = false,
 MinLen extends number = 0,
 MaxLen extends number | null = null,
>(
 str: Str,
 separator: Sep,
 options?: {
   fromEnd?: FromEnd | null;
   minLength?: uint<MinLen> | null;
   maxLength?: If<MaxLen extends number ? And<IsPositive<MaxLen>, IsSafeInt<MaxLen>> : true, MaxLen, never>;
 } | null,
): SplitResult<Str, Sep, FromEnd, MinLen, MaxLen>;
*/
function split(str, separator, options) {
    if (!options)
        options = {};
    const fromEnd = options.fromEnd ?? false;
    const minLength = options.minLength > 0 ? Math.round(options.minLength) : 0;
    if (minLength > Number.MAX_SAFE_INTEGER) {
        throw new RangeError(`Min length (${minLength}) can not be more than ${Number.MAX_SAFE_INTEGER}`);
    }
    const maxLength = Math.max(minLength, options.maxLength >= 0.5 ? Math.round(options.maxLength) : Infinity);
    str = "" + str;
    if (minLength === 0 && maxLength === null || maxLength === Infinity)
        return String.prototype.split.call(str, separator);
    let i = 0;
    let lastIndex = fromEnd ? str.length : 0;
    const result = [];
    while (i < maxLength) {
        let separatorIndex;
        if (fromEnd) {
            separatorIndex = str.lastIndexOf(separator, lastIndex - 1);
            result[i] = str.slice(separatorIndex + 1, lastIndex);
            lastIndex = separatorIndex;
        }
        else {
            separatorIndex = str.indexOf(separator, lastIndex);
            result[i] = str.slice(lastIndex, separatorIndex);
            lastIndex = separatorIndex + separator.length;
        }
        if (separatorIndex === -1) {
            result[i] = fromEnd ? str.slice(0, lastIndex) : str.slice(lastIndex);
            if (i + 1 < minLength) {
                throw new min_length_1.MinLengthError(result, minLength);
            }
            break;
        }
        i++;
    }
    return result;
}
exports.split = split;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BsaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esb0RBQXFEO0FBNERyRDs7Ozs7R0FLRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0VBZ0JEO0FBQ0YsU0FBZ0IsS0FBSyxDQUFDLEdBQVcsRUFBRSxTQUFpQixFQUFFLE9BSTlDO0lBQ04sSUFBSSxDQUFDLE9BQU87UUFDVixPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2YsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7SUFDekMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0UsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixFQUFFO1FBQ3ZDLE1BQU0sSUFBSSxVQUFVLENBQUMsZUFBZSxTQUFTLDBCQUEwQixNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0tBQ25HO0lBQ0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3RyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUNmLElBQUksU0FBUyxLQUFLLENBQUMsSUFBSSxTQUFTLEtBQUssSUFBSSxJQUFJLFNBQVMsS0FBSyxRQUFRO1FBQ2pFLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDNUIsT0FBTSxDQUFDLEdBQUcsU0FBUyxFQUFFO1FBQ25CLElBQUksY0FBc0IsQ0FBQztRQUMzQixJQUFJLE9BQU8sRUFBRTtZQUNYLGNBQWMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNyRCxTQUFTLEdBQUcsY0FBYyxDQUFDO1NBQzVCO2FBQU07WUFDTCxjQUFjLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2pELFNBQVMsR0FBRyxjQUFjLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztTQUMvQztRQUNELElBQUksY0FBYyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLEVBQUU7Z0JBQ3JCLE1BQU0sSUFBSSwyQkFBYyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQzthQUM3QztZQUNELE1BQU07U0FDUDtRQUNELENBQUMsRUFBRSxDQUFDO0tBQ0w7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBeENELHNCQXdDQyJ9