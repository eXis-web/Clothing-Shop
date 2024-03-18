import { Middleware, AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: AnyAction) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action);

  console.log('next state: ', store.getState());
}



// import { Middleware } from 'redux';
// import { RootState } from '../store';
// import { Action } from 'redux'; // Якщо ви використовуєте Redux

// export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: unknown) => {
//   if (typeof action === 'object' && action !== null && 'type' in action) {
//     // Перевірка, чи є об'єкт дією і чи в ньому є властивість 'type'
//     console.log('type: ', (action as Action).type);
//     console.log('payload: ', (action as any).payload);
//     console.log('currentState: ', store.getState());
//   }

//   const result = next(action); // Викликаємо наступний обробник в ланцюжку middleware

//   console.log('next state: ', store.getState());
//   return result;
// }
