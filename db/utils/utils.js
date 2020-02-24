exports.formatDates = list => {

    const mappedList = list.map(arr => {
        return { ...arr }

    })
    mappedList.forEach((item) => {
        item.created_at = new Date(item.created_at)
    })
    return mappedList
}



exports.makeRefObj = (array, param1, param2) => {
    let referenceObj = {}
    for (let i = 0; i < array.length; i++) {
        referenceObj[array[i][param1]] = array[i][param2]
    }
    // console.log(referenceObj)
    return referenceObj
};



exports.formatComments = (commentsArray, refObj, oldKey, newKey) => {

    // console.log(oldKey, 'oldkey')
    // console.log(newKey, 'newKey')
    // console.log(refObj)

    const newArray = [...commentsArray]

    newArray.forEach(item => {
        item[newKey] = refObj[newArray.oldKey];
        delete item[oldKey];
    })
    // console.log(newArray, 'newArray')
    return newArray

};

/*
Each formatted comment must have:

- Its `created_by` property renamed to an `author` key
- Its `belongs_to` property renamed to an `article_id` key
- The value of the new `article_id` key must be the id corresponding to the original title value provided
- Its `created_at` value converted into a javascript date object
- The rest of the comment's properties must be maintained
*/