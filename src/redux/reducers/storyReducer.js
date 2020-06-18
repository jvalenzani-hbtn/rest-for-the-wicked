import {TO_PATH_DOCK, DRAG_FROM_EMBED, MAKE_REQUEST_BEGIN, MAKE_REQUEST_SUCCESS, SET_INVALID_REQUEST_MESSAGE, UPDATE_OBJECTIVE} from "../actions/actionTypes"

export const updateStory = (state = {}, action) => {
    const payload = action.payload;

    switch (action.type) {
        case MAKE_REQUEST_BEGIN: {
            console.log('MAKE_REQUEST_BEGIN')
            return (state);
        }

        case MAKE_REQUEST_SUCCESS: {
            console.log('MAKE_REQUEST_SUCCESS')
            // Store old poi as parent
            const text = payload.description;

            // Create docks object from children poi
            const docks = {};
            payload.children.forEach(child => {
                docks[child.name] = {content: child, docked: true};
            });

            // Create dock for parent
            if (payload.parent) {
                docks[payload.parent.name] = {content: payload.parent, docked: true};
            }

            const newState = {
                ...payload,
                parent: payload.parent,
                description: {
                    text: text,
                    docks: docks
                }
            };
            console.log(newState)
            return (newState);
        }

        case TO_PATH_DOCK: {
            console.log(payload)
            const content = payload[payload.draggableId];
            const docksKey = payload.destination.droppableId;
            return ({
                ...state,
                description: {
                    ...state.description,
                    docks: {
                        ...state.description.docks,
                        [docksKey]: {
                            content: content,
                            docked: true
                        }
                    }
                }
            });
        }

        case DRAG_FROM_EMBED: {
            const docksKey = payload.source.droppableId;
            const newState = {
                ...state,
                description: {
                    ...state.description,
                    docks: {
                        ...state.description.docks,
                        [docksKey]: {
                            content: null,
                            docked: false
                        }
                    }
                }
            };
            return (newState);
        }

        default: {
            return (state);
        }
    }
}

export const updateInvalidRequestMessage = (state = {}, action) => {
    const payload = action.payload;
    
    switch (action.type) {
        case SET_INVALID_REQUEST_MESSAGE: {
            return (payload);
        }
        default: {
            return (state);
        }
    }
}

export const updateObjective = (state = "", action) => {
    const payload = action.payload;

    if (action.type === UPDATE_OBJECTIVE) {
            return (payload);
    } else {
        return (state);
    }
}