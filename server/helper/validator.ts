import validate from "validate.js";
import {DateTime} from "luxon";

validate.extend(validate.validators.datetime, {
    parse: function (value: any) {
        return DateTime.fromISO(value).toJSDate();
    },
    format: function (value: any) {
        return value.toFormat('yyyy-MM-dd');
    }
});

export default validate;