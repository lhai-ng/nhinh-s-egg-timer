const timerContainer = document.querySelector('.timer-container')
const cookingContainer = document.querySelector('#container');
const cookingContents = [
    {
        dishName: "soft-boiled",
        intructionContent: `
            <h3>Soft-Boiled Egg</h3>
            <ol>
                <li>💧 Boil water in a small saucepan over medium heat.</li>
                <li>🕐 Gently add eggs and cook for 5-6 minutes.</li>
                <li>❄️ Transfer to ice bath to stop cooking.</li>
                <li>🔪 Peel carefully and slice to reveal runny yolk.</li>
                <li>🍞 Serve warm with toast or noodles.</li>
            </ol>
        `,
    },
    {
        dishName: "medium-rare",
        intructionContent: `
            <h3>Medium-Rare Boiled Egg</h3>
            <ol>
                <li>💧 Bring water to boil in a pot.</li>
                <li>🥄 Lower eggs gently into boiling water.</li>
                <li>🕒 Simmer for 7-8 minutes for jammy yolks.</li>
                <li>❄️ Cool in ice bath for easy peeling.</li>
                <li>🥗 Slice and serve in salads or ramen.</li>
            </ol>
        `,
    },
    {
        dishName: "medium",
        intructionContent: `
            <h3>Medium Boiled Egg</h3>
            <ol>
                <li>💧 Heat water in a saucepan until boiling.</li>
                <li>🥄 Add eggs carefully to avoid cracking.</li>
                <li>🕓 Boil for 9-10 minutes for firm yet moist yolks.</li>
                <li>❄️ Chill briefly in cold water.</li>
                <li>🍽️ Peel and season with salt and pepper.</li>
            </ol>
        `,
    },
    {
        dishName: "hard-boiled",
        intructionContent: `
            <h3>Hard-Boiled Egg</h3>
            <ol>
                <li>💧 Fill pot with water and bring to boil.</li>
                <li>🥄 Place eggs into boiling water.</li>
                <li>🕔 Cook for 11-13 minutes until yolks are fully set.</li>
                <li>❄️ Cool in ice bath to stop cooking.</li>
                <li>🔪 Slice or chop for salads and snacks.</li>
            </ol>
        `,
    },
    {
        dishName: "omelette",
        intructionContent: `
            <h3>Omelette</h3>
            <ol>
                <li>🥚 Whisk eggs until smooth.</li>
                <li>🧂 Season with salt and pepper.</li>
                <li>🍳 Pour into buttered pan over medium heat.</li>
                <li>🥬 Add fillings once edges set.</li>
                <li>📐 Fold gently and serve warm.</li>
            </ol>
        `,
    },
    {
        dishName: "poached",
        intructionContent: `
            <h3>Poached Egg</h3>
            <ol>
                <li>💧 Simmer water with a splash of vinegar.</li>
                <li>🌀 Create a gentle whirlpool in the pan.</li>
                <li>🥚 Crack egg into the center.</li>
                <li>🕒 Cook for 3-4 minutes until whites set.</li>
                <li>🥗 Lift and drain before serving.</li>
            </ol>
        `,
    },
    {
        dishName: "scrambled",
        intructionContent: `
            <h3>Scrambled Eggs</h3>
            <ol>
                <li>🥚 Crack eggs into a bowl.</li>
                <li>🧂 Season with salt and a splash of milk.</li>
                <li>🍳 Heat butter in a non-stick pan over low heat.</li>
                <li>🥄 Stir gently until soft curds form.</li>
                <li>🍽️ Serve immediately while still creamy.</li>
            </ol>
        `,
    },
    {
        dishName: "fried",
        intructionContent: `
            <h3>Fried Egg (Sunny-Side Up)</h3>
            <ol>
                <li>🍳 Heat oil or butter in a skillet.</li>
                <li>🥚 Crack egg into the pan.</li>
                <li>🕒 Cook until whites set but yolk remains runny.</li>
                <li>🛡️ Cover briefly if you prefer more cooked whites.</li>
                <li>🍽️ Season and serve immediately.</li>
            </ol>
        `,
    },
]

const params = new URLSearchParams(window.location.search);
const dishType = params.get('dish');
const hasTimer = params.get('timer');
const seconds = parseInt(params.get('minutes')) * 60;

// Tạo audio context cho âm thanh báo hiệu
let audioContext;
let isAlarmPlaying = false;
let alarmInterval;

// Hàm tạo âm thanh beep
function createBeepSound() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800; // Tần số 800Hz
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Hàm bắt đầu âm thanh báo động
function startAlarm() {
    if (isAlarmPlaying) return;
    
    isAlarmPlaying = true;
    createBeepSound(); // Phát âm thanh đầu tiên ngay lập tức
    
    alarmInterval = setInterval(() => {
        createBeepSound();
    }, 500); // Lặp lại mỗi 500ms
}

// Hàm dừng âm thanh báo động
function stopAlarm() {
    if (!isAlarmPlaying) return;
    
    isAlarmPlaying = false;
    if (alarmInterval) {
        clearInterval(alarmInterval);
        alarmInterval = null;
    }
}

// Hàm tạo hiệu ứng rung cho timer
function shakeTimer() {
    gsap.to(timerContainer, {
        x: -10,
        duration: 0.1,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1, // Lặp vô hạn
        repeatDelay: 0
    });
}

// Hàm dừng hiệu ứng rung
function stopShakeTimer() {
    gsap.killTweensOf(timerContainer);
    gsap.set(timerContainer, { x: 0 });
}

cookingContents.forEach(dish => {
    if (dish.dishName === dishType) {
        const contentContainer = document.createElement('div');
        contentContainer.className = 'content-container';

        const title = document.createElement('h2');
        title.textContent = 'Recipe';
        const content = document.createElement('div');
        content.className = 'content';
        content.innerHTML = dish.intructionContent;
        contentContainer.append(title, content);
        
        cookingContainer.appendChild(contentContainer);
    }
})

if (hasTimer) {
    timerContainer.style.display = 'none'
}

function CountdownTimer(initialTime) {
    this.initialTime = initialTime;
    this.currentTime = initialTime;
    this.isRunning = false;
    this.intervalId = null;
    this.isFinished = false;
    this.callbacks = {
        onTick: null,
        onFinish: null,
        onStart: null,
        onStop: null,
        onReset: null
    };
}

CountdownTimer.prototype.start = function() {
    if (this.isRunning) {
        return false;
    }
    
    // Nếu timer đã hết thời gian (currentTime = 0), không cho phép start
    if (this.currentTime <= 0 && !this.isFinished) {
        return false;
    }
    
    this.isRunning = true;
    
    if (this.callbacks.onStart) {
        this.callbacks.onStart(this.getDisplayTime());
    }
    
    this.intervalId = setInterval(() => {
        this.currentTime--;
        
        if (this.callbacks.onTick) {
            this.callbacks.onTick(this.getDisplayTime());
        }
        
        if (this.currentTime <= 0) {
            this.stop();
            this.isFinished = true;
            
            // Bắt đầu hiệu ứng rung và âm thanh
            shakeTimer();
            startAlarm();
            
            if (this.callbacks.onFinish) {
                this.callbacks.onFinish();
            }
        }
    }, 1000);
    
    return true;
};

CountdownTimer.prototype.stop = function() {
    if (!this.isRunning) {
        return false;
    }
    
    this.isRunning = false;
    
    if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    
    if (this.callbacks.onStop) {
        this.callbacks.onStop(this.getDisplayTime());
    }
    
    return true;
};

CountdownTimer.prototype.toggle = function() {
    if (this.isRunning) {
        return this.stop();
    } else {
        return this.start();
    }
};

CountdownTimer.prototype.reset = function() {
    if (this.isRunning) {
        this.stop();
    }
    
    // Dừng báo động và hiệu ứng rung khi reset
    stopAlarm();
    stopShakeTimer();
    this.isFinished = false;
    
    this.currentTime = this.initialTime;
    
    if (this.callbacks.onReset) {
        this.callbacks.onReset(this.getDisplayTime());
    }
    
    return true;
};

CountdownTimer.prototype.getDisplayTime = function() {
    const hours = Math.floor(this.currentTime / 3600);
    const minutes = Math.floor((this.currentTime % 3600) / 60);
    const seconds = this.currentTime % 60;
    
    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        totalSeconds: this.currentTime,
        formattedTime: this.formatTime(hours, minutes, seconds)
    };
};

CountdownTimer.prototype.formatTime = function(hours, minutes, seconds) {
    const pad = (num) => num.toString().padStart(2, '0');
    
    if (hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
        return `${pad(minutes)}:${pad(seconds)}`;
    }
};

CountdownTimer.prototype.setCallback = function(eventName, callback) {
    if (this.callbacks.hasOwnProperty(eventName)) {
        this.callbacks[eventName] = callback;
    }
};

CountdownTimer.prototype.setTime = function(newTime) {
    if (this.isRunning) {
        return false;
    }
    
    this.initialTime = newTime;
    this.currentTime = newTime;
    return true;
};

CountdownTimer.prototype.getStatus = function() {
    return {
        isRunning: this.isRunning,
        currentTime: this.currentTime,
        initialTime: this.initialTime,
        isFinished: this.currentTime <= 0
    };
};

// ========== DEMO ==========

// Khởi tạo timer
let timer = new CountdownTimer(seconds);

// Lấy elements
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Thiết lập callbacks
timer.setCallback('onTick', function(timeDisplay) {
    display.textContent = timeDisplay.formattedTime;
});

timer.setCallback('onStart', function(timeDisplay) {
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.className = 'btn btn-pause';
});

timer.setCallback('onStop', function(timeDisplay) {
    startPauseBtn.textContent = 'Start';
    startPauseBtn.className = 'btn btn-start';
});

timer.setCallback('onFinish', function() {
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.className = 'btn btn-pause';
});

timer.setCallback('onReset', function(timeDisplay) {
    display.textContent = timeDisplay.formattedTime;
    startPauseBtn.textContent = 'Start';
    startPauseBtn.className = 'btn btn-start';
});

// Functions
function toggleTimer() {
    // Nếu timer đã hết giờ và đang báo động
    if (timer.isFinished && isAlarmPlaying) {
        // Dừng báo động
        stopAlarm();
        stopShakeTimer();
        // Chuyển nút về Start
        startPauseBtn.textContent = 'Start';
        startPauseBtn.className = 'btn btn-start';
        return;
    }
    
    // Nếu timer đã hết giờ nhưng không còn báo động, không làm gì
    if (timer.isFinished && !isAlarmPlaying) {
        return;
    }
    
    // Logic bình thường cho Start/Pause
    timer.toggle();
}

function resetTimer() {
    timer.reset();
}

function motionBtn(button) {
    gsap.to(button, {
        scale: .95,
        duration: .1,
        ease: 'power4.out',
        onComplete: () => {
            gsap.to(button , {
                scale: 1
            })
        }
    })
}

startPauseBtn.onmousedown = () => {
    motionBtn(startPauseBtn);
}

resetBtn.onmousedown = () => {
    motionBtn(resetBtn);
}

// Khởi tạo hiển thị ban đầu
display.textContent = timer.getDisplayTime().formattedTime;

// Thêm event listener để tự động khởi tạo AudioContext khi user tương tác
document.addEventListener('click', function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    document.removeEventListener('click', initAudioContext);
}, { once: true });