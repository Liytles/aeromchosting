document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // 1. HUB EKRANI, WIPE VE UÇAN LOGO
    // =========================================
    const hubScreen = document.getElementById('hub-screen');
    const hubProjects = document.getElementById('hub-projects');
    const openAeromcBtn = document.getElementById('open-aeromc');
    const wipeTransition = document.getElementById('wipe-transition');
    const aeromcSite = document.getElementById('aeromc-site');

    const introLogo = document.getElementById('intro-logo');
    const navLogo = document.getElementById('nav-logo');

    if (hubScreen) {
        document.body.style.overflow = 'hidden'; 
        
        setTimeout(() => {
            document.getElementById('hub-intro').style.display = 'none'; 
            hubProjects.style.opacity = '1'; 
            hubProjects.style.pointerEvents = 'all'; 
        }, 4000); 
    }

    if (openAeromcBtn) {
        openAeromcBtn.addEventListener('click', () => {
            wipeTransition.classList.add('wipe-active');

            setTimeout(() => {
                hubScreen.style.display = 'none'; 
                aeromcSite.style.display = 'block'; 
                void aeromcSite.offsetWidth; 
                aeromcSite.style.opacity = '1';
                
                if(navLogo) navLogo.style.opacity = '0';
                if(introLogo) introLogo.style.opacity = '1';

                wipeTransition.classList.remove('wipe-active');
                wipeTransition.classList.add('wipe-out');

                setTimeout(() => {
                    wipeTransition.style.display = 'none';
                    
                    if (introLogo && navLogo) {
                        setTimeout(() => {
                            const targetRect = navLogo.getBoundingClientRect();
                            introLogo.style.animation = 'none';
                            introLogo.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
                            introLogo.style.top = targetRect.top + 'px';
                            introLogo.style.left = targetRect.left + 'px';
                            introLogo.style.width = targetRect.width + 'px';
                            introLogo.style.height = targetRect.height + 'px';
                            introLogo.style.transform = 'translate(0, 0)';
                            introLogo.style.filter = 'drop-shadow(0 0 0 transparent)';

                            const introScreen = document.getElementById('intro-screen');
                            if(introScreen) introScreen.style.opacity = '0';

                            setTimeout(() => {
                                navLogo.style.opacity = '1';
                                introLogo.remove();
                                if(introScreen) introScreen.remove(); 
                                document.body.style.overflow = ''; 
                            }, 1000);
                        }, 1000); 
                    } else {
                        document.body.style.overflow = '';
                    }

                }, 800); 
            }, 800); 
        });
    }

    // =========================================
    // 2. ANA SİTE MANTIKLARI (AKILLI İNDİRME)
    // =========================================

    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    const globalFlash = document.createElement('div');
    globalFlash.className = 'global-flash';
    document.body.appendChild(globalFlash);

    const btn = document.getElementById('dlBtn');
    const container = document.getElementById('dlContainer');
    const btnText = document.getElementById('btnText');
    const osIcon = document.getElementById('osIcon');
    const statusText = document.getElementById('dlStatus');
    const osGreeting = document.getElementById('osGreeting');

    // YENİ: GITHUB RELEASE LİNKLERİ ENTEGRE EDİLDİ
    function detectOS() {
        let userAgent = window.navigator.userAgent;
        if (userAgent.indexOf("Windows") !== -1) return { name: "Windows", icon: "🪟", file: "https://github.com/Liytles/aeromchosting/releases/download/v4/AeroMC-Setup.exe" };
        if (userAgent.indexOf("Mac") !== -1) return { name: "macOS", icon: "🍎", file: "https://github.com/Liytles/aeromchosting/releases/download/v4/AeroMC-Installer.dmg" };
        if (userAgent.indexOf("Linux") !== -1) return { name: "Linux", icon: "🐧", file: "https://github.com/Liytles/aeromchosting/releases/download/v4/AeroMC-Linux.deb" };
        
        // İşletim sistemi anlaşılamazsa standart olarak .exe dosyasını versin
        return { name: "Evrensel", icon: "📦", file: "https://github.com/Liytles/aeromchosting/releases/download/v4/AeroMC-Setup.exe" };
    }

    const currentOS = detectOS();
    if(btnText && osIcon && osGreeting) {
        btnText.innerText = currentOS.name + " İçin İndir";
        osIcon.innerText = currentOS.icon;
        osGreeting.innerHTML = `Sen <span>${currentOS.name}</span> kullanıyorsun! Harika, AeroMC'de <span>${currentOS.name}</span> desteği var!`;
    }

    if(container && btn) {
        container.addEventListener('mousemove', (e) => {
            if (container.classList.contains('exploding')) return;
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            document.querySelector('.left-piece').style.transform = `translate(${x * -10}px, calc(-50% + ${y * -10}px))`;
            document.querySelector('.right-piece').style.transform = `translate(${x * 10}px, calc(-50% + ${y * -10}px))`;
        });
        
        container.addEventListener('mouseleave', () => {
            if (container.classList.contains('exploding')) return;
            document.querySelector('.left-piece').style.transform = `translate(0, -50%)`;
            document.querySelector('.right-piece').style.transform = `translate(0, -50%)`;
        });
        
        btn.addEventListener('click', () => {
            if (container.classList.contains('exploding')) return; 
            container.classList.add('exploding');
            btnText.innerText = "Başlatılıyor...";
            
            document.body.style.overflow = 'hidden';
            
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            globalFlash.style.setProperty('--x', centerX + 'px');
            globalFlash.style.setProperty('--y', centerY + 'px');
            globalFlash.classList.remove('extinguish');
            globalFlash.classList.add('ignite');

            setTimeout(() => {
                globalFlash.classList.remove('ignite');
                globalFlash.classList.add('extinguish');
                statusText.innerText = `AeroMC ${currentOS.name} sürümü güvenli bir şekilde indiriliyor...`;
                statusText.style.opacity = "1";
                
                // Animasyon parladığı anda doğru GitHub dosyasını indir
                const downloadLink = document.createElement('a');
                downloadLink.href = currentOS.file; 
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                setTimeout(() => {
                    globalFlash.classList.remove('extinguish');
                    document.body.style.overflow = '';
                }, 1000);
            }, 1200); 
        });
    } 

    const heroLogo = document.querySelector('.hero-logo');
    const agMainLogo = document.querySelector('.ag-main-logo');
    const downloadSection = document.getElementById('download');

    function applyGravity(logoElement) {
        if (!logoElement || !downloadSection) return;
        logoElement.addEventListener('click', () => {
            if (logoElement.classList.contains('falling')) return;
            logoElement.classList.add('falling');

            const logoRect = logoElement.getBoundingClientRect();
            const downloadRect = downloadSection.getBoundingClientRect();
            const currentScrollY = window.scrollY;
            const dropDistance = (downloadRect.top + currentScrollY) - (logoRect.top + currentScrollY) - logoRect.height;

            logoElement.style.position = 'relative';
            logoElement.style.zIndex = '9000';
            logoElement.style.setProperty('--drop-y', `${dropDistance}px`);
        });
    }
    applyGravity(heroLogo);
    applyGravity(agMainLogo);

    const licenseModal = document.getElementById("licenseModal");
    const openLicense = document.getElementById("openLicense");
    const closeLicense = document.getElementById("closeLicense");
    if (openLicense && licenseModal && closeLicense) {
        openLicense.addEventListener('click', () => licenseModal.style.display = "block");
        closeLicense.addEventListener('click', () => licenseModal.style.display = "none");
        window.addEventListener('click', (e) => { if (e.target == licenseModal) licenseModal.style.display = "none"; });
    }

    const featureOverlay = document.getElementById("featureOverlay");
    const closeOverlay = document.getElementById("closeOverlay");
    const foIcon = document.getElementById("foIcon");
    const foTitle = document.getElementById("foTitle");
    const foDesc = document.getElementById("foDesc");

    const featureData = {
        performance: { icon: "⚡", anim: "anim-pulse", title: "Akıllı Performans & Kriz Modu", desc: "Sunucunun anlık kalp atışını izler. Eğer TPS aniden düşerse veya RAM şişerse Kriz Modu devreye girer.<ul><li>CPU, RAM ve gecikme için canlı grafikler</li><li>Çökme Doktoru ile hata loglarını saniyeler içinde analiz</li><li>Kriz Modu geçmişi (sebebi, eşiği ve süresi)</li><li>İki Spark raporunu karşılaştırma imkanı</li></ul>" },
        network: { icon: "☁️", anim: "anim-float", title: "Exaroton & Pterodactyl Ağı", desc: "Artık tarayıcı sekmelerinde boğulmaya son! Tüm filoyu AeroMC içinden yönet.<ul><li>Exaroton Kredi Koruması: Bütçe sınırına gelince oyuncuları uyarır ve sunucuyu kapatır.</li><li>Resmi API ve kısa ömürlü WebSocket ile ultra hızlı canlı konsol</li><li>Oyuncusuz kalan sunucuları toplu durdurma</li></ul>" },
        mods: { icon: "📦", anim: "anim-float", title: "Tek Tık Mod & Eklenti Merkezi", desc: "Modrinth entegrasyonu ile artık sürüm uyuşmazlığına son veriyoruz.<ul><li>Bağımlılık Çözücü: Bir mod başka bir mod istiyorsa onu da otomatik kurar.</li><li>SHA-512 doğrulama ile bozuk dosyaları reddeder</li><li>Kurulum başarısız olursa sunucuyu eski haline getirir (Güvenli Geri Alma)</li></ul>" },
        automation: { icon: "🤖", anim: "anim-spin", title: "Otomasyon & Bildirimler", desc: "Sunucunu yapay zekaya emanet et, sen kahveni iç.<ul><li>Discord Webhook üzerinden renkli embed çökme ve yedek bildirimleri</li><li>Dakika bazlı yedekleme ve yeniden başlatma görevleri</li><li>Önem filtresi ve sessiz saatler özelliği</li></ul>" },
        ingame: { icon: "🎮", anim: "anim-pulse", title: "Oyun İçi Kısayollar (.aeromc)", desc: "Oyundayken panele dönmene gerek yok. Yalnızca OP olanların kullanabildiği özel komut sistemi.<ul><li><code>.aeromc kriz</code> ile acil durum müdahalesi</li><li><code>.aeromc sağlık</code> ile sunucu raporu</li><li>Game Helper: Masaüstünde sürekli üstte kalan şeffaf radar penceresi</li></ul>" },
        wizard: { icon: "🛠️", anim: "anim-spin", title: "Gelişmiş Kurulum Sihirbazı", desc: "AeroMC ile sıfırdan sunucu açmak sadece 15 saniye sürer.<ul><li>Hazır Profiller: Friends SMP, Performance, Maintenance</li><li>Otomatik Java sürümü kontrolü (Örn: Paper 1.21 için otomatik Java 21 seçimi)</li><li>İsteğe bağlı Spark kurulumunu baştan yapar</li></ul>" },
        ag_vault: { icon: "🛡️", anim: "anim-pulse", title: "AES-256-GCM Şifreli Kasa", desc: "Anahtar teslim bir güvenlik. API anahtarların, webhook URL'lerin ve sunucu parolaların askeri düzeyde şifrelenir. Ana parolan bilgisayarının diskine kesinlikle yazılmaz, sadece oturum açıkken bellekte (RAM) tutulur." },
        ag_protection: { icon: "🚫", anim: "anim-float", title: "Pano & Veri Koruması", desc: "Hassas alanlarda kullanıcı hatalarına karşı katı bir zırh.<ul><li>API kutularında Kopyalama, Kesme ve Sağ Tık yasaktır.</li><li>Yanlışlıkla sürükle-bırak yöntemiyle veri hırsızlığı yapılamaz.</li><li>Hassas komut filtreleri ile zararlı kod enjeksiyonunu durdurur.</li></ul>" },
        ag_path: { icon: "📂", anim: "anim-pulse", title: "SafePathGuard", desc: "AeroMC'nin sistem dosyalarında dolaşmasını engeller. Path Traversal (Dizin Atlama) saldırılarına karşı özel bir güvenlik duvarıdır. Sadece senin belirlediğin sunucu klasöründe işlem yapılabilir." },
        ag_tls: { icon: "🔐", anim: "anim-spin", title: "RSA-3072 & TLS", desc: "Yerel bir sunucu olsa bile dış dünya ile iletişimi maksimum gizlilikte tutar.<ul><li>Uzaktan erişimde zorunlu TLS 1.2/1.3 protokolü</li><li>Brute-Force (Kaba Kuvvet) saldırılarına karşı başarısız giriş hız sınırlandırması</li><li>CSRF ve CSP koruması</li></ul>" }
    };

    const featureCards = document.querySelectorAll('.clickable');
    if(featureCards.length > 0 && featureOverlay) {
        featureCards.forEach(card => {
            card.addEventListener('click', () => {
                const featureId = card.getAttribute('data-feature');
                const data = featureData[featureId];
                if(data) {
                    foIcon.innerText = data.icon;
                    foIcon.className = `fo-icon ${data.anim}`; 
                    foTitle.innerText = data.title;
                    foDesc.innerHTML = data.desc;
                    featureOverlay.classList.add('active');
                }
            });
        });
        closeOverlay.addEventListener('click', () => featureOverlay.classList.remove('active'));
        window.addEventListener('click', (e) => {
            if (e.target == featureOverlay) featureOverlay.classList.remove('active');
        });
    }
});