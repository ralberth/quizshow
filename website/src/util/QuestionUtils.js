const QuestionUtils = {
    buildQuesXref: (game) => {
        var ret = new Map();
        game.categories.forEach(catg =>
            catg.questions.forEach(ques =>
                ret.set(ques.quesId, ques)));
        return ret;
    }
}

export default QuestionUtils;
