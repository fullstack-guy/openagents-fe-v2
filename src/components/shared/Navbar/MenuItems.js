import {
    IconAperture,
    IconMessage

} from '@tabler/icons';

import {uniqueId} from 'lodash';

const Menuitems = [

    {
        id: uniqueId(),
        title: 'Home',
        icon: IconAperture,
        href: '/home',
    },
    {
        id: uniqueId(),
        title: 'Agents',
        icon: IconAperture,
        href: '/agents',
    },
    {
        id: uniqueId(),
        title: 'Chat',
        icon: IconMessage,
        href: '/chats',
    },
];

export default Menuitems;
