import {
    IconAperture,
    IconMessage

} from '@tabler/icons';

import {uniqueId} from 'lodash';

const Menuitems = [

    {
        id: uniqueId(),
        title: 'Feed',
        icon: IconAperture,
        href: '/',
    },
    {
        id: uniqueId(),
        title: 'Login',
        icon: IconMessage,
        href: '/auth/login',
    },
];

export default Menuitems;
