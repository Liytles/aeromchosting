document.addEventListener("DOMContentLoaded", () => {
    
    let audioCtx;
    let isMuted = false;

    const muteBtn = document.getElementById('muteBtn');
    if (muteBtn) {
        muteBtn.addEventListener('click', (e) => {
            isMuted = !isMuted;
            muteBtn.innerText = isMuted ? '🔇' : '🔊';
            muteBtn.classList.toggle('muted', isMuted);
            e.stopPropagation(); 
        });
    }
    
    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });

    function playSound(type) {
        if (isMuted || !audioCtx) return; 
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        if (type === 'hover') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            gainNode.gain.setValueAtTime(0.015, now); 
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.start(now);
            osc.stop(now + 0.04);
        } else if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
            gainNode.gain.setValueAtTime(0.03, now); 
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'whoosh') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.6);
            gainNode.gain.setValueAtTime(0.04, now);
            gainNode.gain.linearRampToValueAtTime(0.001, now + 0.6);
            osc.start(now);
            osc.stop(now + 0.6);
        } else if (type === 'explode') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(10, now + 0.8);
            gainNode.gain.setValueAtTime(0.1, now); 
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            osc.start(now);
            osc.stop(now + 0.8);
        }
    }

    setTimeout(() => {
        const interactiveElements = document.querySelectorAll('a, .clickable, .hacker-btn, .download-btn, .project-card, .egg-icon, .close-overlay, .close-about, .close-fake-panel');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => playSound('hover'));
            el.addEventListener('click', () => {
                if(el.id !== 'dlBtn' && el.id !== 'theEgg' && el.id !== 'openAboutBtn') {
                    playSound('click');
                }
            });
        });
    }, 1000); 

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
            playSound('whoosh'); 
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

    function detectOS() {
        let userAgent = window.navigator.userAgent;
        if (userAgent.indexOf("Windows") !== -1) return { name: "Windows", icon: "🪟" };
        if (userAgent.indexOf("Mac") !== -1) return { name: "macOS", icon: "🍎" };
        if (userAgent.indexOf("Linux") !== -1) return { name: "Linux", icon: "🐧" };
        
        return { name: "Evrensel", icon: "📦" };
    }

    const currentOS = detectOS();
    if(btnText && osIcon && osGreeting) {
        btnText.innerText = currentOS.name + " İçin İndir";
        osIcon.innerText = currentOS.icon;
        osGreeting.innerHTML = `Sen <span>${currentOS.name}</span> kullanıyorsun! Harika, AeroMC'de <span>${currentOS.name}</span> desteği var!`;
    }

    async function fetchLatestRelease(osName) {
        try {
            const res = await fetch('https://api.github.com/repos/Liytles/aeromchosting/releases/latest');
            const data = await res.json();
            
            let ext = ".exe"; 
            if (osName === "macOS") ext = ".dmg";
            if (osName === "Linux") ext = ".deb";

            const asset = data.assets.find(a => a.name.endsWith(ext));
            
            return asset ? asset.browser_download_url : 'https://github.com/Liytles/aeromchosting/releases/latest';
        } catch (err) {
            console.error(err);
            return 'https://github.com/Liytles/aeromchosting/releases/latest';
        }
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
        
        btn.addEventListener('click', async () => {
            if (container.classList.contains('exploding')) return; 
            
            playSound('explode'); 

            container.classList.add('exploding');
            btnText.innerText = "Sürüm Aranıyor..."; 
            
            document.body.style.overflow = 'hidden';
            
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            globalFlash.style.setProperty('--x', centerX + 'px');
            globalFlash.style.setProperty('--y', centerY + 'px');
            globalFlash.classList.remove('extinguish');
            globalFlash.classList.add('ignite');

            const finalDownloadUrl = await fetchLatestRelease(currentOS.name);

            setTimeout(() => {
                globalFlash.classList.remove('ignite');
                globalFlash.classList.add('extinguish');
                statusText.innerText = `AeroMC ${currentOS.name} en güncel sürümü indiriliyor...`;
                statusText.style.opacity = "1";
                
                const downloadLink = document.createElement('a');
                downloadLink.href = finalDownloadUrl; 
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                setTimeout(() => {
                    globalFlash.classList.remove('extinguish');
                    document.body.style.overflow = '';
                    btnText.innerText = "İndirme Başladı";
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

    const openAboutBtn = document.getElementById('openAboutBtn');
    const closeAboutBtn = document.getElementById('closeAboutBtn');
    const aboutOverlay = document.getElementById('aboutOverlay');

    if (openAboutBtn && closeAboutBtn && aboutOverlay) {
        openAboutBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            playSound('whoosh'); 
            aboutOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });

        closeAboutBtn.addEventListener('click', () => {
            aboutOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
        });

        aboutOverlay.addEventListener('click', (e) => {
            if (e.target === aboutOverlay) {
                aboutOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    let secretCode = "aero";
    let inputSequence = "";

    const eggOverlay = document.getElementById('eggOverlay');
    const theEgg = document.getElementById('theEgg');
    const eggMessage = document.getElementById('eggMessage');
    const fakePanelOverlay = document.getElementById('fakePanelOverlay');
    const closeFakePanel = document.getElementById('closeFakePanel');

    window.addEventListener('keydown', (e) => {
        if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        inputSequence += e.key.toLowerCase();
        
        if (inputSequence.length > secretCode.length) {
            inputSequence = inputSequence.substring(1);
        }
        
        if (inputSequence === secretCode) {
            eggOverlay.classList.add('active');
            playSound('whoosh');
            inputSequence = ""; 
        }
    });

    theEgg.addEventListener('click', () => {
        playSound('explode'); 
        theEgg.classList.add('explode');
        setTimeout(() => {
            eggMessage.innerText = "BUM! EASTER EGG'İ BULDUN!";
            eggMessage.classList.add('show');
            
            setTimeout(() => {
                eggOverlay.classList.remove('active');
                theEgg.classList.remove('explode');
                eggMessage.classList.remove('show');
                fakePanelOverlay.classList.add('active');
            }, 2500); 
        }, 500); 
    });

    closeFakePanel.addEventListener('click', () => {
        fakePanelOverlay.classList.remove('active');
    });

    const btnInject = document.getElementById('applyFakeChanges');
    const btnReset = document.getElementById('refreshFakeSystem');

    const mainTitle = document.getElementById('mainGlitchTitle');
    const navBrandText = document.getElementById('navBrandText');
    const agTitleTarget = document.getElementById('agMainTitle');

    let originalMainTitle = "AeroMC";
    let originalAgTitle = "🛡️ AeroGuard V2.3";

    btnInject.addEventListener('click', () => {
        const newAero = document.getElementById('newAeroMcName').value || "AeroMC";
        const newGuard = document.getElementById('newAeroGuardName').value || "🛡️ AeroGuard V2.3";

        mainTitle.innerText = newAero;
        mainTitle.setAttribute('data-text', newAero); 
        navBrandText.innerText = newAero;
        agTitleTarget.innerText = newGuard;
        
        fakePanelOverlay.classList.remove('active');
    });

    btnReset.addEventListener('click', () => {
        fakePanelOverlay.classList.remove('active');

        mainTitle.classList.add('rapid-blink');
        navBrandText.classList.add('rapid-blink');
        agTitleTarget.classList.add('rapid-blink');
        
        playSound('explode');

        setTimeout(() => {
            mainTitle.classList.remove('rapid-blink');
            navBrandText.classList.remove('rapid-blink');
            agTitleTarget.classList.remove('rapid-blink');

            mainTitle.innerText = originalMainTitle;
            mainTitle.setAttribute('data-text', originalMainTitle);
            navBrandText.innerText = originalMainTitle;
            agTitleTarget.innerText = originalAgTitle;
        }, 2000);
    });
});