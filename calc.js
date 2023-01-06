let a = ""; // первый операнд
let b = ""; // второй операнд
let sign = ""; // оператор
let finish = false;
let keyPersent = false;

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "X", "/"];

//экран
const out = document.querySelector(".calc-screen p");

function clearAll() {
  a = ""; // первое число
  b = ""; // второе число
  sign = ""; // знак операции
  finish = false;
  keyPersent = false;
}

document.querySelector(".ac").onclick = () => {
  clearAll();
  out.textContent = 0;
};

document.querySelector(".buttons").onclick = (event) => {
  // нажата не кнопка
  if (!event.target.classList.contains("btn")) return;
  // нажата кнопка Clear All
  if (event.target.classList.contains("ac")) return;

  out.textContent = "";
  // получаем нажатую кнопку
  const key = event.target.textContent;

  // если нажато 0-9 или .

  if (digits.includes(key)) {
    if (b === "" && sign === "") {
      a += key;
      console.log(a, b, sign);
      out.textContent = a;
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      out.textContent = b;
    } else {
      b += key;
      out.textContent = b;
    }
    console.log(a, b, sign);
    return;
  }

  // если нажата клавиша + - / X

  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    console.log(a, b, sign);
    return;
  }

  // если нажат %

  if (key === "%") {
    switch (sign) {
      case "X":
        a = (a / 100) * b;
        out.textContent = a;
        finish = true;
        break;
      case "+":
      case "-":
        keyPersent = true;
        out.textContent = b;
        break;
    }
    return;
  }

  // нажато =
  if (key === "=") {
    if (b === "") b = a;

    if (keyPersent) {
      switch (sign) {
        case "+":
          a = (a / 100) * b + +a;
          break;
        case "-":
          a = a - (a / 100) * b;
          break;
        case "/":
          a = a / ((a / 100) * b);
          break;
      }
      keyPersent = false;
      out.textContent = a;
      return;
    }

    switch (sign) {
      case "+":
        a = +a + +b;
        break;
      case "-":
        a = a - b;
        break;
      case "X":
        a = a * b;
        break;
      case "/":
        if (b === "0") {
          out.textContent = "Ошибка";
          clearAll();
          return;
        }
        a = a / b;
        break;
    }
    finish = true;
    out.textContent = a;
    return;
  }
};
