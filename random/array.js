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
exports.array = void 0;
const number = __importStar(require("./number"));
const int = __importStar(require("./int"));
const split_1 = require("../split");
exports.array = {
    of(type, length) {
        const [gtype, srange] = (0, split_1.split)(type, ":", { minLength: 2, maxLength: 2 });
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
                for (let i = 0; i < length; i++) {
                    const length = int.inRange(fromAsString.length, toAsString.length + 1);
                    let str = "";
                    for (let stri = 0; stri < length; stri++) {
                        str += String.fromCodePoint(int.inRange(fromAsString.codePointAt(stri), toAsString.codePointAt(stri)));
                    }
                    result[i] = str;
                }
                return result;
            }
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmFuZG9tL2FycmF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW1DO0FBQ25DLDJDQUE2QjtBQUM3QixvQ0FBaUM7QUFHcEIsUUFBQSxLQUFLLEdBQUc7SUFDbkIsRUFBRSxDQUFDLElBQW1CLEVBQUUsTUFBYztRQUNwQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUEsYUFBSyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sVUFBVSxHQUFHLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksWUFBZ0MsQ0FBQztRQUNyQyxJQUFJLFVBQWtCLENBQUM7UUFDdkIsSUFBSSxVQUFVLEtBQUssS0FBSyxDQUFDLElBQUksVUFBVSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzlDLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMzQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLFVBQVUsR0FBRyxNQUFNLENBQUM7U0FDckI7UUFDRCxRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssUUFBUSxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO2dCQUM1QixrQkFBa0I7Z0JBQ2xCLE1BQU0sSUFBSSxHQUFHLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDL0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUN0QztnQkFDRCxPQUFPLE1BQU0sQ0FBQzthQUNmO1lBQ0QsS0FBSyxLQUFLLENBQUMsQ0FBQztnQkFDVixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7Z0JBQzVCLDZEQUE2RDtnQkFDN0QsZ0JBQWdCO2dCQUNoQixNQUFNLElBQUksR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMvQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ25DO2dCQUNELE9BQU8sTUFBTSxDQUFDO2FBQ2Y7WUFDRCxLQUFLLFFBQVEsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO29CQUM5QixZQUFZLEdBQUcsRUFBRSxDQUFDO2lCQUNuQjtnQkFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMvQixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDdkUsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO29CQUNiLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7d0JBQ3hDLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUN6QixHQUFHLENBQUMsT0FBTyxDQUNULFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFFLEVBQy9CLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFFLENBQzlCLENBQ0YsQ0FBQztxQkFDSDtvQkFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUNqQjtnQkFDRCxPQUFPLE1BQU0sQ0FBQzthQUNmO1NBQ0Y7SUFDSCxDQUFDO0NBVUYsQ0FBQyJ9