const { randomUserMock, additionalUsers } = require('./FE4U-Lab3-mock.js');

// 1: форматування даних та об'єднання об'єктів
function processUserData(randomUserMock, additionalUsers) {
    if (!Array.isArray(randomUserMock)) {
        console.error("randomUserMock is not defined or is not an array");
        return [];
    }

    const formatUserData = (user) => ({
        gender: user.gender,
        title: user.name.title,
        full_name: `${user.name.first} ${user.name.last}`,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
        postcode: user.location.postcode,
        coordinates: user.location.coordinates,
        timezone: user.location.timezone,
        email: user.email,
        b_date: user.dob.date,
        age: user.dob.age,
        phone: user.phone,
        picture_large: user.picture.large,
        picture_thumbnail: user.picture.thumbnail
    });

    const addFieldsAndRandomCourse = (users) => {
        let idCounter = 1;
        const courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"];

        return users.map(user => ({
            ...user,
            id: idCounter++,
            favorite: false,
            bg_color: null,
            note: null,
            course: courses[Math.floor(Math.random() * courses.length)]
        }));
    };

    const mergeAndRemoveDuplicates = (users1, users2) => {
        const uniqueUsers = new Map();
        [...users1, ...users2].forEach(user => uniqueUsers.set(user.email, user));
        return Array.from(uniqueUsers.values());
    };

    const formattedUsers = randomUserMock.map(formatUserData);
    const usersWithFields = addFieldsAndRandomCourse(formattedUsers);
    return mergeAndRemoveDuplicates(usersWithFields, additionalUsers);
}

// 2: валідація об'єкта
function validateObject(object) {
    return Object.entries(object).every(([key, value]) => {
        switch (key) {
            case 'full_name':
            case 'gender':
            case 'note':
            case 'state':
            case 'city':
            case 'country':
                return typeof value === 'string' && /^[A-Z]/.test(value);
            case 'age':
                return typeof value === 'number';
            case 'phone':
                return typeof value === 'string' && /^\+?\d{1,4}?[-.\s]?\(?\d{2,3}\)?[-.\s]?\d{3}[-.\s]?\d{4,6}$/.test(value);
            case 'email':
                return typeof value === 'string' && /^[\w-\.]+@[\w-]+\.[a-z]{2,}$/.test(value);
            default:
                return true;
        }
    });
}

// 3: фільтрація об'єктів
function filterUsers(users, country, age, gender, favorite) {
    return users.filter(user =>
        (!country || user.country === country) &&
        (!age || user.age === age) &&
        (!gender || user.gender === gender) &&
        (favorite === undefined || user.favorite === favorite)
    );
}

// 4: сортування об'єктів
function sortUsers(users, sortBy, sortOrder = 'asc') {
    return [...users].sort((a, b) => {
        if (typeof a[sortBy] === 'number') {
            return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
        } else if (typeof a[sortBy] === 'string') {
            return sortOrder === 'asc' ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
        }
        return 0;
    });
}

// 5: пошук об'єкта
function findUser(users, searchParam) {
    const lowerCaseSearch = String(searchParam).toLowerCase();
    return users.filter(user =>
        Object.values(user).some(value =>
            typeof value === 'string' ? value.toLowerCase().includes(lowerCaseSearch) : value === searchParam
        )
    );
}

// 6: обчислення відсотка
function calculatePercentage(users, searchParam) {
    const matchingUsers = findUser(users, searchParam);
    const totalCount = users.length;
    return totalCount > 0 ? (matchingUsers.length / totalCount) * 100 : 0;
}

module.exports = { processUserData, validateObject, filterUsers, sortUsers, findUser, calculatePercentage };