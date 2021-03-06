'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat( n )) && isFinite( n );
};

let money,
    start = function () {
        do {
            money = prompt( 'Ваш месячный доход? ', '' );
        } while (!isNumber( money ));
};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    persentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        if ( confirm( 'Есть ли у вас дополнительный источник заработка?' ) ) {

            let itemIncome, cashIncome;
            
            do {
                itemIncome = prompt( 'Какой у вас дополнительный заработок? ', '' );
            } while ( !isNaN( itemIncome ) || itemIncome === '' || itemIncome === null );

            do {
                cashIncome = prompt( 'Сколько в месяце вы на этом зарабатываете? ', '' );
            } while (!isNumber( cashIncome ));
            
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt( 'Перечислите возможные расходы через запятую ', '' );
            appData.addExpenses = addExpenses.split( ' ' ).map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
            
            appData.deposit = confirm( 'Есть ли у вас депозит в банке? ' );
    
        let expenses, count;
        for (let i = 0; i < 2; i++) {

            do {
                expenses = prompt( 'Введите обязательную статью расходов? ', '' );
            } while ( !isNaN( expenses ) || expenses === '' || expenses === null );

            do {
                count = +prompt( 'Во сколько это обойдется? ', '' );
            } while ( !isNumber( count ) );

            appData.expenses[expenses] = count;
        }

    },
    // возвращает сумму всех обязательных расходов за месяц
    getExpensesMonth: function () {
        
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }

    },
    // результат вызова функции getBudget
    getBudget: function () {

        appData.budgetMonth = Math.floor(money - appData.budgetMonth);
        appData.budgetDay = appData.budgetMonth / 30;
        return money - appData.expensesMonth;

    },
    getTargetMonth: function () {

        let target = appData.mission / appData.budget;
        
        if ( target > 0 ) {
            console.log( "Цель будет достигнута: ", Math.floor( target ) );
        } else {
            console.log( "Цель не будет достигнута " );
        }

        return Math.floor( target );

    },
    getStatusIncome: function () {

        if ( appData.budgetDay >= 1200 ) {
            return ( 'У вас высокий уровень дохода' );
        } else if ( appData.budgetDay > 600 && appData.budgetDay < 1200 ) {
            return ( 'У вас средний уровень дохода' );
        } else if ( appData.budgetDay < 600 && appData.budgetDay > 0 ) {
            return ( 'К сожалению у вас уровень дохода ниже среднего' );
        } else if ( appData.budgetDay <= 0 || -appData.budgetDay ) {
            return ( 'Что то пошло не так' );
        }

    },
    getInfoDeposit: function () {

        if ( appData.deposit ) {

            do {
                appData.persentDeposit = prompt( 'Какой годовой процент? ', '' );
            } while ( !isNumber( appData.persentDeposit ) );

            do {
                appData.moneyDeposit = prompt( 'Какая сумма заложена? ', '' );
            } while ( !isNumber( appData.moneyDeposit ) );

        }
        
    },
    calcSavedMoney: function () {
      
        return appData.budgetMonth * appData.period;
        
    },
    wholeAppData: function () {

        for (let key in appData) {
            console.log('Наша программа ' + key + ' включает в себя данные: ' + appData[key]);
        }

    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSavedMoney();
appData.wholeAppData();


console.log( 'Расходы за месяц: ' + appData.expensesMonth);
console.log( 'За какой период будет достигнута цель (в месяцах): ' + appData.getTargetMonth());
console.log( 'Уровень дохода ' + appData.budgetDay);