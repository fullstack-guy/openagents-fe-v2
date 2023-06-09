import {
    IconAperture,

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
];

export default Menuitems;
