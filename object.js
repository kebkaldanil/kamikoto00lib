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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LmpzIiwic291cmNlUm9vdCI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9rZWJrYWxkYW5pbC9rYW1pa290bzAwbGliL21hc3Rlci9zcmMvIiwic291cmNlcyI6WyJvYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQWdDO0FBaUJoQyxTQUFnQixRQUFRLENBQTRCLEdBQU07SUFDeEQsTUFBTSxHQUFHLEdBQUcsRUFBUyxDQUFDO0lBQ3RCLEtBQUssTUFBTSxFQUFFLElBQUksR0FBRyxFQUFFO1FBQ3BCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixRQUFRLE9BQU8sQ0FBQyxFQUFFO1lBQ2hCLEtBQUssUUFBUTtnQkFDWCxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQThCLENBQUMsQ0FBQztnQkFDbkQsTUFBTTtZQUNSLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFNBQVM7Z0JBQ1osR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNmO0tBQ0Y7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFmRCw0QkFlQztBQUVELFNBQWdCLG1CQUFtQixDQUtqQyxHQUFNLEVBQ04sR0FBTSxFQUNOLE9BQWdCO0lBRWhCLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtRQUM5QixHQUFHLEVBQUUsR0FBRyxFQUFFO1lBQ1Isa0JBQWtCO1lBQ2xCLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLE9BQVEsR0FBb0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQztRQUNoRCxDQUFDO1FBQ0QsWUFBWSxFQUFFLElBQUk7UUFDbEIsVUFBVSxFQUFFLElBQUk7S0FDakIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWxCRCxrREFrQkM7QUFNRCxT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