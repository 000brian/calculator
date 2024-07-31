function add (a, b)
{
	return +a + +b;
}

function subtract(a,b)
{
	return +a - +b;
}

function multiply(a,b)
{
	return +a * +b;
}
function divide(a,b)
{
	return +a / +b;
}

let num1;
let num2;
let operator;
let operationPerformed = false;

function operate(num1, operator, num2)
{
	operationPerformed = true;
	switch (operator)
	{
		case "+":
			return add(num1, num2);
		case "-":
			return subtract(num1, num2);
		case "*":
			return multiply(num1, num2);
		case "/":
			return divide(num1, num2);
		default:
			alert("you called operate with a fucked up operator :-(");
			return NaN;
	}
}

let displayText = "0";
const display = document.querySelector("div.display");

const buttonList = document.querySelectorAll("button");
console.log(buttonList);

let operation = []; // [num1, operation, num2]

buttonList.forEach((button) => {
	button.addEventListener("click", () => {
		console.log("you clicked button " + button.textContent);
		
		if (operation.length === 0) // button starts num1
		{
			if (button.classList.contains("operation"))
			{
				operation.push("0");
				operation.push(button.textContent);
			}
			else if (button.classList.contains("number"))
			{
				operation.push(button.textContent);
			}
		}
		else if (operation.length === 1) // button starts operation, or extends num1
		{
			if (button.classList.contains("operation"))
			{
				operation.push(button.textContent);
			}
			else if (button.classList.contains("number"))
			{
				if (operationPerformed)
				{
					operation[0] = button.textContent;
					operationPerformed = false;
				}
				else
				{
					operation[0] = operation[0] + button.textContent;
				}
				
			}
		}
		else if (operation.length === 2) // button starts num3
		{
			if (button.classList.contains("operation") || button.classList.contains("equals") ) // panic, do operation with num1 as num2
			{
				operation.push(operation[0]);
				operation = [operate(operation[0], operation[1], operation[2])];
			}
			else if (button.classList.contains("number"))
			{
				operation.push(button.textContent);
			}
		}
		else if (operation.length === 3) // extend num3 or do operation
		{
			if (button.classList.contains("operation") || button.classList.contains("equals")) // do operation
			{
				operation = [operate(operation[0], operation[1], operation[2])];
			}
			else if (button.classList.contains("number"))
			{
				operation[2] = operation[2] + button.textContent;
			}
		}
		if (button.classList.contains("clear"))
		{
			operation = [];
		}
		console.log(operation);
		display.textContent = Math.round(operation[operation.length-1] * 100) / 100;
		if (operation.length === 2)
		{
			display.textContent = Math.round(operation[0] * 100) / 100;
		}
		if (operation.length === 0)
		{
			display.textContent = 0;
		}
	})
});





