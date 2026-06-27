document.addEventListener('DOMContentLoaded', () => {
    
    // Прелоадер
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
    }, 1500);

    // Навбар при скролле
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const scrollTop = document.querySelector('.scroll-top');
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (window.scrollY > 500) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    });

    // Бургер меню
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // GSAP анимации
    gsap.registerPlugin(ScrollTrigger);

    // Hero анимации
    const tl = gsap.timeline({ delay: 1.5 });
    
    tl.from('.hero-badge', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-description', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-buttons', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-stats', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.image-wrapper', {
        opacity: 0,
        scale: 0.8,
        rotation: 5,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.8');

    // Анимации карточек услуг
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 100,
            scale: 0.9,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out(1.7)'
        });
    });

    // Анимации преимуществ
    gsap.utils.toArray('.advantage-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -50,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    gsap.from('.advantages-image', {
        scrollTrigger: {
            trigger: '.advantages',
            start: 'top 80%'
        },
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power3.out'
    });

    // Параллакс эффект
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
        
        gsap.to('.tech-icons i', {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Маска телефона
    const phoneInputs = document.querySelectorAll('.phone-input');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 1) {
                    value = '+7 ' + value;
                } else if (value.length <= 4) {
                    value = '+7 ' + value.slice(1, 4);
                } else if (value.length <= 7) {
                    value = '+7 ' + value.slice(1, 4) + ' ' + value.slice(4, 7);
                } else if (value.length <= 9) {
                    value = '+7 ' + value.slice(1, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 9);
                } else {
                    value = '+7 ' + value.slice(1, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 9) + ' ' + value.slice(9, 11);
                }
                
                e.target.value = value;
            }
        });
    });

    // Отправка формы
    const forms = document.querySelectorAll('.cta-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const phone = form.querySelector('.phone-input').value;
            
            if (phone.length < 16) {
                showNotification('Пожалуйста, введите номер полностью', 'error');
                return;
            }
            
            showNotification('Спасибо! Мастер свяжется с вами через 5 минут', 'success');
            form.reset();
        });
    });

    // Уведомления
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Стили для уведомлений
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            color: var(--text-primary);
            padding: 1rem 2rem;
            border-radius: 3rem;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            border: 1px solid var(--border-color);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 9999;
            transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .notification.show {
            transform: translateX(-50%) translateY(0);
        }
        
        .notification.success i {
            color: #10b981;
        }
        
        .notification.error i {
            color: #ef4444;
        }
    `;
    
    document.head.appendChild(style);
});