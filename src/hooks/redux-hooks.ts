import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '../store/store';
/**
 * Custom hook.
 * Used instead of useDispatch to save the types and states.
 * Vladislav Cherkasheninov 01.06.2022
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
/**
 * Custom hook.
 * Used instead of useSelector to save the types and states.
 * Vladislav Cherkasheninov 01.06.2022
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
