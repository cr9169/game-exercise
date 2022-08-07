/*  here will be the handling of the records board. */

// many js pages can be related to one html page and "work together"
// on different things. one js page would'nt override others.

function orderLocalStorage() {

    let recordsArray = [];
    
    for(let i = 0; i < localStorage.length; i++)
        recordsArray[i] = localStorage.getItem(`record ${i}`);
    
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

        if(number > localStorage.getItem('record 5'))
        {
            localStorage.setItem(localStorage.key(4), number);
        }
    }
}

/*saveRecordInLocalStorage(4);
saveRecordInLocalStorage(2);
saveRecordInLocalStorage(9);
saveRecordInLocalStorage(2);
saveRecordInLocalStorage(55);
saveRecordInLocalStorage(23);
saveRecordInLocalStorage(1232);
saveRecordInLocalStorage(3);
saveRecordInLocalStorage(43);*/
