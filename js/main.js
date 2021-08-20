//функция для работы счетчика по клику(click)
// $(document).ready(function () {
//   let currentFloor = 2;
//   $(".main-img path").on("click", function () {
//     //функция для клика на этаж
//     currentFloor = $(this).attr("data-floor"); //при клике будет меняться номер этажа
//     $(".counter").text(currentFloor); //записывает в счетчик этаж в который был клик
//   });
// });

$(document).ready(function () {
  let currentFloor = 2; //переменная где хранится текущий этаж
  let floorPath = $(".main-img path"); //каждый отдельный этаж в SVG
  let counterUp = $(".counter-up"); //переменная для работы стрелки вверх
  let counterDown = $(".counter-down"); //переменная для работы стрелки вниз
  let viewFlatsBtn = $(".view-flats");

  //функция для работы счетчика по наведении(mouseover)
  floorPath.on("mouseover", function () {
    floorPath.removeClass("current-floor"); //удаляем активный класс у этажей
    currentFloor = $(this).attr("data-floor"); //получаем значение текущего этажа
    $(".counter").text(currentFloor); //записываем значение этажа в счетчик справа
  });
  //отслеживаем клик по кнопке вверх
  counterUp.on("click", function () {
    //проверяем значение этажа
    if (currentFloor < 18) {
      //прибавляем этаж +1
      currentFloor++;
      //отформатированная переменная с 2 до 02, 3 до 03
      usCurrentFloor = currentFloor.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      //записываем значение этажа в счетчик справа
      $(".counter").text(usCurrentFloor);
      //removeClass предварительно удаляет класс
      floorPath.removeClass("current-floor");
      //toggleClass создает класс, здесь подсвечиваются текущий этаж
      $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor");
    }
  });
  counterDown.on("click", function () {
    if (currentFloor > 2) {
      currentFloor--;
      usCurrentFloor = currentFloor.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      $(".counter").text(usCurrentFloor);
      floorPath.removeClass("current-floor");
      $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor");
    }
  });
  // модальное окно
  let modal = $(".modal");
  let modalCloseBtn = $(".modal-close-button");

  floorPath.on("click", toggleModal); //при клике на этаж открыть окно
  modalCloseBtn.on("click", toggleModal); //при клике на крестик закрыть
  viewFlatsBtn.on("click", toggleModal); //при клике на кнопку открывается окно

  function toggleModal() {
    //функция открыть-закрыть окно
    modal.toggleClass("is-open");
  }
  let flatsPath = $(".flats path");
  let flatsLink = $(".flat-link");

  function deleteClass() {
    flatsPath.removeClass("current-flat");
    flatsLink.removeClass("current-flat");
  }

  flatsPath.on("mouseover", function () {
    deleteClass();
    $(`[data-flat-link="${$(this).attr("data-flats")}"]`).toggleClass(
      "current-flat"
    );
  });

  flatsLink.on("mouseover", function () {
    deleteClass();
    $(`[data-flat="${$(this).attr("data-flats-link")}"]`).toggleClass(
      "current-flat"
    );
  });
});
