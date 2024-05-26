class CorrectDate {
    checkTheDateEndIsCorrect(date: string) {
        if (date[0] === '0') return false; // Дата приходит в формате yyyy-mm-dd
        return true;                        // Если в году первый 0, то он на клиенте
    }                                        //Потом будет выдавать не корректную дату
}                                           //Поэтому говорю, что года меньше 1000 не может быть) 

export default new CorrectDate();