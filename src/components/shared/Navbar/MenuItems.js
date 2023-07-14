import {
    IconAccessPoint,
    IconMessageCircle2

} from '@tabler/icons';

import {uniqueId} from 'lodash';

const Menuitems = [

    {
        id: uniqueId(),
        title: 'Feed',
        icon: IconAccessPoint,
        href: '/',
    },
    {
        id: uniqueId(),
        title: 'Chat',
        icon: IconMessageCircle2,
        href: '/chat',
    },
];

export default Menuitems;
