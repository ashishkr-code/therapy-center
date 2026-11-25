/**
 * MIGHTY HEALERS / MH ASHA HEALTH CENTRE
 * Dr. Rituraj Sharma | Jaipur
 * Client Controller & Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.innerHTML = '☰';
      });
    });
  }

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href*='${sectionId}']`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        targetNav?.classList.add('active');
      } else {
        targetNav?.classList.remove('active');
      }
    });

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to Top Action
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Services Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Video Modal Player
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  const closeVideoBtn = document.getElementById('closeVideoBtn');
  const videoPlayTriggers = document.querySelectorAll('.play-video-trigger');

  function openVideo(videoId) {
    if (!videoModal || !videoIframe) return;
    videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideo() {
    if (!videoModal || !videoIframe) return;
    videoIframe.src = '';
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  videoPlayTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const videoId = trigger.getAttribute('data-video-id');
      if (videoId) {
        openVideo(videoId);
      }
    });
  });

  if (closeVideoBtn) {
    closeVideoBtn.addEventListener('click', closeVideo);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideo();
      }
    });
  }

  // Photo Gallery Lightbox
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function openLightbox(src, title) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = title || '';
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || '';
      if (img) {
        openLightbox(img.src, title);
      }
    });
  });

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard Escape Key Handler
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideo();
      closeLightbox();
      closeSuccessModal();
    }
  });

  // Appointment Booking Form & Dual Branch WhatsApp Routing
  const bookingForm = document.getElementById('bookingForm');
  const successModal = document.getElementById('successModal');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const whatsappForwardBtn = document.getElementById('whatsappForwardBtn');

  function closeSuccessModal() {
    if (successModal) {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', closeSuccessModal);
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        closeSuccessModal();
      }
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('patientName')?.value.trim();
      const phone = document.getElementById('patientPhone')?.value.trim();
      const branch = document.getElementById('patientBranch')?.value || 'Vidyadhar Nagar';
      const therapy = document.getElementById('patientTherapy')?.value;
      const date = document.getElementById('patientDate')?.value;
      const timeSlot = document.getElementById('patientTime')?.value;
      const message = document.getElementById('patientMessage')?.value.trim();

      if (!name || !phone) {
        alert('Please fill in your Name and Phone Number.');
        return;
      }

      // Branch selection determines destination phone:
      // Vidyadhar Nagar or Home Visit -> 9664271204
      // Pratap Nagar -> 7014658209
      let clinicPhone = '919664271204';
      if (branch.includes('Pratap Nagar')) {
        clinicPhone = '917014658209';
      }

      let waText = `*New Appointment Request - Mighty Healers / MH Asha Health Centre*%0A%0A`;
      waText += `*Name:* ${encodeURIComponent(name)}%0A`;
      waText += `*Phone:* ${encodeURIComponent(phone)}%0A`;
      waText += `*Preferred Branch / Service:* ${encodeURIComponent(branch)}%0A`;
      waText += `*Therapy Needed:* ${encodeURIComponent(therapy)}%0A`;
      if (date) waText += `*Preferred Date:* ${encodeURIComponent(date)}%0A`;
      if (timeSlot) waText += `*Preferred Time Slot:* ${encodeURIComponent(timeSlot)}%0A`;
      if (message) waText += `*Health Concern Details:* ${encodeURIComponent(message)}%0A%0A`;
      waText += `_Doctor: Dr. Rituraj Sharma (Mighty Healers)_`;

      const waUrl = `https://wa.me/${clinicPhone}?text=${waText}`;

      if (whatsappForwardBtn) {
        whatsappForwardBtn.href = waUrl;
      }

      if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      bookingForm.reset();
    });
  }

  // Pre-select service when clicking "Book This Therapy"
  document.querySelectorAll('.book-service-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      const select = document.getElementById('patientTherapy');
      if (select && serviceName) {
        select.value = serviceName;
      }
      const bookingSection = document.getElementById('appointment');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Interactive Location & Dual Map Switcher
  const mapIframe = document.getElementById('mapIframe');
  const mapTabBtns = document.querySelectorAll('.map-tab-btn');
  const locationBranchCards = document.querySelectorAll('.location-branch-card');
  const currentMapTitle = document.getElementById('currentMapTitle');
  const mapDirectLink = document.getElementById('mapDirectLink');

  const mapData = {
    'vidyadhar': {
      title: 'MH Asha Health Centre (A-35, Royal Plaza, Central Spine, Vidyadhar Nagar, Jaipur Nagar Nigam Area, 302039)',
      embedUrl: 'https://maps.google.com/maps?q=A-35,+Royal+Plaza,+Central+Spine,+Vidyadhar+Nagar,+Jaipur,+Jaipur+Nagar+Nigam+Area,+Rajasthan+302039&t=&z=16&ie=UTF8&iwloc=&output=embed',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=MH+ASHA+HEALTH+CENTRE,+A-35,+Royal+Plaza,+Central+Spine,+Vidyadhar+Nagar,+Jaipur,+Jaipur+Nagar+Nigam+Area,+Rajasthan+302039'
    },
    'pratap': {
      title: 'Mighty Healers – Pain Relief Centre (60/1, near Central Bank, Pratap Nagar • Hours: 8:00 AM – 8:00 PM IST)',
      embedUrl: 'https://maps.google.com/maps?q=Mighty+Healers,+Pratap+Nagar,+Jaipur&t=&z=16&ie=UTF8&iwloc=&output=embed',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mighty+Healers,+60%2F1,+near+Central+Bank,+opposite+Khushboo+Chat,+Pratap+Nagar,+Jaipur'
    }
  };

  function switchMap(branchKey) {
    if (!mapData[branchKey]) return;
    const data = mapData[branchKey];

    if (mapIframe) {
      mapIframe.src = data.embedUrl;
    }
    if (currentMapTitle) {
      currentMapTitle.textContent = data.title;
    }
    if (mapDirectLink) {
      mapDirectLink.href = data.mapsUrl;
    }

    mapTabBtns.forEach(btn => {
      if (btn.getAttribute('data-branch') === branchKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    locationBranchCards.forEach(card => {
      if (card.getAttribute('data-branch') === branchKey) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  mapTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const branchKey = btn.getAttribute('data-branch');
      switchMap(branchKey);
    });
  });

  locationBranchCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const branchKey = card.getAttribute('data-branch');
      switchMap(branchKey);
    });
  });
});
