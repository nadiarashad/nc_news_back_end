exports.formatDates = list => {

    const mappedList = list.map(arr => {
        return { ...arr }

    })
    mappedList.forEach((item) => {
        item.created_at = new Date(item.created_at)
    })
    return mappedList
}



exports.makeRefObj = (array) => {
    let referenceObj = {}
    for (let i = 0; i < array.length; i++) {
        referenceObj[array[i].title] = array[i].article_id
    }
    return referenceObj
};



exports.formatComments = (comments, refObject) => {

    const formattedComments = [];
    comments.forEach(comment => {
        formattedComments.push({ ...comment });
    });

    formattedComments.forEach(comment => {
        comment.article_id = refObject[comment.belongs_to];
        comment.author = comment.created_by;
        comment.created_at = new Date(comment.created_at);
        delete comment.belongs_to;
        delete comment.created_by;
    });
    return formattedComments;
};

