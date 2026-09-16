/**
 * AeroMC 5.1 Multi-Language Translation Dictionaries
 * Clean engineering copy for Turkish (TR), English (EN), and Spanish (ES).
 * Zero vibe-coding tropes: no emojis, no em dashes.
 */

const TRANSLATIONS = {
    tr: {
        // Navigation
        "nav.providers": "Sağlayıcılar",
        "nav.features": "Özellikler",
        "nav.security": "AeroGuard",
        "nav.download": "İndir",
        "nav.about": "Hakkında",
        "nav.privacy": "Gizlilik",
        "nav.terms": "Şartlar",
        "version.badge": "v5.1 Beta",

        // Hero
        "hero.badge": "AeroMC 5.1 Beta Yayında | Haftalık Rapor, Oyun İçi HUD ve AeroGuard Core",
        "hero.title": "Minecraft Sunucuları İçin Çoklu Sağlayıcı Yönetim Paneli",
        "hero.subtitle": "Yerel JAR, Exaroton, Aternos ve Pterodactyl altyapılarınızı tek bir JavaFX masaüstü uygulamasından yönetin. Sunucuyu izleyin, otomatikleştirin, gerçek verilerle raporlayın ve AeroGuard ile güvene alın.",
        "hero.cta.download": "AeroMC 5.1 Beta İndir",
        "hero.cta.providers": "Sağlayıcı Mimarisi",
        "hero.spec.providers.label": "Desteklenen Sağlayıcılar",
        "hero.spec.providers.val": "Yerel JAR, Exaroton, Aternos, Pterodactyl",
        "hero.spec.new.label": "Yeni Özellikler",
        "hero.spec.new.val": "Haftalık Rapor, Sağ Shift HUD, AeroGuard Core",
        "hero.spec.security.label": "Güvenlik Standardı",
        "hero.spec.security.val": "AeroGuard V3 / V4 (AES-256-GCM, TLS 1.3)",

        // Providers Section
        "providers.tag": "Entegre Altyapılar",
        "providers.heading": "Dört Sağlayıcı Desteği",
        "providers.desc": "Farklı platformlardaki sunucularınızı tek bir merkezde toplayın: yerel donanım, resmî API veya uzak paneller.",
        "card.details": "Detayları İncele",
        "prov.local.title": "Yerel JAR Sunucuları",
        "prov.local.desc": "Yerel .jar sunucusu seçme ve tam yönetim. Başlatma öncesi Java, port ve yedek kontrolü yapan Başlatma Kontrolü; canlı konsol, hızlı komutlar ve güvenli .bak yedeği.",
        "prov.exaroton.title": "Exaroton Resmî API",
        "prov.exaroton.desc": "Filo Paneli ile çoklu sunucu takibi, canlı konsol ve komut gönderimi. Saatlik maliyet, düşük kredi eşiği ve bütçe koruması, hafta içi/sonu zaman programları ve otomatik çökme kurtarma.",
        "prov.pterodactyl.title": "Pterodactyl Client API",
        "prov.pterodactyl.desc": "Panel URL ve API anahtarını güvenli kasada saklama, çoklu sunucu seçimi. Kısa ömürlü WebSocket biletiyle canlı konsol, CPU/RAM/disk telemetrisi ve Kontrol Merkezi entegrasyonu.",
        "prov.aternos.title": "Aternos Durum Takibi",
        "prov.aternos.desc": "Sunucunun herkese açık Minecraft durumunu güvenle kontrol etme. Çevrimiçi/çevrimdışı durumu, oyuncu sayısı, sürüm ve gecikme takibi ile resmî Aternos paneline doğrudan geçiş.",

        // Features Section
        "features.tag": "Kontrol ve Analiz Merkezi",
        "features.heading": "5.1 Sürümüyle Gelen Güçlü Araçlar",
        "features.desc": "Sunucu sağlığını izleyen, arıza durumlarını önceden teşhis eden ve oyuncu deneyimini artıran mühendislik özellikleri.",
        "feat.health.title": "Sağlık Puanı, Kriz Modu ve Çökme Doktoru",
        "feat.health.desc": "CPU/TPS, RAM ve gecikme grafikleriyle canlı sağlık puanı. Eşik aşıldığında koruyucu eylemler alan Kriz Modu ve konsol hatalarından kök nedeni bulup döngüyü önleyen Akıllı Çökme Doktoru.",
        "feat.weekly.title": "Haftalık Rapor Merkezi",
        "feat.weekly.desc": "Son 7 gündeki gerçek yerel verilerle hazırlanan rapor. Tahmin uydurmaz: tekrarlayan hatalar, en stabil sunucu analizi, yeni ve dönen oyuncu istatistikleri ile Exaroton/Pterodactyl tasarruf tavsiyeleri.",
        "feat.hud.title": "Oyun İçi .aeromc, Özel Komutlar ve Sağ Shift HUD",
        "feat.hud.desc": "Eklenti gerektirmeyen .aeromc komutları ve kendi özel komutlarınızı tanımlama desteği. Oyun içindeyken Sağ Shift tuşu ile açılan şeffaf AeroMC denetim ve bilgi katmanı.",
        "feat.mods.title": "Modrinth Paketleri ve Güvenli Dünya Kurtarma",
        "feat.mods.desc": "Modrinth üzerinden mod arama, sürüm ve yükleyici uyumluluğu kontrolü, SHA-512 doğrulaması. Dünya kurtarma: işlem öncesi otomatik yedek alır ve eski dünyayı tarihli kurtarma klasörüne taşır.",
        "feat.notif.title": "Bildirim Merkezi ve Discord Entegrasyonu",
        "feat.notif.desc": "Okunmamış sayısı, önem filtresi ve durum doğrulaması ile yanlış alarmları önleyen Bildirim Merkezi. Kasada şifrelenen webhook bağlantısı ile sunucu ve güvenlik olaylarını Discord kanalına iletme.",
        "feat.perf.title": "Performans Merkezi, Hafif Mod ve Komut Paleti",
        "feat.perf.desc": "AeroMC'nin kendi CPU/RAM kullanımını izleyen Performans Merkezi, donma algılama, yenilemeleri azaltan Hafif Mod, klavyeyle hızlı eylemleri tetikleyen Komut Paleti ve şifreli .aeromc-settings aktarımı.",

        // AeroGuard Section
        "security.badge": "AeroGuard V3 / V4 Güvenlik Katmanı",
        "security.heading": "AeroGuard Çekirdek Güvenlik Mimarisi",
        "security.desc": "AeroGuard bir antivirüs değildir; AeroMC'nin yönettiği sunucu alanını, kimlik bilgilerini, dosya bütünlüğünü ve uzaktan erişim kanallarını sertleştiren çok katmanlı savunma mimarisidir.",
        "sec.vault.title": "1. Kimlik Kasası (AES-256-GCM)",
        "sec.vault.desc": "Exaroton, Pterodactyl ve Discord anahtarlarını cihaza bağlı 256-bit anahtarla şifreler. Başka cihaza kopyalanırsa açılmaz. Gizli alanlarda kopyala, kes, sağ tık ve sürükleme engellenir.",
        "sec.path.title": "2. SafePathGuard ve Dosya Bütünlüğü",
        "sec.path.desc": "../ yol aşımı saldırılarını ve sembolik bağlantı kaçışlarını engeller. Atomik yazma ile dosya bozulma riskini önler. Hassas dosyalarda periyodik bütünlük ve izin denetimi yapar.",
        "sec.visual.title": "3. AeroGuard Görsel Merkezi ve Olay İnceleyici",
        "sec.visual.desc": "Katmanlı AeroGuard Core görünümü, oturumda engellenen olay sayaçları ve katman sağlığı. Maskelenmiş kaynaklarla olay inceleme, yanlış pozitif işaretleme ve saldırı tespiti.",
        "sec.remote.title": "4. Şifreli Uzaktan Erişim ve Gelişmiş Koruma",
        "sec.remote.desc": "Tarayıcıdan LAN üzerinden TLS 1.2/1.3 https:// erişimi. Viewer, Moderator ve Admin rolleri; PBKDF2 parola koruması, CSRF belirteci, nonce CSP, eşleştirme kodu ve istek sınırlandırması.",

        // Download Section
        "dl.tag": "Dağıtım ve İndirme",
        "dl.heading": "AeroMC 5.1 Beta Kurulum Paketleri",
        "dl.desc.default": "AeroMC 5.1 yayın paketleri gömülü Java çalışma ortamını içerir. Harici Java kurulumuna gerek yoktur.",
        "dl.title": "AeroMC 5.1 Beta Masaüstü İstemcisi",
        "dl.meta.default": "64-bit bağımsız masaüstü ikili paketi",
        "dl.btn.prefix": "İndir",
        "dl.alt.label": "Doğrudan Platform Paketleri:",
        "dl.notice": "AeroMC kurulumu yaparak <a href=\"terms.html\">Kullanım Koşulları</a> ve <a href=\"privacy.html\">Gizlilik Politikası</a> şartlarını kabul etmiş olursunuz. Lisans metnini görüntülemek için <button type=\"button\" id=\"openLicense\" class=\"text-link\">yazılım lisans sözleşmesini</button> inceleyebilirsiniz.",

        // Footer
        "footer.desc": "Yerel JAR, Exaroton, Aternos ve Pterodactyl için JavaFX tabanlı çoklu sunucu yönetim ve güvenlik platformu.",
        "footer.owner": "Geliştirici: Liytles | The Aero Group",
        "footer.nav.title": "Navigasyon",
        "footer.legal.title": "Yasal ve Belgeler",
        "footer.community.title": "Topluluk ve Kod",
        "footer.repo": "GitHub Deposu",
        "footer.releases": "Tüm Sürümler",
        "footer.rights": "&copy; 2026 The Aero Group. Tüm hakları saklıdır.",
        "modal.close": "Kapat"
    },

    en: {
        // Navigation
        "nav.providers": "Providers",
        "nav.features": "Features",
        "nav.security": "AeroGuard",
        "nav.download": "Download",
        "nav.about": "About",
        "nav.privacy": "Privacy",
        "nav.terms": "Terms",
        "version.badge": "v5.1 Beta",

        // Hero
        "hero.badge": "AeroMC 5.1 Beta Released | Weekly Reports, In-Game HUD and AeroGuard Core",
        "hero.title": "Multi-Provider Management Panel for Minecraft Servers",
        "hero.subtitle": "Manage your Local JAR, Exaroton, Aternos, and Pterodactyl infrastructure from a single JavaFX desktop application. Monitor, automate, report with real data, and secure with AeroGuard.",
        "hero.cta.download": "Download AeroMC 5.1 Beta",
        "hero.cta.providers": "Provider Architecture",
        "hero.spec.providers.label": "Supported Providers",
        "hero.spec.providers.val": "Local JAR, Exaroton, Aternos, Pterodactyl",
        "hero.spec.new.label": "New Capabilities",
        "hero.spec.new.val": "Weekly Reports, Right-Shift HUD, AeroGuard Core",
        "hero.spec.security.label": "Security Standard",
        "hero.spec.security.val": "AeroGuard V3 / V4 (AES-256-GCM, TLS 1.3)",

        // Providers Section
        "providers.tag": "Integrated Infrastructure",
        "providers.heading": "Four Provider Support",
        "providers.desc": "Unify servers across diverse hosting environments into a centralized interface: local bare-metal, official APIs, or remote panels.",
        "card.details": "Technical Overview",
        "prov.local.title": "Local JAR Servers",
        "prov.local.desc": "Select and fully manage local .jar server instances. Startup Checks verify Java runtime, port availability, and backup status; live terminal, quick shortcuts, and atomic .bak safety.",
        "prov.exaroton.title": "Exaroton Official API",
        "prov.exaroton.desc": "Fleet management with multi-instance monitoring, live interactive console, and command execution. Real-time credit metering (1 credit/GiB/hr), auto-stop policies, and schedules.",
        "prov.pterodactyl.title": "Pterodactyl Client API",
        "prov.pterodactyl.desc": "Store panel URL and ptlc_... Client API tokens in encrypted vault. Multi-server selection, short-lived ticket WebSocket stream, CPU/RAM/disk telemetry, and Control Center sync.",
        "prov.aternos.title": "Aternos Status Monitor",
        "prov.aternos.desc": "Securely read public Minecraft status indicators. Real-time online/offline states, player counts, server version, ping telemetry, and direct link to the official Aternos dashboard.",

        // Features Section
        "features.tag": "Control & Diagnostics",
        "features.heading": "Advanced Engineering in Version 5.1",
        "features.desc": "Engineering tools designed to track server health, diagnose root causes before crashes occur, and elevate operational resilience.",
        "feat.health.title": "Health Score, Crisis Mode & Crash Doctor",
        "feat.health.desc": "Live 0-100 Server Health Score calculated from CPU, TPS, RAM, and latency. Crisis Mode throttles heavy tasks under pressure; Smart Crash Doctor parses stack traces to isolate culprits.",
        "feat.weekly.title": "Weekly Report Center",
        "feat.weekly.desc": "Powered by authentic local metrics recorded during panel sessions. Zero guesswork: recurring error logs, fleet stability benchmarks, player retention trends, and cost-saving audits.",
        "feat.hud.title": "In-Game .aeromc, Custom Commands & Right-Shift HUD",
        "feat.hud.desc": "Zero server-side plugin requirement. In-game .aeromc commands for OP operators, custom action triggers, and a transparent on-screen HUD overlay toggled via Right Shift.",
        "feat.mods.title": "Modrinth Ecosystem & Safe World Recovery",
        "feat.mods.desc": "Query Modrinth packages with loader and version compatibility filters, verified with SHA-512 hashes. World recovery creates pre-action backups and archives previous states safely.",
        "feat.notif.title": "Notification Center & Discord Webhooks",
        "feat.notif.desc": "Notification Center equipped with severity filters, unread badges, and consecutive state verification. Forward server crashes, credit warnings, and audit events to Discord.",
        "feat.perf.title": "Performance Center, Light Mode & Command Palette",
        "feat.perf.desc": "Real-time tracking of AeroMC internal CPU and RAM usage, interface freeze detection, polling reduction via Light Mode, keyboard Command Palette, and encrypted .aeromc-settings export.",

        // AeroGuard Section
        "security.badge": "AeroGuard V3 / V4 Security Layer",
        "security.heading": "AeroGuard Core Security Architecture",
        "security.desc": "AeroGuard is not an antivirus; it is a layered hardening defense system protecting the application perimeter, credentials, file integrity, and remote access channels.",
        "sec.vault.title": "1. Credential Vault (AES-256-GCM)",
        "sec.vault.desc": "Hardware-bound 256-bit encryption for Exaroton, Pterodactyl, and Discord tokens. Vault fails verification if moved across devices. Clipboard scraping, drag, and cut actions blocked.",
        "sec.path.title": "2. SafePathGuard & File Integrity",
        "sec.path.desc": "Prevents directory traversal (../) and symlink escapes. Enforces atomic writes to avoid partial corruption. Periodic file permission audits and POSIX 700/600 lockdown.",
        "sec.visual.title": "3. AeroGuard Visual Core & Event Inspector",
        "sec.visual.desc": "Layered AeroGuard Core visualization, session blocked event counters, and layer health telemetry. Masked intrusion logging, false-positive tagging, and brute-force mitigation.",
        "sec.remote.title": "4. Encrypted Remote Access & Hardening",
        "sec.remote.desc": "Local TLS 1.2/1.3 https:// access across LAN. Role-Based Access Control (Viewer, Moderator, Admin), PBKDF2 password hashing, CSRF tokens, strict CSP nonces, and pairing limits.",

        // Download Section
        "dl.tag": "Distribution & Binaries",
        "dl.heading": "AeroMC 5.1 Beta Installation Packages",
        "dl.desc.default": "AeroMC 5.1 release packages bundle an embedded Java runtime environment. No external Java or Maven installation is required.",
        "dl.title": "AeroMC 5.1 Beta Desktop Client",
        "dl.meta.default": "64-bit standalone desktop executable package",
        "dl.btn.prefix": "Download",
        "dl.alt.label": "Direct Platform Installers:",
        "dl.notice": "By installing AeroMC you agree to our <a href=\"terms.html\">Terms of Service</a> and <a href=\"privacy.html\">Privacy Policy</a>. Review the <button type=\"button\" id=\"openLicense\" class=\"text-link\">software license agreement</button> for full legal terms.",

        // Footer
        "footer.desc": "JavaFX multi-server management and security platform for Local JAR, Exaroton, Aternos, and Pterodactyl infrastructure.",
        "footer.owner": "Developer: Liytles | The Aero Group",
        "footer.nav.title": "Navigation",
        "footer.legal.title": "Legal & Docs",
        "footer.community.title": "Community & Code",
        "footer.repo": "GitHub Repository",
        "footer.releases": "All Releases",
        "footer.rights": "&copy; 2026 The Aero Group. All rights reserved.",
        "modal.close": "Close"
    },

    es: {
        // Navigation
        "nav.providers": "Proveedores",
        "nav.features": "Características",
        "nav.security": "AeroGuard",
        "nav.download": "Descargar",
        "nav.about": "Acerca de",
        "nav.privacy": "Privacidad",
        "nav.terms": "Términos",
        "version.badge": "v5.1 Beta",

        // Hero
        "hero.badge": "AeroMC 5.1 Beta Publicado | Informes Semanales, HUD en el Juego y AeroGuard Core",
        "hero.title": "Panel de Gestión Multi-Proveedor para Servidores de Minecraft",
        "hero.subtitle": "Administre su infraestructura de JAR Local, Exaroton, Aternos y Pterodactyl desde una única aplicación de escritorio JavaFX. Monitoree, automatice, informe con datos reales y asegure con AeroGuard.",
        "hero.cta.download": "Descargar AeroMC 5.1 Beta",
        "hero.cta.providers": "Arquitectura de Proveedores",
        "hero.spec.providers.label": "Proveedores Compatibles",
        "hero.spec.providers.val": "JAR Local, Exaroton, Aternos, Pterodactyl",
        "hero.spec.new.label": "Novedades 5.1",
        "hero.spec.new.val": "Informes Semanales, HUD Shift Derecho, AeroGuard Core",
        "hero.spec.security.label": "Estándar de Seguridad",
        "hero.spec.security.val": "AeroGuard V3 / V4 (AES-256-GCM, TLS 1.3)",

        // Providers Section
        "providers.tag": "Infraestructura Integrada",
        "providers.heading": "Compatibilidad con Cuatro Proveedores",
        "providers.desc": "Unifique sus servidores distribuidos en una consola centralizada: servidores locales, API oficial o paneles remotos.",
        "card.details": "Detalles Técnicos",
        "prov.local.title": "Servidores JAR Locales",
        "prov.local.desc": "Gestión exhaustiva de instancias .jar locales. Comprobación previa de versión de Java, puertos y copias de seguridad; consola en vivo, comandos rápidos y respaldos seguros .bak.",
        "prov.exaroton.title": "API Oficial de Exaroton",
        "prov.exaroton.desc": "Monitoreo de flotas con múltiples servidores, consola interactiva y ejecución de comandos. Control de créditos (1 crédito/GiB/h), detención automática por inactividad y horarios.",
        "prov.pterodactyl.title": "API de Cliente Pterodactyl",
        "prov.pterodactyl.desc": "Almacenamiento seguro de credenciales ptlc_... en bóveda cifrada. Selección de múltiples servidores, transmisión WebSocket con tickets efímeros, telemetría y Centro de Control.",
        "prov.aternos.title": "Monitor de Estado Aternos",
        "prov.aternos.desc": "Comprobación segura de parámetros públicos de Minecraft. Estado en línea/desconectado, conteo de jugadores, versión, ping y acceso directo al panel oficial de Aternos.",

        // Features Section
        "features.tag": "Centro de Control y Diagnóstico",
        "features.heading": "Herramientas Avanzadas en la Versión 5.1",
        "features.desc": "Módulos de ingeniería diseñados para auditar la estabilidad, diagnosticar fallas antes de que ocurran y optimizar la experiencia.",
        "feat.health.title": "Puntaje de Salud, Modo Crisis y Doctor de Caídas",
        "feat.health.desc": "Puntuación de salud 0-100 calculada en tiempo real mediante CPU, TPS, RAM y latencia. Modo Crisis mitiga sobrecargas y el Doctor de Caídas analiza registros para encontrar la causa raíz.",
        "feat.weekly.title": "Centro de Informes Semanales",
        "feat.weekly.desc": "Impulsado por telemetría local real registrada durante las sesiones. Sin estimaciones artificiales: análisis de estabilidad, errores recurrentes, retención de jugadores y sugerencias de ahorro.",
        "feat.hud.title": "Comandos en el Juego .aeromc, Acciones Personalizadas y HUD",
        "feat.hud.desc": "Sin necesidad de plugins en el servidor. Comandos .aeromc para administradores OP, creación de comandos propios y capa de información transparente (HUD) activada con Shift Derecho.",
        "feat.mods.title": "Ecosistema Modrinth y Recuperación Segura de Mundos",
        "feat.mods.desc": "Búsqueda en Modrinth con filtros de versión y cargador, verificación por hash SHA-512. La recuperación de mundos realiza copias previas automáticas y archiva estados anteriores.",
        "feat.notif.title": "Centro de Notificaciones e Integración Discord",
        "feat.notif.desc": "Centro de alertas con filtros de severidad, insignias de no leídos y verificación de estado para evitar falsos positivos. Envío cifrado de eventos críticos a canales de Discord.",
        "feat.perf.title": "Centro de Rendimiento, Modo Ligero y Paleta de Comandos",
        "feat.perf.desc": "Monitoreo en vivo del consumo de CPU/RAM de AeroMC, detección de bloqueos de interfaz, Modo Ligero para reducir sondeos y exportación cifrada de configuración .aeromc-settings.",

        // AeroGuard Section
        "security.badge": "Capa de Seguridad AeroGuard V3 / V4",
        "security.heading": "Arquitectura de Seguridad AeroGuard Core",
        "security.desc": "AeroGuard no es un antivirus; es una arquitectura de defensa en capas que blinda el entorno de la aplicación, credenciales, integridad de archivos y accesos remotos.",
        "sec.vault.title": "1. Bóveda de Credenciales (AES-256-GCM)",
        "sec.vault.desc": "Cifrado vinculado al hardware de 256 bits para tokens de Exaroton, Pterodactyl y Discord. Bloqueo de copiado, corte, clic derecho y arrastre en campos confidenciales.",
        "sec.path.title": "2. SafePathGuard e Integridad de Archivos",
        "sec.path.desc": "Bloquea ataques de salto de directorio (../) y enlaces simbólicos. Escrituras atómicas para prevenir archivos corruptos. Auditoría periódica de permisos de archivos y aislamiento POSIX 700/600.",
        "sec.visual.title": "3. Centro Visual AeroGuard e Inspector de Eventos",
        "sec.visual.desc": "Visualización por capas de AeroGuard Core, contadores de eventos bloqueados y estado de salud. Registro de anomalías con orígenes enmascarados y mitigación de ataques de fuerza bruta.",
        "sec.remote.title": "4. Acceso Remoto Cifrado y Protección Avanzada",
        "sec.remote.desc": "Acceso seguro https:// mediante TLS 1.2/1.3 en red local. Roles Viewer, Moderator y Admin; claves PBKDF2, tokens CSRF, nonce CSP, códigos de vinculación efímeros y límite de peticiones.",

        // Download Section
        "dl.tag": "Distribución y Paquetes",
        "dl.heading": "Paquetes de Instalación AeroMC 5.1 Beta",
        "dl.desc.default": "Los instaladores de AeroMC 5.1 incluyen un entorno de ejecución Java integrado. No se requiere instalar Java o Maven por separado.",
        "dl.title": "Cliente de Escritorio AeroMC 5.1 Beta",
        "dl.meta.default": "Paquete ejecutable de 64 bits para escritorio",
        "dl.btn.prefix": "Descargar",
        "dl.alt.label": "Instaladores Directos por Plataforma:",
        "dl.notice": "Al instalar AeroMC, acepta nuestros <a href=\"terms.html\">Términos de Uso</a> y <a href=\"privacy.html\">Política de Privacidad</a>. Revise el <button type=\"button\" id=\"openLicense\" class=\"text-link\">acuerdo de licencia</button> para conocer las condiciones legales.",

        // Footer
        "footer.desc": "Plataforma JavaFX de gestión y seguridad multi-servidor para JAR Local, Exaroton, Aternos y Pterodactyl.",
        "footer.owner": "Desarrollador: Liytles | The Aero Group",
        "footer.nav.title": "Navegación",
        "footer.legal.title": "Legal y Documentos",
        "footer.community.title": "Comunidad y Código",
        "footer.repo": "Repositorio GitHub",
        "footer.releases": "Todas las Versiones",
        "footer.rights": "&copy; 2026 The Aero Group. Todos los derechos reservados.",
        "modal.close": "Cerrar"
    }
};

window.TRANSLATIONS = TRANSLATIONS;
