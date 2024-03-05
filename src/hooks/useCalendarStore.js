import { useDispatch, useSelector } from "react-redux"
import { OnUpdateEvent, onAddNewEvent, onDeleteEvent, onSetActiveEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        if(calendarEvent._id){
            dispatch(OnUpdateEvent({...calendarEvent}))

        }else{
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime()}))
        }
    }

    const startDeletingEvent = () => {
        //TODO: llegar al backend
        dispatch(onDeleteEvent());
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

    }
}
