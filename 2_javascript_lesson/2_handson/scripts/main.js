const fetchAndDisplayImages = async () => {
  const fetchedData = await (await fetch("./json/photos.json")).json();
  const imageDataList = fetchedData.data;
  let imageListHtml = "";

  for (const itemData of imageDataList) {
    imageListHtml += `<li class="item" data-item-id="${itemData.id}">
                          <img src="${itemData.image}" alt="" />
                      </li>`;
  }

  document.querySelector(".image-list").innerHTML = imageListHtml;
  return imageDataList;
};

const showImageModal = (imageData) => {
  document.querySelector(".image-dialog").classList.add("show");

  document.querySelector(
    ".image-container"
  ).innerHTML = `<img src="${imageData.image}" alt="">`;

  document.querySelector(".image-title").innerHTML = imageData.title;

  document.querySelector(".image-description").innerHTML =
    imageData.description;
};

const updateButtons = (currentImageIndex, imageDataList) => {
  document.querySelector(".prev-button").disabled = currentImageIndex - 1 <= -1;

  document.querySelector(".next-button").disabled =
    currentImageIndex + 1 >= imageDataList.length;
};

const addButtonListeners = (imageDataList) => {
  let currentImageIndex = -1;

  updateButtons(currentImageIndex, imageDataList);

  document.querySelector(".next-button").addEventListener("click", () => {
    currentImageIndex++;
    if (currentImageIndex >= imageDataList.length) {
      currentImageIndex = 0;
    }
    const targetImageData = imageDataList[currentImageIndex];
    showImageModal(targetImageData);
    updateButtons(currentImageIndex, imageDataList);
  });

  document.querySelector(".prev-button").addEventListener("click", () => {
    currentImageIndex--;
    const targetImageData = imageDataList[currentImageIndex];
    showImageModal(targetImageData);
    updateButtons(currentImageIndex, imageDataList);
  });

  document.querySelector(".close-button").addEventListener("click", () => {
    document.querySelector(".image-dialog").classList.remove("show");
  });

  document.querySelectorAll(".item").forEach((itemElement) => {
    itemElement.addEventListener("click", () => {
      const itemId = itemElement.dataset.itemId;
      if (itemId === undefined) {
        return;
      }

      const targetImageIndex = imageDataList.findIndex(
        (data) => data.id === itemId
      );

      if (targetImageIndex === -1) {
        return;
      }

      currentImageIndex = targetImageIndex;

      const targetImageData = imageDataList[currentImageIndex];
      showImageModal(targetImageData);
    });
  });
};

const main = async () => {
  // 画像の表示
  const imageDataList = await fetchAndDisplayImages();

  // ボタンへのイベント設定
  addButtonListeners(imageDataList);
};

main();
