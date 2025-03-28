export const host = import.meta.env.VITE_BACKEND_HOST;

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const contactUsersRoute = `${host}/api/auth/contactUsers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`
export const getAllMessagesRoute = `${host}/api/messages/getallmsg`
export const markAsRead = `${host}/api/messages/markAsRead`;