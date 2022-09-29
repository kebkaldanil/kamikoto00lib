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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuanMiLCJzb3VyY2VSb290IjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2tlYmthbGRhbmlsL2thbWlrb3RvMDBsaWIvbWFzdGVyL3NyYy8iLCJzb3VyY2VzIjpbInNwbGl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG9EQUFxRDtBQTREckQ7Ozs7O0dBS0csQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztFQWdCRDtBQUNGLFNBQWdCLEtBQUssQ0FBQyxHQUFXLEVBQUUsU0FBaUIsRUFBRSxPQUk5QztJQUNOLElBQUksQ0FBQyxPQUFPO1FBQ1YsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNmLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDO0lBQ3pDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFVLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdFLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtRQUN2QyxNQUFNLElBQUksVUFBVSxDQUFDLGVBQWUsU0FBUywwQkFBMEIsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztLQUNuRztJQUNELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFVLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0csR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDZixJQUFJLFNBQVMsS0FBSyxDQUFDLElBQUksU0FBUyxLQUFLLElBQUksSUFBSSxTQUFTLEtBQUssUUFBUTtRQUNqRSxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBQzVCLE9BQU0sQ0FBQyxHQUFHLFNBQVMsRUFBRTtRQUNuQixJQUFJLGNBQXNCLENBQUM7UUFDM0IsSUFBSSxPQUFPLEVBQUU7WUFDWCxjQUFjLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDckQsU0FBUyxHQUFHLGNBQWMsQ0FBQztTQUM1QjthQUFNO1lBQ0wsY0FBYyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUNqRCxTQUFTLEdBQUcsY0FBYyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7U0FDL0M7UUFDRCxJQUFJLGNBQWMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN6QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxFQUFFO2dCQUNyQixNQUFNLElBQUksMkJBQWMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDN0M7WUFDRCxNQUFNO1NBQ1A7UUFDRCxDQUFDLEVBQUUsQ0FBQztLQUNMO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQXhDRCxzQkF3Q0MifQ==