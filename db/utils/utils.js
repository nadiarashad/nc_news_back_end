exports.formatDates = list => {

    const mappedList = list.map(arr => {
        return { ...arr }

    })
    mappedList.forEach((item) => {
        item.created_at = new Date(item.created_at)
    })
    return mappedList
}



exports.makeRefObj = (list, param1, param2) => {
    let referenceObj = {}
    for (let i = 0; i < list.length; i++) {
        referenceObj[list[i][param1]] = list[i][param2]
    }
    return referenceObj
};

exports.formatComments = (commentsArray, referenceObject) => {



    //comments, param1, param2
    // const newArray = comments.map(arr => {
    //     return { ...arr }
    // })

    // for (let i = 0; i < newArray.length; i++) {
    //     newArray[i][referenceObject] = newArray[i][param1]
    //     delete newArray[i][param1]
    //     // console.log(newArray)
    // }
    // // console.log(newArray)
    // return newArray
};

/*


Each formatted comment must have:

- Its `created_by` property renamed to an `author` key
- Its `belongs_to` property renamed to an `article_id` key
- The value of the new `article_id` key must be the id corresponding to the original title value provided
- Its `created_at` value converted into a javascript date object
- The rest of the comment's properties must be maintained
*/