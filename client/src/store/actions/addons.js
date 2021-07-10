import { ADD_ADDON, REMOVE_ADDON, CLEAR_ALL_ADDONS } from './actionTypes';

//quantity + 1
export const addAddOn = (item) => ({
  type: ADD_ADDON,
  payload: item,
});

//quantity -1
export const removeAddOn = (item) => ({
  type: REMOVE_ADDON,
  payload: item,
});

//clear all addons
export const clearAllAddOns = () => ({
  type: CLEAR_ALL_ADDONS,
});
