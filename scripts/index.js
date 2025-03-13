// const loadCategories =() => {
//  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
//     .then(res => res.json())
//     .then(data => {
//         const categories = data.categories;
//         displayCategories(categories)



//     })
//     .catch(err => console.log(err));
// }

const displayCategories = (categories) => {
    // get the container
    const categoryContainer = document.getElementById('category-container');



    // loop through the categories
    categories.forEach(category => {
        // create a button element
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML =
            `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `

        // append the button to the container
        categoryContainer.appendChild(categoryDiv);

    });
    // get the buttons


}

const displayVideos = (videos) => {
    // get the container
    const videoContainer = document.getElementById('video-container');

    // loop through the videos
    videos.forEach(video => {
        // create a div element
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
             <div class="card bg-base-100">
                <figure class="relative">
                    <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" />
                    <span class="absolute bottom-5 right-5 text-white bg-black px-2 py-1 rounded-lg text-sm">3hrs 56 min
                        ago</span>
                </figure>
                <div class="flex gap-3 px-0 py-5">
                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div class="intro">
                        <h2 class="text-sm font-semibold">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}<img
                                src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" class="w-5 h-5"></p>
                        <p class="text-sm text-gray-400">${video.others.views} views</p>
                    </div>

                </div>
            </div>
        `;

        // append the div to the container
        videoContainer.appendChild(videoDiv);
    });
};

const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        const categories = data.categories;
        displayCategories(categories);
    } catch (err) {
        console.log(err);
    }
};

const loadVideos = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        const data = await res.json();
        const videos = data.videos;
        displayVideos(videos);
    } catch (err) {
        console.log(err);
    }
};

loadCategories();
loadVideos();