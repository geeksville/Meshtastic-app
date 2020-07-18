enum ModemConfig {
    Bw125Cr45Sf128 = 0, // default
    Bw500Cr45Sf128 = 1,
    Bw31_25Cr48Sf512 = 2,
    Bw125Cr48Sf4096 = 3
}

enum WifiMode {
    WIFI_OFF = 0, // default
    WIFI_STA = 1,
    WIFI_AP = 2
}

export class Configs {
    advanced_mode: boolean = false;
    // lora configs
    modem_config: ModemConfig = 0;
    spreading_factor: number = 10;
    code_rate: number = 2;
    bandwith: number = 250;
    nickname: String;
    // wifi configs
    wifi_mode: WifiMode = 0;
    wifi_ssid: string;
    wifi_password: string;
    // notifications
    message_notifications: boolean = true;
    battery_notifications: boolean = true;
    battery_threshold: number  = 20;
    // geolocation
    position_sharing: boolean = false;
    position_sharing_frequency: number = 1;
}