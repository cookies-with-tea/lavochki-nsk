import {UserMeType, UserType} from "@/app/types/user.type";
import {createContext} from "react";

export const UserContext = createContext<UserMeType>({id: "", role: "", telegram_id: 0, username: ""})