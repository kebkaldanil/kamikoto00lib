"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.of = void 0;
const number = __importStar(require("./number"));
const int = __importStar(require("./int"));
const split_1 = require("../split");
function of(type, length) {
    const [gtype, srange] = (0, split_1.split)(type, ":", { minLength: 1, maxLength: 2 });
    const srangeDeli = srange?.indexOf("-", 1);
    let fromAsString;
    let toAsString;
    if (srangeDeli !== void 0 && srangeDeli !== -1) {
        fromAsString = srange.slice(0, srangeDeli);
        toAsString = srange.slice(srangeDeli + 1);
    }
    else {
        toAsString = srange;
    }
    switch (gtype) {
        case "number": {
            const result = [];
            //@ts-expect-error
            const from = +fromAsString || 0;
            const to = +(toAsString ?? 1);
            for (let i = 0; i < length; i++) {
                result[i] = number.inRange(from, to);
            }
            return result;
        }
        case "int": {
            const result = [];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /**@ts-ignore */
            const from = fromAsString | 0;
            const to = +(toAsString ?? Number.MAX_SAFE_INTEGER);
            for (let i = 0; i < length; i++) {
                result[i] = int.inRange(from, to);
            }
            return result;
        }
        case "string": {
            const result = [];
            if (fromAsString === undefined) {
                fromAsString = "";
            }
            let defaultFrom = NaN;
            for (let i = 0; i < fromAsString.length; i++) {
                const cur = fromAsString.codePointAt(0);
                if (cur < defaultFrom) {
                    defaultFrom = cur;
                }
            }
            if (Number.isNaN(defaultFrom)) {
                defaultFrom = 97; //a
            }
            let defaultTo = 0;
            for (let i = 0; i < fromAsString.length; i++) {
                const cur = fromAsString.codePointAt(0);
                if (cur > defaultTo) {
                    defaultTo = cur;
                }
            }
            if (toAsString === undefined) { //z
                toAsString = String.fromCodePoint(defaultTo || 122).repeat(Math.max(fromAsString.length, 1));
            }
            for (let i = 0; i < length; i++) {
                const length = int.inRange(fromAsString.length || 1, toAsString.length + 1);
                let str = "";
                for (let stri = 0; stri < length; stri++) {
                    str += String.fromCodePoint(int.inRange(fromAsString.codePointAt(stri) || defaultFrom, toAsString.codePointAt(stri) || defaultTo));
                }
                result[i] = str;
            }
            return result;
        }
    }
    throw new Error();
}
exports.of = of;
;
/*,
} as {
of(
type: "number" | "int" | `number:${number}-${number}` | `int:${number}-${number}`,
length: number
): number[];
of(
type: `string:${string}-${string}`,
length: number
): string[];
};*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuanMiLCJzb3VyY2VSb290IjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2tlYmthbGRhbmlsL2thbWlrb3RvMDBsaWIvbWFzdGVyL3NyYy8iLCJzb3VyY2VzIjpbInJhbmRvbS9hcnJheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFtQztBQUNuQywyQ0FBNkI7QUFDN0Isb0NBQWlDO0FBU2pDLFNBQWdCLEVBQUUsQ0FBQyxJQUFtQixFQUFFLE1BQWM7SUFDcEQsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFBLGFBQUssRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6RSxNQUFNLFVBQVUsR0FBRyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxJQUFJLFlBQWdDLENBQUM7SUFDckMsSUFBSSxVQUFrQixDQUFDO0lBQ3ZCLElBQUksVUFBVSxLQUFLLEtBQUssQ0FBQyxJQUFJLFVBQVUsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM5QyxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDM0MsVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzNDO1NBQU07UUFDTCxVQUFVLEdBQUcsTUFBTSxDQUFDO0tBQ3JCO0lBQ0QsUUFBUSxLQUFLLEVBQUU7UUFDYixLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO1lBQzVCLGtCQUFrQjtZQUNsQixNQUFNLElBQUksR0FBRyxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUM7WUFDaEMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxD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