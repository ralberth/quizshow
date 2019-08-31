const QuestionUtils = {
    buildQuesXref: (game) => {
        var ret = {};
        game.categories.forEach(catg =>
            catg.questions.forEach(ques =>
                ret[ques.quesId] = ques));
        return ret;
    }
}

export default QuestionUtils;
