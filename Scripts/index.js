function loadlessonbtn(){
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displaylessonbtn(data.data))
}

function displaylessonbtn(lessons){
    const lessonContainer = document.getElementById("lessonbtn-container");
    lessons.forEach(lesson => {
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick="loadlesson(${lesson.level_no})" class="btn btn-outline border-[#422AD5] hover:bg-[#422AD5] hover:text-white text-[#422AD5]"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
        `;
        lessonContainer.appendChild(div);
    });
}

function loadlesson(level){
    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
    .then(res => res.json())
    .then(data => displaylesson(data.data))
}

function displaylesson(lessons){
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";
    if (lessons.length === 0){
        lessonContainer.innerHTML = `
        <div class="col-span-full flex flex-col gap-4 justify-center items-center text-center py-10">
            <img src="assets/alert-error.png" alt="">
            <p class="hs text-sm text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="hs text-4xl font-bold pt-3">নেক্সট Lesson এ যান</h2>
        </div>
        `
    }
    lessons.forEach(lesson => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="w-full ">
                <div class="card w-auto ">
                    <div class="card-body text-center flex flex-col rounded-lg shadow-lg bg-white hover:bg-sky-100">
                        <div class="pb-5 flex flex-col gap-4">
                            <h2 class="font-bold text-2xl">${lesson.word}</h2>
                            <p class="font-medium text-sm">Meaning /Pronounciation</p>
                            <p class="font-semibold hs text-2xl">"${lesson.meaning} / ${lesson.pronunciation}"</p>
                        </div>

                        <div class="card-actions flex justify-between pt-1">
                            <button class="btn bg-gray-100 border-gray-100"><i
                                class="fa-solid fa-circle-info"></i></button>
                            <button class="btn bg-gray-100 border-gray-100"><i
                                class="fa-solid fa-volume-high"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
        lessonContainer.appendChild(card);
    })   
}


loadlessonbtn();