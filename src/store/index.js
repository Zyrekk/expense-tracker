import {createStore} from 'vuex'

export default createStore({
    state: {
        currentUserName: '',
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
                {
                    category: 'mountain',
                    name: 'mountain',
                    amount: 40,
                    date: '2023-01-16'
                },
                {
                    category: 'food',
                    name: 'bread',
                    amount: 8,
                    date: '2023-02-03'
                },
                {
                    category: 'mountain',
                    name: 'mountain',
                    amount: 40,
                    date: '2023-04-16'
                },
                {
                    category: 'food',
                    name: 'bread',
                    amount: 8,
                    date: '2023-05-03'
                },
                {
                    category: 'mountain',
                    name: 'mountain',
                    amount: 40,
                    date: '2023-06-16'
                },
                {
                    category: 'food',
                    name: 'bread',
                    amount: 8,
                    date: '2023-07-03'
                },
                {
                    category: 'mountain',
                    name: 'mountain',
                    amount: 40,
                    date: '2023-08-16'
                },
                {
                    category: 'food',
                    name: 'bread',
                    amount: 8,
                    date: '2023-09-03'
                },
                {
                    category: 'mountain',
                    name: 'mountain',
                    amount: 40,
                    date: '2023-10-16'
                },
                {
                    category: 'food',
                    name: 'bread',
                    amount: 8,
                    date: '2023-11-03'
                },
                {
                    category: 'food',
                    name: 'bread',
                    amount: 8,
                    date: '2019-11-03'
                },

            ],
            categoriesList: [
                {
                    name: 'food',
                    description: 'eating out'
                },
                {
                    name: 'mountain',
                    description: 'mountains'
                },
                {
                    name: 'car',
                    description: 'audi expenses'
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
        },
        handleChangePassword(state,payload){
            state.userList[payload.index].password=payload.password
        },
        handleDeleteAccount(state,payload){
            state.userList.splice(payload.index, 1);
        },
        handleAddUser(state,payload){
            state.userList.push(payload)
        }
    },
    actions: {},
    modules: {}
})
