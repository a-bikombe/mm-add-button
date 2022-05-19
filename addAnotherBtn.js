function addAnotherBtn() {

    let alladdAnotherBtns = document.querySelectorAll("button[id^='add-another-']");
    let allScoreInputs = document.querySelectorAll(".score-input > select");

    // makes the event listener work for each input
    alladdAnotherBtns.forEach(item => {
        let itm = item; // button
        let cloneIndex = 0;
        let buttonClickAddThreshold = 0;
        let siblingClass = itm.parentNode.getAttribute('class');
        let examSpecificAddThreshold;

        // if statement that decides the threshold for adding extra scores
        if (siblingClass === "score-input-div sat") {
            examSpecificAddThreshold = 2; // threshold for how many extra SAT scores user can add
        } else {
            examSpecificAddThreshold = 4; // threshold for how many extra Accuplacer scores user can add
        }

        let totalAddThreshold = examSpecificAddThreshold;

        itm.textContent = "Add Another Score: " + totalAddThreshold + " Remaining";

        // while loop that describes how many new clones can be added per button click
        if (buttonClickAddThreshold < 1) { // click event listener
            item.addEventListener("click", function (evt) {
                if (totalAddThreshold > 0) {

                    let bottomInput = itm.previousElementSibling; // last input before button

                    let cln = bottomInput.cloneNode(true); // make clone

                    let clnChildId = cln.lastElementChild.id; // id of bottom input div's input element
                    let clnChildIdText = String(clnChildId);
                    // turns id of bottom input div's input element into string

                    // if statement that works based on whether this is the first clone or not, and updates the descendants' attributes
                    if (clnChildIdText.includes("_") === false) {
                        ++ cloneIndex;
                        let clnChildNewId = clnChildId + "_clone_" + cloneIndex;
                        cln.lastElementChild.setAttribute('id', clnChildNewId);
                        cln.firstElementChild.setAttribute('for', clnChildNewId);
                    } else {
                        let originalChildId = itm.parentNode.firstElementChild.lastElementChild.id; // id of first input div's input element
                        ++ cloneIndex;
                        let clnChildNewId = originalChildId + "_clone_" + cloneIndex;
                        cln.lastElementChild.setAttribute('id', clnChildNewId);
                        cln.firstElementChild.setAttribute('for', clnChildNewId);
                    } itm.parentNode.insertBefore(cln, itm); // insert new clone right above button

                    totalAddThreshold--;
                    console.log("totalAddThreshold: " + totalAddThreshold + " (" + totalAddThreshold + " remaining)");
                    itm.textContent = "Add Another Score: " + totalAddThreshold + " Remaining";
                    if (totalAddThreshold === 0) {
                        itm.setAttribute('class', 'hidden'); // hide "add another" button after threshold is hit
                    }
                } // close totalAddThreshold if/else statement

            }); // close event listener

            buttonClickAddThreshold++;
        } // close buttonClickAddThreshold loop

    }); // close forEach

}

// export the function so it can be imported in main.js
export {
    addAnotherBtn
};
