const display = document.getElementById("display");

//Is a date
const startDate = document.getElementById("startDate");

//Is a boolean
const sync = document.getElementById("sync");

//Repetitions options
//0, value: 'Não Repetir'
//1, value: 'A cada dia'
//2, value: 'A cada semana'
//3, value: 'A cada mês'
//4, value: 'A cada ano'
const optionSelected = document.getElementById("optionSelected");

//Duration of the repetition loop
//0, value: 'Sempre'
//1, value: 'Número de vezes'
//2, value: 'Até'
const optionsDurationSelected = document.getElementById("optionsDurationSelected");

//Days of the week when the events will repeat
//0, value: 'D'
//1, value: 'S'
//2, value: 'T'
//3, value: 'Q'
//4, value: 'Q'
//5, value: 'S'
//6, value: 'S'
const weekDaysSelected = document.getElementById("weekDaysSelected");

//Spcific parameters that define the repetition date per month
//0, value: 'Pelo número do dia'
//1, value: 'Pelo dia da semana'
//2, value: 'Último vez que aquele dia da semana aparece naquele mês'
//3, value: 'No último dia do mês'
const weekOptDurSelected = document.getElementById("weekOptDurSelected");

//Spcific parameters that define the repetition date per year
//0, value: 'Repetir no dia'
//1, value: 'Repetir em determinado dia da semana'
//2, value: 'Repetir na última aparição de determinado dia da semana'
//3, value: 'Repetir no último dia'
const yearOptDurSelected = document.getElementById("yearOptDurSelected");

//Interval of repetition
//Is the number of days between any repetition
const optDur = document.getElementById("optDur");

//Number of times the event repeats itself
//Is the number of times the event repeats itself
const optDur1 = document.getElementById("optDur1");

//Date until which the event repeats itself
//Is the date until which the event repeats itself
const optDur2 = document.getElementById("optDur2");

//Position of specific week day in a month, unless it is the last
//Is a vector where the first position is the specific position of that week day on any given month
//-The first position can store the value 'last' when the loop is designed to reaper at the last apparision
// of that week day in the month
//-The second position stores the week day
//[i, 0]
//[i, 1]
//[i, 2]
//[i, 3]
//[i, 4]
//[i, 5]
//[i, 6]
const weekDayRepeatOptionAux = document.getElementById("weekDayRepeatOptionAux");


function repeat() {

    /**/console.log('---------------repeat started---------------');
    console.log('startDate: ' + startDate);
    console.log('optionSelected: ' + optionSelected);
    console.log('optionsDurationSelected: ' + optionsDurationSelected);
    console.log('weekDaysSelected: ' + weekDaysSelected);
    console.log('weekOptDurSelected: ' + weekOptDurSelected);
    console.log('yearOptDurSelected: ' + yearOptDurSelected);
    console.log('optDur: ' + optDur);
    console.log('optDur1: ' + optDur1);
    console.log('optDur2: ' + optDur2);
    console.log('weekDayRepeatOptionAux: ' + weekDayRepeatOptionAux);/**/

    let optDur2Aux;
    let aux = new Date(startDate.getFullYear(), startDate.getMonth(), 32).getDate();
    let lastDay = 32 - aux;
    let startDateAux = startDate;
    let forever;
    let days = [];
    let i = 0;
    let i2 = 0;

    //Set date limit
    let dateAux;
    if (sync === true) {
        dateAux = new Date();
    }
    else {
        dateAux = startDateAux;
    }
    if (optionSelected < 3) {
        //latest date for day and week repetition
        if (optDur < 100) {
            forever = new Date(dateAux.getFullYear() + 1, dateAux.getMonth(), dateAux.getDate(),
            startDateAux.getHours(), 0, 0, 0);
        }
        else {
            forever = new Date(dateAux.getFullYear() + 3, dateAux.getMonth(), dateAux.getDate(),
            startDateAux.getHours(), 0, 0, 0);
        }
    }
    else {
        //latest date for month and year repetition
        forever = new Date(dateAux.getFullYear() + 10, dateAux.getMonth(), dateAux.getDate(),
        startDateAux.getHours(), 0, 0, 0);
    }

    //Check if chosen ending date goes beyond date limit
    if (optDur2.getTime() > forever.getTime()) {
        optDur2Aux = forever;
    }
    else {
        optDur2Aux = new Date(optDur2.getFullYear(), optDur2.getMonth(), optDur2.getDate(),
        startDate.getHours(), 0, 0, 0 );
    }

    switch (optionSelected) {
        case 0:
            //console.log('Não Repete');
            //Não repete
        break;
        case 1:
            //Por dia
            //console.log('Repete por dia');

            days.push(startDateAux);
            switch (optionsDurationSelected) {
                case 0:
                    //Sempre
                    //console.log('Sempre');

                    while (startDateAux.getTime() < forever.getTime()) {
                        startDateAux = new Date(startDateAux.getFullYear(), startDateAux.getMonth(),
                        startDateAux.getDate() + Number(optDur), startDateAux.getHours(), 0, 0, 0);
                        days.push(startDateAux);
                    }
                break;
                case 1:
                    //Número de vezes
                    //console.log('Número de vezes');

                    i = 0;
                    while (i < Number(optDur1)) {
                        startDateAux = new Date(startDateAux.getFullYear(), startDateAux.getMonth(),
                        startDateAux.getDate() + Number(optDur), startDateAux.getHours(), 0, 0, 0);
                        days.push(startDateAux);
                        i++;
                    }
                break;
                case 2:
                    //Até certo dia
                    //console.log('Até certo dia');

                    while (startDateAux.getTime() < optDur2Aux.getTime()) {
                        startDateAux = new Date(startDateAux.getFullYear(), startDateAux.getMonth(),
                        startDateAux.getDate() + Number(optDur), startDateAux.getHours(), 0, 0, 0);
                        days.push(startDateAux);
                    }
                break;
                default:
                break;
            }
        break;
        case 2:
            //Por semana
            //console.log('Repete por semana');

            switch (optionsDurationSelected) {
                case 0:
                    //Sempre
                    //console.log('Sempre');

                    while (startDateAux.getTime() < forever.getTime()) {
                        i2 = 0;
                        //week day check
                        while (i2 < 7) {
                            if (weekDaysSelected[i2] === startDateAux.getDay()) {
                                days.push(startDateAux);
                            }
                            i2++;
                        }
                        if (startDateAux.getDay() === 6) {
                            startDateAux = new Date(startDateAux.getFullYear(), startDateAux.getMonth(),
                            startDateAux.getDate() + (((Number(optDur) - 1) * 7) + 1),
                            startDateAux.getHours(), 0, 0, 0);
                        }
                        else {
                            startDateAux = new Date(startDateAux.getFullYear(), startDateAux.getMonth(),
                            startDateAux.getDate() + 1, startDateAux.getHours(), 0, 0, 0);
                        }
                    }
                break;
                case 1:
                    //Número de vezes
                    //console.log('Número de vezes');

                    i = 0;
                    while (i < Number(optDur1)) {
                        i2 = 0;
                        //week day check
                        while (i2 < 7) {
                            if (weekDaysSelected[i2] === startDateAux.getDay()) {
                                days.push(startDateAux);
                                i++;
                            }
                            i2++;
                        }
                        if (startDateAux.getDay() === 6) {
                            startDateAux = new Date(startDateAux.getFullYear(), startDateAux.getMonth(),
                            startDateAux.getDate() + (((Number(optDur) - 1) * 7) + 1),
                            startDateAux.getHours(), 0, 0, 0);
                        }
                        else {
                            startDateAux = new Date(startDateAux.getFullYear(), startDateAux.getMonth(),
                            startDateAux.getDate() + 1, startDateAux.getHours(), 0, 0, 0);
                        }
                    }
                break;
                case 2:
                    //Até certo dia
                    //console.log('Até certo dia');

                    while (startDateAux.getTime() < optDur2Aux.getTime()) {
                        i2 = 0;
                        //week day check
                        while (i2 < 7) {
                            if (weekDaysSelected[i2] === startDateAux.getDay()) {
                                days.push(startDateAux);
                            }
                            i2++;
                        }
                        if (startDateAux.getDay() === 6) {
                            startDateAux = new Date(startDateAux.getFullYear(), startDateAux.getMonth(),
                            startDateAux.getDate() + (((Number(optDur) - 1) * 7) + 1),
                            startDateAux.getHours(), 0, 0, 0);
                        }
                        else {
                            startDateAux = new Date(startDateAux.getFullYear(), startDateAux.getMonth(),
                            startDateAux.getDate() + 1, startDateAux.getHours(), 0, 0, 0);
                        }
                    }
                    i2 = 0;
                    //week day check
                    while (i2 < 7) {
                        if (weekDaysSelected[i2] === startDateAux.getDay()) {
                            days.push(startDateAux);
                        }
                        i2++;
                    }
                break;
                default:
                break;
            }
        break;
        case 3:
            //Por mês
            //console.log('Repete por mês');

            switch (optionsDurationSelected) {
                case 0:
                    //Sempre
                    //console.log('Sempre');

                    let day = startDateAux.getDate();
                    let month = startDateAux.getMonth();
                    let year = startDateAux.getFullYear();
                    switch (weekOptDurSelected) {
                        case 0:
                            //Repetir no dia
                            //console.log('Repetir o dia');

                            while (startDateAux.getTime() < forever.getTime()) {
                                if (day !== startDateAux.getDate()) {}
                                else {
                                    days.push(startDateAux);
                                }
                                month += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(), 0, 0, 0);
                            }
                        break;
                        case 1:
                            //Repetir em determinado dia da semana
                            //console.log('Repetir em determinado dia da semana');

                            while (startDateAux.getTime() < forever.getTime()) {

                                let listOfSelectedWeekDay = [];
                                let auxDay;
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;

                                aux = 1;
                                while (aux < lastDay + 1) {
                                    auxDay = new Date(year, month, aux).getDay();

                                    if (auxDay === weekDayRepeatOptionAux[1]) {
                                        listOfSelectedWeekDay.push(new Date(year, month, aux,
                                            startDateAux.getHours(), 0, 0, 0));
                                    }
                                    aux++;
                                }

                                aux = 0;
                                while (aux < listOfSelectedWeekDay.length) {
                                    if (aux === weekDayRepeatOptionAux[0]) {
                                        days.push(listOfSelectedWeekDay[aux]);
                                    }
                                    aux++;
                                }

                                month += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(), 0, 0, 0);
                            }
                        break;
                        case 2:
                            //Repetir na última aparição de determinado dia da semana

                            while (startDateAux.getTime() < forever.getTime()) {
                                let listOfSelectedWeekDay = [];
                                let auxDay;
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;

                                aux = 1;
                                while (aux < lastDay + 1) {
                                    auxDay = new Date(year, month, aux).getDay();

                                    if (auxDay === weekDayRepeatOptionAux[1]) {
                                        listOfSelectedWeekDay.push(new Date(year, month, aux,
                                            startDateAux.getHours(), 0, 0, 0));
                                    }
                                    aux++;
                                }

                                aux = listOfSelectedWeekDay.length - 1;
                                days.push(listOfSelectedWeekDay[aux]);

                                month += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(), 0, 0, 0);
                            }
                        break;
                        case 3:
                            //Repetir no último dia
                            //console.log('Repetir o último dia');

                            while (startDateAux.getTime() < forever.getTime()) {
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;
                                startDateAux = new Date(year, month, lastDay, startDateAux.getHours(),
                                0, 0, 0);
                                days.push(startDateAux);
                                month += Number(optDur);
                            }
                        break;
                        default:
                        break;
                    }
                break;
                case 1:
                    //Número de vezes
                    //console.log('Número de vezes');

                    i = 0;
                    day = startDateAux.getDate();
                    month = startDateAux.getMonth();
                    year = startDateAux.getFullYear();
                    switch (weekOptDurSelected) {
                        case 0:
                            //Repetir no dia
                            //console.log('Repetir o dia');

                            while (i < Number(optDur1)) {
                                if (day !== startDateAux.getDate()) {}
                                else {
                                    days.push(startDateAux);
                                    i++;
                                }
                                month += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(), 0, 0, 0);
                            }
                        break;
                        case 1:
                            //Repetir em determinado dia da semana
                            //console.log('Repetir em determinado dia da semana');

                            i = 0;
                            while (i < Number(optDur1)) {

                                let listOfSelectedWeekDay = [];
                                let auxDay;
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;

                                aux = 1;
                                while (aux < lastDay + 1) {
                                    auxDay = new Date(year, month, aux).getDay();

                                    if (auxDay === weekDayRepeatOptionAux[1]) {
                                        listOfSelectedWeekDay.push(new Date(year, month, aux,
                                            startDateAux.getHours(), 0, 0, 0));
                                    }
                                    aux++;
                                }

                                aux = 0;
                                while (aux < listOfSelectedWeekDay.length) {
                                    if (aux === weekDayRepeatOptionAux[0]) {
                                        days.push(listOfSelectedWeekDay[aux]);
                                        i++;
                                    }
                                    aux++;
                                }

                                month += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(),
                                0, 0, 0);
                            }
                        break;
                        case 2:
                            //Repetir na última aparição de determinado dia da semana

                            while (i < Number(optDur1)) {
                                let listOfSelectedWeekDay = [];
                                let auxDay;
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;

                                aux = 1;
                                while (aux < lastDay + 1) {
                                    auxDay = new Date(year, month, aux).getDay();

                                    if (auxDay === weekDayRepeatOptionAux[1]) {
                                        listOfSelectedWeekDay.push(new Date(year, month, aux,
                                            startDateAux.getHours(), 0, 0, 0));
                                    }
                                    aux++;
                                }

                                aux = listOfSelectedWeekDay.length - 1;
                                days.push(listOfSelectedWeekDay[aux]);

                                i++;
                                month += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(),
                                0, 0, 0);
                            }
                        break;
                        case 3:
                            //Repetir no último dia
                            //console.log('Repetir o último dia');

                            while (i < Number(optDur1)) {
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;
                                startDateAux = new Date(year, month, lastDay, startDateAux.getHours(), 0, 0, 0);

                                days.push(startDateAux);
                                month += Number(optDur);
                                i++;
                            }
                        break;
                        default:
                        break;
                    }
                break;
                case 2:
                    //Até certo dia
                    //console.log('Até certo dia');

                    day = startDateAux.getDate();
                    month = startDateAux.getMonth();
                    year = startDateAux.getFullYear();
                    switch (weekOptDurSelected) {
                        case 0:
                            //Repetir no dia
                            //console.log('Repetir o dia');

                            while (startDateAux.getTime() <= optDur2Aux.getTime()) {
                                if (day !== startDateAux.getDate()) {}
                                else {
                                    days.push(startDateAux);
                                }
                                month += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(), 0, 0, 0);
                            }
                        break;
                        case 1:
                            //Repetir em determinado dia da semana
                            //console.log('Repetir em determinado dia da semana');
                            while (startDateAux.getTime() <= optDur2Aux.getTime()) {

                                let listOfSelectedWeekDay = [];
                                let auxDay;
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;

                                aux = 1;
                                while (aux < lastDay + 1) {
                                    auxDay = new Date(year, month, aux).getDay();

                                    if (auxDay === weekDayRepeatOptionAux[1]) {
                                        listOfSelectedWeekDay.push(new Date(year, month, aux,
                                            startDateAux.getHours(), 0, 0, 0));
                                    }
                                    aux++;
                                }

                                aux = 0;
                                while (aux < listOfSelectedWeekDay.length) {
                                    if (aux === weekDayRepeatOptionAux[0]) {
                                        days.push(listOfSelectedWeekDay[aux]);
                                    }
                                    aux++;
                                }

                                month += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(), 0, 0, 0);
                            }
                        break;
                        case 2:
                            //Repetir na última aparição de determinado dia da semana

                            while (startDateAux.getTime() <= optDur2Aux.getTime()) {
                                let listOfSelectedWeekDay = [];
                                let auxDay;
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;

                                aux = 1;
                                while (aux < lastDay + 1) {
                                    auxDay = new Date(year, month, aux).getDay();

                                    if (auxDay === weekDayRepeatOptionAux[1]) {
                                        listOfSelectedWeekDay.push(new Date(year, month, aux,
                                            startDateAux.getHours(), 0, 0, 0));
                                    }
                                    aux++;
                                }

                                aux = listOfSelectedWeekDay.length - 1;
                                days.push(listOfSelectedWeekDay[aux]);

                                month += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(), 0, 0, 0);
                            }
                        break;
                        case 3:
                            //Repetir no último dia
                            //console.log('Repetir o último dia');

                            while (startDateAux.getTime() <= optDur2Aux.getTime()) {

                                days.push(startDateAux);
                                month += Number(optDur);
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;
                                startDateAux = new Date(year, month, lastDay, startDateAux.getHours(),
                                0, 0, 0);
                            }
                        break;
                        default:
                        break;
                    }
                break;
                }
        break;
        case 4:
            //Por ano
            //console.log('Repete por ano');

            switch (optionsDurationSelected) {
                case 0:
                    //Sempre
                    //console.log('Sempre');

                    let day = startDateAux.getDate();
                    let month = startDateAux.getMonth();
                    let year = startDateAux.getFullYear();
                    switch (yearOptDurSelected) {
                        case 0:
                            //Repetir no dia
                            //console.log('Repetir o dia');

                            while (startDateAux.getTime() < forever.getTime()) {
                                if (day !== startDateAux.getDate()) {}
                                else {
                                    days.push(startDateAux);
                                }
                                year += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(), 0, 0, 0);
                            }
                        break;
                        case 1:
                            //Repetir em determinado dia da semana
                            //console.log('Repetir em determinado dia da semana');

                            while (startDateAux.getTime() < forever.getTime()) {

                                let listOfSelectedWeekDay = [];
                                let auxDay;
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;

                                aux = 1;
                                while (aux < lastDay + 1) {
                                    auxDay = new Date(year, month, aux).getDay();

                                    if (auxDay === weekDayRepeatOptionAux[1]) {
                                        listOfSelectedWeekDay.push(new Date(year, month, aux,
                                            startDateAux.getHours(), 0, 0, 0));
                                    }
                                    aux++;
                                }

                                aux = 0;
                                while (aux < listOfSelectedWeekDay.length) {
                                    if (aux === weekDayRepeatOptionAux[0]) {
                                        days.push(listOfSelectedWeekDay[aux]);
                                    }
                                    aux++;
                                }

                                year += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(), 0, 0, 0);
                            }
                        break;
                        case 2:
                            //Repetir na última aparição de determinado dia da semana

                            while (startDateAux.getTime() < forever.getTime()) {
                                let listOfSelectedWeekDay = [];
                                let auxDay;
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;

                                aux = 1;
                                while (aux < lastDay + 1) {
                                    auxDay = new Date(year, month, aux).getDay();

                                    if (auxDay === weekDayRepeatOptionAux[1]) {
                                        listOfSelectedWeekDay.push(new Date(year, month, aux,
                                            startDateAux.getHours(), 0, 0, 0));
                                    }
                                    aux++;
                                }

                                aux = listOfSelectedWeekDay.length - 1;
                                days.push(listOfSelectedWeekDay[aux]);

                                year += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(), 0, 0, 0);
                            }
                        break;
                        case 3:
                            //Repetir no último dia
                            //console.log('Repetir o último dia');

                            while (startDateAux.getTime() < forever.getTime()) {
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;
                                startDateAux = new Date(year, month, lastDay, startDateAux.getHours(),
                                0, 0, 0);

                                days.push(startDateAux);
                                year += Number(optDur);
                            }
                        break;
                        default:
                        break;
                    }
                break;
                case 1:
                    //Número de vezes
                    //console.log('Número de vezes');

                    i = 0;
                    day = startDateAux.getDate();
                    month = startDateAux.getMonth();
                    year = startDateAux.getFullYear();
                    switch (yearOptDurSelected) {
                        case 0:
                            //Repetir no dia
                            //console.log('Repetir o dia');

                            while (i < Number(optDur1)) {
                                if (day !== startDateAux.getDate()) {}
                                else {
                                    days.push(startDateAux);
                                    i++;
                                }
                                year += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(), 0, 0, 0);
                            }
                        break;
                        case 1:
                            //Repetir em determinado dia da semana
                            //console.log('Repetir em determinado dia da semana');

                            i = 0;
                            while (i < Number(optDur1)) {

                                let listOfSelectedWeekDay = [];
                                let auxDay;
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;

                                aux = 1;
                                while (aux < lastDay + 1) {
                                    auxDay = new Date(year, month, aux).getDay();

                                    if (auxDay === weekDayRepeatOptionAux[1]) {
                                        listOfSelectedWeekDay.push(new Date(year, month, aux,
                                            startDateAux.getHours(), 0, 0, 0));
                                    }
                                    aux++;
                                }

                                aux = 0;
                                while (aux < listOfSelectedWeekDay.length) {
                                    if (aux === weekDayRepeatOptionAux[0]) {
                                        days.push(listOfSelectedWeekDay[aux]);
                                        i++;
                                    }
                                    aux++;
                                }

                                year += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(),
                                0, 0, 0);
                            }
                        break;
                        case 2:
                            //Repetir na última aparição de determinado dia da semana

                            i = 0;
                            while (i < Number(optDur1)) {
                                let listOfSelectedWeekDay = [];
                                let auxDay;
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;

                                aux = 1;
                                while (aux < lastDay + 1) {
                                    auxDay = new Date(year, month, aux).getDay();

                                    if (auxDay === weekDayRepeatOptionAux[1]) {
                                        listOfSelectedWeekDay.push(new Date(year, month, aux,
                                            startDateAux.getHours(), 0, 0, 0));
                                    }
                                    aux++;
                                }

                                aux = listOfSelectedWeekDay.length - 1;
                                days.push(listOfSelectedWeekDay[aux]);

                                i++;
                                year += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(),
                                0, 0, 0);
                            }
                        break;
                        case 3:
                            //Repetir no último dia
                            //console.log('Repetir o último dia');

                            while (i < Number(optDur1)) {
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;
                                startDateAux = new Date(year, month, lastDay, startDateAux.getHours(), 0, 0, 0);
                                days.push(startDateAux);
                                year += Number(optDur);
                                i++;
                            }
                        break;
                        default:
                        break;
                    }
                break;
                case 2:
                    //Até certo dia
                    //console.log('Até certo dia');

                    day = startDateAux.getDate();
                    month = startDateAux.getMonth();
                    year = startDateAux.getFullYear();
                    switch (yearOptDurSelected) {
                        case 0:
                            //Repetir no dia
                            //console.log('Repetir o dia');

                            while (startDateAux.getTime() <= optDur2Aux.getTime()) {
                                if (day !== startDateAux.getDate()) {}
                                else {
                                    days.push(startDateAux);
                                }
                                year += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(), 0, 0, 0);
                            }
                        break;
                        case 1:
                            //Repetir em determinado dia da semana
                            //console.log('Repetir em determinado dia da semana');

                            while (startDateAux.getTime() <= optDur2Aux.getTime()) {

                                let listOfSelectedWeekDay = [];
                                let auxDay;
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;

                                aux = 1;
                                while (aux < lastDay + 1) {
                                    auxDay = new Date(year, month, aux).getDay();

                                    if (auxDay === weekDayRepeatOptionAux[1]) {
                                        listOfSelectedWeekDay.push(new Date(year, month, aux,
                                            startDateAux.getHours(), 0, 0, 0));
                                    }
                                    aux++;
                                }

                                aux = 0;
                                while (aux < listOfSelectedWeekDay.length) {
                                    if (aux === weekDayRepeatOptionAux[0]) {
                                        days.push(listOfSelectedWeekDay[aux]);
                                    }
                                    aux++;
                                }

                                year += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(),
                                0, 0, 0);
                            }
                        break;
                        case 2:
                            //Repetir na última aparição de determinado dia da semana

                            while (startDateAux.getTime() <= optDur2Aux.getTime()) {
                                let listOfSelectedWeekDay = [];
                                let auxDay;
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;

                                aux = 1;
                                while (aux < lastDay + 1) {
                                    auxDay = new Date(year, month, aux).getDay();

                                    if (auxDay === weekDayRepeatOptionAux[1]) {
                                        listOfSelectedWeekDay.push(new Date(year, month, aux,
                                            startDateAux.getHours(), 0, 0, 0));
                                    }
                                    aux++;
                                }

                                aux = listOfSelectedWeekDay.length - 1;
                                days.push(listOfSelectedWeekDay[aux]);

                                year += Number(optDur);
                                startDateAux = new Date(year, month, day, startDateAux.getHours(),
                                0, 0, 0);
                            }
                        break;
                        case 3:
                            //Repetir no último dia
                            //console.log('Repetir o último dia');

                            while (startDateAux.getTime() <= optDur2Aux.getTime()) {
                                aux = new Date(year, month, 32).getDate();
                                lastDay = 32 - aux;
                                days.push(startDateAux);
                                year += Number(optDur);
                                startDateAux = new Date(year, month, lastDay, startDateAux.getHours(),
                                0, 0, 0);
                                i++;
                            }
                        break;
                        default:
                        break;
                    }
                break;
                }
        break;
        default:
        break;
    }

    /*i = 0;
    while (i < days.length) {
        console.log(days[i].getDate() + '/' + (days[i].getMonth() + 1) + '/' + days[i].getFullYear());
        i++;
    }*/

    //console.log('days.length: ' + days.length);
    //console.log('optDur1: ' + optDur1);
    //console.log('optDur2: ' + optDur2);
    //console.log('---------------repeat ended---------------');

    //return (days);
    display.removeChild(display.lastChild);
    display.appendChild(document.createTextNode(days));
}