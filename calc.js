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
  a = "";
  b = "";
  sign = "";
  finish = false;
  keyPersent = false;
}

function roundOutput(num) {
  if (num.toString().length > 8) {
    return num.toExponential(5);
  }
  return num;
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
    if (a.includes(".") && key === "." && b === "") {
      out.textContent = a;
      return;
    }
    if (b.includes(".") && key === ".") {
      out.textContent = b;
      return;
    }

    if (b === "" && sign === "") {
      if (a.length > 8) {
        out.textContent = a;
      } else {
        a += key;
        out.textContent = a;
      }
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      out.textContent = b;
    } else {
      if (b.length > 8) {
        out.textContent = b;
      } else {
        b += key;
        out.textContent = b;
      }
    }
    return;
  }

  // если нажата клавиша + - / X

  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    return;
  }

  // если нажат %

  if (key === "%") {
    switch (sign) {
      case "X":
        a = roundOutput((a / 100) * b);
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
          a = roundOutput((a / 100) * b + +a);
          break;
        case "-":
          a = roundOutput(a - (a / 100) * b);
          break;
        case "/":
          a = roundOutput(a / ((a / 100) * b));
          break;
      }
      keyPersent = false;
      out.textContent = a;
      return;
    }

    switch (sign) {
      case "+":
        a = roundOutput(+a + +b);
        break;
      case "-":
        a = a - b;
        break;
      case "X":
        a = roundOutput(a * b);
        break;
      case "/":
        if (b === "0") {
          out.textContent = "Ошибка";
          clearAll();
          return;
        }
        a = roundOutput(a / b);
        break;
    }
    finish = true;
    out.textContent = a;
    return;
  }
};
