export type State =
    | 'Johor'
    | 'Kedah'
    | 'Kelantan'
    | 'Melaka'
    | 'Negeri Sembilan'
    | 'Pahang'
    | 'Perak'
    | 'Perlis'
    | 'Pulau Pinang'
    | 'Sabah'
    | 'Sarawak'
    | 'Selangor'
    | 'Terengganu'
    | 'Kuala Lumpur'
    | 'Labuan'
    | 'Putrajaya';

export const MALAYSIA_LOCATIONS: Record<State, string[]> = {
    'Kedah': [
        'Alor Setar',
        'Sungai Petani',
        'Kulim',
        'Jitra',
        'Kuah',
        'Kuala Kedah',
        'Pendang',
        'Gurun',
        'Pokok Sena',
        'Yan',
        'Sik',
        'Baling',
        'Changlun',
        'Kuala Nerang'
    ],
    'Pulau Pinang': [
        'George Town',
        'Butterworth',
        'Bukit Mertajam',
        'Batu Kawan',
        'Nibong Tebal',
        'Seberang Perai',
        'Bayan Lepas',
        'Balik Pulau',
        'Gelugor',
        'Tanjung Bungah'
    ],
    'Kuala Lumpur': [
        'Kuala Lumpur',
        'Ampang',
        'Cheras',
        'Kepong',
        'Setapak',
        'Sentul',
        'Bangsar',
        'Brickfields',
        'Bukit Bintang',
        'TTDI'
    ],
    'Selangor': [
        'Shah Alam',
        'Petaling Jaya',
        'Subang Jaya',
        'Klang',
        'Kajang',
        'Rawang',
        'Sepang',
        'Cyberjaya',
        'Puchong',
        'Seri Kembangan',
        'Gombak'
    ],
    'Johor': [
        'Johor Bahru',
        'Iskandar Puteri',
        'Pasir Gudang',
        'Kulai',
        'Batu Pahat',
        'Muar',
        'Kluang',
        'Segamat',
        'Kota Tinggi',
        'Pontian'
    ],
    'Perak': [
        'Ipoh',
        'Taiping',
        'Sitiawan',
        'Teluk Intan',
        'Kuala Kangsar',
        'Lumut',
        'Batu Gajah',
        'Tanjung Malim',
        'Kampar'
    ],
    'Kelantan': [
        'Kota Bharu',
        'Pasir Mas',
        'Tumpat',
        'Tanah Merah',
        'Gua Musang',
        'Kuala Krai'
    ],
    'Terengganu': [
        'Kuala Terengganu',
        'Chukai',
        'Dungun',
        'Kerteh',
        'Marang',
        'Besut'
    ],
    'Pahang': [
        'Kuantan',
        'Temerloh',
        'Bentong',
        'Raub',
        'Jerantut',
        'Pekan',
        'Cameron Highlands',
        'Genting Highlands'
    ],
    'Negeri Sembilan': [
        'Seremban',
        'Port Dickson',
        'Nilai',
        'Bahau',
        'Tampin',
        'Kuala Pilah'
    ],
    'Melaka': [
        'Melaka City',
        'Alor Gajah',
        'Jasin',
        'Ayer Keroh'
    ],
    'Perlis': [
        'Kangar',
        'Arau',
        'Padang Besar',
        'Kuala Perlis'
    ],
    'Sabah': [
        'Kota Kinabalu',
        'Sandakan',
        'Tawau',
        'Lahad Datu',
        'Keningau',
        'Semporna'
    ],
    'Sarawak': [
        'Kuching',
        'Miri',
        'Sibu',
        'Bintulu',
        'Samarahan',
        'Sri Aman'
    ],
    'Labuan': [
        'Labuan'
    ],
    'Putrajaya': [
        'Putrajaya'
    ]
};

export const STATES = Object.keys(MALAYSIA_LOCATIONS) as State[];
