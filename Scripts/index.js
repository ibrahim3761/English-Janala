function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
}

function removeActiveClass(){
    const activeButtons = document.getElementsByClassName("active");
    for(let btn of activeButtons){
        btn.classList.remove("active");
    }
}

function showLoader(){
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("lesson-container").classList.add("hidden");
}

function hideLoader(){
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("lesson-container").classList.remove("hidden");
}

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
        <button id="btn-${lesson.level_no}" onclick="loadlesson(${lesson.level_no})" class="btn btn-outline border-[#422AD5] hover:bg-[#422AD5] hover:text-white text-[#422AD5]"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
        `;
        lessonContainer.appendChild(div);
    });
}

function loadlesson(level){
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
    .then(res => res.json())
    .then(data =>{
        removeActiveClass();
        document.getElementById(`btn-${level}`).classList.add("active");
        displaylesson(data.data)
    })
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
                            <h2 class="font-bold text-xl">${lesson.word}</h2>
                            <p class="font-medium text-sm">Meaning /Pronounciation</p>
                           <p class="font-semibold hs text-xl">"${lesson.meaning ? lesson.meaning : "অর্থ নেই"} / ${lesson.pronunciation}"</p>
                        </div>

                        <div class="card-actions flex justify-between pt-1">
                            <button onclick="loadLessonDetails(${lesson.id})" class="btn bg-gray-100 border-gray-100"><i
                                class="fa-solid fa-circle-info"></i></button>
                            <button onclick="pronounceWord('${lesson.word}')" class="btn bg-gray-100 border-gray-100"><i
                                class="fa-solid fa-volume-high"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
        lessonContainer.appendChild(card);
    })   
    hideLoader();
}

function loadLessonDetails(id){
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res => res.json())
    .then(data => displayLessonDetails(data.data))
}

function displayLessonDetails(lesson){
    document.getElementById("lesson_details").showModal();
    const detailsContainer = document.getElementById("details-container");

    const synonyms = lesson.synonyms || [];

    detailsContainer.innerHTML = `
    <div class="bg-white rounded-xl shadow-md p-6 max-w-md w-full border border-gray-200">
    
        <h1 class="text-2xl font-semibold mb-4">${lesson.word} (<i class="fa-solid fa-microphone-lines"></i> <span class="hs">:${lesson.pronunciation})</span></h1>
        
      
        <div class="mb-6">
            <h2 class="text-lg font-semibold mb-1">Meaning</h2>
            <p class="text-gray-800 hs font-medium">${lesson.meaning ? lesson.meaning : "অর্থ নেই"}</p>
        </div>
        
       
        <div class="mb-6">
            <h2 class="text-lg font-semibold mb-1">Example</h2>
            <p class="text-gray-800 mb-2">${lesson.sentence}</p>
        </div>
        

        <div>
            <p class="text-gray-800 mb-2 hs font-medium">সমার্থক শব্দ গুলো</p>
        </div>
        ${synonyms.length > 0 ? `
            
            <div class="flex flex-wrap gap-2">
                ${synonyms.map(word => `<span class="bg-blue-50 text-blue-800 px-4 py-1 rounded-md text-sm">${word}</span>`).join("")}
            </div>
            ` : ""}
    </div>
    `
}


loadlessonbtn();