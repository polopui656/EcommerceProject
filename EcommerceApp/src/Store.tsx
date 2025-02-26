import storage from '@react-native-async-storage/async-storage';
import CartReducer from './redux/CartReducer';
import { FLUSH, PAUSE, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';


const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

const persistedReducer = persistReducer(persistConfig, CartReducer);
export const store = configureStore ({
    reducer: {
        cart: persistedReducer
    },
    middleware: (gotoDefaultMiddleware) => gotoDefaultMiddleware ({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER]
        }
    })
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;