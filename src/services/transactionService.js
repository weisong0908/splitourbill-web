export default {
    getTransactions(count) {
        let result = fakeTransactions.slice(0, count);
        return new Promise(resolve => {
            resolve({ data: result });
        })
    },
    getTransaction(id) {
        let result = fakeTransactions.filter(t => t.id == id)[0];
        return new Promise((resolve, reject) => {
            if (result == null)
                reject("The transaction is not found");
            resolve({ data: result });
        })
    }
}

const fakeTransactions = [
    {
        id: 1,
        name: "Friend 1",
        amount: 2.5,
        date: "2019-8-2",
        purpose: "you paid Friend 1",
        detail: "/detail/1"
    },
    {
        id: 2,
        name: "Friend 1",
        amount: 4.0,
        date: "2019-8-2",
        purpose: "Friend 1 paid you",
        detail: "/detail/2"
    },
    {
        id: 3,
        name: "Friend 2",
        amount: 8.5,
        date: "2019-8-2",
        purpose: "you paid Friend 2",
        detail: "/detail/3"
    },
    {
        id: 4,
        name: "Friend 3",
        amount: 10.0,
        date: "2019-8-2",
        purpose: "you paid Friend 3",
        detail: "/detail/4"
    },
    {
        id: 5,
        name: "Friend 4",
        amount: 7.2,
        date: "2019-8-3",
        purpose: "you paid Friend 4",
        detail: "/detail/5"
    }
]