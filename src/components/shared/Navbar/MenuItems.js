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

];

export default Menuitems;
