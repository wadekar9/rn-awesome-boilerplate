import { BaseApiResponse } from './base-api.dto';

interface IPWhoisDto {
    readonly About_Us: string;
    readonly ip: string;
    readonly success: boolean;
    readonly type: string;
    readonly continent: string;
    readonly continent_code: string;
    readonly country: string;
    readonly country_code: string;
    readonly region: string;
    readonly region_code: string;
    readonly city: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly is_eu: boolean;
    readonly postal: string;
    readonly calling_code: string;
    readonly capital: string;
    readonly borders: string;
    readonly flag: Flag;
    readonly connection: Connection;
    readonly timezone: Timezone;
}

interface Connection {
    readonly asn: number;
    readonly org: string;
    readonly isp: string;
    readonly domain: string;
}

interface Flag {
    readonly img: string;
    readonly emoji: string;
    readonly emoji_unicode: string;
}

interface Timezone {
    readonly id: string;
    readonly abbr: string;
    readonly is_dst: boolean;
    readonly offset: number;
    readonly utc: string;
    readonly current_time: Date;
}

export interface IPWhoisApiResponse extends BaseApiResponse<IPWhoisDto> { }
