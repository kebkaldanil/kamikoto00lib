"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapArrayToObject = exports.swapKeyAndValueFromEnd = exports.swapKeyAndValue = exports.mapDict = exports.extendsObjectWithOnceComputedProperties = exports.computePropertyOnce = exports.jsonCopy = void 0;
const split_1 = require("./split");
function jsonCopy(obj) {
    const res = {};
    for (const nm in obj) {
        const v = obj[nm];
        switch (typeof v) {
            case "object":
                res[nm] = jsonCopy(v);
                break;
            case "string":
            case "number":
            case "boolean":
                res[nm] = v;
        }
    }
    return res;
}
exports.jsonCopy = jsonCopy;
function computePropertyOnce(obj, key, compute) {
    Object.defineProperty(obj, key, {
        get: () => {
            //@ts-expect-error
            delete obj[key];
            return obj[key] = compute();
        },
        configurable: true,
        enumerable: true,
    });
}
exports.computePropertyOnce = computePropertyOnce;
function extendsObjectWithOnceComputedProperties(obj, compute) {
    const keys = [];
    const symbols = Object.getOwnPropertySymbols(compute);
    for (const key in compute) {
        keys.push(key);
    }
    for (const key of symbols) {
        keys.push(key);
    }
    const descriptors = Object.fromEntries(keys.map(key => {
        const descriptor = {
            get() {
                delete obj[key];
                return obj[key] = compute[key]();
            },
            configurable: true,
            enumerable: true,
        };
        return [
            key,
            descriptor,
        ];
    }));
    Object.defineProperties(obj, descriptors);
}
exports.extendsObjectWithOnceComputedProperties = extendsObjectWithOnceComputedProperties;
function mapDict(src, cb) {
    return Object.fromEntries(Object.entries(src).map(([key, value]) => [key, cb(key, value)]));
}
exports.mapDict = mapDict;
function swapKeyAndValue(object) {
    return Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]));
}
exports.swapKeyAndValue = swapKeyAndValue;
function swapKeyAndValueFromEnd(object) {
    return Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]).reverse());
}
exports.swapKeyAndValueFromEnd = swapKeyAndValueFromEnd;
function mapArrayToObject(array, options) {
    if (!options)
        options = {};
    const processor = (options.processor || ((el) => (0, split_1.split)(el, "=", { minLength: 2, maxLength: 2 })));
    const throwIfError = options.throwIfError ?? true;
    const allowBooleanIfOnlyKey = options.allowBooleanIfOnlyKey ?? false;
    const emptyIsError = options.emptyIsError ?? false;
    const toManyIsError = options.toManyIsError ?? false;
    const res = {};
    array.forEach(s => {
        try {
            const a = processor(s);
            if (a) {
                switch (a.length) {
                    case 0:
                        if (emptyIsError)
                            throw new Error("Empty result");
                        break;
                    case 1:
                        if (allowBooleanIfOnlyKey) {
                            res[a[0]] = true;
                        }
                        else
                            throw new Error("Only key found");
                        break;
                    default:
                        if (toManyIsError)
                            throw new Error("Too many elements in result");
                    // eslint-disable-next-line no-fallthrough
                    case 2: {
                        res[a[0]] = a[1];
                        break;
                    }
                }
            }
            else if (emptyIsError) {
                throw new Error("Empty result");
            }
        }
        catch (e) {
            if (throwIfError)
                throw e;
            return;
        }
    });
    return res;
}
exports.mapArrayToObject = mapArrayToObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBZ0M7QUFpQmhDLFNBQWdCLFFBQVEsQ0FBNEIsR0FBTTtJQUN4RCxNQUFNLEdBQUcsR0FBRyxFQUFTLENBQUM7SUFDdEIsS0FBSyxNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUU7UUFDcEIsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLFFBQVEsT0FBTyxDQUFDLEVBQUU7WUFDaEIsS0FBSyxRQUFRO2dCQUNYLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBOEIsQ0FBQyxDQUFDO2dCQUNuRCxNQUFNO1lBQ1IsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssU0FBUztnQkFDWixHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7S0FDRjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQWZELDRCQWVDO0FBRUQsU0FBZ0IsbUJBQW1CLENBS2pDLEdBQU0sRUFDTixHQUFNLEVBQ04sT0FBZ0I7SUFFaEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO1FBQzlCLEdBQUcsRUFBRSxHQUFHLEVBQUU7WUFDUixrQkFBa0I7WUFDbEIsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsT0FBUSxHQUFvQixDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBQ2hELENBQUM7UUFDRCxZQUFZLEVBQUUsSUFBSTtRQUNsQixVQUFVLEVBQUUsSUFBSTtLQUNqQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBbEJELGtEQWtCQztBQU1ELFNBQWdCLHVDQUF1QyxDQUdyRCxHQUFNLEVBQUUsT0FBbUI7SUFDM0IsTUFBTSxJQUFJLEdBQXdCLEVBQUUs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