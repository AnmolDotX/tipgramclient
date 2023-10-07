export const host = import.meta.env.VITE_BACKEND_HOST;
// console.log(host);

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const contactUsersRoute = `${host}/api/auth/contactUsers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`
export const getAllMessagesRoute = `${host}/api/messages/getallmsg`