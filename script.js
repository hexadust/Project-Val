// ==================== GLOBAL VARIABLES ====================
let currentSection = 0;
let noClickCount = 0;

const sections = ['opening', 'textScroll', 'polaroid', 'loveLetter', 'closing'];

// ==================== POLAROID DATA - UPDATED CAPTIONS ====================
const polaroidData = [
    { img: 'assets/photo1.jpeg', caption: 'Our first moment together' },
    { img: 'assets/photo2.jpeg', caption: 'A moment at the beach during Dian\'s KKM' },
    { img: 'assets/photo3.jpeg', caption: 'City night date at Jakarta' },
    { img: 'assets/photo4.jpeg', caption: 'Ikea date' },
    { img: 'assets/photo5.jpeg', caption: 'A moment before doing LDR' },
    { img: 'assets/photo6.jpeg', caption: 'Photobooth date' },
    { img: 'assets/photo7.jpeg', caption: 'Our moment captured at a car' },
    { img: 'assets/photo8.jpeg', caption: 'Our first dinner photo' }
];

// ==================== ROMANTIC TEXT (SECTION 2) - NO EMOJI ====================
const romanticText = `Dari pertama kali kita bertemu...

Aku tahu ada sesuatu yang istimewa tentangmu.

Setiap hari bersamamu terasa seperti keajaiban.

Senyummu menerangi hari-hari tergelapku.

Kamu adalah sahabat terbaik, cinta, dan segalanya bagiku.

Terima kasih sudah menjadi dirimu yang luar biasa.

Ini adalah kenangan indah kita bersama...

Dan untuk banyak petualangan yang akan datang.

Aku mencintaimu lebih dari yang bisa kuungkapkan dengan kata-kata.

Selamat Hari Valentine 2026`;

// ==================== LOVE LETTER CONTENT (SECTION 4) ====================
const loveLetter = `Sayangku,

Ketika aku pertama kali melihatmu, aku tidak tahu bahwa hidupku akan berubah selamanya. Setiap detik yang kuhabiskan bersamamu adalah hadiah yang tidak pernah aku bayangkan sebelumnya.

Kamu bukan hanya pacarku, tapi kamu adalah rumah di mana hatiku menemukan kedamaian. Kamu adalah cahaya yang menerangi setiap sudut gelap dalam hidupku. Setiap tawa kita, setiap percakapan kita, bahkan setiap keheningan yang kita bagikan bersama, semuanya berarti sangat banyak bagiku.

Aku mencintai caramu tersenyum ketika kamu bahagia. Aku mencintai bagaimana kamu selalu tahu cara membuatku merasa lebih baik saat aku sedang sedih. Aku mencintai semua hal kecil tentangmu yang membuat setiap hari terasa istimewa.

Terima kasih sudah menjadi alasan aku tersenyum setiap pagi. Terima kasih sudah menerima aku apa adanya. Terima kasih sudah menjadi bagian terbaik dari hidupku.

Aku berjanji akan selalu ada untukmu, dalam suka maupun duka. Aku berjanji akan terus membuat kamu tersenyum, terus mencintaimu dengan sepenuh hatiku, dan terus berjuang untuk kita.

Kamu adalah cinta dalam hidupku, dan aku sangat bersyukur memilikimu.

Selamat Hari Valentine, sayangku. Aku mencintaimu, hari ini dan selamanya.`;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initMusic();
    initOpeningSection();
    generatePolaroids();
    initLoveLetterSection();
});

// ==================== MUSIC AUTOPLAY ====================
function initMusic() {
    const bgMusic = document.getElementById('bgMusic');
    
    // Attempt autoplay
    setTimeout(() => {
        bgMusic.play().catch((error) => {
            console.log('Autoplay prevented by browser. User interaction needed.');
            // Add click listener to start music on first user interaction
            document.body.addEventListener('click', () => {
                bgMusic.play();
            }, { once: true });
        });
    }, 500);
}

// ==================== SECTION 1: OPENING ====================
function initOpeningSection() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const noMessage = document.getElementById('noMessage');
    
    const noMessages = [
        "Are you sure? 🥺",
        "Really? 💔",
        "Please? 🙏",
        "I'll be sad... 😢",
        ""
    ];
    
    const noButtonTexts = [
        "No",
        "Are you sure?",
        "Really?",
        "Please? 🥺",
        "I'll be sad..."
    ];
    
    yesBtn.addEventListener('click', () => {
        celebrateYes();
    });
    
    noBtn.addEventListener('click', () => {
        if (noClickCount < 4) {
            noClickCount++;
            
            // Change button text
            noBtn.textContent = noButtonTexts[noClickCount];
            
            // Change button sizes
            const yesScale = 1 + (noClickCount * 0.3);
            const noScale = Math.max(0.5, 1 - (noClickCount * 0.2));
            
            yesBtn.style.transform = `scale(${yesScale})`;
            noBtn.style.transform = `scale(${noScale})`;
            
            // Show message
            noMessage.textContent = noMessages[noClickCount - 1];
            
            // Make NO button move around (harder to click)
            if (noClickCount >= 2) {
                const randomX = (Math.random() - 0.5) * 150;
                const randomY = (Math.random() - 0.5) * 100;
                noBtn.style.position = 'relative';
                noBtn.style.left = randomX + 'px';
                noBtn.style.top = randomY + 'px';
            }
            
        } else {
            // 5th click - show alert
            alert("Come on, you know you want to click YES! 💕💕💕");
            noMessage.textContent = "Fine... I'll wait for YES 😊";
        }
    });
}

function celebrateYes() {
    // Create heart explosion effect
    createHeartExplosion();
    
    // Transition to next section after celebration
    setTimeout(() => {
        goToNextSection();
        startTypingAnimation();
    }, 2000);
}

function createHeartExplosion() {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️'];
    const container = document.getElementById('opening');
    
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = (20 + Math.random() * 20) + 'px';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        const angle = (Math.PI * 2 * i) / 40;
        const velocity = 150 + Math.random() * 250;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes explode-${i} {
                0% {
                    transform: translate(0, 0) scale(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(${tx}px, ${ty}px) scale(1.5) rotate(${Math.random() * 720}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        heart.style.animation = `explode-${i} 1.5s ease-out forwards`;
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
            style.remove();
        }, 1500);
    }
}

// ==================== SECTION NAVIGATION ====================
function goToNextSection() {
    const currentSectionElement = document.getElementById(sections[currentSection]);
    currentSectionElement.classList.remove('active');
    
    currentSection++;
    
    if (currentSection < sections.length) {
        const nextSectionElement = document.getElementById(sections[currentSection]);
        nextSectionElement.classList.add('active');
    }
}

// ==================== SECTION 2: TYPING ANIMATION ====================
async function startTypingAnimation() {
    const typingTextElement = document.getElementById('typingText');
    typingTextElement.textContent = '';
    
    // Type the text
    await typeText(typingTextElement, romanticText, 50);
    
    // Remove cursor after typing is done
    setTimeout(() => {
        typingTextElement.style.removeProperty('--cursor');
        // Move to next section
        setTimeout(() => {
            goToNextSection();
        }, 2000);
    }, 1000);
}

async function typeText(element, text, speed = 50) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        await sleep(speed);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==================== SECTION 3: POLAROID GALLERY ====================
function generatePolaroids() {
    const grid = document.querySelector('.polaroid-grid');
    
    polaroidData.forEach((data, index) => {
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        
        polaroid.innerHTML = `
            <img src="${data.img}" alt="Memory ${index + 1}" class="polaroid-img">
            <p class="polaroid-caption">${data.caption}</p>
        `;
        
        // Add click animation
        polaroid.addEventListener('click', () => {
            const currentTransform = polaroid.style.transform;
            polaroid.style.transform = 'scale(1.15) rotate(0deg)';
            setTimeout(() => {
                polaroid.style.transform = currentTransform;
            }, 400);
        });
        
        grid.appendChild(polaroid);
    });
    
    // Auto-advance after 2 minutes 
    setTimeout(() => {
        if (currentSection === 2) {
            goToNextSection();
            startLoveLetterSequence();
        }
    }, 120000); // 2 minutes = 120,000 ms
}

// ==================== SECTION 4: LOVE LETTER ====================
function initLoveLetterSection() {
    const envelopeContainer = document.getElementById('envelopeContainer');
    const envelope = document.querySelector('.envelope');
    
    envelopeContainer.addEventListener('click', () => {
        openEnvelope();
    });
}

function startLoveLetterSequence() {
    // Show envelope after 3 seconds
    setTimeout(() => {
        const envelopeContainer = document.getElementById('envelopeContainer');
        envelopeContainer.classList.add('active');
    }, 3000);
}

function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const narrativeIntro = document.getElementById('narrativeIntro');
    
    // Open envelope animation
    envelope.classList.add('open');
    
    // Hide envelope and narrative after animation
    setTimeout(() => {
        envelopeContainer.style.display = 'none';
        narrativeIntro.style.display = 'none';
        
        // Show letter and start typing
        showLoveLetter();
    }, 1500);
}

async function showLoveLetter() {
    const letterContent = document.getElementById('letterContent');
    const letterText = document.getElementById('letterText');
    const letterActions = document.getElementById('letterActions');
    
    letterContent.classList.add('active');
    letterText.textContent = '';
    
    // Type the love letter
    await typeText(letterText, loveLetter, 30);
    
    // Show PDF download button after typing is done
    setTimeout(() => {
        letterActions.classList.add('active');
        
        // Auto-advance to closing after 30 seconds (optional fallback)
        setTimeout(() => {
            if (currentSection === 3) {
                goToNextSection();
            }
        }, 30000);
    }, 1000);
}

// ==================== PDF GENERATOR ====================
document.getElementById('downloadPdfBtn').addEventListener('click', generatePDF);

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    
    // ===== DECORATIVE BORDER =====
    // Outer border
    doc.setDrawColor(255, 182, 193); // Pink
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
    
    // Inner border
    doc.setLineWidth(0.5);
    doc.rect(15, 15, pageWidth - 30, pageHeight - 30, 'S');
    
    // ===== CORNER DECORATIONS (FIXED - NO EMOJI) =====
    doc.setFontSize(16);
    doc.setTextColor(255, 105, 180);
    
    // ===== HEADER =====
    doc.setFontSize(28);
    doc.setFont('times', 'bold');
    doc.setTextColor(255, 105, 180);
    doc.text('Surat Cinta Untuk Dian', pageWidth / 2, 35, { align: 'center' });
    
    // ===== DATE =====
    doc.setFontSize(11);
    doc.setFont('times', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('Valentine\'s Day 2026', pageWidth / 2, 43, { align: 'center' });
    
    // ===== DECORATIVE LINE =====
    doc.setDrawColor(255, 182, 193);
    doc.setLineWidth(0.5);
    doc.line(margin + 10, 48, pageWidth - margin - 10, 48);
    
    // ===== LETTER HEADER =====
    doc.setFontSize(14);
    doc.setFont('times', 'italic');
    doc.setTextColor(255, 105, 180);
    doc.text('Untuk Sayangku,', margin, 58);
    
    // ===== LETTER CONTENT =====
    doc.setFontSize(11);
    doc.setFont('times', 'normal');
    doc.setTextColor(50, 50, 50);
    
    const lines = doc.splitTextToSize(loveLetter, pageWidth - (margin * 2));
    let yPosition = 70;
    const lineHeight = 7;
    
    lines.forEach((line, index) => {
       
        if (yPosition > pageHeight - 60) {
            doc.addPage();
            yPosition = margin;
            
            // Add border to new page
            doc.setDrawColor(255, 182, 193);
            doc.setLineWidth(2);
            doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
            doc.setLineWidth(0.5);
            doc.rect(15, 15, pageWidth - 30, pageHeight - 30, 'S');
        }
        
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
    });
    
    // ===== LETTER FOOTER =====
    yPosition += 10;
    
    if (yPosition > pageHeight - 50) {
        doc.addPage();
        yPosition = margin;
        
        // Border for new page
        doc.setDrawColor(255, 182, 193);
        doc.setLineWidth(2);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
        doc.setLineWidth(0.5);
        doc.rect(15, 15, pageWidth - 30, pageHeight - 30, 'S');
    }
    
    doc.setFont('times', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('Dengan cinta,', pageWidth - margin, yPosition, { align: 'right' });
    
    yPosition += 8;
    doc.setFontSize(13);
    doc.setFont('times', 'bold');
    doc.setTextColor(255, 105, 180);
    doc.text('Lazuardi Azka R.', pageWidth - margin, yPosition, { align: 'right' });
    
    // ===== FOOTER DECORATION (FIXED - NO EMOJI) =====
    doc.setFontSize(14);
    doc.setTextColor(255, 105, 180);
    doc.text(' With Love ', pageWidth / 2, pageHeight - 20, { align: 'center' });
    
    // ===== SAVE PDF =====
    doc.save('Surat_Cinta_Valentine_2026.pdf');
    
    setTimeout(() => {
        if (currentSection === 3) {
            goToNextSection();
        }
    }, 5000); // 5 seconds
}

// ==================== FLOATING HEARTS (MORE FREQUENT) ====================
setInterval(() => {
    if (currentSection === 0) {
        const container = document.querySelector('.hearts-background');
        if (container) {
            const heart = document.createElement('div');
            const hearts = ['💕', '💖', '💗', '💓'];
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (25 + Math.random() * 25) + 'px';
            heart.style.animation = 'floatingHearts 12s linear';
            heart.style.opacity = '0.4';
            heart.style.bottom = '0';
            heart.style.pointerEvents = 'none';
            
            container.appendChild(heart);
            
            setTimeout(() => heart.remove(), 12000);
        }
    }
}, 1500); 

// ==================== CONSOLE MESSAGE ====================
console.log('💕 Valentine Website Loaded Successfully! 💕');
console.log('Made with love for the most special person in the world! ❤️');
console.log('Happy Valentine\'s Day 2026! 🌹');
