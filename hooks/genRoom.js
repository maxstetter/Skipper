// genRoom.js

import { v4 as uuid } from 'uuid';


export default function genRoom() {
    const unique_id = uuid();
    const small_id = unique_id.slice(0,4)

    return small_id;
}