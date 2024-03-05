import { useDispatch, useSelector } from "react-redux"
import { OnUpdateEvent, onAddNewEvent, onSetActiveEvent } from "../store";

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


    return {
        //*Prop
        activeEvent,
        events,

        //*Meth
        setActiveEvent,
        startSavingEvent,

    }
}