// 스크롤 시 헤더 스타일 변경
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// 슬라이드 관련 코드
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });

  updateDots(index);
}

function updateDots(index) {
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

if (slides.length > 0) {
  showSlide(currentSlide);

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  setInterval(() => {
    if (document.visibilityState === 'visible') {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  }, 7000);
}

// 폼 제출 이벤트
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 폼 데이터 처리 로직 추가 (API 호출 등)
    const formData = new FormData(contactForm);
    
    // 예시: 폼 데이터 콘솔에 출력
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    
    console.log('제출된 폼 데이터:', formDataObj);
    
    // 여기에 실제 폼 데이터 전송 코드 구현
    // 예: fetch 또는 axios를 사용한 API 호출
    
    // 성공 메시지 표시 (실제 환경에서는 API 응답 후에 표시)
    alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    contactForm.reset();
  });
}

// 애니메이션 효과 추가 (스크롤 시 요소 등장)
const animateOnScroll = function() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if(elementPosition < windowHeight - 100) {
      element.classList.add('animated');
    }
  });
};

// 초기 애니메이션 체크
window.addEventListener('load', animateOnScroll);

// 스크롤 시 애니메이션 체크
window.addEventListener('scroll', animateOnScroll);

// CSS 클래스 추가
document.querySelectorAll('.card, .service-item, .testimonial-item, .case-item, .stat-item, .info-card').forEach(item => {
  item.classList.add('animate-on-scroll');
});

// 스크롤 탑 버튼
const scrollTopBtn = document.createElement('button');
scrollTopBtn.classList.add('scroll-top-btn');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
  if(window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 스크롤 탑 버튼을 위한 CSS 추가
const style = document.createElement('style');
style.textContent = `
  .scroll-top-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .scroll-top-btn.show {
    opacity: 1;
    visibility: visible;
  }
  
  .scroll-top-btn:hover {
    background-color: var(--primary-dark);
    transform: translateY(-3px);
  }
  
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .animate-on-scroll.animated {
    opacity: 1;
    transform: translateY(0);
  }
  
  .mobile-menu-btn span {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .mobile-menu-btn .rotate-45 {
    transform: translateY(9px) rotate(45deg);
  }
  
  .mobile-menu-btn .opacity-0 {
    opacity: 0;
  }
  
  .mobile-menu-btn .rotate-neg-45 {
    transform: translateY(-9px) rotate(-45deg);
  }
`;

document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
  // AOS 애니메이션 초기화
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100
  });
  
  // 모바일 메뉴 토글
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if(mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      
      // 햄버거 아이콘 애니메이션
      const spans = this.querySelectorAll('span');
      spans[0].classList.toggle('rotate-45');
      spans[1].classList.toggle('opacity-0');
      spans[2].classList.toggle('rotate-neg-45');
    });
  }
  
  // 스크롤 시 헤더 스타일 변경
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 스무스 스크롤
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 90,
          behavior: 'smooth'
        });
        
        // 모바일 메뉴 닫기
        if(nav.classList.contains('active')) {
          nav.classList.remove('active');
          
          // 햄버거 아이콘 원상태로
          const spans = mobileMenuBtn.querySelectorAll('span');
          spans[0].classList.remove('rotate-45');
          spans[1].classList.remove('opacity-0');
          spans[2].classList.remove('rotate-neg-45');
        }
      }
    });
  });

  // FAQ 아코디언 기능
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const toggleBtn = item.querySelector('.toggle-btn');
    const answer = item.querySelector('.faq-answer');
    
    // 전체 질문 영역 클릭 이벤트 추가
    if (questionBtn) {
      questionBtn.addEventListener('click', function() {
        toggleFAQ(item, toggleBtn);
      });
    }
    
    // 버튼 클릭 이벤트 추가 (이벤트 버블링 방지)
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 이벤트 버블링 방지
        toggleFAQ(item, toggleBtn);
      });
    }
  });
  
  // FAQ 토글 함수
  function toggleFAQ(item, btn) {
    const isActive = item.classList.contains('active');
    
    // 모든 FAQ 닫기
    faqItems.forEach(faqItem => {
      faqItem.classList.remove('active');
      const icon = faqItem.querySelector('.toggle-btn i');
      if (icon) {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      }
    });
    
    // 클릭한 FAQ만 열기 (이미 열려있으면 닫음)
    if (!isActive) {
      item.classList.add('active');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      }
    }
  }

  // 슬라이더 기능
  const slider = document.querySelector('.cases-slider');
  const slides = document.querySelectorAll('.case-item');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');
  
  if(slider && slides.length > 0) {
    let currentSlide = 0;
    
    // 초기 슬라이드 설정
    function showSlide(n) {
      slides.forEach((slide, index) => {
        slide.style.display = index === n ? 'grid' : 'none';
      });
      
      // 도트 활성화 상태 업데이트
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === n);
      });
    }
    
    // 초기 슬라이드 표시
    showSlide(currentSlide);
    
    // 다음 슬라이드 버튼
    if(nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });
    }
    
    // 이전 슬라이드 버튼
    if(prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });
    }
    
    // 도트 클릭 이벤트
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
  }

  // 폼 제출 이벤트
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 폼 데이터 처리 로직 추가 (API 호출 등)
      const formData = new FormData(contactForm);
      
      // 예시: 폼 데이터 콘솔에 출력
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      
      console.log('제출된 폼 데이터:', formDataObj);
      
      // 여기에 실제 폼 데이터 전송 코드 구현
      // 예: fetch 또는 axios를 사용한 API 호출
      
      // 성공 메시지 표시 (실제 환경에서는 API 응답 후에 표시)
      alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
      contactForm.reset();
    });
  }
  
  // 스크롤 탑 버튼
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.classList.add('scroll-top-btn');
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);
  
  window.addEventListener('scroll', function() {
    if(window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // 숫자 애니메이션
  const animateNumber = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = end;
      }
    };
    window.requestAnimationFrame(step);
  };
  
  // 숫자 요소들 애니메이션 처리
  const animateNumbersOnScroll = () => {
    const numberElements = document.querySelectorAll('.stat-number, .result-number');
    
    numberElements.forEach(element => {
      if (element.getBoundingClientRect().top < window.innerHeight - 100 && !element.dataset.animated) {
        const targetValue = parseInt(element.textContent, 10);
        element.textContent = '0';
        animateNumber(element, 0, targetValue, 2000);
        element.dataset.animated = 'true';
      }
    });
  };
  
  // 스크롤 이벤트에 숫자 애니메이션 추가
  window.addEventListener('scroll', animateNumbersOnScroll);
  
  // 초기 로드 시 실행
  animateNumbersOnScroll();

  // 드롭다운 메뉴 토글
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    
    // 모바일 뷰에서만 클릭 이벤트 처리
    dropdownLink.addEventListener('click', function(e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });
});

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
  // AOS 초기화
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true
  });
  
  // 헤더 스크롤 이벤트
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // 모바일 메뉴 토글
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if (menuBtn) {
    menuBtn.addEventListener('click', function() {
      menuBtn.classList.toggle('active');
      nav.classList.toggle('active');
      
      // 햄버거 메뉴 애니메이션
      const spans = menuBtn.querySelectorAll('span');
      spans[0].classList.toggle('rotate-45');
      spans[1].classList.toggle('opacity-0');
      spans[2].classList.toggle('rotate-neg-45');
    });
  }
  
  // 드롭다운 메뉴 토글 (모바일용)
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    
    // 모바일 뷰에서만 클릭 이벤트 처리
    dropdownLink.addEventListener('click', function(e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });
  
  // FAQ 아코디언
  const faqItems = document.querySelectorAll('.faq-item');
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  
  if (toggleBtns.length > 0) {
    toggleBtns.forEach((btn, index) => {
      btn.addEventListener('click', function() {
        faqItems[index].classList.toggle('active');
        
        if (faqItems[index].classList.contains('active')) {
          btn.innerHTML = '<i class="fas fa-minus"></i>';
        } else {
          btn.innerHTML = '<i class="fas fa-plus"></i>';
        }
      });
    });
  }
  
  // FAQ 탭
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // 버튼 활성화 상태 변경
        tabBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // 탭 컨텐츠 표시
        const tabId = this.getAttribute('data-tab');
        tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === tabId) {
            content.classList.add('active');
          }
        });
      });
    });
  }
  
  // 케이스 스터디 필터링
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // 버튼 활성화 상태 변경
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // 필터링
        const filterValue = this.getAttribute('data-filter');
        
        caseCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // 폼 제출
  const form = document.getElementById('consultationForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 여기에 폼 데이터 처리 및 전송 로직 추가
      alert('상담 신청이 완료되었습니다. 24시간 내에 연락드리겠습니다.');
      form.reset();
    });
  }
  
  // 스크롤 탑 버튼
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });
    
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
