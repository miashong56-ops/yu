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
    },
    /* =====================================================
       BATCH 1 — 200 SOAL TAMBAHAN
    ===================================================== */

    /* ================= GEOGRAFI DUNIA ================= */

    {
        id:"batch1-001",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Kanada?",
        answers:["Toronto","Vancouver","Ottawa","Montreal"],
        correct:2
    },

    {
        id:"batch1-002",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Prancis?",
        answers:["Paris","Lyon","Marseille","Nice"],
        correct:0
    },

    {
        id:"batch1-003",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Italia?",
        answers:["Milan","Naples","Roma","Turin"],
        correct:2
    },

    {
        id:"batch1-004",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Jerman?",
        answers:["Hamburg","Berlin","Munich","Frankfurt"],
        correct:1
    },

    {
        id:"batch1-005",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Spanyol?",
        answers:["Barcelona","Madrid","Seville","Valencia"],
        correct:1
    },

    {
        id:"batch1-006",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Portugal?",
        answers:["Porto","Lisboa","Braga","Coimbra"],
        correct:1
    },

    {
        id:"batch1-007",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Mesir?",
        answers:["Alexandria","Giza","Kairo","Luxor"],
        correct:2
    },

    {
        id:"batch1-008",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Brasil?",
        answers:["Rio de Janeiro","São Paulo","Brasília","Salvador"],
        correct:2
    },

    {
        id:"batch1-009",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Argentina?",
        answers:["Buenos Aires","Córdoba","Rosario","Mendoza"],
        correct:0
    },

    {
        id:"batch1-010",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Australia?",
        answers:["Sydney","Melbourne","Canberra","Perth"],
        correct:2
    },

    {
        id:"batch1-011",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Selandia Baru?",
        answers:["Auckland","Wellington","Christchurch","Hamilton"],
        correct:1
    },

    {
        id:"batch1-012",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Korea Selatan?",
        answers:["Busan","Seoul","Incheon","Daegu"],
        correct:1
    },

    {
        id:"batch1-013",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Thailand?",
        answers:["Chiang Mai","Bangkok","Phuket","Pattaya"],
        correct:1
    },

    {
        id:"batch1-014",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Vietnam?",
        answers:["Ho Chi Minh City","Hanoi","Da Nang","Hue"],
        correct:1
    },

    {
        id:"batch1-015",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Filipina?",
        answers:["Cebu","Davao","Manila","Quezon City"],
        correct:2
    },

    {
        id:"batch1-016",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota India?",
        answers:["Mumbai","New Delhi","Kolkata","Bengaluru"],
        correct:1
    },

    {
        id:"batch1-017",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Pakistan?",
        answers:["Karachi","Lahore","Islamabad","Peshawar"],
        correct:2
    },

    {
        id:"batch1-018",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Turki?",
        answers:["Istanbul","Ankara","Izmir","Bursa"],
        correct:1
    },

    {
        id:"batch1-019",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Yunani?",
        answers:["Athena","Thessaloniki","Patras","Heraklion"],
        correct:0
    },

    {
        id:"batch1-020",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Norwegia?",
        answers:["Bergen","Oslo","Trondheim","Stavanger"],
        correct:1
    },


    /* ================= GEOGRAFI LANJUT ================= */

    {
        id:"batch1-021",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Negara terbesar di dunia berdasarkan luas wilayah adalah?",
        answers:["Kanada","Tiongkok","Rusia","Amerika Serikat"],
        correct:2
    },

    {
        id:"batch1-022",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Negara yang memiliki bentuk wilayah seperti sepatu bot adalah?",
        answers:["Italia","Portugal","Yunani","Kroasia"],
        correct:0
    },

    {
        id:"batch1-023",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Sungai terpanjang di Amerika Selatan adalah?",
        answers:["Amazon","Paraná","Orinoco","São Francisco"],
        correct:0
    },

    {
        id:"batch1-024",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Pegunungan Andes membentang terutama di sepanjang bagian mana Amerika Selatan?",
        answers:["Timur","Barat","Utara","Tengah"],
        correct:1
    },

    {
        id:"batch1-025",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Gurun Sahara terletak di benua?",
        answers:["Asia","Afrika","Australia","Amerika Selatan"],
        correct:1
    },

    {
        id:"batch1-026",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Danau air tawar terbesar di dunia berdasarkan luas permukaan adalah?",
        answers:["Danau Victoria","Danau Superior","Danau Baikal","Danau Tanganyika"],
        correct:1
    },

    {
        id:"batch1-027",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Negara yang dikenal memiliki wilayah di dua benua, Eropa dan Asia, adalah?",
        answers:["Turki","Mesir","Maroko","India"],
        correct:0
    },

    {
        id:"batch1-028",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Selat yang memisahkan Eropa dan Afrika di dekat Spanyol dan Maroko adalah?",
        answers:["Selat Malaka","Selat Gibraltar","Selat Bering","Selat Hormuz"],
        correct:1
    },

    {
        id:"batch1-029",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Pulau terbesar di dunia yang bukan benua adalah?",
        answers:["Madagaskar","Greenland","Kalimantan","Papua"],
        correct:1
    },

    {
        id:"batch1-030",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Gunung Kilimanjaro berada di negara?",
        answers:["Kenya","Tanzania","Uganda","Ethiopia"],
        correct:1
    },

    {
        id:"batch1-031",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Sungai Nil bermuara ke?",
        answers:["Laut Merah","Laut Tengah","Samudra Hindia","Teluk Persia"],
        correct:1
    },

    {
        id:"batch1-032",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Kepulauan Jepang berada di kawasan?",
        answers:["Asia Timur","Asia Selatan","Asia Tengah","Asia Barat"],
        correct:0
    },

    {
        id:"batch1-033",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Pegunungan Alpen terutama berada di benua?",
        answers:["Eropa","Asia","Afrika","Amerika"],
        correct:0
    },

    {
        id:"batch1-034",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Negara yang berbatasan langsung dengan Portugal di sebelah timur adalah?",
        answers:["Prancis","Spanyol","Italia","Maroko"],
        correct:1
    },

    {
        id:"batch1-035",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Terusan Suez menghubungkan Laut Tengah dengan?",
        answers:["Laut Merah","Laut Hitam","Laut Arab","Laut Kaspia"],
        correct:0
    },

    {
        id:"batch1-036",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Negara yang seluruh wilayahnya dikelilingi oleh Afrika Selatan adalah?",
        answers:["Eswatini","Lesotho","Botswana","Namibia"],
        correct:1
    },

    {
        id:"batch1-037",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Danau Baikal terkenal sebagai danau yang memiliki?",
        answers:["Air asin terbanyak","Air tawar sangat dalam","Luas terbesar di Afrika","Air paling hangat"],
        correct:1
    },

    {
        id:"batch1-038",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Gurun Atacama terutama terletak di?",
        answers:["Chile","Brasil","Argentina","Peru"],
        correct:0
    },

    {
        id:"batch1-039",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Selat Bering memisahkan Rusia dengan?",
        answers:["Kanada","Amerika Serikat","Jepang","Islandia"],
        correct:1
    },

    {
        id:"batch1-040",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Danau Titicaca berada di perbatasan Peru dengan?",
        answers:["Chile","Bolivia","Argentina","Ekuador"],
        correct:1
    },


    /* ================= SEJARAH DUNIA ================= */

    {
        id:"batch1-041",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Peradaban Mesir Kuno berkembang di sekitar sungai?",
        answers:["Nil","Amazon","Gangga","Yangtze"],
        correct:0
    },

    {
        id:"batch1-042",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Bangsa Romawi Kuno membangun Colosseum di kota?",
        answers:["Athena","Roma","Paris","London"],
        correct:1
    },

    {
        id:"batch1-043",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Tembok Besar merupakan peninggalan terkenal dari sejarah?",
        answers:["Jepang","Tiongkok","India","Korea"],
        correct:1
    },

    {
        id:"batch1-044",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Siapa tokoh yang dikenal sebagai pemimpin gerakan kemerdekaan India dengan prinsip nonkekerasan?",
        answers:["Mahatma Gandhi","Nelson Mandela","Abraham Lincoln","Sun Yat-sen"],
        correct:0
    },

    {
        id:"batch1-045",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Perang Dunia II berakhir pada tahun?",
        answers:["1943","1944","1945","1946"],
        correct:2
    },

    {
        id:"batch1-046",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Titanic tenggelam pada tahun?",
        answers:["1905","1912","1918","1925"],
        correct:1
    },

    {
        id:"batch1-047",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Kota Pompeii terkenal karena terkubur akibat letusan gunung?",
        answers:["Etna","Vesuvius","Olympus","Stromboli"],
        correct:1
    },

    {
        id:"batch1-048",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Siapa penjelajah yang secara umum dikaitkan dengan pelayaran Eropa ke Amerika pada tahun 1492?",
        answers:["Christopher Columbus","Marco Polo","James Cook","Vasco da Gama"],
        correct:0
    },

    {
        id:"batch1-049",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Revolusi Industri pertama berkembang pesat di negara?",
        answers:["Inggris","Jepang","Brasil","Mesir"],
        correct:0
    },

    {
        id:"batch1-050",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Tahun 1066 terkenal dalam sejarah Inggris karena?",
        answers:["Penaklukan Norman","Revolusi Industri","Perang Dunia I","Magna Carta"],
        correct:0
    },

    {
        id:"batch1-051",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Kekaisaran Aztec berkembang di wilayah yang sekarang terutama menjadi negara?",
        answers:["Meksiko","Peru","Brasil","Argentina"],
        correct:0
    },

    {
        id:"batch1-052",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Kota Machu Picchu dibangun oleh peradaban?",
        answers:["Maya","Aztec","Inca","Romawi"],
        correct:2
    },

    {
        id:"batch1-053",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Perjanjian Versailles secara resmi mengakhiri keadaan perang antara Sekutu dan?",
        answers:["Jerman","Jepang","Italia","Rusia"],
        correct:0
    },

    {
        id:"batch1-054",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Kekaisaran Bizantium berpusat di kota yang kemudian dikenal sebagai?",
        answers:["Konstantinopel","Berlin","Madrid","Kairo"],
        correct:0
    },

    {
        id:"batch1-055",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Penyebaran mesin cetak tipe bergerak di Eropa sangat berkaitan dengan?",
        answers:["Johannes Gutenberg","Galileo Galilei","Leonardo da Vinci","Niels Bohr"],
        correct:0
    },

    {
        id:"batch1-056",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Revolusi Rusia yang menggulingkan pemerintahan kekaisaran terjadi pada tahun?",
        answers:["1905","1917","1929","1941"],
        correct:1
    },

    {
        id:"batch1-057",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Perjanjian Westphalia tahun 1648 sering dikaitkan dengan berakhirnya?",
        answers:["Perang Tiga Puluh Tahun","Perang Seratus Tahun","Perang Krimea","Perang Napoleon"],
        correct:0
    },

    {
        id:"batch1-058",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Dinasti yang membangun sebagian besar bagian awal Tembok Besar yang terkenal sekarang adalah?",
        answers:["Qin","Ming","Han","Tang"],
        correct:1
    },

    {
        id:"batch1-059",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Kekaisaran Mali pada abad pertengahan terkenal antara lain karena penguasa bernama?",
        answers:["Mansa Musa","Ramses II","Hammurabi","Ashoka"],
        correct:0
    },

    {
        id:"batch1-060",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Kode Hammurabi berasal dari peradaban kuno di wilayah?",
        answers:["Mesopotamia","Skandinavia","Mesoamerika","Australia"],
        correct:0
    },


    /* ================= SEJARAH INDONESIA ================= */

    {
        id:"batch1-061",
        category:"Sejarah Indonesia",
        difficulty:"easy",
        question:"Proklamasi Kemerdekaan Indonesia dibacakan pada tanggal?",
        answers:["17 Agustus 1945","20 Mei 1908","28 Oktober 1928","10 November 1945"],
        correct:0
    },

    {
        id:"batch1-062",
        category:"Sejarah Indonesia",
        difficulty:"easy",
        question:"Tokoh yang membacakan Proklamasi Kemerdekaan Indonesia adalah?",
        answers:["Soekarno","Mohammad Yamin","Sutan Sjahrir","Ki Hajar Dewantara"],
        correct:0
    },

    {
        id:"batch1-063",
        category:"Sejarah Indonesia",
        difficulty:"easy",
        question:"Sumpah Pemuda diperingati setiap tanggal?",
        answers:["17 Agustus","28 Oktober","10 November","1 Juni"],
        correct:1
    },

    {
        id:"batch1-064",
        category:"Sejarah Indonesia",
        difficulty:"easy",
        question:"Organisasi Budi Utomo berdiri pada tahun?",
        answers:["1908","1928","1945","1950"],
        correct:0
    },

    {
        id:"batch1-065",
        category:"Sejarah Indonesia",
        difficulty:"medium",
        question:"Naskah Proklamasi dirumuskan di rumah siapa?",
        answers:["Laksamana Tadashi Maeda","Jenderal Soedirman","Ki Hajar Dewantara","Mohammad Yamin"],
        correct:0
    },

    {
        id:"batch1-066",
        category:"Sejarah Indonesia",
        difficulty:"medium",
        question:"Tokoh yang mengetik naskah Proklamasi adalah?",
        answers:["Sayuti Melik","Ahmad Soebardjo","Sukarni","Wikana"],
        correct:0
    },

    {
        id:"batch1-067",
        category:"Sejarah Indonesia",
        difficulty:"medium",
        question:"Peristiwa Bandung Lautan Api terjadi pada tahun?",
        answers:["1945","1946","1947","1948"],
        correct:1
    },

    {
        id:"batch1-068",
        category:"Sejarah Indonesia",
        difficulty:"medium",
        question:"Pertempuran 10 November 1945 terjadi di kota?",
        answers:["Jakarta","Surabaya","Bandung","Semarang"],
        correct:1
    },

    {
        id:"batch1-069",
        category:"Sejarah Indonesia",
        difficulty:"hard",
        question:"Konferensi Meja Bundar berkaitan dengan pengakuan kedaulatan Indonesia oleh?",
        answers:["Belanda","Jepang","Inggris","Portugal"],
        correct:0
    },

    {
        id:"batch1-070",
        category:"Sejarah Indonesia",
        difficulty:"hard",
        question:"Kerajaan Majapahit mencapai puncak kejayaan pada masa pemerintahan?",
        answers:["Hayam Wuruk","Ken Arok","Airlangga","Sultan Agung"],
        correct:0
    },

    {
        id:"batch1-071",
        category:"Sejarah Indonesia",
        difficulty:"hard",
        question:"Patih Majapahit yang terkenal dengan Sumpah Palapa adalah?",
        answers:["Gajah Mada","Mpu Tantular","Mpu Prapanca","Adityawarman"],
        correct:0
    },

    {
        id:"batch1-072",
        category:"Sejarah Indonesia",
        difficulty:"hard",
        question:"Candi Borobudur dibangun pada masa wangsa?",
        answers:["Syailendra","Isyana","Rajasa","Warmadewa"],
        correct:0
    },

    {
        id:"batch1-073",
        category:"Sejarah Indonesia",
        difficulty:"extreme",
        question:"Prasasti Yupa merupakan peninggalan kerajaan?",
        answers:["Kutai","Sriwijaya","Tarumanegara","Mataram Kuno"],
        correct:0
    },

    {
        id:"batch1-074",
        category:"Sejarah Indonesia",
        difficulty:"extreme",
        question:"Kerajaan Sriwijaya dikenal kuat sebagai kerajaan maritim yang berpusat di wilayah?",
        answers:["Sumatra","Jawa","Sulawesi","Bali"],
        correct:0
    },

    {
        id:"batch1-075",
        category:"Sejarah Indonesia",
        difficulty:"extreme",
        question:"Kitab Negarakertagama ditulis oleh?",
        answers:["Mpu Prapanca","Mpu Tantular","Empu Gandring","Ken Arok"],
        correct:0
    },


    /* ================= SAINS ================= */

    {
        id:"batch1-076",
        category:"Sains",
        difficulty:"easy",
        question:"Air membeku pada suhu berapa derajat Celsius pada tekanan standar?",
        answers:["0°C","10°C","50°C","100°C"],
        correct:0
    },

    {
        id:"batch1-077",
        category:"Sains",
        difficulty:"easy",
        question:"Air mendidih pada suhu berapa derajat Celsius pada tekanan standar?",
        answers:["50°C","75°C","100°C","120°C"],
        correct:2
    },

    {
        id:"batch1-078",
        category:"Sains",
        difficulty:"easy",
        question:"Gas yang dibutuhkan manusia untuk respirasi adalah?",
        answers:["Oksigen","Nitrogen","Helium","Neon"],
        correct:0
    },

    {
        id:"batch1-079",
        category:"Sains",
        difficulty:"easy",
        question:"Gaya yang menyebabkan benda jatuh ke permukaan Bumi disebut?",
        answers:["Gesekan","Gravitasi","Magnet","Apung"],
        correct:1
    },

    {
        id:"batch1-080",
        category:"Sains",
        difficulty:"easy",
        question:"Alat untuk mengukur suhu disebut?",
        answers:["Barometer","Termometer","Higrometer","Amperemeter"],
        correct:1
    },

    {
        id:"batch1-081",
        category:"Sains",
        difficulty:"medium",
        question:"Perubahan wujud dari cair menjadi gas disebut?",
        answers:["Membeku","Menguap","Mengembun","Menyublim"],
        correct:1
    },

    {
        id:"batch1-082",
        category:"Sains",
        difficulty:"medium",
        question:"Perubahan wujud dari gas menjadi cair disebut?",
        answers:["Menguap","Membeku","Mengembun","Menyublim"],
        correct:2
    },

    {
        id:"batch1-083",
        category:"Sains",
        difficulty:"medium",
        question:"Satuan SI untuk massa adalah?",
        answers:["Kilogram","Gram","Newton","Liter"],
        correct:0
    },

    {
        id:"batch1-084",
        category:"Sains",
        difficulty:"medium",
        question:"Satuan SI untuk waktu adalah?",
        answers:["Menit","Jam","Sekon","Hari"],
        correct:2
    },

    {
        id:"batch1-085",
        category:"Sains",
        difficulty:"medium",
        question:"Energi yang tersimpan dalam makanan terutama berupa energi?",
        answers:["Kimia","Nuklir","Bunyi","Cahaya"],
        correct:0
    },

    {
        id:"batch1-086",
        category:"Sains",
        difficulty:"medium",
        question:"Benda yang dapat menarik benda berbahan besi disebut?",
        answers:["Magnet","Isolator","Konduktor","Resistor"],
        correct:0
    },

    {
        id:"batch1-087",
        category:"Sains",
        difficulty:"hard",
        question:"Kecepatan cahaya di ruang hampa kira-kira?",
        answers:["3.000 km/s","30.000 km/s","300.000 km/s","3.000.000 km/s"],
        correct:2
    },

    {
        id:"batch1-088",
        category:"Sains",
        difficulty:"hard",
        question:"Hukum Newton kedua menyatakan hubungan antara gaya, massa, dan?",
        answers:["Percepatan","Volume","Suhu","Massa jenis"],
        correct:0
    },

    {
        id:"batch1-089",
        category:"Sains",
        difficulty:"hard",
        question:"Fenomena pembelokan cahaya ketika melewati batas dua medium disebut?",
        answers:["Refleksi","Refraksi","Difraksi","Interferensi"],
        correct:1
    },

    {
        id:"batch1-090",
        category:"Sains",
        difficulty:"hard",
        question:"Satuan SI untuk tekanan adalah?",
        answers:["Pascal","Joule","Watt","Tesla"],
        correct:0
    },

    {
        id:"batch1-091",
        category:"Sains",
        difficulty:"extreme",
        question:"Prinsip ketidakpastian dalam mekanika kuantum dikembangkan oleh?",
        answers:["Werner Heisenberg","Isaac Newton","James Clerk Maxwell","Michael Faraday"],
        correct:0
    },

    {
        id:"batch1-092",
        category:"Sains",
        difficulty:"extreme",
        question:"Partikel pembawa interaksi elektromagnetik adalah?",
        answers:["Foton","Gluon","Neutrino","Graviton"],
        correct:0
    },

    {
        id:"batch1-093",
        category:"Sains",
        difficulty:"extreme",
        question:"Partikel yang terdiri dari tiga quark disebut?",
        answers:["Baryon","Foton","Lepton","Boson"],
        correct:0
    },

    {
        id:"batch1-094",
        category:"Sains",
        difficulty:"extreme",
        question:"Hukum kedua termodinamika berkaitan erat dengan konsep?",
        answers:["Entropi","Muatan","Massa atom","Indeks bias"],
        correct:0
    },


    /* ================= BIOLOGI ================= */

    {
        id:"batch1-095",
        category:"Biologi",
        difficulty:"easy",
        question:"Bagian tubuh manusia yang digunakan untuk bernapas adalah?",
        answers:["Paru-paru","Lambung","Ginjal","Usus"],
        correct:0
    },

    {
        id:"batch1-096",
        category:"Biologi",
        difficulty:"easy",
        question:"Organ yang berfungsi memompa darah ke seluruh tubuh adalah?",
        answers:["Jantung","Hati","Otak","Ginjal"],
        correct:0
    },

    {
        id:"batch1-097",
        category:"Biologi",
        difficulty:"easy",
        question:"Hewan yang memakan tumbuhan disebut?",
        answers:["Karnivor","Herbivor","Omnivor","Insektivor"],
        correct:1
    },

    {
        id:"batch1-098",
        category:"Biologi",
        difficulty:"easy",
        question:"Hewan yang memakan tumbuhan dan hewan disebut?",
        answers:["Herbivor","Karnivor","Omnivor","Detritivor"],
        correct:2
    },

    {
        id:"batch1-099",
        category:"Biologi",
        difficulty:"easy",
        question:"Fotosintesis terutama berlangsung pada bagian tumbuhan yang mengandung?",
        answers:["Klorofil","Hemoglobin","Keratin","Insulin"],
        correct:0
    },

    {
        id:"batch1-100",
        category:"Biologi",
        difficulty:"medium",
        question:"Unit terkecil penyusun makhluk hidup adalah?",
        answers:["Organ","Sel","Jaringan","Sistem"],
        correct:1
    },

    {
        id:"batch1-101",
        category:"Biologi",
        difficulty:"medium",
        question:"Organel tempat berlangsungnya sebagian besar respirasi sel adalah?",
        answers:["Ribosom","Mitokondria","Nukleus","Vakuola"],
        correct:1
    },

    {
        id:"batch1-102",
        category:"Biologi",
        difficulty:"medium",
        question:"Bagian sel yang mengatur aktivitas sel dan menyimpan materi genetik pada sel eukariotik adalah?",
        answers:["Nukleus","Lisosom","Ribosom","Sentriol"],
        correct:0
    },

    {
        id:"batch1-103",
        category:"Biologi",
        difficulty:"medium",
        question:"Proses pembelahan sel yang menghasilkan dua sel anak identik disebut?",
        answers:["Meiosis","Mitosis","Fertilisasi","Transkripsi"],
        correct:1
    },

    {
        id:"batch1-104",
        category:"Biologi",
        difficulty:"medium",
        question:"DNA berbentuk struktur yang dikenal sebagai?",
        answers:["Heliks ganda","Lapis tunggal","Cincin tunggal","Kubus"],
        correct:0
    },

    {
        id:"batch1-105",
        category:"Biologi",
        difficulty:"hard",
        question:"Enzim yang membantu memecah protein dalam lambung adalah?",
        answers:["Pepsin","Amilase","Lipase","Laktase"],
        correct:0
    },

    {
        id:"batch1-106",
        category:"Biologi",
        difficulty:"hard",
        question:"Pigmen yang memberikan warna merah pada sel darah manusia adalah?",
        answers:["Klorofil","Hemoglobin","Melanin","Karoten"],
        correct:1
    },

    {
        id:"batch1-107",
        category:"Biologi",
        difficulty:"hard",
        question:"Pembuluh darah yang membawa darah keluar dari jantung disebut?",
        answers:["Vena","Arteri","Kapiler","Limfa"],
        correct:1
    },

    {
        id:"batch1-108",
        category:"Biologi",
        difficulty:"hard",
        question:"Unit fungsional ginjal disebut?",
        answers:["Neuron","Nefron","Alveolus","Vili"],
        correct:1
    },

    {
        id:"batch1-109",
        category:"Biologi",
        difficulty:"extreme",
        question:"Organel tempat sintesis protein berlangsung adalah?",
        answers:["Ribosom","Lisosom","Peroksisom","Sentrosom"],
        correct:0
    },

    {
        id:"batch1-110",
        category:"Biologi",
        difficulty:"extreme",
        question:"Proses pembentukan RNA berdasarkan cetakan DNA disebut?",
        answers:["Transkripsi","Translasi","Replikasi","Mutasi"],
        correct:0
    },

    {
        id:"batch1-111",
        category:"Biologi",
        difficulty:"extreme",
        question:"Dalam translasi, RNA yang membawa asam amino ke ribosom disebut?",
        answers:["mRNA","tRNA","rRNA","DNA"],
        correct:1
    },

    {
        id:"batch1-112",
        category:"Biologi",
        difficulty:"extreme",
        question:"Molekul yang berfungsi sebagai sumber energi langsung utama bagi banyak proses seluler adalah?",
        answers:["ATP","DNA","Kolagen","Selulosa"],
        correct:0
    },


    /* ================= KIMIA ================= */

    {
        id:"batch1-113",
        category:"Kimia",
        difficulty:"easy",
        question:"Simbol kimia untuk emas adalah?",
        answers:["Ag","Au","Fe","Gd"],
        correct:1
    },

    {
        id:"batch1-114",
        category:"Kimia",
        difficulty:"easy",
        question:"Simbol kimia untuk perak adalah?",
        answers:["Ag","Au","Al","Ar"],
        correct:0
    },

    {
        id:"batch1-115",
        category:"Kimia",
        difficulty:"easy",
        question:"Rumus kimia karbon dioksida adalah?",
        answers:["CO","CO2","C2O","O2C"],
        correct:1
    },

    {
        id:"batch1-116",
        category:"Kimia",
        difficulty:"easy",
        question:"Garam dapur secara kimia dikenal sebagai?",
        answers:["NaCl","KCl","CaCO3","H2SO4"],
        correct:0
    },

    {
        id:"batch1-117",
        category:"Kimia",
        difficulty:"medium",
        question:"Atom terdiri atas proton, neutron, dan?",
        answers:["Elektron","Molekul","Ion","Senyawa"],
        correct:0
    },

    {
        id:"batch1-118",
        category:"Kimia",
        difficulty:"medium",
        question:"Larutan dengan pH kurang dari 7 bersifat?",
        answers:["Asam","Basa","Netral","Radioaktif"],
        correct:0
    },

    {
        id:"batch1-119",
        category:"Kimia",
        difficulty:"medium",
        question:"Larutan dengan pH lebih dari 7 bersifat?",
        answers:["Asam","Basa","Netral","Jenuh"],
        correct:1
    },

    {
        id:"batch1-120",
        category:"Kimia",
        difficulty:"medium",
        question:"Unsur dengan simbol Fe adalah?",
        answers:["Fluorin","Besi","Fermium","Fosfor"],
        correct:1
    },

    {
        id:"batch1-121",
        category:"Kimia",
        difficulty:"medium",
        question:"Gas yang paling melimpah di atmosfer Bumi adalah?",
        answers:["Oksigen","Nitrogen","Karbon dioksida","Argon"],
        correct:1
    },

    {
        id:"batch1-122",
        category:"Kimia",
        difficulty:"medium",
        question:"Ikatan yang terbentuk melalui penggunaan bersama pasangan elektron disebut?",
        answers:["Ionik","Kovalen","Logam","Nuklir"],
        correct:1
    },

    {
        id:"batch1-123",
        category:"Kimia",
        difficulty:"hard",
        question:"Nomor atom suatu unsur menunjukkan jumlah?",
        answers:["Neutron","Proton","Kulit elektron","Molekul"],
        correct:1
    },

    {
        id:"batch1-124",
        category:"Kimia",
        difficulty:"hard",
        question:"Isotop suatu unsur memiliki jumlah proton sama tetapi jumlah berbeda?",
        answers:["Elektron","Neutron","Molekul","Ion"],
        correct:1
    },

    {
        id:"batch1-125",
        category:"Kimia",
        difficulty:"hard",
        question:"Katalis berfungsi untuk?",
        answers:["Meningkatkan energi aktivasi","Menurunkan energi aktivasi","Menghentikan semua reaksi","Mengubah massa zat"],
        correct:1
    },

    {
        id:"batch1-126",
        category:"Kimia",
        difficulty:"hard",
        question:"Unsur dengan nomor atom 6 adalah?",
        answers:["Karbon","Nitrogen","Oksigen","Boron"],
        correct:0
    },

    {
        id:"batch1-127",
        category:"Kimia",
        difficulty:"extreme",
        question:"Bilangan oksidasi oksigen biasanya bernilai?",
        answers:["+1","0","-2","+2"],
        correct:2
    },

    {
        id:"batch1-128",
        category:"Kimia",
        difficulty:"extreme",
        question:"Model atom yang menggambarkan elektron berada pada orbital dengan probabilitas tertentu dikembangkan dalam?",
        answers:["Mekanika kuantum","Mekanika klasik","Termodinamika klasik","Optika geometris"],
        correct:0
    },

    {
        id:"batch1-129",
        category:"Kimia",
        difficulty:"extreme",
        question:"Partikel yang terbentuk ketika atom kehilangan atau menerima elektron disebut?",
        answers:["Ion","Isotop","Molekul","Nukleon"],
        correct:0
    },

    {
        id:"batch1-130",
        category:"Kimia",
        difficulty:"extreme",
        question:"Rumus molekul glukosa adalah?",
        answers:["C6H12O6","C12H22O11","CH4","C2H5OH"],
        correct:0
    },


    /* ================= ASTRONOMI ================= */

    {
        id:"batch1-131",
        category:"Astronomi",
        difficulty:"easy",
        question:"Planet yang paling dekat dengan Matahari adalah?",
        answers:["Venus","Merkurius","Bumi","Mars"],
        correct:1
    },

    {
        id:"batch1-132",
        category:"Astronomi",
        difficulty:"easy",
        question:"Planet terbesar di Tata Surya adalah?",
        answers:["Saturnus","Jupiter","Neptunus","Bumi"],
        correct:1
    },

    {
        id:"batch1-133",
        category:"Astronomi",
        difficulty:"easy",
        question:"Satelit alami Bumi disebut?",
        answers:["Bulan","Titan","Europa","Phobos"],
        correct:0
    },

    {
        id:"batch1-134",
        category:"Astronomi",
        difficulty:"easy",
        question:"Bintang yang menjadi pusat Tata Surya adalah?",
        answers:["Sirius","Matahari","Vega","Betelgeuse"],
        correct:1
    },

    {
        id:"batch1-135",
        category:"Astronomi",
        difficulty:"easy",
        question:"Planet yang dikenal dengan cincin paling mencolok adalah?",
        answers:["Mars","Saturnus","Venus","Merkurius"],
        correct:1
    },

    {
        id:"batch1-136",
        category:"Astronomi",
        difficulty:"medium",
        question:"Planet terpanas secara rata-rata di Tata Surya adalah?",
        answers:["Merkurius","Venus","Mars","Jupiter"],
        correct:1
    },

    {
        id:"batch1-137",
        category:"Astronomi",
        difficulty:"medium",
        question:"Galaksi tempat Tata Surya berada disebut?",
        answers:["Andromeda","Bima Sakti","Triangulum","Sombrero"],
        correct:1
    },

    {
        id:"batch1-138",
        category:"Astronomi",
        difficulty:"medium",
        question:"Gerhana Bulan terjadi ketika?",
        answers:["Bulan berada di antara Matahari dan Bumi","Bumi berada di antara Matahari dan Bulan","Matahari berada di antara Bumi dan Bulan","Mars berada di antara Bumi dan Bulan"],
        correct:1
    },

    {
        id:"batch1-139",
        category:"Astronomi",
        difficulty:"medium",
        question:"Gerhana Matahari terjadi ketika?",
        answers:["Bulan berada di antara Matahari dan Bumi","Bumi berada di antara Matahari dan Bulan","Mars berada di antara Matahari dan Bumi","Venus berada di antara Bumi dan Bulan"],
        correct:0
    },

    {
        id:"batch1-140",
        category:"Astronomi",
        difficulty:"medium",
        question:"Satuan yang digunakan untuk menyatakan jarak yang ditempuh cahaya selama satu tahun adalah?",
        answers:["Tahun cahaya","Parsek waktu","Unit suhu","Kilometer per detik"],
        correct:0
    },

    {
        id:"batch1-141",
        category:"Astronomi",
        difficulty:"hard",
        question:"Batas di sekitar lubang hitam yang tidak dapat dilewati cahaya disebut?",
        answers:["Event horizon","Photosphere","Heliosphere","Magnetopause"],
        correct:0
    },

    {
        id:"batch1-142",
        category:"Astronomi",
        difficulty:"hard",
        question:"Bintang neutron terutama tersusun dari materi yang sangat kaya akan?",
        answers:["Neutron","Elektron bebas saja","Foton","Molekul air"],
        correct:0
    },

    {
        id:"batch1-143",
        category:"Astronomi",
        difficulty:"hard",
        question:"Diagram Hertzsprung–Russell digunakan untuk mengelompokkan bintang berdasarkan luminositas dan?",
        answers:["Temperatur atau warna","Jarak dari Bulan","Jumlah planet","Kecepatan angin"],
        correct:0
    },

    {
        id:"batch1-144",
        category:"Astronomi",
        difficulty:"hard",
        question:"Sabuk asteroid utama berada di antara orbit?",
        answers:["Bumi dan Mars","Mars dan Jupiter","Jupiter dan Saturnus","Venus dan Bumi"],
        correct:1
    },

    {
        id:"batch1-145",
        category:"Astronomi",
        difficulty:"extreme",
        question:"Bintang yang massanya sangat besar dapat mengakhiri hidupnya melalui ledakan yang disebut?",
        answers:["Supernova","Nova biasa","Gerhana","Okultasi"],
        correct:0
    },

    {
        id:"batch1-146",
        category:"Astronomi",
        difficulty:"extreme",
        question:"Batas Roche berkaitan dengan?",
        answers:["Jarak ketika gaya pasang surut dapat merusak benda yang mengorbit","Jarak Bumi ke Matahari","Massa maksimum galaksi","Suhu inti Matahari"],
        correct:0
    },

    {
        id:"batch1-147",
        category:"Astronomi",
        difficulty:"extreme",
        question:"Apa nama galaksi besar terdekat dengan Bima Sakti?",
        answers:["Andromeda","Triangulum","Sombrero","Whirlpool"],
        correct:0
    },

    {
        id:"batch1-148",
        category:"Astronomi",
        difficulty:"extreme",
        question:"Materi hipotetis yang digunakan untuk menjelaskan sebagian besar massa galaksi tetapi tidak memancarkan cahaya disebut?",
        answers:["Materi gelap","Energi gelap","Plasma","Antimateri"],
        correct:0
    },


    /* ================= TEKNOLOGI ================= */

    {
        id:"batch1-149",
        category:"Teknologi",
        difficulty:"easy",
        question:"HTML terutama digunakan untuk?",
        answers:["Struktur halaman web","Mengolah suara","Membuat baterai","Mengedit foto"],
        correct:0
    },

    {
        id:"batch1-150",
        category:"Teknologi",
        difficulty:"easy",
        question:"CSS terutama digunakan untuk?",
        answers:["Mengatur tampilan halaman web","Mengelola listrik","Menyimpan file audio","Mengirim surat"],
        correct:0
    },

    {
        id:"batch1-151",
        category:"Teknologi",
        difficulty:"easy",
        question:"JavaScript pada halaman web terutama digunakan untuk?",
        answers:["Interaktivitas dan logika","Mencetak dokumen","Mengganti monitor","Mendinginkan komputer"],
        correct:0
    },

    {
        id:"batch1-152",
        category:"Teknologi",
        difficulty:"easy",
        question:"CPU merupakan singkatan dari?",
        answers:["Central Processing Unit","Computer Power Utility","Central Program User","Control Processing User"],
        correct:0
    },

    {
        id:"batch1-153",
        category:"Teknologi",
        difficulty:"easy",
        question:"RAM digunakan terutama untuk?",
        answers:["Penyimpanan sementara saat komputer bekerja","Mencetak dokumen","Menghasilkan gambar secara fisik","Mendinginkan komputer"],
        correct:0
    },

    {
        id:"batch1-154",
        category:"Teknologi",
        difficulty:"medium",
        question:"URL merupakan singkatan dari?",
        answers:["Uniform Resource Locator","Universal Route Link","User Resource Language","Uniform Router Locator"],
        correct:0
    },

    {
        id:"batch1-155",
        category:"Teknologi",
        difficulty:"medium",
        question:"HTTPS merupakan versi aman dari protokol?",
        answers:["HTTP","FTP","SMTP","POP3"],
        correct:0
    },

    {
        id:"batch1-156",
        category:"Teknologi",
        difficulty:"medium",
        question:"Sistem operasi berfungsi sebagai?",
        answers:["Penghubung dan pengelola sumber daya komputer","Jenis kabel","Perangkat penyimpanan eksternal","Bahasa pemrograman saja"],
        correct:0
    },

    {
        id:"batch1-157",
        category:"Teknologi",
        difficulty:"medium",
        question:"Database relasional menyimpan data terutama dalam bentuk?",
        answers:["Tabel yang saling berhubungan","Gambar saja","Video saja","Suara saja"],
        correct:0
    },

    {
        id:"batch1-158",
        category:"Teknologi",
        difficulty:"medium",
        question:"Bahasa pemrograman Python dikenal menggunakan sintaks yang relatif?",
        answers:["Mudah dibaca","Hanya berupa angka","Tidak memiliki variabel","Hanya untuk desain grafis"],
        correct:0
    },

    {
        id:"batch1-159",
        category:"Teknologi",
        difficulty:"hard",
        question:"DNS pada internet berfungsi menerjemahkan nama domain menjadi?",
        answers:["Alamat IP","Alamat rumah","Nomor telepon","Kode pos"],
        correct:0
    },

    {
        id:"batch1-160",
        category:"Teknologi",
        difficulty:"hard",
        question:"Protokol yang umum digunakan untuk mengirim email dari klien ke server adalah?",
        answers:["SMTP","HTTP","FTP","DNS"],
        correct:0
    },

    {
        id:"batch1-161",
        category:"Teknologi",
        difficulty:"hard",
        question:"Git terutama digunakan untuk?",
        answers:["Kontrol versi","Mengedit suara","Membuat perangkat keras","Mengukur suhu"],
        correct:0
    },

    {
        id:"batch1-162",
        category:"Teknologi",
        difficulty:"hard",
        question:"Algoritma pencarian biner bekerja paling tepat pada data yang?",
        answers:["Sudah terurut","Selalu acak","Berupa gambar","Tidak memiliki elemen"],
        correct:0
    },

    {
        id:"batch1-163",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Struktur data yang menggunakan prinsip FIFO adalah?",
        answers:["Queue","Stack","Tree","Graph"],
        correct:0
    },

    {
        id:"batch1-164",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Struktur data yang menggunakan prinsip LIFO adalah?",
        answers:["Queue","Stack","Heap saja","Linked list saja"],
        correct:1
    },

    {
        id:"batch1-165",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Dalam jaringan komputer, alamat IP digunakan untuk?",
        answers:["Mengidentifikasi perangkat atau antarmuka jaringan","Mengukur suhu CPU","Menyimpan password secara otomatis","Mengatur warna layar"],
        correct:0
    },

    {
        id:"batch1-166",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Enkripsi yang menggunakan pasangan kunci publik dan privat disebut kriptografi?",
        answers:["Asimetris","Simetris","Linear","Analog"],
        correct:0
    },


    /* ================= MATEMATIKA ================= */

    {
        id:"batch1-167",
        category:"Matematika",
        difficulty:"easy",
        question:"Berapakah 25 + 37?",
        answers:["52","62","72","82"],
        correct:1
    },

    {
        id:"batch1-168",
        category:"Matematika",
        difficulty:"easy",
        question:"Berapakah 9 × 7?",
        answers:["54","63","72","81"],
        correct:1
    },

    {
        id:"batch1-169",
        category:"Matematika",
        difficulty:"easy",
        question:"Berapakah 100 ÷ 4?",
        answers:["20","25","30","40"],
        correct:1
    },

    {
        id:"batch1-170",
        category:"Matematika",
        difficulty:"easy",
        question:"Berapakah 15²?",
        answers:["125","200","225","250"],
        correct:2
    },

    {
        id:"batch1-171",
        category:"Matematika",
        difficulty:"medium",
        question:"Berapakah 20% dari 250?",
        answers:["25","40","50","75"],
        correct:2
    },

    {
        id:"batch1-172",
        category:"Matematika",
        difficulty:"medium",
        question:"Jika 3x = 27, berapakah x?",
        answers:["6","7","8","9"],
        correct:3
    },

    {
        id:"batch1-173",
        category:"Matematika",
        difficulty:"medium",
        question:"Berapakah luas persegi dengan sisi 12 cm?",
        answers:["24 cm²","48 cm²","144 cm²","288 cm²"],
        correct:2
    },

    {
        id:"batch1-174",
        category:"Matematika",
        difficulty:"medium",
        question:"Jumlah sudut dalam segitiga adalah?",
        answers:["90°","180°","270°","360°"],
        correct:1
    },

    {
        id:"batch1-175",
        category:"Matematika",
        difficulty:"medium",
        question:"Berapakah rata-rata dari 6, 8, dan 10?",
        answers:["7","8","9","10"],
        correct:1
    },

    {
        id:"batch1-176",
        category:"Matematika",
        difficulty:"medium",
        question:"Pecahan 3/4 jika dinyatakan sebagai persen adalah?",
        answers:["25%","50%","75%","80%"],
        correct:2
    },

    {
        id:"batch1-177",
        category:"Matematika",
        difficulty:"hard",
        question:"Berapakah akar kuadrat dari 1.024?",
        answers:["16","32","64","128"],
        correct:1
    },

    {
        id:"batch1-178",
        category:"Matematika",
        difficulty:"hard",
        question:"Jika 2x + 5 = 17, berapakah x?",
        answers:["5","6","7","8"],
        correct:1
    },

    {
        id:"batch1-179",
        category:"Matematika",
        difficulty:"hard",
        question:"Berapakah hasil dari 2⁵ × 2³?",
        answers:["64","128","256","512"],
        correct:2
    },

    {
        id:"batch1-180",
        category:"Matematika",
        difficulty:"hard",
        question:"Berapakah FPB dari 36 dan 48?",
        answers:["6","8","12","16"],
        correct:2
    },

    {
        id:"batch1-181",
        category:"Matematika",
        difficulty:"extreme",
        question:"Jika f(x) = 2x² - 3, berapakah f(4)?",
        answers:["25","29","32","35"],
        correct:1
    },

    {
        id:"batch1-182",
        category:"Matematika",
        difficulty:"extreme",
        question:"Berapakah jumlah 10 suku pertama barisan 2, 4, 6, 8, ...?",
        answers:["100","110","120","140"],
        correct:1
    },

    {
        id:"batch1-183",
        category:"Matematika",
        difficulty:"extreme",
        question:"Berapakah determinan matriks [[2,1],[3,4]]?",
        answers:["3","5","7","8"],
        correct:1
    },

    {
        id:"batch1-184",
        category:"Matematika",
        difficulty:"extreme",
        question:"Jika sebuah dadu dilempar sekali, peluang mendapatkan bilangan genap adalah?",
        answers:["1/6","1/3","1/2","2/3"],
        correct:2
    },


    /* ================= BUDAYA DUNIA ================= */

    {
        id:"batch1-185",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Tari flamenco sangat identik dengan negara?",
        answers:["Spanyol","Italia","Portugal","Yunani"],
        correct:0
    },

    {
        id:"batch1-186",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Kimono merupakan pakaian tradisional yang berasal dari?",
        answers:["Korea","Jepang","Tiongkok","Vietnam"],
        correct:1
    },

    {
        id:"batch1-187",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Pizza secara tradisional sangat identik dengan negara?",
        answers:["Italia","Prancis","Spanyol","Jerman"],
        correct:0
    },

    {
        id:"batch1-188",
        category:"Budaya Dunia",
        difficulty:"medium",
        question:"Tango sangat identik dengan budaya Argentina dan?",
        answers:["Uruguay","Kanada","Mesir","India"],
        correct:0
    },

    {
        id:"batch1-189",
        category:"Budaya Dunia",
        difficulty:"medium",
        question:"Samba sangat terkenal sebagai bagian dari budaya?",
        answers:["Brasil","Norwegia","Jepang","Mesir"],
        correct:0
    },

    {
        id:"batch1-190",
        category:"Budaya Dunia",
        difficulty:"medium",
        question:"Oktoberfest merupakan festival terkenal yang berasal dari?",
        answers:["Jerman","Austria","Swiss","Belanda"],
        correct:0
    },

    {
        id:"batch1-191",
        category:"Budaya Dunia",
        difficulty:"medium",
        question:"Karnaval Rio de Janeiro diselenggarakan di negara?",
        answers:["Brasil","Portugal","Kolombia","Meksiko"],
        correct:0
    },

    {
        id:"batch1-192",
        category:"Budaya Dunia",
        difficulty:"hard",
        question:"Kabuki merupakan bentuk teater tradisional dari?",
        answers:["Jepang","India","Tiongkok","Thailand"],
        correct:0
    },

    {
        id:"batch1-193",
        category:"Budaya Dunia",
        difficulty:"hard",
        question:"Wayang kulit merupakan salah satu seni tradisional yang sangat berkembang di?",
        answers:["Indonesia","Kanada","Mesir","Norwegia"],
        correct:0
    },

    {
        id:"batch1-194",
        category:"Budaya Dunia",
        difficulty:"hard",
        question:"Teater tradisional Kathakali berasal dari?",
        answers:["India","Nepal","Sri Lanka","Bangladesh"],
        correct:0
    },


    /* ================= LINGKUNGAN ================= */

    {
        id:"batch1-195",
        category:"Lingkungan",
        difficulty:"easy",
        question:"Gas yang paling banyak berkontribusi terhadap efek rumah kaca akibat aktivitas manusia adalah?",
        answers:["Karbon dioksida","Helium","Neon","Argon"],
        correct:0
    },

    {
        id:"batch1-196",
        category:"Lingkungan",
        difficulty:"easy",
        question:"Hutan yang berada di sekitar garis khatulistiwa dengan curah hujan tinggi disebut?",
        answers:["Hutan hujan tropis","Taiga","Tundra","Sabana kering"],
        correct:0
    },

    {
        id:"batch1-197",
        category:"Lingkungan",
        difficulty:"medium",
        question:"Proses pengikisan tanah oleh air atau angin disebut?",
        answers:["Erosi","Fotosintesis","Kondensasi","Fermentasi"],
        correct:0
    },

    {
        id:"batch1-198",
        category:"Lingkungan",
        difficulty:"medium",
        question:"Lapisan atmosfer tempat sebagian besar fenomena cuaca terjadi adalah?",
        answers:["Troposfer","Stratosfer","Mesosfer","Termosfer"],
        correct:0
    },

    {
        id:"batch1-199",
        category:"Lingkungan",
        difficulty:"hard",
        question:"Lapisan ozon terutama berada di?",
        answers:["Troposfer","Stratosfer","Mesosfer","Eksosfer"],
        correct:1
    },

    {
        id:"batch1-200",
        category:"Lingkungan",
        difficulty:"extreme",
        question:"Proses ketika ekosistem secara bertahap berubah komposisinya setelah gangguan disebut?",
        answers:["Suksesi ekologis","Eutrofikasi","Evaporasi","Infiltrasi"],
        correct:0
    },

    /* =========================================
       BATCH 2 — 200 SOAL TAMBAHAN
    ========================================= */

    {
        id:"batch2-001",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Australia?",
        answers:["Sydney","Melbourne","Canberra","Perth"],
        correct:2
    },
    {
        id:"batch2-002",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Brasil?",
        answers:["Rio de Janeiro","Brasilia","Sao Paulo","Salvador"],
        correct:1
    },
    {
        id:"batch2-003",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Mesir?",
        answers:["Kairo","Alexandria","Giza","Luxor"],
        correct:0
    },
    {
        id:"batch2-004",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Thailand?",
        answers:["Phuket","Chiang Mai","Bangkok","Pattaya"],
        correct:2
    },
    {
        id:"batch2-005",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Korea Selatan?",
        answers:["Busan","Seoul","Incheon","Daegu"],
        correct:1
    },
    {
        id:"batch2-006",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Argentina?",
        answers:["Cordoba","Rosario","Buenos Aires","Mendoza"],
        correct:2
    },
    {
        id:"batch2-007",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Turki?",
        answers:["Istanbul","Ankara","Izmir","Bursa"],
        correct:1
    },
    {
        id:"batch2-008",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Portugal?",
        answers:["Porto","Lisbon","Braga","Faro"],
        correct:1
    },
    {
        id:"batch2-009",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota Norwegia?",
        answers:["Bergen","Oslo","Trondheim","Stavanger"],
        correct:1
    },
    {
        id:"batch2-010",
        category:"Geografi Dunia",
        difficulty:"easy",
        question:"Apa ibu kota India?",
        answers:["Mumbai","New Delhi","Kolkata","Chennai"],
        correct:1
    },

    {
        id:"batch2-011",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Negara manakah yang memiliki wilayah terbesar di dunia?",
        answers:["Kanada","Amerika Serikat","Rusia","Tiongkok"],
        correct:2
    },
    {
        id:"batch2-012",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Sungai terpanjang di Amerika Selatan adalah?",
        answers:["Amazon","Parana","Orinoco","Uruguay"],
        correct:0
    },
    {
        id:"batch2-013",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Gurun Sahara terletak di benua?",
        answers:["Asia","Afrika","Australia","Amerika Selatan"],
        correct:1
    },
    {
        id:"batch2-014",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Pegunungan Andes berada terutama di benua?",
        answers:["Afrika","Eropa","Amerika Selatan","Asia"],
        correct:2
    },
    {
        id:"batch2-015",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Danau terbesar berdasarkan luas permukaan adalah?",
        answers:["Danau Baikal","Laut Kaspia","Danau Victoria","Danau Superior"],
        correct:1
    },
    {
        id:"batch2-016",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Negara yang dikenal sebagai Negeri Matahari Terbit adalah?",
        answers:["Tiongkok","Korea Selatan","Jepang","Thailand"],
        correct:2
    },
    {
        id:"batch2-017",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Terusan Panama menghubungkan Samudra Atlantik dengan?",
        answers:["Samudra Hindia","Samudra Pasifik","Laut Mediterania","Laut Merah"],
        correct:1
    },
    {
        id:"batch2-018",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Pulau terbesar di dunia adalah?",
        answers:["Madagaskar","Greenland","Borneo","Papua"],
        correct:1
    },
    {
        id:"batch2-019",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Sungai Nil mengalir terutama di benua?",
        answers:["Afrika","Asia","Eropa","Australia"],
        correct:0
    },
    {
        id:"batch2-020",
        category:"Geografi Dunia",
        difficulty:"medium",
        question:"Laut Mediterania berada di antara Eropa, Afrika, dan?",
        answers:["Amerika","Asia","Australia","Antarktika"],
        correct:1
    },

    {
        id:"batch2-021",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Negara yang seluruh wilayahnya dikelilingi oleh Afrika Selatan adalah?",
        answers:["Eswatini","Lesotho","Botswana","Namibia"],
        correct:1
    },
    {
        id:"batch2-022",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Selat yang memisahkan Asia dan Amerika Utara adalah?",
        answers:["Selat Gibraltar","Selat Bering","Selat Malaka","Selat Bosporus"],
        correct:1
    },
    {
        id:"batch2-023",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Gunung Kilimanjaro berada di negara?",
        answers:["Kenya","Tanzania","Uganda","Ethiopia"],
        correct:1
    },
    {
        id:"batch2-024",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Ibu kota Mongolia adalah?",
        answers:["Astana","Ulaanbaatar","Bishkek","Dushanbe"],
        correct:1
    },
    {
        id:"batch2-025",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Negara yang memiliki bentuk seperti sepatu bot adalah?",
        answers:["Yunani","Italia","Spanyol","Kroasia"],
        correct:1
    },
    {
        id:"batch2-026",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Danau Baikal berada di negara?",
        answers:["Rusia","Kazakhstan","Mongolia","Finlandia"],
        correct:0
    },
    {
        id:"batch2-027",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Gurun Atacama terutama berada di negara?",
        answers:["Peru","Chile","Argentina","Bolivia"],
        correct:1
    },
    {
        id:"batch2-028",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Sungai terpanjang di Eropa adalah?",
        answers:["Danube","Volga","Rhine","Seine"],
        correct:1
    },
    {
        id:"batch2-029",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Negara yang berbatasan darat dengan Portugal adalah?",
        answers:["Prancis","Italia","Spanyol","Maroko"],
        correct:2
    },
    {
        id:"batch2-030",
        category:"Geografi Dunia",
        difficulty:"hard",
        question:"Kepulauan Galapagos merupakan bagian dari negara?",
        answers:["Ekuador","Peru","Kolombia","Chile"],
        correct:0
    },

    {
        id:"batch2-031",
        category:"Geografi Dunia",
        difficulty:"extreme",
        question:"Ibu kota Bhutan adalah?",
        answers:["Thimphu","Paro","Punakha","Kathmandu"],
        correct:0
    },
    {
        id:"batch2-032",
        category:"Geografi Dunia",
        difficulty:"extreme",
        question:"Ibu kota Kirgizstan adalah?",
        answers:["Bishkek","Osh","Dushanbe","Tashkent"],
        correct:0
    },
    {
        id:"batch2-033",
        category:"Geografi Dunia",
        difficulty:"extreme",
        question:"Ibu kota Tajikistan adalah?",
        answers:["Ashgabat","Dushanbe","Bishkek","Tashkent"],
        correct:1
    },
    {
        id:"batch2-034",
        category:"Geografi Dunia",
        difficulty:"extreme",
        question:"Ibu kota Turkmenistan adalah?",
        answers:["Ashgabat","Baku","Tbilisi","Yerevan"],
        correct:0
    },
    {
        id:"batch2-035",
        category:"Geografi Dunia",
        difficulty:"extreme",
        question:"Ibu kota Georgia adalah?",
        answers:["Tbilisi","Batumi","Kutaisi","Yerevan"],
        correct:0
    },
    {
        id:"batch2-036",
        category:"Geografi Dunia",
        difficulty:"extreme",
        question:"Ibu kota Armenia adalah?",
        answers:["Baku","Yerevan","Tbilisi","Ganja"],
        correct:1
    },
    {
        id:"batch2-037",
        category:"Geografi Dunia",
        difficulty:"extreme",
        question:"Ibu kota Azerbaijan adalah?",
        answers:["Baku","Ganja","Tbilisi","Yerevan"],
        correct:0
    },
    {
        id:"batch2-038",
        category:"Geografi Dunia",
        difficulty:"extreme",
        question:"Ibu kota Moldova adalah?",
        answers:["Chisinau","Sofia","Bucharest","Kyiv"],
        correct:0
    },
    {
        id:"batch2-039",
        category:"Geografi Dunia",
        difficulty:"extreme",
        question:"Ibu kota Slovenia adalah?",
        answers:["Zagreb","Ljubljana","Bratislava","Sarajevo"],
        correct:1
    },
    {
        id:"batch2-040",
        category:"Geografi Dunia",
        difficulty:"extreme",
        question:"Ibu kota Montenegro adalah?",
        answers:["Podgorica","Pristina","Skopje","Tirana"],
        correct:0
    },

    /* ================= SEJARAH DUNIA ================= */

    {
        id:"batch2-041",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Tembok Berlin runtuh pada tahun?",
        answers:["1987","1989","1991","1993"],
        correct:1
    },
    {
        id:"batch2-042",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Titanic tenggelam pada tahun?",
        answers:["1905","1912","1918","1920"],
        correct:1
    },
    {
        id:"batch2-043",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Peradaban yang membangun piramida Giza adalah?",
        answers:["Romawi","Mesir Kuno","Yunani","Persia"],
        correct:1
    },
    {
        id:"batch2-044",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Colosseum terkenal berada di kota?",
        answers:["Athena","Roma","Paris","Madrid"],
        correct:1
    },
    {
        id:"batch2-045",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Perang Dunia I dimulai pada tahun?",
        answers:["1914","1915","1916","1918"],
        correct:0
    },
    {
        id:"batch2-046",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Perang Dunia II berakhir pada tahun?",
        answers:["1943","1944","1945","1946"],
        correct:2
    },
    {
        id:"batch2-047",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Tahun jatuhnya Konstantinopel adalah?",
        answers:["1453","1492","1517","1600"],
        correct:0
    },
    {
        id:"batch2-048",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Revolusi Industri pertama kali berkembang pesat di?",
        answers:["Inggris","Prancis","Italia","Spanyol"],
        correct:0
    },
    {
        id:"batch2-049",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Peradaban Maya berkembang terutama di wilayah?",
        answers:["Mesoamerika","Eropa Barat","Asia Tengah","Afrika Utara"],
        correct:0
    },
    {
        id:"batch2-050",
        category:"Sejarah Dunia",
        difficulty:"easy",
        question:"Jalur perdagangan kuno yang menghubungkan Asia dan Eropa dikenal sebagai?",
        answers:["Jalur Sutra","Jalur Rempah Modern","Jalur Atlantik","Jalur Utara"],
        correct:0
    },

    {
        id:"batch2-051",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Siapa pemimpin Makedonia yang menaklukkan wilayah luas hingga Asia?",
        answers:["Alexander Agung","Julius Caesar","Hannibal","Pericles"],
        correct:0
    },
    {
        id:"batch2-052",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Julius Caesar merupakan tokoh penting dalam sejarah?",
        answers:["Roma","Mesir","Jepang","India"],
        correct:0
    },
    {
        id:"batch2-053",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Wabah yang dikenal sebagai Black Death melanda Eropa terutama pada abad?",
        answers:["10","12","14","17"],
        correct:2
    },
    {
        id:"batch2-054",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Revolusi Amerika menghasilkan kemerdekaan dari?",
        answers:["Prancis","Britania Raya","Spanyol","Portugal"],
        correct:1
    },
    {
        id:"batch2-055",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Deklarasi Kemerdekaan Amerika Serikat diadopsi pada tahun?",
        answers:["1776","1783","1789","1800"],
        correct:0
    },
    {
        id:"batch2-056",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Napoleon Bonaparte berasal dari?",
        answers:["Prancis","Italia","Austria","Belgia"],
        correct:0
    },
    {
        id:"batch2-057",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Perang Dingin terutama melibatkan Amerika Serikat dan?",
        answers:["Jepang","Uni Soviet","India","Brasil"],
        correct:1
    },
    {
        id:"batch2-058",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Organisasi Perserikatan Bangsa-Bangsa didirikan pada tahun?",
        answers:["1919","1939","1945","1955"],
        correct:2
    },
    {
        id:"batch2-059",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Kapal yang membawa para peziarah Inggris ke Amerika Utara pada 1620 adalah?",
        answers:["Mayflower","Endeavour","Victory","Santa Maria"],
        correct:0
    },
    {
        id:"batch2-060",
        category:"Sejarah Dunia",
        difficulty:"medium",
        question:"Kota Pompeii terkubur akibat letusan gunung?",
        answers:["Etna","Vesuvius","Olympus","Stromboli"],
        correct:1
    },

    {
        id:"batch2-061",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Siapa penguasa Kekaisaran Mongol yang dikenal sebagai pendiri kekaisaran tersebut?",
        answers:["Kublai Khan","Genghis Khan","Timur","Attila"],
        correct:1
    },
    {
        id:"batch2-062",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Dinasti yang terkenal membangun sebagian besar Tembok Besar Tiongkok yang ada sekarang adalah?",
        answers:["Han","Tang","Ming","Qin"],
        correct:2
    },
    {
        id:"batch2-063",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Pertempuran Hastings terjadi pada tahun?",
        answers:["1066","1215","1415","1517"],
        correct:0
    },
    {
        id:"batch2-064",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Siapa yang memimpin ekspedisi pertama yang mengelilingi dunia setelah ekspedisi dimulai?",
        answers:["Ferdinand Magellan","Christopher Columbus","Vasco da Gama","James Cook"],
        correct:0
    },
    {
        id:"batch2-065",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Reformasi Protestan secara tradisional dikaitkan dengan Martin Luther pada tahun?",
        answers:["1492","1517","1555","1648"],
        correct:1
    },
    {
        id:"batch2-066",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Perjanjian Westphalia ditandatangani pada tahun?",
        answers:["1517","1648","1789","1815"],
        correct:1
    },
    {
        id:"batch2-067",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Pertempuran Waterloo mengakhiri kekuasaan Napoleon pada tahun?",
        answers:["1804","1812","1815","1821"],
        correct:2
    },
    {
        id:"batch2-068",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Kekaisaran Ottoman berakhir secara resmi setelah?",
        answers:["Perang Dunia I","Perang Dunia II","Perang Krimea","Perang Balkan Pertama"],
        correct:0
    },
    {
        id:"batch2-069",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Kota Machu Picchu dibangun oleh peradaban?",
        answers:["Aztek","Inka","Maya","Olmec"],
        correct:1
    },
    {
        id:"batch2-070",
        category:"Sejarah Dunia",
        difficulty:"hard",
        question:"Hammurabi terkenal karena?",
        answers:["Kode hukum Babilonia","Penemuan kompas","Pembangunan Colosseum","Penemuan mesin uap"],
        correct:0
    },

    {
        id:"batch2-071",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Perjanjian Tordesillas tahun 1494 terutama membagi wilayah eksplorasi antara?",
        answers:["Inggris dan Prancis","Spanyol dan Portugal","Belanda dan Inggris","Portugal dan Belanda"],
        correct:1
    },
    {
        id:"batch2-072",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Pertempuran Thermopylae terkenal melibatkan pasukan Yunani melawan?",
        answers:["Romawi","Persia","Makedonia","Mesir"],
        correct:1
    },
    {
        id:"batch2-073",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Peradaban yang menggunakan sistem tulisan paku atau cuneiform adalah?",
        answers:["Sumeria","Aztek","Inka","Maya"],
        correct:0
    },
    {
        id:"batch2-074",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Kota kuno Kartago terletak di wilayah yang sekarang merupakan?",
        answers:["Tunisia","Mesir","Maroko","Libya"],
        correct:0
    },
    {
        id:"batch2-075",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Siapa kaisar Romawi yang mengeluarkan Edict of Milan bersama Licinius?",
        answers:["Konstantinus Agung","Nero","Augustus","Trajan"],
        correct:0
    },
    {
        id:"batch2-076",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Kekaisaran Bizantium berpusat di kota yang dahulu dikenal sebagai?",
        answers:["Konstantinopel","Roma","Alexandria","Antiokhia"],
        correct:0
    },
    {
        id:"batch2-077",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Dinasti Abbasiyah menjadikan kota mana sebagai pusat kekhalifahan?",
        answers:["Damaskus","Baghdad","Kairo","Madinah"],
        correct:1
    },
    {
        id:"batch2-078",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Magna Carta ditandatangani pada masa pemerintahan raja Inggris?",
        answers:["Henry VIII","John","Richard III","Edward I"],
        correct:1
    },
    {
        id:"batch2-079",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Perang Tiga Puluh Tahun terutama berlangsung di wilayah?",
        answers:["Eropa Tengah","Amerika Selatan","Asia Timur","Afrika Utara"],
        correct:0
    },
    {
        id:"batch2-080",
        category:"Sejarah Dunia",
        difficulty:"extreme",
        question:"Konferensi Berlin 1884–1885 terutama berkaitan dengan?",
        answers:["Pembagian Afrika oleh kekuatan Eropa","Pembentukan PBB","Perang Dunia I","Kemerdekaan India"],
        correct:0
    },

    /* ================= SAINS ================= */

    {
        id:"batch2-081",
        category:"Sains",
        difficulty:"easy",
        question:"Planet tempat manusia tinggal adalah?",
        answers:["Mars","Bumi","Venus","Jupiter"],
        correct:1
    },
    {
        id:"batch2-082",
        category:"Sains",
        difficulty:"easy",
        question:"Air membeku pada suhu berapa dalam skala Celsius pada tekanan standar?",
        answers:["0°C","10°C","50°C","100°C"],
        correct:0
    },
    {
        id:"batch2-083",
        category:"Sains",
        difficulty:"easy",
        question:"Gas yang dibutuhkan manusia untuk respirasi adalah?",
        answers:["Nitrogen","Oksigen","Helium","Neon"],
        correct:1
    },
    {
        id:"batch2-084",
        category:"Sains",
        difficulty:"easy",
        question:"Bagian tumbuhan yang menyerap air dari tanah adalah?",
        answers:["Daun","Akar","Bunga","Batang"],
        correct:1
    },
    {
        id:"batch2-085",
        category:"Sains",
        difficulty:"easy",
        question:"Satuan dasar massa dalam SI adalah?",
        answers:["Gram","Kilogram","Ton","Miligram"],
        correct:1
    },
    {
        id:"batch2-086",
        category:"Sains",
        difficulty:"easy",
        question:"Hewan yang hanya memakan tumbuhan disebut?",
        answers:["Karnivora","Herbivora","Omnivora","Insektivora"],
        correct:1
    },
    {
        id:"batch2-087",
        category:"Sains",
        difficulty:"easy",
        question:"Organ utama pernapasan manusia adalah?",
        answers:["Jantung","Paru-paru","Ginjal","Lambung"],
        correct:1
    },
    {
        id:"batch2-088",
        category:"Sains",
        difficulty:"easy",
        question:"Gaya yang menarik benda menuju Bumi disebut?",
        answers:["Magnetisme","Gravitasi","Gesekan","Elastisitas"],
        correct:1
    },
    {
        id:"batch2-089",
        category:"Sains",
        difficulty:"easy",
        question:"Es merupakan bentuk air dalam wujud?",
        answers:["Gas","Cair","Padat","Plasma"],
        correct:2
    },
    {
        id:"batch2-090",
        category:"Sains",
        difficulty:"easy",
        question:"Mata manusia digunakan terutama untuk?",
        answers:["Mendengar","Melihat","Mencium","Mengecap"],
        correct:1
    },

    {
        id:"batch2-091",
        category:"Fisika",
        difficulty:"medium",
        question:"Kecepatan cahaya di ruang hampa kira-kira?",
        answers:["300 ribu km/detik","30 ribu km/detik","3 ribu km/detik","3 juta km/detik"],
        correct:0
    },
    {
        id:"batch2-092",
        category:"Fisika",
        difficulty:"medium",
        question:"Alat untuk mengukur suhu adalah?",
        answers:["Barometer","Termometer","Amperemeter","Higrometer"],
        correct:1
    },
    {
        id:"batch2-093",
        category:"Fisika",
        difficulty:"medium",
        question:"Satuan SI untuk arus listrik adalah?",
        answers:["Volt","Ampere","Ohm","Watt"],
        correct:1
    },
    {
        id:"batch2-094",
        category:"Fisika",
        difficulty:"medium",
        question:"Satuan SI untuk tekanan adalah?",
        answers:["Pascal","Joule","Newton","Tesla"],
        correct:0
    },
    {
        id:"batch2-095",
        category:"Fisika",
        difficulty:"medium",
        question:"Energi yang dimiliki benda karena posisinya disebut energi?",
        answers:["Kinetik","Potensial","Termal","Nuklir"],
        correct:1
    },
    {
        id:"batch2-096",
        category:"Kimia",
        difficulty:"medium",
        question:"Simbol kimia untuk emas adalah?",
        answers:["Ag","Au","Fe","Cu"],
        correct:1
    },
    {
        id:"batch2-097",
        category:"Kimia",
        difficulty:"medium",
        question:"Simbol kimia untuk perak adalah?",
        answers:["Ag","Au","Al","Ar"],
        correct:0
    },
    {
        id:"batch2-098",
        category:"Kimia",
        difficulty:"medium",
        question:"Karbon dioksida memiliki rumus?",
        answers:["CO","CO2","C2O","C2O2"],
        correct:1
    },
    {
        id:"batch2-099",
        category:"Biologi",
        difficulty:"medium",
        question:"Sel darah merah manusia terutama berfungsi mengangkut?",
        answers:["Oksigen","Hormon","Lemak","Air"],
        correct:0
    },
    {
        id:"batch2-100",
        category:"Biologi",
        difficulty:"medium",
        question:"Bagian sel yang mengatur aktivitas sel dan menyimpan sebagian besar DNA adalah?",
        answers:["Ribosom","Nukleus","Vakuola","Dinding sel"],
        correct:1
    },

    {
        id:"batch2-101",
        category:"Biologi",
        difficulty:"hard",
        question:"Organel tempat fotosintesis berlangsung adalah?",
        answers:["Mitokondria","Kloroplas","Ribosom","Lisosom"],
        correct:1
    },
    {
        id:"batch2-102",
        category:"Biologi",
        difficulty:"hard",
        question:"Molekul yang menjadi sumber energi langsung utama bagi banyak proses sel adalah?",
        answers:["DNA","ATP","RNA","Air"],
        correct:1
    },
    {
        id:"batch2-103",
        category:"Biologi",
        difficulty:"hard",
        question:"Unit pewarisan sifat yang terdapat pada DNA disebut?",
        answers:["Gen","Jaringan","Organ","Enzim"],
        correct:0
    },
    {
        id:"batch2-104",
        category:"Biologi",
        difficulty:"hard",
        question:"Proses pembelahan sel yang menghasilkan dua sel anak identik disebut?",
        answers:["Meiosis","Mitosis","Fertilisasi","Transkripsi"],
        correct:1
    },
    {
        id:"batch2-105",
        category:"Biologi",
        difficulty:"hard",
        question:"Protein tersusun dari unit-unit yang disebut?",
        answers:["Asam amino","Asam lemak","Glukosa","Nukleotida"],
        correct:0
    },
    {
        id:"batch2-106",
        category:"Kimia",
        difficulty:"hard",
        question:"Unsur dengan nomor atom 1 adalah?",
        answers:["Helium","Hidrogen","Litium","Oksigen"],
        correct:1
    },
    {
        id:"batch2-107",
        category:"Kimia",
        difficulty:"hard",
        question:"Gas mulia yang memiliki simbol He adalah?",
        answers:["Hidrogen","Helium","Hafnium","Holmium"],
        correct:1
    },
    {
        id:"batch2-108",
        category:"Kimia",
        difficulty:"hard",
        question:"Ikatan yang terbentuk karena pemakaian bersama pasangan elektron disebut?",
        answers:["Ionik","Kovalen","Logam","Nuklir"],
        correct:1
    },
    {
        id:"batch2-109",
        category:"Fisika",
        difficulty:"hard",
        question:"Hukum Newton kedua menyatakan hubungan antara gaya, massa, dan?",
        answers:["Percepatan","Suhu","Volume","Tekanan"],
        correct:0
    },
    {
        id:"batch2-110",
        category:"Fisika",
        difficulty:"hard",
        question:"Satuan SI daya adalah?",
        answers:["Watt","Joule","Newton","Volt"],
        correct:0
    },

    {
        id:"batch2-111",
        category:"Sains",
        difficulty:"extreme",
        question:"Partikel pembawa gaya elektromagnetik adalah?",
        answers:["Foton","Elektron","Proton","Neutrino"],
        correct:0
    },
    {
        id:"batch2-112",
        category:"Sains",
        difficulty:"extreme",
        question:"Partikel subatomik yang tidak memiliki muatan listrik adalah?",
        answers:["Proton","Elektron","Neutron","Positron"],
        correct:2
    },
    {
        id:"batch2-113",
        category:"Sains",
        difficulty:"extreme",
        question:"DNA berbentuk struktur yang dikenal sebagai?",
        answers:["Heliks ganda","Lingkaran tunggal","Kubus","Rantai lurus tunggal"],
        correct:0
    },
    {
        id:"batch2-114",
        category:"Sains",
        difficulty:"extreme",
        question:"Proses perubahan RNA menjadi protein disebut?",
        answers:["Replikasi","Translasi","Mutasi","Meiosis"],
        correct:1
    },
    {
        id:"batch2-115",
        category:"Sains",
        difficulty:"extreme",
        question:"Hukum kekekalan energi menyatakan bahwa energi?",
        answers:["Dapat diciptakan dari nol","Tidak dapat diciptakan atau dimusnahkan","Selalu hilang","Hanya ada dalam benda"],
        correct:1
    },
    {
        id:"batch2-116",
        category:"Kimia",
        difficulty:"extreme",
        question:"Bilangan Avogadro kira-kira bernilai?",
        answers:["6,022 × 10²³","9,81 × 10²","3 × 10⁸","1,602 × 10⁻¹⁹"],
        correct:0
    },
    {
        id:"batch2-117",
        category:"Kimia",
        difficulty:"extreme",
        question:"Partikel penyusun inti atom adalah?",
        answers:["Elektron dan foton","Proton dan neutron","Elektron dan neutron","Foton dan proton"],
        correct:1
    },
    {
        id:"batch2-118",
        category:"Fisika",
        difficulty:"extreme",
        question:"Efek Doppler berkaitan dengan perubahan?",
        answers:["Frekuensi yang teramati akibat gerak relatif","Massa benda","Suhu benda","Warna zat padat"],
        correct:0
    },
    {
        id:"batch2-119",
        category:"Fisika",
        difficulty:"extreme",
        question:"Hukum pertama termodinamika berkaitan erat dengan?",
        answers:["Kekekalan energi","Hukum gravitasi","Muatan listrik","Kecepatan cahaya"],
        correct:0
    },
    {
        id:"batch2-120",
        category:"Astronomi",
        difficulty:"extreme",
        question:"Bintang yang sangat padat dan terutama tersusun dari neutron disebut?",
        answers:["Katai putih","Bintang neutron","Raksasa merah","Katai cokelat"],
        correct:1
    },

    /* ================= TEKNOLOGI ================= */

    {
        id:"batch2-121",
        category:"Teknologi",
        difficulty:"easy",
        question:"Perangkat yang digunakan untuk memasukkan teks ke komputer adalah?",
        answers:["Keyboard","Monitor","Speaker","Printer"],
        correct:0
    },
    {
        id:"batch2-122",
        category:"Teknologi",
        difficulty:"easy",
        question:"Perangkat untuk menampilkan gambar dari komputer adalah?",
        answers:["Mouse","Monitor","Keyboard","Router"],
        correct:1
    },
    {
        id:"batch2-123",
        category:"Teknologi",
        difficulty:"easy",
        question:"Internet merupakan jaringan komputer yang bersifat?",
        answers:["Lokal saja","Global","Tanpa jaringan","Khusus satu perangkat"],
        correct:1
    },
    {
        id:"batch2-124",
        category:"Teknologi",
        difficulty:"easy",
        question:"Ekstensi umum untuk file JavaScript adalah?",
        answers:[".html",".css",".js",".java"],
        correct:2
    },
    {
        id:"batch2-125",
        category:"Teknologi",
        difficulty:"easy",
        question:"HTML merupakan bahasa yang digunakan terutama untuk?",
        answers:["Struktur halaman web","Menggambar sirkuit","Mengolah database saja","Mengedit audio"],
        correct:0
    },
    {
        id:"batch2-126",
        category:"Teknologi",
        difficulty:"easy",
        question:"CSS terutama digunakan untuk?",
        answers:["Mengatur tampilan halaman web","Menghitung listrik","Mengompres video","Membuat database"],
        correct:0
    },
    {
        id:"batch2-127",
        category:"Teknologi",
        difficulty:"easy",
        question:"RAM digunakan untuk menyimpan data?",
        answers:["Sementara saat komputer bekerja","Permanen selamanya","Hanya gambar","Hanya suara"],
        correct:0
    },
    {
        id:"batch2-128",
        category:"Teknologi",
        difficulty:"easy",
        question:"Alat yang menghubungkan perangkat ke jaringan Wi-Fi disebut?",
        answers:["Router","Printer","Scanner","Monitor"],
        correct:0
    },
    {
        id:"batch2-129",
        category:"Teknologi",
        difficulty:"easy",
        question:"Sistem operasi pada ponsel Android dikembangkan dengan basis?",
        answers:["Linux","DOS","MS-DOS","BIOS"],
        correct:0
    },
    {
        id:"batch2-130",
        category:"Teknologi",
        difficulty:"easy",
        question:"QR pada QR Code merupakan singkatan dari?",
        answers:["Quick Response","Quick Reading","Quality Record","Query Response"],
        correct:0
    },

    {
        id:"batch2-131",
        category:"Teknologi",
        difficulty:"medium",
        question:"DNS digunakan untuk menerjemahkan nama domain menjadi?",
        answers:["Alamat IP","Password","File gambar","Kode HTML"],
        correct:0
    },
    {
        id:"batch2-132",
        category:"Teknologi",
        difficulty:"medium",
        question:"HTTP merupakan protokol yang digunakan terutama untuk?",
        answers:["Komunikasi web","Transfer listrik","Audio analog","Pencetakan"],
        correct:0
    },
    {
        id:"batch2-133",
        category:"Teknologi",
        difficulty:"medium",
        question:"Git merupakan sistem untuk?",
        answers:["Kontrol versi","Mengedit foto","Memutar musik","Mengukur suhu"],
        correct:0
    },
    {
        id:"batch2-134",
        category:"Teknologi",
        difficulty:"medium",
        question:"JSON sering digunakan untuk?",
        answers:["Pertukaran data","Menggambar gambar","Mengukur jaringan","Mencetak dokumen"],
        correct:0
    },
    {
        id:"batch2-135",
        category:"Teknologi",
        difficulty:"medium",
        question:"Algoritma adalah?",
        answers:["Langkah-langkah sistematis untuk menyelesaikan masalah","Jenis monitor","Bahasa pemrograman saja","Perangkat keras"],
        correct:0
    },
    {
        id:"batch2-136",
        category:"Teknologi",
        difficulty:"medium",
        question:"Database digunakan terutama untuk?",
        answers:["Menyimpan dan mengelola data","Mendinginkan komputer","Menghasilkan listrik","Memperbesar monitor"],
        correct:0
    },
    {
        id:"batch2-137",
        category:"Teknologi",
        difficulty:"medium",
        question:"Bahasa pemrograman yang digunakan pada script.js dalam kuis ini adalah?",
        answers:["JavaScript","Python","C++","PHP"],
        correct:0
    },
    {
        id:"batch2-138",
        category:"Teknologi",
        difficulty:"medium",
        question:"LocalStorage pada browser digunakan untuk?",
        answers:["Menyimpan data secara lokal di browser","Mengirim satelit","Mengubah warna layar secara otomatis","Menghapus internet"],
        correct:0
    },
    {
        id:"batch2-139",
        category:"Teknologi",
        difficulty:"medium",
        question:"Boolean biasanya hanya memiliki dua nilai?",
        answers:["Benar dan salah","Tinggi dan rendah","Merah dan biru","Besar dan kecil"],
        correct:0
    },
    {
        id:"batch2-140",
        category:"Teknologi",
        difficulty:"medium",
        question:"API merupakan singkatan dari?",
        answers:["Application Programming Interface","Advanced Program Internet","Application Process Input","Automatic Programming Internet"],
        correct:0
    },

    {
        id:"batch2-141",
        category:"Teknologi",
        difficulty:"hard",
        question:"HTTPS menambahkan keamanan pada HTTP menggunakan?",
        answers:["TLS","FTP","SMTP","DNS"],
        correct:0
    },
    {
        id:"batch2-142",
        category:"Teknologi",
        difficulty:"hard",
        question:"IPv4 menggunakan alamat sepanjang?",
        answers:["16 bit","32 bit","64 bit","128 bit"],
        correct:1
    },
    {
        id:"batch2-143",
        category:"Teknologi",
        difficulty:"hard",
        question:"IPv6 menggunakan alamat sepanjang?",
        answers:["32 bit","64 bit","128 bit","256 bit"],
        correct:2
    },
    {
        id:"batch2-144",
        category:"Teknologi",
        difficulty:"hard",
        question:"SQL digunakan terutama untuk?",
        answers:["Mengelola dan mengambil data database relasional","Membuat gambar","Mengedit audio","Mengontrol monitor"],
        correct:0
    },
    {
        id:"batch2-145",
        category:"Teknologi",
        difficulty:"hard",
        question:"CSS property yang umum digunakan untuk mengubah warna teks adalah?",
        answers:["color","font","text-coloring","paint"],
        correct:0
    },
    {
        id:"batch2-146",
        category:"Teknologi",
        difficulty:"hard",
        question:"JavaScript menggunakan operator === untuk?",
        answers:["Perbandingan ketat","Penjumlahan","Pembagian","Penugasan biasa"],
        correct:0
    },
    {
        id:"batch2-147",
        category:"Teknologi",
        difficulty:"hard",
        question:"Struktur data yang menggunakan prinsip FIFO adalah?",
        answers:["Stack","Queue","Tree","Graph"],
        correct:1
    },
    {
        id:"batch2-148",
        category:"Teknologi",
        difficulty:"hard",
        question:"Struktur data yang menggunakan prinsip LIFO adalah?",
        answers:["Queue","Stack","Array","Graph"],
        correct:1
    },
    {
        id:"batch2-149",
        category:"Teknologi",
        difficulty:"hard",
        question:"Dalam pemrograman, bug adalah?",
        answers:["Kesalahan atau masalah pada program","Jenis komputer","Bahasa pemrograman","File gambar"],
        correct:0
    },
    {
        id:"batch2-150",
        category:"Teknologi",
        difficulty:"hard",
        question:"Compiler berfungsi untuk?",
        answers:["Menerjemahkan kode sumber ke bentuk yang dapat dijalankan atau diproses","Mengedit gambar","Menyimpan listrik","Mengukur jaringan"],
        correct:0
    },

    {
        id:"batch2-151",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Dalam kompleksitas algoritma, O(log n) tumbuh lebih lambat daripada?",
        answers:["O(1)","O(n)","Tidak ada","O(0)"],
        correct:1
    },
    {
        id:"batch2-152",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Struktur data yang setiap elemennya dapat memiliki hubungan induk dan anak adalah?",
        answers:["Tree","Queue","Stack","Array"],
        correct:0
    },
    {
        id:"batch2-153",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Dalam jaringan komputer, TCP terkenal karena menyediakan?",
        answers:["Pengiriman data yang andal dan berurutan","Grafik 3D","Penyimpanan file lokal","Pencetakan"],
        correct:0
    },
    {
        id:"batch2-154",
        category:"Teknologi",
        difficulty:"extreme",
        question:"UDP berbeda dari TCP karena UDP umumnya?",
        answers:["Tidak menjamin pengiriman seperti TCP","Selalu lebih lambat","Tidak menggunakan jaringan","Hanya untuk email"],
        correct:0
    },
    {
        id:"batch2-155",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Enkripsi digunakan terutama untuk?",
        answers:["Melindungi kerahasiaan data","Memperbesar file","Menghapus browser","Menambah ukuran monitor"],
        correct:0
    },
    {
        id:"batch2-156",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Fungsi hash kriptografis idealnya menghasilkan?",
        answers:["Nilai ringkas yang sulit dibalik ke data asli","Video otomatis","Alamat rumah","Gambar 3D"],
        correct:0
    },
    {
        id:"batch2-157",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Machine learning merupakan cabang dari?",
        answers:["Kecerdasan buatan","Geologi","Astronomi","Arkeologi"],
        correct:0
    },
    {
        id:"batch2-158",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Model bahasa besar biasanya dilatih menggunakan?",
        answers:["Data dalam jumlah besar","Hanya satu kalimat","Satu gambar saja","Tanpa data"],
        correct:0
    },
    {
        id:"batch2-159",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Git menggunakan branch terutama untuk?",
        answers:["Mengembangkan versi atau jalur perubahan kode secara terpisah","Mengubah ukuran monitor","Menghapus keyboard","Mempercepat internet secara fisik"],
        correct:0
    },
    {
        id:"batch2-160",
        category:"Teknologi",
        difficulty:"extreme",
        question:"Dalam HTML, DOM merupakan representasi?",
        answers:["Struktur dokumen sebagai objek yang dapat dimanipulasi","Kecepatan internet","Jenis database","Sistem operasi"],
        correct:0
    },

    /* ================= BUDAYA DAN PENGETAHUAN UMUM ================= */

    {
        id:"batch2-161",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Bahasa resmi utama Jepang adalah?",
        answers:["Jepang","Korea","Mandarin","Thai"],
        correct:0
    },
    {
        id:"batch2-162",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Tarian tradisional Spanyol yang terkenal adalah?",
        answers:["Flamenco","Kabuki","Haka","Samba"],
        correct:0
    },
    {
        id:"batch2-163",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Samba sangat identik dengan negara?",
        answers:["Brasil","Portugal","Argentina","Chile"],
        correct:0
    },
    {
        id:"batch2-164",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Kabuki merupakan bentuk seni pertunjukan tradisional dari?",
        answers:["Jepang","India","Tiongkok","Korea"],
        correct:0
    },
    {
        id:"batch2-165",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Pizza secara historis sangat terkenal berasal dari?",
        answers:["Italia","Prancis","Jerman","Yunani"],
        correct:0
    },
    {
        id:"batch2-166",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Sushi merupakan makanan yang identik dengan?",
        answers:["Jepang","India","Mesir","Meksiko"],
        correct:0
    },
    {
        id:"batch2-167",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Tango sangat identik dengan Argentina dan?",
        answers:["Uruguay","Kanada","Mesir","Norwegia"],
        correct:0
    },
    {
        id:"batch2-168",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Haka merupakan tarian atau nyanyian tradisional masyarakat Maori di?",
        answers:["Selandia Baru","Australia","Kanada","Fiji"],
        correct:0
    },
    {
        id:"batch2-169",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Kimchi merupakan makanan fermentasi yang terkenal dari?",
        answers:["Korea","Jepang","Vietnam","Thailand"],
        correct:0
    },
    {
        id:"batch2-170",
        category:"Budaya Dunia",
        difficulty:"easy",
        question:"Cokelat secara sejarah berasal dari budaya kuno di wilayah?",
        answers:["Mesoamerika","Skandinavia","Asia Tengah","Australia"],
        correct:0
    },

    {
        id:"batch2-171",
        category:"Pengetahuan Umum",
        difficulty:"medium",
        question:"Mata uang Jepang adalah?",
        answers:["Won","Yen","Yuan","Ringgit"],
        correct:1
    },
    {
        id:"batch2-172",
        category:"Pengetahuan Umum",
        difficulty:"medium",
        question:"Mata uang Inggris adalah?",
        answers:["Euro","Pound sterling","Franc","Krona"],
        correct:1
    },
    {
        id:"batch2-173",
        category:"Pengetahuan Umum",
        difficulty:"medium",
        question:"Mata uang India adalah?",
        answers:["Rupee","Rupiah","Taka","Ringgit"],
        correct:0
    },
    {
        id:"batch2-174",
        category:"Pengetahuan Umum",
        difficulty:"medium",
        question:"Mata uang Korea Selatan adalah?",
        answers:["Yen","Won","Yuan","Baht"],
        correct:1
    },
    {
        id:"batch2-175",
        category:"Pengetahuan Umum",
        difficulty:"medium",
        question:"Benua yang tidak memiliki penduduk tetap dalam jumlah besar adalah?",
        answers:["Antarktika","Eropa","Asia","Afrika"],
        correct:0
    },
    {
        id:"batch2-176",
        category:"Pengetahuan Umum",
        difficulty:"medium",
        question:"Bahasa Spanyol paling banyak digunakan di benua?",
        answers:["Amerika dan Eropa","Asia saja","Australia saja","Antarktika saja"],
        correct:0
    },
    {
        id:"batch2-177",
        category:"Pengetahuan Umum",
        difficulty:"medium",
        question:"UNESCO merupakan badan khusus yang berkaitan dengan pendidikan, ilmu pengetahuan, dan?",
        answers:["Kebudayaan","Olahraga","Perbankan","Militer"],
        correct:0
    },
    {
        id:"batch2-178",
        category:"Pengetahuan Umum",
        difficulty:"medium",
        question:"Palang Merah Internasional berkaitan terutama dengan?",
        answers:["Kemanusiaan","Astronomi","Transportasi","Perdagangan"],
        correct:0
    },
    {
        id:"batch2-179",
        category:"Pengetahuan Umum",
        difficulty:"medium",
        question:"Olimpiade modern pertama diselenggarakan pada tahun?",
        answers:["1896","1900","1912","1920"],
        correct:0
    },
    {
        id:"batch2-180",
        category:"Pengetahuan Umum",
        difficulty:"medium",
        question:"Kota penyelenggara Olimpiade modern pertama adalah?",
        answers:["Paris","Athena","London","Roma"],
        correct:1
    },

    {
        id:"batch2-181",
        category:"Pengetahuan Umum",
        difficulty:"hard",
        question:"Organisasi yang bertanggung jawab atas penetapan standar internasional dikenal sebagai?",
        answers:["ISO","NASA","FIFA","NATO"],
        correct:0
    },
    {
        id:"batch2-182",
        category:"Pengetahuan Umum",
        difficulty:"hard",
        question:"FIFA berkaitan dengan olahraga?",
        answers:["Sepak bola","Tenis","Basket","Renang"],
        correct:0
    },
    {
        id:"batch2-183",
        category:"Pengetahuan Umum",
        difficulty:"hard",
        question:"Nobel Prize pertama kali diberikan pada tahun?",
        answers:["1895","1901","1910","1920"],
        correct:1
    },
    {
        id:"batch2-184",
        category:"Pengetahuan Umum",
        difficulty:"hard",
        question:"Hadiah Nobel dinamai berdasarkan tokoh yang terkenal sebagai penemu?",
        answers:["Dinamit","Telepon","Pesawat","Televisi"],
        correct:0
    },
    {
        id:"batch2-185",
        category:"Pengetahuan Umum",
        difficulty:"hard",
        question:"Samudra yang berada di antara Afrika dan Australia adalah?",
        answers:["Atlantik","Hindia","Pasifik","Arktik"],
        correct:1
    },
    {
        id:"batch2-186",
        category:"Pengetahuan Umum",
        difficulty:"hard",
        question:"Zona waktu Greenwich Mean Time secara historis merujuk pada lokasi?",
        answers:["Greenwich, Inggris","Paris, Prancis","Roma, Italia","Berlin, Jerman"],
        correct:0
    },
    {
        id:"batch2-187",
        category:"Pengetahuan Umum",
        difficulty:"hard",
        question:"Bahasa yang menjadi bahasa resmi Brasil adalah?",
        answers:["Spanyol","Portugis","Prancis","Italia"],
        correct:1
    },
    {
        id:"batch2-188",
        category:"Pengetahuan Umum",
        difficulty:"hard",
        question:"Negara Amerika Selatan yang menggunakan bahasa Belanda sebagai bahasa resmi adalah?",
        answers:["Suriname","Guyana","Ekuador","Uruguay"],
        correct:0
    },
    {
        id:"batch2-189",
        category:"Pengetahuan Umum",
        difficulty:"hard",
        question:"Guyana berada di kawasan?",
        answers:["Amerika Selatan","Eropa","Asia Selatan","Afrika Barat"],
        correct:0
    },
    {
        id:"batch2-190",
        category:"Pengetahuan Umum",
        difficulty:"hard",
        question:"Negara yang memiliki wilayah di dua benua, Eropa dan Asia, adalah?",
        answers:["Turki","Portugal","Mesir","Maroko"],
        correct:0
    },

    {
        id:"batch2-191",
        category:"Pengetahuan Umum",
        difficulty:"extreme",
        question:"Negara yang memiliki tiga ibu kota dalam pembagian fungsi pemerintahan adalah?",
        answers:["Afrika Selatan","Kanada","Australia","Brasil"],
        correct:0
    },
    {
        id:"batch2-192",
        category:"Pengetahuan Umum",
        difficulty:"extreme",
        question:"Tiga ibu kota Afrika Selatan adalah Pretoria, Cape Town, dan?",
        answers:["Bloemfontein","Durban","Johannesburg","Port Elizabeth"],
        correct:0
    },
    {
        id:"batch2-193",
        category:"Pengetahuan Umum",
        difficulty:"extreme",
        question:"Negara yang memiliki jumlah zona waktu paling banyak jika wilayah seberang laut diperhitungkan adalah?",
        answers:["Prancis","Rusia","Amerika Serikat","Tiongkok"],
        correct:0
    },
    {
        id:"batch2-194",
        category:"Pengetahuan Umum",
        difficulty:"extreme",
        question:"Laut Mati terkenal karena?",
        answers:["Kadar garamnya sangat tinggi","Airnya selalu membeku","Tidak memiliki mineral","Merupakan samudra"],
        correct:0
    },
    {
        id:"batch2-195",
        category:"Pengetahuan Umum",
        difficulty:"extreme",
        question:"Palung Mariana berada di Samudra?",
        answers:["Atlantik","Pasifik","Hindia","Arktik"],
        correct:1
    },
    {
        id:"batch2-196",
        category:"Pengetahuan Umum",
        difficulty:"extreme",
        question:"Titik terdalam yang diketahui di lautan dunia berada di?",
        answers:["Challenger Deep","Java Deep","Tonga Deep","Puerto Rico Trench"],
        correct:0
    },
    {
        id:"batch2-197",
        category:"Pengetahuan Umum",
        difficulty:"extreme",
        question:"Negara terkecil di dunia berdasarkan luas wilayah adalah?",
        answers:["Monako","Vatikan","San Marino","Liechtenstein"],
        correct:1
    },
    {
        id:"batch2-198",
        category:"Pengetahuan Umum",
        difficulty:"extreme",
        question:"Negara yang dikenal memiliki bentuk wilayah panjang dan sempit di pesisir barat Amerika Selatan adalah?",
        answers:["Chile","Peru","Ekuador","Kolombia"],
        correct:0
    },
    {
        id:"batch2-199",
        category:"Pengetahuan Umum",
        difficulty:"extreme",
        question:"Garis lintang 0° disebut?",
        answers:["Garis Balik Utara","Khatulistiwa","Garis Balik Selatan","Meridian Utama"],
        correct:1
    },
    {
        id:"batch2-200",
        category:"Pengetahuan Umum",
        difficulty:"extreme",
        question:"Garis bujur 0° secara tradisional disebut?",
        answers:["Meridian Greenwich","Khatulistiwa","Garis Tanggal Internasional","Tropik Capricorn"],
        correct:0
    },/* =====================================================
   BATCH 3 — 200 SOAL TAMBAHAN
===================================================== */

{
    id:"batch3-001",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Brasil adalah?",
    answers:["Rio de Janeiro","Brasilia","São Paulo","Salvador"],
    correct:1
},

{
    id:"batch3-002",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Mesir adalah?",
    answers:["Kairo","Alexandria","Giza","Luxor"],
    correct:0
},

{
    id:"batch3-003",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Korea Selatan adalah?",
    answers:["Busan","Incheon","Seoul","Daegu"],
    correct:2
},

{
    id:"batch3-004",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Thailand adalah?",
    answers:["Phuket","Bangkok","Chiang Mai","Pattaya"],
    correct:1
},

{
    id:"batch3-005",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Vietnam adalah?",
    answers:["Ho Chi Minh City","Da Nang","Hanoi","Hue"],
    correct:2
},

{
    id:"batch3-006",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota India adalah?",
    answers:["Mumbai","New Delhi","Kolkata","Chennai"],
    correct:1
},

{
    id:"batch3-007",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Turki adalah?",
    answers:["Istanbul","Ankara","Izmir","Bursa"],
    correct:1
},

{
    id:"batch3-008",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Italia adalah?",
    answers:["Milan","Venice","Rome","Naples"],
    correct:2
},

{
    id:"batch3-009",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Spanyol adalah?",
    answers:["Barcelona","Madrid","Seville","Valencia"],
    correct:1
},

{
    id:"batch3-010",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Portugal adalah?",
    answers:["Porto","Lisbon","Braga","Faro"],
    correct:1
},

{
    id:"batch3-011",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Yunani adalah?",
    answers:["Athena","Sparta","Thessaloniki","Patras"],
    correct:0
},

{
    id:"batch3-012",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Jerman adalah?",
    answers:["Munich","Hamburg","Berlin","Frankfurt"],
    correct:2
},

{
    id:"batch3-013",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Norwegia adalah?",
    answers:["Oslo","Bergen","Trondheim","Stavanger"],
    correct:0
},

{
    id:"batch3-014",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Swedia adalah?",
    answers:["Gothenburg","Stockholm","Malmo","Uppsala"],
    correct:1
},

{
    id:"batch3-015",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Finlandia adalah?",
    answers:["Helsinki","Turku","Tampere","Espoo"],
    correct:0
},

{
    id:"batch3-016",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Polandia adalah?",
    answers:["Krakow","Warsawa","Gdansk","Wroclaw"],
    correct:1
},

{
    id:"batch3-017",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Austria adalah?",
    answers:["Salzburg","Vienna","Graz","Linz"],
    correct:1
},

{
    id:"batch3-018",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Swiss adalah?",
    answers:["Zurich","Geneva","Bern","Basel"],
    correct:2
},

{
    id:"batch3-019",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Argentina adalah?",
    answers:["Buenos Aires","Cordoba","Rosario","Mendoza"],
    correct:0
},

{
    id:"batch3-020",
    category:"Geografi Dunia",
    difficulty:"easy",
    question:"Ibu kota Chile adalah?",
    answers:["Valparaiso","Santiago","Concepcion","Antofagasta"],
    correct:1
},

{
    id:"batch3-021",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Ibu kota Mongolia adalah?",
    answers:["Astana","Ulaanbaatar","Bishkek","Tashkent"],
    correct:1
},

{
    id:"batch3-022",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Ibu kota Kazakhstan adalah?",
    answers:["Almaty","Astana","Shymkent","Aktobe"],
    correct:1
},

{
    id:"batch3-023",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Ibu kota Uzbekistan adalah?",
    answers:["Samarkand","Tashkent","Bukhara","Khiva"],
    correct:1
},

{
    id:"batch3-024",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Ibu kota Nepal adalah?",
    answers:["Kathmandu","Pokhara","Lalitpur","Biratnagar"],
    correct:0
},

{
    id:"batch3-025",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Ibu kota Bhutan adalah?",
    answers:["Thimphu","Paro","Punakha","Phuntsholing"],
    correct:0
},

{
    id:"batch3-026",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Ibu kota Laos adalah?",
    answers:["Vientiane","Luang Prabang","Pakse","Savannakhet"],
    correct:0
},

{
    id:"batch3-027",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Ibu kota Kamboja adalah?",
    answers:["Siem Reap","Phnom Penh","Battambang","Kampot"],
    correct:1
},

{
    id:"batch3-028",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Ibu kota Myanmar adalah?",
    answers:["Yangon","Mandalay","Naypyidaw","Bagan"],
    correct:2
},

{
    id:"batch3-029",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Ibu kota Filipina adalah?",
    answers:["Cebu","Davao","Manila","Quezon City"],
    correct:2
},

{
    id:"batch3-030",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Ibu kota Selandia Baru adalah?",
    answers:["Auckland","Christchurch","Wellington","Hamilton"],
    correct:2
},

{
    id:"batch3-031",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Sungai terpanjang di Eropa adalah?",
    answers:["Danube","Volga","Rhine","Seine"],
    correct:1
},

{
    id:"batch3-032",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Gurun Sahara berada di benua?",
    answers:["Asia","Afrika","Australia","Amerika Selatan"],
    correct:1
},

{
    id:"batch3-033",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Danau terbesar berdasarkan luas permukaan adalah?",
    answers:["Danau Superior","Laut Kaspia","Danau Victoria","Danau Baikal"],
    correct:1
},

{
    id:"batch3-034",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Pulau terbesar di dunia adalah?",
    answers:["Madagaskar","Greenland","Borneo","Papua"],
    correct:1
},

{
    id:"batch3-035",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Pegunungan Andes terutama membentang di benua?",
    answers:["Afrika","Asia","Amerika Selatan","Eropa"],
    correct:2
},

{
    id:"batch3-036",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Terusan Panama menghubungkan Samudra Atlantik dengan?",
    answers:["Samudra Hindia","Samudra Pasifik","Laut Mediterania","Laut Merah"],
    correct:1
},

{
    id:"batch3-037",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Selat yang memisahkan Eropa dan Afrika di dekat Spanyol adalah?",
    answers:["Selat Gibraltar","Selat Bering","Selat Malaka","Selat Bosporus"],
    correct:0
},

{
    id:"batch3-038",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Gunung Kilimanjaro berada di negara?",
    answers:["Kenya","Tanzania","Uganda","Ethiopia"],
    correct:1
},

{
    id:"batch3-039",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Air Terjun Victoria berada di perbatasan Zambia dengan?",
    answers:["Zimbabwe","Namibia","Botswana","Mozambik"],
    correct:0
},

{
    id:"batch3-040",
    category:"Geografi Dunia",
    difficulty:"medium",
    question:"Sungai Amazon terutama mengalir di negara?",
    answers:["Brasil","Argentina","Chile","Peru"],
    correct:0
},

{
    id:"batch3-041",
    category:"Sejarah Dunia",
    difficulty:"easy",
    question:"Peradaban Mesir Kuno berkembang di sepanjang sungai?",
    answers:["Amazon","Nil","Gangga","Yangtze"],
    correct:1
},

{
    id:"batch3-042",
    category:"Sejarah Dunia",
    difficulty:"easy",
    question:"Colosseum terkenal sebagai peninggalan peradaban?",
    answers:["Romawi","Mesir","Maya","Persia"],
    correct:0
},

{
    id:"batch3-043",
    category:"Sejarah Dunia",
    difficulty:"easy",
    question:"Piramida Giza berada di negara?",
    answers:["Mesir","Sudan","Libya","Tunisia"],
    correct:0
},

{
    id:"batch3-044",
    category:"Sejarah Dunia",
    difficulty:"easy",
    question:"Tembok Besar merupakan peninggalan terkenal dari?",
    answers:["Jepang","Tiongkok","Korea","Mongolia"],
    correct:1
},

{
    id:"batch3-045",
    category:"Sejarah Dunia",
    difficulty:"easy",
    question:"Olimpiade kuno berasal dari?",
    answers:["Yunani","Italia","Mesir","Turki"],
    correct:0
},

{
    id:"batch3-046",
    category:"Sejarah Dunia",
    difficulty:"easy",
    question:"Kapal Titanic tenggelam pada tahun?",
    answers:["1905","1912","1918","1920"],
    correct:1
},

{
    id:"batch3-047",
    category:"Sejarah Dunia",
    difficulty:"easy",
    question:"Christopher Columbus terkenal karena pelayarannya menuju?",
    answers:["Amerika","Australia","Antarktika","India"],
    correct:0
},

{
    id:"batch3-048",
    category:"Sejarah Dunia",
    difficulty:"easy",
    question:"Machu Picchu berkaitan dengan peradaban?",
    answers:["Inca","Romawi","Mesir","Aztec"],
    correct:0
},

{
    id:"batch3-049",
    category:"Sejarah Dunia",
    difficulty:"easy",
    question:"Stonehenge berada di negara?",
    answers:["Inggris","Prancis","Jerman","Irlandia"],
    correct:0
},

{
    id:"batch3-050",
    category:"Sejarah Dunia",
    difficulty:"easy",
    question:"Peradaban Aztec berkembang di wilayah yang sekarang menjadi?",
    answers:["Meksiko","Brasil","Kanada","Argentina"],
    correct:0
},

{
    id:"batch3-051",
    category:"Sejarah Dunia",
    difficulty:"medium",
    question:"Kota Pompeii terkubur akibat letusan gunung?",
    answers:["Vesuvius","Etna","Olympus","Fuji"],
    correct:0
},

{
    id:"batch3-052",
    category:"Sejarah Dunia",
    difficulty:"medium",
    question:"Jalur perdagangan kuno yang menghubungkan Asia dan Eropa dikenal sebagai?",
    answers:["Jalur Sutra","Jalur Emas","Jalur Rempah Utara","Jalur Timur"],
    correct:0
},

{
    id:"batch3-053",
    category:"Sejarah Dunia",
    difficulty:"medium",
    question:"Kekaisaran Ottoman berpusat di wilayah yang sekarang terutama merupakan?",
    answers:["Turki","Spanyol","India","Mesir"],
    correct:0
},

{
    id:"batch3-054",
    category:"Sejarah Dunia",
    difficulty:"medium",
    question:"Joan of Arc berasal dari?",
    answers:["Prancis","Inggris","Italia","Jerman"],
    correct:0
},

{
    id:"batch3-055",
    category:"Sejarah Dunia",
    difficulty:"medium",
    question:"Revolusi Industri pertama kali berkembang pesat di?",
    answers:["Inggris","Jepang","Brasil","Mesir"],
    correct:0
},

{
    id:"batch3-056",
    category:"Sejarah Dunia",
    difficulty:"medium",
    question:"Deklarasi Kemerdekaan Amerika Serikat diumumkan pada tahun?",
    answers:["1776","1789","1804","1812"],
    correct:0
},

{
    id:"batch3-057",
    category:"Sejarah Dunia",
    difficulty:"medium",
    question:"Tembok Berlin runtuh pada tahun?",
    answers:["1985","1987","1989","1991"],
    correct:2
},

{
    id:"batch3-058",
    category:"Sejarah Dunia",
    difficulty:"medium",
    question:"Nelson Mandela menjadi presiden Afrika Selatan pada tahun?",
    answers:["1990","1994","1998","2000"],
    correct:1
},

{
    id:"batch3-059",
    category:"Sejarah Dunia",
    difficulty:"medium",
    question:"Kapal Mayflower terkenal dalam sejarah awal kolonisasi?",
    answers:["Amerika Utara","Australia","Afrika Selatan","India"],
    correct:0
},

{
    id:"batch3-060",
    category:"Sejarah Dunia",
    difficulty:"medium",
    question:"Dinasti yang terkenal membangun sebagian besar struktur Tembok Besar Tiongkok yang masih terlihat sekarang adalah?",
    answers:["Han","Ming","Tang","Song"],
    correct:1
},

{
    id:"batch3-061",
    category:"Sains",
    difficulty:"easy",
    question:"Planet yang kita tinggali adalah?",
    answers:["Mars","Venus","Bumi","Jupiter"],
    correct:2
},

{
    id:"batch3-062",
    category:"Sains",
    difficulty:"easy",
    question:"Air membeku pada suhu berapa dalam skala Celsius pada tekanan standar?",
    answers:["0°C","10°C","50°C","100°C"],
    correct:0
},

{
    id:"batch3-063",
    category:"Sains",
    difficulty:"easy",
    question:"Air mendidih pada suhu berapa dalam skala Celsius pada tekanan standar?",
    answers:["50°C","75°C","100°C","120°C"],
    correct:2
},

{
    id:"batch3-064",
    category:"Sains",
    difficulty:"easy",
    question:"Gas yang dibutuhkan manusia untuk respirasi adalah?",
    answers:["Nitrogen","Oksigen","Helium","Karbon dioksida"],
    correct:1
},

{
    id:"batch3-065",
    category:"Sains",
    difficulty:"easy",
    question:"Pusat tata surya kita adalah?",
    answers:["Bumi","Bulan","Matahari","Jupiter"],
    correct:2
},

{
    id:"batch3-066",
    category:"Sains",
    difficulty:"easy",
    question:"Satuan dasar waktu dalam SI adalah?",
    answers:["menit","jam","detik","hari"],
    correct:2
},

{
    id:"batch3-067",
    category:"Sains",
    difficulty:"easy",
    question:"Bagian tubuh manusia yang digunakan terutama untuk bernapas adalah?",
    answers:["Paru-paru","Lambung","Ginjal","Usus"],
    correct:0
},

{
    id:"batch3-068",
    category:"Sains",
    difficulty:"easy",
    question:"Organ yang berfungsi menyaring darah dan menghasilkan urine adalah?",
    answers:["Jantung","Ginjal","Paru-paru","Lambung"],
    correct:1
},

{
    id:"batch3-069",
    category:"Sains",
    difficulty:"easy",
    question:"Tulang yang melindungi otak adalah?",
    answers:["Tulang rusuk","Tengkorak","Tulang paha","Tulang belakang"],
    correct:1
},

{
    id:"batch3-070",
    category:"Sains",
    difficulty:"easy",
    question:"Vitamin yang banyak dibentuk tubuh dengan bantuan sinar matahari adalah?",
    answers:["Vitamin A","Vitamin B","Vitamin C","Vitamin D"],
    correct:3
},

{
    id:"batch3-071",
    category:"Sains",
    difficulty:"medium",
    question:"Proses tumbuhan mengubah energi cahaya menjadi energi kimia disebut?",
    answers:["Respirasi","Fotosintesis","Fermentasi","Transpirasi"],
    correct:1
},

{
    id:"batch3-072",
    category:"Sains",
    difficulty:"medium",
    question:"DNA terutama terdapat di bagian sel yang disebut?",
    answers:["Inti sel","Dinding sel","Ribosom","Vakuola"],
    correct:0
},

{
    id:"batch3-073",
    category:"Sains",
    difficulty:"medium",
    question:"Zat yang memiliki pH kurang dari 7 umumnya bersifat?",
    answers:["Asam","Basa","Netral","Logam"],
    correct:0
},

{
    id:"batch3-074",
    category:"Sains",
    difficulty:"medium",
    question:"Gaya yang menyebabkan benda jatuh ke permukaan Bumi adalah?",
    answers:["Magnet","Gravitasi","Gesek","Listrik"],
    correct:1
},

{
    id:"batch3-075",
    category:"Sains",
    difficulty:"medium",
    question:"Perubahan wujud dari cair menjadi gas disebut?",
    answers:["Membeku","Menguap","Mengembun","Menyublim"],
    correct:1
},

{
    id:"batch3-076",
    category:"Sains",
    difficulty:"medium",
    question:"Perubahan wujud dari gas menjadi cair disebut?",
    answers:["Menguap","Mencair","Mengembun","Membeku"],
    correct:2
},

{
    id:"batch3-077",
    category:"Sains",
    difficulty:"medium",
    question:"Bagian darah yang berfungsi mengangkut oksigen terutama adalah?",
    answers:["Sel darah merah","Plasma","Trombosit","Sel darah putih"],
    correct:0
},

{
    id:"batch3-078",
    category:"Sains",
    difficulty:"medium",
    question:"Sel darah putih terutama berperan dalam?",
    answers:["Pertahanan tubuh","Membawa oksigen","Pembekuan darah","Menghasilkan tulang"],
    correct:0
},

{
    id:"batch3-079",
    category:"Sains",
    difficulty:"medium",
    question:"Alat untuk mengukur suhu disebut?",
    answers:["Barometer","Termometer","Higrometer","Anemometer"],
    correct:1
},

{
    id:"batch3-080",
    category:"Sains",
    difficulty:"medium",
    question:"Alat untuk mengukur tekanan atmosfer disebut?",
    answers:["Barometer","Termometer","Speedometer","Voltmeter"],
    correct:0
},

{
    id:"batch3-081",
    category:"Fisika",
    difficulty:"hard",
    question:"Rumus yang benar untuk kecepatan adalah?",
    answers:["jarak × waktu","jarak ÷ waktu","waktu ÷ jarak","massa ÷ volume"],
    correct:1
},

{
    id:"batch3-082",
    category:"Fisika",
    difficulty:"hard",
    question:"Satuan SI untuk daya adalah?",
    answers:["Joule","Watt","Newton","Pascal"],
    correct:1
},

{
    id:"batch3-083",
    category:"Fisika",
    difficulty:"hard",
    question:"Satuan SI untuk tekanan adalah?",
    answers:["Pascal","Joule","Watt","Tesla"],
    correct:0
},

{
    id:"batch3-084",
    category:"Fisika",
    difficulty:"hard",
    question:"Satuan SI untuk arus listrik adalah?",
    answers:["Volt","Ohm","Ampere","Watt"],
    correct:2
},

{
    id:"batch3-085",
    category:"Fisika",
    difficulty:"hard",
    question:"Satuan SI untuk hambatan listrik adalah?",
    answers:["Volt","Ohm","Ampere","Coulomb"],
    correct:1
},

{
    id:"batch3-086",
    category:"Kimia",
    difficulty:"hard",
    question:"Simbol kimia untuk emas adalah?",
    answers:["Ag","Au","Fe","Gd"],
    correct:1
},

{
    id:"batch3-087",
    category:"Kimia",
    difficulty:"hard",
    question:"Simbol kimia untuk perak adalah?",
    answers:["Ag","Au","Al","Ar"],
    correct:0
},

{
    id:"batch3-088",
    category:"Kimia",
    difficulty:"hard",
    question:"Simbol kimia untuk natrium adalah?",
    answers:["N","Na","Ni","Ne"],
    correct:1
},

{
    id:"batch3-089",
    category:"Kimia",
    difficulty:"hard",
    question:"Gas yang digunakan tumbuhan dalam fotosintesis adalah?",
    answers:["Oksigen","Karbon dioksida","Helium","Hidrogen"],
    correct:1
},

{
    id:"batch3-090",
    category:"Kimia",
    difficulty:"hard",
    question:"Unsur dengan simbol K adalah?",
    answers:["Kalsium","Kalium","Kobalt","Kripton"],
    correct:1
},

{
    id:"batch3-091",
    category:"Biologi",
    difficulty:"hard",
    question:"Organel yang berfungsi membuat protein adalah?",
    answers:["Ribosom","Mitokondria","Lisosom","Sentriol"],
    correct:0
},

{
    id:"batch3-092",
    category:"Biologi",
    difficulty:"hard",
    question:"Materi genetik berbentuk DNA dikemas dalam struktur yang disebut?",
    answers:["Kromosom","Ribosom","Enzim","Membran"],
    correct:0
},

{
    id:"batch3-093",
    category:"Biologi",
    difficulty:"hard",
    question:"Pembelahan sel yang menghasilkan dua sel anak identik disebut?",
    answers:["Meiosis","Mitosis","Fertilisasi","Mutasi"],
    correct:1
},

{
    id:"batch3-094",
    category:"Biologi",
    difficulty:"hard",
    question:"Organ terbesar pada tubuh manusia adalah?",
    answers:["Jantung","Kulit","Hati","Paru-paru"],
    correct:1
},

{
    id:"batch3-095",
    category:"Biologi",
    difficulty:"hard",
    question:"Bagian bunga yang menghasilkan serbuk sari adalah?",
    answers:["Putik","Benang sari","Kelopak","Mahkota"],
    correct:1
},

{
    id:"batch3-096",
    category:"Astronomi",
    difficulty:"hard",
    question:"Planet yang memiliki rotasi tercepat di Tata Surya adalah?",
    answers:["Bumi","Jupiter","Mars","Saturnus"],
    correct:1
},

{
    id:"batch3-097",
    category:"Astronomi",
    difficulty:"hard",
    question:"Planet yang memiliki kemiringan sumbu sangat ekstrem sehingga tampak berputar menyamping adalah?",
    answers:["Uranus","Mars","Venus","Neptunus"],
    correct:0
},

{
    id:"batch3-098",
    category:"Astronomi",
    difficulty:"hard",
    question:"Planet yang memiliki hari lebih panjang daripada tahunnya adalah?",
    answers:["Venus","Mars","Jupiter","Bumi"],
    correct:0
},

{
    id:"batch3-099",
    category:"Astronomi",
    difficulty:"hard",
    question:"Bintang terdekat dengan Matahari adalah?",
    answers:["Sirius","Proxima Centauri","Betelgeuse","Vega"],
    correct:1
},

{
    id:"batch3-100",
    category:"Astronomi",
    difficulty:"hard",
    question:"Galaksi Andromeda dikenal juga dengan kode?",
    answers:["M31","M42","M87","M13"],
    correct:0
},

{
    id:"batch3-101",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Negara yang memiliki wilayah daratan terbesar di dunia adalah?",
    answers:["Kanada","Tiongkok","Rusia","Amerika Serikat"],
    correct:2
},

{
    id:"batch3-102",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Negara dengan jumlah pulau yang sangat banyak dan dikenal sebagai negara kepulauan terbesar di dunia adalah?",
    answers:["Indonesia","Jepang","Filipina","Maladewa"],
    correct:0
},

{
    id:"batch3-103",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Negara yang berbatasan darat dengan Portugal adalah?",
    answers:["Prancis","Spanyol","Italia","Maroko"],
    correct:1
},

{
    id:"batch3-104",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Negara yang tidak memiliki garis pantai disebut negara?",
    answers:["Kepulauan","Terisolasi","Terjepit daratan","Maritim"],
    correct:2
},

{
    id:"batch3-105",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Benua yang tidak memiliki penduduk tetap dalam jumlah besar dan didominasi penelitian ilmiah adalah?",
    answers:["Antarktika","Eropa","Afrika","Australia"],
    correct:0
},

{
    id:"batch3-106",
    category:"Geografi Dunia",
    difficulty:"extreme",
    question:"Ibu kota Bhutan berada di lembah sungai?",
    answers:["Wang Chuu","Nil","Amazon","Danube"],
    correct:0
},

{
    id:"batch3-107",
    category:"Geografi Dunia",
    difficulty:"extreme",
    question:"Selat Bosporus memisahkan bagian Eropa dan Asia dari negara?",
    answers:["Turki","Yunani","Mesir","Italia"],
    correct:0
},

{
    id:"batch3-108",
    category:"Geografi Dunia",
    difficulty:"extreme",
    question:"Danau Baikal terkenal sebagai danau air tawar terdalam di dunia. Danau ini berada di?",
    answers:["Rusia","Kanada","Mongolia","Kazakhstan"],
    correct:0
},

{
    id:"batch3-109",
    category:"Geografi Dunia",
    difficulty:"extreme",
    question:"Gurun Gobi berada terutama di Mongolia dan?",
    answers:["Tiongkok","India","Iran","Pakistan"],
    correct:0
},

{
    id:"batch3-110",
    category:"Geografi Dunia",
    difficulty:"extreme",
    question:"Pegunungan Himalaya terbentuk terutama akibat tumbukan lempeng India dengan lempeng?",
    answers:["Afrika","Eurasia","Pasifik","Antarktika"],
    correct:1
},

{
    id:"batch3-111",
    category:"Sejarah Dunia",
    difficulty:"extreme",
    question:"Kota kuno Machu Picchu dibangun oleh peradaban?",
    answers:["Inca","Maya","Aztec","Olmec"],
    correct:0
},

{
    id:"batch3-112",
    category:"Sejarah Dunia",
    difficulty:"extreme",
    question:"Tulisan paku atau cuneiform berkembang pada peradaban?",
    answers:["Sumeria","Romawi","Viking","Inca"],
    correct:0
},

{
    id:"batch3-113",
    category:"Sejarah Dunia",
    difficulty:"extreme",
    question:"Demokrasi langsung berkembang terkenal di kota kuno?",
    answers:["Athena","Sparta","Roma","Kartago"],
    correct:0
},

{
    id:"batch3-114",
    category:"Sejarah Dunia",
    difficulty:"extreme",
    question:"Hukum Hammurabi berasal dari peradaban?",
    answers:["Babilonia","Mesir","Romawi","Yunani"],
    correct:0
},

{
    id:"batch3-115",
    category:"Sejarah Dunia",
    difficulty:"extreme",
    question:"Kaisar Romawi yang terkenal mengadopsi agama Kristen pada abad ke-4 adalah?",
    answers:["Konstantinus Agung","Nero","Augustus","Trajan"],
    correct:0
},

{
    id:"batch3-116",
    category:"Sejarah Dunia",
    difficulty:"extreme",
    question:"Perpustakaan kuno yang terkenal berada di kota?",
    answers:["Alexandria","Athena","Sparta","Pompeii"],
    correct:0
},

{
    id:"batch3-117",
    category:"Sejarah Dunia",
    difficulty:"extreme",
    question:"Kota Timbuktu secara historis merupakan pusat ilmu pengetahuan di wilayah?",
    answers:["Afrika Barat","Eropa Timur","Asia Selatan","Amerika Tengah"],
    correct:0
},

{
    id:"batch3-118",
    category:"Sejarah Dunia",
    difficulty:"extreme",
    question:"Kekaisaran Mali terkenal dipimpin oleh penguasa bernama?",
    answers:["Mansa Musa","Ramses II","Sargon","Cyrus"],
    correct:0
},

{
    id:"batch3-119",
    category:"Sejarah Dunia",
    difficulty:"extreme",
    question:"Peradaban Maya berkembang terutama di wilayah Mesoamerika yang mencakup bagian dari?",
    answers:["Meksiko dan Amerika Tengah","India dan Nepal","Mesir dan Sudan","Italia dan Yunani"],
    correct:0
},

{
    id:"batch3-120",
    category:"Sejarah Dunia",
    difficulty:"extreme",
    question:"Bahasa Latin menjadi bahasa penting dalam sejarah Kekaisaran?",
    answers:["Romawi","Mongol","Mali","Aztec"],
    correct:0
},

{
    id:"batch3-121",
    category:"Teknologi",
    difficulty:"easy",
    question:"Perangkat yang digunakan untuk mengetik huruf pada komputer adalah?",
    answers:["Keyboard","Monitor","Printer","Speaker"],
    correct:0
},

{
    id:"batch3-122",
    category:"Teknologi",
    difficulty:"easy",
    question:"Perangkat yang digunakan untuk menampilkan gambar dari komputer adalah?",
    answers:["Monitor","Keyboard","Router","Mikrofon"],
    correct:0
},

{
    id:"batch3-123",
    category:"Teknologi",
    difficulty:"easy",
    question:"Sistem operasi yang dikembangkan oleh Microsoft adalah?",
    answers:["Windows","Android","Linux","iOS"],
    correct:0
},

{
    id:"batch3-124",
    category:"Teknologi",
    difficulty:"easy",
    question:"Perangkat yang mengubah dokumen digital menjadi cetakan disebut?",
    answers:["Scanner","Printer","Router","Modem"],
    correct:1
},

{
    id:"batch3-125",
    category:"Teknologi",
    difficulty:"easy",
    question:"Perangkat yang digunakan untuk mengambil gambar digital disebut?",
    answers:["Kamera","Router","Speaker","Keyboard"],
    correct:0
},

{
    id:"batch3-126",
    category:"Teknologi",
    difficulty:"medium",
    question:"Apa kepanjangan dari HTTP?",
    answers:[
        "HyperText Transfer Protocol",
        "HighText Transmission Program",
        "Hyperlink Transfer Process",
        "Host Transfer Text Protocol"
    ],
    correct:0
},

{
    id:"batch3-127",
    category:"Teknologi",
    difficulty:"medium",
    question:"Apa kepanjangan dari RAM?",
    answers:[
        "Random Access Memory",
        "Rapid Access Machine",
        "Read Access Module",
        "Random Application Memory"
    ],
    correct:0
},

{
    id:"batch3-128",
    category:"Teknologi",
    difficulty:"medium",
    question:"Apa kepanjangan dari USB?",
    answers:[
        "Universal Serial Bus",
        "Universal System Board",
        "User Serial Base",
        "Unified Storage Bus"
    ],
    correct:0
},

{
    id:"batch3-129",
    category:"Teknologi",
    difficulty:"medium",
    question:"Bahasa pemrograman yang umum digunakan untuk membuat struktur halaman web adalah?",
    answers:["HTML","CSS","SQL","Python"],
    correct:0
},

{
    id:"batch3-130",
    category:"Teknologi",
    difficulty:"medium",
    question:"Bahasa yang umum digunakan untuk mengatur tampilan halaman web adalah?",
    answers:["CSS","HTML","SQL","C"],
    correct:0
},

{
    id:"batch3-131",
    category:"Teknologi",
    difficulty:"hard",
    question:"Dalam JavaScript, kata kunci untuk mendeklarasikan variabel yang nilainya dapat diubah adalah?",
    answers:["let","const","fixed","static"],
    correct:0
},

{
    id:"batch3-132",
    category:"Teknologi",
    difficulty:"hard",
    question:"Dalam JavaScript, kata kunci const digunakan untuk?",
    answers:[
        "Mendeklarasikan binding yang tidak dapat di-reassign",
        "Membuat fungsi otomatis",
        "Menghapus variabel",
        "Membuat database"
    ],
    correct:0
},

{
    id:"batch3-133",
    category:"Teknologi",
    difficulty:"hard",
    question:"Format data yang sering digunakan untuk pertukaran data antara server dan aplikasi web adalah?",
    answers:["JSON","PNG","MP3","JPEG"],
    correct:0
},

{
    id:"batch3-134",
    category:"Teknologi",
    difficulty:"hard",
    question:"Database yang menggunakan tabel, baris, dan kolom disebut?",
    answers:["Relasional","Grafis","Audio","Linear"],
    correct:0
},

{
    id:"batch3-135",
    category:"Teknologi",
    difficulty:"hard",
    question:"Alamat IP digunakan terutama untuk?",
    answers:[
        "Mengidentifikasi perangkat atau antarmuka dalam jaringan",
        "Mengukur suhu komputer",
        "Menyimpan gambar",
        "Mengatur volume suara"
    ],
    correct:0
},

{
    id:"batch3-136",
    category:"Bahasa Indonesia",
    difficulty:"easy",
    question:"Lawan kata 'panjang' adalah?",
    answers:["besar","pendek","tinggi","lebar"],
    correct:1
},

{
    id:"batch3-137",
    category:"Bahasa Indonesia",
    difficulty:"easy",
    question:"Sinonim kata 'bahagia' adalah?",
    answers:["sedih","gembira","marah","takut"],
    correct:1
},

{
    id:"batch3-138",
    category:"Bahasa Indonesia",
    difficulty:"easy",
    question:"Kata tanya untuk menanyakan tempat adalah?",
    answers:["Siapa","Kapan","Di mana","Mengapa"],
    correct:2
},

{
    id:"batch3-139",
    category:"Bahasa Indonesia",
    difficulty:"easy",
    question:"Kata tanya untuk menanyakan waktu adalah?",
    answers:["Kapan","Siapa","Bagaimana","Di mana"],
    correct:0
},

{
    id:"batch3-140",
    category:"Bahasa Indonesia",
    difficulty:"easy",
    question:"Kata tanya untuk menanyakan alasan adalah?",
    answers:["Apa","Mengapa","Siapa","Kapan"],
    correct:1
},

{
    id:"batch3-141",
    category:"Bahasa Indonesia",
    difficulty:"medium",
    question:"Antonim kata 'optimis' adalah?",
    answers:["Realistis","Pesimis","Aktif","Kreatif"],
    correct:1
},

{
    id:"batch3-142",
    category:"Bahasa Indonesia",
    difficulty:"medium",
    question:"Kalimat yang berisi ajakan disebut kalimat?",
    answers:["Imperatif","Persuasif","Interogatif","Deklaratif"],
    correct:1
},

{
    id:"batch3-143",
    category:"Bahasa Indonesia",
    difficulty:"medium",
    question:"Kata baku yang benar adalah?",
    answers:["praktik","praktek","praktekkan","praktiek"],
    correct:0
},

{
    id:"batch3-144",
    category:"Bahasa Indonesia",
    difficulty:"medium",
    question:"Kata baku yang benar adalah?",
    answers:["aktifitas","aktivitas","aktifvitas","aktipitas"],
    correct:1
},

{
    id:"batch3-145",
    category:"Bahasa Indonesia",
    difficulty:"medium",
    question:"Gagasan yang menjadi dasar pembahasan sebuah paragraf disebut?",
    answers:["Ide pokok","Kata sambung","Amanat","Ilustrasi"],
    correct:0
},

{
    id:"batch3-146",
    category:"Bahasa Inggris",
    difficulty:"easy",
    question:"What is the opposite of 'big'?",
    answers:["small","long","high","wide"],
    correct:0
},

{
    id:"batch3-147",
    category:"Bahasa Inggris",
    difficulty:"easy",
    question:"What is the past tense of 'eat'?",
    answers:["eated","ate","eaten","eating"],
    correct:1
},

{
    id:"batch3-148",
    category:"Bahasa Inggris",
    difficulty:"easy",
    question:"What is the plural form of 'child'?",
    answers:["childs","children","childes","childrens"],
    correct:1
},

{
    id:"batch3-149",
    category:"Bahasa Inggris",
    difficulty:"easy",
    question:"Which word means 'rumah'?",
    answers:["house","horse","mouse","hope"],
    correct:0
},

{
    id:"batch3-150",
    category:"Bahasa Inggris",
    difficulty:"easy",
    question:"Which word means 'air'?",
    answers:["fire","water","earth","wind"],
    correct:1
},

{
    id:"batch3-151",
    category:"Bahasa Inggris",
    difficulty:"medium",
    question:"Choose the correct sentence.",
    answers:[
        "They is students.",
        "They are students.",
        "They am students.",
        "They be students."
    ],
    correct:1
},

{
    id:"batch3-152",
    category:"Bahasa Inggris",
    difficulty:"medium",
    question:"What is the comparative form of 'good'?",
    answers:["gooder","better","best","more good"],
    correct:1
},

{
    id:"batch3-153",
    category:"Bahasa Inggris",
    difficulty:"medium",
    question:"What is the superlative form of 'bad'?",
    answers:["badder","worse","worst","most bad"],
    correct:2
},

{
    id:"batch3-154",
    category:"Bahasa Inggris",
    difficulty:"medium",
    question:"Which word is a noun?",
    answers:["beautiful","quickly","teacher","run"],
    correct:2
},

{
    id:"batch3-155",
    category:"Bahasa Inggris",
    difficulty:"medium",
    question:"Which word is a verb?",
    answers:["happiness","run","beautiful","quickly"],
    correct:1
},

{
    id:"batch3-156",
    category:"Budaya Dunia",
    difficulty:"hard",
    question:"Sushi merupakan makanan yang berasal dari?",
    answers:["Jepang","Korea Selatan","Tiongkok","Thailand"],
    correct:0
},

{
    id:"batch3-157",
    category:"Budaya Dunia",
    difficulty:"hard",
    question:"Pizza secara tradisional sangat terkait dengan negara?",
    answers:["Italia","Spanyol","Portugal","Yunani"],
    correct:0
},

{
    id:"batch3-158",
    category:"Budaya Dunia",
    difficulty:"hard",
    question:"Tari flamenco sangat identik dengan?",
    answers:["Spanyol","Prancis","Italia","Brasil"],
    correct:0
},

{
    id:"batch3-159",
    category:"Budaya Dunia",
    difficulty:"hard",
    question:"Tari tango sangat terkenal berasal dari kawasan?",
    answers:["Argentina dan Uruguay","India dan Nepal","Mesir dan Sudan","Jepang dan Korea"],
    correct:0
},

{
    id:"batch3-160",
    category:"Budaya Dunia",
    difficulty:"hard",
    question:"Kimchi merupakan makanan yang sangat terkait dengan?",
    answers:["Korea","Italia","Meksiko","Mesir"],
    correct:0
},

{
    id:"batch3-161",
    category:"Budaya Dunia",
    difficulty:"hard",
    question:"Festival Holi sangat terkenal di?",
    answers:["India","Jepang","Kanada","Norwegia"],
    correct:0
},

{
    id:"batch3-162",
    category:"Budaya Dunia",
    difficulty:"hard",
    question:"Oktoberfest terkenal diselenggarakan di?",
    answers:["Munich","Paris","Roma","Madrid"],
    correct:0
},

{
    id:"batch3-163",
    category:"Budaya Dunia",
    difficulty:"hard",
    question:"Kabuki merupakan bentuk seni pertunjukan tradisional dari?",
    answers:["Jepang","Tiongkok","India","Thailand"],
    correct:0
},

{
    id:"batch3-164",
    category:"Budaya Dunia",
    difficulty:"hard",
    question:"Wayang kulit sangat dikenal sebagai bagian dari budaya?",
    answers:["Indonesia","Kanada","Mesir","Argentina"],
    correct:0
},

{
    id:"batch3-165",
    category:"Budaya Dunia",
    difficulty:"hard",
    question:"Reggae berkembang terkenal dari negara?",
    answers:["Jamaika","Brasil","Spanyol","Portugal"],
    correct:0
},

{
    id:"batch3-166",
    category:"Olahraga",
    difficulty:"easy",
    question:"Jumlah pemain dalam satu tim sepak bola di lapangan adalah?",
    answers:["9","10","11","12"],
    correct:2
},

{
    id:"batch3-167",
    category:"Olahraga",
    difficulty:"easy",
    question:"Olahraga yang menggunakan raket dan kok disebut?",
    answers:["Tenis","Bulu tangkis","Golf","Baseball"],
    correct:1
},

{
    id:"batch3-168",
    category:"Olahraga",
    difficulty:"easy",
    question:"Olahraga yang menggunakan bola berbentuk oval dan gawang berbentuk H adalah?",
    answers:["Rugbi","Tenis","Golf","Hoki"],
    correct:0
},

{
    id:"batch3-169",
    category:"Olahraga",
    difficulty:"easy",
    question:"Dalam bola basket, satu tembakan bebas bernilai?",
    answers:["1 poin","2 poin","3 poin","4 poin"],
    correct:0
},

{
    id:"batch3-170",
    category:"Olahraga",
    difficulty:"easy",
    question:"Olahraga yang menggunakan papan dan ombak adalah?",
    answers:["Selancar","Panahan","Anggar","Polo"],
    correct:0
},

{
    id:"batch3-171",
    category:"Olahraga",
    difficulty:"medium",
    question:"Dalam tenis, skor nol disebut?",
    answers:["Love","Nil","Zero","Blank"],
    correct:0
},

{
    id:"batch3-172",
    category:"Olahraga",
    difficulty:"medium",
    question:"Turnamen tenis Wimbledon dimainkan di negara?",
    answers:["Inggris","Prancis","Amerika Serikat","Australia"],
    correct:0
},

{
    id:"batch3-173",
    category:"Olahraga",
    difficulty:"medium",
    question:"Piala Dunia sepak bola diselenggarakan oleh organisasi?",
    answers:["FIFA","UEFA","IOC","FIBA"],
    correct:0
},

{
    id:"batch3-174",
    category:"Olahraga",
    difficulty:"medium",
    question:"Olimpiade modern pertama diselenggarakan di kota?",
    answers:["Athena","Paris","London","Roma"],
    correct:0
},

{
    id:"batch3-175",
    category:"Olahraga",
    difficulty:"medium",
    question:"Dalam baseball, pemain memukul bola menggunakan?",
    answers:["Raket","Tongkat pemukul","Sarung tangan","Kepala"],
    correct:1
},

{
    id:"batch3-176",
    category:"Matematika",
    difficulty:"hard",
    question:"Berapakah 25 × 16?",
    answers:["300","350","400","450"],
    correct:2
},

{
    id:"batch3-177",
    category:"Matematika",
    difficulty:"hard",
    question:"Berapakah 15²?",
    answers:["125","200","225","250"],
    correct:2
},

{
    id:"batch3-178",
    category:"Matematika",
    difficulty:"hard",
    question:"Berapakah 2⁵?",
    answers:["16","24","32","64"],
    correct:2
},

{
    id:"batch3-179",
    category:"Matematika",
    difficulty:"hard",
    question:"Berapakah 3³?",
    answers:["9","18","27","36"],
    correct:2
},

{
    id:"batch3-180",
    category:"Matematika",
    difficulty:"hard",
    question:"Jika 5x = 45, maka x adalah?",
    answers:["7","8","9","10"],
    correct:2
},

{
    id:"batch3-181",
    category:"Matematika",
    difficulty:"extreme",
    question:"Berapakah 99 × 99?",
    answers:["9701","9801","9901","9999"],
    correct:1
},

{
    id:"batch3-182",
    category:"Matematika",
    difficulty:"extreme",
    question:"Berapakah akar kuadrat dari 1444?",
    answers:["36","38","40","42"],
    correct:1
},

{
    id:"batch3-183",
    category:"Matematika",
    difficulty:"extreme",
    question:"Jika 3x + 7 = 28, nilai x adalah?",
    answers:["5","6","7","8"],
    correct:2
},

{
    id:"batch3-184",
    category:"Matematika",
    difficulty:"extreme",
    question:"Berapakah jumlah sudut dalam segi delapan?",
    answers:["900°","1080°","1260°","1440°"],
    correct:1
},

{
    id:"batch3-185",
    category:"Matematika",
    difficulty:"extreme",
    question:"Jika sebuah segitiga memiliki sudut 50° dan 60°, sudut ketiganya adalah?",
    answers:["60°","70°","80°","90°"],
    correct:1
},

{
    id:"batch3-186",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Unsur dengan nomor atom 1 adalah?",
    answers:["Helium","Hidrogen","Oksigen","Karbon"],
    correct:1
},

{
    id:"batch3-187",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Unsur dengan nomor atom 6 adalah?",
    answers:["Karbon","Nitrogen","Oksigen","Boron"],
    correct:0
},

{
    id:"batch3-188",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Planet yang dikenal sebagai Planet Merah adalah?",
    answers:["Venus","Mars","Jupiter","Merkurius"],
    correct:1
},

{
    id:"batch3-189",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Benua yang dilalui garis khatulistiwa adalah?",
    answers:["Afrika","Eropa","Antarktika","Australia"],
    correct:0
},

{
    id:"batch3-190",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Samudra yang berada di antara Afrika, Asia, dan Australia adalah?",
    answers:["Atlantik","Pasifik","Hindia","Arktik"],
    correct:2
},

{
    id:"batch3-191",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Mata uang Jepang adalah?",
    answers:["Won","Yuan","Yen","Ringgit"],
    correct:2
},

{
    id:"batch3-192",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Mata uang Inggris adalah?",
    answers:["Euro","Pound sterling","Franc","Krone"],
    correct:1
},

{
    id:"batch3-193",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Mata uang India adalah?",
    answers:["Rupee","Rupiah","Ringgit","Taka"],
    correct:0
},

{
    id:"batch3-194",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Mata uang Korea Selatan adalah?",
    answers:["Yen","Won","Yuan","Baht"],
    correct:1
},

{
    id:"batch3-195",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Mata uang Thailand adalah?",
    answers:["Baht","Dong","Peso","Riel"],
    correct:0
},

{
    id:"batch3-196",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Mata uang Vietnam adalah?",
    answers:["Dong","Baht","Yuan","Kip"],
    correct:0
},

{
    id:"batch3-197",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Mata uang Swiss adalah?",
    answers:["Euro","Franc Swiss","Krone","Pound"],
    correct:1
},

{
    id:"batch3-198",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Mata uang Brasil adalah?",
    answers:["Peso","Real","Bolivar","Sol"],
    correct:1
},

{
    id:"batch3-199",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Mata uang Afrika Selatan adalah?",
    answers:["Rand","Dinar","Pula","Shilling"],
    correct:0
},

{
    id:"batch3-200",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Mata uang Mesir adalah?",
    answers:["Dinar Mesir","Pound Mesir","Dirham Mesir","Riyal Mesir"],
    correct:1
},/* ================= BATCH 4 ================= */

{
    id:"batch4-001",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Klub Liverpool FC didirikan pada tahun?",
    answers:["1888","1892","1900","1905"],
    correct:1
},

{
    id:"batch4-002",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"FC Barcelona didirikan pada tahun?",
    answers:["1899","1902","1910","1912"],
    correct:0
},

{
    id:"batch4-003",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Real Madrid didirikan pada tahun?",
    answers:["1899","1900","1902","1905"],
    correct:2
},

{
    id:"batch4-004",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Bayern München didirikan pada tahun?",
    answers:["1899","1900","1905","1910"],
    correct:1
},

{
    id:"batch4-005",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Juventus didirikan pada tahun?",
    answers:["1897","1900","1903","1910"],
    correct:0
},

{
    id:"batch4-006",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"AC Milan didirikan pada tahun?",
    answers:["1895","1899","1901","1908"],
    correct:1
},

{
    id:"batch4-007",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Inter Milan didirikan pada tahun?",
    answers:["1899","1905","1908","1912"],
    correct:2
},

{
    id:"batch4-008",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Chelsea FC didirikan pada tahun?",
    answers:["1899","1905","1910","1915"],
    correct:1
},

{
    id:"batch4-009",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Arsenal FC didirikan pada tahun?",
    answers:["1878","1886","1892","1901"],
    correct:1
},

{
    id:"batch4-010",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Borussia Dortmund didirikan pada tahun?",
    answers:["1905","1909","1912","1920"],
    correct:1
},

{
    id:"batch4-011",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Ajax Amsterdam didirikan pada tahun?",
    answers:["1895","1900","1905","1910"],
    correct:1
},

{
    id:"batch4-012",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Paris Saint-Germain didirikan pada tahun?",
    answers:["1965","1970","1975","1980"],
    correct:1
},

{
    id:"batch4-013",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Olympique de Marseille didirikan pada tahun?",
    answers:["1899","1905","1910","1912"],
    correct:0
},

{
    id:"batch4-014",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"FC Porto didirikan pada tahun?",
    answers:["1888","1893","1900","1905"],
    correct:1
},

{
    id:"batch4-015",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"SL Benfica didirikan pada tahun?",
    answers:["1899","1904","1910","1915"],
    correct:1
},

{
    id:"batch4-016",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Boca Juniors didirikan pada tahun?",
    answers:["1901","1905","1910","1912"],
    correct:1
},

{
    id:"batch4-017",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"River Plate didirikan pada tahun?",
    answers:["1899","1901","1905","1910"],
    correct:1
},

{
    id:"batch4-018",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Santos FC didirikan pada tahun?",
    answers:["1905","1910","1912","1915"],
    correct:2
},

{
    id:"batch4-019",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Palmeiras didirikan pada tahun?",
    answers:["1910","1912","1914","1918"],
    correct:2
},

{
    id:"batch4-020",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Manchester United awalnya berdiri dengan nama Newton Heath pada tahun?",
    answers:["1878","1886","1892","1900"],
    correct:0
},

{
    id:"batch4-021",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Piala Dunia FIFA pertama kali diselenggarakan pada tahun?",
    answers:["1926","1930","1934","1938"],
    correct:1
},

{
    id:"batch4-022",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Piala Dunia 1930 diselenggarakan di negara?",
    answers:["Brasil","Italia","Uruguay","Argentina"],
    correct:2
},

{
    id:"batch4-023",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Negara yang paling sering menjuarai Piala Dunia hingga 2022 adalah?",
    answers:["Jerman","Brasil","Argentina","Italia"],
    correct:1
},

{
    id:"batch4-024",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Tim nasional Indonesia dikenal dengan julukan?",
    answers:["Garuda","Macan Biru","Harimau Putih","Elang Merah"],
    correct:0
},

{
    id:"batch4-025",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Trofi Liga Champions UEFA sebelumnya dikenal sebagai?",
    answers:["European Cup","UEFA Shield","European Cup Winners Cup","Super Cup"],
    correct:0
},

{
    id:"batch4-026",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Stadion kandang FC Barcelona secara historis dikenal dengan nama?",
    answers:["Camp Nou","Bernabéu","San Siro","Anfield"],
    correct:0
},

{
    id:"batch4-027",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Stadion kandang Liverpool adalah?",
    answers:["Old Trafford","Anfield","Stamford Bridge","Emirates"],
    correct:1
},

{
    id:"batch4-028",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Stadion Santiago Bernabéu merupakan markas?",
    answers:["Barcelona","Real Madrid","Atlético Madrid","Valencia"],
    correct:1
},

{
    id:"batch4-029",
    category:"Sepak Bola",
    difficulty:"hard",
    question:"Klub yang dikenal dengan julukan The Red Devils adalah?",
    answers:["Liverpool","Manchester United","Arsenal","Chelsea"],
    correct:1
},

{
    id:"batch4-030",
    category:"Sepak Bola",
    difficulty:"hard",
    question:"Klub yang dikenal dengan julukan The Gunners adalah?",
    answers:["Arsenal","Chelsea","Tottenham","Liverpool"],
    correct:0
},

{
    id:"batch4-031",
    category:"Sepak Bola",
    difficulty:"hard",
    question:"Negara asal klub Bayern München adalah?",
    answers:["Austria","Swiss","Jerman","Belanda"],
    correct:2
},

{
    id:"batch4-032",
    category:"Sepak Bola",
    difficulty:"hard",
    question:"Negara asal klub Juventus adalah?",
    answers:["Italia","Spanyol","Portugal","Prancis"],
    correct:0
},

{
    id:"batch4-033",
    category:"Sepak Bola",
    difficulty:"hard",
    question:"Lionel Messi berasal dari negara?",
    answers:["Brasil","Argentina","Uruguay","Chile"],
    correct:1
},

{
    id:"batch4-034",
    category:"Sepak Bola",
    difficulty:"hard",
    question:"Cristiano Ronaldo berasal dari?",
    answers:["Spanyol","Portugal","Brasil","Italia"],
    correct:1
},

{
    id:"batch4-035",
    category:"Sepak Bola",
    difficulty:"hard",
    question:"Neymar berasal dari?",
    answers:["Brasil","Argentina","Kolombia","Uruguay"],
    correct:0
},

{
    id:"batch4-036",
    category:"Sepak Bola",
    difficulty:"extreme",
    question:"Pemain yang dikenal dengan julukan El Fenomeno adalah?",
    answers:["Ronaldo Nazário","Ronaldinho","Kaká","Rivaldo"],
    correct:0
},

{
    id:"batch4-037",
    category:"Sepak Bola",
    difficulty:"extreme",
    question:"Zinedine Zidane berasal dari negara?",
    answers:["Prancis","Italia","Aljazair","Spanyol"],
    correct:0
},

{
    id:"batch4-038",
    category:"Sepak Bola",
    difficulty:"extreme",
    question:"Diego Maradona berasal dari?",
    answers:["Argentina","Brasil","Uruguay","Chile"],
    correct:0
},

{
    id:"batch4-039",
    category:"Sepak Bola",
    difficulty:"extreme",
    question:"Pemain yang dikenal sebagai legenda Manchester United dan memakai nomor 7 adalah?",
    answers:["David Beckham","Paul Scholes","Ryan Giggs","Roy Keane"],
    correct:0
},

{
    id:"batch4-040",
    category:"Sepak Bola",
    difficulty:"extreme",
    question:"Klub yang pernah dibela Lionel Messi selama sebagian besar masa awal karier profesionalnya adalah?",
    answers:["Real Madrid","Barcelona","Chelsea","Juventus"],
    correct:1
},

{
    id:"batch4-041",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Berapa jumlah pemain satu tim sepak bola di lapangan?",
    answers:["9","10","11","12"],
    correct:2
},

{
    id:"batch4-042",
    category:"Sepak Bola",
    difficulty:"easy",
    question:"Durasi normal pertandingan sepak bola adalah?",
    answers:["60 menit","80 menit","90 menit","100 menit"],
    correct:2
},

{
    id:"batch4-043",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Kartu merah berarti pemain?",
    answers:["Mendapat peringatan","Keluar dari pertandingan","Mendapat penalti","Berganti posisi"],
    correct:1
},

{
    id:"batch4-044",
    category:"Sepak Bola",
    difficulty:"medium",
    question:"Tendangan dari titik penalti dilakukan dari jarak standar berapa meter dari gawang?",
    answers:["9 meter","10 meter","11 meter","12 meter"],
    correct:2
},

{
    id:"batch4-045",
    category:"Sepak Bola",
    difficulty:"hard",
    question:"Offside terutama berkaitan dengan posisi pemain saat?",
    answers:["Melakukan lemparan ke dalam","Bola dimainkan oleh rekan setim","Menendang penalti","Merayakan gol"],
    correct:1
},

{
    id:"batch4-046",
    category:"Sepak Bola",
    difficulty:"hard",
    question:"Kompetisi antarklub Eropa tingkat tertinggi yang diselenggarakan UEFA adalah?",
    answers:["Europa League","Champions League","Conference League","Nations League"],
    correct:1
},

{
    id:"batch4-047",
    category:"Sepak Bola",
    difficulty:"extreme",
    question:"Piala Dunia FIFA 2022 dimenangi oleh?",
    answers:["Prancis","Argentina","Brasil","Kroasia"],
    correct:1
},

{
    id:"batch4-048",
    category:"Sepak Bola",
    difficulty:"extreme",
    question:"Final Piala Dunia 2022 mempertemukan Argentina melawan?",
    answers:["Jerman","Brasil","Prancis","Spanyol"],
    correct:2
},

{
    id:"batch4-049",
    category:"Sepak Bola",
    difficulty:"hard",
    question:"Klub Manchester City berasal dari kota?",
    answers:["Liverpool","Manchester","London","Birmingham"],
    correct:1
},

{
    id:"batch4-050",
    category:"Sepak Bola",
    difficulty:"extreme",
    question:"Klub sepak bola Inggris yang bermarkas di Stamford Bridge adalah?",
    answers:["Chelsea","Arsenal","Tottenham","West Ham"],
    correct:0
},

/* ================= MOTOGP ================= */

{
    id:"batch4-051",
    category:"MotoGP",
    difficulty:"easy",
    question:"MotoGP merupakan kejuaraan dunia untuk balap?",
    answers:["Mobil","Motor","Sepeda","Perahu"],
    correct:1
},

{
    id:"batch4-052",
    category:"MotoGP",
    difficulty:"easy",
    question:"Marc Márquez berasal dari?",
    answers:["Spanyol","Italia","Prancis","Portugal"],
    correct:0
},

{
    id:"batch4-053",
    category:"MotoGP",
    difficulty:"easy",
    question:"Valentino Rossi berasal dari?",
    answers:["Italia","Spanyol","Austria","Prancis"],
    correct:0
},

{
    id:"batch4-054",
    category:"MotoGP",
    difficulty:"easy",
    question:"Jorge Lorenzo berasal dari?",
    answers:["Spanyol","Italia","Brasil","Portugal"],
    correct:0
},

{
    id:"batch4-055",
    category:"MotoGP",
    difficulty:"easy",
    question:"Ducati berasal dari negara?",
    answers:["Italia","Jepang","Spanyol","Jerman"],
    correct:0
},

{
    id:"batch4-056",
    category:"MotoGP",
    difficulty:"easy",
    question:"Yamaha berasal dari negara?",
    answers:["Italia","Jepang","Prancis","Amerika Serikat"],
    correct:1
},

{
    id:"batch4-057",
    category:"MotoGP",
    difficulty:"easy",
    question:"Honda berasal dari negara?",
    answers:["Jepang","Italia","Spanyol","Jerman"],
    correct:0
},

{
    id:"batch4-058",
    category:"MotoGP",
    difficulty:"medium",
    question:"Aprilia berasal dari negara?",
    answers:["Italia","Jepang","Austria","Belanda"],
    correct:0
},

{
    id:"batch4-059",
    category:"MotoGP",
    difficulty:"medium",
    question:"KTM berasal dari?",
    answers:["Austria","Italia","Swiss","Jerman"],
    correct:0
},

{
    id:"batch4-060",
    category:"MotoGP",
    difficulty:"medium",
    question:"Dorna Sports merupakan perusahaan yang mengelola hak komersial MotoGP?",
    answers:["Benar","Salah","Hanya Moto2","Hanya Moto3"],
    correct:0
},

{
    id:"batch4-061",
    category:"MotoGP",
    difficulty:"medium",
    question:"MotoGP menggunakan mesin prototipe yang secara umum berkapasitas?",
    answers:["125 cc","250 cc","500 cc","1000 cc"],
    correct:3
},

{
    id:"batch4-062",
    category:"MotoGP",
    difficulty:"medium",
    question:"MotoGP adalah kelas tertinggi dalam kejuaraan balap motor Grand Prix?",
    answers:["Benar","Salah","Hanya pada 1990-an","Hanya di Eropa"],
    correct:0
},

{
    id:"batch4-063",
    category:"MotoGP",
    difficulty:"hard",
    question:"Valentino Rossi memiliki julukan yang sangat terkenal?",
    answers:["The Doctor","The King","The Rocket","The Master"],
    correct:0
},

{
    id:"batch4-064",
    category:"MotoGP",
    difficulty:"hard",
    question:"Marc Márquez dikenal dengan nomor balap?",
    answers:["7","46","93","99"],
    correct:2
},

{
    id:"batch4-065",
    category:"MotoGP",
    difficulty:"hard",
    question:"Valentino Rossi terkenal menggunakan nomor?",
    answers:["46","93","99","21"],
    correct:0
},

{
    id:"batch4-066",
    category:"MotoGP",
    difficulty:"hard",
    question:"Jorge Lorenzo terkenal menggunakan nomor?",
    answers:["99","46","93","12"],
    correct:0
},

{
    id:"batch4-067",
    category:"MotoGP",
    difficulty:"hard",
    question:"Casey Stoner berasal dari?",
    answers:["Australia","Inggris","Selandia Baru","Amerika Serikat"],
    correct:0
},

{
    id:"batch4-068",
    category:"MotoGP",
    difficulty:"hard",
    question:"Dani Pedrosa berasal dari?",
    answers:["Spanyol","Italia","Portugal","Prancis"],
    correct:0
},

{
    id:"batch4-069",
    category:"MotoGP",
    difficulty:"extreme",
    question:"Casey Stoner pernah menjadi juara dunia MotoGP bersama Ducati pada tahun?",
    answers:["2005","2007","2009","2011"],
    correct:1
},

{
    id:"batch4-070",
    category:"MotoGP",
    difficulty:"extreme",
    question:"Valentino Rossi meraih gelar juara dunia kelas utama bersama Yamaha pada tahun 2004 setelah sebelumnya membela?",
    answers:["Honda","Ducati","Suzuki","KTM"],
    correct:0
},

{
    id:"batch4-071",
    category:"MotoGP",
    difficulty:"easy",
    question:"Balapan MotoGP biasanya berlangsung di?",
    answers:["Sirkuit","Stadion sepak bola","Lintasan atletik","Kolam"],
    correct:0
},

{
    id:"batch4-072",
    category:"MotoGP",
    difficulty:"medium",
    question:"Sirkuit Mugello berada di negara?",
    answers:["Italia","Spanyol","Prancis","Jerman"],
    correct:0
},

{
    id:"batch4-073",
    category:"MotoGP",
    difficulty:"medium",
    question:"Sirkuit Jerez berada di?",
    answers:["Spanyol","Italia","Portugal","Austria"],
    correct:0
},

{
    id:"batch4-074",
    category:"MotoGP",
    difficulty:"medium",
    question:"Sirkuit Sepang berada di negara?",
    answers:["Indonesia","Malaysia","Thailand","Singapura"],
    correct:1
},

{
    id:"batch4-075",
    category:"MotoGP",
    difficulty:"hard",
    question:"Sirkuit Phillip Island berada di?",
    answers:["Australia","Selandia Baru","Jepang","Afrika Selatan"],
    correct:0
},

{
    id:"batch4-076",
    category:"MotoGP",
    difficulty:"hard",
    question:"Sirkuit Sachsenring berada di?",
    answers:["Jerman","Belanda","Austria","Swiss"],
    correct:0
},

{
    id:"batch4-077",
    category:"MotoGP",
    difficulty:"hard",
    question:"Sponsor utama pada sebuah tim balap dapat berperan sebagai?",
    answers:["Sponsor komersial","Wasit","Pembalap","Marshal"],
    correct:0
},

{
    id:"batch4-078",
    category:"MotoGP",
    difficulty:"extreme",
    question:"Apa fungsi utama winglet pada motor MotoGP?",
    answers:["Menambah gaya aerodinamika","Mengisi bahan bakar","Mendinginkan ban saja","Mengurangi kapasitas mesin"],
    correct:0
},

{
    id:"batch4-079",
    category:"MotoGP",
    difficulty:"extreme",
    question:"Perangkat yang membantu mengatur ketinggian motor saat akselerasi atau pengereman disebut?",
    answers:["Ride-height device","ABS","Turbo","CVT"],
    correct:0
},

{
    id:"batch4-080",
    category:"MotoGP",
    difficulty:"extreme",
    question:"Balapan Grand Prix Indonesia pernah digelar di sirkuit?",
    answers:["Mandalika","Sentul saja","Ancol","Kemayoran"],
    correct:0
},

/* ================= VOLI ================= */

{
    id:"batch4-081",
    category:"Voli",
    difficulty:"easy",
    question:"Olahraga bola voli diciptakan oleh?",
    answers:["William G. Morgan","James Naismith","Pierre de Coubertin","Walter Camp"],
    correct:0
},

{
    id:"batch4-082",
    category:"Voli",
    difficulty:"easy",
    question:"Bola voli pertama kali diciptakan pada tahun?",
    answers:["1885","1895","1905","1915"],
    correct:1
},

{
    id:"batch4-083",
    category:"Voli",
    difficulty:"easy",
    question:"Satu tim voli indoor memainkan berapa pemain di lapangan?",
    answers:["5","6","7","8"],
    correct:1
},

{
    id:"batch4-084",
    category:"Voli",
    difficulty:"easy",
    question:"Pemain bertahan khusus dalam bola voli disebut?",
    answers:["Libero","Setter","Spiker","Middle"],
    correct:0
},

{
    id:"batch4-085",
    category:"Voli",
    difficulty:"easy",
    question:"Pukulan keras untuk menyerang dalam bola voli disebut?",
    answers:["Spike","Block","Serve","Dig"],
    correct:0
},

{
    id:"batch4-086",
    category:"Voli",
    difficulty:"easy",
    question:"Pukulan pertama untuk memulai reli disebut?",
    answers:["Serve","Block","Set","Dig"],
    correct:0
},

{
    id:"batch4-087",
    category:"Voli",
    difficulty:"medium",
    question:"Federasi internasional bola voli adalah?",
    answers:["FIVB","FIFA","FIBA","BWF"],
    correct:0
},

{
    id:"batch4-088",
    category:"Voli",
    difficulty:"medium",
    question:"FIVB merupakan singkatan dari?",
    answers:["Fédération Internationale de Volleyball","Federation International Volleyball Board","Football International Volleyball Board","Federation Indoor Volleyball"],
    correct:0
},

{
    id:"batch4-089",
    category:"Voli",
    difficulty:"medium",
    question:"Set biasa dalam pertandingan voli dimainkan sampai?",
    answers:["15","21","25","30"],
    correct:2
},

{
    id:"batch4-090",
    category:"Voli",
    difficulty:"medium",
    question:"Set penentuan dalam pertandingan voli umumnya dimainkan sampai?",
    answers:["10","15","20","25"],
    correct:1
},

{
    id:"batch4-091",
    category:"Voli",
    difficulty:"medium",
    question:"Posisi pemain yang bertugas mengatur serangan disebut?",
    answers:["Setter","Libero","Opposite","Middle blocker"],
    correct:0
},

{
    id:"batch4-092",
    category:"Voli",
    difficulty:"medium",
    question:"Pemain yang biasanya menjadi penyerang dari sisi kanan disebut?",
    answers:["Opposite","Libero","Setter","Defensive specialist"],
    correct:0
},

{
    id:"batch4-093",
    category:"Voli",
    difficulty:"hard",
    question:"Negara yang sangat terkenal sebagai salah satu kekuatan besar bola voli putri adalah?",
    answers:["Brasil","Nepal","Islandia","Irlandia"],
    correct:0
},

{
    id:"batch4-094",
    category:"Voli",
    difficulty:"hard",
    question:"Pemain voli asal Brasil yang terkenal dengan nama Giba adalah?",
    answers:["Gilberto Amauri de Godoy Filho","Bruno Rezende","Wallace de Souza","Sergio Santos"],
    correct:0
},

{
    id:"batch4-095",
    category:"Voli",
    difficulty:"hard",
    question:"Karch Kiraly terkenal sebagai legenda olahraga?",
    answers:["Voli","Tenis","Sepak bola","Basket"],
    correct:0
},

{
    id:"batch4-096",
    category:"Voli",
    difficulty:"hard",
    question:"Karch Kiraly berasal dari?",
    answers:["Amerika Serikat","Brasil","Italia","Polandia"],
    correct:0
},

{
    id:"batch4-097",
    category:"Voli",
    difficulty:"hard",
    question:"Liga bola voli profesional Jepang yang terkenal adalah?",
    answers:["SV.League","J.League","B.League","V.League Football"],
    correct:0
},

{
    id:"batch4-098",
    category:"Voli",
    difficulty:"extreme",
    question:"Tim nasional voli putra Polandia dikenal sebagai salah satu kekuatan besar dunia?",
    answers:["Benar","Salah","Hanya pada level junior","Hanya di voli pantai"],
    correct:0
},

{
    id:"batch4-099",
    category:"Voli",
    difficulty:"extreme",
    question:"Voli pantai dimainkan oleh berapa pemain setiap tim?",
    answers:["2","3","4","6"],
    correct:0
},

{
    id:"batch4-100",
    category:"Voli",
    difficulty:"extreme",
    question:"Voli pantai dimainkan di permukaan?",
    answers:["Pasir","Rumput","Es","Aspal"],
    correct:0
},

{
    id:"batch4-101",
    category:"Voli",
    difficulty:"easy",
    question:"Dalam bola voli, pemain melakukan rotasi setelah?",
    answers:["Tim memperoleh hak servis","Setiap lima poin","Timeout","Pergantian pelatih"],
    correct:0
},

{
    id:"batch4-102",
    category:"Voli",
    difficulty:"medium",
    question:"Maksimal sentuhan sebuah tim sebelum mengembalikan bola ke lawan biasanya?",
    answers:["2","3","4","5"],
    correct:1
},

{
    id:"batch4-103",
    category:"Voli",
    difficulty:"medium",
    question:"Block dilakukan terutama untuk?",
    answers:["Menghalangi serangan lawan","Memulai pertandingan","Mengganti pemain","Menghentikan waktu"],
    correct:0
},

{
    id:"batch4-104",
    category:"Voli",
    difficulty:"hard",
    question:"Pemain libero biasanya memakai seragam yang?",
    answers:["Berbeda warna dari rekan setim","Selalu hitam","Selalu putih","Sama persis"],
    correct:0
},

{
    id:"batch4-105",
    category:"Voli",
    difficulty:"extreme",
    question:"Kejuaraan dunia voli berada di bawah organisasi?",
    answers:["FIVB","FIFA","ITF","ICC"],
    correct:0
},

/* ================= LOGIKA ================= */

{
    id:"batch4-106",
    category:"Logika",
    difficulty:"easy",
    question:"Semua kucing adalah hewan. Milo adalah kucing. Kesimpulan yang benar adalah?",
    answers:["Milo adalah hewan","Semua hewan adalah kucing","Milo bukan hewan","Tidak dapat disimpulkan"],
    correct:0
},

{
    id:"batch4-107",
    category:"Logika",
    difficulty:"easy",
    question:"Jika hari ini Senin, dua hari kemudian adalah?",
    answers:["Selasa","Rabu","Kamis","Jumat"],
    correct:1
},

{
    id:"batch4-108",
    category:"Logika",
    difficulty:"easy",
    question:"Jika A lebih tinggi dari B dan B lebih tinggi dari C, siapa yang paling tinggi?",
    answers:["A","B","C","Tidak diketahui"],
    correct:0
},

{
    id:"batch4-109",
    category:"Logika",
    difficulty:"easy",
    question:"Semua burung memiliki sayap. Elang adalah burung. Maka?",
    answers:["Elang memiliki sayap","Elang bukan burung","Semua yang bersayap adalah elang","Tidak ada kesimpulan"],
    correct:0
},

{
    id:"batch4-110",
    category:"Logika",
    difficulty:"easy",
    question:"Pola 2, 4, 6, 8, angka berikutnya adalah?",
    answers:["9","10","11","12"],
    correct:1
},

{
    id:"batch4-111",
    category:"Logika",
    difficulty:"easy",
    question:"Pola 5, 10, 15, 20, angka berikutnya?",
    answers:["21","24","25","30"],
    correct:2
},

{
    id:"batch4-112",
    category:"Logika",
    difficulty:"medium",
    question:"Pola 3, 6, 12, 24, angka berikutnya?",
    answers:["36","42","48","50"],
    correct:2
},

{
    id:"batch4-113",
    category:"Logika",
    difficulty:"medium",
    question:"Pola 1, 4, 9, 16, angka berikutnya?",
    answers:["20","24","25","36"],
    correct:2
},

{
    id:"batch4-114",
    category:"Logika",
    difficulty:"medium",
    question:"Jika semua A adalah B, dan tidak ada B yang merupakan C, maka?",
    answers:["Tidak ada A yang merupakan C","Semua C adalah A","Semua A adalah C","Semua B adalah A"],
    correct:0
},

{
    id:"batch4-115",
    category:"Logika",
    difficulty:"medium",
    question:"Jika hujan maka jalan basah. Jalan tidak basah. Kesimpulan logisnya?",
    answers:["Hujan","Tidak hujan","Pasti badai","Tidak dapat digunakan"],
    correct:1
},

{
    id:"batch4-116",
    category:"Logika",
    difficulty:"medium",
    question:"Pola huruf A, C, E, G, huruf berikutnya?",
    answers:["H","I","J","K"],
    correct:1
},

{
    id:"batch4-117",
    category:"Logika",
    difficulty:"medium",
    question:"Pola 2, 6, 18, 54, angka berikutnya?",
    answers:["108","162","216","270"],
    correct:1
},

{
    id:"batch4-118",
    category:"Logika",
    difficulty:"medium",
    question:"Jika 3 orang menyelesaikan pekerjaan dalam 6 hari dengan kecepatan sama, secara teori 6 orang membutuhkan?",
    answers:["1 hari","2 hari","3 hari","6 hari"],
    correct:2
},

{
    id:"batch4-119",
    category:"Logika",
    difficulty:"medium",
    question:"Semua dokter adalah manusia. Sebagian manusia adalah musisi. Apakah pasti semua dokter musisi?",
    answers:["Ya","Tidak","Pasti sebagian","Pasti tidak ada"],
    correct:1
},

{
    id:"batch4-120",
    category:"Logika",
    difficulty:"medium",
    question:"Jika P lebih besar dari Q, dan Q sama dengan R, maka?",
    answers:["P > R","P < R","P = R","Tidak diketahui"],
    correct:0
},

{
    id:"batch4-121",
    category:"Logika",
    difficulty:"hard",
    question:"Pola 1, 1, 2, 3, 5, 8, angka berikutnya?",
    answers:["11","12","13","15"],
    correct:2
},

{
    id:"batch4-122",
    category:"Logika",
    difficulty:"hard",
    question:"Pola 2, 3, 5, 8, 12, 17, angka berikutnya?",
    answers:["21","22","23","24"],
    correct:2
},

{
    id:"batch4-123",
    category:"Logika",
    difficulty:"hard",
    question:"Jika semua X adalah Y dan sebagian Y adalah Z, apakah pasti sebagian X adalah Z?",
    answers:["Ya","Tidak","Selalu semua","Tidak mungkin"],
    correct:1
},

{
    id:"batch4-124",
    category:"Logika",
    difficulty:"hard",
    question:"Ada 5 orang. Setiap orang berjabat tangan satu kali dengan setiap orang lain. Total jabat tangan?",
    answers:["5","10","15","20"],
    correct:1
},

{
    id:"batch4-125",
    category:"Logika",
    difficulty:"hard",
    question:"Jika sebuah pernyataan dan negasinya sama-sama dianggap benar dalam sistem logika klasik, maka terjadi?",
    answers:["Kontradiksi","Implikasi","Identitas","Silogisme"],
    correct:0
},

{
    id:"batch4-126",
    category:"Logika",
    difficulty:"hard",
    question:"Jika A menyebabkan B, tetapi B tidak terjadi, kesimpulan modus tollens yang tepat adalah?",
    answers:["A tidak terjadi","A pasti terjadi","B pasti terjadi","Tidak ada hubungan"],
    correct:0
},

{
    id:"batch4-127",
    category:"Logika",
    difficulty:"hard",
    question:"Pola 81, 27, 9, 3, angka berikutnya?",
    answers:["0","1","2","6"],
    correct:1
},

{
    id:"batch4-128",
    category:"Logika",
    difficulty:"hard",
    question:"Pola 100, 90, 81, 73, angka berikutnya paling masuk akal?",
    answers:["64","66","67","70"],
    correct:1
},

{
    id:"batch4-129",
    category:"Logika",
    difficulty:"hard",
    question:"Jika tidak semua siswa hadir berarti?",
    answers:["Ada setidaknya satu siswa yang tidak hadir","Tidak ada siswa hadir","Semua siswa hadir","Hanya guru yang hadir"],
    correct:0
},

{
    id:"batch4-130",
    category:"Logika",
    difficulty:"hard",
    question:"Sebuah jam menunjukkan pukul 03.00. Sudut terkecil antara jarum jam dan menit adalah?",
    answers:["60°","90°","120°","180°"],
    correct:1
},

{
    id:"batch4-131",
    category:"Logika",
    difficulty:"extreme",
    question:"Ada tiga kotak berlabel Apel, Jeruk, dan Campuran. Semua label salah. Minimal berapa buah yang perlu diambil untuk menentukan isi semua kotak?",
    answers:["1","2","3","4"],
    correct:0
},

{
    id:"batch4-132",
    category:"Logika",
    difficulty:"extreme",
    question:"Jika semua A adalah B, semua B adalah C, dan tidak ada C yang D, maka?",
    answers:["Tidak ada A yang D","Semua A adalah D","Sebagian A pasti D","Semua D adalah A"],
    correct:0
},

{
    id:"batch4-133",
    category:"Logika",
    difficulty:"extreme",
    question:"Dalam urutan 1, 2, 6, 24, 120, angka berikutnya?",
    answers:["240","360","720","840"],
    correct:2
},

{
    id:"batch4-134",
    category:"Logika",
    difficulty:"extreme",
    question:"Jika sebuah argumen memiliki premis benar tetapi kesimpulan salah, argumen tersebut?",
    answers:["Valid","Tidak valid","Tautologi","Definisi"],
    correct:1
},

{
    id:"batch4-135",
    category:"Logika",
    difficulty:"extreme",
    question:"Ada 8 bola identik, satu lebih berat. Dengan timbangan dua sisi, minimal penimbangan untuk selalu menemukan bola berat?",
    answers:["1","2","3","4"],
    correct:1
},

{
    id:"batch4-136",
    category:"Logika",
    difficulty:"extreme",
    question:"Jika P benar dan P menyebabkan Q, tetapi Q ternyata salah, dalam logika klasik terdapat?",
    answers:["Kontradiksi","Kesimpulan pasti benar","Tautologi","Definisi"],
    correct:0
},

{
    id:"batch4-137",
    category:"Logika",
    difficulty:"extreme",
    question:"Pola 2, 12, 36, 80, 150, angka berikutnya?",
    answers:["216","240","252","300"],
    correct:2
},

{
    id:"batch4-138",
    category:"Logika",
    difficulty:"extreme",
    question:"Pola 1, 2, 6, 24, 120 menggunakan operasi yang berkembang. Angka berikutnya?",
    answers:["240","360","720","840"],
    correct:2
},

{
    id:"batch4-139",
    category:"Logika",
    difficulty:"extreme",
    question:"Jika tepat satu dari P dan Q benar, dan P salah, maka Q?",
    answers:["Benar","Salah","Tidak diketahui","Kontradiktif"],
    correct:0
},

{
    id:"batch4-140",
    category:"Logika",
    difficulty:"extreme",
    question:"Jika A lebih berat dari B, B lebih berat dari C, dan C lebih berat dari D, siapa yang paling ringan?",
    answers:["A","B","C","D"],
    correct:3
},

/* ================= APLIKASI ================= */

{
    id:"batch4-141",
    category:"Aplikasi",
    difficulty:"easy",
    question:"Aplikasi WhatsApp terutama digunakan untuk?",
    answers:["Pesan dan komunikasi","Mengedit sistem operasi","Membuat chip","Mengukur suhu"],
    correct:0
},

{
    id:"batch4-142",
    category:"Aplikasi",
    difficulty:"easy",
    question:"Instagram terutama dikenal sebagai platform?",
    answers:["Media sosial berbasis foto dan video","Pengolah kata","Spreadsheet","Antivirus"],
    correct:0
},

{
    id:"batch4-143",
    category:"Aplikasi",
    difficulty:"easy",
    question:"YouTube terutama digunakan untuk?",
    answers:["Menonton dan berbagi video","Mengedit dokumen","Mengelola database","Mengirim SMS"],
    correct:0
},

{
    id:"batch4-144",
    category:"Aplikasi",
    difficulty:"easy",
    question:"Spotify dikenal sebagai layanan?",
    answers:["Streaming musik dan audio","Belanja daring","Peta","Pesan instan"],
    correct:0
},

{
    id:"batch4-145",
    category:"Aplikasi",
    difficulty:"easy",
    question:"TikTok terutama terkenal karena?",
    answers:["Video pendek","Spreadsheet","Email perusahaan","Pengolah PDF"],
    correct:0
},

{
    id:"batch4-146",
    category:"Aplikasi",
    difficulty:"medium",
    question:"Aplikasi Google Maps digunakan terutama untuk?",
    answers:["Navigasi dan peta","Mengedit musik","Membuat animasi","Mengompres video"],
    correct:0
},

{
    id:"batch4-147",
    category:"Aplikasi",
    difficulty:"medium",
    question:"Google Drive digunakan terutama untuk?",
    answers:["Penyimpanan dan berbagi file","Balap motor","Streaming olahraga","Mengedit BIOS"],
    correct:0
},

{
    id:"batch4-148",
    category:"Aplikasi",
    difficulty:"medium",
    question:"Microsoft Word digunakan terutama untuk?",
    answers:["Pengolah kata","Mengedit suara","Navigasi","Streaming film"],
    correct:0
},

{
    id:"batch4-149",
    category:"Aplikasi",
    difficulty:"medium",
    question:"Microsoft Excel terutama digunakan untuk?",
    answers:["Spreadsheet dan pengolahan data","Pesan instan","Streaming musik","Peta"],
    correct:0
},

{
    id:"batch4-150",
    category:"Aplikasi",
    difficulty:"medium",
    question:"Canva dikenal sebagai platform untuk?",
    answers:["Desain grafis","Navigasi pesawat","Antivirus","Pemrograman kernel"],
    correct:0
},

{
    id:"batch4-151",
    category:"Aplikasi",
    difficulty:"medium",
    question:"Discord pada awalnya sangat populer di kalangan?",
    answers:["Komunitas gaming","Perbankan","Transportasi","Meteorologi"],
    correct:0
},

{
    id:"batch4-152",
    category:"Aplikasi",
    difficulty:"medium",
    question:"Zoom dikenal sebagai aplikasi untuk?",
    answers:["Konferensi video","Mengedit foto","Belanja makanan","Membuat peta"],
    correct:0
},

{
    id:"batch4-153",
    category:"Aplikasi",
    difficulty:"hard",
    question:"Android dikembangkan terutama oleh perusahaan?",
    answers:["Google","Nintendo","Adobe","Valve"],
    correct:0
},

{
    id:"batch4-154",
    category:"Aplikasi",
    difficulty:"hard",
    question:"Aplikasi Photoshop dikembangkan oleh?",
    answers:["Adobe","Google","Microsoft","Meta"],
    correct:0
},

{
    id:"batch4-155",
    category:"Aplikasi",
    difficulty:"hard",
    question:"WhatsApp dimiliki oleh perusahaan?",
    answers:["Meta","Apple","Sony","Amazon"],
    correct:0
},

{
    id:"batch4-156",
    category:"Aplikasi",
    difficulty:"hard",
    question:"Instagram dimiliki oleh?",
    answers:["Meta","Microsoft","Samsung","ByteDance"],
    correct:0
},

{
    id:"batch4-157",
    category:"Aplikasi",
    difficulty:"hard",
    question:"TikTok dikembangkan oleh perusahaan?",
    answers:["ByteDance","Meta","Google","Tencent"],
    correct:0
},

{
    id:"batch4-158",
    category:"Aplikasi",
    difficulty:"extreme",
    question:"Aplikasi yang dikembangkan ByteDance dan terkenal dengan video pendek adalah?",
    answers:["TikTok","Telegram","Signal","Discord"],
    correct:0
},

{
    id:"batch4-159",
    category:"Aplikasi",
    difficulty:"extreme",
    question:"Aplikasi pesan yang terkenal dengan fitur channel dan grup besar adalah?",
    answers:["Telegram","Calculator","Paint","Notepad"],
    correct:0
},

{
    id:"batch4-160",
    category:"Aplikasi",
    difficulty:"extreme",
    question:"Aplikasi komunikasi yang terkenal menggunakan enkripsi end-to-end secara default pada percakapan adalah?",
    answers:["Signal","Excel","Maps","Chrome"],
    correct:0
},

/* ================= PENGETAHUAN UMUM ================= */

{
    id:"batch4-161",
    category:"Sejarah",
    difficulty:"easy",
    question:"Perang Dunia I dimulai pada tahun?",
    answers:["1912","1914","1916","1918"],
    correct:1
},

{
    id:"batch4-162",
    category:"Sejarah",
    difficulty:"medium",
    question:"Tembok Berlin runtuh pada tahun?",
    answers:["1987","1988","1989","1991"],
    correct:2
},

{
    id:"batch4-163",
    category:"Sejarah",
    difficulty:"hard",
    question:"Revolusi Industri pertama kali berkembang pesat di?",
    answers:["Inggris","Jepang","Brasil","Mesir"],
    correct:0
},

{
    id:"batch4-164",
    category:"Geologi",
    difficulty:"easy",
    question:"Batuan yang terbentuk dari pembekuan magma disebut?",
    answers:["Batuan beku","Batuan sedimen","Batuan metamorf","Batuan organik"],
    correct:0
},

{
    id:"batch4-165",
    category:"Geologi",
    difficulty:"easy",
    question:"Lapisan Bumi tempat kita hidup disebut?",
    answers:["Kerak","Mantel","Inti luar","Inti dalam"],
    correct:0
},

{
    id:"batch4-166",
    category:"Geologi",
    difficulty:"medium",
    question:"Gempa bumi paling sering terjadi akibat?",
    answers:["Pergerakan lempeng tektonik","Perubahan warna tanah","Hujan biasa","Rotasi Bulan"],
    correct:0
},

{
    id:"batch4-167",
    category:"Geologi",
    difficulty:"medium",
    question:"Magma yang keluar ke permukaan Bumi disebut?",
    answers:["Lava","Granit","Pasir","Mineral"],
    correct:0
},

{
    id:"batch4-168",
    category:"Geologi",
    difficulty:"hard",
    question:"Batuan metamorf terbentuk terutama karena?",
    answers:["Panas dan tekanan","Pembekuan langsung air","Angin saja","Cahaya Matahari"],
    correct:0
},

{
    id:"batch4-169",
    category:"Geologi",
    difficulty:"extreme",
    question:"Batas antara kerak Bumi dan mantel dikenal sebagai?",
    answers:["Diskontinuitas Mohorovičić","Event horizon","Garis Kármán","Zona Van Allen"],
    correct:0
},

{
    id:"batch4-170",
    category:"Geologi",
    difficulty:"extreme",
    question:"Lapisan Bumi yang terutama tersusun dari besi dan nikel adalah?",
    answers:["Inti","Kerak","Litosfer","Atmosfer"],
    correct:0
},

{
    id:"batch4-171",
    category:"Astronomi",
    difficulty:"easy",
    question:"Bumi mengorbit?",
    answers:["Matahari","Bulan","Mars","Jupiter"],
    correct:0
},

{
    id:"batch4-172",
    category:"Astronomi",
    difficulty:"medium",
    question:"Planet terbesar Tata Surya adalah?",
    answers:["Bumi","Saturnus","Jupiter","Neptunus"],
    correct:2
},

{
    id:"batch4-173",
    category:"Astronomi",
    difficulty:"hard",
    question:"Galaksi tempat Tata Surya berada disebut?",
    answers:["Andromeda","Bima Sakti","Triangulum","Sombrero"],
    correct:1
},

{
    id:"batch4-174",
    category:"Astronomi",
    difficulty:"extreme",
    question:"Bintang terdekat dengan Matahari adalah?",
    answers:["Sirius","Proxima Centauri","Betelgeuse","Vega"],
    correct:1
},

{
    id:"batch4-175",
    category:"Biologi",
    difficulty:"easy",
    question:"Organ utama manusia untuk bernapas adalah?",
    answers:["Paru-paru","Jantung","Ginjal","Lambung"],
    correct:0
},

{
    id:"batch4-176",
    category:"Biologi",
    difficulty:"medium",
    question:"Molekul yang membawa informasi genetik pada sebagian besar makhluk hidup adalah?",
    answers:["DNA","ATP","Glukosa","Air"],
    correct:0
},

{
    id:"batch4-177",
    category:"Biologi",
    difficulty:"hard",
    question:"Organel yang menghasilkan sebagian besar energi sel disebut?",
    answers:["Mitokondria","Ribosom","Nukleus","Vakuola"],
    correct:0
},

{
    id:"batch4-178",
    category:"Biologi",
    difficulty:"extreme",
    question:"Proses pembelahan sel yang menghasilkan dua sel anak identik disebut?",
    answers:["Mitosis","Meiosis","Fotosintesis","Transkripsi"],
    correct:0
},

{
    id:"batch4-179",
    category:"Fisika",
    difficulty:"easy",
    question:"Satuan SI untuk gaya adalah?",
    answers:["Joule","Newton","Watt","Pascal"],
    correct:1
},

{
    id:"batch4-180",
    category:"Fisika",
    difficulty:"medium",
    question:"Kecepatan adalah perubahan posisi terhadap?",
    answers:["Waktu","Massa","Suhu","Volume"],
    correct:0
},

{
    id:"batch4-181",
    category:"Fisika",
    difficulty:"hard",
    question:"Hukum Newton pertama dikenal sebagai hukum?",
    answers:["Inersia","Gravitasi","Aksi reaksi","Energi"],
    correct:0
},

{
    id:"batch4-182",
    category:"Fisika",
    difficulty:"extreme",
    question:"Partikel cahaya dalam fisika kuantum disebut?",
    answers:["Foton","Proton","Neutron","Elektron"],
    correct:0
},

{
    id:"batch4-183",
    category:"Kimia",
    difficulty:"easy",
    question:"Rumus kimia air adalah?",
    answers:["CO2","H2O","O2","NaCl"],
    correct:1
},

{
    id:"batch4-184",
    category:"Kimia",
    difficulty:"medium",
    question:"Unsur dengan simbol Au adalah?",
    answers:["Perak","Emas","Aluminium","Argon"],
    correct:1
},

{
    id:"batch4-185",
    category:"Kimia",
    difficulty:"hard",
    question:"pH kurang dari 7 umumnya menunjukkan larutan?",
    answers:["Asam","Basa","Netral","Logam"],
    correct:0
},

{
    id:"batch4-186",
    category:"Kimia",
    difficulty:"extreme",
    question:"Ikatan kimia yang terbentuk melalui penggunaan bersama pasangan elektron disebut?",
    answers:["Kovalen","Ionik","Logam","Nuklir"],
    correct:0
},

{
    id:"batch4-187",
    category:"Geografi",
    difficulty:"easy",
    question:"Benua terbesar di dunia adalah?",
    answers:["Afrika","Asia","Eropa","Australia"],
    correct:1
},

{
    id:"batch4-188",
    category:"Geografi",
    difficulty:"medium",
    question:"Sungai terpanjang di Amerika Selatan adalah?",
    answers:["Amazon","Nil","Yangtze","Mississippi"],
    correct:0
},

{
    id:"batch4-189",
    category:"Geografi",
    difficulty:"hard",
    question:"Gunung Everest berada di pegunungan?",
    answers:["Andes","Alpen","Himalaya","Rocky"],
    correct:2
},

{
    id:"batch4-190",
    category:"Geografi",
    difficulty:"extreme",
    question:"Negara yang memiliki wilayah daratan terluas di dunia adalah?",
    answers:["Kanada","Rusia","Tiongkok","Amerika Serikat"],
    correct:1
},

{
    id:"batch4-191",
    category:"PPKN",
    difficulty:"easy",
    question:"Dasar negara Indonesia adalah?",
    answers:["Pancasila","UUD 1945","Bhinneka Tunggal Ika","Proklamasi"],
    correct:0
},

{
    id:"batch4-192",
    category:"PPKN",
    difficulty:"medium",
    question:"Semboyan Bhinneka Tunggal Ika berarti?",
    answers:["Berbeda-beda tetapi tetap satu","Satu negara satu suku","Bersatu tanpa perbedaan","Merdeka selamanya"],
    correct:0
},

{
    id:"batch4-193",
    category:"Bahasa Indonesia",
    difficulty:"easy",
    question:"Lawan kata dari 'tinggi' adalah?",
    answers:["Besar","Rendah","Panjang","Lebar"],
    correct:1
},

{
    id:"batch4-194",
    category:"Bahasa Indonesia",
    difficulty:"medium",
    question:"Gagasan utama sebuah paragraf disebut?",
    answers:["Ide pokok","Kata sambung","Judul","Kalimat penutup"],
    correct:0
},

{
    id:"batch4-195",
    category:"Bahasa Indonesia",
    difficulty:"hard",
    question:"Majas yang membandingkan dua hal secara langsung disebut?",
    answers:["Metafora","Ironi","Litotes","Repetisi"],
    correct:0
},

{
    id:"batch4-196",
    category:"Bahasa Inggris",
    difficulty:"easy",
    question:"What is the opposite of 'big'?",
    answers:["Small","Long","High","Fast"],
    correct:0
},

{
    id:"batch4-197",
    category:"Bahasa Inggris",
    difficulty:"medium",
    question:"What is the past tense of 'eat'?",
    answers:["Eated","Ate","Eaten","Eating"],
    correct:1
},

{
    id:"batch4-198",
    category:"Bahasa Inggris",
    difficulty:"hard",
    question:"What is the closest meaning of 'ancient'?",
    answers:["Very old","Very fast","Very large","Very new"],
    correct:0
},

{
    id:"batch4-199",
    category:"Pengetahuan Umum",
    difficulty:"hard",
    question:"Samudra terbesar di dunia adalah?",
    answers:["Atlantik","Pasifik","Hindia","Arktik"],
    correct:1
},

{
    id:"batch4-200",
    category:"Pengetahuan Umum",
    difficulty:"extreme",
    question:"Ibu kota Australia adalah?",
    answers:["Sydney","Melbourne","Canberra","Perth"],
    correct:2
},
/* ================= BATCH 5 ================= */

    {
        id:"sport-041",
        category:"Sepak Bola",
        difficulty:"easy",
        question:"Berapa jumlah pemain dalam satu tim sepak bola yang berada di lapangan saat pertandingan dimulai?",
        answers:["9","10","11","12"],
        correct:2
    },

    {
        id:"sport-042",
        category:"Sepak Bola",
        difficulty:"easy",
        question:"Berapa lama waktu normal pertandingan sepak bola?",
        answers:["60 menit","70 menit","90 menit","120 menit"],
        correct:2
    },

    {
        id:"sport-043",
        category:"Sepak Bola",
        difficulty:"medium",
        question:"Klub sepak bola Manchester United didirikan pada tahun?",
        answers:["1878","1888","1898","1908"],
        correct:0
    },

    {
        id:"sport-044",
        category:"Sepak Bola",
        difficulty:"medium",
        question:"FC Barcelona didirikan pada tahun?",
        answers:["1899","1905","1910","1920"],
        correct:0
    },

    {
        id:"sport-045",
        category:"Sepak Bola",
        difficulty:"hard",
        question:"Real Madrid didirikan pada tahun?",
        answers:["1897","1902","1910","1912"],
        correct:1
    },

    {
        id:"sport-046",
        category:"Sepak Bola",
        difficulty:"hard",
        question:"Klub Liverpool FC didirikan pada tahun?",
        answers:["1888","1892","1900","1905"],
        correct:1
    },

    {
        id:"sport-047",
        category:"Sepak Bola",
        difficulty:"extreme",
        question:"Klub sepak bola mana yang didirikan pada tahun 1897 dengan nama Sport Club Corinthians Paulista?",
        answers:["Corinthians","Flamengo","Santos","Palmeiras"],
        correct:0
    },

    {
        id:"sport-048",
        category:"Sepak Bola",
        difficulty:"extreme",
        question:"Piala Dunia FIFA pertama kali diselenggarakan pada tahun?",
        answers:["1926","1930","1934","1938"],
        correct:1
    },

    {
        id:"sport-049",
        category:"Sepak Bola",
        difficulty:"easy",
        question:"Negara yang menjadi juara Piala Dunia 2022 adalah?",
        answers:["Prancis","Brasil","Argentina","Jerman"],
        correct:2
    },

    {
        id:"sport-050",
        category:"Sepak Bola",
        difficulty:"medium",
        question:"Stadion Camp Nou secara historis merupakan markas klub?",
        answers:["Real Madrid","Barcelona","Valencia","Sevilla"],
        correct:1
    },


    /* ================= MOTOGP ================= */

    {
        id:"motogp-041",
        category:"MotoGP",
        difficulty:"easy",
        question:"MotoGP merupakan kelas utama dalam kejuaraan dunia balap?",
        answers:["Mobil","Motor","Sepeda","Kart"],
        correct:1
    },

    {
        id:"motogp-042",
        category:"MotoGP",
        difficulty:"easy",
        question:"Valentino Rossi dikenal sebagai pembalap dari negara?",
        answers:["Italia","Spanyol","Prancis","Brasil"],
        correct:0
    },

    {
        id:"motogp-043",
        category:"MotoGP",
        difficulty:"medium",
        question:"Marc Márquez berasal dari negara?",
        answers:["Italia","Spanyol","Portugal","Argentina"],
        correct:1
    },

    {
        id:"motogp-044",
        category:"MotoGP",
        difficulty:"medium",
        question:"Tim Yamaha secara historis menggunakan merek motor?",
        answers:["Yamaha","Honda","Ducati","Suzuki"],
        correct:0
    },

    {
        id:"motogp-045",
        category:"MotoGP",
        difficulty:"hard",
        question:"Ducati merupakan produsen sepeda motor yang berasal dari?",
        answers:["Italia","Jepang","Jerman","Inggris"],
        correct:0
    },

    {
        id:"motogp-046",
        category:"MotoGP",
        difficulty:"hard",
        question:"Honda merupakan perusahaan otomotif yang berasal dari?",
        answers:["Jepang","Italia","Spanyol","Austria"],
        correct:0
    },

    {
        id:"motogp-047",
        category:"MotoGP",
        difficulty:"extreme",
        question:"Siapa pembalap yang dikenal dengan julukan 'The Doctor'?",
        answers:["Marc Márquez","Valentino Rossi","Jorge Lorenzo","Dani Pedrosa"],
        correct:1
    },

    {
        id:"motogp-048",
        category:"MotoGP",
        difficulty:"extreme",
        question:"Sirkuit Mugello berada di negara?",
        answers:["Italia","Spanyol","Prancis","Belanda"],
        correct:0
    },

    {
        id:"motogp-049",
        category:"MotoGP",
        difficulty:"easy",
        question:"Dalam balap motor, bendera kotak-kotak biasanya menandakan?",
        answers:["Start","Hujan","Finish","Penalty"],
        correct:2
    },

    {
        id:"motogp-050",
        category:"MotoGP",
        difficulty:"medium",
        question:"Jorge Lorenzo merupakan pembalap yang berasal dari?",
        answers:["Spanyol","Italia","Jepang","Austria"],
        correct:0
    },


    /* ================= VOLI ================= */

    {
        id:"volley-041",
        category:"Voli",
        difficulty:"easy",
        question:"Berapa pemain dari satu tim voli yang berada di lapangan?",
        answers:["5","6","7","8"],
        correct:1
    },

    {
        id:"volley-042",
        category:"Voli",
        difficulty:"easy",
        question:"Olahraga voli dimainkan dengan memisahkan dua tim menggunakan?",
        answers:["Garis","Jaring","Papan","Tali"],
        correct:1
    },

    {
        id:"volley-043",
        category:"Voli",
        difficulty:"medium",
        question:"Pemain bertahan khusus dalam permainan voli disebut?",
        answers:["Striker","Libero","Keeper","Sweeper"],
        correct:1
    },

    {
        id:"volley-044",
        category:"Voli",
        difficulty:"medium",
        question:"Federasi bola voli internasional dikenal dengan singkatan?",
        answers:["FIFA","FIVB","IOC","IBF"],
        correct:1
    },

    {
        id:"volley-045",
        category:"Voli",
        difficulty:"hard",
        question:"Dalam sistem rally point, set biasa bola voli umumnya dimenangkan oleh tim yang mencapai?",
        answers:["15 poin","21 poin","25 poin","30 poin"],
        correct:2
    },

    {
        id:"volley-046",
        category:"Voli",
        difficulty:"hard",
        question:"Negara yang dikenal memiliki tradisi kuat dalam bola voli putri adalah?",
        answers:["Brasil","Islandia","Nepal","Irlandia"],
        correct:0
    },

    {
        id:"volley-047",
        category:"Voli",
        difficulty:"extreme",
        question:"Olimpiade pertama kali mempertandingkan bola voli sebagai cabang resmi pada tahun?",
        answers:["1956","1960","1964","1968"],
        correct:2
    },

    {
        id:"volley-048",
        category:"Voli",
        difficulty:"extreme",
        question:"Pukulan keras menyerang dalam permainan voli biasanya disebut?",
        answers:["Smash","Dribble","Tackle","Serve-out"],
        correct:0
    },

    {
        id:"volley-049",
        category:"Voli",
        difficulty:"easy",
        question:"Pukulan untuk memulai rally dalam bola voli disebut?",
        answers:["Servis","Blok","Smash","Set"],
        correct:0
    },

    {
        id:"volley-050",
        category:"Voli",
        difficulty:"medium",
        question:"Gerakan membendung serangan lawan di dekat net disebut?",
        answers:["Blocking","Passing","Serving","Digging"],
        correct:0
    },


    /* ================= LOGIKA ================= */

    {
        id:"logic-041",
        category:"Logika",
        difficulty:"easy",
        question:"Jika semua kucing adalah hewan dan Miko adalah kucing, maka Miko adalah?",
        answers:["Tumbuhan","Hewan","Benda mati","Tidak diketahui"],
        correct:1
    },

    {
        id:"logic-042",
        category:"Logika",
        difficulty:"easy",
        question:"Angka berikutnya: 2, 4, 6, 8, ...?",
        answers:["9","10","11","12"],
        correct:1
    },

    {
        id:"logic-043",
        category:"Logika",
        difficulty:"medium",
        question:"Angka berikutnya: 3, 6, 12, 24, ...?",
        answers:["36","42","48","54"],
        correct:2
    },

    {
        id:"logic-044",
        category:"Logika",
        difficulty:"medium",
        question:"Jika hari ini Senin, maka 10 hari lagi adalah?",
        answers:["Rabu","Kamis","Jumat","Sabtu"],
        correct:1
    },

    {
        id:"logic-045",
        category:"Logika",
        difficulty:"hard",
        question:"Semua A adalah B. Tidak ada B yang merupakan C. Kesimpulan yang benar adalah?",
        answers:[
            "Semua A adalah C",
            "Tidak ada A yang merupakan C",
            "Sebagian A pasti C",
            "A dan C pasti sama"
        ],
        correct:1
    },

    {
        id:"logic-046",
        category:"Logika",
        difficulty:"hard",
        question:"Jika 5 mesin membuat 5 benda dalam 5 menit, berapa waktu yang diperlukan 100 mesin untuk membuat 100 benda?",
        answers:["5 menit","20 menit","100 menit","500 menit"],
        correct:0
    },

    {
        id:"logic-047",
        category:"Logika",
        difficulty:"extreme",
        question:"Sebuah pola memiliki urutan 1, 1, 2, 3, 5, 8, ... Angka berikutnya adalah?",
        answers:["11","12","13","15"],
        correct:2
    },

    {
        id:"logic-048",
        category:"Logika",
        difficulty:"extreme",
        question:"Jika setiap X adalah Y dan setiap Y adalah Z, maka hubungan yang pasti benar adalah?",
        answers:[
            "Setiap X adalah Z",
            "Setiap Z adalah X",
            "Tidak ada X yang Z",
            "X dan Z selalu sama jumlahnya"
        ],
        correct:0
    },

    {
        id:"logic-049",
        category:"Logika",
        difficulty:"easy",
        question:"Mana yang berbeda dari yang lain?",
        answers:["Segitiga","Persegi","Lingkaran","Kubus"],
        correct:3
    },

    {
        id:"logic-050",
        category:"Logika",
        difficulty:"medium",
        question:"Jika 1 = 3, 2 = 6, 3 = 9, maka 7 = ?",
        answers:["14","18","21","24"],
        correct:2
    },


    /* ================= APLIKASI & TEKNOLOGI ================= */

    {
        id:"apps-041",
        category:"Aplikasi",
        difficulty:"easy",
        question:"Aplikasi yang dikenal sebagai layanan berbagi video milik Google adalah?",
        answers:["YouTube","Telegram","Spotify","Discord"],
        correct:0
    },

    {
        id:"apps-042",
        category:"Aplikasi",
        difficulty:"easy",
        question:"Aplikasi yang populer untuk pesan instan dan menggunakan logo berbentuk gelembung telepon adalah?",
        answers:["WhatsApp","Excel","Chrome","Steam"],
        correct:0
    },

    {
        id:"apps-043",
        category:"Aplikasi",
        difficulty:"medium",
        question:"Google Maps terutama digunakan untuk?",
        answers:[
            "Navigasi dan peta",
            "Mengedit musik",
            "Menggambar 3D",
            "Membuat antivirus"
        ],
        correct:0
    },

    {
        id:"apps-044",
        category:"Aplikasi",
        difficulty:"medium",
        question:"Spotify terutama digunakan untuk?",
        answers:[
            "Streaming musik dan audio",
            "Mengedit dokumen",
            "Membuat spreadsheet",
            "Menggambar"
        ],
        correct:0
    },

    {
        id:"apps-045",
        category:"Aplikasi",
        difficulty:"hard",
        question:"Aplikasi Discord pada awalnya sangat populer di kalangan komunitas?",
        answers:["Gamer","Petani","Astronom","Pilot"],
        correct:0
    },

    {
        id:"apps-046",
        category:"Aplikasi",
        difficulty:"hard",
        question:"Aplikasi yang dikembangkan untuk membuat dan mengedit dokumen secara online oleh Google adalah?",
        answers:["Google Docs","Google Earth","Google Photos","Google Drive"],
        correct:0
    },

    {
        id:"apps-047",
        category:"Aplikasi",
        difficulty:"extreme",
        question:"Android merupakan sistem operasi yang dikembangkan dengan basis kernel?",
        answers:["Linux","DOS","Solaris","BSD"],
        correct:0
    },

    {
        id:"apps-048",
        category:"Aplikasi",
        difficulty:"extreme",
        question:"Google Play Store terutama berfungsi sebagai tempat untuk?",
        answers:[
            "Mendapatkan aplikasi dan game Android",
            "Mengedit BIOS",
            "Mengontrol satelit",
            "Membuat prosesor"
        ],
        correct:0
    },

    {
        id:"apps-049",
        category:"Aplikasi",
        difficulty:"easy",
        question:"Aplikasi Microsoft yang digunakan untuk membuat presentasi adalah?",
        answers:["PowerPoint","Paint","Notepad","Access"],
        correct:0
    },

    {
        id:"apps-050",
        category:"Aplikasi",
        difficulty:"medium",
        question:"Aplikasi Google yang digunakan untuk penyimpanan file berbasis cloud adalah?",
        answers:["Google Drive","Google Maps","Google Translate","Google News"],
        correct:0
    },


    /* ================= SEJARAH ================= */

    {
        id:"history-041",
        category:"Sejarah",
        difficulty:"easy",
        question:"Peradaban Mesir Kuno berkembang di sepanjang sungai?",
        answers:["Nil","Amazon","Gangga","Yangtze"],
        correct:0
    },

    {
        id:"history-042",
        category:"Sejarah",
        difficulty:"easy",
        question:"Tembok Besar merupakan bangunan bersejarah yang berada di?",
        answers:["Jepang","China","India","Korea Selatan"],
        correct:1
    },

    {
        id:"history-043",
        category:"Sejarah",
        difficulty:"medium",
        question:"Kekaisaran Romawi berkembang pesat di sekitar wilayah?",
        answers:["Laut Mediterania","Laut Baltik","Samudra Arktik","Laut Karibia"],
        correct:0
    },

    {
        id:"history-044",
        category:"Sejarah",
        difficulty:"medium",
        question:"Revolusi Industri pertama kali berkembang pesat di?",
        answers:["Inggris","Brasil","Mesir","Australia"],
        correct:0
    },

    {
        id:"history-045",
        category:"Sejarah",
        difficulty:"hard",
        question:"Peradaban Maya berkembang terutama di wilayah?",
        answers:[
            "Mesoamerika",
            "Skandinavia",
            "Siberia",
            "Australia"
        ],
        correct:0
    },

    {
        id:"history-046",
        category:"Sejarah",
        difficulty:"hard",
        question:"Kota Pompeii terkenal karena terkubur akibat letusan gunung?",
        answers:["Vesuvius","Etna","Fuji","Kilimanjaro"],
        correct:0
    },

    {
        id:"history-047",
        category:"Sejarah",
        difficulty:"extreme",
        question:"Perjanjian Tordesillas pada abad ke-15 terutama berkaitan dengan pembagian wilayah pengaruh antara?",
        answers:[
            "Spanyol dan Portugal",
            "Inggris dan Prancis",
            "Jerman dan Italia",
            "Rusia dan Jepang"
        ],
        correct:0
    },

    {
        id:"history-048",
        category:"Sejarah",
        difficulty:"extreme",
        question:"Kota Konstantinopel ditaklukkan oleh Kesultanan Utsmaniyah pada tahun?",
        answers:["1354","1453","1553","1653"],
        correct:1
    },

    {
        id:"history-049",
        category:"Sejarah",
        difficulty:"easy",
        question:"Piramida Giza berada di negara?",
        answers:["Mesir","Yunani","Turki","Iran"],
        correct:0
    },

    {
        id:"history-050",
        category:"Sejarah",
        difficulty:"medium",
        question:"Samurai merupakan kelompok pejuang yang terkenal dalam sejarah?",
        answers:["Jepang","India","Mesir","Meksiko"],
        correct:0
    },


    /* ================= GEOLOGI ================= */

    {
        id:"geology-041",
        category:"Geologi",
        difficulty:"easy",
        question:"Lapisan terluar Bumi disebut?",
        answers:["Inti dalam","Mantel","Kerak","Inti luar"],
        correct:2
    },

    {
        id:"geology-042",
        category:"Geologi",
        difficulty:"easy",
        question:"Batuan yang terbentuk dari pendinginan magma disebut batuan?",
        answers:["Sedimen","Beku","Metamorf","Organik"],
        correct:1
    },

    {
        id:"geology-043",
        category:"Geologi",
        difficulty:"medium",
        question:"Pergerakan lempeng tektonik dapat menyebabkan?",
        answers:[
            "Gempa bumi",
            "Pelangi",
            "Gerhana",
            "Pasang surut saja"
        ],
        correct:0
    },

    {
        id:"geology-044",
        category:"Geologi",
        difficulty:"medium",
        question:"Batuan yang terbentuk dari pengendapan material disebut batuan?",
        answers:["Beku","Sedimen","Metamorf","Magmatik saja"],
        correct:1
    },

    {
        id:"geology-045",
        category:"Geologi",
        difficulty:"hard",
        question:"Skala Mohs digunakan untuk mengukur?",
        answers:["Kekerasan mineral","Suhu magma","Kedalaman laut","Kecepatan angin"],
        correct:0
    },

    {
        id:"geology-046",
        category:"Geologi",
        difficulty:"hard",
        question:"Mineral utama penyusun kerak Bumi banyak berasal dari kelompok?",
        answers:["Silikat","Halogen","Gas mulia","Logam alkali saja"],
        correct:0
    },

    {
        id:"geology-047",
        category:"Geologi",
        difficulty:"extreme",
        question:"Batas antara kerak Bumi dan mantel dikenal sebagai?",
        answers:["Moho","Horizon","Termoklin","Hadley"],
        correct:0
    },

    {
        id:"geology-048",
        category:"Geologi",
        difficulty:"extreme",
        question:"Arus konveksi di mantel Bumi berperan dalam?",
        answers:[
            "Pergerakan lempeng tektonik",
            "Pembentukan awan",
            "Pergantian siang dan malam",
            "Gerhana Matahari"
        ],
        correct:0
    },

    {
        id:"geology-049",
        category:"Geologi",
        difficulty:"easy",
        question:"Gunung api yang masih dapat mengalami erupsi disebut gunung api?",
        answers:["Aktif","Mati total","Buatan","Sedimen"],
        correct:0
    },

    {
        id:"geology-050",
        category:"Geologi",
        difficulty:"medium",
        question:"Fosil paling sering ditemukan dalam batuan?",
        answers:["Sedimen","Beku","Metamorf tingkat tinggi","Magma"],
        correct:0
    },


    /* ================= GEOGRAFI ================= */

    {
        id:"geo-041",
        category:"Geografi",
        difficulty:"easy",
        question:"Benua dengan wilayah daratan terbesar adalah?",
        answers:["Asia","Afrika","Eropa","Antarktika"],
        correct:0
    },

    {
        id:"geo-042",
        category:"Geografi",
        difficulty:"easy",
        question:"Sungai Amazon berada terutama di benua?",
        answers:["Asia","Amerika Selatan","Afrika","Eropa"],
        correct:1
    },

    {
        id:"geo-043",
        category:"Geografi",
        difficulty:"medium",
        question:"Pegunungan Andes berada di sepanjang sisi barat benua?",
        answers:["Afrika","Amerika Selatan","Asia","Australia"],
        correct:1
    },

    {
        id:"geo-044",
        category:"Geografi",
        difficulty:"medium",
        question:"Gurun Sahara berada di benua?",
        answers:["Afrika","Asia","Australia","Eropa"],
        correct:0
    },

    {
        id:"geo-045",
        category:"Geografi",
        difficulty:"hard",
        question:"Danau air tawar berdasarkan luas permukaan yang terbesar di dunia adalah?",
        answers:["Superior","Victoria","Baikal","Titicaca"],
        correct:0
    },

    {
        id:"geo-046",
        category:"Geografi",
        difficulty:"hard",
        question:"Negara yang wilayahnya berada di dua benua, Eropa dan Asia, adalah?",
        answers:["Turki","Jepang","Mesir saja","Brasil"],
        correct:0
    },

    {
        id:"geo-047",
        category:"Geografi",
        difficulty:"extreme",
        question:"Selat yang memisahkan Asia dan Amerika Utara adalah?",
        answers:["Selat Bering","Selat Gibraltar","Selat Malaka","Selat Bosporus"],
        correct:0
    },

    {
        id:"geo-048",
        category:"Geografi",
        difficulty:"extreme",
        question:"Titik terdalam yang diketahui di lautan Bumi berada di?",
        answers:["Challenger Deep","Java Deep","Sunda Deep","Puerto Rico Trench"],
        correct:0
    },

    {
        id:"geo-049",
        category:"Geografi",
        difficulty:"easy",
        question:"Ibu kota Kanada adalah?",
        answers:["Toronto","Vancouver","Ottawa","Montreal"],
        correct:2
    },

    {
        id:"geo-050",
        category:"Geografi",
        difficulty:"medium",
        question:"Ibu kota Brasil adalah?",
        answers:["Rio de Janeiro","São Paulo","Brasília","Salvador"],
        correct:2
    },


    /* ================= SAINS UMUM ================= */

    {
        id:"science-041",
        category:"Sains",
        difficulty:"easy",
        question:"Air membeku pada suhu Celsius berapa pada tekanan atmosfer standar?",
        answers:["0°C","10°C","50°C","100°C"],
        correct:0
    },

    {
        id:"science-042",
        category:"Sains",
        difficulty:"easy",
        question:"Gas yang diperlukan manusia untuk respirasi adalah?",
        answers:["Oksigen","Nitrogen","Helium","Neon"],
        correct:0
    },

    {
        id:"science-043",
        category:"Sains",
        difficulty:"medium",
        question:"Kecepatan cahaya di ruang hampa kira-kira?",
        answers:[
            "30.000 km/s",
            "300.000 km/s",
            "3.000 km/s",
            "3.000.000 km/s"
        ],
        correct:1
    },

    {
        id:"science-044",
        category:"Sains",
        difficulty:"medium",
        question:"Gaya yang menarik benda menuju pusat Bumi disebut?",
        answers:["Gesekan","Gravitasi","Magnet","Dorongan"],
        correct:1
    },

    {
        id:"science-045",
        category:"Sains",
        difficulty:"hard",
        question:"Partikel pembawa gaya elektromagnetik adalah?",
        answers:["Foton","Proton","Neutron","Gluon"],
        correct:0
    },

    {
        id:"science-046",
        category:"Sains",
        difficulty:"hard",
        question:"Hukum pertama termodinamika berkaitan dengan prinsip?",
        answers:[
            "Kekekalan energi",
            "Kekekalan massa saja",
            "Relativitas",
            "Seleksi alam"
        ],
        correct:0
    },

    {
        id:"science-047",
        category:"Sains",
        difficulty:"extreme",
        question:"Partikel yang menjadi pembawa interaksi kuat dalam Model Standar adalah?",
        answers:["Gluon","Foton","Elektron","Neutrino"],
        correct:0
    },

    {
        id:"science-048",
        category:"Sains",
        difficulty:"extreme",
        question:"Dalam fisika, entropi secara umum berkaitan dengan?",
        answers:[
            "Jumlah keadaan mikroskopis dan ketidakteraturan sistem",
            "Massa benda saja",
            "Kecepatan cahaya",
            "Muatan elektron"
        ],
        correct:0
    },

    {
        id:"science-049",
        category:"Sains",
        difficulty:"easy",
        question:"Planet tempat manusia tinggal adalah?",
        answers:["Mars","Bumi","Venus","Jupiter"],
        correct:1
    },

    {
        id:"science-050",
        category:"Sains",
        difficulty:"medium",
        question:"Fotosintesis menghasilkan glukosa dengan memanfaatkan energi dari?",
        answers:["Cahaya","Suara","Magnet","Gesekan"],
        correct:0
    },
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
   AUTO RESET RIWAYAT SOAL
===================================================== */

function resetPlayerQuestionHistoryIfNeeded(player) {

    const history = loadHistory();
    const key = normalizePlayerName(player);

    if (!history[key]) {
        return;
    }

    if (
        history[key].answered.length >=
        QUESTION_BANK.length
    ) {

        history[key].answered = [];

        saveHistory(history);

        console.log(
            "Bank soal habis. Riwayat soal di-reset."
        );
    }
}
/* =====================================================
   MEMILIH SOAL
===================================================== */

function buildQuestionSet() {

    resetPlayerQuestionHistoryIfNeeded(state.player);

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
  /* =====================================================
   MENU TITIK TIGA
===================================================== */

const menuBtn =
    document.getElementById("menu-btn");

const menuDropdown =
    document.getElementById("menu-dropdown");

const menuHome =
    document.getElementById("menu-home");

const menuReset =
    document.getElementById("menu-reset");

const menuInfo =
    document.getElementById("menu-info");

const infoModal =
    document.getElementById("info-modal");

const closeInfo =
    document.getElementById("close-info");


/* BUKA / TUTUP MENU */

if (menuBtn) {

    menuBtn.addEventListener("click", event => {

        event.stopPropagation();

        menuDropdown.classList.toggle("show");

    });
}


/* KLIK DI LUAR MENU */

document.addEventListener("click", event => {

    if (
        menuDropdown &&
        !menuDropdown.contains(event.target) &&
        event.target !== menuBtn
    ) {

        menuDropdown.classList.remove("show");

    }

});


/* =========================================
   BERANDA
========================================= */

if (menuHome) {

    menuHome.addEventListener("click", () => {

        clearTimer();

        menuDropdown.classList.remove("show");

        showScreen(screens.lobby);

    });

}


/* =========================================
   RESET RIWAYAT
========================================= */

if (menuReset) {

    menuReset.addEventListener("click", () => {

        const confirmReset =
            confirm(
                "Hapus seluruh riwayat soal pemain ini?"
            );

        if (!confirmReset) {
            return;
        }

        const player =
            playerNameInput.value.trim();

        if (!player) {

            showNotification(
                "⚠️",
                "Masukkan nama pemain terlebih dahulu.",
                true
            );

            return;
        }

        const history =
            loadHistory();

        const key =
            normalizePlayerName(player);

        delete history[key];

        saveHistory(history);

        menuDropdown.classList.remove("show");

        showNotification(
            "✓",
            "Riwayat pemain berhasil direset."
        );

    });

}


/* =========================================
   TENTANG QUIZZZ
========================================= */

if (menuInfo) {

    menuInfo.addEventListener("click", () => {

        menuDropdown.classList.remove("show");

        infoModal.classList.add("show");

    });

}


/* =========================================
   TUTUP INFO
========================================= */

if (closeInfo) {

    closeInfo.addEventListener("click", () => {

        infoModal.classList.remove("show");

    });

}


/* KLIK BACKDROP */

if (infoModal) {

    infoModal.addEventListener("click", event => {

        if (event.target === infoModal) {

            infoModal.classList.remove("show");

        }

    });

}