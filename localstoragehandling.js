/*  here will be the handling of the records board. */

function orderLocalStorage() {

    let recordsArray = [];
    
    for(let i = 0; i < localStorage.length; i++)
        recordsArray[i] = Number(localStorage.getItem(`record ${i}`));
    
    recordsArray.sort((num1,num2) => {
        if(num1 > num2) return 1;
        if(num1 < num2) return -1;
        return 0;
    });

    for(let i = 0; i < localStorage.length; i++)
        localStorage.setItem(`record ${i}`, recordsArray[i]);
}

function saveRecordInLocalStorage(number) {

    if(localStorage.length < 5)
        localStorage.setItem(`record ${localStorage.length}`, number);

    else if(localStorage.length == 5)
    {   
        orderLocalStorage(); 

        if(number > Number(localStorage.getItem('record 0')))
        {
            localStorage.setItem(`record 0`, number);
        }

        orderLocalStorage(); 
    }
}

function makeRecordsBoard(context, canvas) {

    let index = 6;
    let xMargin = 50;
    context.fillStyle = "gold";
    context.font = "12px David";
    context.fillText("RECORD BOARD", canvas.width / 3, canvas.height - 75);

    context.font = "9px David";

    for(let i = 0; i < 5; i ++)
    {
        index--;
        let record = localStorage.getItem(`record ${i}`);
        if(record == null)
            record = 0;
        context.fillText(`${index}:   ${record}`, canvas.width / 8 + xMargin * i, canvas.height - 60);
    }
}

export {orderLocalStorage, saveRecordInLocalStorage, makeRecordsBoard};

