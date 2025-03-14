// const loadCategories =() => {
//  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
//     .then(res => res.json())
//     .then(data => {
//         const categories = data.categories;
//         displayCategories(categories)



//     })
//     .catch(err => console.log(err));
// }

const removeActiveClass = () => {
    const activeButtons = document.getElementsByClassName('active');
    // activeButtons.forEach(button => {
    //     button.classList.remove('active');
    // });

    for (let btn of activeButtons) {
        btn.classList.remove('active');
    }
    console.log(activeButtons);

}

const displayCategories = (categories) => {
    // get the container
    const categoryContainer = document.getElementById('category-container');



    // loop through the categories
    categories.forEach(category => {
        // create a button element
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML =
            `
        <button id="btn-${category.category_id}" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white" onclick ="loadCategoryVideos(${category.category_id})">${category.category}</button>
        `

        // append the button to the container
        categoryContainer.appendChild(categoryDiv);

    });
    // get the buttons


}

const displayVideos = (videos) => {
    // get the container
    const videoContainer = document.getElementById('video-container');

    // clear the container
    videoContainer.innerHTML = '';

    if (videos.length === 0) {
        videoContainer.innerHTML = `
             <div class="col-span-full flex justify-center items-center flex-col py-20">
                <img class="w-[120px]" src="./assets/Icon.png" alt="">
                <h2 class="text-2xl font-bold">Oops!! Sorry, there is content here.</h2>
            </div>
        `;
        return;
    }

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
                        <p class="text-sm text-gray-400 flex gap-1">
                            ${video.authors[0].profile_name} 
                            ${video.authors[0].verified ? `<img src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" class="w-5 h-5" />` : ''}
                        </p>
                        <p class="text-sm text-gray-400">${video.others.views} views</p>
                    </div>
                </div>
                <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show details</button>
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

        removeActiveClass();
        document.getElementById('btn-all').classList.add('active');
        displayVideos(videos);
    } catch (err) {
        console.log(err);
    }
};

const loadCategoryVideos = async (category_id) => {
    try {
        // const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?category=${category}`);
        // const data = await res.json();
        // const videos = data.videos;
        // displayVideos(videos);
        url = `https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`;
        const res = await fetch(url);
        const data = await res.json();
        const videos = data.category;


        // remove active class from all buttons
        removeActiveClass();

        // add active class to the clicked button
        const clickedBtn = document.getElementById(`btn-${category_id}`);
        clickedBtn.classList.add('active');
        console.log(clickedBtn);

        displayVideos(videos);




    } catch (err) {
        console.log(err);
    }
}

const loadVideoDetails = async(video_id) => {

    try {
        const url = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;
        const res = await fetch(url);
        const data = await res.json();
        const video = data.video;
        displayVideoDetails(video);

    }
    catch(err) {
        console.log(err);
    }
}

const displayVideoDetails = (video) => {
    // get the modal
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        
        <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="text-2xl font-bold">${video.title}</h2>
    <p class="text-xs"> ${video.description}</p>
    <div class="card-actions justify-end">
    
    </div>
  </div>
</div>
    `;
    console.log(video);
    // get the modal
    
   

}

loadCategories();
// loadVideos();