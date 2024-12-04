import items from './items.json'

const orders = [];
let subscribers = [];
let subscribersCat = [];
let uiState = 'menu';
export let currentCategory = 'paket';

// Subscribe function to allow React components to react to changes
export const subscribe = (callback) => {
    subscribers.push(callback);
    return () => {
        subscribers = subscribers.filter((cb) => cb !== callback);
    };
};

// Notify subscribers when orders change
const notifySubscribers = () => {
    subscribers.forEach((callback) => callback([...orders]));
};

// Subscribe function to allow React components to react to changes
export const subscribeCat = (callback) => {
    subscribersCat.push(callback);
    return () => {
        subscribersCat = subscribers.filter((cb) => cb !== callback);
    };
};

// Notify subscribers when orders change
const notifySubscribersCat = () => {
    subscribersCat.forEach((callback) => callback(currentCategory));
};

// Functions to modify orders
export const addOrder = (item_id) => {
    const foundIndex = orders.findIndex((item) => item[item_id]);
    if (foundIndex !== -1) {
        orders[foundIndex][item_id] += 1;
    } else {
        orders.push({ [item_id]: 1 });
    }
    notifySubscribers();
};

export const decOrder = (item_id) => {
    const foundIndex = orders.findIndex((item) => item[item_id]);
    if (foundIndex !== -1) {
        orders[foundIndex][item_id] -= 1;
        if (orders[foundIndex][item_id] === 0) {
            orders.splice(foundIndex, 1);
        }
    }
    notifySubscribers();
};

export const getAmount = () => {
    return orders.reduce((acc, order) => {
        const [key, value] = Object.entries(order)[0];
        return acc + value;
    }, 0);
};

export const getAmountByID = (itemID) => {
    return orders.reduce((acc, order) => {
        const [key, value] = Object.entries(order)[0];
        if (key === itemID) {
            return value;
        }
    }, 0);
};

export const getItems = () => {
    var orderItems = [];
    orders.forEach(item => {
        const [id, amount] = Object.entries(item)[0];
        const i = items.filter(x => x.id === parseInt(id))[0];
        i.amount = amount
        // console.log(i)

        orderItems.push(i);
    });
    return orderItems;
}

export const clearItems = () => {
    orders.splice(0, orders.length);
}

export const getTotalPrice = () => {
    var sum = 0;
    orders.forEach(item => {
        const [id, amount] = Object.entries(item)[0];
        sum += items.filter(x => x.id === parseInt(id))[0].price * amount;

    });
    return sum;
}


export const setUiState = (state) => {
    uiState = state;
}

export const getUiState = () => {
    return uiState;
}

export const setCategory = (category) => {
    currentCategory = category;
    notifySubscribersCat();

}

export const getCategory = () => {
    return currentCategory;
}