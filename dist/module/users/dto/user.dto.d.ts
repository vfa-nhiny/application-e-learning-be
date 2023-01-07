import { SettingsDto } from "./settings.dto";
export declare class UserDto {
    constructor(object: any);
    readonly userId: string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly birthday: string;
    readonly gender: string;
    readonly role: string;
    readonly isPremium: boolean;
    readonly startUsingPremiumDate: string;
    settings: SettingsDto;
    avatar: string;
    courseJoined: string[];
}
