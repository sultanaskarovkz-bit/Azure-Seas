// Azure Seas - Main JavaScript

let currentLang = localStorage.getItem('azureLang') || 'en';

document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initLanguage();
    initAnimations();
    initForms();
});

function initNavScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('active');
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'cn' : 'en';
    localStorage.setItem('azureLang', currentLang);
    applyLanguage();
}

function initLanguage() { applyLanguage(); }

function applyLanguage() {
    const langEn = document.getElementById('lang-en');
    const langCn = document.getElementById('lang-cn');
    
    if (langEn && langCn) {
        langEn.classList.toggle('active', currentLang === 'en');
        langCn.classList.toggle('active', currentLang === 'cn');
    }
    
    document.querySelectorAll('[data-en][data-cn]').forEach(el => {
        const text = currentLang === 'en' ? el.dataset.en : el.dataset.cn;
        if (el.tagName === 'INPUT' && el.type !== 'submit') {
            el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });
    
    document.querySelectorAll('[data-placeholder-en][data-placeholder-cn]').forEach(el => {
        el.placeholder = currentLang === 'en' ? el.dataset.placeholderEn : el.dataset.placeholderCn;
    });
    
    document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-CN';
}

function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in, .service-card, .value-card, .case-card, .lifestyle-card, .jetcard-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    } else {
        fadeElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
}

function initForms() {
    const charterForm = document.getElementById('charterForm');
    const contactForm = document.getElementById('contactForm');
    if (charterForm) charterForm.addEventListener('submit', handleFormSubmit);
    if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = currentLang === 'en' ? 'Sending...' : '发送中...';
    
    setTimeout(() => {
        submitBtn.textContent = currentLang === 'en' ? 'Sent Successfully!' : '发送成功！';
        submitBtn.style.background = '#28a745';
        setTimeout(() => {
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 2000);
        console.log('Form submitted:', data);
    }, 1500);
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        const targetId = link.getAttribute('href');
        if (targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu) mobileMenu.classList.remove('active');
            }
        }
    }
});

document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    }
});
