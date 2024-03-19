//import { FuseUtils } from '@fuse/index';

export class Coach {
    id: string;
    name: string;
    lastName: string;
    avatar: string;
    nickname: string;
    company: string;
    jobTitle: string;
    email: string;
    phone: string;

    /**
     * Constructor
     *
     * @param Coach
     */
    constructor(Coach) {
        {
            this.id = Coach.id || -1; // || FuseUtils.generateGUID();
            this.name = Coach.name || '';
            this.lastName = Coach.lastName || '';
            this.avatar = Coach.avatar || 'assets/images/avatars/profile.jpg';
            this.nickname = Coach.nickname || '';
            this.company = Coach.company || '';
            this.jobTitle = Coach.jobTitle || '';
            this.email = Coach.email || '';
            this.phone = Coach.phone || '';
        }
    }
}
