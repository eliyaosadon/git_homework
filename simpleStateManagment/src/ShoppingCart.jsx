import React, { useReducer } from 'react';

const initialState = {
    items: [],
    total: 0,
    itemCount: 0,
};

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, { ...action.data, id: Date.now() }],
                total: state.total + action.data.price,
                itemCount: state.itemCount + 1,
            };
        case 'REMOVE_ITEM':
            const itemToRemove = state.items.find((item) => item.id === action.data);
            if (!itemToRemove) return state;
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.data),
                total: state.total - itemToRemove.price,
                itemCount: state.itemCount - 1,
            };
        case 'CLEAR_CART':
            return initialState;
        default:
            return state;
    }
}

export default function ShoppingCart() {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <div style={{ padding: '10px', border: '1px solid #ccc', marginTop: '10px' }}>
            <h2>Cart ({state.itemCount} items) - Total: ${state.total}</h2>
            <button onClick={() => dispatch({ type: 'ADD_ITEM', data: { name: 'Laptop', price: 999 } })}>
                Add Laptop ($999)
            </button>
            <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear</button>
            <ul>
                {state.items.map(item => (
                    <li key={item.id}>
                        {item.name} <button onClick={() => dispatch({ type: 'REMOVE_ITEM', data: item.id })}>x</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}