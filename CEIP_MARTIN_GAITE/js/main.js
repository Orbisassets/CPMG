/**
 * ARCHIVO PRINCIPAL DE JAVASCRIPT - CEIP CARMEN MARTÍN GAITE
 * Este archivo controla las interacciones de la web (menús, animaciones, etc.)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. EFECTO DE CABECERA AL HACER SCROLL
       ========================================== */
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       2. MENÚ MÓVIL
       ========================================== */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Cambiar el icono de hamburguesa a cruz
            const icon = mobileBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    /* ==========================================
       3. DESPLEGABLES EN MÓVIL
       ========================================== */
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    /* ==========================================
       4. ANIMACIONES AL HACER SCROLL (FADE UP)
       ========================================== */
    const animatedElements = document.querySelectorAll('.fade-up');
    
    const animateOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        animatedElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    };
    
    // Ejecutar al cargar la página
    animateOnScroll();
    
    // Ejecutar al hacer scroll
    window.addEventListener('scroll', animateOnScroll);

    /* ==========================================
       5. MENÚ "MÁS APARTADOS" EN PANTALLA
       ========================================== */
    const navUls = document.querySelectorAll('.nav-menu ul');
    if (navUls.length > 0 && window.innerWidth > 768) {
        const ul = navUls[0];
        const linksToMove = [];
        const keepTexts = ['Inicio', 'Centro', 'Curso Escolar', 'Contacto'];
        
        Array.from(ul.children).forEach(li => {
            const linkText = li.textContent.trim().split('\n')[0].trim();
            let shouldKeep = false;
            keepTexts.forEach(t => {
                if(linkText.includes(t)) shouldKeep = true;
            });
            
            if (!shouldKeep) {
                linksToMove.push(li);
                ul.removeChild(li);
            }
        });
        
        if (linksToMove.length > 0) {
            const moreLi = document.createElement('li');
            moreLi.innerHTML = `<a href="#" class="nav-link" id="open-more-menu" style="color: var(--accent);"><i class="fas fa-th-large"></i> Más</a>`;
            
            const contactoLi = Array.from(ul.children).find(li => li.textContent.includes('Contacto'));
            if (contactoLi) {
                ul.insertBefore(moreLi, contactoLi);
            } else {
                ul.appendChild(moreLi);
            }
            
            const overlay = document.createElement('div');
            overlay.className = 'fullscreen-menu-overlay';
            
            let linksHtml = '';
            linksToMove.forEach(originalLi => {
                const a = originalLi.querySelector('a');
                if(a) {
                    linksHtml += `<a href="${a.href}" class="overlay-link"><i class="fas fa-bookmark" style="color: var(--accent); margin-right: 15px;"></i> ${a.textContent}</a>`;
                }
            });

            // Añadir las secciones principales para poder volver
            const mainLinksHtml = `
                <a href="index.html" class="overlay-link"><i class="fas fa-home" style="color: var(--accent); margin-right: 15px;"></i> Inicio</a>
                <a href="el-centro.html" class="overlay-link"><i class="fas fa-school" style="color: var(--accent); margin-right: 15px;"></i> El Centro</a>
                <a href="escolarizacion.html" class="overlay-link"><i class="fas fa-book" style="color: var(--accent); margin-right: 15px;"></i> Curso Escolar</a>
                <a href="contacto.html" class="overlay-link"><i class="fas fa-envelope" style="color: var(--accent); margin-right: 15px;"></i> Contacto</a>
                <a href="https://drive.google.com/drive/folders/1jh5lkZSgi94l-RoMMHOJtyVtxwEu7MkI?usp=sharing" target="_blank" class="overlay-link"><i class="fas fa-folder-open" style="color: var(--accent); margin-right: 15px;"></i> Documentos CMG</a>
            `;
            
            overlay.innerHTML = `
                <button class="close-overlay" title="Cerrar menú"><i class="fas fa-times"></i></button>
                <div class="overlay-content" style="max-width: 1200px; padding: 40px 5%; height: 100vh; overflow-y: auto; display: flex; flex-direction: column;">
                    
                    <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                        <h2 style="font-family: 'Times New Roman', serif; font-size: clamp(2.5rem, 5vw, 4.5rem); color: white; margin-bottom: 10px; font-weight: normal; letter-spacing: 1px;">Índice del Centro</h2>
                        <p style="font-family: 'Times New Roman', serif; color: rgba(255,255,255,0.7); margin-bottom: 50px; font-size: 1.2rem; font-style: italic;">Navegue por todas las áreas y servicios de nuestra institución.</p>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 50px; text-align: left;">
                            
                            <!-- Columna 1: Secciones Principales -->
                            <div>
                                <h3 style="font-family: 'Times New Roman', serif; color: var(--accent); margin-bottom: 25px; font-size: 1.8rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; font-weight: normal;">Secciones Principales</h3>
                                <div style="display: flex; flex-direction: column; gap: 15px;">
                                    ${mainLinksHtml}
                                </div>
                            </div>

                            <!-- Columna 2: Más Apartados -->
                            <div>
                                <h3 style="font-family: 'Times New Roman', serif; color: var(--accent); margin-bottom: 25px; font-size: 1.8rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; font-weight: normal;">Otros Apartados</h3>
                                <div style="display: flex; flex-direction: column; gap: 15px;">
                                    ${linksHtml}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Info -->
                    <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-bottom: 30px; display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; font-family: 'Times New Roman', serif; font-size: 1.1rem; color: rgba(255,255,255,0.8);">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-map-marker-alt" style="color: var(--accent); font-size: 1.3rem;"></i> C/ Ángeles Navas Atencia, 12, Rincón de la Victoria
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-phone" style="color: var(--accent); font-size: 1.3rem;"></i> 951 29 36 04
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-envelope" style="color: var(--accent); font-size: 1.3rem;"></i> 29006258.edu@juntadeandalucia.es
                        </div>
                    </div>
                    
                </div>
            `;

            
            document.body.appendChild(overlay);
            
            document.getElementById('open-more-menu').addEventListener('click', (e) => {
                e.preventDefault();
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            overlay.querySelector('.close-overlay').addEventListener('click', () => {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }

    /* ==========================================
       6. AVISO DE COOKIES REALISTA
       ========================================== */
    if (!localStorage.getItem('cookiesAccepted')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <i class="fas fa-cookie-bite cookie-icon"></i>
                <div class="cookie-text">
                    <h4>Aviso de Cookies</h4>
                    <p>Utilizamos cookies propias y de terceros para fines analíticos y para mostrarle publicidad personalizada en base a un perfil elaborado a partir de sus hábitos de navegación. Puede obtener más información consultando nuestra <a href="politica-cookies.html" style="color: var(--primary-light); text-decoration: underline; font-weight: bold;">Política de Cookies</a>.</p>
                </div>
            </div>
            <div class="cookie-buttons">
                <button class="btn btn-outline cookie-btn" id="reject-cookies" style="padding: 10px 20px; font-size: 0.9rem;">Rechazar</button>
                <button class="btn btn-primary cookie-btn" id="accept-cookies" style="padding: 10px 20px; font-size: 0.9rem;">Aceptar Todo</button>
            </div>
        `;
        document.body.appendChild(cookieBanner);
        
        setTimeout(() => cookieBanner.classList.add('visible'), 800);

        const closeCookie = () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('visible');
            setTimeout(() => cookieBanner.remove(), 500);
        };

        document.getElementById('accept-cookies').addEventListener('click', closeCookie);
        document.getElementById('reject-cookies').addEventListener('click', closeCookie);
    }
});