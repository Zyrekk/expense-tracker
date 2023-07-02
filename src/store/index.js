import {createStore} from 'vuex'

export default createStore({
    state: {
        categories: [{
            name: "food",
            description: "I like eat pizza",
            summary: 1576,
        }, {
            name: "car",
            description: "My car is broken",
            summary: 1276,
        }],
        currentUserName: 'marcel',
        userList: [{
            login: "test",
            password: "test",
            name: 'John',
            lastName: 'Miller',
            expenses: [
                {
                    category: 'food',
                    name: 'coffee',
                    amount: 40,
                    date: '2022-07-16'
                },
                {
                    category: 'food',
                    name: 'bread',
                    amount: 8,
                    date: '2022-08-03'
                },
                {
                    category: 'food',
                    name: 'cheese',
                    amount: 21,
                    date: '2022-08-03'
                },
                {
                    category: 'car',
                    name: 'fuel',
                    amount: 320,
                    date: '2022-08-14'
                },
                {
                    category: 'food',
                    name: 'bread',
                    amount: 8,
                    date: '2022-09-01'
                },
                {
                    category: 'food',
                    name: 'ham',
                    amount: 14,
                    date: '2022-09-01'
                },
                {
                    category: 'car',
                    name: 'fuel',
                    amount: 320,
                    date: '2022-09-10'
                },
                {
                    category: 'food',
                    name: 'butter',
                    amount: 6,
                    date: '2022-09-10'
                },
                {
                    category: 'car',
                    name: 'car wash',
                    amount: 60,
                    date: '2022-09-10'
                },

            ],
            categoriesList: [
                {
                    name: 'food',
                    description: 'eating out'
                },
                {
                    name: 'car',
                    description: 'audi expenses'
                },
            ],
        },
            {
                login: "marcel",
                password: "marcel",
                name: 'Marcel',
                lastName: 'Sabitzer',
                expenses: [
                    {
                        category: 'mountain',
                        name: 'mountain',
                        amount: 40,
                        date: '2022-07-16'
                    },
                    {
                        category: 'food',
                        name: 'bread',
                        amount: 8,
                        date: '2022-08-03'
                    },

                ],
                categoriesList: [
                    {
                        name: 'food',
                        description: 'eating out'
                    },
                    {
                        name: 'mountain',
                        description: 'hobby'
                    },
                ],
            },

        ],
    },
    getters: {},
    mutations: {
        handleChangeUser(state, login) {
            state.currentUserName = login;
        },
        handleUserDetailsChange(state, payload) {
            state.userList[payload.index].name = payload.name
            state.userList[payload.index].lastName = payload.lastName
        },
        handleCategoryAdd(state, payload) {
            state.userList[payload.index].categoriesList.push(payload.category)
        },
        handleExpenseAdd(state, payload) {
            state.userList[payload.index].expenses.push(payload.expense)
        }
    },
    actions: {},
    modules: {}
})
