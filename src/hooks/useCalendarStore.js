import { useDispatch, useSelector } from "react-redux"
import { OnUpdateEvent, onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        //TODO: Update event
        if (calendarEvent._id) {
            //Actualizando
            dispatch(OnUpdateEvent({ ...calendarEvent }))

        } else {
            //Creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
        }
    }

    const startDeletingEvent = () => {
        //TODO: llegar al backend
        dispatch(onDeleteEvent());
    }

    const startLoadingEvent = async () => {

        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events))
        } catch (error) {
            console.log(error)
        }

    }


    return {
        //*Prop
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //*Meth
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvent,

    }
}
