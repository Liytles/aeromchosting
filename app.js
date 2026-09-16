/**
 * AeroMC 5.1 Beta Client Script
 * Multi-language support (TR, EN, ES) with intelligent location/locale detection.
 * Zero vibe-coding tropes: no audio oscillator, no cursor glow, no fake counters.
 */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------------------
    // Location & Locale Detection Engine
    // -------------------------------------------------------------------------
    function detectInitialLanguage() {
        const stored = localStorage.getItem("aeromc_lang");
        if (stored && ["tr", "en", "es"].includes(stored)) {
            return stored;
        }

        // 1. Timezone detection for location-specific routing
        try {
            const timeZone = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase();
            
            // Turkey timezone detection
            if (timeZone.includes("istanbul") || timeZone.includes("turkey")) {
                return "tr";
            }
            
            // Spanish-speaking countries/cities timezone detection
            const spanishTimezones = [
                "madrid", "barcelona", "canary", "buenos_aires", "cordoba", "rosario",
                "mexico_city", "cancun", "monterrey", "tijuana", "bogota", "santiago",
                "lima", "caracas", "montevideo", "asuncion", "havana", "guatemala",
                "san_jose", "panama", "managua", "tegucigalpa", "san_salvador", "quito", "la_paz"
            ];
            if (spanishTimezones.some((tz) => timeZone.includes(tz))) {
                return "es";
            }
        } catch (e) {
            // Fallback gracefully if Intl is unavailable
        }

        // 2. Browser languages detection
        const navLangs = navigator.languages || [navigator.language || ""];
        for (const lang of navLangs) {
            const l = (lang || "").toLowerCase();
            if (l.startsWith("tr")) return "tr";
            if (l.startsWith("es")) return "es";
            if (l.startsWith("en")) return "en";
        }

        // 3. Default fallback (English for international users)
        return "en";
    }

    let currentLang = detectInitialLanguage();

    // -------------------------------------------------------------------------
    // OS Detection & Download Link Routing
    // -------------------------------------------------------------------------
    function detectOperatingSystem() {
        const ua = window.navigator.userAgent.toLowerCase();
        
        if (ua.includes("win")) {
            return {
                id: "windows",
                name: "Windows 10/11",
                file: "AeroMC-Setup.exe",
                labels: {
                    tr: "Windows İçin İndir (.exe)",
                    en: "Download for Windows (.exe)",
                    es: "Descargar para Windows (.exe)"
                }
            };
        }
        if (ua.includes("mac")) {
            return {
                id: "macos",
                name: "macOS (Apple Silicon / Intel)",
                file: "AeroMC-Installer.dmg",
                labels: {
                    tr: "macOS İçin İndir (.dmg)",
                    en: "Download for macOS (.dmg)",
                    es: "Descargar para macOS (.dmg)"
                }
            };
        }
        if (ua.includes("linux")) {
            return {
                id: "linux",
                name: "Ubuntu / Debian Linux",
                file: "AeroMC-Linux.deb",
                labels: {
                    tr: "Linux İçin İndir (.deb)",
                    en: "Download for Linux (.deb)",
                    es: "Descargar para Linux (.deb)"
                }
            };
        }
        
        return {
            id: "universal",
            name: "Masaüstü (Linux / Windows / macOS)",
            file: "AeroMC-Linux.deb",
            labels: {
                tr: "AeroMC 5.1 Beta İndir",
                en: "Download AeroMC 5.1 Beta",
                es: "Descargar AeroMC 5.1 Beta"
            }
        };
    }

    const currentPlatform = detectOperatingSystem();

    function updateDownloadSection() {
        const detectedOsName = document.getElementById("detectedOsName");
        const downloadHeading = document.getElementById("downloadHeading");
        const downloadMetaText = document.getElementById("downloadMetaText");
        const primaryDownloadBtn = document.getElementById("primaryDownloadBtn");
        const btnDownloadText = document.getElementById("btnDownloadText");
        const osGreeting = document.getElementById("osGreeting");

        if (detectedOsName && primaryDownloadBtn && btnDownloadText) {
            detectedOsName.textContent = currentPlatform.name;
            primaryDownloadBtn.href = currentPlatform.file;
            primaryDownloadBtn.setAttribute("download", currentPlatform.file);
            btnDownloadText.textContent = currentPlatform.labels[currentLang] || currentPlatform.labels.en;

            const t = window.TRANSLATIONS && window.TRANSLATIONS[currentLang] ? window.TRANSLATIONS[currentLang] : window.TRANSLATIONS.en;

            if (downloadHeading) {
                downloadHeading.textContent = `AeroMC 5.1 Beta (${currentPlatform.name})`;
            }
            if (downloadMetaText) {
                downloadMetaText.textContent = `Paket: ${currentPlatform.file} | ${t["dl.meta.default"] || "64-bit standalone package"}`;
            }
            if (osGreeting) {
                const greetings = {
                    tr: `${currentPlatform.name} tespit edildi. Yayın paketleri gömülü Java çalışma ortamı içerir, harici kuruluma gerek yoktur.`,
                    en: `Detected ${currentPlatform.name}. Release packages bundle an embedded Java runtime; no external Java setup needed.`,
                    es: `Detectado ${currentPlatform.name}. Los instaladores incluyen Java integrado; no requiere configuración externa.`
                };
                osGreeting.textContent = greetings[currentLang] || greetings.en;
            }
        }
    }

    // -------------------------------------------------------------------------
    // i18n Translation Engine
    // -------------------------------------------------------------------------
    function applyTranslations(lang) {
        if (!window.TRANSLATIONS || !window.TRANSLATIONS[lang]) return;
        currentLang = lang;
        document.documentElement.lang = lang;
        localStorage.setItem("aeromc_lang", lang);

        const dict = window.TRANSLATIONS[lang];

        // Text nodes
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        // HTML nodes
        document.querySelectorAll("[data-i18n-html]").forEach((el) => {
            const key = el.getAttribute("data-i18n-html");
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        // Active state on language switcher buttons
        document.querySelectorAll(".lang-btn").forEach((btn) => {
            btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
        });

        updateDownloadSection();
    }

    // Language switcher buttons click listener
    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetLang = btn.getAttribute("data-lang");
            if (targetLang && ["tr", "en", "es"].includes(targetLang)) {
                applyTranslations(targetLang);
            }
        });
    });

    // -------------------------------------------------------------------------
    // Modal Infrastructure (Accessible, ESC-key dismissible)
    // -------------------------------------------------------------------------
    const activeModals = new Set();

    function openModal(modalEl) {
        if (!modalEl) return;
        modalEl.classList.add("is-active");
        document.body.style.overflow = "hidden";
        activeModals.add(modalEl);
    }

    function closeModal(modalEl) {
        if (!modalEl) return;
        modalEl.classList.remove("is-active");
        activeModals.delete(modalEl);
        if (activeModals.size === 0) {
            document.body.style.overflow = "";
        }
    }

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && activeModals.size > 0) {
            activeModals.forEach((modal) => closeModal(modal));
        }
    });

    document.querySelectorAll(".modal").forEach((modal) => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // -------------------------------------------------------------------------
    // Technical Deep-Dive Features Data (Multi-Language)
    // -------------------------------------------------------------------------
    const featureDetails = {
        tr: {
            prov_local: {
                title: "Yerel .jar Sunucu Yönetimi",
                desc: "<p>Doğrudan yerel makinenizde çalışan Minecraft sunucusu için geliştirilmiş tam kontrol konsolu.</p><ul><li>Başlat, durdur, yeniden başlat komutları ve canlı konsola komut gönderme</li><li>Başlatma Kontrolü: Başlatmadan önce Java sürümünü, port kullanımını ve yedek durumunu doğrular.</li><li>Online oyuncu listesi ve hızlı komutlar: gündüz yapma, hava temizleme, dünyayı kaydetme, oyuncu listesini yenileme ve duyuru yapma</li><li>Minecraft ayarları: OP/deOP, whitelist, ban, oyun modu, zorluk, PvP, MOTD ve oyuncu sınırı</li><li>Sunucu profilleri ve yerel depolama yönetimi</li></ul>"
            },
            prov_exaroton: {
                title: "Exaroton Resmî API ve Filo Yönetimi",
                desc: "<p>Birden fazla Exaroton sunucusunu tek ekranda toplayan resmî API entegrasyonu.</p><ul><li>Filo Paneli: Tüm Exaroton sunucularının durumu, adresi, RAM'i, oyuncu sayısı ve canlı konsolu</li><li>Hazırlık denetimi ve bunu ayarlardan kapatabilme opsiyonu</li><li>Kredi bakiyesi, kredi geçmişi, günlük harcama ve seçili sunucunun saatlik maliyet takibi</li><li>Düşük kredi eşiği, eşik altına düşünce sunucuyu otomatik durdurma ve oyuncusuz sunucuları kapatma kuralları</li><li>Günlük ve haftalık kredi bütçesi, hafta içi/sonu zaman programları ve gece yarısını aşan zamanlama desteği</li><li>Çökünce otomatik kurtarma, yeniden deneme limiti ve detaylı otomasyon olay günlüğü</li></ul>"
            },
            prov_pterodactyl: {
                title: "Pterodactyl Client API Entegrasyonu",
                desc: "<p>Pterodactyl panellerini doğrudan masaüstü uygulamasından yönetme desteği.</p><ul><li>Panel URL ve ptlc_... Client API anahtarını güvenli kasada saklama</li><li>Birden fazla Pterodactyl sunucusunu seçme, başlatma, durdurma, yeniden başlatma ve zorla kapatma</li><li>Durum, IP/adres, CPU, RAM, disk ve uptime telemetrisi</li><li>Kısa ömürlü Pterodactyl WebSocket biletiyle canlı konsol ve komut gönderimi</li><li>Kontrol Merkezi, Canlı Harita ve Haftalık Raporun aktif sağlayıcıya göre Pterodactyl verisini göstermesi</li></ul>"
            },
            prov_aternos: {
                title: "Aternos Herkese Açık Durum Takibi",
                desc: "<p>Aternos sunucularının durumunu izleme ve panele hızlı geçiş.</p><ul><li>Sunucunun herkese açık Minecraft durumunu kontrol etme</li><li>Çevrimiçi/çevrimdışı durumu, aktif oyuncu sayısı, sürüm ve gecikme (ping) bilgisi</li><li>Belirli aralıklarla otomatik yenileme ve adres hatırlama</li><li>Resmî Aternos panelini tek tuşla tarayıcıda açma</li><li>Aternos'un resmî sunucu yönetim API'si bulunmadığı için servis kurallarına saygı duyulur; başlat/durdur yapılmaz, yalnızca durum okunur.</li></ul>"
            },
            health_crisis: {
                title: "Sunucu Sağlığı, Kriz Modu ve Çökme Doktoru",
                desc: "<p>Sunucu performansını anlık izleyen ve acil durumlarda devreye giren otomatik koruma mimarisi.</p><ul><li>CPU/TPS, RAM, gecikme, çalışma durumu ve oyuncu sayısını gösteren canlı performans grafiği</li><li>0-100 Sunucu Sağlık Puanı ile genel sistem kararlılığını tek bakışta görme</li><li>Kriz Modu: TPS veya RAM eşikleri aşıldığında otomatik algılama, koruyucu eylemler alma ve kriz geçmişini (zaman, eşik, süre) kaydetme</li><li>Çökme Doktoru: Konsol hatalarından olası çökme nedenini çıkarma, tekrar eden çökme döngülerini engelleme ve çözüm önerileri sunma</li><li>Akıllı Eşik Önerileri: Geçmiş RAM/TPS verilerine göre sunucuya özel eşik tavsiyeleri</li><li>Spark profilini başlatma, rapor açma, önceki raporla karşılaştırma ve yardımcı akış</li></ul>"
            },
            weekly_reports: {
                title: "Haftalık Rapor Merkezi",
                desc: "<p>AeroMC 5.1 ile gelen, son 7 gündeki gerçek yerel verilerle hazırlanan analitik merkezi.</p><ul><li>AeroMC açıkken kaydedilmiş gerçek verileri kullanır; eksik zamanları tahminmiş gibi uydurmaz.</li><li>Tekrarlayan hata özeti ve pratik çözüm önerileri</li><li>En stabil ve en problemli sunucuları objektif karşılaştırma</li><li>Kriz Modu ve çökme sayılarının dönemsel analizi</li><li>Oyuncu içgörüleri: Yeni oyuncular, geri dönen oyuncular ve uzun süredir görünmeyen pasif oyuncular</li><li>Exaroton için RAM/kredi tasarrufu tavsiyesi, Pterodactyl için filo sağlık karşılaştırması, Yerel sunucu için TPS/RAM/CPU özeti</li></ul>"
            },
            ingame_hud: {
                title: "Oyun İçi .aeromc, Özel Komutlar ve Sağ Shift HUD",
                desc: "<p>Sunucu içine mod veya eklenti kurmadan doğrudan oyun sohbetinden AeroMC ile etkileşim.</p><ul><li>Konsol üzerinden OP oyuncuların .aeromc komutlarını algılama: .aeromc saglik, .aeromc performans, .aeromc durum, .aeromc oyuncular, .aeromc duyur &lt;mesaj&gt;</li><li>Özel Komut Oluşturma: Sadece OP veya herkese açık yapılabilir, belirli oyuncularla sınırlandırılabilir, özel önek seçilebilir ve güvenli AeroMC eylemleri tetiklenebilir.</li><li>Kritik eylemler için OP kontrolü korunur; yanıtlar güvenli tellraw formatında iletilir.</li><li>Sağ Shift ile açılan oyun içi AeroMC bilgi ve denetim katmanı (HUD overlay)</li><li>Sistem rastgele sunuculara müdahale etmez; yalnızca AeroMC'nin yetkili olduğu sunucularda çalışır.</li></ul>"
            },
            files_mods: {
                title: "Dosyalar, Dünyalar, Yedekler ve Mod Yönetimi",
                desc: "<p>Sunucu dosya sistemini güvenceye alan modern paket ve dünya yöneticisi.</p><ul><li>Güvenli dosya yönetimi: Yapılandırma dosyalarında değişiklik öncesi otomatik .bak yedeği alma</li><li>Yerel sunucu için otomatik ve planlı yedekleme</li><li>Dünya Kurtarma: İşlem öncesi otomatik yedek alır, eski dünyayı tarihli kurtarma klasörüne taşır.</li><li>Modrinth üzerinden mod arama, sürüm ve yükleyici uyumluluğu denetimi, zorunlu bağımlılıkları çözme</li><li>İndirilen mod dosyalarını SHA-512 sağlama toplamı ile doğrulama</li><li>Kurulum öncesi mods/plugins yedeği alma, güncelleme ve çakışma kontrolü</li></ul>"
            },
            notifications_discord: {
                title: "Bildirim Merkezi ve Discord Entegrasyonu",
                desc: "<p>Tüm sunucu ve otomasyon olaylarını tek merkezden yönetin.</p><ul><li>Ana Panel'de Bildirim Merkezi: Okunmamış bildirim sayısı, filtreleme, tümünü okundu yapma ve geçmiş temizleme</li><li>Sunucu online/offline değişimlerinde yanlış pozitifleri önleyen durum doğrulaması</li><li>Saatlik bildirim özeti: Çökme, oyuncu hareketi ve performans alarmları</li><li>Discord Webhook: Bağlantıyı güvenli kasada saklama, test mesajı gönderme, sunucu ve güvenlik olaylarını anında kanala iletme</li><li>Bildirim olaylarını ve hedef sunucuları özelleştirilebilir filtrelerle seçme</li></ul>"
            },
            perf_light: {
                title: "Performans Merkezi, Hafif Mod ve Komut Paleti",
                desc: "<p>AeroMC'nin kendi çalışma performansını ve kullanıcı deneyimini optimize eden araçlar.</p><ul><li>Performans Merkezi: AeroMC'nin kendi CPU ve RAM kullanımını canlı izleme</li><li>Arayüz donması algılama ve gereksiz yenilemeleri azaltan Hafif Mod seçeneği</li><li>Komut Paleti: Klavye kısayollarıyla tüm sunucu eylemlerine anında erişim</li><li>Uygulama tanılama merkezi ve ilk açılış özellik turu</li><li>Ayarları şifreli .aeromc-settings dosyasına aktarma ve geri yükleme (dünyalar ve ana parola güvenlikle korunur, dışa aktarılmaz)</li></ul>"
            },
            ag_vault: {
                title: "1. Kimlik Kasası (AES-256-GCM)",
                desc: "<p>AeroMC'nin kimlik ve erişim güvenliği çekirdeği.</p><ul><li>Exaroton, Pterodactyl ve Discord anahtarlarını AES-256-GCM algoritması ile güvenli saklama</li><li>Her kurulum için rastgele üretilen donanım ve cihaz anahtarı; kasa başka cihaza kopyalanırsa açılamaz.</li><li>Eski kasa kayıtlarını güvenli biçimde yeni formata taşıma</li><li>Ana parolayı düz metin saklamaz; yalnızca doğrulama verisi tutar. Uygulama açılırken parola sorma seçeneği</li><li>Gizli alanlarda kopyala, kes, sağ tık menüsü ve sürükleme engellenir.</li></ul>"
            },
            ag_path: {
                title: "2. SafePathGuard ve Dosya Bütünlüğü",
                desc: "<p>Dosya sistemi işlemlerinde kesin sınırlandırma ve bütünlük denetimi.</p><ul><li>Klasör dışına çıkmaya çalışan yolları engelleme; ../ yol aşımı saldırılarına karşı mutlak koruma</li><li>Sembolik bağlantıyla güvenli alan dışına kaçışları engelleme</li><li>Sunucu JAR'ı, dünya, yedek, mod ve yapılandırma işlemlerini seçili klasörle sınırlandırma</li><li>Hassas dosyaların beklenmeyen değişikliklerini izleme, atomik yazma kullanarak dosya bozulmasını önleme ve izinleri onarma</li></ul>"
            },
            ag_visual: {
                title: "3. AeroGuard Görsel Merkezi ve Olay İnceleyici",
                desc: "<p>AeroMC 5.1 ile gelen proaktif güvenlik izleme ve görselleştirme katmanı.</p><ul><li>Katmanlı AeroGuard Core görünümü: Kimlik Kasası, İşlem Güvenliği ve Uzak Erişim katmanlarının anlık durumunu gösterme</li><li>Oturumda engellenen olay sayısı ve katman sağlığı; güvenlik taramasını elle yenileme</li><li>AeroGuard Olay İnceleyici: Güvenlik olaylarını tür, zaman, maskelenmiş kaynak ve sonuç bilgisiyle kaydeder.</li><li>Parola, API anahtarı veya tam istek gövdesi asla günlüğe yazılmaz. Yanlış pozitif işaretleme ve susturma imkanı</li><li>Saldırı tespiti: Brute-force giriş, geçersiz CSRF, eşleştirme saldırıları ve aşırı istek seli denemelerini algılama ve bildirme</li></ul>"
            },
            ag_remote: {
                title: "4. Şifreli Uzaktan Erişim ve Gelişmiş Koruma",
                desc: "<p>LAN üzerinden mobil ve diğer cihazlardan güvenli web erişimi.</p><ul><li>Tarayıcıdan LAN üzerinden HTTPS/TLS 1.2 ve 1.3 şifreli uzak panel</li><li>Viewer, Moderator ve Admin rolleri ile yetki denetimi ve güvenlik günlüğü</li><li>Kısa ömürlü eşleştirme kodları, oturum kaynak doğrulaması ve CSRF koruması</li><li>Güvenli HTTP başlıkları, nonce tabanlı CSP, form verisi ve hız sınırlamaları</li><li>Gelişmiş Koruma (V4): Arka planda periyodik bütünlük taraması, daha sıkı TLS/başlık kuralları ve beklenmeyen dosya değişiminde oturumları anında iptal etme</li></ul>"
            }
        },

        en: {
            prov_local: {
                title: "Local .jar Server Management",
                desc: "<p>Full-spectrum control console for Minecraft servers running directly on your local hardware.</p><ul><li>Start, stop, restart operations with live terminal command execution</li><li>Startup Checks: Validates Java runtime, port availability, and backup integrity before launch</li><li>Online player list with instant shortcuts: set day, clear weather, save world, refresh players, and announce</li><li>Server configurations: OP/deOP, whitelist, bans, gamemode, difficulty, PvP, MOTD, and player capacity</li><li>Server profiles and isolated storage management</li></ul>"
            },
            prov_exaroton: {
                title: "Exaroton Official API & Fleet Management",
                desc: "<p>Official API integration unifying multiple Exaroton instances into a single fleet.</p><ul><li>Fleet Panel: Multi-server status, IP addresses, RAM, player counts, and interactive terminal</li><li>Readiness Check with option to disable via global settings</li><li>Real-time credit balance, credit history, daily burn rate, and instance hourly cost calculations</li><li>Low-credit thresholds with automated shutdown and player-less idle server termination</li><li>Daily and weekly credit budgets, weekday/weekend schedules, and cross-midnight scheduling</li><li>Automated crash recovery with retry ceiling and comprehensive automation audit logs</li></ul>"
            },
            prov_pterodactyl: {
                title: "Pterodactyl Client API Integration",
                desc: "<p>Direct desktop management for remote Pterodactyl panel deployments.</p><ul><li>Panel URL and ptlc_... Client API credentials stored safely in hardware-bound vault</li><li>Multi-server selection, start, stop, restart, and force kill commands</li><li>Real-time state, IP address, CPU, RAM, disk, and uptime telemetry</li><li>Interactive live console stream powered by short-lived Pterodactyl WebSocket tickets</li><li>Full telemetry sync across Control Center, Live Map, and Weekly Reports for active Pterodactyl servers</li></ul>"
            },
            prov_aternos: {
                title: "Aternos Public Status Telemetry",
                desc: "<p>Lightweight status monitor and dashboard launcher for Aternos instances.</p><ul><li>Reads public Minecraft status without requiring intrusive automation</li><li>Online/offline state, active player count, server version, and latency (ping)</li><li>Automated periodic refresh with remembered addresses</li><li>Single-click browser handover to official Aternos management dashboard</li><li>Complies strictly with terms of service: no automated start/stop actions, purely non-invasive status polling</li></ul>"
            },
            health_crisis: {
                title: "Server Health, Crisis Mode & Crash Doctor",
                desc: "<p>Real-time stability monitoring with automated emergency mitigation protocols.</p><ul><li>Live performance graphs capturing CPU, TPS, RAM, network latency, and player load</li><li>0-100 Server Health Score offering immediate visibility into system stability</li><li>Crisis Mode: Auto-triggers on TPS or RAM threshold breaches to throttle tasks and restore equilibrium</li><li>Smart Crash Doctor: Diagnoses stack traces to detect root causes and halt recursive crash loops</li><li>Smart Threshold Advisories: Recommends custom TPS/RAM thresholds based on historical load metrics</li><li>Spark Profiler: Launch profiles, compare historic Spark reports, and run optimization wizards</li></ul>"
            },
            weekly_reports: {
                title: "Weekly Report Center",
                desc: "<p>Analytical intelligence powered exclusively by real local data logged over the last 7 days.</p><ul><li>Zero artificial extrapolation: logs only authentic measurements captured while the panel is active</li><li>Recurring stack trace summaries paired with actionable engineering remedies</li><li>Side-by-side stability ranking of most reliable versus problematic instances</li><li>Periodic breakdown of Crisis Mode activations and unexpected crash counts</li><li>Player insights: Identifies new joiners, returning veterans, and long-term inactive players</li><li>Cost-saving audits for Exaroton credits, Pterodactyl fleet telemetry, and local bare-metal health summaries</li></ul>"
            },
            ingame_hud: {
                title: "In-Game .aeromc, Custom Commands & Right-Shift HUD",
                desc: "<p>Zero server-side plugins required. Direct communication from game chat to AeroMC.</p><ul><li>Captures .aeromc chat commands sent by OP operators: health, performance, status, players, broadcast</li><li>Custom Command Builder: Define commands with custom prefixes, restrict to specific players, and trigger actions</li><li>Strict OP validation for critical actions; responses delivered via secure tellraw packets</li><li>In-game HUD overlay: Seamless transparent status and control panel toggled with Right Shift</li><li>Strict permission boundaries: Interacts exclusively with servers where AeroMC has authorized console access</li></ul>"
            },
            files_mods: {
                title: "Files, Worlds, Backups & Mod Management",
                desc: "<p>Modern package and world manager protecting server file system integrity.</p><ul><li>Secure file manager: Creates automatic .bak backups prior to applying configuration edits</li><li>Scheduled and automated backups for local servers</li><li>World Recovery: Captures snapshot before critical actions and archives old worlds with timestamps</li><li>Modrinth package search with loader and version compatibility filters, resolving dependencies automatically</li><li>Integrity checks: Validates all downloaded packages using cryptographic SHA-512 hashes</li><li>Pre-installation safety snapshots for mods/plugins folders with rollback protection</li></ul>"
            },
            notifications_discord: {
                title: "Notification Center & Discord Integration",
                desc: "<p>Consolidated alert management across all server nodes and automation rules.</p><ul><li>Notification Center: Unread count badges, severity filters, mark-as-read, and history cleanup</li><li>Consecutive verification on state transitions to eliminate transient false alarms</li><li>Hourly digest: Summarizes crashes, player movements, and resource spikes</li><li>Discord Webhook: Stores URLs in encrypted vault, sends test pings, and relays audit events</li><li>Granular event filtering with target server routing</li></ul>"
            },
            perf_light: {
                title: "Performance Center, Light Mode & Command Palette",
                desc: "<p>Internal diagnostics and performance optimization tools for the AeroMC panel.</p><ul><li>Performance Center: Live monitoring of AeroMC internal CPU and RAM footprint</li><li>UI freeze detection and Light Mode toggle to minimize unnecessary background pollings</li><li>Command Palette: Keyboard-driven quick navigation across all panel features and shortcuts</li><li>Diagnostic logs with automatic sensitive token masking and initial tour walkthrough</li><li>Encrypted .aeromc-settings export (world files and master key verification remain securely excluded)</li></ul>"
            },
            ag_vault: {
                title: "1. Credential Vault (AES-256-GCM)",
                desc: "<p>The core identity and credential security layer of AeroMC.</p><ul><li>AES-256-GCM encryption for Exaroton tokens, Pterodactyl API keys, and Discord webhooks</li><li>Unique 256-bit machine-bound root key generated per installation; vault fails if copied to other devices</li><li>Seamless migration for legacy vault records to the hardened format</li><li>Master passwords never stored in plain text; only salted verification hashes retained</li><li>Restricts clipboard copy, cut, context menu, and drag-and-drop operations on secret fields</li></ul>"
            },
            ag_path: {
                title: "2. SafePathGuard & File Integrity",
                desc: "<p>Strict file system confinement and integrity monitoring.</p><ul><li>Blocks directory traversal attempts (../) and symlink escapes outside the designated server root</li><li>Validates server JAR paths, worlds, backups, and configuration files prior to execution</li><li>Enforces atomic write operations to prevent file corruption during sudden system halts</li><li>Periodic integrity scans on security settings, TLS certificates, and core configurations</li></ul>"
            },
            ag_visual: {
                title: "3. AeroGuard Visual Core & Event Inspector",
                desc: "<p>Proactive security visualization and auditing interface introduced in AeroMC 5.1.</p><ul><li>Layered AeroGuard Core view: Real-time health status of Credential Vault, Runtime Security, and Remote Access</li><li>Session blocked event counter and manual security scan triggers</li><li>AeroGuard Event Inspector: Logs security incidents with timestamps, masked origins, and outcomes</li><li>Zero sensitive data in logs: Passwords, tokens, and raw request bodies are never recorded</li><li>Intrusion detection: Detects brute-force logins, CSRF anomalies, pairing attacks, and request floods</li></ul>"
            },
            ag_remote: {
                title: "4. Encrypted Remote Access & Advanced Hardening",
                desc: "<p>Secure web interface accessible across LAN for mobile devices and secondary computers.</p><ul><li>Local HTTPS/TLS 1.2 and 1.3 encrypted remote dashboard</li><li>Role-Based Access Control: Viewer, Moderator, and Admin roles with audit logging</li><li>Short-lived pairing codes, session origin verification, and strict CSRF tokens</li><li>Hardened HTTP security headers, nonce-based CSP, form payload limits, and rate limiting</li><li>Advanced Protection (V4): 20-second integrity cycles, strict TLS policies, and instant session revocation</li></ul>"
            }
        },

        es: {
            prov_local: {
                title: "Gestión de Servidores .jar Locales",
                desc: "<p>Consola de control integral para servidores Minecraft ejecutados directamente en su máquina local.</p><ul><li>Comandos de inicio, detención, reinicio y envío de comandos a la terminal interactiva</li><li>Control de Inicio: Verifica versión de Java, disponibilidad de puertos y copias de seguridad antes de iniciar</li><li>Lista de jugadores en línea y comandos rápidos: hacer de día, despejar clima, guardar mundo y anunciar</li><li>Configuraciones de Minecraft: OP/deOP, whitelist, bans, modo de juego, dificultad, PvP, MOTD y límite de jugadores</li><li>Perfiles de servidor y gestión de almacenamiento aislado</li></ul>"
            },
            prov_exaroton: {
                title: "API Oficial de Exaroton y Gestión de Flotas",
                desc: "<p>Integración con la API oficial que unifica múltiples servidores de Exaroton en una sola consola.</p><ul><li>Panel de Flota: Estado de múltiples instancias, direcciones, RAM, jugadores y terminal en vivo</li><li>Comprobación de preparación con opción de desactivación desde la configuración global</li><li>Saldo de créditos en tiempo real, historial, consumo diario y costo por hora por instancia</li><li>Límites de crédito bajo con apagado automático y detención de servidores sin jugadores</li><li>Presupuestos diarios y semanales, horarios de días hábiles/fines de semana y programación nocturna</li><li>Recuperación automática ante caídas con límite de reintentos y registro de auditoría</li></ul>"
            },
            prov_pterodactyl: {
                title: "Integración con API de Cliente Pterodactyl",
                desc: "<p>Gestión directa de paneles Pterodactyl remotos desde la aplicación de escritorio.</p><ul><li>Almacenamiento seguro de URL de panel y credenciales ptlc_... en bóveda cifrada</li><li>Selección de múltiples servidores, inicio, apagado, reinicio y detención forzada</li><li>Telemetría en tiempo real de estado, dirección IP, CPU, RAM, disco y tiempo de actividad</li><li>Consola interactiva alimentada por WebSocket con tickets de corta duración</li><li>Sincronización total en Centro de Control, Mapa en Vivo e Informes Semanales</li></ul>"
            },
            prov_aternos: {
                title: "Telemetría de Estado Público de Aternos",
                desc: "<p>Monitor de estado y lanzador de panel oficial para servidores alojados en Aternos.</p><ul><li>Comprobación segura del estado público sin automatizaciones invasivas</li><li>Estado en línea/desconectado, conteo de jugadores, versión y latencia (ping)</li><li>Actualización periódica automática con memoria de direcciones</li><li>Enlace directo con un clic al panel de gestión oficial de Aternos</li><li>Cumple rigurosamente las normas del servicio: sin inicio/apagado forzado, lectura no invasiva</li></ul>"
            },
            health_crisis: {
                title: "Salud del Servidor, Modo Crisis y Doctor de Caídas",
                desc: "<p>Monitoreo continuo de estabilidad con protocolos de mitigación de emergencia automatizados.</p><ul><li>Gráficos de rendimiento en tiempo real: CPU, TPS, RAM, latencia y carga de jugadores</li><li>Puntaje de Salud 0-100 para visibilidad inmediata de la estabilidad del sistema</li><li>Modo Crisis: Se activa automáticamente al superar umbrales de TPS o RAM para estabilizar la carga</li><li>Doctor de Caídas Inteligente: Analiza los errores de consola para identificar la causa raíz y cortar ciclos de caídas</li><li>Recomendación de Umbrales: Sugiere límites óptimos basados en métricas históricas</li><li>Herramienta Spark: Ejecución de perfiles, comparación de reportes y asistentes de optimización</li></ul>"
            },
            weekly_reports: {
                title: "Centro de Informes Semanales",
                desc: "<p>Módulo de inteligencia analítica impulsado exclusivamente por datos locales de los últimos 7 días.</p><ul><li>Sin estimaciones artificiales: solo utiliza métricas reales registradas con el panel abierto</li><li>Resumen de errores recurrentes emparejados con soluciones de ingeniería prácticas</li><li>Comparación objetiva de estabilidad entre las instancias más confiables y problemáticas</li><li>Desglose periódico de activaciones del Modo Crisis y caídas inesperadas</li><li>Estadísticas de jugadores: Nuevos usuarios, jugadores recurrentes y usuarios inactivos</li><li>Auditorías de ahorro de créditos en Exaroton y telemetría de recursos en Pterodactyl y servidores locales</li></ul>"
            },
            ingame_hud: {
                title: "Comandos en el Juego .aeromc, Acciones Propias y HUD",
                desc: "<p>Sin necesidad de plugins en el servidor. Comunicación directa desde el chat de Minecraft a AeroMC.</p><ul><li>Detecta comandos .aeromc enviados por operadores OP: salud, rendimiento, estado, jugadores, anuncio</li><li>Creador de Comandos: Defina comandos con prefijos personalizados y asigne acciones seguras</li><li>Validación estricta de permisos OP; respuestas enviadas mediante paquetes tellraw seguros</li><li>Capa de información en el juego (HUD overlay): Panel transparente en pantalla activado con Shift Derecho</li><li>Seguridad estricta: Solo interactúa con servidores donde AeroMC tiene permisos de consola autorizados</li></ul>"
            },
            files_mods: {
                title: "Archivos, Mundos, Copias y Gestión de Mods",
                desc: "<p>Gestor moderno de paquetes y mundos que protege la integridad del sistema de archivos.</p><ul><li>Gestor seguro: Crea copias automáticas .bak antes de aplicar modificaciones de configuración</li><li>Copias de seguridad programadas y automáticas para servidores locales</li><li>Recuperación de Mundos: Realiza instantáneas automáticas y archiva mundos anteriores con fecha</li><li>Búsqueda en Modrinth con filtros de versión y cargador, resolviendo dependencias de forma automática</li><li>Verificación criptográfica mediante resúmenes SHA-512 para todos los archivos descargados</li><li>Copias de seguridad previas para carpetas de mods/plugins con protección de reversión</li></ul>"
            },
            notifications_discord: {
                title: "Centro de Notificaciones e Integración Discord",
                desc: "<p>Gestión centralizada de alertas para todos los nodos de servidores y reglas de automatización.</p><ul><li>Centro de Notificaciones: Contador de no leídos, filtros de severidad y limpieza de historial</li><li>Verificación consecutiva de cambios de estado para eliminar falsas alarmas transitorias</li><li>Resumen horario: Reporta caídas, actividad de jugadores y picos de recursos</li><li>Webhook de Discord: Guarda URL en bóveda cifrada, envía pings de prueba y transmite auditorías</li><li>Filtros granulares con enrutamiento personalizado por servidor de destino</li></ul>"
            },
            perf_light: {
                title: "Centro de Rendimiento, Modo Ligero y Paleta de Comandos",
                desc: "<p>Herramientas de optimización y diagnóstico interno para la aplicación AeroMC.</p><ul><li>Centro de Rendimiento: Monitoreo en vivo del consumo de CPU y RAM de AeroMC</li><li>Detección de bloqueos de interfaz y Modo Ligero para reducir sondeos de fondo innecesarios</li><li>Paleta de Comandos: Navegación rápida mediante atajos de teclado para todas las funciones</li><li>Registros de diagnóstico con enmascaramiento automático de credenciales y recorrido inicial</li><li>Exportación cifrada de ajustes .aeromc-settings (archivos de mundos y claves maestras excluidos)</li></ul>"
            },
            ag_vault: {
                title: "1. Bóveda de Credenciales (AES-256-GCM)",
                desc: "<p>El núcleo de seguridad de identidad y claves de acceso de AeroMC.</p><ul><li>Cifrado AES-256-GCM para tokens de Exaroton, claves API de Pterodactyl y webhooks de Discord</li><li>Clave raíz de 256 bits vinculada al dispositivo generada por instalación; la bóveda no abre en otro equipo</li><li>Migración fluida para registros antiguos hacia el formato seguro</li><li>Las contraseñas maestras nunca se guardan en texto plano; solo hashes de verificación con sal</li><li>Bloqueo de operaciones de copiado, corte, menú contextual y arrastre en campos confidenciales</li></ul>"
            },
            ag_path: {
                title: "2. SafePathGuard e Integridad de Archivos",
                desc: "<p>Aislamiento estricto del sistema de archivos y auditoría de integridad.</p><ul><li>Bloquea intentos de salto de directorio (../) y escapes por enlaces simbólicos fuera de la raíz</li><li>Valida rutas de JAR, mundos, copias de seguridad y archivos de configuración antes de ejecutarse</li><li>Aplica escrituras atómicas para prevenir la corrupción de archivos ante cortes abruptos</li><li>Escaneos periódicos de integridad en certificados TLS, ajustes de seguridad y configuraciones clave</li></ul>"
            },
            ag_visual: {
                title: "3. Centro Visual AeroGuard e Inspector de Eventos",
                desc: "<p>Interfaz de auditoría y visualización de seguridad proactiva introducida en AeroMC 5.1.</p><ul><li>Vista de AeroGuard Core: Estado en tiempo real de Bóveda, Seguridad de Procesos y Acceso Remoto</li><li>Contador de incidentes bloqueados en la sesión y disparador de escaneo manual de seguridad</li><li>Inspector de Eventos: Registra incidentes con fecha, origen enmascarado y resultado</li><li>Sin datos sensibles en logs: Contraseñas, tokens y cuerpos de petición nunca son almacenados</li><li>Detección de intrusiones: Identifica ataques de fuerza bruta, anomalías CSRF e inundación de peticiones</li></ul>"
            },
            ag_remote: {
                title: "4. Acceso Remoto Cifrado y Protección Avanzada",
                desc: "<p>Interfaz web segura accesible en red local (LAN) para teléfonos y otros ordenadores.</p><ul><li>Panel remoto cifrado localmente mediante HTTPS/TLS 1.2 y 1.3</li><li>Control de Acceso por Roles: Roles Viewer, Moderator y Admin con registro de auditoría</li><li>Códigos de vinculación efímeros, validación de origen de sesión y tokens CSRF estrictos</li><li>Cabeceras HTTP reforzadas, CSP con nonce, límites en tamaño de petición y control de tasa</li><li>Protección Avanzada (V4): Ciclos de integridad cada 20 segundos y revocación inmediata de sesiones</li></ul>"
            }
        }
    };

    // -------------------------------------------------------------------------
    // Modal Triggers
    // -------------------------------------------------------------------------
    const featureModal = document.getElementById("featureModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const closeFeatureModal = document.getElementById("closeFeatureModal");
    const closeFeatureModalBtn = document.getElementById("closeFeatureModalBtn");

    document.querySelectorAll(".clickable[data-feature]").forEach((el) => {
        const featureKey = el.getAttribute("data-feature");

        const handleOpen = () => {
            const langData = featureDetails[currentLang] || featureDetails.en;
            const data = langData[featureKey] || (featureDetails.en && featureDetails.en[featureKey]);
            if (!data) return;

            if (modalTitle) modalTitle.textContent = data.title;
            if (modalDesc) modalDesc.innerHTML = data.desc;
            openModal(featureModal);
        };

        el.addEventListener("click", handleOpen);
        el.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen();
            }
        });
    });

    if (closeFeatureModal) {
        closeFeatureModal.addEventListener("click", () => closeModal(featureModal));
    }
    if (closeFeatureModalBtn) {
        closeFeatureModalBtn.addEventListener("click", () => closeModal(featureModal));
    }

    // License Modal
    const licenseModal = document.getElementById("licenseModal");
    const openLicense = document.getElementById("openLicense");
    const openLicenseFooterBtn = document.getElementById("openLicenseFooterBtn");
    const closeLicenseModal = document.getElementById("closeLicenseModal");
    const closeLicenseModalBtn = document.getElementById("closeLicenseModalBtn");

    if (openLicense) {
        openLicense.addEventListener("click", () => openModal(licenseModal));
    }
    if (openLicenseFooterBtn) {
        openLicenseFooterBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(licenseModal);
        });
    }
    if (closeLicenseModal) {
        closeLicenseModal.addEventListener("click", () => closeModal(licenseModal));
    }
    if (closeLicenseModalBtn) {
        closeLicenseModalBtn.addEventListener("click", () => closeModal(licenseModal));
    }

    // About Modal
    const aboutModal = document.getElementById("aboutModal");
    const openAboutBtn = document.getElementById("openAboutBtn");
    const openAboutFooterBtn = document.getElementById("openAboutFooterBtn");
    const closeAboutModal = document.getElementById("closeAboutModal");
    const closeAboutModalBtn = document.getElementById("closeAboutModalBtn");

    const handleAboutOpen = (e) => {
        e.preventDefault();
        openModal(aboutModal);
    };

    if (openAboutBtn) {
        openAboutBtn.addEventListener("click", handleAboutOpen);
    }
    if (openAboutFooterBtn) {
        openAboutFooterBtn.addEventListener("click", handleAboutOpen);
    }
    if (closeAboutModal) {
        closeAboutModal.addEventListener("click", () => closeModal(aboutModal));
    }
    if (closeAboutModalBtn) {
        closeAboutModalBtn.addEventListener("click", () => closeModal(aboutModal));
    }

    // Initialize Translations on load
    applyTranslations(currentLang);
});