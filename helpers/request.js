


const validateIntValue = function (value, base, defaultValue = 0) {
    return parseInt(value ?? defaultValue, base);
}






const validateCountOffset = function (req) {
    return new Promise((resolve, reject) => {
        const page = parseInt(req.query.page ?? process.env.DEFAULT_PAGE_NUMBER, process.env.BASE_10);
        
        const count = validateIntValue(req.query?.count, process.env.BASE_10, process.env.DEFAULT_COUNT_VALUE);
        let offset = validateIntValue(req.query?.offset, process.env.BASE_10, process.env.DEFAULT_OFFSET_VALUE);
        const maxCount = validateIntValue(process.env.DEFAULT_MAX_COUNT_LIMIT, process.env.BASE_10);

        if (isNaN(offset) || isNaN(count))
            reject(process.env.COUNT_OFFSET_VALIDATION_MSG);

        if (count > maxCount)
            reject(`${process.env.MAX_COUNT_VALIDATION_MSG} ${maxCount}`);


        if (page) {
            offset = (page * count) - count;
        }

        resolve({ count, offset })
    })

}


module.exports = {
    validateCountOffset
}