export interface Movie {
  id: number;
  title: string;
  year: number;
  overview: string;
  poster: string;          // TMDB poster path (full URL)
  backdrop?: string;       // TMDB backdrop path
  rating: number;          // 0-10
  genres: string[];
  country: string;         // "ID", "US", "KR", "JP", etc.
  language: string;
  runtime?: number;        // minutes
  trailer?: string;        // YouTube key
  type: "movie" | "series";
}

// TMDB image base URL — no API key needed for public CDN
export const TMDB_IMG = "https://image.tmdb.org/t/p";

// Pre-populated curated movies — works immediately without TMDB API key
// Poster URL = `${TMDB_IMG}/w500${poster_path}`
// Backdrop URL = `${TMDB_IMG}/w1280${backdrop_path}`
export const MOVIES: Movie[] = [
  // ─── INDONESIAN MOVIES ───
  {
    id: 1, title: "Pengabdi Setan 2: Communion", year: 2022,
    overview: "Setelah peristiwa mengerikan di rumah susun, Rini dan keluarganya harus menghadapi teror baru yang lebih mengerikan. Ibu mereka yang sudah meninggal kembali dengan cara yang tak terduga.",
    poster: "/tM3zb8nfhp5ttez60Im6qmesL17.jpg", backdrop: "/aC23Pt6Eha0nfp4zymqPZrv9tJR.jpg",
    rating: 7.2, genres: ["Horror", "Thriller"], country: "ID", language: "id", runtime: 119, type: "movie"
  },
  {
    id: 2, title: "KKN di Desa Penari", year: 2022,
    overview: "Enam mahasiswa yang sedang menjalani KKN di sebuah desa terpencil mulai mengalami kejadian-kejadian mistis yang mengancam nyawa mereka. Berdasarkan kisah nyata yang viral.",
    poster: "/ozjM8A0QYLIgl9rKdiw5Q495nxS.jpg", backdrop: "/6VUqlpnVRT56CX6D1lZsgpW3H3P.jpg",
    rating: 7.0, genres: ["Horror", "Thriller"], country: "ID", language: "id", runtime: 121, type: "movie"
  },
  {
    id: 3, title: "Agak Laen", year: 2024,
    overview: "Empat orang yang bekerja di rumah hantu di sebuah pasar malam harus menghadapi kejadian nyata yang lebih menakutkan dari atraksi mereka. Komedi horor dengan twist tak terduga.",
    poster: "/5WdYwFLrYSVIFyRJVM8vB6wFJyH.jpg", backdrop: "/qH2mPtMfBtBDxBes8pUfMZzNgME.jpg",
    rating: 7.5, genres: ["Comedy", "Horror"], country: "ID", language: "id", runtime: 115, type: "movie"
  },
  {
    id: 4, title: "Sewu Dino", year: 2023,
    overview: "Seorang gadis harus menyelesaikan ritual seribu hari untuk membuka segel kutukan keluarganya. Semakin mendekati hari terakhir, teror semakin nyata dan mengancam jiwanya.",
    poster: "/64FGjmjsgMFYXn349xqGFEJ1plic.jpg", backdrop: "/dv7D2aeTSDQXSYXmVL0pz7TTrX2.jpg",
    rating: 6.8, genres: ["Horror", "Mystery"], country: "ID", language: "id", runtime: 118, type: "movie"
  },
  {
    id: 5, title: "Dilan 1990", year: 2018,
    overview: "Kisah cinta klasik antara Dilan, seorang siswa SMA yang populer dan pemberani, dengan Milea, siswi pindahan yang cantik. Berlatar belakang Bandung tahun 1990.",
    poster: "/kwJusPl9NyjDVompYyKRkrUWVEH.jpg", backdrop: "/j7LsRZqBPE9LRkeby9eBJsHaBrb.jpg",
    rating: 7.3, genres: ["Romance", "Drama"], country: "ID", language: "id", runtime: 110, type: "movie"
  },
  {
    id: 6, title: "Milea: Suara dari Dilan", year: 2020,
    overview: "Kelanjutan kisah Dilan dan Milea. Di tahun 1991, hubungan mereka diuji oleh jarak dan perbedaan pilihan hidup. Dilan bergabung dengan organisasi sementara Milea fokus pada kuliah.",
    poster: "/3iBITHJfn6ox95Osj4J81QjpQS3.jpg", backdrop: "/mvcnGaPosOh1BPHG8ixcFGbE8K4.jpg",
    rating: 7.1, genres: ["Romance", "Drama"], country: "ID", language: "id", runtime: 118, type: "movie"
  },
  {
    id: 7, title: "Laskar Pelangi", year: 2008,
    overview: "Kisah sepuluh anak dari keluarga miskin di Belitung yang bersekolah di SD Muhammadiyah yang hampir bangkrut. Dengan semangat dan mimpi, mereka melawan keterbatasan demi pendidikan.",
    poster: "/gZYcWM9MRyvxRKiQO4Qrn95tz2M.jpg", backdrop: "/vSxAl6vGV4i2dUtq1R5y2FPzIsX.jpg",
    rating: 8.0, genres: ["Drama", "Family"], country: "ID", language: "id", runtime: 125, type: "movie"
  },
  {
    id: 8, title: "The Raid", year: 2011,
    overview: "Sebuah tim pasukan elit SWAT dikirim ke sebuah gedung apartemen yang dikuasai oleh gembong narkoba paling berbahaya di Jakarta. Mereka harus bertahan hidup di lantai demi lantai.",
    poster: "/iOd3l2kW8jA1Nue3Ir5R4CqNVlp.jpg", backdrop: "/9qBUBsgIdy62v3Mkn16jfCAZWic.jpg",
    rating: 7.6, genres: ["Action", "Thriller"], country: "ID", language: "id", runtime: 101, type: "movie"
  },
  {
    id: 9, title: "The Raid 2: Berandal", year: 2014,
    overview: "Rama menyamar di dunia kriminal untuk melindungi keluarganya dan membersihkan namanya. Pertarungan sengit antara polisi dan mafia dengan skala yang jauh lebih besar.",
    poster: "/hSqhC2LKCEiYjWtERQmYSsxVGLA.jpg", backdrop: "/tm0C4xhhL2KrLUF0S3UnTr9U16Y.jpg",
    rating: 7.9, genres: ["Action", "Crime"], country: "ID", language: "id", runtime: 150, type: "movie"
  },
  {
    id: 10, title: "Marlina si Pembunuh dalam Empat Babak", year: 2017,
    overview: "Seorang janda di Sumba membunuh seorang perampok dan kemudian melakukan perjalanan untuk melaporkan kejadian itu ke polisi. Sebuah film koboi Indonesia yang unik.",
    poster: "/9aKjVyOQWNen12BKoGFYNcpZ5cb.jpg", backdrop: "/mFhA0Q3mCL0iopVkuY06APK22gT.jpg",
    rating: 7.3, genres: ["Drama", "Western"], country: "ID", language: "id", runtime: 93, type: "movie"
  },
  {
    id: 11, title: "Gundala", year: 2019,
    overview: "Sancaka, seorang anak jalanan yang tumbuh dewasa dengan kekuatan listrik, memutuskan untuk menjadi pahlawan setelah ketidakadilan mencapai titik puncak. Adaptasi komik klasik Indonesia.",
    poster: "/w1738Vj30ZtecPJ4a5nNCurQqKb.jpg", backdrop: "/hJs9zsFysiXdWTdNjQmHsTVqR8H.jpg",
    rating: 6.5, genres: ["Action", "Superhero"], country: "ID", language: "id", runtime: 123, type: "movie"
  },
  {
    id: 12, title: "Imperfect", year: 2019,
    overview: "Seorang wanita karir berjuang melawan standar kecantikan yang tidak realistis di tempat kerja dan masyarakat. Komedi drama yang mengangkat body positivity dan penerimaan diri.",
    poster: "/lBwPkCE9VNLe4Q4s9FNay6sMGf8.jpg", backdrop: "/v7RTSSOc7rtxCh6NoKmb4bpDoIQ.jpg",
    rating: 7.5, genres: ["Comedy", "Drama"], country: "ID", language: "id", runtime: 114, type: "movie"
  },

  // ─── INTERNATIONAL MOVIES ───
  {
    id: 100, title: "The Shawshank Redemption", year: 1994,
    overview: "Seorang bankir dihukum seumur hidup di Penjara Shawshank atas kejahatan yang tidak dilakukannya. Persahabatan dan harapan menjadi kunci kelangsungan hidupnya di balik jeruji besi.",
    poster: "/9cjIGRQL1m4E87FkTJk3BQmZ4aC.jpg", backdrop: "/9Xp3gwuvNJRkCpRF7F00BGq0CPg.jpg",
    rating: 8.7, genres: ["Drama"], country: "US", language: "en", runtime: 142, type: "movie"
  },
  {
    id: 101, title: "Inception", year: 2010,
    overview: "Seorang pencuri ulung yang spesialis dalam mencuri rahasia dari alam mimpi diberi tugas yang tampaknya mustahil: menanamkan ide ke dalam pikiran seseorang.",
    poster: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", backdrop: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    rating: 8.4, genres: ["Action", "Sci-Fi", "Thriller"], country: "US", language: "en", runtime: 148, type: "movie"
  },
  {
    id: 102, title: "Interstellar", year: 2014,
    overview: "Untuk menyelamatkan umat manusia dari kepunahan di Bumi yang sekarat, sekelompok astronot menjelajahi lubang cacing untuk mencari planet baru yang layak huni.",
    poster: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", backdrop: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    rating: 8.4, genres: ["Sci-Fi", "Drama", "Adventure"], country: "US", language: "en", runtime: 169, type: "movie"
  },
  {
    id: 103, title: "Parasite", year: 2019,
    overview: "Keluarga miskin namun cerdik menyusup ke kehidupan keluarga kaya dengan menjadi staf rumah tangga mereka secara bertahap. Sebuah satir sosial yang mengejutkan.",
    poster: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", backdrop: "/xzH6k8s4a7sfY3MdsomVahEMcS.jpg",
    rating: 8.5, genres: ["Drama", "Thriller"], country: "KR", language: "ko", runtime: 132, type: "movie"
  },
  {
    id: 104, title: "Train to Busan", year: 2016,
    overview: "Seorang ayah dan putrinya naik kereta KTX ke Busan, hanya untuk menemukan bahwa wabah zombie telah melanda. Mereka harus bertahan hidup dalam perjalanan kereta yang mengerikan.",
    poster: "/l09G4UzBe7NCVbOdA6jQMaBmnVj.jpg", backdrop: "/iEFKear1DcmDT6hHhQX6pVrPxiV.jpg",
    rating: 7.6, genres: ["Action", "Horror", "Thriller"], country: "KR", language: "ko", runtime: 118, type: "movie"
  },
  {
    id: 105, title: "Everything Everywhere All at Once", year: 2022,
    overview: "Seorang imigran Tionghoa-Amerika terjebak dalam petualangan multiverse yang gila untuk menyelamatkan dunia. Dimana setiap pilihan menciptakan cabang realitas baru.",
    poster: "/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", backdrop: "/6AqG6kYbd0L5lBwemLPmVGr791r.jpg",
    rating: 7.8, genres: ["Action", "Adventure", "Comedy"], country: "US", language: "en", runtime: 139, type: "movie"
  },
  {
    id: 106, title: "Suzume", year: 2022,
    overview: "Seorang gadis SMA dan seorang pemuda misterius berkeliling Jepang menutup pintu-pintu yang menyebabkan bencana alam. Petualangan anime yang mengharukan dari Makoto Shinkai.",
    poster: "/vIgyY3t2JYnjkRPiBwFnRBrMKSb.jpg", backdrop: "/jyoX0Vl4XGZqzoqx5myHHDxsAr4.jpg",
    rating: 8.3, genres: ["Animation", "Adventure", "Fantasy"], country: "JP", language: "ja", runtime: 122, type: "movie"
  },
  {
    id: 107, title: "Spirited Away", year: 2001,
    overview: "Chihiro, seorang gadis yang sedang pindah rumah, tersesat di dunia roh. Ia harus bekerja di pemandian milik penyihir untuk menyelamatkan orang tuanya yang berubah menjadi babi.",
    poster: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg", backdrop: "/bSXfU4HQZyZRkE3hMhxZPhSXMuP.jpg",
    rating: 8.5, genres: ["Animation", "Adventure", "Family"], country: "JP", language: "ja", runtime: 125, type: "movie"
  },
  {
    id: 108, title: "Spider-Man: Across the Spider-Verse", year: 2023,
    overview: "Miles Morales melintasi multiverse untuk bergabung dengan Spider-Society yang dipimpin oleh Miguel O'Hara. Namun, konflik baru mengancam semua realitas Spider-Man.",
    poster: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg", backdrop: "/nGxUxi3PfXDRmBqU7p6qHlCNw4C.jpg",
    rating: 8.4, genres: ["Animation", "Action", "Adventure"], country: "US", language: "en", runtime: 140, type: "movie"
  },
  {
    id: 109, title: "Dune: Part Two", year: 2024,
    overview: "Paul Atreides bersatu dengan Fremen untuk memimpin perang melawan House Harkonnen yang kejam. Jalan menuju takdirnya sebagai pemimpin galaksi dimulai.",
    poster: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", backdrop: "/1stQfI6NwRfaBFqkt39whFeJqUf.jpg",
    rating: 8.5, genres: ["Sci-Fi", "Adventure"], country: "US", language: "en", runtime: 166, type: "movie"
  },
  {
    id: 110, title: "The Batman", year: 2022,
    overview: "Di tahun keduanya sebagai Batman, Bruce Wayne menyelidiki pembunuhan berantai yang dilakukan oleh The Riddler yang menargetkan elit Gotham. Sebuah thriller noir detektif.",
    poster: "/b0PlSFdDwbyK0cf5RxwD7b5rBTR.jpg", backdrop: "/7h5WAPjrUq36C147cCb9Ww6C3UZ.jpg",
    rating: 7.8, genres: ["Action", "Crime", "Drama"], country: "US", language: "en", runtime: 176, type: "movie"
  },
  {
    id: 111, title: "Oppenheimer", year: 2023,
    overview: "Kisah J. Robert Oppenheimer dan perannya dalam pengembangan bom atom selama Perang Dunia II. Perjuangan moral seorang ilmuwan yang mengubah sejarah dunia.",
    poster: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", backdrop: "/mK7B1P2W3wN3BPBxQh3jmBqI51z.jpg",
    rating: 8.4, genres: ["Drama", "History", "Thriller"], country: "US", language: "en", runtime: 180, type: "movie"
  },
  {
    id: 112, title: "John Wick: Chapter 4", year: 2023,
    overview: "John Wick menghadapi musuh terkuatnya, The High Table, dalam pertarungan epik melintasi berbagai kota. Harga di kepalanya semakin besar, namun ia tak pernah menyerah.",
    poster: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg", backdrop: "/jTQnLtFm1cMl3l4y9CyhF6uLEgH.jpg",
    rating: 7.8, genres: ["Action", "Thriller"], country: "US", language: "en", runtime: 169, type: "movie"
  },
  {
    id: 113, title: "Top Gun: Maverick", year: 2022,
    overview: "Setelah 30 tahun, Maverick kembali mengajar di sekolah pilot top gun. Ia harus menghadapi masa lalu dan melatih generasi baru pilot untuk misi yang mustahil.",
    poster: "/62HCnUTPHuuV6FPFlGAXFHMIkGj.jpg", backdrop: "/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
    rating: 8.3, genres: ["Action", "Drama"], country: "US", language: "en", runtime: 130, type: "movie"
  },
  {
    id: 114, title: "Avengers: Endgame", year: 2019,
    overview: "Setelah Thanos menghancurkan setengah alam semesta, para Avengers yang tersisa harus bekerja sama untuk mengubah waktu dan mengembalikan semua yang hilang.",
    poster: "/or06FNqK3sIwhT2T2CQ2LQ1ZgJm.jpg", backdrop: "/7RyHsO4wL2QnFcK4fGgG6kLgVq.jpg",
    rating: 8.4, genres: ["Action", "Adventure", "Drama"], country: "US", language: "en", runtime: 181, type: "movie"
  },
  {
    id: 115, title: "The Dark Knight", year: 2008,
    overview: "Batman menghadapi Joker, dalang kriminal anarkis yang ingin membuktikan bahwa setiap orang bisa menjadi korup. Pertarungan antara kekacauan dan keadilan di Gotham.",
    poster: "/qJ2tW6WMUDux911Br2h0zUJTnxr.jpg", backdrop: "/nMKdUUepR0i5zn0y1T4CsSB5ez.jpg",
    rating: 8.5, genres: ["Action", "Crime", "Drama"], country: "US", language: "en", runtime: 152, type: "movie"
  },
  {
    id: 116, title: "Your Name", year: 2016,
    overview: "Mitsuha dan Taki, dua remaja yang tidak saling kenal, secara misterius bertukar tubuh. Mereka memulai pencarian satu sama lain yang melintasi waktu dan ruang.",
    poster: "/q719jXXEzOoYaps6Dg4GCagb6y5.jpg", backdrop: "/7tN3B26JQWiDVWxkHZV0wEFhWeV.jpg",
    rating: 8.4, genres: ["Animation", "Romance", "Fantasy"], country: "JP", language: "ja", runtime: 106, type: "movie"
  },
  {
    id: 117, title: "Weathering With You", year: 2019,
    overview: "Seorang anak SMA yang kabur ke Tokyo bertemu dengan seorang gadis yang bisa mengendalikan cuaca. Cinta dan pengorbanan dalam cerita anime yang memukau dari Makoto Shinkai.",
    poster: "/qgrk2NUWNhpXRxpVQaGcgos7Vxw.jpg", backdrop: "/6aLB6lKFSeSG5h6XCP11dsMXXoR.jpg",
    rating: 8.1, genres: ["Animation", "Romance", "Fantasy"], country: "JP", language: "ja", runtime: 112, type: "movie"
  },
  {
    id: 118, title: "The Boy and the Heron", year: 2023,
    overview: "Seorang anak laki-laki pindah ke pedesaan setelah ibunya meninggal. Ia bertemu seekor kuntul misterius yang membawanya ke dunia fantasi yang aneh dan berbahaya.",
    poster: "/lQ7FhZCodSmqPmHfzo3sNJE4OhE.jpg", backdrop: "/2mO5F7p7hMFKZQaFIj4cY5kcepY.jpg",
    rating: 7.5, genres: ["Animation", "Adventure", "Fantasy"], country: "JP", language: "ja", runtime: 124, type: "movie"
  },

  // ─── SERIES ───
  {
    id: 200, title: "Game of Thrones", year: 2011,
    overview: "Tujuh keluarga bangsawan berperang memperebutkan Takhta Besi Westeros. Di utara, ancaman kuno bangkit kembali. Sebuah epik fantasi yang tak terkalahkan.",
    poster: "/1XS1oqL8op9tvN6Vh9C3vBq4Y6N.jpg", backdrop: "/s3DQQMNlLxM0jVfW7VSAJQ9YQvX.jpg",
    rating: 8.4, genres: ["Drama", "Fantasy", "Adventure"], country: "US", language: "en", runtime: 60, type: "series"
  },
  {
    id: 201, title: "Breaking Bad", year: 2008,
    overview: "Seorang guru kimia yang didiagnosis kanker paru-paru bekerja sama dengan mantan muridnya untuk memproduksi dan menjual methamphetamine demi masa depan keluarganya.",
    poster: "/ggF1Nu5r2tUXM9H68LxYHTjqJBC.jpg", backdrop: "/tsRy63Muq7kQo78NExA7NVVrHsp.jpg",
    rating: 8.9, genres: ["Crime", "Drama", "Thriller"], country: "US", language: "en", runtime: 49, type: "series"
  },
  {
    id: 202, title: "Stranger Things", year: 2016,
    overview: "Ketika seorang bocah lelaki menghilang di Hawkins, Indiana, teman-temannya menemukan rahasia mengerikan yang melibatkan laboratorium rahasia, monster, dan dimensi lain.",
    poster: "/49WJfeN0muxb7E5kR8iybFBSn3a.jpg", backdrop: "/56v2KjBlU4XaOv9DOi6kQRmHml1.jpg",
    rating: 8.6, genres: ["Fantasy", "Horror", "Mystery"], country: "US", language: "en", runtime: 51, type: "series"
  },
  {
    id: 203, title: "Squid Game", year: 2021,
    overview: "456 orang yang terlilit hutang diundang untuk bermain permainan anak-anak misterius. Pemenang mendapat hadiah miliaran won, yang kalah akan mati.",
    poster: "/dDlEmu3EZ0PggawKQ8Emt1Nv5PR.jpg", backdrop: "/oZEGWNQM7m38mABPsM0tV3RhK2a.jpg",
    rating: 7.7, genres: ["Drama", "Thriller", "Action"], country: "KR", language: "ko", runtime: 55, type: "series"
  },
  {
    id: 204, title: "The Last of Us", year: 2023,
    overview: "Di dunia pasca-apokaliptik yang dihancurkan oleh infeksi jamur, Joel harus menyelundupkan Ellie, seorang gadis remaja yang mungkin menjadi kunci penyelamatan umat manusia.",
    poster: "/uKvVjHNqB5VmSdxwNW58K1UMRjt.jpg", backdrop: "/n1y094tVqmR4jIjsMKDkg1UrkmT.jpg",
    rating: 8.7, genres: ["Drama", "Adventure", "Horror"], country: "US", language: "en", runtime: 60, type: "series"
  },
  {
    id: 205, title: "Money Heist (La Casa de Papel)", year: 2017,
    overview: "Seorang mastermind yang menyebut dirinya 'Professor' merencanakan perampokan terbesar dalam sejarah — mencetak miliaran euro di Royal Mint Spanyol dengan 8 sandera.",
    poster: "/991Rq6JwNUKNQQNks5ERGM9nUgH.jpg", backdrop: "/6Bx6Ns13sRsOEksCFs2kQ28cOrR.jpg",
    rating: 8.2, genres: ["Action", "Crime", "Mystery"], country: "ES", language: "es", runtime: 50, type: "series"
  },
  {
    id: 206, title: "Attack on Titan", year: 2013,
    overview: "Di dunia yang dikuasai raksasa pemakan manusia, Eren Jaeger bersumpah untuk membasmi setiap Titan setelah kotanya dihancurkan dan ibunya dimakan.",
    poster: "/hTP1DtLgfubj8GvRTrMpy9UrrLh.jpg", backdrop: "/gFqB5G2CQvmpqB8VJwYoQXJffh.jpg",
    rating: 8.7, genres: ["Animation", "Action", "Fantasy"], country: "JP", language: "ja", runtime: 24, type: "series"
  },
  {
    id: 207, title: "Demon Slayer", year: 2019,
    overview: "Tanjiro Kamado, seorang anak laki-laki yang keluarganya dibantai oleh iblis, berjuang untuk mengubah adiknya Nezuko kembali menjadi manusia dan membalaskan dendam keluarganya.",
    poster: "/xUUtJcSVR6P3ouLnBILH4ppYRmk.jpg", backdrop: "/1qqUQbVOJqblM04QTwYXXYrY7l7.jpg",
    rating: 8.6, genres: ["Animation", "Action", "Fantasy"], country: "JP", language: "ja", runtime: 24, type: "series"
  },
];

// Derived data
export const MOVIE_GENRES = [...new Set(MOVIES.flatMap(m => m.genres))].sort();
export const MOVIE_COUNTRIES = [...new Set(MOVIES.map(m => m.country))].sort();
export const MOVIE_TYPES = ["movie", "series"] as const;

// Generate URL-safe slug from movie
export function movieSlug(movie: Movie): string {
  return `${movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${movie.id}`;
}

// Full poster URL
export function posterUrl(path: string, size: "w185" | "w342" | "w500" | "w780" = "w342"): string {
  return `${TMDB_IMG}/${size}${path}`;
}

// Full backdrop URL
export function backdropUrl(path: string, size: "w780" | "w1280" | "original" = "w1280"): string {
  return `${TMDB_IMG}/${size}${path}`;
}