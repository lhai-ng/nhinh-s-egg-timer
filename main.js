const container = document.querySelector('#content');

window.onload = () => {
    gsap.to('#hero', {
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power1.out'
    })
    gsap.to('#hero p', {
        y: -10,
        opacity: 1,
        duration: 1,
        delay: .5,
        ease: 'power2.out',
    })
}

const demos = [
    {
        id: 1,
        dishName: "Soft-boiled Egg",
        dishDemo: "hẹ hẹ trứng lòng đào nì thì người yêu anh nà thíc nhất roàiii. Lòng đào chảy vừa đẹp vừa ngon nức lòng bbi lunnn",
    },
    {
        id: 2,
        dishName: "Medium-rare Egg",
        dishDemo: "cái nì thì chín hơn mụt xíu xiu so với lòng đào chảy, nhưng mò cũm có thể coi là lòng đào hẹ hẹ",
    },
    {
        id: 3,
        dishName: "Medium Egg",
        dishDemo: "chín ròi chín ròi, nói chung thì anh bé hong có ăng được trứng luộc nên hong bíc có gì khác biệt hơng hong :'(",
    },
    {
        id: 4,
        dishName: "Hard-boiled Egg",
        dishDemo: "a good selection for people who ăn chín uống sôi, have less egg smell than soft-boiled egg when it cools down :>",
    },
    {
        id: 5,
        dishName: "Omelette",
        dishDemo: "my fav dishhhhh (actualy i only can ate this type of trứng T-T) so yummy ăng cùng mỳ indomie hết lước chấmmm",
    },
    {
        id: 6,
        dishName: "Poached Egg",
        dishDemo: "món poached này giống giống trứng trần nhỉe, đặc biệt coàn phải là TRỨNG TRẦN ĂNG PHỞ!!!",
    },
    {
        id: 7,
        dishName: "Scrambled Egg",
        dishDemo: "cí món nì anh thấy nà bbi ăng coàn nhìu hơng trứng luộc nèee. Anh thấy người iu hay ăng vào bữa sáng và chắc chắn nà rấc ngonn",
    },
    {
        id: 8,
        dishName: "Fried Egg",
        dishDemo: "🥚🤗🍳😋",
    },
];

demos.forEach(demo => {
    const demoContainer = document.createElement('div');
    demoContainer.className = `demo-container id${demo.id}`;
    const demoTitle = document.createElement('h3');
    demoTitle.className = 'demo-title';
    demoTitle.textContent = demo.dishName;

    const seperator = document.createElement('hr');
    seperator.className = 'demo-seperator';

    const demoContent = document.createElement('p');
    demoContent.className = 'demo-content';
    demoContent.textContent = demo.dishDemo;

    demoContainer.append(demoTitle, seperator, demoContent);
    
    container.appendChild(demoContainer);
})

const dishButtons = document.querySelectorAll('#content a');
dishButtons.forEach((button, index) => {
    button.onmouseenter = () => {
        gsap.killTweensOf(`.id${index+1}`);
        gsap.to(`.id${index+1}`, {
            y: -20,
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
            display: 'block',
        })
    }

    button.onmouseleave = () => {
        gsap.killTweensOf(`.id${index+1}`);
        gsap.to(`.id${index+1}`, {
            y: 20,
            opacity: 0,
            ease: 'power3.out',
            duration: .5,
            display: 'none'
        })
    }
})



