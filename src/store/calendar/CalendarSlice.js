import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvent: true,
        events: [],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        OnUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event._id === payload._id) {
                    return payload;
                }
                return event;
            });
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvent = false;
            // state.events = payload;
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id)
                if (!exists) {
                    state.events.push(event)
                }
            })
        }
    }
});

export const {
    onSetActiveEvent,
    onAddNewEvent,
    OnUpdateEvent,
    onDeleteEvent,
    onLoadEvents
} = calendarSlice.actions;