/* =====================================================
   QUIZZZ - SCRIPT.JS
   100 SOAL / SESI
   15 DETIK / SOAL
   RIWAYAT SOAL TERSIMPAN PER PEMAIN
===================================================== */

"use strict";


/* =====================================================
   KONFIGURASI
===================================================== */

const QUESTIONS_PER_GAME = 100;
const TIME_PER_QUESTION = 15;

const STORAGE_KEY = "QUIZZZ_PLAYER_HISTORY_V1";

const MODE_POINTS = {
    easy: 10,
    medium: 15,
    hard: 20,
    extreme: 30
};


/* =====================================================
   BANK SOAL
=====================================================

   Bank dibuat lebih dari 100 supaya pemain bisa
   memainkan sesi berikutnya tanpa langsung mengulang.

   Setiap soal mempunyai:
   id
   category
   difficulty
   question
   answers
   correct
===================================================== */

const QUESTION_BANK = [

    /* ================= SEJARAH ================= */

    {
        id:"history-001",
        category:"Sejarah",
        difficulty:"easy",
        question:"Candi Borobudur berada di provinsi mana?",
        answers:["Jawa Tengah","Jawa Barat","Jawa Timur","Bali"],
        correct:0
    },

    {
        id:"history-002",
        category:"Sejarah",
        difficulty:"easy",
        question:"Proklamasi Kemerdekaan Indonesia dibacakan pada tahun?",
        answers:["1942","1945","1948","1950"],
        correct:1
    },

    {
        id:"history-003",
        category:"Sejarah",
        difficulty:"medium",
        question:"Siapa yang mengetik naskah Proklamasi Indonesia?",
        answers:["Sayuti Melik","Ki Hajar Dewantara","Mohammad Hatta","Ahmad Yani"],
        correct:0
    },

    {
        id:"history-004",
        category:"Sejarah",
        difficulty:"medium",
        question:"Perang Dunia II berakhir pada tahun?",
        answers:["1943","1944","1945","1946"],
        correct:2
    },

    {
        id:"history-005",
        category:"Sejarah",
        difficulty:"hard",
        question:"Revolusi Prancis dimulai pada tahun?",
        answers:["1689","1776","1789","1815"],
        correct:2
    },

    {
        id:"history-006",
        category:"Sejarah",
        difficulty:"hard",
        question:"Kekaisaran Romawi Barat secara tradisional dianggap runtuh pada tahun?",
        answers:["395","476","622","800"],
        correct:1
    },

    {
        id:"history-007",
        category:"Sejarah",
        difficulty:"extreme",
        question:"Perjanjian yang mengakhiri Perang Dunia I dengan Jerman adalah?",
        answers:["Versailles","Tordesillas","Utrecht","Westphalia"],
        correct:0
    },

    {
        id:"history-008",
        category:"Sejarah",
        difficulty:"extreme",
        question:"Magna Carta disepakati di Inggris pada tahun?",
        answers:["1066","1215","1348","1492"],
        correct:1
    },


    /* ================= MATEMATIKA ================= */

    {
        id:"math-001",
        category:"Matematika",
        difficulty:"easy",
        question:"Berapakah 12 × 8?",
        answers:["86","96","108","112"],
        correct:1
    },

    {
        id:"math-002",
        category:"Matematika",
        difficulty:"easy",
        question:"Berapakah 144 ÷ 12?",
        answers:["10","11","12","14"],
        correct:2
    },

    {
        id:"math-003",
        category:"Matematika",
        difficulty:"medium",
        question:"Berapakah 15% dari 200?",
        answers:["20","25","30","35"],
        correct:2
    },

    {
        id:"math-004",
        category:"Matematika",
        difficulty:"medium",
        question:"Jika x + 7 = 19, maka x = ?",
        answers:["10","11","12","13"],
        correct:2
    },

    {
        id:"math-005",
        category:"Matematika",
        difficulty:"hard",
        question:"Berapakah akar kuadrat dari 625?",
        answers:["15","20","25","30"],
        correct:2
    },

    {
        id:"math-006",
        category:"Matematika",
        difficulty:"hard",
        question:"Jika 2x + 6 = 20, nilai x adalah?",
        answers:["5","6","7","8"],
        correct:2
    },

    {
        id:"math-007",
        category:"Matematika",
        difficulty:"extreme",
        question:"Berapakah hasil 17² − 13²?",
        answers:["100","110","120","130"],
        correct:2
    },

    {
        id:"math-008",
        category:"Matematika",
        difficulty:"extreme",
        question:"Berapakah jumlah sudut dalam sebuah segi enam?",
        answers:["540°","600°","720°","900°"],
        correct:2
    },


    /* ================= PPKN ================= */

    {
        id:"ppkn-001",
        category:"PPKN",
        difficulty:"easy",
        question:"Lambang negara Indonesia adalah?",
        answers:["Garuda Pancasila","Rajawali Nusantara","Elang Jawa","Garuda Nusantara"],
        correct:0
    },

    {
        id:"ppkn-002",
        category:"PPKN",
        difficulty:"easy",
        question:"Jumlah sila dalam Pancasila adalah?",
        answers:["3","4","5","6"],
        correct:2
    },

    {
        id:"ppkn-003",
        category:"PPKN",
        difficulty:"medium",
        question:"Sila kedua Pancasila berbunyi?",
        answers:[
            "Ketuhanan Yang Maha Esa",
            "Kemanusiaan yang Adil dan Beradab",
            "Persatuan Indonesia",
            "Keadilan Sosial"
        ],
        correct:1
    },

    {
        id:"ppkn-004",
        category:"PPKN",
        difficulty:"medium",
        question:"UUD 1945 merupakan singkatan dari?",
        answers:[
            "Undang-Undang Dasar 1945",
            "Undang-Undang Daerah 1945",
            "Undang-Undang Demokrasi 1945",
            "Undang-Undang Dewan 1945"
        ],
        correct:0
    },

    {
        id:"ppkn-005",
        category:"PPKN",
        difficulty:"hard",
        question:"Lembaga yang memiliki fungsi legislasi di tingkat nasional adalah?",
        answers:["DPR","BPK","MA","KY"],
        correct:0
    },

    {
        id:"ppkn-006",
        category:"PPKN",
        difficulty:"hard",
        question:"Semboyan Bhinneka Tunggal Ika berasal dari karya?",
        answers:[
            "Sutasoma",
            "Negarakertagama",
            "Pararaton",
            "Arjunawiwaha"
        ],
        correct:0
    },

    {
        id:"ppkn-007",
        category:"PPKN",
        difficulty:"extreme",
        question:"Bhinneka Tunggal Ika secara umum berarti?",
        answers:[
            "Bersatu kita teguh",
            "Berbeda-beda tetapi tetap satu",
            "Satu bangsa satu bahasa",
            "Merdeka atau mati"
        ],
        correct:1
    },

    {
        id:"ppkn-008",
        category:"PPKN",
        difficulty:"extreme",
        question:"Pembukaan UUD 1945 terdiri atas berapa alinea?",
        answers:["2","3","4","5"],
        correct:2
    },


    /* ================= BAHASA INDONESIA ================= */

    {
        id:"indo-001",
        category:"Bahasa Indonesia",
        difficulty:"easy",
        question:"Lawan kata 'besar' adalah?",
        answers:["tinggi","kecil","panjang","lebar"],
        correct:1
    },

    {
        id:"indo-002",
        category:"Bahasa Indonesia",
        difficulty:"easy",
        question:"Sinonim kata 'cerdas' adalah?",
        answers:["malas","pandai","lemah","lambat"],
        correct:1
    },

    {
        id:"indo-003",
        category:"Bahasa Indonesia",
        difficulty:"medium",
        question:"Kata baku yang benar adalah?",
        answers:["resiko","risiko","resikho","riskho"],
        correct:1
    },

    {
        id:"indo-004",
        category:"Bahasa Indonesia",
        difficulty:"medium",
        question:"Kalimat yang digunakan untuk menanyakan sesuatu disebut kalimat?",
        answers:["perintah","berita","tanya","seruan"],
        correct:2
    },

    {
        id:"indo-005",
        category:"Bahasa Indonesia",
        difficulty:"hard",
        question:"Majas yang membandingkan dua hal secara langsung disebut?",
        answers:["metafora","ironi","litotes","repetisi"],
        correct:0
    },

    {
        id:"indo-006",
        category:"Bahasa Indonesia",
        difficulty:"hard",
        question:"Gagasan utama dalam paragraf disebut juga?",
        answers:["kalimat penjelas","ide pokok","kata kunci","judul"],
        correct:1
    },

    {
        id:"indo-007",
        category:"Bahasa Indonesia",
        difficulty:"extreme",
        question:"Kata 'berlari' memiliki imbuhan?",
        answers:["ber-","me-","di-","ke-"],
        correct:0
    },

    {
        id:"indo-008",
        category:"Bahasa Indonesia",
        difficulty:"extreme",
        question:"Kalimat efektif sebaiknya menghindari?",
        answers:[
            "kejelasan",
            "ketepatan",
            "pemborosan kata",
            "kesepadanan"
        ],
        correct:2
    },


    /* ================= BAHASA INGGRIS ================= */

    {
        id:"english-001",
        category:"Bahasa Inggris",
        difficulty:"easy",
        question:"What is the opposite of 'hot'?",
        answers:["cold","warm","dry","high"],
        correct:0
    },

    {
        id:"english-002",
        category:"Bahasa Inggris",
        difficulty:"easy",
        question:"What is the past tense of 'go'?",
        answers:["goed","gone","went","going"],
        correct:2
    },

    {
        id:"english-003",
        category:"Bahasa Inggris",
        difficulty:"medium",
        question:"Choose the correct sentence.",
        answers:[
            "She are happy.",
            "She is happy.",
            "She am happy.",
            "She be happy."
        ],
        correct:1
    },

    {
        id:"english-004",
        category:"Bahasa Inggris",
        difficulty:"medium",
        question:"What does 'although' generally express?",
        answers:["contrast","time","place","number"],
        correct:0
    },

    {
        id:"english-005",
        category:"Bahasa Inggris",
        difficulty:"hard",
        question:"Which word is an adjective?",
        answers:["quickly","beauty","beautiful","run"],
        correct:2
    },

    {
        id:"english-006",
        category:"Bahasa Inggris",
        difficulty:"hard",
        question:"Which sentence uses the present perfect correctly?",
        answers:[
            "I have finished my work.",
            "I has finished my work.",
            "I have finish my work.",
            "I finished have my work."
        ],
        correct:0
    },

    {
        id:"english-007",
        category:"Bahasa Inggris",
        difficulty:"extreme",
        question:"What is the closest meaning of 'inevitable'?",
        answers:["avoidable","certain to happen","optional","temporary"],
        correct:1
    },

    {
        id:"english-008",
        category:"Bahasa Inggris",
        difficulty:"extreme",
        question:"Which word is closest to 'meticulous'?",
        answers:["careless","very careful","angry","uncertain"],
        correct:1
    },


    /* ================= FISIKA ================= */

    {
        id:"physics-001",
        category:"Fisika",
        difficulty:"easy",
        question:"Satuan SI untuk panjang adalah?",
        answers:["meter","liter","gram","watt"],
        correct:0
    },

    {
        id:"physics-002",
        category:"Fisika",
        difficulty:"easy",
        question:"Gaya diukur menggunakan satuan?",
        answers:["joule","newton","watt","pascal"],
        correct:1
    },

    {
        id:"physics-003",
        category:"Fisika",
        difficulty:"medium",
        question:"Kecepatan adalah jarak dibagi?",
        answers:["massa","waktu","gaya","volume"],
        correct:1
    },

    {
        id:"physics-004",
        category:"Fisika",
        difficulty:"medium",
        question:"Energi kinetik berkaitan dengan?",
        answers:["gerak","warna","suhu saja","massa jenis"],
        correct:0
    },

    {
        id:"physics-005",
        category:"Fisika",
        difficulty:"hard",
        question:"Satuan SI energi adalah?",
        answers:["joule","newton","tesla","ampere"],
        correct:0
    },

    {
        id:"physics-006",
        category:"Fisika",
        difficulty:"hard",
        question:"Hukum Newton pertama berkaitan dengan?",
        answers:[
            "inersia",
            "aksi reaksi",
            "gravitasi",
            "energi"
        ],
        correct:0
    },

    {
        id:"physics-007",
        category:"Fisika",
        difficulty:"extreme",
        question:"Satuan SI untuk frekuensi adalah?",
        answers:["hertz","ohm","volt","weber"],
        correct:0
    },

    {
        id:"physics-008",
        category:"Fisika",
        difficulty:"extreme",
        question:"Dalam ruang hampa, gelombang elektromagnetik dapat merambat tanpa?",
        answers:["energi","medan","medium material","frekuensi"],
        correct:2
    },


    /* ================= KIMIA ================= */

    {
        id:"chemistry-001",
        category:"Kimia",
        difficulty:"easy",
        question:"Simbol kimia untuk oksigen adalah?",
        answers:["O","Ox","Og","C"],
        correct:0
    },

    {
        id:"chemistry-002",
        category:"Kimia",
        difficulty:"easy",
        question:"Rumus kimia air adalah?",
        answers:["CO2","H2O","O2","NaCl"],
        correct:1
    },

    {
        id:"chemistry-003",
        category:"Kimia",
        difficulty:"medium",
        question:"Nomor atom menunjukkan jumlah?",
        answers:["neutron","proton","molekul","senyawa"],
        correct:1
    },

    {
        id:"chemistry-004",
        category:"Kimia",
        difficulty:"medium",
        question:"NaCl merupakan nama kimia dari?",
        answers:["gula","garam dapur","air","kapur"],
        correct:1
    },

    {
        id:"chemistry-005",
        category:"Kimia",
        difficulty:"hard",
        question:"pH 7 pada suhu standar umumnya menunjukkan sifat?",
        answers:["asam","basa","netral","logam"],
        correct:2
    },

    {
        id:"chemistry-006",
        category:"Kimia",
        difficulty:"hard",
        question:"Gas yang paling banyak di atmosfer Bumi adalah?",
        answers:["oksigen","nitrogen","karbon dioksida","hidrogen"],
        correct:1
    },

    {
        id:"chemistry-007",
        category:"Kimia",
        difficulty:"extreme",
        question:"Ikatan yang terjadi karena perpindahan elektron umumnya disebut?",
        answers:["kovalen","ionik","logam","hidrogen"],
        correct:1
    },

    {
        id:"chemistry-008",
        category:"Kimia",
        difficulty:"extreme",
        question:"Partikel subatomik yang bermuatan negatif adalah?",
        answers:["proton","neutron","elektron","nukleon"],
        correct:2
    },


    /* ================= BIOLOGI ================= */

    {
        id:"biology-001",
        category:"Biologi",
        difficulty:"easy",
        question:"Organ yang memompa darah adalah?",
        answers:["paru-paru","jantung","ginjal","hati"],
        correct:1
    },

    {
        id:"biology-002",
        category:"Biologi",
        difficulty:"easy",
        question:"Tumbuhan melakukan fotosintesis terutama pada bagian?",
        answers:["akar","daun","bunga","buah"],
        correct:1
    },

    {
        id:"biology-003",
        category:"Biologi",
        difficulty:"medium",
        question:"Unit dasar kehidupan disebut?",
        answers:["jaringan","organ","sel","sistem"],
        correct:2
    },

    {
        id:"biology-004",
        category:"Biologi",
        difficulty:"medium",
        question:"DNA merupakan singkatan dari?",
        answers:[
            "Deoxyribonucleic Acid",
            "Dynamic Nuclear Acid",
            "Double Nitrogen Atom",
            "Deoxygenated Nucleic Atom"
        ],
        correct:0
    },

    {
        id:"biology-005",
        category:"Biologi",
        difficulty:"hard",
        question:"Organel yang dikenal sebagai tempat respirasi sel adalah?",
        answers:["ribosom","mitokondria","lisosom","vakuola"],
        correct:1
    },

    {
        id:"biology-006",
        category:"Biologi",
        difficulty:"hard",
        question:"Pigmen utama yang menangkap energi cahaya pada tumbuhan adalah?",
        answers:["hemoglobin","klorofil","melanin","keratin"],
        correct:1
    },

    {
        id:"biology-007",
        category:"Biologi",
        difficulty:"extreme",
        question:"Molekul pembawa informasi genetik pada sebagian besar organisme adalah?",
        answers:["DNA","ATP","air","glukosa"],
        correct:0
    },

    {
        id:"biology-008",
        category:"Biologi",
        difficulty:"extreme",
        question:"Seleksi alam merupakan konsep penting dalam teori evolusi yang dikembangkan oleh?",
        answers:[
            "Charles Darwin",
            "Isaac Newton",
            "Louis Pasteur",
            "Gregor Mendel"
        ],
        correct:0
    },


    /* ================= LUAR ANGKASA ================= */

    {
        id:"space-001",
        category:"Luar Angkasa",
        difficulty:"easy",
        question:"Planet yang paling dekat dengan Matahari adalah?",
        answers:["Venus","Merkurius","Mars","Bumi"],
        correct:1
    },

    {
        id:"space-002",
        category:"Luar Angkasa",
        difficulty:"easy",
        question:"Satelit alami Bumi adalah?",
        answers:["Mars","Bulan","Venus","Titan"],
        correct:1
    },

    {
        id:"space-003",
        category:"Luar Angkasa",
        difficulty:"medium",
        question:"Planet terbesar di Tata Surya adalah?",
        answers:["Saturnus","Neptunus","Jupiter","Uranus"],
        correct:2
    },

    {
        id:"space-004",
        category:"Luar Angkasa",
        difficulty:"medium",
        question:"Planet yang terkenal dengan cincin paling jelas adalah?",
        answers:["Mars","Saturnus","Merkurius","Bumi"],
        correct:1
    },

    {
        id:"space-005",
        category:"Luar Angkasa",
        difficulty:"hard",
        question:"Galaksi tempat Tata Surya berada adalah?",
        answers:[
            "Andromeda",
            "Bima Sakti",
            "Triangulum",
            "Sombrero"
        ],
        correct:1
    },

    {
        id:"space-006",
        category:"Luar Angkasa",
        difficulty:"hard",
        question:"Planet terpanas di Tata Surya secara rata-rata adalah?",
        answers:["Merkurius","Venus","Mars","Jupiter"],
        correct:1
    },

    {
        id:"space-007",
        category:"Luar Angkasa",
        difficulty:"extreme",
        question:"Batas di sekitar lubang hitam tempat cahaya tidak dapat lolos disebut?",
        answers:[
            "event horizon",
            "photosphere",
            "heliosphere",
            "magnetosphere"
        ],
        correct:0
    },

    {
        id:"space-008",
        category:"Luar Angkasa",
        difficulty:"extreme",
        question:"Tahun cahaya merupakan satuan untuk mengukur?",
        answers:["waktu","massa","jarak","suhu"],
        correct:2
    },


    /* ================= ASTRONOMI ================= */

    {
        id:"astro-001",
        category:"Astronomi",
        difficulty:"easy",
        question:"Benda langit yang menghasilkan cahaya sendiri disebut?",
        answers:["planet","bintang","asteroid","satelit"],
        correct:1
    },

    {
        id:"astro-002",
        category:"Astronomi",
        difficulty:"easy",
        question:"Matahari termasuk jenis benda langit?",
        answers:["planet","bintang","komet","asteroid"],
        correct:1
    },

    {
        id:"astro-003",
        category:"Astronomi",
        difficulty:"medium",
        question:"Alat yang digunakan untuk mengamati benda langit dari Bumi adalah?",
        answers:["mikroskop","teleskop","barometer","termometer"],
        correct:1
    },

    {
        id:"astro-004",
        category:"Astronomi",
        difficulty:"medium",
        question:"Gerhana Matahari terjadi ketika?",
        answers:[
            "Bumi berada di antara Matahari dan Bulan",
            "Bulan berada di antara Matahari dan Bumi",
            "Matahari berada di antara Bumi dan Bulan",
            "Mars berada di antara Matahari dan Bumi"
        ],
        correct:1
    },

    {
        id:"astro-005",
        category:"Astronomi",
        difficulty:"hard",
        question:"Benda langit yang mengorbit bintang dan cukup besar sehingga berbentuk hampir bulat disebut?",
        answers:["planet","asteroid","meteoroid","debu"],
        correct:0
    },

    {
        id:"astro-006",
        category:"Astronomi",
        difficulty:"hard",
        question:"Apa yang dimaksud supernova?",
        answers:[
            "ledakan dahsyat bintang",
            "gerhana bulan",
            "awan gas biasa",
            "planet baru"
        ],
        correct:0
    },

    {
        id:"astro-007",
        category:"Astronomi",
        difficulty:"extreme",
        question:"Bintang neutron terbentuk dari?",
        answers:[
            "sisa inti bintang masif setelah ledakan supernova",
            "planet yang membeku",
            "asteroid besar",
            "komet"
        ],
        correct:0
    },

    {
        id:"astro-008",
        category:"Astronomi",
        difficulty:"extreme",
        question:"Diagram Hertzsprung–Russell terutama digunakan untuk menghubungkan luminositas dengan?",
        answers:["warna atau temperatur bintang","jarak planet","massa galaksi","ukuran asteroid"],
        correct:0
    },


    /* ================= PENEMUAN & TOKOH ================= */

    {
        id:"invent-001",
        category:"Penemuan",
        difficulty:"easy",
        question:"Siapa yang dikenal luas dengan pengembangan telepon yang dipatenkan pada abad ke-19?",
        answers:[
            "Alexander Graham Bell",
            "Nikola Tesla",
            "James Watt",
            "Galileo Galilei"
        ],
        correct:0
    },

    {
        id:"invent-002",
        category:"Tokoh",
        difficulty:"easy",
        question:"Siapa yang terkenal dengan hukum gerak dan gravitasi klasik?",
        answers:[
            "Isaac Newton",
            "Albert Einstein",
            "Darwin",
            "Faraday"
        ],
        correct:0
    },

    {
        id:"invent-003",
        category:"Tokoh",
        difficulty:"medium",
        question:"Teori relativitas dikembangkan oleh?",
        answers:[
            "Albert Einstein",
            "Marie Curie",
            "Louis Pasteur",
            "Gregor Mendel"
        ],
        correct:0
    },

    {
        id:"invent-004",
        category:"Tokoh",
        difficulty:"medium",
        question:"Marie Curie terkenal atas penelitian tentang?",
        answers:[
            "radioaktivitas",
            "evolusi",
            "komputer",
            "mesin uap"
        ],
        correct:0
    },

    {
        id:"invent-005",
        category:"Penemuan",
        difficulty:"hard",
        question:"Penicillin ditemukan secara tidak sengaja oleh?",
        answers:[
            "Alexander Fleming",
            "Isaac Newton",
            "Thomas Edison",
            "James Joule"
        ],
        correct:0
    },

    {
        id:"invent-006",
        category:"Penemuan",
        difficulty:"hard",
        question:"Siapa yang sering dikaitkan dengan penemuan atau pengembangan bola lampu praktis?",
        answers:[
            "Thomas Edison",
            "Charles Darwin",
            "Robert Hooke",
            "Niels Bohr"
        ],
        correct:0
    },

    {
        id:"invent-007",
        category:"Tokoh",
        difficulty:"extreme",
        question:"Gregor Mendel dikenal sebagai salah satu tokoh penting dalam bidang?",
        answers:[
            "genetika",
            "astronomi",
            "geologi",
            "meteorologi"
        ],
        correct:0
    },

    {
        id:"invent-008",
        category:"Tokoh",
        difficulty:"extreme",
        question:"Nikola Tesla terkenal terutama karena kontribusinya pada bidang?",
        answers:[
            "listrik dan elektromagnetisme",
            "arkeologi",
            "botani",
            "linguistik"
        ],
        correct:0
    },


    /* ================= TEKNOLOGI ================= */

    {
        id:"tech-001",
        category:"Teknologi",
        difficulty:"easy",
        question:"CPU pada komputer berfungsi terutama sebagai?",
        answers:[
            "pemroses instruksi",
            "layar",
            "speaker",
            "kamera"
        ],
        correct:0
    },

    {
        id:"tech-002",
        category:"Teknologi",
        difficulty:"easy",
        question:"HTML digunakan terutama untuk?",
        answers:[
            "struktur halaman web",
            "mengedit foto",
            "mengolah suara",
            "mengontrol mesin"
        ],
        correct:0
    },

    {
        id:"tech-003",
        category:"Teknologi",
        difficulty:"medium",
        question:"CSS digunakan terutama untuk?",
        answers:[
            "mengatur tampilan halaman web",
            "menyimpan database",
            "mengirim email",
            "mengedit video"
        ],
        correct:0
    },

    {
        id:"tech-004",
        category:"Teknologi",
        difficulty:"medium",
        question:"JavaScript pada web sering digunakan untuk?",
        answers:[
            "interaktivitas dan logika",
            "mencetak kertas",
            "mengisi tinta",
            "mengganti monitor"
        ],
        correct:0
    },

    {
        id:"tech-005",
        category:"Teknologi",
        difficulty:"hard",
        question:"RAM adalah jenis memori yang digunakan komputer untuk?",
        answers:[
            "menyimpan data sementara saat bekerja",
            "menyimpan listrik",
            "menghasilkan suara",
            "mendinginkan CPU"
        ],
        correct:0
    },

    {
        id:"tech-006",
        category:"Teknologi",
        difficulty:"hard",
        question:"Apa kepanjangan dari URL?",
        answers:[
            "Uniform Resource Locator",
            "Universal Reading Link",
            "User Route Language",
            "Uniform Router Line"
        ],
        correct:0
    },

    {
        id:"tech-007",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Protokol yang umum digunakan untuk mengamankan komunikasi web adalah?",
        answers:["HTTPS","FTP","SMTP","POP3"],
        correct:0
    },

    {
        id:"tech-008",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Basis data yang menyimpan data dalam tabel berelasi disebut?",
        answers:[
            "database relasional",
            "database gambar",
            "database audio",
            "database linear"
        ],
        correct:0
    },


    /* ================= PENGETAHUAN UMUM ================= */

    {
        id:"general-001",
        category:"Pengetahuan Umum",
        difficulty:"easy",
        question:"Ibu kota Jepang adalah?",
        answers:["Osaka","Tokyo","Kyoto","Nagoya"],
        correct:1
    },

    {
        id:"general-002",
        category:"Pengetahuan Umum",
        difficulty:"easy",
        question:"Benua terbesar di dunia adalah?",
        answers:["Afrika","Asia","Eropa","Australia"],
        correct:1
    },

    {
        id:"general-003",
        category:"Pengetahuan Umum",
        difficulty:"medium",
        question:"Samudra terbesar di dunia adalah?",
        answers:[
            "Atlantik",
            "Pasifik",
            "Hindia",
            "Arktik"
        ],
        correct:1
    },

    {
        id:"general-004",
        category:"Pengetahuan Umum",
        difficulty:"medium",
        question:"Bahasa yang paling banyak digunakan sebagai bahasa ibu secara global adalah?",
        answers:[
            "Mandarin",
            "Inggris",
            "Spanyol",
            "Prancis"
        ],
        correct:0
    },

    {
        id:"general-005",
        category:"Pengetahuan Umum",
        difficulty:"hard",
        question:"Gunung Everest berada di pegunungan?",
        answers:[
            "Andes",
            "Alpen",
            "Himalaya",
            "Rocky"
        ],
        correct:2
    },

    {
        id:"general-006",
        category:"Pengetahuan Umum",
        difficulty:"hard",
        question:"Unsur kimia dengan simbol Fe adalah?",
        answers:["Fluorin","Besi","Fermium","Timah"],
        correct:1
    },

    {
        id:"general-007",
        category:"Pengetahuan Umum",
        difficulty:"extreme",
        question:"Ibukota Australia adalah?",
        answers:[
            "Sydney",
            "Melbourne",
            "Canberra",
            "Perth"
        ],
        correct:2
    },

    {
        id:"general-008",
        category:"Pengetahuan Umum",
        difficulty:"extreme",
        question:"Laut terdalam yang diketahui di Bumi berada di wilayah?",
        answers:[
            "Palung Mariana",
            "Palung Jawa",
            "Palung Tonga",
            "Palung Peru-Chile"
        ],
        correct:0
    }

];


/* =====================================================
   CATATAN
=====================================================

   Bank di atas adalah contoh bank awal.

   Mekanisme game sudah dibuat untuk BANK BESAR.
   Untuk benar-benar menyediakan ratusan/ribuan soal
   tanpa mengubah mesin quiz, cukup tambahkan objek
   soal baru ke QUESTION_BANK dengan format yang sama.
===================================================== */


/* =====================================================
   ELEMENT
===================================================== */

const $ = id => document.getElementById(id);

const screens = {
    lobby: $("lobby"),
    loading: $("loading-screen"),
    quiz: $("quiz-screen"),
    result: $("result-screen")
};

const playerNameInput = $("player-name");

const playButton = $("play-btn");

const modeButtons =
    document.querySelectorAll(".mode-card");

const answerButtons =
    document.querySelectorAll(".answer-button");


/* =====================================================
   STATE
===================================================== */

let state = {
    player: "",
    mode: "easy",
    questions: [],
    currentIndex: 0,
    score: 0,
    correct: 0,
    wrong: 0,
    timer: null,
    timeLeft: TIME_PER_QUESTION,
    answered: false
};


/* =====================================================
   STORAGE
===================================================== */

function loadHistory() {

    try {

        const raw =
            localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return {};
        }

        return JSON.parse(raw);

    } catch (error) {

        console.warn(
            "Gagal membaca riwayat.",
            error
        );

        return {};
    }
}


function saveHistory(history) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history)
    );
}


function normalizePlayerName(name) {

    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^\w-]/g, "")
        .slice(0, 30);
}


/* =====================================================
   RIWAYAT PEMAIN
===================================================== */

function getPlayerHistory(player) {

    const history = loadHistory();

    const key = normalizePlayerName(player);

    if (!history[key]) {

        history[key] = {
            answered: [],
            games: 0,
            totalCorrect: 0,
            totalWrong: 0
        };

        saveHistory(history);
    }

    return history[key];
}


function updatePlayerHistory(
    player,
    questions,
    correct,
    wrong
) {

    const history = loadHistory();

    const key = normalizePlayerName(player);

    if (!history[key]) {

        history[key] = {
            answered: [],
            games: 0,
            totalCorrect: 0,
            totalWrong: 0
        };
    }

    const existing =
        new Set(history[key].answered);

    questions.forEach(question => {
        existing.add(question.id);
    });

    history[key].answered =
        Array.from(existing);

    history[key].games += 1;
    history[key].totalCorrect += correct;
    history[key].totalWrong += wrong;

    saveHistory(history);
}


/* =====================================================
   SHUFFLE
===================================================== */

function shuffle(array) {

    const copy = [...array];

    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [
            copy[i],
            copy[j]
        ] = [
            copy[j],
            copy[i]
        ];
    }

    return copy;
}


/* =====================================================
   MEMILIH SOAL
===================================================== */

function buildQuestionSet() {

    const history =
        getPlayerHistory(state.player);

    const alreadyPlayed =
        new Set(history.answered);


    /*
       Utamakan mode yang dipilih.
    */

    let modePool =
        QUESTION_BANK.filter(
            question =>
                question.difficulty === state.mode &&
                !alreadyPlayed.has(question.id)
        );


    /*
       Kalau soal mode tersebut belum cukup
       untuk mencapai 100, ambil soal lain
       yang belum pernah dimainkan.

       Jadi game tetap bisa berjalan 100 soal.
    */

    if (modePool.length < QUESTIONS_PER_GAME) {

        const additional =
            QUESTION_BANK.filter(
                question =>
                    !alreadyPlayed.has(question.id) &&
                    question.difficulty !== state.mode
            );

        modePool = [
            ...modePool,
            ...additional
        ];
    }


    /*
       Kalau bank soal yang benar-benar belum
       pernah dimainkan kurang dari 100,
       kita TIDAK mengulang soal diam-diam.

       Pemain diberi pemberitahuan.
    */

    if (modePool.length < QUESTIONS_PER_GAME) {

        throw new Error(
            `Soal baru untuk ${state.player} tersisa ` +
            `${modePool.length}. Tambahkan bank soal ` +
            `hingga minimal 100 soal baru.`
        );
    }


    return shuffle(modePool)
        .slice(0, QUESTIONS_PER_GAME);
}


/* =====================================================
   SCREEN
===================================================== */

function showScreen(screen) {

    Object.values(screens)
        .forEach(element =>
            element.classList.remove("active")
        );

    screen.classList.add("active");
}


/* =====================================================
   LOADING
===================================================== */

function startLoading(callback) {

    showScreen(screens.loading);

    let progress = 0;

    $("loading-progress").style.width = "0%";

    const loadingMessages = [
        "Mengecek riwayat soal...",
        "Memilih soal yang belum dimainkan...",
        "Mengacak urutan soal...",
        "Menyiapkan 100 soal...",
        "Quiz siap!"
    ];

    let step = 0;

    const interval =
        setInterval(() => {

            progress += 20;

            $("loading-progress")
                .style.width = `${progress}%`;

            $("loading-text")
                .textContent =
                loadingMessages[
                    Math.min(
                        step,
                        loadingMessages.length - 1
                    )
                ];

            $("loading-detail")
                .textContent =
                `${progress}% • 100 soal sedang disiapkan`;

            step++;

            if (progress >= 100) {

                clearInterval(interval);

                setTimeout(
                    callback,
                    350
                );
            }

        }, 180);
}


/* =====================================================
   START GAME
===================================================== */

function startGame() {

    const player =
        playerNameInput.value.trim();

    if (!player) {

        showNotification(
            "⚠️",
            "Masukkan nama pemain terlebih dahulu.",
            true
        );

        playerNameInput.focus();

        return;
    }


    state.player = player;


    try {

        state.questions =
            buildQuestionSet();

    } catch (error) {

        showNotification(
            "⚠️",
            error.message,
            true
        );

        return;
    }


    state.currentIndex = 0;
    state.score = 0;
    state.correct = 0;
    state.wrong = 0;
    state.answered = false;


    $("score").textContent = "0";

    $("quiz-mode-label").textContent =
        state.mode.toUpperCase();


    startLoading(() => {

        showScreen(screens.quiz);

        showQuestion();

    });
}


/* =====================================================
   SHOW QUESTION
===================================================== */

function showQuestion() {

    clearTimer();

    state.answered = false;

    const question =
        state.questions[
            state.currentIndex
        ];


    /*
       NOMOR SOAL 1 - 100
    */

    $("question-number").textContent =
        state.currentIndex + 1;


    $("question-category").textContent =
        question.category;


    $("question").textContent =
        question.question;


    const shuffledAnswers =
        question.answers.map(
            (text,index) => ({
                text,
                originalIndex: index
            })
        );


    const randomizedAnswers =
        shuffle(shuffledAnswers);


    answerButtons.forEach(
        (button,index) => {

            const answer =
                randomizedAnswers[index];

            button.disabled = false;

            button.className =
                "answer-button";

            button.dataset.answer =
                answer.originalIndex;

            button.querySelector(
                ".answer-text"
            ).textContent =
                answer.text;
        }
    );


    /*
       Progress 1-100
    */

    const progress =
        ((state.currentIndex + 1) /
            QUESTIONS_PER_GAME) * 100;

    $("question-progress-bar")
        .style.width =
        `${progress}%`;


    /*
       Animasi kartu
    */

    const card =
        $("question-card");

    card.style.animation = "none";

    void card.offsetWidth;

    card.style.animation =
        "screenIn .35s ease";


    startTimer();
}


/* =====================================================
   TIMER
===================================================== */

function startTimer() {

    state.timeLeft =
        TIME_PER_QUESTION;

    updateTimerUI();


    state.timer =
        setInterval(() => {

            state.timeLeft--;

            updateTimerUI();

            if (state.timeLeft <= 0) {

                clearTimer();

                timeOut();

            }

        },1000);
}


function updateTimerUI() {

    $("timer").textContent =
        state.timeLeft;


    const percentage =
        (state.timeLeft /
            TIME_PER_QUESTION) * 100;

    $("timer-progress")
        .style.width =
        `${percentage}%`;


    if (state.timeLeft <= 5) {

        $("timer").style.color =
            "#ef4444";

    } else {

        $("timer").style.color =
            "#ffffff";
    }
}


function clearTimer() {

    if (state.timer) {

        clearInterval(state.timer);

        state.timer = null;
    }
}


/* =====================================================
   TIME OUT
===================================================== */

function timeOut() {

    if (state.answered) {
        return;
    }

    state.answered = true;

    state.wrong++;

    answerButtons.forEach(
        button => {
            button.disabled = true;
        }
    );


    const question =
        state.questions[
            state.currentIndex
        ];


    /*
       Tampilkan jawaban benar.
    */

    answerButtons.forEach(
        button => {

            if (
                Number(button.dataset.answer) ===
                question.correct
            ) {

                button.classList.add("correct");
            }
        }
    );


    showNotification(
        "⏰",
        "Waktu habis!"
    );


    goToNextQuestion();
}


/* =====================================================
   ANSWER
===================================================== */

function answerQuestion(selectedIndex) {

    if (state.answered) {
        return;
    }

    state.answered = true;

    clearTimer();


    const question =
        state.questions[
            state.currentIndex
        ];


    answerButtons.forEach(
        button => {
            button.disabled = true;
        }
    );


    if (
        selectedIndex ===
        question.correct
    ) {

        state.correct++;

        const points =
            MODE_POINTS[state.mode];

        state.score += points;


        answerButtons.forEach(
            button => {

                if (
                    Number(button.dataset.answer) ===
                    selectedIndex
                ) {

                    button.classList.add(
                        "correct"
                    );
                }
            }
        );


        $("score").textContent =
            state.score;


        showPointPopup(
            `+${points}`
        );


        showNotification(
            "✓",
            "Jawaban benar!"
        );

    } else {

        state.wrong++;


        answerButtons.forEach(
            button => {

                const index =
                    Number(button.dataset.answer);


                if (index === selectedIndex) {

                    button.classList.add(
                        "wrong"
                    );
                }


                if (
                    index ===
                    question.correct
                ) {

                    button.classList.add(
                        "correct"
                    );
                }

            }
        );


        showNotification(
            "✕",
            "Jawaban salah!"
        );
    }


    /*
       Selalu lanjut.
       Tidak berhenti sebelum 100.
    */

    setTimeout(
        goToNextQuestion,
        700
    );
}


/* =====================================================
   NEXT QUESTION
===================================================== */

function goToNextQuestion() {

    /*
       Kalau belum soal ke-100,
       lanjut.
    */

    if (
        state.currentIndex <
        QUESTIONS_PER_GAME - 1
    ) {

        state.currentIndex++;

        showQuestion();

        return;
    }


    /*
       BARU DI SINI QUIZ BOLEH SELESAI.
    */

    finishGame();
}


/* =====================================================
   FINISH
===================================================== */

function finishGame() {

    clearTimer();

    /*
       Simpan SEMUA 100 ID soal.
       Jadi soal yang sudah dimainkan
       tidak dipilih lagi.
    */

    updatePlayerHistory(
        state.player,
        state.questions,
        state.correct,
        state.wrong
    );


    showResult();
}


/* =====================================================
   RESULT
===================================================== */

function showResult() {

    showScreen(screens.result);


    $("result-player").textContent =
        state.player;


    $("result-mode").textContent =
        state.mode.toUpperCase();


    $("final-score").textContent =
        state.score;


    const maxScore =
        QUESTIONS_PER_GAME *
        MODE_POINTS[state.mode];


    $("final-score-max").textContent =
        `/ ${maxScore}`;


    $("correct-count").textContent =
        state.correct;


    $("wrong-count").textContent =
        state.wrong;


    const accuracy =
        Math.round(
            (state.correct /
                QUESTIONS_PER_GAME) *
            100
        );


    $("accuracy").textContent =
        `${accuracy}%`;


    let message =
        "Tetap semangat!";

    let description =
        "Coba lagi dan tingkatkan skor kamu.";


    if (accuracy >= 90) {

        message = "🔥 LUAR BIASA!";

        description =
            "Pengetahuan kamu benar-benar mantap!";

        $("result-trophy").textContent =
            "🏆";

    } else if (accuracy >= 75) {

        message = "⭐ SANGAT BAGUS!";

        description =
            "Hasil yang keren. Pertahankan!";

        $("result-trophy").textContent =
            "🥇";

    } else if (accuracy >= 60) {

        message = "👍 BAGUS!";

        description =
            "Sedikit lagi menuju skor tinggi.";

        $("result-trophy").textContent =
            "🥈";

    } else {

        message = "💪 JANGAN MENYERAH!";

        description =
            "Belajar lagi dan coba tantangan berikutnya.";

        $("result-trophy").textContent =
            "🎯";
    }


    $("result-message").textContent =
        message;

    $("result-description").textContent =
        description;
}


/* =====================================================
   MAIN LAGI
===================================================== */

function playAgain() {

    /*
       Penting:
       Tidak menghapus riwayat.

       Jadi soal 100 sebelumnya tetap dianggap
       sudah pernah dimainkan.
    */

    startGame();
}


/* =====================================================
   BACK LOBBY
===================================================== */

function backToLobby() {

    clearTimer();

    showScreen(screens.lobby);
}


/* =====================================================
   POINT POPUP
===================================================== */

function showPointPopup(text) {

    const popup =
        $("point-popup");

    popup.textContent =
        text;

    popup.classList.remove("show");

    void popup.offsetWidth;

    popup.classList.add("show");
}


/* =====================================================
   NOTIFICATION
===================================================== */

let notificationTimer = null;

function showNotification(
    icon,
    text,
    error = false
) {

    const notification =
        $("notification");

    $("notification-icon")
        .textContent = icon;

    $("notification-text")
        .textContent = text;


    $("notification-icon")
        .style.background =
            error
                ? "#ef4444"
                : "#22c55e";


    notification.classList.add("show");


    clearTimeout(
        notificationTimer
    );


    notificationTimer =
        setTimeout(() => {

            notification.classList.remove(
                "show"
            );

        },1800);
}


/* =====================================================
   MODE
===================================================== */

modeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                modeButtons.forEach(
                    item =>
                        item.classList.remove(
                            "selected"
                        )
                );


                button.classList.add(
                    "selected"
                );


                state.mode =
                    button.dataset.mode;
            }
        );
    }
);


/* =====================================================
   ANSWER BUTTON
===================================================== */

answerButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                answerQuestion(
                    Number(
                        button.dataset.answer
                    )
                );

            }
        );
    }
);


/* =====================================================
   PLAY
===================================================== */

playButton.addEventListener(
    "click",
    startGame
);


/* =====================================================
   RESULT BUTTONS
===================================================== */

$("play-again-btn")
    .addEventListener(
        "click",
        playAgain
    );


$("back-lobby-btn")
    .addEventListener(
        "click",
        backToLobby
    );


/* =====================================================
   ENTER UNTUK MULAI
===================================================== */

playerNameInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            startGame();
        }
    }
);


/* =====================================================
   INITIAL
===================================================== */

console.log(
    "QUIZZZ aktif.",
    QUESTION_BANK.length,
    "soal tersedia."
);
const backQuizBtn = document.getElementById("back-quiz-btn");

if (backQuizBtn) {
    backQuizBtn.addEventListener("click", () => {

        // Hentikan timer
        if (typeof clearInterval === "function" && window.quizTimer) {
            clearInterval(window.quizTimer);
            window.quizTimer = null;
        }

        // Kembali ke lobby
        document.querySelectorAll(".screen").forEach(screen => {
            screen.classList.remove("active");
        });

        const lobby = document.getElementById("lobby");

        if (lobby) {
            lobby.classList.add("active");
        }

        // Reset tampilan timer
        const timer = document.getElementById("timer");
        const timerProgress = document.getElementById("timer-progress");

        if (timer) {
            timer.textContent = "15";
        }

        if (timerProgress) {
            timerProgress.style.width = "100%";
        }
    });
}