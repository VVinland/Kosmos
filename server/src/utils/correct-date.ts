class CorrectDate {
    checkTheDateEndIsCorrect(date: string) {
        if (date[0] === '0') return false;
        return true;
    }
}

export default new CorrectDate();