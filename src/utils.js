import React from 'react';
import moment from 'moment';

export function convertCollectionToHash(array, hashKey, hashValue) {
    return array.reduce((result, item) => {
        result[item[hashKey]] = hashValue ? item[hashValue] : item;
        return result;
    }, {});
}

export function formatDate(date) {
    if (!date) {
        return date;
    }
    return moment(date).format('YYYY-MM-DD');
}

export function formatMoney(amount) {
    if (!amount) {
        return amount;
    }
    return <span className="text-danger">${amount}</span>;
}

export function renderSelectOptions(entityMap = {}) {
    return Object.keys(entityMap).map((itemId) => (
        <option key={itemId} value={itemId}>{entityMap[itemId]}</option>
    ));
}
