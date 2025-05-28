const { randomUserMock, additionalUsers } = require('./FE4U-Lab3-mock.js');
const scripts = require('./script.js');

// 1: форматування даних та об'єднання об'єктів
const formattedData = scripts.processUserData(randomUserMock, additionalUsers);

// виведення результатів
const displayFormattedData = () => {
    console.log("Formatted Data:");
    console.log(formattedData);
};

// 2: валідація об'єкта
const objectToValidate1 = {
    full_name: "taras Shewchenko",
    gender: "Male",
    note: "Loremipsum",
    state: "Hz",
    city: "Kyiv",
    country: "Ukraine",
    age: 46,
    phone: "123-456-789",
    email: "curtis.mendoza@example.com"
};

const objectToValidate2 = {
    full_name: "Taras Shevchenko",
    gender: "Male",
    note: "Loremipsum",
    state: "Hz",
    city: "Kyiv",
    country: "Ukraine",
    age: 46,
    phone: "123-456-7890",
    email: "curtis.mendoza@example.com"
};

const validateData = () => {
    console.log("Validation Results:");
    console.log(`Object 1 is valid: ${scripts.validateObject(objectToValidate1)}`);
    console.log(`Object 2 is valid: ${scripts.validateObject(objectToValidate2)}`);
};

// 3: фільтрація об'єктів
const filterBy = { country: "Finland", age: 36, gender: "male", favorite: false };
const filterData = () => {
    const filteredUsers = scripts.filterUsers(formattedData, filterBy.country, filterBy.age, filterBy.gender, filterBy.favorite);
    console.log("Filtered Users:");
    console.log(filteredUsers);
};

// 4: сортування об'єктів
const sortBy = "city";
const sortOrder = "asc";
const sortData = () => {
    const sortedUsers = scripts.sortUsers(formattedData, sortBy, sortOrder);
    console.log("Sorted Users (first 15):");
    console.log(sortedUsers.slice(0, 15));
};

// 5: пошук об'єкта
const searchParams = ["Taras", "Australia"];
const searchData = () => {
    searchParams.forEach(param => {
        const foundUser = scripts.findUser(formattedData, param);
        console.log(`Found User for "${param}":`);
        console.log(foundUser);
    });
};

// 6: обчислення відсотка
const percentageParams = ["Taras", "Pektemek"];
const calculatePercentageData = () => {
    percentageParams.forEach(param => {
        const percentage = scripts.calculatePercentage(formattedData, param);
        console.log(`Percentage for "${param}": ${percentage}%`);
    });
};

const readline = require('readline');

const executeTasks = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const menu = `
Choose your option:
1 - Data Formatting
2 - Data Validation
3 - Data Filtration
4 - Data Sorting
5 - Search
6 - Percentage
> `;

    rl.question(menu, (answer) => {
        const task = Number(answer);

        if (isNaN(task) || task < 1 || task > 6) {
            console.log("Wrong. Try again.");
            rl.close();
            return;
        }

        if (task === 2) {
            validateData();
        } else {
            switch (task) {
                case 1:
                    displayFormattedData();
                case 3:
                    filterData();
                    break;
                case 4:
                    sortData();
                    break;
                case 5:
                    searchData();
                    break;
                case 6:
                    calculatePercentageData();
                    break;
            }
        }

        rl.close();
    });
};

executeTasks();
