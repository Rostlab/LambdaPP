import create from "zustand";

export class Notification {
    constructor(body, type = "error", header = "Error", icon = undefined) {
        this.id = 0;
        this.body = body;
        this.type = type;
        this.header = header;
        this.icon = icon;
    }
}

export const useNotifcationStore = create((set, get) => ({
    notifications: [],
    nextid: 0,
    deleteNotification: (id) => {
        let notifications_data = get().notifications;
        const index = notifications_data.findIndex((e) => e.id === id);
        notifications_data.splice(index, 1);
        set({ notifications: [...notifications_data] });
    },
}));

export const pushNotification = (notification) => {
    useNotifcationStore.setState((state) => {
        notification["id"] = state.nextid;
        return {
            nextid: state.nextid + 1,
            notifications: [...state.notifications, notification],
            update: true,
        };
    });
};
